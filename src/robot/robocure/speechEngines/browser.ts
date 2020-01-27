declare var responsiveVoice: any;

import { ISpeechEngine } from '../interfaces';

export default class BrowserSpeechEngine implements ISpeechEngine
{
    private language: string;
    private canceled: boolean = true;

    constructor(language: string)
    {
        this.language = language;
    }

    public async say(text: string) 
    {
        this.canceled = false;
        let languageDict: {[key: string]: string} = {
            "English": "UK English Female",
            "French": "French Female",
            "Dutch": "Dutch Female"
        }
        let responsiveVoiceLanguage = languageDict[this.language];

        // remove naoqi specific syntax (ie: "^start(animations/Stand/Waiting/AirGuitar_1)")
        text = text.replace(/(\^.*\(.*\))/g, "");
        text = text.replace(/[\!\.\,\(\)\/\?\']/g, ",");

        return new Promise((resolve) => {
            responsiveVoice.speak(text, responsiveVoiceLanguage, { onend: resolve });
        });

    }

    public async cancel() {
        this.canceled = true;
        return responsiveVoice.cancel();
    }

    public isCanceled() {
        return this.canceled;
    }
}

