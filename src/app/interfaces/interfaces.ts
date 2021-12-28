export interface Option {
    _id: string;
    optionNumber: number;
    optionDescription: string;
    options?: Option[];
    __v: number;
    action?: string;
    parentOpt?: string;
}

export interface RespOptions {
    results: Option[];
}