import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { CdkListboxModule } from '@angular/cdk/listbox'
import { CdkMenuModule } from '@angular/cdk/menu'
import { CommonModule } from '@angular/common'
import { Component, effect, inject, signal, ViewContainerRef } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatTooltipModule } from '@angular/material/tooltip'
import { Router } from '@angular/router'
import {
  EnvironmentService,
  getErrorMessage,
  IEnvironment,
  IfAnimation,
  injectToastr,
  OrderTypeEnum,
  TEnvironmentVariable,
} from '@cloud/app/@core'
import { linkedModel } from '@metad/core'
import { injectConfirmDelete, injectConfirmUnique, NgmSpinComponent } from '@metad/ocap-angular/common'
import { effectAction } from '@metad/ocap-angular/core'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { derivedFrom } from 'ngxtension/derived-from'
import { BehaviorSubject, EMPTY, Observable, pipe } from 'rxjs'
import { catchError, combineLatestWith, debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators'
import { NgmSelectComponent } from '../../common'
import { VariableTypeOptions } from '../types'

const AutoSaveDebounceTime = 2000

@Component({
  selector: 'xpert-environment-manage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CdkMenuModule,
    CdkListboxModule,
    DragDropModule,
    MatTooltipModule,

    NgmSpinComponent,
    NgmSelectComponent
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss',
  animations: [IfAnimation]
})
export class XpertEnvironmentManageComponent {
  readonly #dialog = inject(Dialog)
  readonly #dialogRef = inject(DialogRef)
  readonly #data = inject<{ workspaceId: string }>(DIALOG_DATA)
  readonly environmentService = inject(EnvironmentService)
  readonly #translate = inject(TranslateService)
  readonly #toastr = injectToastr()
  readonly #router = inject(Router)
  readonly confirmName = injectConfirmUnique()
  readonly confirmDelete = injectConfirmDelete()

  readonly workspaceId = signal(this.#data.workspaceId)
  readonly loading = signal(false)
  readonly #refresh$ = new BehaviorSubject<void>(null)

  readonly #environments = derivedFrom(
    [this.workspaceId],
    pipe(
      combineLatestWith(this.#refresh$),
      tap(() => this.loading.set(true)),
      switchMap(([[workspaceId]]) =>
        this.environmentService.getAllInOrg({
          where: {
            workspaceId
          },
          order: {
            updatedAt: OrderTypeEnum.DESC
          }
        })
      ),
      tap(() => this.loading.set(false)),
      map(({ items }) => items),
      startWith([] as IEnvironment[])
    )
  )

  readonly environments = linkedModel({
    initialValue: null,
    compute: () => this.#environments(),
    update: () => {}
  })

  readonly environmentId = signal<string>(null)
  readonly environment = linkedModel({
    initialValue: null,
    compute: () => this.environments()?.find((_) => _.id === this.environmentId()),
    update: (value) => {
      this.environments.update((state) => {
        const index = state.findIndex((_) => _.id === this.environmentId())
        if (index > -1) {
          state[index] = {
            ...state[index],
            ...value
          }
        }
        return [...state]
      })
      this.saveEnvironment(value)
    }
  })

  readonly VariableTypeOptions = VariableTypeOptions

  constructor() {
    effect(
      () => {
        if (!this.environment() && this.environments()?.length) {
          this.environmentId.set(this.environments().find((_) => _.isDefault)?.id)
        }
      },
      { allowSignalWrites: true }
    )
  }

  addEnvironment() {
    this.confirmName({}, (name: string) => {
      this.loading.set(true)
      return this.environmentService.create({ 
        workspaceId: this.workspaceId(), 
        name,
        isDefault: !this.environments()?.length
      })
    }).subscribe({
      next: (env) => {
        this.loading.set(false)
        this.#refresh$.next()
      },
      error: (err) => {
        this.loading.set(false)
        this.#toastr.error(getErrorMessage(err))
      }
    })
  }

  setDefault(env: IEnvironment) {
    this.loading.set(true)
    this.environmentService.setDefault(env.id).subscribe({
      next: () => {
        this.loading.set(false)
        this.#refresh$.next()
      },
      error: (err) => {
        this.loading.set(false)
        this.#toastr.error(getErrorMessage(err))
      }
    })
  }

  setEnvironment(env: IEnvironment) {
    this.environmentId.set(env.id)
  }

  addVar() {
    this.environment.update((env) => {
      return {
        ...env,
        variables: [
          ...(env.variables ?? []),
          {
            name: '',
            value: '',
            type: 'default'
          }
        ]
      }
    })
  }

  updateVar(index: number, value: Partial<TEnvironmentVariable>) {
    this.environment.update((env) => {
      env.variables[index] = {
        ...env.variables[index],
        ...value
      }
      return {
        ...env,
        variables: [...env.variables]
      }
    })
  }

  removeVar(index: number) {
    this.environment.update((env) => {
      env.variables.splice(index, 1)
      return {
        ...env,
        variables: [...env.variables]
      }
    })
  }

  saveEnvironment = effectAction((origin: Observable<IEnvironment>) => {
    return origin.pipe(
      debounceTime(AutoSaveDebounceTime),
      tap(() => this.loading.set(true)),
      switchMap((env) => this.environmentService.update(env.id, env)),
      tap(() => this.loading.set(false)),
      catchError(() => {
        this.loading.set(false)
        return EMPTY
      })
    )
  })

  async delete() {
    this.confirmDelete({
      value: this.environment().name,
      information: await this.#translate.instant('PAC.Environment.DeleteEnv', {Default: 'Delete the environment and all its environment variables'})
    }, this.environmentService.delete(this.environment().id)).subscribe({
      next: () => {
        this.environments.update((envs) => envs.filter((_) => _.id !== this.environment().id))
        this.environmentId.set(this.environments()[0]?.id)
      }
    })
  }

  close() {
    this.#dialogRef.close()
  }
}
