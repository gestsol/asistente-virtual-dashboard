//AssistantsVirtuals
// Generated by https://quicktype.io
export interface VirtualAssistant {
    _id: string;
    name: string;
    phone: string;
    wasi_device_id: string;
    wasi_token: string;
    __v: number;
}

export interface RespAssistants {
    status: string;
    virtualAssistant?: VirtualAssistant;
    results: VirtualAssistant[];
}


//Options
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

//DataModal
export interface OptionDataModal {
    id_?: string;
    optionNumber?: number;
    optionDescription?: string;
    action?: string;
    options?: Option[];
}

