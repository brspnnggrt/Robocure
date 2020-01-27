import { ISpeechEngine } from '../interfaces';

export default class PepperSpeechEngine implements ISpeechEngine
{
    private language: string;
    private ttsServicePromise: Promise<any>;
    private canceled: boolean = true;

    constructor(language: string, ttsServicePromise: Promise<any>)
    {
        this.language = language;
        this.ttsServicePromise = ttsServicePromise;
    }

    public async say(text: string) 
    {
        this.canceled = false;
        let session = await this.ttsServicePromise;
        return session.say(text, this.language);
    }

    public async cancel() {
        this.canceled = true;
        let session = await this.ttsServicePromise;
        return session._stopAll(true);
    }

    public isCanceled() {
        return this.canceled;
    }
}

