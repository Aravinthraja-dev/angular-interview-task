import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFields } from '../../models/formFields';

@Component({
  selector: 'app-text-box',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './text-box.component.html',
  styleUrl: './text-box.component.scss'
})
export class TextBoxComponent {
  @Input() FormData!: FormGroup
  @Input() FormConfig!: FormFields

}
