import { Dialog } from '@angular/cdk/dialog'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { CdkMenuModule } from '@angular/cdk/menu'
import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  ViewContainerRef
} from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatTooltipModule } from '@angular/material/tooltip'
import { RouterModule } from '@angular/router'
import { AnalyticalCardModule } from '@metad/ocap-angular/analytical-card'
import { NgmCommonModule } from '@metad/ocap-angular/common'
import { NgmDSCoreService } from '@metad/ocap-angular/core'
import { NgmSelectionModule, SlicersCapacity } from '@metad/ocap-angular/selection'
import { DataSettings, Indicator, TimeGranularity } from '@metad/ocap-core'
import { StoryExplorerComponent } from '@metad/story'
import { ExplainComponent } from '@metad/story/story'
import { NxWidgetKpiComponent } from '@metad/story/widgets/kpi'
import { TranslateModule } from '@ngx-translate/core'
import { compact, uniq } from 'lodash-es'
import { MarkdownModule } from 'ngx-markdown'
import { ChatMessageStepCategory, IXpertTask, Store } from '../../@core'
import { ChatComponentIndicatorsComponent } from './indicators/indicators.component'
import { ChatComponentIndicatorComponent } from './indicator/indicator.component'
import { ChatComponentTasksComponent } from './tasks/tasks.component'
import { XpertHomeService } from '../home.service'
import { ArraySlicePipe, FileTypePipe } from '@metad/core'
import { ChatFilesDialogComponent } from '../../@shared/chat'
import { ChatComponentMemoriesComponent } from './memories/memories.component'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DragDropModule,
    CdkMenuModule,
    RouterModule,
    TranslateModule,
    MatTooltipModule,
    MarkdownModule,
    NgmCommonModule,
    NgmSelectionModule,
    AnalyticalCardModule,
    NxWidgetKpiComponent,
    FileTypePipe,
    ArraySlicePipe,
    ChatComponentIndicatorsComponent,
    ChatComponentIndicatorComponent,
    ChatComponentTasksComponent,
    ChatComponentMemoriesComponent
  ],
  selector: 'chat-component-message',
  templateUrl: './component-message.component.html',
  styleUrl: 'component-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponentMessageComponent {
  eSlicersCapacity = SlicersCapacity
  eTimeGranularity = TimeGranularity
  eChatMessageStepCategory = ChatMessageStepCategory

  readonly #store = inject(Store)
  readonly #dialog = inject(Dialog)
  readonly dsCore = inject(NgmDSCoreService)
  readonly #viewContainerRef = inject(ViewContainerRef)
  readonly homeService = inject(XpertHomeService)

  // Inputs
  // Message ID
  readonly messageId = input<string>()
  // Sub component message
  readonly message = input<any>()

  // Outputs
  readonly register = output<{ id: string; indicators?: Indicator[] }[]>()

  // States
  readonly data = computed(() => this.message()?.data as any)

  readonly primaryTheme = toSignal(this.#store.primaryTheme$)

  readonly chartSettings = computed(() => {
    return {
      ...(this.data()?.chartSettings ?? {}),
      theme: this.primaryTheme()
    }
  })

  readonly dataSettings = computed(() => this.data()?.dataSettings as DataSettings)
  readonly indicator = computed<Indicator>(() => this.data()?.indicator)
  readonly dataSource = computed(() => this.dataSettings()?.dataSource)
  readonly indicators = computed(() => this.data()?.indicators)
  readonly slicers = computed(() => this.data()?.slicers)
  readonly tasks = computed(() => this.data()?.tasks as IXpertTask[])
  readonly dataSources = computed(() => compact(uniq<string>(this.indicators()?.map((_) => _.dataSource))))

  readonly explains = signal<any[]>([])

  // Files
  readonly files = computed(() => this.data()?.files as any[])

  constructor() {
    effect(
      () => {
        if (this.dataSource()) {
          this.register.emit([
            {
              id: this.dataSource(),
              indicators: this.indicators()
            }
          ])
        }
      },
      { allowSignalWrites: true }
    )

    effect(
      () => {
        const newIndicator = this.indicator()
        if (newIndicator) {
          this.register.emit([
            {
              id: newIndicator.modelId,
              indicators: [newIndicator]
            }
          ])
        }
      },
      { allowSignalWrites: true }
    )

    effect(
      () => {
        if (this.dataSources()) {
          this.register.emit(this.dataSources().map((id) => ({ id })))
        }
      },
      { allowSignalWrites: true }
    )
  }

  setExplains(items: unknown[]) {
    this.explains.set(items)
  }

  openExplain() {
    this.#dialog.open(ExplainComponent, {
      data: this.explains()
    })
  }

  openExplorer() {
    this.#dialog
      .open(StoryExplorerComponent, {
        viewContainerRef: this.#viewContainerRef,
        data: {
          data: {
            dataSettings: this.dataSettings(),
            slicers: this.slicers()
          }
        }
      })
      .closed.subscribe({
        next: (result) => {
          if (result) {
            console.log(result)
          }
        }
      })
  }

  openCanvas() {
    this.homeService.canvasOpened.set({
      opened: true,
      type: 'Dashboard',
      messageId: this.messageId(),
      componentId: this.message().id
    })
  }

  openFileViewer(file) {
    this.homeService.canvasOpened.set({
      opened: true,
      type: 'File',
      file
    })
  }

  openAllFiles() {
    this.#dialog.open(ChatFilesDialogComponent, {
      data: {
        files: this.files()
      }
    }).closed.subscribe((file) => {
      if (file) {
        this.openFileViewer(file)
      }
    })
  }
}
