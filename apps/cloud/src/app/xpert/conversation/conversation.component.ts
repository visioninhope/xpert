import { CommonModule } from '@angular/common'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal
} from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgmCommonModule } from '@metad/ocap-angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { CopilotChatMessage, injectToastr, IXpert, ToolCall, XpertAgentExecutionStatusEnum } from '../../@core'
import { EmojiAvatarComponent } from '../../@shared/avatar'
import { ToolCallConfirmComponent, XpertParametersCardComponent } from '../../@shared/xpert'
import { AppService } from '../../app.service'
import { ChatAiMessageComponent } from '../ai-message/ai-message.component'
import { ChatService } from '../chat.service'
import { XpertHomeService } from '../home.service'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    NgmCommonModule,
    EmojiAvatarComponent,
    ToolCallConfirmComponent,
    ChatAiMessageComponent,
    XpertParametersCardComponent
  ],
  selector: 'chat-conversation',
  templateUrl: './conversation.component.html',
  styleUrl: 'conversation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatConversationComponent {
  eExecutionStatusEnum = XpertAgentExecutionStatusEnum

  readonly chatService = inject(ChatService)
  readonly homeService = inject(XpertHomeService)
  readonly appService = inject(AppService)

  readonly #toastr = injectToastr()

  // Inputs
  readonly xpert = input.required<IXpert>()
  // readonly chatInput = input.required<ChatInputComponent>()
  readonly showExecution = input<boolean, string | boolean>(false, {
    transform: booleanAttribute
  })

  // Outputs
  readonly chat = output<string>()

  // States
  readonly messages = this.chatService.messages
  readonly conversation = this.chatService.conversation
  readonly loadingConv = this.chatService.loadingConv

  readonly lastMessage = computed(() => this.messages()[this.messages().length - 1] as CopilotChatMessage)
  readonly lastExecutionId = computed(() => this.lastMessage()?.executionId)
  readonly conversationStatus = computed(() => this.conversation()?.status)
  readonly error = computed(() => this.conversation()?.error)
  readonly operation = computed(() => this.chatService.conversation()?.operation)
  readonly toolCalls = signal<ToolCall[]>(null)
  readonly #confirmOperation = computed(() =>
    this.toolCalls() ? { ...this.operation(), toolCalls: this.toolCalls().map((call) => ({ call })) } : null
  )
  readonly parameters = computed(() => this.xpert()?.agent?.parameters)

  readonly parametersValue = this.chatService.parametersValue

  constructor() {
    effect(
      () => {
        this.homeService.conversation.set(this.conversation() && { ...this.conversation(), messages: this.messages() })
      },
      { allowSignalWrites: true }
    )
  }

  onChat(statement: string) {
    this.chat.emit(statement)
  }

  onToolCalls(toolCalls: ToolCall[]) {
    this.toolCalls.set(toolCalls)
  }

  onConfirm() {
    this.chatService.chat({ confirm: true, operation: this.#confirmOperation() })
    this.chatService.updateConversation({
      status: 'busy',
      error: null
    })
  }

  onReject() {
    this.chatService.chat({ reject: true, operation: this.operation() })
    this.chatService.updateConversation({
      status: 'busy',
      error: null
    })
  }

  onRetry() {
    this.chatService.updateConversation({
      status: 'busy',
      error: null
    })
    this.chatService.chat({
      retry: true
    })
  }
}
