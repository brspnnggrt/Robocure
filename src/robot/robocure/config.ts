export default class Config {

    public static SentenceNotRecognized: {}[] = [{
        "English": "I did not understand, can you repeat for me?",
        "French": "Je n'ai pas compris, pouvez-vous répéter pour moi?",
        "Dutch": "Ik heb het niet begrepen, wil je dat nog eens herhalen?"
    },{
        "English": "Can you repeat that again please?",
        "French": "Pouvez-vous répéter cela s'il vous plaît?",
        "Dutch": "Kun je dat nog eens herhalen alstublieft?"
    },{
        "English": "What did you say exactly?",
        "French": "Qu'as-tu dit exactement?",
        "Dutch": "Wat heb je precies gezegd?"
    }];

    public static GuitarAnimation: string = "^start(animations/Stand/Waiting/AirGuitar_1) ^wait(animations/Stand/Waiting/AirGuitar_1)";
    public static SaxophoneAnimation: string = "^start(robocure_interactive_learning/saxophone) ^wait(robocure_interactive_learning/saxophone)";
    public static ElephantAnimation: string = "^start(robocure_interactive_learning/elephant) ^wait(robocure_interactive_learning/elephant)";
    public static TaiChiChuanAnimation: string = "^start(robocure_interactive_learning/taichichuan) ^wait(robocure_interactive_learning/taichichuan)";

    public static Introductions: { [key: string]: { "Text": string, "ExpectedResponse": string[] }}[] = [{
        "English": {
            "Text": "Hey! I'm Peppper! I am a robot, and I love to sing and play guitar. " + Config.GuitarAnimation + " Are you ready?",
            "ExpectedResponse": ["Yes", "Start"]
        },
        "French": {
            "Text": "Bonjour! Je suis Peppper! Je suis un robot et j'aime chanter et jouer de la guitare. " + Config.GuitarAnimation + " Êtes-vous prêt?",
            "ExpectedResponse": ["Oui", "Commencer"]
        },
        "Dutch": {
            "Text": "Hallo! Ik ben Peppper! Ik ben een robot, en ik hou van zingen en gitaar spelen. " + Config.GuitarAnimation + " Ben je er klaar voor?",
            "ExpectedResponse": ["Ja", "Start"]
        } 
    },{
        "English": {
            "Text": "Hey! I'm Peppper! I am a robot, and I love to sing and play saxophone. " + Config.SaxophoneAnimation + " Are you ready?",
            "ExpectedResponse": ["Yes", "Start"]
        },
        "French": {   
            "Text": "Bonjour! Je suis Peppper! Je suis un robot et j'aime chanter et jouer de la saxophone. " + Config.SaxophoneAnimation + " Êtes-vous prêt?",
            "ExpectedResponse": ["Oui", "Commencer"]
        },
        "Dutch": {
            "Text": "Hallo! Ik ben Peppper! Ik ben een robot, en ik hou van zingen en saxofoon spelen. " + Config.SaxophoneAnimation + " Ben je er klaar voor?",
            "ExpectedResponse": ["Ja", "Start"]
        }
    },{
        "English": {
            "Text": "Hey! I'm Peppper! I am a robot, and I love elephants. " + Config.ElephantAnimation + " Are you ready?",
            "ExpectedResponse": ["Yes", "Start"]
        },
        "French": {   
            "Text": "Bonjour! Je suis Peppper! Je suis un robot et j'aime les éléphants. " + Config.ElephantAnimation + " Êtes-vous prêt?",
            "ExpectedResponse": ["Oui", "Commencer"]
        },
        "Dutch": {
            "Text": "Hallo! Ik ben Peppper! Ik ben een robot, en ik hou van olifanten. " + Config.ElephantAnimation + " Ben je er klaar voor?",
            "ExpectedResponse": ["Ja", "Start"]
        }
    },{
        "English": {
            "Text": "Hey! I'm Peppper! I am a robot, and I love tai chi. " + Config.TaiChiChuanAnimation + " Are you ready?",
            "ExpectedResponse": ["Yes", "Start"]
        },
        "French": {   
            "Text": "Bonjour! Je suis Peppper! Je suis un robot et j'aime tai chi. " + Config.TaiChiChuanAnimation + " Êtes-vous prêt?",
            "ExpectedResponse": ["Oui", "Commencer"]
        },
        "Dutch": {
            "Text": "Hallo! Ik ben Peppper! Ik ben een robot, en ik hou van tai chi. " + Config.TaiChiChuanAnimation + " Ben je er klaar voor?",
            "ExpectedResponse": ["Ja", "Start"]
        }
    }];
}
