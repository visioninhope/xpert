import { Inject, Injectable, Optional, inject } from '@angular/core'
import type { CallbackManagerForRetrieverRun } from '@langchain/core/callbacks/manager'
import { Document } from '@langchain/core/documents'
import { BaseRetriever, type BaseRetrieverInput } from '@langchain/core/retrievers'
import { ModelsService } from '@metad/cloud/state'
import { BaseDimensionMemberRetriever, MEMBER_RETRIEVER_TOKEN } from '@metad/core'
import { NGXLogger } from 'ngx-logger'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class CustomRetrieverInput implements BaseRetrieverInput {}

@Injectable()
export class DimensionMemberRetriever extends BaseDimensionMemberRetriever {
  readonly logger = inject(NGXLogger)
  readonly modelsService = inject(ModelsService)
  
  lc_namespace = ['langchain', 'retrievers']

  constructor(@Inject(CustomRetrieverInput) @Optional() fields?: CustomRetrieverInput) {
    super(fields)
  }

  async _getRelevantDocuments(query: string, runManager?: CallbackManagerForRetrieverRun): Promise<Document[]> {
    // Pass `runManager?.getChild()` when invoking internal runnables to enable tracing
    // const additionalDocs = await someOtherRunnable.invoke(params, runManager?.getChild());

    this.logger.debug(`Retrieving documents for query: ${query}`)

    const results = await firstValueFrom(this.modelsService.getRelevantMembers(this.model(), this.cube(), query, 6))

    this.logger.debug(`Retrievd member documents for query: ${query}`, results)
    
    return results.map((item) => new Document(item))
  }
}

export function provideDimensionMemberRetriever() {
  return {
    provide: MEMBER_RETRIEVER_TOKEN,
    useClass: DimensionMemberRetriever
  }
}
