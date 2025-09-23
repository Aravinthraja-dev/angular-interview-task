import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFields } from '../../models/formFields';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss'
})
export class RadioButtonComponent {
  @Input() FormData!: FormGroup;
  @Input() FormConfig!: FormFields;
}
