import { computed, Injectable, signal } from '@angular/core'
import { IChatConversation, IXpert, LanguagesEnum, OrderTypeEnum, XpertTypeEnum } from '../../@core/types'
import { derivedFrom } from 'ngxtension/derived-from'
import { map, pipe } from 'rxjs'
import { XpertHomeService } from '../../xpert'
import { injectXpertPreferences } from '@metad/cloud/state'

@Injectable()
export class ChatHomeService extends XpertHomeService {
  readonly #preferences = injectXpertPreferences()
  
  readonly xperts = derivedFrom(
    [
      this.xpertService
        .getMyAll({ where: { type: XpertTypeEnum.Agent, latest: true }, order: { createdAt: OrderTypeEnum.DESC } })
        .pipe(map(({ items }) => items)),
      this.lang
    ],
    pipe(
      map(([roles, lang]) => {
        if ([LanguagesEnum.SimplifiedChinese, LanguagesEnum.Chinese].includes(lang as LanguagesEnum)) {
          return roles?.map((role) => ({ ...role, title: role.titleCN || role.title }))
        } else {
          return roles
        }
      })
    ),
    { initialValue: null }
  )

  readonly xpert = signal<IXpert>(null)
  
  readonly conversationTitle = computed(() => this.conversation()?.title)
  
  readonly sortOrder = computed(() => this.#preferences()?.sortOrder)

  readonly sortedXperts = computed(() => {
    const xperts = this.xperts()
    const sortOrder = this.sortOrder()
    if (xperts && sortOrder) {
      const sortOrderMap = new Map(sortOrder.map((id, index) => [id, index]))
      return [...xperts].sort(
        (a, b) =>
          (sortOrderMap.get(a.id) ?? 0) - (sortOrderMap.get(b.id) ?? 0) ||
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    }

    return xperts
  })
}
