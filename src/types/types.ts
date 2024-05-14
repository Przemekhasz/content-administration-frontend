export interface FilterConfig {
    field: string;
    type: 'string' | 'boolean' | 'number';
    label: string;
    options?: Array<{ label: string; value: any }>;
}

export interface DataModel {
    [key: string]: any;
}
