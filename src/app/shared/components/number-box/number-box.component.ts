import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFields } from '../../models/formFields';

@Component({
  selector: 'app-number-box',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './number-box.component.html',
  styleUrl: './number-box.component.scss'
})
export class NumberBoxComponent {
  @Input() FormData!: FormGroup;
  @Input() FormConfig!: FormFields;

}
