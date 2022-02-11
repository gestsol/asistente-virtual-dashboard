export interface Trigger {
    selector: string[];
    insertInto: string[];
}

export interface Options {
    trigger: Trigger[];
    closeButton: boolean;
}

export interface EmojiPicker {
    options: Options;
    trigger: string[][];
    insertInto: string[];
}