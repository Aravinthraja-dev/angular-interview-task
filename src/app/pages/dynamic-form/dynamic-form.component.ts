import { Component, OnInit } from '@angular/core';
import { FormFieldService } from '../../shared/services/form-field.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFields } from '../../shared/models/formFields';
import { CommonModule } from '@angular/common';
import { TextBoxComponent } from '../../shared/components/text-box/text-box.component';
import { NumberBoxComponent } from '../../shared/components/number-box/number-box.component';
import { RadioButtonComponent } from '../../shared/components/radio-button/radio-button.component';
import { SelectBoxComponent } from '../../shared/components/select-box/select-box.component';
import { DateBoxComponent } from '../../shared/components/date-box/date-box.component';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, TextBoxComponent, CommonModule, NumberBoxComponent, RadioButtonComponent, SelectBoxComponent, DateBoxComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent implements OnInit{
  formData!: FormGroup
  formConfig: FormFields[] = [];
  constructor(private formFieldService: FormFieldService) { }

  ngOnInit(): void {
    this.formFieldService.getFormFields().subscribe((data: FormFields[]) => {
      this.formConfig = data;
      this.createFormGroup(this.formConfig)
    })
  }

  createFormGroup(FormFields: FormFields[]) {
    const group: Record<string, FormControl> = {}
    for(let config of FormFields) {
      group[config.name] = new FormControl('', config.requiredYn === 'Y' ? Validators.required : null)
    }
    this.formData = new FormGroup(group);
  }

  onSubmit() {
    if(this.formData.valid) {
      console.log(this.formData.value)
      alert('Form submitted successfully')
      this.formData.reset();
    } else {
      this.markFormGroupTouched(this.formData)
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAllAsTouched();

      if(control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control as FormGroup);
      }
    })
  }
}
