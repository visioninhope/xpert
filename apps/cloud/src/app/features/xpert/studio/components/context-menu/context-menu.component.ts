import { CdkMenu, CdkMenuModule } from '@angular/cdk/menu'
import { CommonModule } from '@angular/common'
import { ChangeDetectorRef, Component, computed, inject, TemplateRef, ViewChild } from '@angular/core'
import { MatTabsModule } from '@angular/material/tabs'
import { I18nService } from '@cloud/app/@shared/i18n'
import { XpertWorkflowIconComponent } from '@cloud/app/@shared/workflow'
import { TranslateModule } from '@ngx-translate/core'
import {
  IWFNClassifier,
  IWFNCode,
  IWFNHttp,
  IWFNIfElse,
  IWFNKnowledgeRetrieval,
  IWFNTool,
  IWFNSubflow,
  IWFNTemplate,
  IWorkflowNode,
  IXpert,
  ToastrService,
  uuid,
  WorkflowNodeTypeEnum,
  XpertParameterTypeEnum,
  IXpertToolset,
  IToolProvider,
  XpertToolsetCategoryEnum,
  IWFNAssigner,
  IWFNTask,
  IWFNAgentTool,
  TASK_DESCRIPTION_PREFIX,
  TASK_DESCRIPTION_SUFFIX,
  IWFNTrigger
} from 'apps/cloud/src/app/@core'
import { XpertInlineProfileComponent } from 'apps/cloud/src/app/@shared/xpert'
import { Subscription } from 'rxjs'
import {
  genXpertAnswerKey,
  genXpertAssignerKey,
  genXpertClassifierKey,
  genXpertCodeKey,
  genXpertHttpKey,
  genXpertIteratingKey,
  genXpertKnowledgeKey,
  genXpertNoteKey,
  genXpertRouterKey,
  genXpertSubflowKey,
  genXpertTemplateKey,
  genXpertToolKey,
  genXpertAgentToolKey,
  genXpertTaskKey,
  genXpertTriggerKey
} from '../../../utils'
import { XpertStudioApiService } from '../../domain'
import { SelectionService } from '../../domain/selection.service'
import { XpertStudioComponent } from '../../studio.component'
import { XpertStudioKnowledgeMenuComponent } from '../knowledge-menu/knowledge.component'
import { XpertStudioToolsetMenuComponent } from '../toolset-menu/toolset.component'

@Component({
  selector: 'xpert-studio-context-menu',
  exportAs: 'menuComponent',
  standalone: true,
  imports: [
    CommonModule,
    CdkMenuModule,
    TranslateModule,
    MatTabsModule,
    XpertStudioKnowledgeMenuComponent,
    XpertStudioToolsetMenuComponent,
    XpertInlineProfileComponent,
    XpertWorkflowIconComponent
  ],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class XpertStudioContextMenuComponent {
  eWorkflowNodeTypeEnum = WorkflowNodeTypeEnum

  readonly apiService = inject(XpertStudioApiService)
  readonly selectionService = inject(SelectionService)
  private root = inject(XpertStudioComponent)
  readonly #cdr = inject(ChangeDetectorRef)
  readonly #translate = inject(I18nService)
  readonly #toastr = inject(ToastrService)

  @ViewChild(TemplateRef, { static: true })
  public template!: TemplateRef<CdkMenu>

  private subscriptions = new Subscription()

  public node: string | null = null

  readonly collaborators$ = this.apiService.collaborators$
  readonly nodes = computed(() => this.root.viewModel()?.nodes)
  readonly agents = computed(() => this.nodes()?.filter((n) => n.type === 'agent'))

  public ngOnInit(): void {
    this.subscriptions.add(this.subscribeToSelectionChanges())
  }

  private subscribeToSelectionChanges(): Subscription {
    return this.selectionService.selection$.subscribe((selection) => {
      if (this.root.fFlowComponent().getSelection().fNodeIds.length === 1) {
        this.node = this.root.fFlowComponent().getSelection().fNodeIds[0]
      } else {
        this.node = null
      }

      this.#cdr.detectChanges()
    })
  }

  async createAgent(menu: CdkMenu) {
    menu.menuStack.closeAll()
    this.apiService.createAgent(this.root.contextMenuPosition, {
      title:
        (await this.#translate.instant('PAC.Workflow.Agent', { Default: 'Agent' })) + ' ' + (this.agents()?.length ?? 1)
    })
  }

  public addCollaborator(xpert: IXpert): void {
    this.apiService.createCollaborator(this.root.contextMenuPosition, xpert)
  }

  public deleteNode(menu: CdkMenu, node: string): void {
    menu.menuStack.closeAll()
    if (node) {
      this.apiService.removeNode(node)
    }
  }

  async pasteNode() {
    const nodeText = await navigator.clipboard.readText()
    try {
      const node = JSON.parse(nodeText)
      this.apiService.pasteNode({
        ...node,
        position: {
          ...this.root.contextMenuPosition
        }
      })
    } catch (err) {
      console.error(err)
      this.#toastr.error(
        this.#translate.instant('PAC.Xpert.UnableParseContent', { Default: 'Unable to parse content' })
      )
    }
  }

  async addWorkflowNote() {
    this.apiService.addBlock(this.root.contextMenuPosition, {
      type: WorkflowNodeTypeEnum.NOTE,
      key: genXpertNoteKey(),
      title: await this.#translate.instant('PAC.Workflow.Note', { Default: 'Note' })
    } as IWorkflowNode)
  }

  async addWorkflowRouter() {
    this.apiService.addBlock(this.root.contextMenuPosition, {
      type: WorkflowNodeTypeEnum.IF_ELSE,
      key: genXpertRouterKey(),
      title: await this.#translate.instant('PAC.Workflow.Router', { Default: 'Router' }),
      cases: [
        {
          caseId: uuid(),
          conditions: []
        }
      ]
    } as IWFNIfElse)
  }

  async addWorkflowIterating() {
    this.apiService.addBlock(this.root.contextMenuPosition, {
      type: WorkflowNodeTypeEnum.ITERATING,
      key: genXpertIteratingKey(),
      title: await this.#translate.instant('PAC.Workflow.Iterating', { Default: 'Iterating' })
    })
  }

  async addWorkflowAnswer() {
    this.apiService.addBlock(this.root.contextMenuPosition, {
      type: WorkflowNodeTypeEnum.ANSWER,
      key: genXpertAnswerKey(),
      title: await this.#translate.instant('PAC.Workflow.Answer', { Default: 'Answer' })
    })
  }

  async addWorkflowQuestionClassifier() {
    const length = this.nodes()?.filter((n) => n.type === 'workflow' && n.entity?.type === WorkflowNodeTypeEnum.CLASSIFIER).length ?? 0
    this.apiService.addBlock(this.root.contextMenuPosition, {
      type: WorkflowNodeTypeEnum.CLASSIFIER,
      key: genXpertClassifierKey(),
      title: (await this.#translate.instant('PAC.Workflow.QuestionClassifier', { Default: 'Question Classifier' })) + ` ${length + 1}`,
      inputVariables: ['human.input'],
      classes: [
        {
          description: '',
        },
        {
          description: '',
        },
      ]
    } as IWFNClassifier)
  }

  async addWorkflowKnowledgeRetrieval() {
    this.apiService.addBlock(this.root.contextMenuPosition, {
      type: WorkflowNodeTypeEnum.KNOWLEDGE,
      key: genXpertKnowledgeKey(),
      title: await this.#translate.instant('PAC.Workflow.KnowledgeRetrieval', { Default: 'Knowledge Retrieval' }),
      queryVariable: `input`,
      knowledgebases: []
    } as IWFNKnowledgeRetrieval)
  }

  async addWorkflowCode() {
    const length = this.nodes()?.filter((n) => n.type === 'workflow' && n.entity?.type === WorkflowNodeTypeEnum.CODE).length ?? 0
    this.apiService.addBlock(this.root.contextMenuPosition, {
      type: WorkflowNodeTypeEnum.CODE,
      key: genXpertCodeKey(),
      title: await this.#translate.instant('PAC.Workflow.CodeExecution', { Default: 'Code Execution' }) + ` ${length + 1}`,
      language: 'javascript',
      code: `return {"result": arg1 + arg2};`,
      inputs: [
        {
          name: 'arg1',
          variable: null
        },
        {
          name: 'arg2',
          variable: null
        }
      ],
      outputs: [
        {
          type: XpertParameterTypeEnum.STRING,
          name: 'result'
        }
      ]
    } as IWFNCode)
  }

  async addWorkflowTemplate() {
    this.apiService.addBlock(this.root.contextMenuPosition, {
      type: WorkflowNodeTypeEnum.TEMPLATE,
      key: genXpertTemplateKey(),
      title: await this.#translate.instant('PAC.Workflow.TemplateTransform', { Default: 'Template Transform' }),
      code: `{{arg1}}`,
      inputParams: [
        {
          name: 'arg1',
          variable: ''
        }
      ]
    } as IWFNTemplate)
  }
  
  addWorkflowVariableAssigner() {
    const length = this.nodes()?.filter((n) => n.type === 'workflow' && n.entity?.type === WorkflowNodeTypeEnum.ASSIGNER).length ?? 0
    this.apiService.addBlock(this.root.contextMenuPosition, {
      type: WorkflowNodeTypeEnum.ASSIGNER,
      key: genXpertAssignerKey(),
      title: this.#translate.instant('PAC.Workflow.VariableAssigner', { Default: 'Variable Assigner' }) + ` ${length + 1}`,
      assigners: [
        {
          value: '',
          variableSelector: '',
          inputType: 'variable'
        }
      ]
    } as IWFNAssigner)
  }

  async addWorkflowHttp() {
    this.apiService.addBlock(this.root.contextMenuPosition, {
      type: WorkflowNodeTypeEnum.HTTP,
      key: genXpertHttpKey(),
      method: 'get',
      title: await this.#translate.instant('PAC.Workflow.HTTPRequest', { Default: 'HTTP Request' })
    } as IWFNHttp)
  }

  async addWorkflowTool() {
    this.apiService.addBlock(this.root.contextMenuPosition, {
      type: WorkflowNodeTypeEnum.TOOL,
      key: genXpertToolKey(),
      title: await this.#translate.instant('PAC.Workflow.Tool', { Default: 'Tool' })
    } as IWFNTool)
  }

  async addWorkflowSubflow() {
    this.apiService.addBlock(this.root.contextMenuPosition, {
      type: WorkflowNodeTypeEnum.SUBFLOW,
      key: genXpertSubflowKey(),
      title: await this.#translate.instant('PAC.Workflow.Subflow', { Default: 'Subflow' })
    } as IWFNSubflow)
  }

  addWorkflowAgentTool() {
    this.apiService.addBlock(this.root.contextMenuPosition, {
      type: WorkflowNodeTypeEnum.AGENT_TOOL,
      key: genXpertAgentToolKey(),
      title: this.#translate.instant('PAC.Workflow.AgentTool', { Default: 'Agent Tool' })
    } as IWFNAgentTool)
  }

  addWorkflowTask() {
    this.apiService.addBlock(this.root.contextMenuPosition, {
      type: WorkflowNodeTypeEnum.TASK,
      key: genXpertTaskKey(),
      title: this.#translate.instant('PAC.Workflow.Task', { Default: 'Task' }),
      descriptionPrefix: TASK_DESCRIPTION_PREFIX,
      descriptionSuffix: TASK_DESCRIPTION_SUFFIX
    } as IWFNTask)
  }

  addWorkflowTrigger(from: string) {
    this.apiService.addBlock(this.root.contextMenuPosition, {
      type: WorkflowNodeTypeEnum.TRIGGER,
      key: genXpertTriggerKey(),
      title: this.#translate.instant('PAC.Workflow.Trigger', { Default: 'Trigger' }),
      from
    } as IWFNTrigger)
  }

  onSelectToolset({toolset, provider}: {toolset?: IXpertToolset; provider?: IToolProvider}) {
    if (toolset) {
      this.apiService.createToolset(this.root.contextMenuPosition, toolset)
    }
    if (provider) {
      this.apiService.createToolset(this.root.contextMenuPosition, {
            key: uuid(),
            category: XpertToolsetCategoryEnum.BUILTIN,
            type: provider.name,
            name: provider.name
          })
    }
  }

  public dispose(): void {
    // this.selectionService.reset()
  }
}
