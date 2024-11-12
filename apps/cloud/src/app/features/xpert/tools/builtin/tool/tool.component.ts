import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, model } from '@angular/core'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatTooltipModule } from '@angular/material/tooltip'
import { routeAnimations } from '@metad/core'
import { NgmDensityDirective, NgmI18nPipe } from '@metad/ocap-angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { IBuiltinTool, IXpertToolset, XpertToolsetService } from 'apps/cloud/src/app/@core'
import { XpertToolBuiltinParametersComponent } from '../parameters/parameters.component'
import { XpertToolTestDialogComponent } from '../../tool-test'


@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatDialogModule,
    MatTooltipModule,
    MatSlideToggleModule,
    NgmI18nPipe,
    NgmDensityDirective,
    XpertToolBuiltinParametersComponent
  ],
  selector: 'xpert-tool-builtin-tool',
  templateUrl: './tool.component.html',
  styleUrl: 'tool.component.scss',
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XpertToolBuiltinToolComponent {

  readonly toolsetService = inject(XpertToolsetService)
  readonly #formBuilder = inject(FormBuilder)
  readonly #dialog = inject(MatDialog)
  readonly #cdr = inject(ChangeDetectorRef)
  readonly i18n = new NgmI18nPipe()

  readonly toolset = input<IXpertToolset>()
  readonly tool = input<IBuiltinTool>()
  readonly disabled = input<boolean>(false)
  readonly enabled = model<boolean>()

  readonly expand = model<boolean>(false)

  toggleExpand() {
    if (!this.disabled()) {
      this.expand.update((state) => !state)
    }
  }

  openToolTest(tool: Partial<IBuiltinTool>) {
    this.#dialog.open(XpertToolTestDialogComponent, {
      panelClass: 'medium',
      data: {
        tool: {
          name: tool.identity.name,
          description: this.i18n.transform(tool.description.human),
          schema: tool,
          toolset: this.toolset()
        }
      }
    }).afterClosed().subscribe({
      next: (result) => {
        //
      }
    })
  }
}
