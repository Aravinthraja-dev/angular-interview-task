import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormFields } from "../models/formFields";
import { Observable, shareReplay } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class FormFieldService {

    private formField$!: Observable<FormFields[]>;
    constructor (private http: HttpClient) { }

    getFormFields() {
        if(!this.formField$) {
            this.formField$ = this.http.get<FormFields[]>('/assets/json/form-fields.json')
            .pipe(shareReplay(1));
        }
        return this.formField$
    }
}