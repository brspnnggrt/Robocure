(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./config", "./utils", "./internals"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var config_1 = require("./config");
    var utils_1 = require("./utils");
    var internals_1 = require("./internals");
    var Api = (function () {
        function Api(language) {
            var _this = this;
            this.state = null;
            this.serviceCache = {};
            this.say = function (text, options) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    console.log("Saying: " + text + " - load next slide after pronounication: " + options.goToNextSlide);
                    this.listenEngine.cancel();
                    this.speechEngine.cancel();
                    return [2, new Promise(function (resolve) {
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                var currentValue;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, this.speechEngine.say(text)];
                                        case 1:
                                            _a.sent();
                                            console.log("finished speaking");
                                            if (options.goToNextSlide != false && !this.speechEngine.isCanceled()) {
                                                console.log("Going to next slide");
                                                currentValue = GetPlayer().GetVar("NextSlide");
                                                GetPlayer().SetVar("NextSlide", ++currentValue);
                                            }
                                            resolve();
                                            return [2];
                                    }
                                });
                            }); }, 800);
                        })];
                });
            }); };
            this.listen = function (question, possibleAnswers) { return __awaiter(_this, void 0, void 0, function () {
                var processResults;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("Listening for: " + possibleAnswers.join(", "));
                            return [4, this.say(question, { goToNextSlide: false })];
                        case 1:
                            _a.sent();
                            processResults = function (foundAnswers) {
                                var found = false;
                                for (var _i = 0, foundAnswers_1 = foundAnswers; _i < foundAnswers_1.length; _i++) {
                                    var sentence = foundAnswers_1[_i];
                                    console.log("heard: " + sentence);
                                    var variable = sentence.replace(/ /g, "");
                                    console.log("Adjusting variable: " + variable);
                                    var currentValue = GetPlayer().GetVar(variable);
                                    GetPlayer().SetVar(variable, ++currentValue);
                                    if (currentValue != null)
                                        found = true;
                                }
                                if (!found) {
                                    var sentenceNotRecognized = config_1["default"].SentenceNotRecognized[utils_1["default"].generateRandomIndex(config_1["default"].SentenceNotRecognized.length - 1)];
                                    _this.listen(sentenceNotRecognized[_this.state.language], possibleAnswers);
                                }
                            };
                            this.listenEngine.listen(possibleAnswers, function (foundAnswers) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    processResults(foundAnswers);
                                    return [2];
                                });
                            }); });
                            return [2];
                    }
                });
            }); };
            this.state = {
                ip: utils_1["default"].getParameterByName("robocure_pepper_ip"),
                language: language || "English",
                speechServerIp: utils_1["default"].getParameterByName("robocure_speech_ip"),
                target: utils_1["default"].getParameterByName("target")
            };
            if (window.ROBOCURE_DEBUG)
                alert("target: " + this.state.target);
            this.serviceCache = {};
            console.log("connecting to " + this.state.ip);
            this.session = new Promise(function (res, rej) { return QiSession(function (s) {
                if (window.ROBOCURE_DEBUG)
                    alert("load qisession success");
                res(s);
            }, function () { return rej; }, _this.state.ip + ":80"); });
            console.log("setting language to: " + language);
            internals_1["default"].getService("ALTextToSpeech", this.session, this.serviceCache).then(function (tts) {
                if (window.ROBOCURE_DEBUG)
                    alert("tts loaded, setting language");
                tts.setLanguage(language);
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "http://" + _this.state.speechServerIp + ":5050/set_language?language=" + _this.state.language, true);
                xhr.send(null);
                if (window.ROBOCURE_DEBUG)
                    alert("starting intro");
                var randomSelectedIntro = config_1["default"].Introductions[utils_1["default"].generateRandomIndex(config_1["default"].Introductions.length - 1)][_this.state.language];
                _this.listen(randomSelectedIntro.Text, randomSelectedIntro.ExpectedResponse);
            });
            var ttsServicePromise = internals_1["default"].getService("ALAnimatedSpeech", this.session, this.serviceCache);
            this.speechEngine = internals_1["default"].getTargetedSpeechEngine(this.state, ttsServicePromise);
            this.listenEngine = internals_1["default"].getTargetedListenEngine(this.state);
        }
        return Api;
    }());
    window.ROBOCURE_DEBUG = false;
    if (window.ROBOCURE_DEBUG)
        alert("loading...");
    var language = document.getElementsByTagName("html")[0].getAttribute("lang").split("-")[0];
    var languageMapping = {
        "en": "English",
        "fr": "French",
        "nl": "Dutch"
    };
    window.RobocureInstance = new Api(languageMapping[language]);
    window.Say = window.RobocureInstance.say;
    window.Listen = window.RobocureInstance.listen;
});
},{"./config":2,"./internals":3,"./utils":8}],2:[function(require,module,exports){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Config = (function () {
        function Config() {
        }
        Config.SentenceNotRecognized = [{
                "English": "I did not understand, can you repeat for me?",
                "French": "Je n'ai pas compris, pouvez-vous répéter pour moi?",
                "Dutch": "Ik heb het niet begrepen, wil je dat nog eens herhalen?"
            }, {
                "English": "Can you repeat that again please?",
                "French": "Pouvez-vous répéter cela s'il vous plaît?",
                "Dutch": "Kun je dat nog eens herhalen alstublieft?"
            }, {
                "English": "What did you say exactly?",
                "French": "Qu'as-tu dit exactement?",
                "Dutch": "Wat heb je precies gezegd?"
            }];
        Config.GuitarAnimation = "^start(animations/Stand/Waiting/AirGuitar_1) ^wait(animations/Stand/Waiting/AirGuitar_1)";
        Config.SaxophoneAnimation = "^start(robocure_interactive_learning/saxophone) ^wait(robocure_interactive_learning/saxophone)";
        Config.ElephantAnimation = "^start(robocure_interactive_learning/elephant) ^wait(robocure_interactive_learning/elephant)";
        Config.TaiChiChuanAnimation = "^start(robocure_interactive_learning/taichichuan) ^wait(robocure_interactive_learning/taichichuan)";
        Config.Introductions = [{
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
            }, {
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
            }, {
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
            }, {
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
        return Config;
    }());
    exports["default"] = Config;
});
},{}],3:[function(require,module,exports){
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./speechEngines/browser", "./speechEngines/pepper", "./listenEngines/browser", "./listenEngines/pepper"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var browser_1 = require("./speechEngines/browser");
    var pepper_1 = require("./speechEngines/pepper");
    var browser_2 = require("./listenEngines/browser");
    var pepper_2 = require("./listenEngines/pepper");
    var Internals = (function () {
        function Internals() {
        }
        Internals.getService = function (service, sessionPromise, serviceCache) {
            return __awaiter(this, void 0, void 0, function () {
                var actualSession, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(serviceCache[service] == null)) return [3, 3];
                            return [4, sessionPromise];
                        case 1:
                            actualSession = _c.sent();
                            _a = serviceCache;
                            _b = service;
                            return [4, actualSession.service(service)];
                        case 2:
                            _a[_b] = _c.sent();
                            _c.label = 3;
                        case 3: return [2, serviceCache[service]];
                    }
                });
            });
        };
        ;
        Internals.getTargetedSpeechEngine = function (state, ttsServicePromise) {
            var availableSpeechEngines = {
                "browser": new browser_1["default"](state.language),
                "pepper": new pepper_1["default"](state.language, ttsServicePromise)
            };
            return availableSpeechEngines[state.target];
        };
        ;
        Internals.getTargetedListenEngine = function (state) {
            var availableListenEngines = {
                "browser": new browser_2["default"](state.language),
                "pepper": new pepper_2["default"](state.speechServerIp)
            };
            return availableListenEngines[state.target];
        };
        return Internals;
    }());
    exports["default"] = Internals;
});
},{"./listenEngines/browser":4,"./listenEngines/pepper":5,"./speechEngines/browser":6,"./speechEngines/pepper":7}],4:[function(require,module,exports){
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var BrowserListenEngine = (function () {
        function BrowserListenEngine(language) {
            var _this = this;
            this.cancel = function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    annyang.removeCommands();
                    return [2];
                });
            }); };
            this.language = language;
        }
        BrowserListenEngine.prototype.listen = function (possibleAnswers, callback) {
            return __awaiter(this, void 0, void 0, function () {
                var languageMapping, currentLanguage, commands, _i, possibleAnswers_1, cmd, handler;
                return __generator(this, function (_a) {
                    languageMapping = {
                        "English": "en-US",
                        "French": "fr-FR",
                        "Dutch": "nl-NL"
                    };
                    currentLanguage = languageMapping[this.language];
                    commands = {};
                    for (_i = 0, possibleAnswers_1 = possibleAnswers; _i < possibleAnswers_1.length; _i++) {
                        cmd = possibleAnswers_1[_i];
                        handler = function () {
                            console.log("heard: " + this);
                            callback([this]);
                        };
                        commands[cmd] = handler.bind(cmd);
                    }
                    console.log("annyang - adding commands, set language & start");
                    annyang.addCommands(commands);
                    annyang.setLanguage(currentLanguage);
                    annyang.start();
                    return [2];
                });
            });
        };
        return BrowserListenEngine;
    }());
    exports["default"] = BrowserListenEngine;
});
},{}],5:[function(require,module,exports){
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var PepperListenEngine = (function () {
        function PepperListenEngine(speechServerIp) {
            var _this = this;
            this.listeners = [];
            this.paused = true;
            this.listen = function (possibleAnswers, callback) { return __awaiter(_this, void 0, void 0, function () {
                var paramsArray, params, xhr;
                var _this = this;
                return __generator(this, function (_a) {
                    this.paused = false;
                    paramsArray = possibleAnswers.map(function (val, index) { return "hint" + (index + 1) + "=" + val; });
                    params = paramsArray.join("&");
                    xhr = new XMLHttpRequest();
                    xhr.open("GET", "http://" + this.speechServerIp + ":5050/get_text?" + params, true);
                    xhr.onload = function () { return __awaiter(_this, void 0, void 0, function () {
                        var result, found, _i, possibleAnswers_1, sentence;
                        return __generator(this, function (_a) {
                            result = xhr.responseText;
                            console.log("Recognized word: " + result);
                            found = [];
                            for (_i = 0, possibleAnswers_1 = possibleAnswers; _i < possibleAnswers_1.length; _i++) {
                                sentence = possibleAnswers_1[_i];
                                if (result.toLowerCase().indexOf(sentence.toLowerCase()) != -1)
                                    found.push(sentence);
                            }
                            callback(found);
                            if (this.paused == false)
                                this.listen(possibleAnswers, callback);
                            return [2];
                        });
                    }); };
                    xhr.send(null);
                    this.listeners.push(xhr);
                    return [2];
                });
            }); };
            this.cancel = function () {
                _this.paused = true;
                for (var _i = 0, _a = _this.listeners; _i < _a.length; _i++) {
                    var listener = _a[_i];
                    console.log("aborting request");
                    if (listener.status == 0) {
                        var xhr = new XMLHttpRequest();
                        xhr.open("GET", "http://" + _this.speechServerIp + ":5050/cancel", true);
                        xhr.send(null);
                    }
                    listener.abort();
                }
                _this.listeners = [];
            };
            this.speechServerIp = speechServerIp;
        }
        return PepperListenEngine;
    }());
    exports["default"] = PepperListenEngine;
});
},{}],6:[function(require,module,exports){
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var BrowserSpeechEngine = (function () {
        function BrowserSpeechEngine(language) {
            this.canceled = true;
            this.language = language;
        }
        BrowserSpeechEngine.prototype.say = function (text) {
            return __awaiter(this, void 0, void 0, function () {
                var languageDict, responsiveVoiceLanguage;
                return __generator(this, function (_a) {
                    this.canceled = false;
                    languageDict = {
                        "English": "UK English Female",
                        "French": "French Female",
                        "Dutch": "Dutch Female"
                    };
                    responsiveVoiceLanguage = languageDict[this.language];
                    text = text.replace(/(\^.*\(.*\))/g, "");
                    text = text.replace(/[\!\.\,\(\)\/\?\']/g, ",");
                    return [2, new Promise(function (resolve) {
                            responsiveVoice.speak(text, responsiveVoiceLanguage, { onend: resolve });
                        })];
                });
            });
        };
        BrowserSpeechEngine.prototype.cancel = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.canceled = true;
                    return [2, responsiveVoice.cancel()];
                });
            });
        };
        BrowserSpeechEngine.prototype.isCanceled = function () {
            return this.canceled;
        };
        return BrowserSpeechEngine;
    }());
    exports["default"] = BrowserSpeechEngine;
});
},{}],7:[function(require,module,exports){
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var PepperSpeechEngine = (function () {
        function PepperSpeechEngine(language, ttsServicePromise) {
            this.canceled = true;
            this.language = language;
            this.ttsServicePromise = ttsServicePromise;
        }
        PepperSpeechEngine.prototype.say = function (text) {
            return __awaiter(this, void 0, void 0, function () {
                var session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.canceled = false;
                            return [4, this.ttsServicePromise];
                        case 1:
                            session = _a.sent();
                            return [2, session.say(text, this.language)];
                    }
                });
            });
        };
        PepperSpeechEngine.prototype.cancel = function () {
            return __awaiter(this, void 0, void 0, function () {
                var session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.canceled = true;
                            return [4, this.ttsServicePromise];
                        case 1:
                            session = _a.sent();
                            return [2, session._stopAll(true)];
                    }
                });
            });
        };
        PepperSpeechEngine.prototype.isCanceled = function () {
            return this.canceled;
        };
        return PepperSpeechEngine;
    }());
    exports["default"] = PepperSpeechEngine;
});
},{}],8:[function(require,module,exports){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Utils = (function () {
        function Utils() {
        }
        Utils.getParameterByName = function (name, url) {
            if (!url)
                url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
            if (!results)
                return null;
            if (!results[2])
                return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        };
        Utils.generateRandomIndex = function (maximum) {
            return Math.floor(Math.random() * (maximum + 1));
        };
        return Utils;
    }());
    exports["default"] = Utils;
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvcm9ib3Qvcm9ib2N1cmUvYXBpLnRzIiwic3JjL3JvYm90L3JvYm9jdXJlL2NvbmZpZy50cyIsInNyYy9yb2JvdC9yb2JvY3VyZS9pbnRlcm5hbHMudHMiLCJzcmMvcm9ib3Qvcm9ib2N1cmUvbGlzdGVuRW5naW5lcy9icm93c2VyLnRzIiwic3JjL3JvYm90L3JvYm9jdXJlL2xpc3RlbkVuZ2luZXMvcGVwcGVyLnRzIiwic3JjL3JvYm90L3JvYm9jdXJlL3NwZWVjaEVuZ2luZXMvYnJvd3Nlci50cyIsInNyYy9yb2JvdC9yb2JvY3VyZS9zcGVlY2hFbmdpbmVzL3BlcHBlci50cyIsInNyYy9yb2JvdC9yb2JvY3VyZS91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNHQSxtQ0FBOEI7SUFDOUIsaUNBQTRCO0lBQzVCLHlDQUFvQztJQUdwQztRQVNJLGFBQVksUUFBZ0I7WUFBNUIsaUJBNENDO1lBbkRNLFVBQUssR0FBVyxJQUFJLENBQUM7WUFFcEIsaUJBQVksR0FBRyxFQUFFLENBQUM7WUFtRG5CLFFBQUcsR0FBRyxVQUFPLElBQVksRUFBRSxPQUFpQzs7O29CQUUvRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsMkNBQTJDLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUVyRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFBO29CQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUUzQixXQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTzs0QkFFdkIsVUFBVSxDQUFDOzs7O2dEQUVQLFdBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUE7OzRDQUFqQyxT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O1FBQ0wseUJBQUM7SUFBRCxDQTVCQSxBQTRCQyxJQUFBOzs7Ozs7Ozs7Ozs7Ozs7SUM5QkQ7UUFBQTtRQWdCQSxDQUFDO1FBZGlCLHdCQUFrQixHQUFoQyxVQUFpQyxJQUFZLEVBQUUsR0FBWTtZQUN2RCxJQUFJLENBQUMsR0FBRztnQkFBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDckMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZDLElBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsbUJBQW1CLENBQUMsRUFDdkQsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLE9BQU87Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQUUsT0FBTyxFQUFFLENBQUM7WUFDM0IsT0FBTyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFFYSx5QkFBbUIsR0FBakMsVUFBa0MsT0FBZTtZQUM3QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUVMLFlBQUM7SUFBRCxDQWhCQSxBQWdCQyxJQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZGVjbGFyZSB2YXIgUWlTZXNzaW9uOiBhbnk7XHJcbmRlY2xhcmUgdmFyIEdldFBsYXllcjogYW55O1xyXG5cclxuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbmZpZyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IEludGVybmFscyBmcm9tICcuL2ludGVybmFscyc7XHJcbmltcG9ydCB7IElTdGF0ZSwgSVNwZWVjaEVuZ2luZSwgSUxpc3RlbkVuZ2luZSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XHJcblxyXG5jbGFzcyBBcGlcclxue1xyXG4gICAgcHVibGljIHN0YXRlOiBJU3RhdGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgc2VydmljZUNhY2hlID0ge307XHJcbiAgICBwcml2YXRlIHNlc3Npb246IFByb21pc2U8YW55PjtcclxuICAgIHByaXZhdGUgc3BlZWNoRW5naW5lOiBJU3BlZWNoRW5naW5lO1xyXG4gICAgcHJpdmF0ZSBsaXN0ZW5FbmdpbmU6IElMaXN0ZW5FbmdpbmU7XHJcblxyXG4gICAgY29uc3RydWN0b3IobGFuZ3VhZ2U6IHN0cmluZylcclxuICAgIHtcclxuICAgICAgICAvLyBzZXQgc3RhdGVcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBpcDogVXRpbHMuZ2V0UGFyYW1ldGVyQnlOYW1lKGByb2JvY3VyZV9wZXBwZXJfaXBgKSxcclxuICAgICAgICAgICAgbGFuZ3VhZ2U6IGxhbmd1YWdlIHx8IGBFbmdsaXNoYCxcclxuICAgICAgICAgICAgc3BlZWNoU2VydmVySXA6IFV0aWxzLmdldFBhcmFtZXRlckJ5TmFtZShgcm9ib2N1cmVfc3BlZWNoX2lwYCksXHJcbiAgICAgICAgICAgIHRhcmdldDogVXRpbHMuZ2V0UGFyYW1ldGVyQnlOYW1lKGB0YXJnZXRgKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHdpbmRvdy5ST0JPQ1VSRV9ERUJVRykgYWxlcnQoXCJ0YXJnZXQ6IFwiICsgdGhpcy5zdGF0ZS50YXJnZXQpO1xyXG5cclxuICAgICAgICAvLyBpbml0aWFsaXplIFJvYm9jdXJlIGphdmFzY3JpcHQgbW9kdWxlXHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlQ2FjaGUgPSB7fTtcclxuXHJcbiAgICAgICAgLy8gQ29ubmVjdG8gdG8gTmFvcWlcclxuICAgICAgICAvLyBZb3UgbmVlZCB0byBzcGVjaWZ5IDgwIHRvIGF2b2lkIGlzc3Vlc1xyXG4gICAgICAgIC8vIHdoZW4gdGhlIG1vZHVsZSBpcyBob3N0ZWQgb24gYSBkaWZmZXJlbnQgcG9ydCB0aGUgYnJvd3NlciB3aWxsIGF1dG9tYXRpY2FsbHkgdXNlIHRoaXMgd3JvbmcgcG9ydCBpbiB0aGUgcmVxdWVzdCEhXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjb25uZWN0aW5nIHRvIFwiICsgdGhpcy5zdGF0ZS5pcCk7XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uID0gbmV3IFByb21pc2UoKHJlczogYW55LCByZWo6IGFueSkgPT4gUWlTZXNzaW9uKChzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5ST0JPQ1VSRV9ERUJVRykgYWxlcnQoXCJsb2FkIHFpc2Vzc2lvbiBzdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICByZXMocyk7XHJcbiAgICAgICAgfSwgKCkgPT4gcmVqLCB0aGlzLnN0YXRlLmlwICsgXCI6ODBcIikpO1xyXG5cclxuICAgICAgICAvLyBMb2FkIFRUUyBzZXJ2aWNlIGZyb20gbmFvcWlcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNldHRpbmcgbGFuZ3VhZ2UgdG86IFwiICsgbGFuZ3VhZ2UpO1xyXG4gICAgICAgIEludGVybmFscy5nZXRTZXJ2aWNlKFwiQUxUZXh0VG9TcGVlY2hcIiwgdGhpcy5zZXNzaW9uLCB0aGlzLnNlcnZpY2VDYWNoZSkudGhlbigodHRzKSA9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gU2V0IGxhbmd1YWdlXHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuUk9CT0NVUkVfREVCVUcpIGFsZXJ0KFwidHRzIGxvYWRlZCwgc2V0dGluZyBsYW5ndWFnZVwiKTtcclxuICAgICAgICAgICAgdHRzLnNldExhbmd1YWdlKGxhbmd1YWdlKTtcclxuICAgICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub3BlbihgR0VUYCwgYGh0dHA6Ly8ke3RoaXMuc3RhdGUuc3BlZWNoU2VydmVySXB9OjUwNTAvc2V0X2xhbmd1YWdlP2xhbmd1YWdlPSR7dGhpcy5zdGF0ZS5sYW5ndWFnZX1gLCB0cnVlKTtcclxuICAgICAgICAgICAgeGhyLnNlbmQobnVsbCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTdGFydCBpbnRyb1xyXG4gICAgICAgICAgICBpZiAod2luZG93LlJPQk9DVVJFX0RFQlVHKSBhbGVydChcInN0YXJ0aW5nIGludHJvXCIpO1xyXG4gICAgICAgICAgICBsZXQgcmFuZG9tU2VsZWN0ZWRJbnRybyA9IENvbmZpZy5JbnRyb2R1Y3Rpb25zW1V0aWxzLmdlbmVyYXRlUmFuZG9tSW5kZXgoQ29uZmlnLkludHJvZHVjdGlvbnMubGVuZ3RoIC0gMSldW3RoaXMuc3RhdGUubGFuZ3VhZ2VdO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbihyYW5kb21TZWxlY3RlZEludHJvLlRleHQsIHJhbmRvbVNlbGVjdGVkSW50cm8uRXhwZWN0ZWRSZXNwb25zZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBlbmdpbmVzXHJcbiAgICAgICAgbGV0IHR0c1NlcnZpY2VQcm9taXNlID0gSW50ZXJuYWxzLmdldFNlcnZpY2UoXCJBTEFuaW1hdGVkU3BlZWNoXCIsIHRoaXMuc2Vzc2lvbiwgdGhpcy5zZXJ2aWNlQ2FjaGUpO1xyXG4gICAgICAgIHRoaXMuc3BlZWNoRW5naW5lID0gSW50ZXJuYWxzLmdldFRhcmdldGVkU3BlZWNoRW5naW5lKHRoaXMuc3RhdGUsIHR0c1NlcnZpY2VQcm9taXNlKTtcclxuICAgICAgICB0aGlzLmxpc3RlbkVuZ2luZSA9IEludGVybmFscy5nZXRUYXJnZXRlZExpc3RlbkVuZ2luZSh0aGlzLnN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2F5ID0gYXN5bmMgKHRleHQ6IHN0cmluZywgb3B0aW9uczoge2dvVG9OZXh0U2xpZGU6IGJvb2xlYW59KTogUHJvbWlzZTx2b2lkPiA9PlxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2F5aW5nOiBcIiArIHRleHQgKyBcIiAtIGxvYWQgbmV4dCBzbGlkZSBhZnRlciBwcm9ub3VuaWNhdGlvbjogXCIgKyBvcHRpb25zLmdvVG9OZXh0U2xpZGUpO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RlbkVuZ2luZS5jYW5jZWwoKSAvLyBzdG9wIGFjdGl2ZSBsaXN0ZW5pbmdcclxuICAgICAgICB0aGlzLnNwZWVjaEVuZ2luZS5jYW5jZWwoKTsgLy8gc3RvcCBhY3RpdmUgdGFsa2luZ1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgLy8gV2FpdCA4MDAgbXMgYmVmb3JlIHNwZWFraW5nXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT5cclxuICAgICAgICAgICAgeyAgICBcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuc3BlZWNoRW5naW5lLnNheSh0ZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmlzaGVkIHNwZWFraW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZ29Ub05leHRTbGlkZSAhPSBmYWxzZSAmJiAhdGhpcy5zcGVlY2hFbmdpbmUuaXNDYW5jZWxlZCgpKSBcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvaW5nIHRvIG5leHQgc2xpZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IEdldFBsYXllcigpLkdldFZhcihcIk5leHRTbGlkZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBHZXRQbGF5ZXIoKS5TZXRWYXIoXCJOZXh0U2xpZGVcIiwgKytjdXJyZW50VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICB9LCA4MDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsaXN0ZW4gPSBhc3luYyAocXVlc3Rpb246IHN0cmluZywgcG9zc2libGVBbnN3ZXJzOiBhbnlbXSk6IFByb21pc2U8dm9pZD4gPT5cclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkxpc3RlbmluZyBmb3I6IFwiICsgcG9zc2libGVBbnN3ZXJzLmpvaW4oXCIsIFwiKSk7XHJcblxyXG4gICAgICAgIC8vIFN0YXJ0IHdpdGggYXNraW5nIHF1ZXN0aW9uXHJcbiAgICAgICAgYXdhaXQgdGhpcy5zYXkocXVlc3Rpb24sIHsgZ29Ub05leHRTbGlkZTogZmFsc2UgfSk7XHJcblxyXG4gICAgICAgIC8vIFByb2Nlc3Npbmcgb2YgcmVzdWx0cyBkZWZpbmVkIGluIGZ1bmN0aW9uXHJcbiAgICAgICAgbGV0IHByb2Nlc3NSZXN1bHRzID0gKGZvdW5kQW5zd2Vyczogc3RyaW5nW10pID0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgZm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgc2VudGVuY2Ugb2YgZm91bmRBbnN3ZXJzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlYXJkOiBcIiArIHNlbnRlbmNlKTtcclxuICAgICAgICAgICAgICAgIGxldCB2YXJpYWJsZSA9IHNlbnRlbmNlLnJlcGxhY2UoLyAvZyxcIlwiKTsgLy8gcmVnZXggZm9yIHJlcGxhY2luZyBhbGwgc3BhY2VzXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBZGp1c3RpbmcgdmFyaWFibGU6IFwiICsgdmFyaWFibGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRWYWx1ZSA9IEdldFBsYXllcigpLkdldFZhcih2YXJpYWJsZSk7XHJcbiAgICAgICAgICAgICAgICBHZXRQbGF5ZXIoKS5TZXRWYXIodmFyaWFibGUsICsrY3VycmVudFZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFZhbHVlICE9IG51bGwpIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VudGVuY2VOb3RSZWNvZ25pemVkOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IENvbmZpZy5TZW50ZW5jZU5vdFJlY29nbml6ZWRbVXRpbHMuZ2VuZXJhdGVSYW5kb21JbmRleChDb25maWcuU2VudGVuY2VOb3RSZWNvZ25pemVkLmxlbmd0aCAtIDEpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuKHNlbnRlbmNlTm90UmVjb2duaXplZFt0aGlzLnN0YXRlLmxhbmd1YWdlXSwgcG9zc2libGVBbnN3ZXJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTGlzdGVuIGFuZCB3YWl0IGZvciBhbnN3ZXJlc1xyXG4gICAgICAgIHRoaXMubGlzdGVuRW5naW5lLmxpc3Rlbihwb3NzaWJsZUFuc3dlcnMsIGFzeW5jIChmb3VuZEFuc3dlcnM6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgICAgIHByb2Nlc3NSZXN1bHRzKGZvdW5kQW5zd2Vycyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICAgIGludGVyZmFjZSBXaW5kb3cge1xyXG4gICAgICAgIFJvYm9jdXJlSW5zdGFuY2U6IEFwaTtcclxuICAgICAgICBTYXk6IEZ1bmN0aW9uO1xyXG4gICAgICAgIExpc3RlbjogRnVuY3Rpb247XHJcbiAgICAgICAgUk9CT0NVUkVfREVCVUc6IGJvb2xlYW47XHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy5ST0JPQ1VSRV9ERUJVRyA9IGZhbHNlXHJcblxyXG5pZiAod2luZG93LlJPQk9DVVJFX0RFQlVHKSBhbGVydChcImxvYWRpbmcuLi5cIik7XHJcbmxldCBsYW5ndWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaHRtbFwiKVswXS5nZXRBdHRyaWJ1dGUoXCJsYW5nXCIpLnNwbGl0KFwiLVwiKVswXTtcclxubGV0IGxhbmd1YWdlTWFwcGluZzoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XHJcbiAgICBcImVuXCI6IFwiRW5nbGlzaFwiLFxyXG4gICAgXCJmclwiOiBcIkZyZW5jaFwiLFxyXG4gICAgXCJubFwiOiBcIkR1dGNoXCJcclxufVxyXG53aW5kb3cuUm9ib2N1cmVJbnN0YW5jZSA9IG5ldyBBcGkobGFuZ3VhZ2VNYXBwaW5nW2xhbmd1YWdlXSk7XHJcbndpbmRvdy5TYXkgPSB3aW5kb3cuUm9ib2N1cmVJbnN0YW5jZS5zYXk7IC8vIFNheShcIkhlbGxvIHdvcmxkXCIsIHsgZ29Ub05leHRTbGlkZTogZmFsc2UgfSk7XHJcbndpbmRvdy5MaXN0ZW4gPSB3aW5kb3cuUm9ib2N1cmVJbnN0YW5jZS5saXN0ZW47IC8vIExpc3RlbihcIldoYXQgaXMgdGhlIGFuc3dlciB0byB0aGlzIHF1ZXN0aW9uXCIsIFtcIlllc1wiLCBcIk5vXCJdKTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZmlnIHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFNlbnRlbmNlTm90UmVjb2duaXplZDoge31bXSA9IFt7XHJcbiAgICAgICAgXCJFbmdsaXNoXCI6IFwiSSBkaWQgbm90IHVuZGVyc3RhbmQsIGNhbiB5b3UgcmVwZWF0IGZvciBtZT9cIixcclxuICAgICAgICBcIkZyZW5jaFwiOiBcIkplIG4nYWkgcGFzIGNvbXByaXMsIHBvdXZlei12b3VzIHLDqXDDqXRlciBwb3VyIG1vaT9cIixcclxuICAgICAgICBcIkR1dGNoXCI6IFwiSWsgaGViIGhldCBuaWV0IGJlZ3JlcGVuLCB3aWwgamUgZGF0IG5vZyBlZW5zIGhlcmhhbGVuP1wiXHJcbiAgICB9LHtcclxuICAgICAgICBcIkVuZ2xpc2hcIjogXCJDYW4geW91IHJlcGVhdCB0aGF0IGFnYWluIHBsZWFzZT9cIixcclxuICAgICAgICBcIkZyZW5jaFwiOiBcIlBvdXZlei12b3VzIHLDqXDDqXRlciBjZWxhIHMnaWwgdm91cyBwbGHDrnQ/XCIsXHJcbiAgICAgICAgXCJEdXRjaFwiOiBcIkt1biBqZSBkYXQgbm9nIGVlbnMgaGVyaGFsZW4gYWxzdHVibGllZnQ/XCJcclxuICAgIH0se1xyXG4gICAgICAgIFwiRW5nbGlzaFwiOiBcIldoYXQgZGlkIHlvdSBzYXkgZXhhY3RseT9cIixcclxuICAgICAgICBcIkZyZW5jaFwiOiBcIlF1J2FzLXR1IGRpdCBleGFjdGVtZW50P1wiLFxyXG4gICAgICAgIFwiRHV0Y2hcIjogXCJXYXQgaGViIGplIHByZWNpZXMgZ2V6ZWdkP1wiXHJcbiAgICB9XTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEd1aXRhckFuaW1hdGlvbjogc3RyaW5nID0gXCJec3RhcnQoYW5pbWF0aW9ucy9TdGFuZC9XYWl0aW5nL0Fpckd1aXRhcl8xKSBed2FpdChhbmltYXRpb25zL1N0YW5kL1dhaXRpbmcvQWlyR3VpdGFyXzEpXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNheG9waG9uZUFuaW1hdGlvbjogc3RyaW5nID0gXCJec3RhcnQocm9ib2N1cmVfaW50ZXJhY3RpdmVfbGVhcm5pbmcvc2F4b3Bob25lKSBed2FpdChyb2JvY3VyZV9pbnRlcmFjdGl2ZV9sZWFybmluZy9zYXhvcGhvbmUpXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVsZXBoYW50QW5pbWF0aW9uOiBzdHJpbmcgPSBcIl5zdGFydChyb2JvY3VyZV9pbnRlcmFjdGl2ZV9sZWFybmluZy9lbGVwaGFudCkgXndhaXQocm9ib2N1cmVfaW50ZXJhY3RpdmVfbGVhcm5pbmcvZWxlcGhhbnQpXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFRhaUNoaUNodWFuQW5pbWF0aW9uOiBzdHJpbmcgPSBcIl5zdGFydChyb2JvY3VyZV9pbnRlcmFjdGl2ZV9sZWFybmluZy90YWljaGljaHVhbikgXndhaXQocm9ib2N1cmVfaW50ZXJhY3RpdmVfbGVhcm5pbmcvdGFpY2hpY2h1YW4pXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBJbnRyb2R1Y3Rpb25zOiB7IFtrZXk6IHN0cmluZ106IHsgXCJUZXh0XCI6IHN0cmluZywgXCJFeHBlY3RlZFJlc3BvbnNlXCI6IHN0cmluZ1tdIH19W10gPSBbe1xyXG4gICAgICAgIFwiRW5nbGlzaFwiOiB7XHJcbiAgICAgICAgICAgIFwiVGV4dFwiOiBcIkhleSEgSSdtIFBlcHBwZXIhIEkgYW0gYSByb2JvdCwgYW5kIEkgbG92ZSB0byBzaW5nIGFuZCBwbGF5IGd1aXRhci4gXCIgKyBDb25maWcuR3VpdGFyQW5pbWF0aW9uICsgXCIgQXJlIHlvdSByZWFkeT9cIixcclxuICAgICAgICAgICAgXCJFeHBlY3RlZFJlc3BvbnNlXCI6IFtcIlllc1wiLCBcIlN0YXJ0XCJdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIkZyZW5jaFwiOiB7XHJcbiAgICAgICAgICAgIFwiVGV4dFwiOiBcIkJvbmpvdXIhIEplIHN1aXMgUGVwcHBlciEgSmUgc3VpcyB1biByb2JvdCBldCBqJ2FpbWUgY2hhbnRlciBldCBqb3VlciBkZSBsYSBndWl0YXJlLiBcIiArIENvbmZpZy5HdWl0YXJBbmltYXRpb24gKyBcIiDDinRlcy12b3VzIHByw6p0P1wiLFxyXG4gICAgICAgICAgICBcIkV4cGVjdGVkUmVzcG9uc2VcIjogW1wiT3VpXCIsIFwiQ29tbWVuY2VyXCJdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIkR1dGNoXCI6IHtcclxuICAgICAgICAgICAgXCJUZXh0XCI6IFwiSGFsbG8hIElrIGJlbiBQZXBwcGVyISBJayBiZW4gZWVuIHJvYm90LCBlbiBpayBob3UgdmFuIHppbmdlbiBlbiBnaXRhYXIgc3BlbGVuLiBcIiArIENvbmZpZy5HdWl0YXJBbmltYXRpb24gKyBcIiBCZW4gamUgZXIga2xhYXIgdm9vcj9cIixcclxuICAgICAgICAgICAgXCJFeHBlY3RlZFJlc3BvbnNlXCI6IFtcIkphXCIsIFwiU3RhcnRcIl1cclxuICAgICAgICB9IFxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJFbmdsaXNoXCI6IHtcclxuICAgICAgICAgICAgXCJUZXh0XCI6IFwiSGV5ISBJJ20gUGVwcHBlciEgSSBhbSBhIHJvYm90LCBhbmQgSSBsb3ZlIHRvIHNpbmcgYW5kIHBsYXkgc2F4b3Bob25lLiBcIiArIENvbmZpZy5TYXhvcGhvbmVBbmltYXRpb24gKyBcIiBBcmUgeW91IHJlYWR5P1wiLFxyXG4gICAgICAgICAgICBcIkV4cGVjdGVkUmVzcG9uc2VcIjogW1wiWWVzXCIsIFwiU3RhcnRcIl1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiRnJlbmNoXCI6IHsgICBcclxuICAgICAgICAgICAgXCJUZXh0XCI6IFwiQm9uam91ciEgSmUgc3VpcyBQZXBwcGVyISBKZSBzdWlzIHVuIHJvYm90IGV0IGonYWltZSBjaGFudGVyIGV0IGpvdWVyIGRlIGxhIHNheG9waG9uZS4gXCIgKyBDb25maWcuU2F4b3Bob25lQW5pbWF0aW9uICsgXCIgw4p0ZXMtdm91cyBwcsOqdD9cIixcclxuICAgICAgICAgICAgXCJFeHBlY3RlZFJlc3BvbnNlXCI6IFtcIk91aVwiLCBcIkNvbW1lbmNlclwiXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJEdXRjaFwiOiB7XHJcbiAgICAgICAgICAgIFwiVGV4dFwiOiBcIkhhbGxvISBJayBiZW4gUGVwcHBlciEgSWsgYmVuIGVlbiByb2JvdCwgZW4gaWsgaG91IHZhbiB6aW5nZW4gZW4gc2F4b2Zvb24gc3BlbGVuLiBcIiArIENvbmZpZy5TYXhvcGhvbmVBbmltYXRpb24gKyBcIiBCZW4gamUgZXIga2xhYXIgdm9vcj9cIixcclxuICAgICAgICAgICAgXCJFeHBlY3RlZFJlc3BvbnNlXCI6IFtcIkphXCIsIFwiU3RhcnRcIl1cclxuICAgICAgICB9XHJcbiAgICB9LHtcclxuICAgICAgICBcIkVuZ2xpc2hcIjoge1xyXG4gICAgICAgICAgICBcIlRleHRcIjogXCJIZXkhIEknbSBQZXBwcGVyISBJIGFtIGEgcm9ib3QsIGFuZCBJIGxvdmUgZWxlcGhhbnRzLiBcIiArIENvbmZpZy5FbGVwaGFudEFuaW1hdGlvbiArIFwiIEFyZSB5b3UgcmVhZHk/XCIsXHJcbiAgICAgICAgICAgIFwiRXhwZWN0ZWRSZXNwb25zZVwiOiBbXCJZZXNcIiwgXCJTdGFydFwiXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJGcmVuY2hcIjogeyAgIFxyXG4gICAgICAgICAgICBcIlRleHRcIjogXCJCb25qb3VyISBKZSBzdWlzIFBlcHBwZXIhIEplIHN1aXMgdW4gcm9ib3QgZXQgaidhaW1lIGxlcyDDqWzDqXBoYW50cy4gXCIgKyBDb25maWcuRWxlcGhhbnRBbmltYXRpb24gKyBcIiDDinRlcy12b3VzIHByw6p0P1wiLFxyXG4gICAgICAgICAgICBcIkV4cGVjdGVkUmVzcG9uc2VcIjogW1wiT3VpXCIsIFwiQ29tbWVuY2VyXCJdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIkR1dGNoXCI6IHtcclxuICAgICAgICAgICAgXCJUZXh0XCI6IFwiSGFsbG8hIElrIGJlbiBQZXBwcGVyISBJayBiZW4gZWVuIHJvYm90LCBlbiBpayBob3UgdmFuIG9saWZhbnRlbi4gXCIgKyBDb25maWcuRWxlcGhhbnRBbmltYXRpb24gKyBcIiBCZW4gamUgZXIga2xhYXIgdm9vcj9cIixcclxuICAgICAgICAgICAgXCJFeHBlY3RlZFJlc3BvbnNlXCI6IFtcIkphXCIsIFwiU3RhcnRcIl1cclxuICAgICAgICB9XHJcbiAgICB9LHtcclxuICAgICAgICBcIkVuZ2xpc2hcIjoge1xyXG4gICAgICAgICAgICBcIlRleHRcIjogXCJIZXkhIEknbSBQZXBwcGVyISBJIGFtIGEgcm9ib3QsIGFuZCBJIGxvdmUgdGFpIGNoaS4gXCIgKyBDb25maWcuVGFpQ2hpQ2h1YW5BbmltYXRpb24gKyBcIiBBcmUgeW91IHJlYWR5P1wiLFxyXG4gICAgICAgICAgICBcIkV4cGVjdGVkUmVzcG9uc2VcIjogW1wiWWVzXCIsIFwiU3RhcnRcIl1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiRnJlbmNoXCI6IHsgICBcclxuICAgICAgICAgICAgXCJUZXh0XCI6IFwiQm9uam91ciEgSmUgc3VpcyBQZXBwcGVyISBKZSBzdWlzIHVuIHJvYm90IGV0IGonYWltZSB0YWkgY2hpLiBcIiArIENvbmZpZy5UYWlDaGlDaHVhbkFuaW1hdGlvbiArIFwiIMOKdGVzLXZvdXMgcHLDqnQ/XCIsXHJcbiAgICAgICAgICAgIFwiRXhwZWN0ZWRSZXNwb25zZVwiOiBbXCJPdWlcIiwgXCJDb21tZW5jZXJcIl1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiRHV0Y2hcIjoge1xyXG4gICAgICAgICAgICBcIlRleHRcIjogXCJIYWxsbyEgSWsgYmVuIFBlcHBwZXIhIElrIGJlbiBlZW4gcm9ib3QsIGVuIGlrIGhvdSB2YW4gdGFpIGNoaS4gXCIgKyBDb25maWcuVGFpQ2hpQ2h1YW5BbmltYXRpb24gKyBcIiBCZW4gamUgZXIga2xhYXIgdm9vcj9cIixcclxuICAgICAgICAgICAgXCJFeHBlY3RlZFJlc3BvbnNlXCI6IFtcIkphXCIsIFwiU3RhcnRcIl1cclxuICAgICAgICB9XHJcbiAgICB9XTtcclxufVxyXG4iLCJkZWNsYXJlIHZhciBHZXRQbGF5ZXI6IGFueTtcclxuXHJcbmltcG9ydCB7IElTcGVlY2hFbmdpbmUsIElMaXN0ZW5FbmdpbmUsIElTdGF0ZSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XHJcbmltcG9ydCBCcm93c2VyU3BlZWNoRW5naW5lIGZyb20gJy4vc3BlZWNoRW5naW5lcy9icm93c2VyJztcclxuaW1wb3J0IFBlcHBlclNwZWVjaEVuZ2luZSBmcm9tICcuL3NwZWVjaEVuZ2luZXMvcGVwcGVyJztcclxuaW1wb3J0IEJyb3dzZXJMaXN0ZW5FbmdpbmUgZnJvbSAnLi9saXN0ZW5FbmdpbmVzL2Jyb3dzZXInO1xyXG5pbXBvcnQgUGVwcGVyTGlzdGVuRW5naW5lIGZyb20gJy4vbGlzdGVuRW5naW5lcy9wZXBwZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgSW50ZXJuYWxzIHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGdldFNlcnZpY2Uoc2VydmljZTogYW55LCBzZXNzaW9uUHJvbWlzZTogYW55LCBzZXJ2aWNlQ2FjaGU6IGFueSkgXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHNlcnZpY2VDYWNoZVtzZXJ2aWNlXSA9PSBudWxsKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBhY3R1YWxTZXNzaW9uID0gYXdhaXQgc2Vzc2lvblByb21pc2U7XHJcbiAgICAgICAgICAgIHNlcnZpY2VDYWNoZVtzZXJ2aWNlXSA9IGF3YWl0IGFjdHVhbFNlc3Npb24uc2VydmljZShzZXJ2aWNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VDYWNoZVtzZXJ2aWNlXTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRUYXJnZXRlZFNwZWVjaEVuZ2luZShzdGF0ZTogSVN0YXRlLCB0dHNTZXJ2aWNlUHJvbWlzZTogUHJvbWlzZTxhbnk+KTogSVNwZWVjaEVuZ2luZVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZVNwZWVjaEVuZ2luZXM6IHsgW2tleTogc3RyaW5nXTogSVNwZWVjaEVuZ2luZSB9ID0ge1xyXG4gICAgICAgICAgICBcImJyb3dzZXJcIjogbmV3IEJyb3dzZXJTcGVlY2hFbmdpbmUoc3RhdGUubGFuZ3VhZ2UpLFxyXG4gICAgICAgICAgICBcInBlcHBlclwiOiBuZXcgUGVwcGVyU3BlZWNoRW5naW5lKHN0YXRlLmxhbmd1YWdlLCB0dHNTZXJ2aWNlUHJvbWlzZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhdmFpbGFibGVTcGVlY2hFbmdpbmVzW3N0YXRlLnRhcmdldF07XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VGFyZ2V0ZWRMaXN0ZW5FbmdpbmUoc3RhdGU6IElTdGF0ZSk6IElMaXN0ZW5FbmdpbmVcclxuICAgIHtcclxuICAgICAgICBsZXQgYXZhaWxhYmxlTGlzdGVuRW5naW5lczogeyBba2V5OiBzdHJpbmddOiBJTGlzdGVuRW5naW5lIH0gPSB7XHJcbiAgICAgICAgICAgIFwiYnJvd3NlclwiOiBuZXcgQnJvd3Nlckxpc3RlbkVuZ2luZShzdGF0ZS5sYW5ndWFnZSksXHJcbiAgICAgICAgICAgIFwicGVwcGVyXCI6IG5ldyBQZXBwZXJMaXN0ZW5FbmdpbmUoc3RhdGUuc3BlZWNoU2VydmVySXApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXZhaWxhYmxlTGlzdGVuRW5naW5lc1tzdGF0ZS50YXJnZXRdO1xyXG4gICAgfVxyXG59XHJcbiIsImRlY2xhcmUgdmFyIGFubnlhbmc6IGFueTtcclxuXHJcbmltcG9ydCB7IElMaXN0ZW5FbmdpbmUgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcclxuXHJcbi8vXHJcbi8vIFRoZSBicm93c2VyIHNwZWVjaCBlbmdpbmUgaXMgbGltaXRlZCBpbiB0aGF0IGl0IGRvZXMgbm90IHByb2Nlc3MgdW5yZWNvZ25pemVkIHdvcmRzLlxyXG4vLyBJdCBhbHNvIGNhbm5vdCByZXRyaWV2ZSB0aGUgY29tbWFuZCBmcm9tIHdpdGhpbiBhIHNlbnRlbmNlLiBcInllcyB0aGF0IGlzIHRydWVcIiBzaG91bGQgYmUgXCJ5ZXNcIi5cclxuLy9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyb3dzZXJMaXN0ZW5FbmdpbmUgaW1wbGVtZW50cyBJTGlzdGVuRW5naW5lXHJcbntcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2U6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihsYW5ndWFnZTogc3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2UgPSBsYW5ndWFnZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgbGlzdGVuKHBvc3NpYmxlQW5zd2Vyczogc3RyaW5nW10sIGNhbGxiYWNrOiAoc2FpZDogc3RyaW5nW10pID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+XHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxhbmd1YWdlTWFwcGluZzoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XHJcbiAgICAgICAgICAgIFwiRW5nbGlzaFwiOiBcImVuLVVTXCIsXHJcbiAgICAgICAgICAgIFwiRnJlbmNoXCI6IFwiZnItRlJcIixcclxuICAgICAgICAgICAgXCJEdXRjaFwiOiBcIm5sLU5MXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50TGFuZ3VhZ2UgPSBsYW5ndWFnZU1hcHBpbmdbdGhpcy5sYW5ndWFnZV07XHJcbiAgICAgICAgbGV0IGNvbW1hbmRzOiB7W2tleTogc3RyaW5nXTogRnVuY3Rpb259ID0ge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IGNtZCBvZiBwb3NzaWJsZUFuc3dlcnMpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGhhbmRsZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVhcmQ6IFwiICsgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhbdGhpcyBhcyB1bmtub3duIGFzIHN0cmluZ10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbW1hbmRzW2NtZF0gPSBoYW5kbGVyLmJpbmQoY21kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhbm55YW5nIC0gYWRkaW5nIGNvbW1hbmRzLCBzZXQgbGFuZ3VhZ2UgJiBzdGFydFwiKTtcclxuICAgICAgICBhbm55YW5nLmFkZENvbW1hbmRzKGNvbW1hbmRzKTsgLy8gQWRkIG91ciBjb21tYW5kcyB0byBhbm55YW5nXHJcbiAgICAgICAgYW5ueWFuZy5zZXRMYW5ndWFnZShjdXJyZW50TGFuZ3VhZ2UpOyAvLyBTZXQgbGFuZ3VhZ2VcclxuICAgICAgICBhbm55YW5nLnN0YXJ0KCk7IC8vIFN0YXJ0IGxpc3RlbmluZy5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FuY2VsID0gYXN5bmMgKCkgPT4gXHJcbiAgICB7XHJcbiAgICAgICAgYW5ueWFuZy5yZW1vdmVDb21tYW5kcygpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBJTGlzdGVuRW5naW5lIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQZXBwZXJMaXN0ZW5FbmdpbmUgaW1wbGVtZW50cyBJTGlzdGVuRW5naW5lXHJcbntcclxuICAgIHByaXZhdGUgc3BlZWNoU2VydmVySXA6IHN0cmluZztcclxuICAgIHByaXZhdGUgbGlzdGVuZXJzOiBYTUxIdHRwUmVxdWVzdFtdID0gW107XHJcbiAgICBwcml2YXRlIHBhdXNlZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3BlZWNoU2VydmVySXA6IHN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNwZWVjaFNlcnZlcklwID0gc3BlZWNoU2VydmVySXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxpc3RlbiA9IGFzeW5jIChwb3NzaWJsZUFuc3dlcnM6IHN0cmluZ1tdLCBjYWxsYmFjazogKHNhaWQ6IHN0cmluZ1tdKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiA9PlxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHBhcmFtc0FycmF5OiBzdHJpbmdbXSA9IHBvc3NpYmxlQW5zd2Vycy5tYXAoKHZhbDpzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IFwiaGludFwiICsgKGluZGV4ICsgMSkgKyBcIj1cIiArIHZhbCk7XHJcbiAgICAgICAgbGV0IHBhcmFtczogc3RyaW5nID0gcGFyYW1zQXJyYXkuam9pbihcIiZcIik7XHJcblxyXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbihgR0VUYCwgYGh0dHA6Ly8ke3RoaXMuc3BlZWNoU2VydmVySXB9OjUwNTAvZ2V0X3RleHQ/JHtwYXJhbXN9YCwgdHJ1ZSk7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IGFzeW5jICgpID0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0geGhyLnJlc3BvbnNlVGV4dDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWNvZ25pemVkIHdvcmQ6IFwiICsgcmVzdWx0KTtcclxuICAgICAgICAgICAgbGV0IGZvdW5kID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBzZW50ZW5jZSBvZiBwb3NzaWJsZUFuc3dlcnMpXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZW50ZW5jZS50b0xvd2VyQ2FzZSgpKSAhPSAtMSkgZm91bmQucHVzaChzZW50ZW5jZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYWxsYmFjayhmb3VuZCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhdXNlZCA9PSBmYWxzZSkgdGhpcy5saXN0ZW4ocG9zc2libGVBbnN3ZXJzLCBjYWxsYmFjayk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIuc2VuZChudWxsKTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKHhocik7IC8vIGtlZXAgdHJhY2sgb2YgcmVxdWVzdHNcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FuY2VsID0gKCk6IHZvaWQgPT5cclxuICAgIHtcclxuICAgICAgICB0aGlzLnBhdXNlZCA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgbGlzdGVuZXIgb2YgdGhpcy5saXN0ZW5lcnMpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhYm9ydGluZyByZXF1ZXN0XCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVyLnN0YXR1cyA9PSAwKSAgLy8gcmVxdWVzdCBpcyBzdGlsbCBydW5uaW5nXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGNhbmNlbCBvbiBzZXJ2ZXJcclxuICAgICAgICAgICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgICAgIHhoci5vcGVuKGBHRVRgLCBgaHR0cDovLyR7dGhpcy5zcGVlY2hTZXJ2ZXJJcH06NTA1MC9jYW5jZWxgLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHhoci5zZW5kKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjYW5jZWwgb24gY2xpZW50IChzaG91bGQgaGFwcGVuIGF1dG9tYXRpY2FsbHkgYnV0IG1ha2Ugc3VyZSlcclxuICAgICAgICAgICAgbGlzdGVuZXIuYWJvcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiZGVjbGFyZSB2YXIgcmVzcG9uc2l2ZVZvaWNlOiBhbnk7XHJcblxyXG5pbXBvcnQgeyBJU3BlZWNoRW5naW5lIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCcm93c2VyU3BlZWNoRW5naW5lIGltcGxlbWVudHMgSVNwZWVjaEVuZ2luZVxyXG57XHJcbiAgICBwcml2YXRlIGxhbmd1YWdlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGNhbmNlbGVkOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihsYW5ndWFnZTogc3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2UgPSBsYW5ndWFnZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2F5KHRleHQ6IHN0cmluZykgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBsYW5ndWFnZURpY3Q6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xyXG4gICAgICAgICAgICBcIkVuZ2xpc2hcIjogXCJVSyBFbmdsaXNoIEZlbWFsZVwiLFxyXG4gICAgICAgICAgICBcIkZyZW5jaFwiOiBcIkZyZW5jaCBGZW1hbGVcIixcclxuICAgICAgICAgICAgXCJEdXRjaFwiOiBcIkR1dGNoIEZlbWFsZVwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXNwb25zaXZlVm9pY2VMYW5ndWFnZSA9IGxhbmd1YWdlRGljdFt0aGlzLmxhbmd1YWdlXTtcclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIG5hb3FpIHNwZWNpZmljIHN5bnRheCAoaWU6IFwiXnN0YXJ0KGFuaW1hdGlvbnMvU3RhbmQvV2FpdGluZy9BaXJHdWl0YXJfMSlcIilcclxuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oXFxeLipcXCguKlxcKSkvZywgXCJcIik7XHJcbiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvW1xcIVxcLlxcLFxcKFxcKVxcL1xcP1xcJ10vZywgXCIsXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZVZvaWNlLnNwZWFrKHRleHQsIHJlc3BvbnNpdmVWb2ljZUxhbmd1YWdlLCB7IG9uZW5kOiByZXNvbHZlIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgY2FuY2VsKCkge1xyXG4gICAgICAgIHRoaXMuY2FuY2VsZWQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiByZXNwb25zaXZlVm9pY2UuY2FuY2VsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzQ2FuY2VsZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuY2VsZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IElTcGVlY2hFbmdpbmUgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlcHBlclNwZWVjaEVuZ2luZSBpbXBsZW1lbnRzIElTcGVlY2hFbmdpbmVcclxue1xyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSB0dHNTZXJ2aWNlUHJvbWlzZTogUHJvbWlzZTxhbnk+O1xyXG4gICAgcHJpdmF0ZSBjYW5jZWxlZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgY29uc3RydWN0b3IobGFuZ3VhZ2U6IHN0cmluZywgdHRzU2VydmljZVByb21pc2U6IFByb21pc2U8YW55PilcclxuICAgIHtcclxuICAgICAgICB0aGlzLmxhbmd1YWdlID0gbGFuZ3VhZ2U7XHJcbiAgICAgICAgdGhpcy50dHNTZXJ2aWNlUHJvbWlzZSA9IHR0c1NlcnZpY2VQcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzYXkodGV4dDogc3RyaW5nKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNhbmNlbGVkID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHNlc3Npb24gPSBhd2FpdCB0aGlzLnR0c1NlcnZpY2VQcm9taXNlO1xyXG4gICAgICAgIHJldHVybiBzZXNzaW9uLnNheSh0ZXh0LCB0aGlzLmxhbmd1YWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgY2FuY2VsKCkge1xyXG4gICAgICAgIHRoaXMuY2FuY2VsZWQgPSB0cnVlO1xyXG4gICAgICAgIGxldCBzZXNzaW9uID0gYXdhaXQgdGhpcy50dHNTZXJ2aWNlUHJvbWlzZTtcclxuICAgICAgICByZXR1cm4gc2Vzc2lvbi5fc3RvcEFsbCh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNDYW5jZWxlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYW5jZWxlZDtcclxuICAgIH1cclxufVxyXG5cclxuIiwiZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgVXRpbHMge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UGFyYW1ldGVyQnlOYW1lKG5hbWU6IHN0cmluZywgdXJsPzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF1cmwpIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG4gICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csICdcXFxcJCYnKTtcclxuICAgICAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCdbPyZdJyArIG5hbWUgKyAnKD0oW14mI10qKXwmfCN8JCknKSxcclxuICAgICAgICAgICAgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcclxuICAgICAgICBpZiAoIXJlc3VsdHMpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xyXG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZW5lcmF0ZVJhbmRvbUluZGV4KG1heGltdW06IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4aW11bSArIDEpKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19
