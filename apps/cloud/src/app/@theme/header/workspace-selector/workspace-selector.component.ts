import { CdkMenuModule } from '@angular/cdk/menu'
import { CommonModule } from '@angular/common'
import { Component, DestroyRef, inject, model, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormsModule } from '@angular/forms'
import { MatTooltipModule } from '@angular/material/tooltip'
import { injectWorkspace } from '@metad/cloud/state'
import { TranslateModule } from '@ngx-translate/core'
import { NgxPermissionsService } from 'ngx-permissions'
import { map, tap } from 'rxjs/operators'
import { injectUser, IXpertWorkspace, OrderTypeEnum, Store, XpertWorkspaceService } from '../../../@core'
import { OverlayAnimation1 } from '@metad/core'
import { Router } from '@angular/router'

@Component({
  standalone: true,
  selector: 'pac-workspace-selector',
  templateUrl: 'workspace-selector.component.html',
  styleUrl: 'workspace-selector.component.scss',
  host: {
    class: 'pac-workspace-selector'
  },
  imports: [CommonModule, FormsModule, CdkMenuModule, TranslateModule, MatTooltipModule],
  animations: [OverlayAnimation1]
})
export class WorkspaceSelectorComponent {
  private readonly store = inject(Store)
  private readonly permissionsService = inject(NgxPermissionsService)
  private readonly destroyRef = inject(DestroyRef)
  readonly workspaceService = inject(XpertWorkspaceService)
  readonly router = inject(Router)

  readonly selectedWorkspace = injectWorkspace()
  readonly me = injectUser()

  readonly loading = signal(true)
  readonly workspaces = toSignal(
    this.workspaceService.getAllMy({ order: { updatedAt: OrderTypeEnum.DESC } }).pipe(
      map(({ items }) => items),
      tap(() => this.loading.set(false))
    ),
    { initialValue: null }
  )
  readonly selectedWorkspaces = model<string[]>([])

  selectWorkspace(ws: IXpertWorkspace) {
    this.store.setWorkspace(ws)
    this.router.navigate(['/xpert/w/', ws.id])
  }

  routeWorkspace(ws: IXpertWorkspace) {
    this.router.navigate(['/xpert/w/', ws.id])
  }
}
