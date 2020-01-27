declare var annyang: any;

import { IListenEngine } from '../interfaces';

//
// The browser speech engine is limited in that it does not process unrecognized words.
// It also cannot retrieve the command from within a sentence. "yes that is true" should be "yes".
//

export default class BrowserListenEngine implements IListenEngine
{
    private language: string;

    constructor(language: string)
    {
        this.language = language;
    }

    public async listen(possibleAnswers: string[], callback: (said: string[]) => void): Promise<void>
    {
        let languageMapping: {[key: string]: string} = {
            "English": "en-US",
            "French": "fr-FR",
            "Dutch": "nl-NL"
        }

        let currentLanguage = languageMapping[this.language];
        let commands: {[key: string]: Function} = {};

        for (let cmd of possibleAnswers) 
        {
            let handler = function() {
                console.log("heard: " + this);
                callback([this as unknown as string]);
            }
            commands[cmd] = handler.bind(cmd);
        }
        
        console.log("annyang - adding commands, set language & start");
        annyang.addCommands(commands); // Add our commands to annyang
        annyang.setLanguage(currentLanguage); // Set language
        annyang.start(); // Start listening.
    }

    public cancel = async () => 
    {
        annyang.removeCommands();
    }
}

