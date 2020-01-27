export interface ISpeechEngine {
    say(text: string): Promise<any>;
    cancel(): Promise<any>;
    isCanceled(): boolean;
}

export interface IListenEngine {
    listen(possibleAnswers: string[], callback: (said: string[]) => void): Promise<void>;
    cancel(): void;
}

export interface IState {
    readonly language: string;
    readonly ip: string;
    readonly speechServerIp: string;
    readonly target: string;
}