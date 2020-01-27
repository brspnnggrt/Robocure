import { IListenEngine } from '../interfaces';

export default class PepperListenEngine implements IListenEngine
{
    private speechServerIp: string;
    private listeners: XMLHttpRequest[] = [];
    private paused: boolean = true;

    constructor(speechServerIp: string)
    {
        this.speechServerIp = speechServerIp;
    }

    public listen = async (possibleAnswers: string[], callback: (said: string[]) => void): Promise<void> =>
    {
        this.paused = false;
        let paramsArray: string[] = possibleAnswers.map((val:string, index: number) => "hint" + (index + 1) + "=" + val);
        let params: string = paramsArray.join("&");

        let xhr = new XMLHttpRequest();
        xhr.open(`GET`, `http://${this.speechServerIp}:5050/get_text?${params}`, true);
        xhr.onload = async () =>
        {
            let result = xhr.responseText;
            console.log("Recognized word: " + result);
            let found = [];

            for (var sentence of possibleAnswers)
                if (result.toLowerCase().indexOf(sentence.toLowerCase()) != -1) found.push(sentence);
            
            callback(found);
            if (this.paused == false) this.listen(possibleAnswers, callback);
        };
        xhr.send(null);
        this.listeners.push(xhr); // keep track of requests
    }

    public cancel = (): void =>
    {
        this.paused = true;
        for (var listener of this.listeners) 
        {
            console.log("aborting request");

            if (listener.status == 0)  // request is still running
            {
                // cancel on server
                var xhr = new XMLHttpRequest();
                xhr.open(`GET`, `http://${this.speechServerIp}:5050/cancel`, true);
                xhr.send(null);
            }

            // cancel on client (should happen automatically but make sure)
            listener.abort();
        }
        this.listeners = [];
    }
}

