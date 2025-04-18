import { CommonModule } from '@angular/common'
import { Component, forwardRef, input } from '@angular/core'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms'
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter'
import { MatDatepicker, MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
import { OcapCoreModule } from '@metad/ocap-angular/core'
import { getYear, setYear } from 'date-fns'


@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatInputModule, OcapCoreModule],
  selector: 'ngm-yearpicker',
  templateUrl: './yearpicker.component.html',
  styleUrls: ['./yearpicker.component.scss'],
  providers: [
    provideDateFnsAdapter({
      parse: {
        dateInput: `yyyy`
      },
      display: {
        dateInput: `yyyy`,
        monthYearLabel: 'LLL y',
        dateA11yLabel: 'MMMM d, y',
        monthYearA11yLabel: 'MMMM y'
      }
    }),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgmYearpickerComponent),
      multi: true
    }
  ]
})
export class NgmYearpickerComponent implements ControlValueAccessor {
  readonly label = input<string>('')

  date = new FormControl(new Date())

  /**
   * Invoked when the model has been changed
   */
  onChange: (_: any) => void = (_: any) => {}
  /**
   * Invoked when the model has been touched
   */
  onTouched: () => void = () => {}

  chosenYearHandler(event, datepicker: MatDatepicker<any>) {
    const ctrlValue = this.date.value ?? new Date()
    this.date.setValue(setYear(ctrlValue, getYear(event)))
    datepicker.close()
    this.onChange(this.date.value)
  }

  writeValue(obj: any): void {
    this.date.setValue(obj)
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.date.disable() : this.date.enable()
  }

  onDateChange(event: MatDatepickerInputEvent<any>) {
    this.onChange(event.value)
  }
}
