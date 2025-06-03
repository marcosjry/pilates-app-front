import { CommonModule } from '@angular/common';
import { Component, forwardRef, Injector, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-generic-input',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepicker,
    MatDatepickerModule
  ],
  templateUrl: './generic-input.component.html',
  styleUrl: './generic-input.component.scss',
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericInputComponent),
      multi: true,
    },
  ],
})
export class GenericInputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() submitted: boolean = false;
  @Input() options: { value: any; label: string }[] = [];

  public isPasswordVisible: boolean = false;

  public internalFormControl: FormControl = new FormControl();
  private destroy$ = new Subject<void>();

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  @Optional() @Self() public ngControl?: NgControl | null = null;

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null, { optional: true, self: true });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
      if (this.type === 'select' && this.ngControl.control?.value === '') {
         this.ngControl.control?.setValue(null);
      }
    }

    this.internalFormControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.onChange(value);
      });

    const parentControl = this.ngControl?.control;
    if (parentControl?.disabled) {
      this.setDisabledState!(true);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: any): void {
    this.internalFormControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.internalFormControl.disable({ emitEvent: false })
      : this.internalFormControl.enable({ emitEvent: false });
  }

  onBlur(): void {
    this.onTouched();
  }

  hasError(errorCode: string): boolean {
    const control = this.ngControl?.control;
    return (
      !!control &&
      control.hasError(errorCode) &&
      (control.touched || this.submitted)
    );
  }

  get isInvalid(): boolean {
    const control = this.ngControl?.control;
    return (
      !!control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
