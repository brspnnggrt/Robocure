console.log('xapily: script running');

var customxAPI = {
	init: function () {
		if (window.TinCan) {
			window.xapi = new TinCan();
			window.xapi.init({ url: window.location.href });

			console.log('customxAPI initialized');
			customxAPI.queryParams = TinCan.Utils.parseURL(window.location.href).params;
			customxAPI.rootURL = window.xapi.activity.id + "/";

			setTimeout(customxAPI.trackResources, 3000);
			// customxAPI.detectSlideChange();
		} else {
			console.warn('TinCan not available');
		}
	},

	trackResources: function () {
		console.log('trackResources started....');
		$('.resource').on('click', function () {
			var resourceName = this.innerText.trim();
			var resourceAnchor = $(this).find('a')[0];
			var resourceLink = resourceAnchor.href;
			var resourceIcon = $(resourceAnchor).find('img')[0].src;

			var resourceType = 'attachment';
			var fileType = 'unknown';
			var activityType = 'document';

			if (resourceIcon.indexOf('url') > -1) {
				resourceType = 'url';
			}

			if (/\.(?:jpg|jpeg|gif|png|tif)$/i.test(resourceLink)) {
				fileType = 'image';
			} else if (/\.(?:mov|mp4|wmv|avi)$/i.test(resourceLink)) {
				fileType = activityType = 'video';
			} else if (/\.(?:pdf)$/i.test(resourceLink)) {
				fileType = 'pdf';
			} else if (/\.(?:doc|docx|txt)$/i.test(resourceLink)) {
				fileType = 'document';
			} else if (/\.(?:xls|xlsx|csv)$/i.test(resourceLink)) {
				fileType = 'spreadsheet';
			} else if (/\.(?:ppt|pptx)$/i.test(resourceLink)) {
				fileType = 'presentation';
			}

			customxAPI.sendStatement({
				"verb": "viewed",
				"activity": {
					"name": resourceName,
					"description": customxAPI.getFileNameFromLink(resourceLink),
					"type": activityType
				},
				"parent": "course",
				"tags": [
					{ "resourceType": resourceType },
					{ "fileType": fileType }
				]
			});

		});
	},

	getFileNameFromLink: function (link) {
		var googleDocViewer = 'https://docs.google.com/viewer?url=';
		if (link.indexOf(googleDocViewer) > -1) {
			console.log('has google link')
			link = decodeURIComponent(link.replace(googleDocViewer, ""));
		}

		console.log('link (converted):', link);

		var splitLink = link.split('/');
		return decodeURIComponent(splitLink[splitLink.length - 1]);
	},

	detectSlideChange: function () {
		var oldReactID = "";

		function getReactID() {
			var slideData = $('.slide-transition-container').data();
			var reactID = slideData ? slideData.reactid : "";
			if (reactID && oldReactID !== reactID) {
				console.log('<> slide navigation');
				var video = document.getElementsByTagName('video')[0];
				if (video) {
					console.log('<> video on page: ', video.src);
				}
			}
			oldReactID = reactID;
		}

		var checkReactID = setInterval(getReactID, 1000);
	},

	getVerb: function (display) {
		var thisVerbID = customxAPI.verbMap[display] || 'http://adlnet.gov/expapi/verbs/' + display;
		return {
			id: thisVerbID,
			display: {
				"en-US": display
			}
		};
	},

	getActivity: function (actObj) {
		var type = actObj.type;

		if (typeof actObj === 'string') {
			actObj = {
				name: actObj
			};
		}
		var thisID = actObj.id || customxAPI.encodeID(actObj.name);

		var output = {
			id: customxAPI.rootURL + thisID,
			definition: {
				name: {
					"en-US": actObj.name
				},
				description: {
					"en-US": actObj.description || ""
				}
			}
		};

		if (type) {
			output.definition.type = customxAPI.activityTypeMap[type.toLowerCase()] || "";

			var video = document.getElementsByTagName('video')[0];
			if (type === 'video' && video) {
				var duration = video.duration || "";
				output.definition.extensions = {
					"http://id.tincanapi.com/extension/duration": duration
				};
				output.definition.extensions[customxAPI.rootURL + 'activities/extension/label'] = $('video').closest('.slide-object-video').attr('aria-label')
			}
		}

		return output;
	},

	getResult: function (thisResult) {
		var resultObj = {};

		var props = ["score", "response", "success", "completion", "duration"];

		for (var i = 0; i < props.length; i++) {
			var thisProp = props[i];
			// if (thisResult[thisProp]) {
			if (thisResult[thisProp] == false || thisResult[thisProp]) {
				if (thisProp === "duration" && thisResult.duration) {
					var thisDuration = TinCan.Utils.convertMillisecondsToISO8601Duration(thisResult.duration);
					resultObj.duration = thisDuration;
				} else if (thisProp === 'response') {
					resultObj.response = thisResult[thisProp].toString();
				} else if (thisProp === "score" && thisResult.score) {
					resultObj.score = {};
					var subProps = ["raw", "min", "max", "scaled"];
					for (var x = 0; x < subProps.length; x++) {
						var thisSubProp = subProps[x];
						if (thisResult.score[thisSubProp]) {
							resultObj.score[thisSubProp] = thisResult.score[thisSubProp];
						}
					}
				} else {
					resultObj[thisProp] = thisResult[thisProp];
				}
			}
		}

		return resultObj;
	},

	getVideoResult: function (video) {
		var output = "";
		// var video = document.getElementsByTagName('video')[0];

		if (video) {
			var currentTime = video.currentTime;
			var totalTime = video.duration;

			output = {
				duration: "PT" + Math.round(currentTime) + "S",
				extensions: {
					"http://id.tincanapi.com/extension/starting-point": 0,
					"http://id.tincanapi.com/extension/ending-point": currentTime
				}
			};
		}

		return output;
	},

	createCtxtActivity: function (activity) {
		var id = customxAPI.rootURL + customxAPI.encodeID(activity.id || activity.name || '');

		var act = {
			id: id,
			definition: {
				name: {
					"en-US": activity.name || ''
				}
			}
		};

		var desc = activity.desc || activity.description;

		if (desc) {
			act.definition.description = {
				"en-US": desc
			};
		}

		if (activity.type) {
			act.definition.type = customxAPI.activityTypeMap[activity.type];
		}

		return act;
	},

	getCtxtAct: function (actArray) {
		var finalArray = [];

		actArray.forEach(function (act) {
			finalArray.push(customxAPI.createCtxtActivity(act));
		});

		return finalArray;
	},

	getVideoCategory: function () {
		return [{
			id: "http://id.tincanapi.com/recipe/video/base/1",
			definition: {
				type: "http://id.tincanapi.com/activitytype/recipe",
				name: {
					"en-US": "Recipe: Video Base (v1)"
				},
				description: {
					"en-US": "A base recipe for recording video experiences. (v1)"
				}
			}
		}];
	},

	getExtensions: function (stmt) {
		var output = {};
		for (var i = 0; i < stmt.tags.length; i++) {
			var thisTag = stmt.tags[i];
			var thisTagKey = Object.getOwnPropertyNames(thisTag)[0];
			var thisID = customxAPI.rootURL + "extensions/" + customxAPI.encodeID(thisTagKey);
			output[thisID] = thisTag[thisTagKey];
		}

		return output;
	},

	stmtCallback: function (response) {
		var res = response[0];
		if (res.err) {
			if (res.xhr) {
				console.error("Failed to save statement: " + res.xhr.responseText + " (" + res.xhr.status + ")");
				return;
			}

			console.error("Failed to save statement: " + res.err);
			return;
		}

		console.log("Statement saved");
	},

	sendStatement: function (stmt) {
		var video = document.getElementsByTagName('video')[0];
		var stmtObj = {
			verb: customxAPI.getVerb(stmt.verb),
			// target: customxAPI.getActivity(stmt.activity, stmt.type)
			target: customxAPI.getActivity(stmt.activity)
		};

		if (stmt.result) {
			stmtObj.result = customxAPI.getResult(stmt.result);
		}

		if (stmt.activity.type) {
			if (stmt.activity.type === 'video' && video) {
				stmtObj.result = customxAPI.getVideoResult(video);
			}
		}

		var courseActivityArray = [{
			id: window.xapi.activity.id,
			definition: {
				type: customxAPI.activityTypeMap.course
			}
		}];

		var ctxtAct = ['parent', 'grouping', 'category', 'other'];

		ctxtAct.forEach(function (act) {
			if (stmt[act]) {
				stmtObj.context = stmtObj.context || {
					contextActivities: {}
				};

				var thisAct = '';
				var actArray = customxAPI.getCtxtAct(stmt[act]);
				if (act === 'grouping') {
					thisAct = courseActivityArray.concat(actArray);
				} else {
					thisAct = actArray;
				}
				stmtObj.context.contextActivities[act] = thisAct;
			}
		});

		if (stmt.activity.type && stmt.activity.type === 'video') {
			var vidCat = customxAPI.getVideoCategory();

			if (stmtObj.context.contextActivities.category) {
				stmtObj.context.contextActivities.category.concat(vidCat);
			} else {
				stmtObj.context.contextActivities.category = vidCat;
			}
		}

		if (stmt.tags) {
			stmtObj.context = stmtObj.context || {};
			stmtObj.context.extensions = customxAPI.getExtensions(stmt);
		}

		var statement = new TinCan.Statement(stmtObj);

		window.xapi.sendStatement(statement, customxAPI.stmtCallback);
	},

	stateCfg: {
		contentType: 'application/json',
		callback: function (err, response) {
			if (err) {
				console.error(err);
			}
			console.log(response);
		}
	},

	setState: function (stateId, contents) {
		window.xapi.setState(stateId, contents, customxAPI.stateCfg);
	},

	getState: function (stateId) {
		window.xapi.getState(stateId, customxAPI.stateCfg);
	},

	processResumeState: function (resumeState) {
		console.log('resumeState:', resumeState);
	},

	getResumeState: function () {
		var cfg = {
			contentType: 'application/json',
			callback: function (err, response) {
				console.log(response);
				if (err) {
					console.error(err);
				} else {
					customxAPI.processResumeState(response.contents);
				}
			}
		}
		window.xapi.getState('resume', cfg);
	},

	encodeID: function (text) {
		text = text || "";
		return encodeURIComponent(text.replace(/\s/g, '-').toLowerCase());
	},

	verbMap: {
		"abandoned": "https://w3id.org/xapi/adl/verbs/abandoned",
		"answered": "http://adlnet.gov/expapi/verbs/answered",
		"asked": "http://adlnet.gov/expapi/verbs/asked",
		"attended": "http://adlnet.gov/expapi/verbs/attended",
		"attempted": "http://adlnet.gov/expapi/verbs/attempted",
		"commented": "http://adlnet.gov/expapi/verbs/commented",
		"completed": "http://adlnet.gov/expapi/verbs/completed",
		"created": "http://adlnet.gov/expapi/verbs/created",
		"discarded": "http://id.tincanapi.com/verb/discarded",
		"downloaded": "http://id.tincanapi.com/verb/downloaded",
		"exited": "http://adlnet.gov/expapi/verbs/exited",
		"experienced": "http://adlnet.gov/expapi/verbs/experienced",
		"failed": "http://adlnet.gov/expapi/verbs/failed",
		"imported": "http://adlnet.gov/expapi/verbs/imported",
		"initialized": "http://adlnet.gov/expapi/verbs/initialized",
		"interacted": "http://adlnet.gov/expapi/verbs/interacted",
		"launched": "http://adlnet.gov/expapi/verbs/launched",
		"mastered": "http://adlnet.gov/expapi/verbs/mastered",
		"paused": "http://id.tincanapi.com/verb/paused",
		"played": "http://activitystrea.ms/schema/1.0/play",
		"passed": "http://adlnet.gov/expapi/verbs/passed",
		"preferred": "http://adlnet.gov/expapi/verbs/preferred",
		"progressed": "http://adlnet.gov/expapi/verbs/progressed",
		"rated": "http://id.tincanapi.com/verb/rated",
		"registered": "http://adlnet.gov/expapi/verbs/registered",
		"responded": "http://adlnet.gov/expapi/verbs/responded",
		"resumed": "http://adlnet.gov/expapi/verbs/resumed",
		"satisfied": "https://w3id.org/xapi/adl/verbs/satisfied",
		"scored": "http://adlnet.gov/expapi/verbs/scored",
		"shared": "http://adlnet.gov/expapi/verbs/shared",
		"selected": "http://id.tincanapi.com/verb/selected",
		"suspended": "http://adlnet.gov/expapi/verbs/suspended",
		"terminated": "http://adlnet.gov/expapi/verbs/terminated",
		"viewed": "http://id.tincanapi.com/verb/viewed",
		"voided": "http://adlnet.gov/expapi/verbs/voided",
		"waived": "https://w3id.org/xapi/adl/verbs/waived",
		"watched": "http://activitystrea.ms/schema/1.0/watched"
	},

	activityTypeMap: {
		"audio": "http://activitystrea.ms/schema/1.0/audio",
		"assessment": "http://adlnet.gov/expapi/activities/assessment",
		"course": "http://adlnet.gov/expapi/activities/course",
		"document": "http://id.tincanapi.com/activitytype/document",
		"interaction": "http://adlnet.gov/expapi/activities/interaction",
		"meeting": "http://adlnet.gov/expapi/activities/meeting",
		"module": "http://adlnet.gov/expapi/activities/module",
		"note": "http://activitystrea.ms/schema/1.0/note",
		"objective": "http://adlnet.gov/expapi/activities/objective",
		"performance": "http://adlnet.gov/expapi/activities/performance",
		"question": "http://adlnet.gov/expapi/activities/question",
		"scenario": "http://id.tincanapi.com/activitytype/scenario",
		"simulation": "http://adlnet.gov/expapi/activities/simulation",
		"video": "http://activitystrea.ms/schema/1.0/video"
	}
}

window.customxAPI = customxAPI;
window.customxAPI.init();