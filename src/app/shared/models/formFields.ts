export interface FormFields {
    label: string;
    name: string;
    field: string;
    requiredYn: string;
    errorMessage: string;
    inline: string;
    toasterMsg: string;
    options: string[];
    dependsOn: string;
    optionsMap: OptionsMap;  
}

export interface OptionsMap {
    [key: string]: string[]
}