import { Injectable, Optional } from '@angular/core'
import {
  IndicatorBusinessState,
  isNumber,
  PeriodFunctions,
  QueryOptions,
  SmartFilterBarService,
  SmartIndicatorDataService
} from '@metad/ocap-core'
import { NgmDSCoreService } from '@metad/ocap-angular/core'
import { combineLatest, map } from 'rxjs'
import { Trend } from './types'

@Injectable()
export class NgmIndicatorService extends SmartIndicatorDataService<any, IndicatorBusinessState> {
  
  constructor(dsCoreService: NgmDSCoreService, @Optional() smartFilterBar?: SmartFilterBarService) {
    super(dsCoreService, smartFilterBar)
  }

  override selectQuery(options?: QueryOptions) {
    const lookBack = this.get((state) => state.lookBack)

    return combineLatest([
      super.selectQuery(options, null, [PeriodFunctions.CURRENT, PeriodFunctions.MOM, PeriodFunctions.YOY, PeriodFunctions.YTD], 0),
      super.selectQuery(options, null, [PeriodFunctions.CURRENT], lookBack ?? 1)
    ]).pipe(
      map(([current, trends]) => {
        if (current.error || trends.error) {
          return {
            indicator: this.indicator,
            error: `${(current.error ?? '').trim()}\n${(trends.error ?? '').trim()}`.trim()
          }
        }
        const items = trends.data?.filter((item) => isNumber((item as any).CURRENT))
        const start = (items[0] as any)?.CURRENT
        const end = (items[items.length - 1] as any)?.CURRENT
        return {
          indicator: this.indicator,
          trends: trends.data,
          data: current.data?.[0] as unknown[],
          trend: start > end ? Trend.Down : start < end ? Trend.Up : Trend.None
        }
      }),
    )
  }
}
