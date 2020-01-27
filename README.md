# Introduction

Robocure Research Project - Interactive Learning

The purpose of this solution is to enable behavioral interactions with learning content for the Softbanks Pepper robot.
Technically, the chosen implementation is an integration of storyline content and the javascript naoqi api.

Storyline was chosen for the userfriendly way to create websites that are specifically targeted for learning conent.
These websites can be integrated with a Learning Record Storye (`LRS`) system.
We have chosen to integrate with Learning Locker (`LL`).

## Getting Started

There are a few dependencies for being able to run this application.
Instructions are applied for windows - but should work in linux & mac os as well.

### Dependencies

#### Add to path

1. git (git-scm.com)
2. node (download node v8.11.1)
3. npm (comes with node)
4. python (download python 2.7.14 - must be 32 bit!!)
5. pip (download/install pip for python)
7. Optional dependencies (if you want to deploy to pepper)
    1. qipkg (install with pip https://pypi.org/project/qibuild/) -> make sure installed for python 2.7 32bit)
    2. scp (download Putty SCP pscp.exe and rename it to scp.exe for windows)
    3. ssh (download Putty SSH plink.exe and rename it to ssh.exe for windows)

#### Add to pythonpath

1.  naoqi qi framework (download pynaoqi-python2.7-2.5.5.5-win32-vs2013 and put bin folder in pythonpath environment variable)

### Installation

1. cd ./
2. npm install

## Configuration

In the package.json file on the root, you can specify some settings:

- Ip of the robot (used when )
- Ip of the google speech to text API bound to the pepper robot
- Password of the robot (used when loading new version to pepper)

## Build and Test

You can run the tasks via the commandline using npm.

List of the main tasks:

1. Building

- normalize - `Optionally normalize the audio files`
- build - `Create a new build from the source (src -> dist)`

    Tip: After building you can test by running the content in the browser of your machine.

1. Run remotely hosted content on robot

- startremote": `Simple script to load homepage onto the robot when hosted on a remote webserver`

    Tip: You can use the `http-server` nodejs module to easily host the content on a webserver.

2. Host on robot & run on robot

- update - `Add key, rebuild, package, host on pepper, and show homepage`
- package - `Package the current build`
- deploy - `Deploy the current package`
- startlocal - `Open homepage on the tablet of pepper - assuming the homepage is hosted on pepper itself`
- keys - `Add key to pageant to skip entering password (automatically send certificate to pepper when asked for password)`
- setcertificate": `Send certificate to pepper to allow the use of a certificate instead of a password`

After building you can test the browser version located in `/dist/browser`, it will connect to the robot to show the interactions while you can test the tablet version.

3. If you chose to run the modules remotely - keep in mind the necessary behaviours need to be deployed nonetheless.

- saxophone
- elephant
- taichichuan

This can also be done in choregraphe if preferred.

# Learning Record Store

The integrated Learning Record Store is `Learning Locker`, but any `LRS` system should be compatible.
Storyline has native integration with `LRS` systems, but extra integrations can be included with the `xapi_functions.js` support.

This is part of the solution provided by `https://xapi.ly/`, which allows custom logging without having the write code yourself.

# Integration

The integration consists of a javascript API which is extremely simple to use.

```Javascript
    Say("Hello world", { goToNextSlide: false });
    Say("Let me proceed", { goToNextSlide: true });
    Listen("What is the answer to this question", ["Yes", "No"]);
    Listen("What is 1 + 4", ["five", "four", "eight", "ten"]);
```

Let the robot say a particular sentence, and optionally proceed to the next slide using the `Say` method.
Let the robot listen to a particular answer after asking a question using the `Listen` method.

These simple commands can be taught to powerusers.

# Extending robot support

You can relatively easy extend support for robots by implementing a typescript class and including it in the project.

The `internals.ts` file maps the targets to its engine implementation.
Add your own keys to extend the available targets (robots).

```typescript

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

```

The engine implementations must extend the appropriate interface.
Right now the available interfaces are `ISpeechEngine` and `IListenEngine`.

```typescript

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

```

