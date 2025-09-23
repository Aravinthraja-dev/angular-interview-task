import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFields } from '../../models/formFields';

@Component({
  selector: 'app-date-box',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './date-box.component.html',
  styleUrl: './date-box.component.scss'
})
export class DateBoxComponent {
  @Input() FormData!: FormGroup;
  @Input() FormConfig!: FormFields;
}
