import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { CdkListboxModule } from '@angular/cdk/listbox'
import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, model, signal, viewChild } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { routeAnimations } from '@metad/core'
import { TranslateModule } from '@ngx-translate/core'
import {
  getErrorMessage,
  IXpertToolset,
  IXpertWorkspace,
  ToastrService,
  XpertToolsetService
} from 'apps/cloud/src/app/@core'
import { isNil, omitBy } from 'lodash-es'
import { XpertStudioConfigureMCPComponent } from '../configure/configure.component'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    DragDropModule,
    CdkListboxModule,
    XpertStudioConfigureMCPComponent
  ],
  selector: 'xpert-tool-mcp-create',
  templateUrl: './create.component.html',
  styleUrl: 'create.component.scss',
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XpertToolMCPCreateComponent {
  private readonly xpertToolsetService = inject(XpertToolsetService)
  readonly #toastr = inject(ToastrService)
  readonly #dialogRef = inject(DialogRef)
  readonly #data = inject<{ workspace: IXpertWorkspace; type: 'mcp' | 'openapi' | 'odata' }>(DIALOG_DATA)

  readonly workspace = signal(this.#data.workspace)

  readonly loading = signal(false)

  readonly providerTypes = model<('mcp' | 'openapi' | 'odata')[]>([this.#data.type || 'mcp'])

  readonly toolset = model<IXpertToolset>()

  onValueChange(event: any) {
    this.toolset.set(event)
  }

  createTool() {
    this.xpertToolsetService
      .create({
        ...omitBy(this.toolset(), isNil),
        workspaceId: this.workspace()?.id
      })
      .subscribe({
        next: (result) => {
          this.#toastr.success('PAC.Messages.CreatedSuccessfully', { Default: 'Created Successfully!' }, result.name)
          this.#dialogRef.close(result)
        },
        error: (error) => {
          this.#toastr.error(getErrorMessage(error))
        }
      })
  }

  cancel() {
    this.#dialogRef.close()
  }

}
