import { Component, Input, OnInit } from '@angular/core';
import { Form, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFields } from '../../models/formFields';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-select-box',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './select-box.component.html',
  styleUrl: './select-box.component.scss'
})
export class SelectBoxComponent implements OnInit {
  @Input() FormData!: FormGroup;
  @Input() FormConfig!: FormFields;
  private destroy$ = new Subject<void>();
  options: string[] = [];

  ngOnInit() {
    this.updateOptions();

    if (this.FormConfig.dependsOn) {
      const dependentControl = this.FormData.get(this.FormConfig.dependsOn);
      if (dependentControl) {
        dependentControl.valueChanges
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.updateOptions();
            this.FormData.get(this.FormConfig.name)?.setValue('');
          });
      }
    }
  }

  updateOptions() {
    if (this.FormConfig.options) {
      this.options = this.FormConfig.options;
    } else if (this.FormConfig.dependsOn && this.FormConfig.optionsMap) {
      const dependentValue = this.FormData.get(this.FormConfig.dependsOn)?.value;
      this.options = this.FormConfig.optionsMap[dependentValue] || [];
    } else {
      this.options = [];
    }
  }

  getOptions(): string[] {
    return this.options;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
