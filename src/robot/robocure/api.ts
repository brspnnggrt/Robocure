declare var QiSession: any;
declare var GetPlayer: any;

import Config from './config';
import Utils from './utils';
import Internals from './internals';
import { IState, ISpeechEngine, IListenEngine } from './interfaces';

class Api
{
    public state: IState = null;

    private serviceCache = {};
    private session: Promise<any>;
    private speechEngine: ISpeechEngine;
    private listenEngine: IListenEngine;

    constructor(language: string)
    {
        // set state
        this.state = {
            ip: Utils.getParameterByName(`robocure_pepper_ip`),
            language: language || `English`,
            speechServerIp: Utils.getParameterByName(`robocure_speech_ip`),
            target: Utils.getParameterByName(`target`)
        };
        if (window.ROBOCURE_DEBUG) alert("target: " + this.state.target);

        // initialize Robocure javascript module
        this.serviceCache = {};

        // Connecto to Naoqi
        // You need to specify 80 to avoid issues
        // when the module is hosted on a different port the browser will automatically use this wrong port in the request!!
        console.log("connecting to " + this.state.ip);
        this.session = new Promise((res: any, rej: any) => QiSession((s: any) => {
            if (window.ROBOCURE_DEBUG) alert("load qisession success");
            res(s);
        }, () => rej, this.state.ip + ":80"));

        // Load TTS service from naoqi
        console.log("setting language to: " + language);
        Internals.getService("ALTextToSpeech", this.session, this.serviceCache).then((tts) =>
        {
            // Set language
            if (window.ROBOCURE_DEBUG) alert("tts loaded, setting language");
            tts.setLanguage(language);
            var xhr = new XMLHttpRequest();
            xhr.open(`GET`, `http://${this.state.speechServerIp}:5050/set_language?language=${this.state.language}`, true);
            xhr.send(null);

            // Start intro
            if (window.ROBOCURE_DEBUG) alert("starting intro");
            let randomSelectedIntro = Config.Introductions[Utils.generateRandomIndex(Config.Introductions.length - 1)][this.state.language];
            this.listen(randomSelectedIntro.Text, randomSelectedIntro.ExpectedResponse);
        });

        // Create engines
        let ttsServicePromise = Internals.getService("ALAnimatedSpeech", this.session, this.serviceCache);
        this.speechEngine = Internals.getTargetedSpeechEngine(this.state, ttsServicePromise);
        this.listenEngine = Internals.getTargetedListenEngine(this.state);
    }

    public say = async (text: string, options: {goToNextSlide: boolean}): Promise<void> =>
    {
        console.log("Saying: " + text + " - load next slide after pronounication: " + options.goToNextSlide);

        this.listenEngine.cancel() // stop active listening
        this.speechEngine.cancel(); // stop active talking

        return new Promise((resolve) => {
            // Wait 800 ms before speaking
            setTimeout(async () =>
            {    
                await this.speechEngine.say(text);

                console.log("finished speaking");
                if (options.goToNextSlide != false && !this.speechEngine.isCanceled()) 
                {
                    console.log("Going to next slide");
                    var currentValue = GetPlayer().GetVar("NextSlide");
                    GetPlayer().SetVar("NextSlide", ++currentValue);
                } 

                resolve();

            }, 800);
        });
    }

    public listen = async (question: string, possibleAnswers: any[]): Promise<void> =>
    {
        console.log("Listening for: " + possibleAnswers.join(", "));

        // Start with asking question
        await this.say(question, { goToNextSlide: false });

        // Processing of results defined in function
        let processResults = (foundAnswers: string[]) =>
        {
            let found: boolean = false;
            for (let sentence of foundAnswers)
            {
                console.log("heard: " + sentence);
                let variable = sentence.replace(/ /g,""); // regex for replacing all spaces

                console.log("Adjusting variable: " + variable);
                let currentValue = GetPlayer().GetVar(variable);
                GetPlayer().SetVar(variable, ++currentValue);

                if (currentValue != null) found = true;
            }
            if (!found) {
                let sentenceNotRecognized: {[key: string]: string} = Config.SentenceNotRecognized[Utils.generateRandomIndex(Config.SentenceNotRecognized.length - 1)];
                this.listen(sentenceNotRecognized[this.state.language], possibleAnswers);
            }
        }

        // Listen and wait for answeres
        this.listenEngine.listen(possibleAnswers, async (foundAnswers: string[]) => {
            processResults(foundAnswers);
        });
    }
}

declare global {
    interface Window {
        RobocureInstance: Api;
        Say: Function;
        Listen: Function;
        ROBOCURE_DEBUG: boolean;
    }
}

window.ROBOCURE_DEBUG = false

if (window.ROBOCURE_DEBUG) alert("loading...");
let language = document.getElementsByTagName("html")[0].getAttribute("lang").split("-")[0];
let languageMapping: {[key: string]: string} = {
    "en": "English",
    "fr": "French",
    "nl": "Dutch"
}
window.RobocureInstance = new Api(languageMapping[language]);
window.Say = window.RobocureInstance.say; // Say("Hello world", { goToNextSlide: false });
window.Listen = window.RobocureInstance.listen; // Listen("What is the answer to this question", ["Yes", "No"]);
