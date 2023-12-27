import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core'
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'
import { nonBlank } from '@metad/core'
import { NgmCommonModule, NgmTableComponent, ResizerModule, SplitterModule } from '@metad/ocap-angular/common'
import { injectCopilotCommand, injectMakeCopilotActionable } from '@metad/ocap-angular/copilot'
import { OcapCoreModule, effectAction } from '@metad/ocap-angular/core'
import { NgmEntitySchemaComponent } from '@metad/ocap-angular/entity'
import { PropertyHierarchy } from '@metad/ocap-core'
import { NxDesignerModule, NxSettingsPanelService } from '@metad/story/designer'
import { ContentLoaderModule } from '@ngneat/content-loader'
import { ChatRequest } from 'ai'
import { MaterialModule, SharedModule, TranslationBaseComponent } from 'apps/cloud/src/app/@shared'
import { Observable } from 'rxjs'
import { distinctUntilChanged, filter, map, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators'
import zodToJsonSchema from 'zod-to-json-schema'
import { ToastrService, routeAnimations } from '../../../../@core'
import { AppService } from '../../../../app.service'
import { TablesJoinModule } from '../../tables-join'
import { HierarchySchema } from '../copilot'
import { ModelComponent } from '../model.component'
import { SemanticModelService } from '../model.service'
import { ModelDesignerType, TOOLBAR_ACTION_CATEGORY } from '../types'
import { ModelDimensionService } from './dimension.service'

@Component({
  standalone: true,
  selector: 'pac-model-dimension',
  templateUrl: 'dimension.component.html',
  styleUrls: ['dimension.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ModelDimensionService, NxSettingsPanelService],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ContentLoaderModule,

    NxDesignerModule,

    OcapCoreModule,
    ResizerModule,
    SplitterModule,
    NgmEntitySchemaComponent,
    NgmCommonModule,
    NgmTableComponent,

    TablesJoinModule
  ]
})
export class ModelDimensionComponent extends TranslationBaseComponent implements OnInit {
  public appService = inject(AppService)
  public modelService = inject(SemanticModelService)
  private modelComponent = inject(ModelComponent)
  private dimensionService = inject(ModelDimensionService)
  public settingsService = inject(NxSettingsPanelService)
  #toastrService = inject(ToastrService)
  #route = inject(ActivatedRoute)
  #router = inject(Router)
  #destroyRef = inject(DestroyRef)

  detailsOpen = false

  public readonly hierarchies = toSignal(this.dimensionService.hierarchies$)
  public readonly dimension = toSignal(this.dimensionService.dimension$)

  public readonly isMobile$ = this.appService.isMobile$
  public readonly dimension$ = this.dimensionService.dimension$

  public readonly error$ = this.dimensionService.name$.pipe(
    switchMap((entity) => this.modelService.selectEntitySetError(entity))
  )
  
  /**
  |--------------------------------------------------------------------------
  | Copilot
  |--------------------------------------------------------------------------
  */
  #createHierarchyCommand = injectCopilotCommand({
    name: 'h',
    description: 'Create a new hierarchy',
    examples: [`Create a new hierarchy`],
    systemPrompt: () => {
      return `Create a new hierarchy`
    },
    actions: [
      injectMakeCopilotActionable({
        name: 'create-model-hierarchy',
        description: 'Should always be used to properly format output',
        argumentAnnotations: [
          {
            name: 'hierarchy',
            type: 'object', // Add or change types according to your needs.
            description: 'The defination of hierarchy',
            required: true,
            properties: (<{ properties: any }>zodToJsonSchema(HierarchySchema)).properties
          }
        ],
        implementation: async (h: PropertyHierarchy): Promise<ChatRequest | void> => {
          console.log(`Create a new hierarchy by`, h)
          this.dimensionService.newHierarchy(h)
        }
      })
    ]
  })

  /**
  |--------------------------------------------------------------------------
  | Subscribers
  |--------------------------------------------------------------------------
  */
  #paramSub = this.#route.paramMap
    .pipe(
      startWith(this.#route.snapshot.paramMap),
      map((paramMap) => paramMap.get('id')),
      filter(nonBlank),
      map(decodeURIComponent),
      distinctUntilChanged(),
      takeUntilDestroyed()
    )
    .subscribe((id) => {
      this.dimensionService.init(id)
      this.modelService.setCrrentEntity(id)
    })

  #errorSub = this.error$.pipe(takeUntilDestroyed()).subscribe((err) => {
    this.#toastrService.error(err)
  })

  ngOnInit(): void {
    this.openDesigner()
    this.settingsService.setEditable(true)

    this.modelComponent.toolbarAction$
      .pipe(
        filter(({ category, action }) => category === TOOLBAR_ACTION_CATEGORY.DIMENSION),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(({ category, action }) => {
        if (action === 'NewHierarchy') {
          this.dimensionService.newHierarchy(null)
        } else if (action === 'RemoveHierarchy') {
          this.dimensionService.removeHierarchy('')
        }
      })
  }

  trackById(i: number, item: PropertyHierarchy) {
    return item.__id__
  }

  openDesignerPanel() {
    this.detailsOpen = true
  }

  readonly openDesigner = effectAction((origin$: Observable<void>) => {
    return origin$.pipe(
      withLatestFrom(this.dimension$),
      switchMap(([, dimension]) =>
        this.settingsService.openDesigner(
          ModelDesignerType.dimension,
          this.dimension$.pipe(
            map((dimension) => ({ modeling: dimension, shared: true, hierarchies: dimension.hierarchies }))
          ),
          dimension.__id__
        )
      ),
      tap((result: { modeling }) => {
        this.dimensionService.update(result.modeling)
      })
    )
  })

  editDimension() {
    this.openDesignerPanel()
    this.openDesigner()
  }

  editHierarchy(key: string) {
    this.openDesignerPanel()
    this.dimensionService.setupHierarchyDesigner(key)
  }

  removeHierarchy(key: string) {
    this.dimensionService.removeHierarchy(key)
  }

  newHierarchy() {
    this.dimensionService.newHierarchy(null)
  }

  duplicateHierarchy(key: string) {
    this.dimensionService.duplicateHierarchy(key)
  }

  navigateTo(id: string) {
    this.#router.navigate([`hierarchy/${id}`], { relativeTo: this.#route })
  }
}
