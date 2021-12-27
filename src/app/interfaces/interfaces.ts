export interface Option {
    _id: string;
    optionNumber: number;
    optionDescription: string;
    options?: any[];
    __v: number;
    action?: string;
    parentOpt?: string;
}