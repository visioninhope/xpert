import { CdkListboxModule } from '@angular/cdk/listbox'
import { CommonModule } from '@angular/common'
import { Component, computed, effect, inject, input, model, signal } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatTooltipModule } from '@angular/material/tooltip'
import { environment } from '@cloud/environments/environment'
import { EntriesPipe, linkedModel } from '@metad/core'
import { NgmAutoScrollBottomDirective, NgmSlideToggleComponent, NgmTimerDirective } from '@metad/ocap-angular/common'
import { attrModel } from '@metad/ocap-angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { omit } from 'lodash-es'
import { NgxControlValueAccessor } from 'ngxtension/control-value-accessor'
import { Subscription } from 'rxjs'
import { ToastrService, XpertToolsetService } from '../../../@core'
import {
  ChatMessageTypeEnum,
  getErrorMessage,
  IEnvironment,
  IXpertTool,
  IXpertToolset,
  MCPServerType,
  TMCPServer,
  TWorkflowVarGroup,
  uuid,
  XpertParameterTypeEnum,
  XpertToolsetCategoryEnum
} from '../../../@core/types'
import { CodeEditorComponent } from '../../editors'
import { MCPToolsComponent } from '../tools/tools.component'
import { XpertEnvVarInputComponent } from '../../environment'

@Component({
  standalone: true,
  selector: 'mcp-server-form',
  templateUrl: './server.component.html',
  styleUrl: 'server.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CdkListboxModule,
    CodeEditorComponent,
    MatTooltipModule,
    MCPToolsComponent,
    EntriesPipe,
    NgmSlideToggleComponent,
    XpertEnvVarInputComponent,
    NgmAutoScrollBottomDirective,
    NgmTimerDirective
  ],
  hostDirectives: [NgxControlValueAccessor]
})
export class MCPServerFormComponent {
  eMCPServerType = MCPServerType
  pro = environment.pro

  readonly toolsetService = inject(XpertToolsetService)
  readonly #toastr = inject(ToastrService)
  protected cva = inject<NgxControlValueAccessor<Partial<TMCPServer> | null>>(NgxControlValueAccessor)

  readonly value$ = this.cva.value$

  // Inputs
  readonly workspaceId = input<string>()
  readonly toolset = model<Partial<IXpertToolset>>()
  readonly tools = model<IXpertTool[]>()
  readonly environment = input<IEnvironment>()

  // States
  readonly toolsetId = computed(() => this.toolset()?.id)
  readonly type = attrModel(this.value$, 'type')
  readonly types = linkedModel({
    initialValue: [MCPServerType.SSE],
    compute: () => this.type() ? [this.type()] : [MCPServerType.SSE],
    update: (types) => {
      this.type.set(types?.[0] ?? MCPServerType.SSE)
    }
  })
  // readonly types = model<MCPServerType[]>([MCPServerType.SSE])
  readonly views = model<('script' | 'code' | 'tools')[]>(['tools'])
  readonly fileIndex = model<number[]>([])
  readonly isCode = computed(() => this.types()[0] === MCPServerType.CODE)

  readonly toolNamePrefix = linkedModel({
    initialValue: 'mcp',
    compute: () => {
      return this.value$()?.toolNamePrefix
    },
    update: (toolNamePrefix) => {
      this.value$.update((state) => ({ ...(state ?? {}), toolNamePrefix }))
    }
  })
 
  readonly args = attrModel(this.value$, 'args')
  readonly reconnect = attrModel(this.value$, 'reconnect')
  readonly reconnectEnabled = attrModel(this.reconnect, 'enabled')
  readonly maxAttempts = attrModel(this.reconnect, 'maxAttempts')
  readonly delayMs = attrModel(this.reconnect, 'delayMs')
  
  readonly initScripts = linkedModel({
    initialValue: null,
    compute: () => this.value$()?.initScripts || '',
    update: (initScripts) => {
      this.value$.update((state) => {
        // Avoid unnecessary updates
        if (initScripts !== state.initScripts) {
          return { ...(state ?? {}), initScripts }
        }
        return state
      })
    }
  })

  get command() {
    return this.value$()?.command
  }
  set command(value: string) {
    this.value$.update((state) => ({ ...(state ?? {}), command: value }))
  }
  get url() {
    return this.value$()?.url
  }
  set url(value: string) {
    this.value$.update((state) => ({ ...(state ?? {}), url: value }))
  }

  get mainFile() {
    return this.value$()?.files?.[0]?.content
  }
  set mainFile(value: string) {
    this.updateFile(0, { content: value, name: 'main.py' })
  }
  get mainFileName() {
    return this.value$()?.files?.[0]?.name
  }

  // States
  readonly loading = signal(false)
  readonly #tempId = signal(uuid())
  readonly _toolset = computed(() => {
    return {
      workspaceId: this.workspaceId(),
      category: XpertToolsetCategoryEnum.MCP,
      type: this.types()[0],
      id: this.#tempId(),
      schema: JSON.stringify({
        mcpServers: {
          '': {
            ...this.value$(),
            type: this.types()[0]
          }
        }
      })
    }
  })

  readonly timer = signal<Date>(null)
  readonly stopTime = signal<Date>(null)
  readonly error = signal<string>(null)

  readonly files = computed(() => this.value$()?.files)
  readonly env = computed(() => this.value$()?.env ?? {})
  readonly headers = computed(() => this.value$()?.headers ?? {})

  private connectSub: Subscription = null

  // Env
  readonly variables = computed(() => {
    const environment = this.environment()
    if (environment) {
      return [{
        group: {
          name: 'env',
          description: {
            en_US: 'Environment',
            zh_Hans: '环境变量'
          }
        },
        variables: environment.variables?.map((_) => ({
          name: _.name,
          type: _.type === 'secret' ? XpertParameterTypeEnum.SECRET : XpertParameterTypeEnum.STRING,
          title: _.name,
        }))
      } as TWorkflowVarGroup]
    }
    return null
  })

  readonly logs = signal<string[]>([])

  constructor() {
    effect(
      () => {
        if (this.types()[0] === 'code') {
          if (!this.files()?.length) {
            this.value$.update((state) => ({ ...(state ?? {}), files: this.initFiles() }))
            this.fileIndex.set([0])
          }
          this.command = 'python3'
          this.args.set(['main.py'])
        }
      },
      { allowSignalWrites: true }
    )

    effect(
      () => {
        if (this.views()[0] === 'code' && !this.fileIndex()?.length) {
          this.fileIndex.set([0])
        }
      },
      { allowSignalWrites: true }
    )
  }

  updateType(types: MCPServerType[]) {
    this.value$.update((state) => ({ ...(state ?? {}), type: types[0] }))
    if (this.value$().type === MCPServerType.SSE) {
      this.views.set(['tools'])
    }
  }

  initFiles() {
    return [
      {
        name: 'main.py',
        content: `from mcp.server.fastmcp import FastMCP
import os

# Create a server
mcp = FastMCP(name="MCP Server", port=int(os.getenv("PORT", 8000)))

@mcp.tool()
def get_temperature(city: str) -> str:
    """Get the current temperature for a city."""
    # Mock implementation
    temperatures = {
        "new york": "72°F",
        "london": "65°F",
        "tokyo": "25°C",
    }

    city_lower = city.lower()
    if city_lower in temperatures:
        return f"The current temperature in {city} is {temperatures[city_lower]}."
    else:
        return "Temperature data not available for this city"

# Run the server with SSE transport
if __name__ == "__main__":
    mcp.run(transport="sse")
`
      },
      {
        name: 'requirements.txt',
        content: `mcp==1.6.0\n`
      }
    ]
  }

  updateFile(index: number, file: Partial<TMCPServer['files'][0]>) {
    this.value$.update((state) => {
      state ??= {}
      state.files ??= []
      state.files[index] = {
        ...(state.files[index] ?? {}),
        ...file
      } as TMCPServer['files'][0]

      return {
        ...state,
        files: [...state.files]
      }
    })
  }

  connect() {
    this.loading.set(true)
    this.logs.set(null)
    this.error.set(null)
    this.timer.set(new Date())
    this.stopTime.set(null)
    this.connectSub?.unsubscribe()
    this.connectSub = this.toolsetService.getMCPToolsBySchema(this._toolset()).subscribe({
      next: (message) => {
        if (message.event === 'error') {
          this.error.set(getErrorMessage(message.data))
          this.loading.set(false)
          this.tools.set([])
          this.stopTime.set(new Date())
        } else {
          if (!message.data || message.data?.startsWith(': keep-alive')) return
          try {
            const result = JSON.parse(message.data)
            if (result.type === ChatMessageTypeEnum.EVENT) {
              this.logs.update((state) => {
                state ??= []
                const log = result.data.message || result.data.title
                if (state[state.length - 1] !== log) {
                  return [...state, log]
                }
                return state
              })
            } else if (result.type === ChatMessageTypeEnum.MESSAGE) {
              this.loading.set(false)
              this.tools.set(result.data.tools)
              this.views.set(['tools'])
              this.logs.set(result.data.logs)
              this.stopTime.set(new Date())
            }
          } catch(err) {}
        }
      },
      error: (err) => {
        this.error.set(getErrorMessage(err))
        this.tools.set([])
        this.#toastr.error(getErrorMessage(err))
        this.loading.set(false)
        this.stopTime.set(new Date())
        // Handle the error scenario here
      }
    })
  }

  stopConnect() {
    this.connectSub?.unsubscribe()
    this.connectSub = null
    this.loading.set(false)
    this.error.set(null)
    this.timer.set(null)
    this.stopTime.set(null)
  }

  addHeader() {
    this.value$.update((state) => ({
      ...(state ?? {}),
      headers: {
        ...(state?.headers ?? {}),
        ['']: ''
      }
    }))
  }

  updateHeaderName(origin: string, name: string) {
    this.value$.update((state) => {
      const value = state.headers[origin]
      return {
        ...state,
        headers: {
          ...omit(state.headers, origin),
          [name]: value
        }
      }
    })
  }

  updateHeaderValue(name: string, value: string) {
    if (value === this.headers()[name]) return
    this.value$.update((state) => {
      return {
        ...state,
        headers: {
          ...state.headers,
          [name]: value
        }
      }
    })
  }

  removeHeader(name: string) {
    this.value$.update((state) => {
      return {
        ...state,
        headers: {
          ...omit(state.headers, name)
        }
      }
    })
  }

  addArg() {
    this.args.update((state) => {
      state ??= []
      return [...state, '']
    })
  }

  updateArg(index: number, value: string) {
    this.args.update((state) => {
      state[index] = value
      return [...state]
    })
  }

  removeArg(index: number) {
    this.args.update((state) => {
      state.splice(index, 1)
      return [...state]
    })
  }

  addEnv() {
    this.value$.update((state) => ({
      ...(state ?? {}),
      env: {
        ...(state?.env ?? {}),
        ['']: ''
      }
    }))
  }

  updateEnvName(origin: string, name: string) {
    if (origin === name) return
    this.value$.update((state) => {
      return {
        ...state,
        // To ensure the order of env names
        env: Object.keys(state.env).reduce((target, key) => {
          if (key === origin) {
            target[name] = state.env[origin]
          } else {
            target[key] = state.env[key]
          }
          return target
        }, {})
      }
    })
  }

  updateEnvValue(name: string, value: string) {
    if (value === this.env()[name]) return
    this.value$.update((state) => {
      return {
        ...state,
        env: {
          ...state.env,
          [name]: value
        }
      }
    })
  }

  removeEnv(name: string) {
    this.value$.update((state) => {
      return {
        ...state,
        env: {
          ...omit(state.env, name)
        }
      }
    })
  }
}
