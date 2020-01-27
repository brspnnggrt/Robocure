declare var GetPlayer: any;

import { ISpeechEngine, IListenEngine, IState } from './interfaces';
import BrowserSpeechEngine from './speechEngines/browser';
import PepperSpeechEngine from './speechEngines/pepper';
import BrowserListenEngine from './listenEngines/browser';
import PepperListenEngine from './listenEngines/pepper';

export default abstract class Internals {

    public static async getService(service: any, sessionPromise: any, serviceCache: any) 
    {
        if (serviceCache[service] == null) 
        {
            let actualSession = await sessionPromise;
            serviceCache[service] = await actualSession.service(service);
        }
        return serviceCache[service];
    };

    public static getTargetedSpeechEngine(state: IState, ttsServicePromise: Promise<any>): ISpeechEngine
    {        
        let availableSpeechEngines: { [key: string]: ISpeechEngine } = {
            "browser": new BrowserSpeechEngine(state.language),
            "pepper": new PepperSpeechEngine(state.language, ttsServicePromise)
        }

        return availableSpeechEngines[state.target];
    };

    public static getTargetedListenEngine(state: IState): IListenEngine
    {
        let availableListenEngines: { [key: string]: IListenEngine } = {
            "browser": new BrowserListenEngine(state.language),
            "pepper": new PepperListenEngine(state.speechServerIp)
        }

        return availableListenEngines[state.target];
    }
}
