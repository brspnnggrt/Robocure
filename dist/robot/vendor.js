/*
**  Copyright (C) Aldebaran Robotics
**  See COPYING for the license
**
**  Author(s):
**   - Laurent LEC    <llec@aldebaran-robotics.com>
**
*/

/*! Socket.IO.min.js build:0.9.11, production. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */
var io="undefined"==typeof module?{}:module.exports;(function(){(function(a,b){var c=a;c.version="0.9.11",c.protocol=1,c.transports=[],c.j=[],c.sockets={},c.connect=function(a,d){var e=c.util.parseUri(a),f,g;b&&b.location&&(e.protocol=e.protocol||b.location.protocol.slice(0,-1),e.host=e.host||(b.document?b.document.domain:b.location.hostname),e.port=e.port||b.location.port),f=c.util.uniqueUri(e);var h={host:e.host,secure:"https"==e.protocol,port:e.port||("https"==e.protocol?443:80),query:e.query||""};c.util.merge(h,d);if(h["force new connection"]||!c.sockets[f])g=new c.Socket(h);return!h["force new connection"]&&g&&(c.sockets[f]=g),g=g||c.sockets[f],g.of(e.path.length>1?e.path:"")}})("object"==typeof module?module.exports:this.io={},this),function(a,b){var c=a.util={},d=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,e=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];c.parseUri=function(a){var b=d.exec(a||""),c={},f=14;while(f--)c[e[f]]=b[f]||"";return c},c.uniqueUri=function(a){var c=a.protocol,d=a.host,e=a.port;return"document"in b?(d=d||document.domain,e=e||(c=="https"&&document.location.protocol!=="https:"?443:document.location.port)):(d=d||"localhost",!e&&c=="https"&&(e=443)),(c||"http")+"://"+d+":"+(e||80)},c.query=function(a,b){var d=c.chunkQuery(a||""),e=[];c.merge(d,c.chunkQuery(b||""));for(var f in d)d.hasOwnProperty(f)&&e.push(f+"="+d[f]);return e.length?"?"+e.join("&"):""},c.chunkQuery=function(a){var b={},c=a.split("&"),d=0,e=c.length,f;for(;d<e;++d)f=c[d].split("="),f[0]&&(b[f[0]]=f[1]);return b};var f=!1;c.load=function(a){if("document"in b&&document.readyState==="complete"||f)return a();c.on(b,"load",a,!1)},c.on=function(a,b,c,d){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,d)},c.request=function(a){if(a&&"undefined"!=typeof XDomainRequest&&!c.ua.hasCORS)return new XDomainRequest;if("undefined"!=typeof XMLHttpRequest&&(!a||c.ua.hasCORS))return new XMLHttpRequest;if(!a)try{return new(window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(b){}return null},"undefined"!=typeof window&&c.load(function(){f=!0}),c.defer=function(a){if(!c.ua.webkit||"undefined"!=typeof importScripts)return a();c.load(function(){setTimeout(a,100)})},c.merge=function(b,d,e,f){var g=f||[],h=typeof e=="undefined"?2:e,i;for(i in d)d.hasOwnProperty(i)&&c.indexOf(g,i)<0&&(typeof b[i]!="object"||!h?(b[i]=d[i],g.push(d[i])):c.merge(b[i],d[i],h-1,g));return b},c.mixin=function(a,b){c.merge(a.prototype,b.prototype)},c.inherit=function(a,b){function c(){}c.prototype=b.prototype,a.prototype=new c},c.isArray=Array.isArray||function(a){return Object.prototype.toString.call(a)==="[object Array]"},c.intersect=function(a,b){var d=[],e=a.length>b.length?a:b,f=a.length>b.length?b:a;for(var g=0,h=f.length;g<h;g++)~c.indexOf(e,f[g])&&d.push(f[g]);return d},c.indexOf=function(a,b,c){for(var d=a.length,c=c<0?c+d<0?0:c+d:c||0;c<d&&a[c]!==b;c++);return d<=c?-1:c},c.toArray=function(a){var b=[];for(var c=0,d=a.length;c<d;c++)b.push(a[c]);return b},c.ua={},c.ua.hasCORS="undefined"!=typeof XMLHttpRequest&&function(){try{var a=new XMLHttpRequest}catch(b){return!1}return a.withCredentials!=undefined}(),c.ua.webkit="undefined"!=typeof navigator&&/webkit/i.test(navigator.userAgent),c.ua.iDevice="undefined"!=typeof navigator&&/iPad|iPhone|iPod/i.test(navigator.userAgent)}("undefined"!=typeof io?io:module.exports,this),function(a,b){function c(){}a.EventEmitter=c,c.prototype.on=function(a,c){return this.$events||(this.$events={}),this.$events[a]?b.util.isArray(this.$events[a])?this.$events[a].push(c):this.$events[a]=[this.$events[a],c]:this.$events[a]=c,this},c.prototype.addListener=c.prototype.on,c.prototype.once=function(a,b){function d(){c.removeListener(a,d),b.apply(this,arguments)}var c=this;return d.listener=b,this.on(a,d),this},c.prototype.removeListener=function(a,c){if(this.$events&&this.$events[a]){var d=this.$events[a];if(b.util.isArray(d)){var e=-1;for(var f=0,g=d.length;f<g;f++)if(d[f]===c||d[f].listener&&d[f].listener===c){e=f;break}if(e<0)return this;d.splice(e,1),d.length||delete this.$events[a]}else(d===c||d.listener&&d.listener===c)&&delete this.$events[a]}return this},c.prototype.removeAllListeners=function(a){return a===undefined?(this.$events={},this):(this.$events&&this.$events[a]&&(this.$events[a]=null),this)},c.prototype.listeners=function(a){return this.$events||(this.$events={}),this.$events[a]||(this.$events[a]=[]),b.util.isArray(this.$events[a])||(this.$events[a]=[this.$events[a]]),this.$events[a]},c.prototype.emit=function(a){if(!this.$events)return!1;var c=this.$events[a];if(!c)return!1;var d=Array.prototype.slice.call(arguments,1);if("function"==typeof c)c.apply(this,d);else{if(!b.util.isArray(c))return!1;var e=c.slice();for(var f=0,g=e.length;f<g;f++)e[f].apply(this,d)}return!0}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(exports,nativeJSON){function f(a){return a<10?"0"+a:a}function date(a,b){return isFinite(a.valueOf())?a.getUTCFullYear()+"-"+f(a.getUTCMonth()+1)+"-"+f(a.getUTCDate())+"T"+f(a.getUTCHours())+":"+f(a.getUTCMinutes())+":"+f(a.getUTCSeconds())+"Z":null}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i instanceof Date&&(i=date(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)typeof rep[c]=="string"&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}"use strict";if(nativeJSON&&nativeJSON.parse)return exports.JSON={parse:nativeJSON.parse,stringify:nativeJSON.stringify};var JSON=exports.JSON={},cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")},JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")}}("undefined"!=typeof io?io:module.exports,typeof JSON!="undefined"?JSON:undefined),function(a,b){var c=a.parser={},d=c.packets=["disconnect","connect","heartbeat","message","json","event","ack","error","noop"],e=c.reasons=["transport not supported","client not handshaken","unauthorized"],f=c.advice=["reconnect"],g=b.JSON,h=b.util.indexOf;c.encodePacket=function(a){var b=h(d,a.type),c=a.id||"",i=a.endpoint||"",j=a.ack,k=null;switch(a.type){case"error":var l=a.reason?h(e,a.reason):"",m=a.advice?h(f,a.advice):"";if(l!==""||m!=="")k=l+(m!==""?"+"+m:"");break;case"message":a.data!==""&&(k=a.data);break;case"event":var n={name:a.name};a.args&&a.args.length&&(n.args=a.args),k=g.stringify(n);break;case"json":k=g.stringify(a.data);break;case"connect":a.qs&&(k=a.qs);break;case"ack":k=a.ackId+(a.args&&a.args.length?"+"+g.stringify(a.args):"")}var o=[b,c+(j=="data"?"+":""),i];return k!==null&&k!==undefined&&o.push(k),o.join(":")},c.encodePayload=function(a){var b="";if(a.length==1)return a[0];for(var c=0,d=a.length;c<d;c++){var e=a[c];b+="\ufffd"+e.length+"\ufffd"+a[c]}return b};var i=/([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;c.decodePacket=function(a){var b=a.match(i);if(!b)return{};var c=b[2]||"",a=b[5]||"",h={type:d[b[1]],endpoint:b[4]||""};c&&(h.id=c,b[3]?h.ack="data":h.ack=!0);switch(h.type){case"error":var b=a.split("+");h.reason=e[b[0]]||"",h.advice=f[b[1]]||"";break;case"message":h.data=a||"";break;case"event":try{var j=g.parse(a);h.name=j.name,h.args=j.args}catch(k){}h.args=h.args||[];break;case"json":try{h.data=g.parse(a)}catch(k){}break;case"connect":h.qs=a||"";break;case"ack":var b=a.match(/^([0-9]+)(\+)?(.*)/);if(b){h.ackId=b[1],h.args=[];if(b[3])try{h.args=b[3]?g.parse(b[3]):[]}catch(k){}}break;case"disconnect":case"heartbeat":}return h},c.decodePayload=function(a){if(a.charAt(0)=="\ufffd"){var b=[];for(var d=1,e="";d<a.length;d++)a.charAt(d)=="\ufffd"?(b.push(c.decodePacket(a.substr(d+1).substr(0,e))),d+=Number(e)+1,e=""):e+=a.charAt(d);return b}return[c.decodePacket(a)]}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(a,b){function c(a,b){this.socket=a,this.sessid=b}a.Transport=c,b.util.mixin(c,b.EventEmitter),c.prototype.heartbeats=function(){return!0},c.prototype.onData=function(a){this.clearCloseTimeout(),(this.socket.connected||this.socket.connecting||this.socket.reconnecting)&&this.setCloseTimeout();if(a!==""){var c=b.parser.decodePayload(a);if(c&&c.length)for(var d=0,e=c.length;d<e;d++)this.onPacket(c[d])}return this},c.prototype.onPacket=function(a){return this.socket.setHeartbeatTimeout(),a.type=="heartbeat"?this.onHeartbeat():(a.type=="connect"&&a.endpoint==""&&this.onConnect(),a.type=="error"&&a.advice=="reconnect"&&(this.isOpen=!1),this.socket.onPacket(a),this)},c.prototype.setCloseTimeout=function(){if(!this.closeTimeout){var a=this;this.closeTimeout=setTimeout(function(){a.onDisconnect()},this.socket.closeTimeout)}},c.prototype.onDisconnect=function(){return this.isOpen&&this.close(),this.clearTimeouts(),this.socket.onDisconnect(),this},c.prototype.onConnect=function(){return this.socket.onConnect(),this},c.prototype.clearCloseTimeout=function(){this.closeTimeout&&(clearTimeout(this.closeTimeout),this.closeTimeout=null)},c.prototype.clearTimeouts=function(){this.clearCloseTimeout(),this.reopenTimeout&&clearTimeout(this.reopenTimeout)},c.prototype.packet=function(a){this.send(b.parser.encodePacket(a))},c.prototype.onHeartbeat=function(a){this.packet({type:"heartbeat"})},c.prototype.onOpen=function(){this.isOpen=!0,this.clearCloseTimeout(),this.socket.onOpen()},c.prototype.onClose=function(){var a=this;this.isOpen=!1,this.socket.onClose(),this.onDisconnect()},c.prototype.prepareUrl=function(){var a=this.socket.options;return this.scheme()+"://"+a.host+":"+a.port+"/"+a.resource+"/"+b.protocol+"/"+this.name+"/"+this.sessid},c.prototype.ready=function(a,b){b.call(this)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(a,b,c){function d(a){this.options={port:80,secure:!1,document:"document"in c?document:!1,resource:"socket.io",transports:b.transports,"connect timeout":1e4,"try multiple transports":!0,reconnect:!0,"reconnection delay":500,"reconnection limit":Infinity,"reopen delay":3e3,"max reconnection attempts":10,"sync disconnect on unload":!1,"auto connect":!0,"flash policy port":10843,manualFlush:!1},b.util.merge(this.options,a),this.connected=!1,this.open=!1,this.connecting=!1,this.reconnecting=!1,this.namespaces={},this.buffer=[],this.doBuffer=!1;if(this.options["sync disconnect on unload"]&&(!this.isXDomain()||b.util.ua.hasCORS)){var d=this;b.util.on(c,"beforeunload",function(){d.disconnectSync()},!1)}this.options["auto connect"]&&this.connect()}function e(){}a.Socket=d,b.util.mixin(d,b.EventEmitter),d.prototype.of=function(a){return this.namespaces[a]||(this.namespaces[a]=new b.SocketNamespace(this,a),a!==""&&this.namespaces[a].packet({type:"connect"})),this.namespaces[a]},d.prototype.publish=function(){this.emit.apply(this,arguments);var a;for(var b in this.namespaces)this.namespaces.hasOwnProperty(b)&&(a=this.of(b),a.$emit.apply(a,arguments))},d.prototype.handshake=function(a){function f(b){b instanceof Error?(c.connecting=!1,c.onError(b.message)):a.apply(null,b.split(":"))}var c=this,d=this.options,g=["http"+(d.secure?"s":"")+":/",d.host+":"+d.port,d.resource,b.protocol,b.util.query(this.options.query,"t="+ +(new Date))].join("/");if(this.isXDomain()&&!b.util.ua.hasCORS){var h=document.getElementsByTagName("script")[0],i=document.createElement("script");i.src=g+"&jsonp="+b.j.length,h.parentNode.insertBefore(i,h),b.j.push(function(a){f(a),i.parentNode.removeChild(i)})}else{var j=b.util.request();j.open("GET",g,!0),this.isXDomain()&&(j.withCredentials=!0),j.onreadystatechange=function(){j.readyState==4&&(j.onreadystatechange=e,j.status==200?f(j.responseText):j.status==403?c.onError(j.responseText):(c.connecting=!1,!c.reconnecting&&c.onError(j.responseText)))},j.send(null)}},d.prototype.getTransport=function(a){var c=a||this.transports,d;for(var e=0,f;f=c[e];e++)if(b.Transport[f]&&b.Transport[f].check(this)&&(!this.isXDomain()||b.Transport[f].xdomainCheck(this)))return new b.Transport[f](this,this.sessionid);return null},d.prototype.connect=function(a){if(this.connecting)return this;var c=this;return c.connecting=!0,this.handshake(function(d,e,f,g){function h(a){c.transport&&c.transport.clearTimeouts(),c.transport=c.getTransport(a);if(!c.transport)return c.publish("connect_failed");c.transport.ready(c,function(){c.connecting=!0,c.publish("connecting",c.transport.name),c.transport.open(),c.options["connect timeout"]&&(c.connectTimeoutTimer=setTimeout(function(){if(!c.connected){c.connecting=!1;if(c.options["try multiple transports"]){var a=c.transports;while(a.length>0&&a.splice(0,1)[0]!=c.transport.name);a.length?h(a):c.publish("connect_failed")}}},c.options["connect timeout"]))})}c.sessionid=d,c.closeTimeout=f*1e3,c.heartbeatTimeout=e*1e3,c.transports||(c.transports=c.origTransports=g?b.util.intersect(g.split(","),c.options.transports):c.options.transports),c.setHeartbeatTimeout(),h(c.transports),c.once("connect",function(){clearTimeout(c.connectTimeoutTimer),a&&typeof a=="function"&&a()})}),this},d.prototype.setHeartbeatTimeout=function(){clearTimeout(this.heartbeatTimeoutTimer);if(this.transport&&!this.transport.heartbeats())return;var a=this;this.heartbeatTimeoutTimer=setTimeout(function(){a.transport.onClose()},this.heartbeatTimeout)},d.prototype.packet=function(a){return this.connected&&!this.doBuffer?this.transport.packet(a):this.buffer.push(a),this},d.prototype.setBuffer=function(a){this.doBuffer=a,!a&&this.connected&&this.buffer.length&&(this.options.manualFlush||this.flushBuffer())},d.prototype.flushBuffer=function(){this.transport.payload(this.buffer),this.buffer=[]},d.prototype.disconnect=function(){if(this.connected||this.connecting)this.open&&this.of("").packet({type:"disconnect"}),this.onDisconnect("booted");return this},d.prototype.disconnectSync=function(){var a=b.util.request(),c=["http"+(this.options.secure?"s":"")+":/",this.options.host+":"+this.options.port,this.options.resource,b.protocol,"",this.sessionid].join("/")+"/?disconnect=1";a.open("GET",c,!1),a.send(null),this.onDisconnect("booted")},d.prototype.isXDomain=function(){var a=c.location.port||("https:"==c.location.protocol?443:80);return this.options.host!==c.location.hostname||this.options.port!=a},d.prototype.onConnect=function(){this.connected||(this.connected=!0,this.connecting=!1,this.doBuffer||this.setBuffer(!1),this.emit("connect"))},d.prototype.onOpen=function(){this.open=!0},d.prototype.onClose=function(){this.open=!1,clearTimeout(this.heartbeatTimeoutTimer)},d.prototype.onPacket=function(a){this.of(a.endpoint).onPacket(a)},d.prototype.onError=function(a){a&&a.advice&&a.advice==="reconnect"&&(this.connected||this.connecting)&&(this.disconnect(),this.options.reconnect&&this.reconnect()),this.publish("error",a&&a.reason?a.reason:a)},d.prototype.onDisconnect=function(a){var b=this.connected,c=this.connecting;this.connected=!1,this.connecting=!1,this.open=!1;if(b||c)this.transport.close(),this.transport.clearTimeouts(),b&&(this.publish("disconnect",a),"booted"!=a&&this.options.reconnect&&!this.reconnecting&&this.reconnect())},d.prototype.reconnect=function(){function e(){if(a.connected){for(var b in a.namespaces)a.namespaces.hasOwnProperty(b)&&""!==b&&a.namespaces[b].packet({type:"connect"});a.publish("reconnect",a.transport.name,a.reconnectionAttempts)}clearTimeout(a.reconnectionTimer),a.removeListener("connect_failed",f),a.removeListener("connect",f),a.reconnecting=!1,delete a.reconnectionAttempts,delete a.reconnectionDelay,delete a.reconnectionTimer,delete a.redoTransports,a.options["try multiple transports"]=c}function f(){if(!a.reconnecting)return;if(a.connected)return e();if(a.connecting&&a.reconnecting)return a.reconnectionTimer=setTimeout(f,1e3);a.reconnectionAttempts++>=b?a.redoTransports?(a.publish("reconnect_failed"),e()):(a.on("connect_failed",f),a.options["try multiple transports"]=!0,a.transports=a.origTransports,a.transport=a.getTransport(),a.redoTransports=!0,a.connect()):(a.reconnectionDelay<d&&(a.reconnectionDelay*=2),a.connect(),a.publish("reconnecting",a.reconnectionDelay,a.reconnectionAttempts),a.reconnectionTimer=setTimeout(f,a.reconnectionDelay))}this.reconnecting=!0,this.reconnectionAttempts=0,this.reconnectionDelay=this.options["reconnection delay"];var a=this,b=this.options["max reconnection attempts"],c=this.options["try multiple transports"],d=this.options["reconnection limit"];this.options["try multiple transports"]=!1,this.reconnectionTimer=setTimeout(f,this.reconnectionDelay),this.on("connect",f)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b){function c(a,b){this.socket=a,this.name=b||"",this.flags={},this.json=new d(this,"json"),this.ackPackets=0,this.acks={}}function d(a,b){this.namespace=a,this.name=b}a.SocketNamespace=c,b.util.mixin(c,b.EventEmitter),c.prototype.$emit=b.EventEmitter.prototype.emit,c.prototype.of=function(){return this.socket.of.apply(this.socket,arguments)},c.prototype.packet=function(a){return a.endpoint=this.name,this.socket.packet(a),this.flags={},this},c.prototype.send=function(a,b){var c={type:this.flags.json?"json":"message",data:a};return"function"==typeof b&&(c.id=++this.ackPackets,c.ack=!0,this.acks[c.id]=b),this.packet(c)},c.prototype.emit=function(a){var b=Array.prototype.slice.call(arguments,1),c=b[b.length-1],d={type:"event",name:a};return"function"==typeof c&&(d.id=++this.ackPackets,d.ack="data",this.acks[d.id]=c,b=b.slice(0,b.length-1)),d.args=b,this.packet(d)},c.prototype.disconnect=function(){return this.name===""?this.socket.disconnect():(this.packet({type:"disconnect"}),this.$emit("disconnect")),this},c.prototype.onPacket=function(a){function d(){c.packet({type:"ack",args:b.util.toArray(arguments),ackId:a.id})}var c=this;switch(a.type){case"connect":this.$emit("connect");break;case"disconnect":this.name===""?this.socket.onDisconnect(a.reason||"booted"):this.$emit("disconnect",a.reason);break;case"message":case"json":var e=["message",a.data];a.ack=="data"?e.push(d):a.ack&&this.packet({type:"ack",ackId:a.id}),this.$emit.apply(this,e);break;case"event":var e=[a.name].concat(a.args);a.ack=="data"&&e.push(d),this.$emit.apply(this,e);break;case"ack":this.acks[a.ackId]&&(this.acks[a.ackId].apply(this,a.args),delete this.acks[a.ackId]);break;case"error":a.advice?this.socket.onError(a):a.reason=="unauthorized"?this.$emit("connect_failed",a.reason):this.$emit("error",a.reason)}},d.prototype.send=function(){this.namespace.flags[this.name]=!0,this.namespace.send.apply(this.namespace,arguments)},d.prototype.emit=function(){this.namespace.flags[this.name]=!0,this.namespace.emit.apply(this.namespace,arguments)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(a,b,c){function d(a){b.Transport.apply(this,arguments)}a.websocket=d,b.util.inherit(d,b.Transport),d.prototype.name="websocket",d.prototype.open=function(){var a=b.util.query(this.socket.options.query),d=this,e;return e||(e=c.MozWebSocket||c.WebSocket),this.websocket=new e(this.prepareUrl()+a),this.websocket.onopen=function(){d.onOpen(),d.socket.setBuffer(!1)},this.websocket.onmessage=function(a){d.onData(a.data)},this.websocket.onclose=function(){d.onClose(),d.socket.setBuffer(!0)},this.websocket.onerror=function(a){d.onError(a)},this},b.util.ua.iDevice?d.prototype.send=function(a){var b=this;return setTimeout(function(){b.websocket.send(a)},0),this}:d.prototype.send=function(a){return this.websocket.send(a),this},d.prototype.payload=function(a){for(var b=0,c=a.length;b<c;b++)this.packet(a[b]);return this},d.prototype.close=function(){return this.websocket.close(),this},d.prototype.onError=function(a){this.socket.onError(a)},d.prototype.scheme=function(){return this.socket.options.secure?"wss":"ws"},d.check=function(){return"WebSocket"in c&&!("__addTask"in WebSocket)||"MozWebSocket"in c},d.xdomainCheck=function(){return!0},b.transports.push("websocket")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b){function c(){b.Transport.websocket.apply(this,arguments)}a.flashsocket=c,b.util.inherit(c,b.Transport.websocket),c.prototype.name="flashsocket",c.prototype.open=function(){var a=this,c=arguments;return WebSocket.__addTask(function(){b.Transport.websocket.prototype.open.apply(a,c)}),this},c.prototype.send=function(){var a=this,c=arguments;return WebSocket.__addTask(function(){b.Transport.websocket.prototype.send.apply(a,c)}),this},c.prototype.close=function(){return WebSocket.__tasks.length=0,b.Transport.websocket.prototype.close.call(this),this},c.prototype.ready=function(a,d){function e(){var b=a.options,e=b["flash policy port"],g=["http"+(b.secure?"s":"")+":/",b.host+":"+b.port,b.resource,"static/flashsocket","WebSocketMain"+(a.isXDomain()?"Insecure":"")+".swf"];c.loaded||(typeof WEB_SOCKET_SWF_LOCATION=="undefined"&&(WEB_SOCKET_SWF_LOCATION=g.join("/")),e!==843&&WebSocket.loadFlashPolicyFile("xmlsocket://"+b.host+":"+e),WebSocket.__initialize(),c.loaded=!0),d.call(f)}var f=this;if(document.body)return e();b.util.load(e)},c.check=function(){return typeof WebSocket!="undefined"&&"__initialize"in WebSocket&&!!swfobject?swfobject.getFlashPlayerVersion().major>=10:!1},c.xdomainCheck=function(){return!0},typeof window!="undefined"&&(WEB_SOCKET_DISABLE_AUTO_INITIALIZATION=!0),b.transports.push("flashsocket")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports);if("undefined"!=typeof window)var swfobject=function(){function A(){if(t)return;try{var a=i.getElementsByTagName("body")[0].appendChild(Q("span"));a.parentNode.removeChild(a)}catch(b){return}t=!0;var c=l.length;for(var d=0;d<c;d++)l[d]()}function B(a){t?a():l[l.length]=a}function C(b){if(typeof h.addEventListener!=a)h.addEventListener("load",b,!1);else if(typeof i.addEventListener!=a)i.addEventListener("load",b,!1);else if(typeof h.attachEvent!=a)R(h,"onload",b);else if(typeof h.onload=="function"){var c=h.onload;h.onload=function(){c(),b()}}else h.onload=b}function D(){k?E():F()}function E(){var c=i.getElementsByTagName("body")[0],d=Q(b);d.setAttribute("type",e);var f=c.appendChild(d);if(f){var g=0;(function(){if(typeof f.GetVariable!=a){var b=f.GetVariable("$version");b&&(b=b.split(" ")[1].split(","),y.pv=[parseInt(b[0],10),parseInt(b[1],10),parseInt(b[2],10)])}else if(g<10){g++,setTimeout(arguments.callee,10);return}c.removeChild(d),f=null,F()})()}else F()}function F(){var b=m.length;if(b>0)for(var c=0;c<b;c++){var d=m[c].id,e=m[c].callbackFn,f={success:!1,id:d};if(y.pv[0]>0){var g=P(d);if(g)if(S(m[c].swfVersion)&&!(y.wk&&y.wk<312))U(d,!0),e&&(f.success=!0,f.ref=G(d),e(f));else if(m[c].expressInstall&&H()){var h={};h.data=m[c].expressInstall,h.width=g.getAttribute("width")||"0",h.height=g.getAttribute("height")||"0",g.getAttribute("class")&&(h.styleclass=g.getAttribute("class")),g.getAttribute("align")&&(h.align=g.getAttribute("align"));var i={},j=g.getElementsByTagName("param"),k=j.length;for(var l=0;l<k;l++)j[l].getAttribute("name").toLowerCase()!="movie"&&(i[j[l].getAttribute("name")]=j[l].getAttribute("value"));I(h,i,d,e)}else J(g),e&&e(f)}else{U(d,!0);if(e){var n=G(d);n&&typeof n.SetVariable!=a&&(f.success=!0,f.ref=n),e(f)}}}}function G(c){var d=null,e=P(c);if(e&&e.nodeName=="OBJECT")if(typeof e.SetVariable!=a)d=e;else{var f=e.getElementsByTagName(b)[0];f&&(d=f)}return d}function H(){return!u&&S("6.0.65")&&(y.win||y.mac)&&!(y.wk&&y.wk<312)}function I(b,c,d,e){u=!0,r=e||null,s={success:!1,id:d};var g=P(d);if(g){g.nodeName=="OBJECT"?(p=K(g),q=null):(p=g,q=d),b.id=f;if(typeof b.width==a||!/%$/.test(b.width)&&parseInt(b.width,10)<310)b.width="310";if(typeof b.height==a||!/%$/.test(b.height)&&parseInt(b.height,10)<137)b.height="137";i.title=i.title.slice(0,47)+" - Flash Player Installation";var j=y.ie&&y.win?["Active"].concat("").join("X"):"PlugIn",k="MMredirectURL="+h.location.toString().replace(/&/g,"%26")+"&MMplayerType="+j+"&MMdoctitle="+i.title;typeof c.flashvars!=a?c.flashvars+="&"+k:c.flashvars=k;if(y.ie&&y.win&&g.readyState!=4){var l=Q("div");d+="SWFObjectNew",l.setAttribute("id",d),g.parentNode.insertBefore(l,g),g.style.display="none",function(){g.readyState==4?g.parentNode.removeChild(g):setTimeout(arguments.callee,10)}()}L(b,c,d)}}function J(a){if(y.ie&&y.win&&a.readyState!=4){var b=Q("div");a.parentNode.insertBefore(b,a),b.parentNode.replaceChild(K(a),b),a.style.display="none",function(){a.readyState==4?a.parentNode.removeChild(a):setTimeout(arguments.callee,10)}()}else a.parentNode.replaceChild(K(a),a)}function K(a){var c=Q("div");if(y.win&&y.ie)c.innerHTML=a.innerHTML;else{var d=a.getElementsByTagName(b)[0];if(d){var e=d.childNodes;if(e){var f=e.length;for(var g=0;g<f;g++)(e[g].nodeType!=1||e[g].nodeName!="PARAM")&&e[g].nodeType!=8&&c.appendChild(e[g].cloneNode(!0))}}}return c}function L(c,d,f){var g,h=P(f);if(y.wk&&y.wk<312)return g;if(h){typeof c.id==a&&(c.id=f);if(y.ie&&y.win){var i="";for(var j in c)c[j]!=Object.prototype[j]&&(j.toLowerCase()=="data"?d.movie=c[j]:j.toLowerCase()=="styleclass"?i+=' class="'+c[j]+'"':j.toLowerCase()!="classid"&&(i+=" "+j+'="'+c[j]+'"'));var k="";for(var l in d)d[l]!=Object.prototype[l]&&(k+='<param name="'+l+'" value="'+d[l]+'" />');h.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+i+">"+k+"</object>",n[n.length]=c.id,g=P(c.id)}else{var m=Q(b);m.setAttribute("type",e);for(var o in c)c[o]!=Object.prototype[o]&&(o.toLowerCase()=="styleclass"?m.setAttribute("class",c[o]):o.toLowerCase()!="classid"&&m.setAttribute(o,c[o]));for(var p in d)d[p]!=Object.prototype[p]&&p.toLowerCase()!="movie"&&M(m,p,d[p]);h.parentNode.replaceChild(m,h),g=m}}return g}function M(a,b,c){var d=Q("param");d.setAttribute("name",b),d.setAttribute("value",c),a.appendChild(d)}function N(a){var b=P(a);b&&b.nodeName=="OBJECT"&&(y.ie&&y.win?(b.style.display="none",function(){b.readyState==4?O(a):setTimeout(arguments.callee,10)}()):b.parentNode.removeChild(b))}function O(a){var b=P(a);if(b){for(var c in b)typeof b[c]=="function"&&(b[c]=null);b.parentNode.removeChild(b)}}function P(a){var b=null;try{b=i.getElementById(a)}catch(c){}return b}function Q(a){return i.createElement(a)}function R(a,b,c){a.attachEvent(b,c),o[o.length]=[a,b,c]}function S(a){var b=y.pv,c=a.split(".");return c[0]=parseInt(c[0],10),c[1]=parseInt(c[1],10)||0,c[2]=parseInt(c[2],10)||0,b[0]>c[0]||b[0]==c[0]&&b[1]>c[1]||b[0]==c[0]&&b[1]==c[1]&&b[2]>=c[2]?!0:!1}function T(c,d,e,f){if(y.ie&&y.mac)return;var g=i.getElementsByTagName("head")[0];if(!g)return;var h=e&&typeof e=="string"?e:"screen";f&&(v=null,w=null);if(!v||w!=h){var j=Q("style");j.setAttribute("type","text/css"),j.setAttribute("media",h),v=g.appendChild(j),y.ie&&y.win&&typeof i.styleSheets!=a&&i.styleSheets.length>0&&(v=i.styleSheets[i.styleSheets.length-1]),w=h}y.ie&&y.win?v&&typeof v.addRule==b&&v.addRule(c,d):v&&typeof i.createTextNode!=a&&v.appendChild(i.createTextNode(c+" {"+d+"}"))}function U(a,b){if(!x)return;var c=b?"visible":"hidden";t&&P(a)?P(a).style.visibility=c:T("#"+a,"visibility:"+c)}function V(b){var c=/[\\\"<>\.;]/,d=c.exec(b)!=null;return d&&typeof encodeURIComponent!=a?encodeURIComponent(b):b}var a="undefined",b="object",c="Shockwave Flash",d="ShockwaveFlash.ShockwaveFlash",e="application/x-shockwave-flash",f="SWFObjectExprInst",g="onreadystatechange",h=window,i=document,j=navigator,k=!1,l=[D],m=[],n=[],o=[],p,q,r,s,t=!1,u=!1,v,w,x=!0,y=function(){var f=typeof i.getElementById!=a&&typeof i.getElementsByTagName!=a&&typeof i.createElement!=a,g=j.userAgent.toLowerCase(),l=j.platform.toLowerCase(),m=l?/win/.test(l):/win/.test(g),n=l?/mac/.test(l):/mac/.test(g),o=/webkit/.test(g)?parseFloat(g.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,p=!1,q=[0,0,0],r=null;if(typeof j.plugins!=a&&typeof j.plugins[c]==b)r=j.plugins[c].description,r&&(typeof j.mimeTypes==a||!j.mimeTypes[e]||!!j.mimeTypes[e].enabledPlugin)&&(k=!0,p=!1,r=r.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),q[0]=parseInt(r.replace(/^(.*)\..*$/,"$1"),10),q[1]=parseInt(r.replace(/^.*\.(.*)\s.*$/,"$1"),10),q[2]=/[a-zA-Z]/.test(r)?parseInt(r.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0);else if(typeof h[["Active"].concat("Object").join("X")]!=a)try{var s=new(window[["Active"].concat("Object").join("X")])(d);s&&(r=s.GetVariable("$version"),r&&(p=!0,r=r.split(" ")[1].split(","),q=[parseInt(r[0],10),parseInt(r[1],10),parseInt(r[2],10)]))}catch(t){}return{w3:f,pv:q,wk:o,ie:p,win:m,mac:n}}(),z=function(){if(!y.w3)return;(typeof i.readyState!=a&&i.readyState=="complete"||typeof i.readyState==a&&(i.getElementsByTagName("body")[0]||i.body))&&A(),t||(typeof i.addEventListener!=a&&i.addEventListener("DOMContentLoaded",A,!1),y.ie&&y.win&&(i.attachEvent(g,function(){i.readyState=="complete"&&(i.detachEvent(g,arguments.callee),A())}),h==top&&function(){if(t)return;try{i.documentElement.doScroll("left")}catch(a){setTimeout(arguments.callee,0);return}A()}()),y.wk&&function(){if(t)return;if(!/loaded|complete/.test(i.readyState)){setTimeout(arguments.callee,0);return}A()}(),C(A))}(),W=function(){y.ie&&y.win&&window.attachEvent("onunload",function(){var a=o.length;for(var b=0;b<a;b++)o[b][0].detachEvent(o[b][1],o[b][2]);var c=n.length;for(var d=0;d<c;d++)N(n[d]);for(var e in y)y[e]=null;y=null;for(var f in swfobject)swfobject[f]=null;swfobject=null})}();return{registerObject:function(a,b,c,d){if(y.w3&&a&&b){var e={};e.id=a,e.swfVersion=b,e.expressInstall=c,e.callbackFn=d,m[m.length]=e,U(a,!1)}else d&&d({success:!1,id:a})},getObjectById:function(a){if(y.w3)return G(a)},embedSWF:function(c,d,e,f,g,h,i,j,k,l){var m={success:!1,id:d};y.w3&&!(y.wk&&y.wk<312)&&c&&d&&e&&f&&g?(U(d,!1),B(function(){e+="",f+="";var n={};if(k&&typeof k===b)for(var o in k)n[o]=k[o];n.data=c,n.width=e,n.height=f;var p={};if(j&&typeof j===b)for(var q in j)p[q]=j[q];if(i&&typeof i===b)for(var r in i)typeof p.flashvars!=a?p.flashvars+="&"+r+"="+i[r]:p.flashvars=r+"="+i[r];if(S(g)){var s=L(n,p,d);n.id==d&&U(d,!0),m.success=!0,m.ref=s}else{if(h&&H()){n.data=h,I(n,p,d,l);return}U(d,!0)}l&&l(m)})):l&&l(m)},switchOffAutoHideShow:function(){x=!1},ua:y,getFlashPlayerVersion:function(){return{major:y.pv[0],minor:y.pv[1],release:y.pv[2]}},hasFlashPlayerVersion:S,createSWF:function(a,b,c){return y.w3?L(a,b,c):undefined},showExpressInstall:function(a,b,c,d){y.w3&&H()&&I(a,b,c,d)},removeSWF:function(a){y.w3&&N(a)},createCSS:function(a,b,c,d){y.w3&&T(a,b,c,d)},addDomLoadEvent:B,addLoadEvent:C,getQueryParamValue:function(a){var b=i.location.search||i.location.hash;if(b){/\?/.test(b)&&(b=b.split("?")[1]);if(a==null)return V(b);var c=b.split("&");for(var d=0;d<c.length;d++)if(c[d].substring(0,c[d].indexOf("="))==a)return V(c[d].substring(c[d].indexOf("=")+1))}return""},expressInstallCallback:function(){if(u){var a=P(f);a&&p&&(a.parentNode.replaceChild(p,a),q&&(U(q,!0),y.ie&&y.win&&(p.style.display="block")),r&&r(s)),u=!1}}}}();(function(){if("undefined"==typeof window||window.WebSocket)return;var a=window.console;if(!a||!a.log||!a.error)a={log:function(){},error:function(){}};if(!swfobject.hasFlashPlayerVersion("10.0.0")){a.error("Flash Player >= 10.0.0 is required.");return}location.protocol=="file:"&&a.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."),WebSocket=function(a,b,c,d,e){var f=this;f.__id=WebSocket.__nextId++,WebSocket.__instances[f.__id]=f,f.readyState=WebSocket.CONNECTING,f.bufferedAmount=0,f.__events={},b?typeof b=="string"&&(b=[b]):b=[],setTimeout(function(){WebSocket.__addTask(function(){WebSocket.__flash.create(f.__id,a,b,c||null,d||0,e||null)})},0)},WebSocket.prototype.send=function(a){if(this.readyState==WebSocket.CONNECTING)throw"INVALID_STATE_ERR: Web Socket connection has not been established";var b=WebSocket.__flash.send(this.__id,encodeURIComponent(a));return b<0?!0:(this.bufferedAmount+=b,!1)},WebSocket.prototype.close=function(){if(this.readyState==WebSocket.CLOSED||this.readyState==WebSocket.CLOSING)return;this.readyState=WebSocket.CLOSING,WebSocket.__flash.close(this.__id)},WebSocket.prototype.addEventListener=function(a,b,c){a in this.__events||(this.__events[a]=[]),this.__events[a].push(b)},WebSocket.prototype.removeEventListener=function(a,b,c){if(!(a in this.__events))return;var d=this.__events[a];for(var e=d.length-1;e>=0;--e)if(d[e]===b){d.splice(e,1);break}},WebSocket.prototype.dispatchEvent=function(a){var b=this.__events[a.type]||[];for(var c=0;c<b.length;++c)b[c](a);var d=this["on"+a.type];d&&d(a)},WebSocket.prototype.__handleEvent=function(a){"readyState"in a&&(this.readyState=a.readyState),"protocol"in a&&(this.protocol=a.protocol);var b;if(a.type=="open"||a.type=="error")b=this.__createSimpleEvent(a.type);else if(a.type=="close")b=this.__createSimpleEvent("close");else{if(a.type!="message")throw"unknown event type: "+a.type;var c=decodeURIComponent(a.message);b=this.__createMessageEvent("message",c)}this.dispatchEvent(b)},WebSocket.prototype.__createSimpleEvent=function(a){if(document.createEvent&&window.Event){var b=document.createEvent("Event");return b.initEvent(a,!1,!1),b}return{type:a,bubbles:!1,cancelable:!1}},WebSocket.prototype.__createMessageEvent=function(a,b){if(document.createEvent&&window.MessageEvent&&!window.opera){var c=document.createEvent("MessageEvent");return c.initMessageEvent("message",!1,!1,b,null,null,window,null),c}return{type:a,data:b,bubbles:!1,cancelable:!1}},WebSocket.CONNECTING=0,WebSocket.OPEN=1,WebSocket.CLOSING=2,WebSocket.CLOSED=3,WebSocket.__flash=null,WebSocket.__instances={},WebSocket.__tasks=[],WebSocket.__nextId=0,WebSocket.loadFlashPolicyFile=function(a){WebSocket.__addTask(function(){WebSocket.__flash.loadManualPolicyFile(a)})},WebSocket.__initialize=function(){if(WebSocket.__flash)return;WebSocket.__swfLocation&&(window.WEB_SOCKET_SWF_LOCATION=WebSocket.__swfLocation);if(!window.WEB_SOCKET_SWF_LOCATION){a.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");return}var b=document.createElement("div");b.id="webSocketContainer",b.style.position="absolute",WebSocket.__isFlashLite()?(b.style.left="0px",b.style.top="0px"):(b.style.left="-100px",b.style.top="-100px");var c=document.createElement("div");c.id="webSocketFlash",b.appendChild(c),document.body.appendChild(b),swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION,"webSocketFlash","1","1","10.0.0",null,null,{hasPriority:!0,swliveconnect:!0,allowScriptAccess:"always"},null,function(b){b.success||a.error("[WebSocket] swfobject.embedSWF failed")})},WebSocket.__onFlashInitialized=function(){setTimeout(function(){WebSocket.__flash=document.getElementById("webSocketFlash"),WebSocket.__flash.setCallerUrl(location.href),WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);for(var a=0;a<WebSocket.__tasks.length;++a)WebSocket.__tasks[a]();WebSocket.__tasks=[]},0)},WebSocket.__onFlashEvent=function(){return setTimeout(function(){try{var b=WebSocket.__flash.receiveEvents();for(var c=0;c<b.length;++c)WebSocket.__instances[b[c].webSocketId].__handleEvent(b[c])}catch(d){a.error(d)}},0),!0},WebSocket.__log=function(b){a.log(decodeURIComponent(b))},WebSocket.__error=function(b){a.error(decodeURIComponent(b))},WebSocket.__addTask=function(a){WebSocket.__flash?a():WebSocket.__tasks.push(a)},WebSocket.__isFlashLite=function(){if(!window.navigator||!window.navigator.mimeTypes)return!1;var a=window.navigator.mimeTypes["application/x-shockwave-flash"];return!a||!a.enabledPlugin||!a.enabledPlugin.filename?!1:a.enabledPlugin.filename.match(/flashlite/i)?!0:!1},window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION||(window.addEventListener?window.addEventListener("load",function(){WebSocket.__initialize()},!1):window.attachEvent("onload",function(){WebSocket.__initialize()}))})(),function(a,b,c){function d(a){if(!a)return;b.Transport.apply(this,arguments),this.sendBuffer=[]}function e(){}a.XHR=d,b.util.inherit(d,b.Transport),d.prototype.open=function(){return this.socket.setBuffer(!1),this.onOpen(),this.get(),this.setCloseTimeout(),this},d.prototype.payload=function(a){var c=[];for(var d=0,e=a.length;d<e;d++)c.push(b.parser.encodePacket(a[d]));this.send(b.parser.encodePayload(c))},d.prototype.send=function(a){return this.post(a),this},d.prototype.post=function(a){function d(){this.readyState==4&&(this.onreadystatechange=e,b.posting=!1,this.status==200?b.socket.setBuffer(!1):b.onClose())}function f(){this.onload=e,b.socket.setBuffer(!1)}var b=this;this.socket.setBuffer(!0),this.sendXHR=this.request("POST"),c.XDomainRequest&&this.sendXHR instanceof XDomainRequest?this.sendXHR.onload=this.sendXHR.onerror=f:this.sendXHR.onreadystatechange=d,this.sendXHR.send(a)},d.prototype.close=function(){return this.onClose(),this},d.prototype.request=function(a){var c=b.util.request(this.socket.isXDomain()),d=b.util.query(this.socket.options.query,"t="+ +(new Date));c.open(a||"GET",this.prepareUrl()+d,!0);if(a=="POST")try{c.setRequestHeader?c.setRequestHeader("Content-type","text/plain;charset=UTF-8"):c.contentType="text/plain"}catch(e){}return c},d.prototype.scheme=function(){return this.socket.options.secure?"https":"http"},d.check=function(a,d){try{var e=b.util.request(d),f=c.XDomainRequest&&e instanceof XDomainRequest,g=a&&a.options&&a.options.secure?"https:":"http:",h=c.location&&g!=c.location.protocol;if(e&&(!f||!h))return!0}catch(i){}return!1},d.xdomainCheck=function(a){return d.check(a,!0)}}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b){function c(a){b.Transport.XHR.apply(this,arguments)}a.htmlfile=c,b.util.inherit(c,b.Transport.XHR),c.prototype.name="htmlfile",c.prototype.get=function(){this.doc=new(window[["Active"].concat("Object").join("X")])("htmlfile"),this.doc.open(),this.doc.write("<html></html>"),this.doc.close(),this.doc.parentWindow.s=this;var a=this.doc.createElement("div");a.className="socketio",this.doc.body.appendChild(a),this.iframe=this.doc.createElement("iframe"),a.appendChild(this.iframe);var c=this,d=b.util.query(this.socket.options.query,"t="+ +(new Date));this.iframe.src=this.prepareUrl()+d,b.util.on(window,"unload",function(){c.destroy()})},c.prototype._=function(a,b){this.onData(a);try{var c=b.getElementsByTagName("script")[0];c.parentNode.removeChild(c)}catch(d){}},c.prototype.destroy=function(){if(this.iframe){try{this.iframe.src="about:blank"}catch(a){}this.doc=null,this.iframe.parentNode.removeChild(this.iframe),this.iframe=null,CollectGarbage()}},c.prototype.close=function(){return this.destroy(),b.Transport.XHR.prototype.close.call(this)},c.check=function(a){if(typeof window!="undefined"&&["Active"].concat("Object").join("X")in window)try{var c=new(window[["Active"].concat("Object").join("X")])("htmlfile");return c&&b.Transport.XHR.check(a)}catch(d){}return!1},c.xdomainCheck=function(){return!1},b.transports.push("htmlfile")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(a,b,c){function d(){b.Transport.XHR.apply(this,arguments)}function e(){}a["xhr-polling"]=d,b.util.inherit(d,b.Transport.XHR),b.util.merge(d,b.Transport.XHR),d.prototype.name="xhr-polling",d.prototype.heartbeats=function(){return!1},d.prototype.open=function(){var a=this;return b.Transport.XHR.prototype.open.call(a),!1},d.prototype.get=function(){function b(){this.readyState==4&&(this.onreadystatechange=e,this.status==200?(a.onData(this.responseText),a.get()):a.onClose())}function d(){this.onload=e,this.onerror=e,a.retryCounter=1,a.onData(this.responseText),a.get()}function f(){a.retryCounter++,!a.retryCounter||a.retryCounter>3?a.onClose():a.get()}if(!this.isOpen)return;var a=this;this.xhr=this.request(),c.XDomainRequest&&this.xhr instanceof XDomainRequest?(this.xhr.onload=d,this.xhr.onerror=f):this.xhr.onreadystatechange=b,this.xhr.send(null)},d.prototype.onClose=function(){b.Transport.XHR.prototype.onClose.call(this);if(this.xhr){this.xhr.onreadystatechange=this.xhr.onload=this.xhr.onerror=e;try{this.xhr.abort()}catch(a){}this.xhr=null}},d.prototype.ready=function(a,c){var d=this;b.util.defer(function(){c.call(d)})},b.transports.push("xhr-polling")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b,c){function e(a){b.Transport["xhr-polling"].apply(this,arguments),this.index=b.j.length;var c=this;b.j.push(function(a){c._(a)})}var d=c.document&&"MozAppearance"in c.document.documentElement.style;a["jsonp-polling"]=e,b.util.inherit(e,b.Transport["xhr-polling"]),e.prototype.name="jsonp-polling",e.prototype.post=function(a){function i(){j(),c.socket.setBuffer(!1)}function j(){c.iframe&&c.form.removeChild(c.iframe);try{h=document.createElement('<iframe name="'+c.iframeId+'">')}catch(a){h=document.createElement("iframe"),h.name=c.iframeId}h.id=c.iframeId,c.form.appendChild(h),c.iframe=h}var c=this,d=b.util.query(this.socket.options.query,"t="+ +(new Date)+"&i="+this.index);if(!this.form){var e=document.createElement("form"),f=document.createElement("textarea"),g=this.iframeId="socketio_iframe_"+this.index,h;e.className="socketio",e.style.position="absolute",e.style.top="0px",e.style.left="0px",e.style.display="none",e.target=g,e.method="POST",e.setAttribute("accept-charset","utf-8"),f.name="d",e.appendChild(f),document.body.appendChild(e),this.form=e,this.area=f}this.form.action=this.prepareUrl()+d,j(),this.area.value=b.JSON.stringify(a);try{this.form.submit()}catch(k){}this.iframe.attachEvent?h.onreadystatechange=function(){c.iframe.readyState=="complete"&&i()}:this.iframe.onload=i,this.socket.setBuffer(!0)},e.prototype.get=function(){var a=this,c=document.createElement("script"),e=b.util.query(this.socket.options.query,"t="+ +(new Date)+"&i="+this.index);this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),c.async=!0,c.src=this.prepareUrl()+e,c.onerror=function(){a.onClose()};var f=document.getElementsByTagName("script")[0];f.parentNode.insertBefore(c,f),this.script=c,d&&setTimeout(function(){var a=document.createElement("iframe");document.body.appendChild(a),document.body.removeChild(a)},100)},e.prototype._=function(a){return this.onData(a),this.isOpen&&this.get(),this},e.prototype.ready=function(a,c){var e=this;if(!d)return c.call(this);b.util.load(function(){c.call(e)})},e.check=function(){return"document"in c},e.xdomainCheck=function(){return!0},b.transports.push("jsonp-polling")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),typeof define=="function"&&define.amd&&define([],function(){return io})})()



function QiSession(connected, disconnected, host)
{
  var _socket = io.connect("http://" + (host ? host : window.location.host),
                           { resource: "libs/qimessaging/2/socket.io",
                             'force new connection': true });
  var _dfd = new Array();
  var _sigs = new Array();
  var _idm = 0;

  _socket.on('reply', function (data) {
    var idm = data["idm"];
    if (data["result"] != null && data["result"]["metaobject"] != undefined)
    {
      var o = new Object();
      o.__MetaObject = data["result"]["metaobject"];
      var pyobj = data["result"]["pyobject"];
      _sigs[pyobj] = new Array();

      var methods = o.__MetaObject["methods"];
      for (var i in methods)
      {
        var methodName = methods[i]["name"];
        o[methodName] = createMetaCall(pyobj, methodName);
      }

      var signals = o.__MetaObject["signals"];
      for (var i in signals)
      {
        var signalName = signals[i]["name"];
        o[signalName] = createMetaSignal(pyobj, signalName, false);
      }

      var properties = o.__MetaObject["properties"];
      for (var i in properties)
      {
        var propertyName = properties[i]["name"];
        o[propertyName] = createMetaSignal(pyobj, propertyName, true);
      }

      _dfd[idm].resolve(o);
    }
    else
    {
      if (_dfd[idm].__cbi != undefined)
      {
        var cbi = _dfd[idm].__cbi;
        _sigs[cbi["obj"]][cbi["signal"]][data["result"]] = cbi["cb"];
      }
      _dfd[idm].resolve(data["result"]);
    }
    delete _dfd[idm];
  });

  _socket.on('error', function (data) {
    if (data["idm"] != undefined)
    {
      _dfd[data["idm"]].reject(data["result"]);
      delete _dfd[data["idm"]];
    }
  });

  _socket.on('signal', function (data) {
    var res = data["result"];
    var callback = _sigs[res["obj"]][res["signal"]][res["link"]];
    if (callback != undefined)
    {
      callback.apply(this, res["data"]);
    }
  });

  _socket.on('disconnect', function(data) {
    for (var idm in _dfd)
    {
      _dfd[idm].reject("Call " + idm + " canceled: disconnected");
      delete _dfd[idm];
    }

    if (disconnected)
    {
      disconnected();
    }
  });

  function createMetaCall(obj, member, data)
  {
    return function() {
      var idm = ++_idm;
      var args = Array.prototype.slice.call(arguments, 0);
      var promise = new Promise(function(resolve, reject) {
        _dfd[idm] = { resolve: resolve, reject: reject };
      });
      if (args[0] == "connect")
      {
        _dfd[idm].__cbi = data;
      }
      _socket.emit('call', { idm: idm, params: { obj: obj, member: member, args: args } });
      return promise;
    }
  }

  function createMetaSignal(obj, signal, isProperty)
  {
    var s = new Object();
    _sigs[obj][signal] = new Array();
    s.connect = function(cb) {
      return createMetaCall(obj, signal, { obj: obj, signal: signal, cb: cb })("connect");
    }
    s.disconnect = function(l) {
      delete _sigs[obj][signal][l];
      return createMetaCall(obj, signal)("disconnect", l);
    }

    if (!isProperty)
    {
      return s;
    }

    s.setValue = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      return createMetaCall(obj, signal).apply(this, [ "setValue" ].concat(args));
    }
    s.value = function() {
      return createMetaCall(obj, signal)("value");
    }
    return s;
  }

  this.service = createMetaCall("ServiceDirectory", "service");

  var _self = this;
  _socket.on('connect', function() {
    if (connected)
    {
      connected(_self);
    }
  });
}
"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};
//! annyang
//! version : 2.6.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://www.TalAter.com/annyang/
!function(a,b){"function"==typeof define____&&define____.amd?define____([],function(){return a.annyang=b(a)}):"object"===("undefined"==typeof module?"undefined":_typeof(module))&&module.exports?module.exports=b(a):a.annyang=b(a)}("undefined"!=typeof window?window:void 0,function(a,b){var c,d=a.SpeechRecognition||a.webkitSpeechRecognition||a.mozSpeechRecognition||a.msSpeechRecognition||a.oSpeechRecognition;if(!d)return null;var e,f,g=[],h={start:[],error:[],end:[],soundstart:[],result:[],resultMatch:[],resultNoMatch:[],errorNetwork:[],errorPermissionBlocked:[],errorPermissionDenied:[]},i=0,j=0,k=!1,l="font-weight: bold; color: #00f;",m=!1,n=!1,o=/\s*\((.*?)\)\s*/g,p=/(\(\?:[^)]+\))\?/g,q=/(\(\?)?:\w+/g,r=/\*\w+/g,s=/[\-{}\[\]+?.,\\\^$|#]/g,t=function(a){return a=a.replace(s,"\\$&").replace(o,"(?:$1)?").replace(q,function(a,b){return b?a:"([^\\s]+)"}).replace(r,"(.*?)").replace(p,"\\s*$1?\\s*"),new RegExp("^"+a+"$","i")},u=function(a){for(var b=arguments.length,c=Array(b>1?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];a.forEach(function(a){a.callback.apply(a.context,c)})},v=function(){return e!==b},w=function(a,b){a.indexOf("%c")!==-1||b?console.log(a,b||l):console.log(a)},x=function(){v()||c.init({},!1)},y=function(a,b,c){g.push({command:a,callback:b,originalPhrase:c}),k&&w("Command successfully loaded: %c"+c,l)},z=function(a){u(h.result,a);for(var b,c=0;c<a.length;c++){b=a[c].trim(),k&&w("Speech recognized: %c"+b,l);for(var d=0,e=g.length;d<e;d++){var f=g[d],i=f.command.exec(b);if(i){var j=i.slice(1);return k&&(w("command matched: %c"+f.originalPhrase,l),j.length&&w("with parameters",j)),f.callback.apply(this,j),void u(h.resultMatch,b,f.originalPhrase,a)}}}u(h.resultNoMatch,a)};return c={init:function(l){var o=!(arguments.length>1&&arguments[1]!==b)||arguments[1];e&&e.abort&&e.abort(),e=new d,e.maxAlternatives=5,e.continuous="http:"===a.location.protocol,e.lang="en-US",e.onstart=function(){n=!0,u(h.start)},e.onsoundstart=function(){u(h.soundstart)},e.onerror=function(a){switch(u(h.error,a),a.error){case"network":u(h.errorNetwork,a);break;case"not-allowed":case"service-not-allowed":f=!1,(new Date).getTime()-i<200?u(h.errorPermissionBlocked,a):u(h.errorPermissionDenied,a)}},e.onend=function(){if(n=!1,u(h.end),f){var a=(new Date).getTime()-i;j+=1,j%10===0&&k&&w("Speech Recognition is repeatedly stopping and starting. See http://is.gd/annyang_restarts for tips."),a<1e3?setTimeout(function(){c.start({paused:m})},1e3-a):c.start({paused:m})}},e.onresult=function(a){if(m)return k&&w("Speech heard, but annyang is paused"),!1;for(var b=a.results[a.resultIndex],c=[],d=0;d<b.length;d++)c[d]=b[d].transcript;z(c)},o&&(g=[]),l.length&&this.addCommands(l)},start:function(a){x(),a=a||{},m=a.paused!==b&&!!a.paused,f=a.autoRestart===b||!!a.autoRestart,a.continuous!==b&&(e.continuous=!!a.continuous),i=(new Date).getTime();try{e.start()}catch(a){k&&w(a.message)}},abort:function(){f=!1,j=0,v()&&e.abort()},pause:function(){m=!0},resume:function(){c.start()},debug:function(){var a=!(arguments.length>0&&arguments[0]!==b)||arguments[0];k=!!a},setLanguage:function(a){x(),e.lang=a},addCommands:function(b){var c;x();for(var d in b)if(b.hasOwnProperty(d))if(c=a[b[d]]||b[d],"function"==typeof c)y(t(d),c,d);else{if(!("object"===("undefined"==typeof c?"undefined":_typeof(c))&&c.regexp instanceof RegExp)){k&&w("Can not register command: %c"+d,l);continue}y(new RegExp(c.regexp.source,"i"),c.callback,d)}},removeCommands:function(a){a===b?g=[]:(a=Array.isArray(a)?a:[a],g=g.filter(function(b){for(var c=0;c<a.length;c++)if(a[c]===b.originalPhrase)return!1;return!0}))},addCallback:function(c,d,e){var f=a[d]||d;"function"==typeof f&&h[c]!==b&&h[c].push({callback:f,context:e||this})},removeCallback:function(a,c){var d=function(a){return a.callback!==c};for(var e in h)h.hasOwnProperty(e)&&(a!==b&&a!==e||(c===b?h[e]=[]:h[e]=h[e].filter(d)))},isListening:function(){return n&&!m},getSpeechRecognizer:function(){return e},trigger:function(a){return c.isListening()?(Array.isArray(a)||(a=[a]),void z(a)):void(k&&w(n?"Speech heard, but annyang is paused":"Cannot trigger while annyang is aborted"))}}});

/*
 ResponsiveVoice JS v1.5.14

 (c) 2015-2019 LearnBrite

 License: http://responsivevoice.org/license
*/
if("undefined"!=typeof responsiveVoice)console.log("ResponsiveVoice already loaded"),console.log(responsiveVoice);else var ResponsiveVoice=function(){function p(a){a=a.replace(/([\n\r])+/gm,"\n");for(var b=/([,.:!\u00a1?\u00bf;()\[\]\u2014\u00ab\u00bb])+[\n\r]/gm,d=!0;d;)null===a.match(b)?d=!1:a=a.replace(b,"$1 ");return a}var a=this;a.version="1.5.14";console.log("ResponsiveVoice r"+a.version);a.responsivevoices=[{name:"UK English Female",flag:"gb",gender:"f",lang:"en-GB",voiceIDs:[3,7,171,278,201,
    5,1,257,286,342,258,287,343,8]},{name:"UK English Male",flag:"gb",gender:"m",lang:"en-GB",voiceIDs:[0,277,202,75,4,2,256,285,341,159,6,7]},{name:"US English Female",flag:"us",gender:"f",lang:"en-US",voiceIDs:[39,40,41,42,383,205,204,43,173,235,283,339,408,44]},{name:"US English Male",flag:"us",gender:"m",lang:"en-US",voiceIDs:[234,282,338,236,284,340,237,382,2,4,0,6,7,75,195,169]},{name:"Arabic Male",flag:"ar",gender:"m",lang:"ar-SA",voiceIDs:[96,95,97,196,388]},{name:"Arabic Female",flag:"ar",gender:"f",
    lang:"ar-SA",voiceIDs:[98]},{name:"Armenian Male",flag:"hy",gender:"f",lang:"hy-AM",voiceIDs:[99]},{name:"Australian Female",flag:"au",gender:"f",lang:"en-AU",voiceIDs:[276,201,87,5,88]},{name:"Australian Male",flag:"au",gender:"m",lang:"en-AU",voiceIDs:[86,381,386]},{name:"Brazilian Portuguese Female",flag:"br",gender:"f",lang:"pt-BR",voiceIDs:[245,124,123,125,186,223,126]},{name:"Brazilian Portuguese Male",flag:"br",gender:"m",lang:"pt-BR",voiceIDs:[315,332,371,399]},{name:"Chinese Female",flag:"cn",
    gender:"f",lang:"zh-CN",voiceIDs:[249,58,59,380,281,231,155,60,191,268,297,353,269,298,354,409,61]},{name:"Chinese Male",flag:"cn",gender:"m",lang:"zh-CN",voiceIDs:[317,334,373,389]},{name:"Chinese (Hong Kong) Female",flag:"hk",gender:"f",lang:"zh-HK",voiceIDs:[192,193,232,250,251,270,299,355,409,252]},{name:"Chinese (Hong Kong) Male",flag:"hk",gender:"m",lang:"zh-HK",voiceIDs:[318,335,374,390]},{name:"Chinese Taiwan Female",flag:"tw",gender:"f",lang:"zh-TW",voiceIDs:[194,233,253,254,305,322,361,
    384,319,336,375,409,255]},{name:"Chinese Taiwan Male",flag:"tw",gender:"m",lang:"zh-TW",voiceIDs:[320,337,376,391]},{name:"Czech Female",flag:"cz",gender:"f",lang:"cs-CZ",voiceIDs:[101,100,102,197,103]},{name:"Czech Male",flag:"cz",gender:"m",lang:"cs-CZ",voiceIDs:[161]},{name:"Danish Female",flag:"dk",gender:"f",lang:"da-DK",voiceIDs:[105,104,106,198,107]},{name:"Danish Male",flag:"da",gender:"m",lang:"da-DK",voiceIDs:[162]},{name:"Deutsch Female",flag:"de",gender:"f",lang:"de-DE",voiceIDs:[27,28,
    29,30,78,170,275,199,31,261,290,346,262,291,347,32]},{name:"Deutsch Male",flag:"de",gender:"m",lang:"de-DE",voiceIDs:[307,324,363,377,393]},{name:"Dutch Female",flag:"nl",gender:"f",lang:"nl-NL",voiceIDs:[243,219,84,157,158,184,45]},{name:"Dutch Male",flag:"nl",gender:"m",lang:"nl-NL",voiceIDs:[157,220,407]},{name:"Finnish Female",flag:"fi",gender:"f",lang:"fi-FI",voiceIDs:[90,89,91,209,92]},{name:"Finnish Male",flag:"fi",gender:"m",lang:"fi-FI",voiceIDs:[160]},{name:"French Female",flag:"fr",gender:"f",
    lang:"fr-FR",voiceIDs:[240,21,22,23,77,178,279,210,266,295,351,304,321,360,26]},{name:"French Male",flag:"fr",gender:"m",lang:"fr-FR",voiceIDs:[311,328,367,378,392]},{name:"Greek Female",flag:"gr",gender:"f",lang:"el-GR",voiceIDs:[62,63,80,200,64]},{name:"Greek Male",flag:"gr",gender:"m",lang:"el-GR",voiceIDs:[163]},{name:"Hindi Female",flag:"hi",gender:"f",lang:"hi-IN",voiceIDs:[247,66,154,179,213,259,288,344,67]},{name:"Hindi Male",flag:"hi",gender:"m",lang:"hi-IN",voiceIDs:[394]},{name:"Hungarian Female",
    flag:"hu",gender:"f",lang:"hu-HU",voiceIDs:[9,10,81,214,11]},{name:"Hungarian Male",flag:"hu",gender:"m",lang:"hu-HU",voiceIDs:[164]},{name:"Indonesian Female",flag:"id",gender:"f",lang:"id-ID",voiceIDs:[241,111,112,180,215,113]},{name:"Indonesian Male",flag:"id",gender:"m",lang:"id-ID",voiceIDs:[395]},{name:"Italian Female",flag:"it",gender:"f",lang:"it-IT",voiceIDs:[242,33,34,35,36,37,79,181,216,271,300,356,38]},{name:"Italian Male",flag:"it",gender:"m",lang:"it-IT",voiceIDs:[312,329,368,406]},
    {name:"Japanese Female",flag:"jp",gender:"f",lang:"ja-JP",voiceIDs:[248,50,51,280,217,52,153,182,273,302,358,274,303,359,53]},{name:"Japanese Male",flag:"jp",gender:"m",lang:"ja-JP",voiceIDs:[313,330,369,379,396]},{name:"Korean Female",flag:"kr",gender:"f",lang:"ko-KR",voiceIDs:[54,55,56,156,183,218,306,323,362,384,57]},{name:"Korean Male",flag:"kr",gender:"m",lang:"ko-KR",voiceIDs:[397]},{name:"Latin Female",flag:"va",gender:"f",lang:"la",voiceIDs:[114],deprecated:!0},{name:"Latin Male",flag:"va",
    gender:"m",lang:"la",voiceIDs:[165]},{name:"Norwegian Female",flag:"no",gender:"f",lang:"nb-NO",voiceIDs:[72,73,221,74]},{name:"Norwegian Male",flag:"no",gender:"m",lang:"nb-NO",voiceIDs:[166]},{name:"Polish Female",flag:"pl",gender:"f",lang:"pl-PL",voiceIDs:[244,120,119,121,185,222,267,296,352,122]},{name:"Polish Male",flag:"pl",gender:"m",lang:"pl-PL",voiceIDs:[314,331,370,398]},{name:"Portuguese Female",flag:"br",gender:"f",lang:"pt-BR",voiceIDs:[128,127,129,187,224,272,301,357,130]},{name:"Portuguese Male",
    flag:"br",gender:"m",lang:"pt-BR",voiceIDs:[400]},{name:"Romanian Female",flag:"ro",gender:"f",lang:"ro-RO",voiceIDs:[151,150,152,225,46]},{name:"Russian Female",flag:"ru",gender:"f",lang:"ru-RU",voiceIDs:[246,47,48,83,188,226,260,289,345,49]},{name:"Russian Male",flag:"ru",gender:"m",lang:"ru-RU",voiceIDs:[316,333,372,387]},{name:"Slovak Female",flag:"sk",gender:"f",lang:"sk-SK",voiceIDs:[133,132,134,227,135]},{name:"Slovak Male",flag:"sk",gender:"m",lang:"sk-SK",voiceIDs:[167],deprecated:!0},{name:"Spanish Female",
    flag:"es",gender:"f",lang:"es-ES",voiceIDs:[19,238,16,17,18,20,76,174,207,263,292,348,264,293,349,15]},{name:"Spanish Male",flag:"es",gender:"m",lang:"es-ES",voiceIDs:[309,326,365,401]},{name:"Spanish Latin American Female",flag:"es",gender:"f",lang:"es-MX",voiceIDs:[239,137,136,138,175,208,265,294,350,139]},{name:"Spanish Latin American Male",flag:"es",gender:"m",lang:"es-MX",voiceIDs:[136,310,327,366,402]},{name:"Swedish Female",flag:"sv",gender:"f",lang:"sv-SE",voiceIDs:[85,149,228,65]},{name:"Swedish Male",
    flag:"sv",gender:"m",lang:"sv-SE",voiceIDs:[148,168]},{name:"Tamil Male",flag:"hi",gender:"m",lang:"hi-IN",voiceIDs:[141]},{name:"Thai Female",flag:"th",gender:"f",lang:"th-TH",voiceIDs:[143,142,144,189,229,145]},{name:"Thai Male",flag:"th",gender:"m",lang:"th-TH",voiceIDs:[403]},{name:"Turkish Female",flag:"tr",gender:"f",lang:"tr-TR",voiceIDs:[69,70,82,190,230,71]},{name:"Turkish Male",flag:"tr",gender:"m",lang:"tr-TR",voiceIDs:[404]},{name:"Vietnamese Female",flag:"vi",gender:"f",lang:"vi-VN",
    voiceIDs:[405]},{name:"Vietnamese Male",flag:"vi",gender:"m",lang:"vi-VN",voiceIDs:[146]},{name:"Afrikaans Male",flag:"af",gender:"m",lang:"af-ZA",voiceIDs:[93]},{name:"Albanian Male",flag:"sq",gender:"m",lang:"sq-AL",voiceIDs:[94]},{name:"Bosnian Male",flag:"bs",gender:"m",lang:"bs",voiceIDs:[14]},{name:"Catalan Male",flag:"catalonia",gender:"m",lang:"ca-ES",voiceIDs:[68]},{name:"Croatian Male",flag:"hr",gender:"m",lang:"hr-HR",voiceIDs:[13]},{name:"Esperanto Male",flag:"eo",gender:"m",lang:"eo",
    voiceIDs:[108]},{name:"Icelandic Male",flag:"is",gender:"m",lang:"is-IS",voiceIDs:[110]},{name:"Latvian Male",flag:"lv",gender:"m",lang:"lv-LV",voiceIDs:[115]},{name:"Macedonian Male",flag:"mk",gender:"m",lang:"mk-MK",voiceIDs:[116]},{name:"Moldavian Female",flag:"md",gender:"f",lang:"md",voiceIDs:[117]},{name:"Moldavian Male",flag:"md",gender:"m",lang:"md",voiceIDs:[117],deprecated:!0},{name:"Montenegrin Male",flag:"me",gender:"m",lang:"me",voiceIDs:[118]},{name:"Serbian Male",flag:"sr",gender:"m",
    lang:"sr-RS",voiceIDs:[12]},{name:"Serbo-Croatian Male",flag:"hr",gender:"m",lang:"hr-HR",voiceIDs:[131]},{name:"Swahili Male",flag:"sw",gender:"m",lang:"sw-KE",voiceIDs:[140]},{name:"Welsh Male",flag:"cy",gender:"m",lang:"cy",voiceIDs:[147]},{name:"Fallback UK Female",flag:"gb",gender:"f",lang:"en-GB",voiceIDs:[8]}];a.voicecollection=[{name:"Google UK English Male"},{name:"Agnes"},{name:"Daniel Compact"},{name:"Google UK English Female"},{name:"en-GB",rate:.25,pitch:1},{name:"en-AU",rate:.25,pitch:1},
    {name:"ingl\u00e9s Reino Unido"},{name:"English United Kingdom"},{name:"Fallback en-GB Female",lang:"en-GB",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Eszter Compact"},{name:"hu-HU",rate:.4},{name:"Fallback Hungarian Female",lang:"hu",fallbackvoice:!0,service:"g1"},{name:"Fallback Serbian Male",lang:"sr",fallbackvoice:!0,service:"g1",gender:"male"},{name:"Fallback Croatian Male",lang:"hr",fallbackvoice:!0,service:"g1",gender:"male"},{name:"Fallback Bosnian Male",lang:"bs",fallbackvoice:!0,
    service:"g1",gender:"male"},{name:"Fallback Spanish Female",lang:"es",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Spanish Spain"},{name:"espa\u00f1ol Espa\u00f1a"},{name:"Diego Compact",rate:.3},{name:"Google Espa\u00f1ol"},{name:"es-ES",rate:.2},{name:"Google Fran\u00e7ais"},{name:"French France"},{name:"franc\u00e9s Francia"},{name:"Virginie Compact",rate:.5},{name:"fr-FR",rate:.25},{name:"Fallback French Female",lang:"fr",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Google Deutsch"},
    {name:"German Germany"},{name:"alem\u00e1n Alemania"},{name:"Yannick Compact",rate:.5},{name:"de-DE",rate:.25},{name:"Fallback Deutsch Female",lang:"de",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Google Italiano"},{name:"Italian Italy"},{name:"italiano Italia"},{name:"Paolo Compact",rate:.5},{name:"it-IT",rate:.25},{name:"Fallback Italian Female",lang:"it",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Google US English",timerSpeed:1},{name:"English United States"},{name:"ingl\u00e9s Estados Unidos"},
    {name:"Vicki"},{name:"en-US",rate:.2,pitch:1,timerSpeed:1.3},{name:"Fallback US English",lang:"en-US",fallbackvoice:!0,timerSpeed:0,service:"g1",gender:"female"},{name:"Fallback Dutch Female",lang:"nl",fallbackvoice:!0,timerSpeed:0,service:"g1",gender:"female"},{name:"Fallback Romanian",lang:"ro",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Milena Compact"},{name:"ru-RU",rate:.25},{name:"Fallback Russian",lang:"ru",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Google \u65e5\u672c\u4eba",
    timerSpeed:1},{name:"Kyoko Compact"},{name:"ja-JP",rate:.25},{name:"Fallback Japanese Female",lang:"ja",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Google \ud55c\uad6d\uc758",timerSpeed:1},{name:"Narae Compact"},{name:"ko-KR",rate:.25},{name:"Fallback Korean Female",lang:"ko",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Google \u4e2d\u56fd\u7684",timerSpeed:1},{name:"Ting-Ting Compact"},{name:"zh-CN",rate:.25},{name:"Fallback Chinese",lang:"zh-CN",fallbackvoice:!0,service:"g1",
    gender:"female"},{name:"Alexandros Compact"},{name:"el-GR",rate:.25},{name:"Fallback Greek",lang:"el",fallbackvoice:!0,service:"g2",gender:"female"},{name:"Fallback Swedish",lang:"sv",fallbackvoice:!0,service:"g2",gender:"female"},{name:"hi-IN",rate:.25},{name:"Fallback Hindi Female",lang:"hi",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Fallback Catalan",lang:"ca",fallbackvoice:!0,service:"g1",gender:"male"},{name:"Aylin Compact"},{name:"tr-TR",rate:.25},{name:"Fallback Turkish",lang:"tr",
    fallbackvoice:!0,service:"g1",gender:"female"},{name:"Stine Compact"},{name:"no-NO",rate:.25},{name:"Fallback Norwegian",lang:"no",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Daniel"},{name:"Monica"},{name:"Amelie"},{name:"Anna"},{name:"Alice"},{name:"Melina"},{name:"Mariska"},{name:"Yelda"},{name:"Milena"},{name:"Xander"},{name:"Alva"},{name:"Lee Compact"},{name:"Karen"},{name:"Fallback Australian Female",lang:"en-AU",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Mikko Compact"},
    {name:"Satu"},{name:"fi-FI",rate:.25},{name:"Fallback Finnish",lang:"fi",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Fallback Afrikans",lang:"af",fallbackvoice:!0,service:"g1",gender:"male"},{name:"Fallback Albanian",lang:"sq",fallbackvoice:!0,service:"g1",gender:"male"},{name:"Maged Compact"},{name:"Tarik"},{name:"ar-SA",rate:.25},{name:"Fallback Arabic",lang:"ar",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Fallback Armenian",lang:"hy",fallbackvoice:!0,service:"g1",gender:"male"},
    {name:"Zuzana Compact"},{name:"Zuzana"},{name:"cs-CZ",rate:.25},{name:"Fallback Czech",lang:"cs",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Ida Compact"},{name:"Sara"},{name:"da-DK",rate:.25},{name:"Fallback Danish",lang:"da",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Fallback Esperanto",lang:"eo",fallbackvoice:!0,service:"g1",gender:"male"},{name:"Fallback Haitian Creole",lang:"ht",fallbackvoice:!0},{name:"Fallback Icelandic",lang:"is",fallbackvoice:!0,service:"g1",gender:"male"},
    {name:"Damayanti"},{name:"id-ID",rate:.25},{name:"Fallback Indonesian Female",lang:"id",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Fallback Latin Female",lang:"la",fallbackvoice:!0,service:"g2",gender:"female"},{name:"Fallback Latvian Male",lang:"lv",fallbackvoice:!0,service:"g1",gender:"male"},{name:"Fallback Macedonian Male",lang:"mk",fallbackvoice:!0,service:"g1",gender:"male"},{name:"Fallback Moldavian Female",lang:"mo",fallbackvoice:!0,service:"g2",gender:"female"},{name:"Fallback Montenegrin Male",
    lang:"sr-ME",fallbackvoice:!0,service:"g1",gender:"male"},{name:"Agata Compact"},{name:"Zosia"},{name:"pl-PL",rate:.25},{name:"Fallback Polish Female",lang:"pl",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Raquel Compact"},{name:"Luciana"},{name:"pt-BR",rate:.25},{name:"Fallback Brazilian Portuguese Female",lang:"pt-BR",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Joana Compact"},{name:"Joana"},{name:"pt-PT",rate:.25},{name:"Fallback Portuguese",lang:"pt-PT",fallbackvoice:!0,service:"g1",
    gender:"female"},{name:"Fallback Serbo-Croation",lang:"sh",fallbackvoice:!0,service:"g2",gender:"male"},{name:"Laura Compact"},{name:"Laura"},{name:"sk-SK",rate:.25},{name:"Fallback Slovak",lang:"sk",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Javier Compact"},{name:"Paulina"},{name:"es-MX",rate:.25},{name:"Fallback Spanish (Latin American) Female",lang:"es-419",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Fallback Swahili",lang:"sw",fallbackvoice:!0,service:"g1",gender:"male"},
    {name:"Fallback Tamil",lang:"ta",fallbackvoice:!0,service:"g1",gender:"male"},{name:"Narisa Compact"},{name:"Kanya"},{name:"th-TH",rate:.25},{name:"Fallback Thai Female",lang:"th",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Fallback Vietnamese Male",lang:"vi",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Welsh",lang:"cy",fallbackvoice:!0,service:"g1",gender:"male"},{name:"Oskar Compact"},{name:"sv-SE",rate:.25},{name:"Simona Compact"},{name:"Ioana"},{name:"ro-RO",rate:.25},
    {name:"Kyoko"},{name:"Lekha"},{name:"Ting-Ting"},{name:"Yuna"},{name:"Xander Compact"},{name:"nl-NL",rate:.25},{name:"Fallback UK English Male",lang:"en-GB",fallbackvoice:!0,service:"g1",voicename:"rjs",gender:"male"},{name:"Finnish Male",lang:"fi",fallbackvoice:!0,service:"g3",voicename:"",gender:"male"},{name:"Czech Male",lang:"cs",fallbackvoice:!0,service:"g3",voicename:"",gender:"male"},{name:"Danish Male",lang:"da",fallbackvoice:!0,service:"g3",voicename:"",gender:"male"},{name:"Greek Male",
    lang:"el",fallbackvoice:!0,service:"g3",voicename:"",gender:"male"},{name:"Hungarian Male",lang:"hu",fallbackvoice:!0,service:"g3",voicename:"",gender:"male"},{name:"Latin Male",lang:"la",fallbackvoice:!0,service:"g1",voicename:"",gender:"male"},{name:"Norwegian Male",lang:"no",fallbackvoice:!0,service:"g3",voicename:"",gender:"male"},{name:"Slovak Male",lang:"sk",fallbackvoice:!0,service:"g3",voicename:"",gender:"male"},{name:"Swedish Male",lang:"sv",fallbackvoice:!0,service:"g3",voicename:"",gender:"male"},
    {name:"Fallback US English Male",lang:"en-US",fallbackvoice:!0,service:"g3",voicename:"",gender:"male"},{name:"German Germany",lang:"de_DE"},{name:"English United Kingdom",lang:"en_GB"},{name:"English India",lang:"en_IN"},{name:"English United States",lang:"en_US"},{name:"Spanish Spain",lang:"es_ES"},{name:"Spanish Mexico",lang:"es_MX"},{name:"Spanish United States",lang:"es_US"},{name:"French Belgium",lang:"fr_BE"},{name:"French France",lang:"fr_FR"},{name:"Hindi India",lang:"hi_IN"},{name:"Indonesian Indonesia",
    lang:"in_ID"},{name:"Italian Italy",lang:"it_IT"},{name:"Japanese Japan",lang:"ja_JP"},{name:"Korean South Korea",lang:"ko_KR"},{name:"Dutch Netherlands",lang:"nl_NL"},{name:"Polish Poland",lang:"pl_PL"},{name:"Portuguese Brazil",lang:"pt_BR"},{name:"Portuguese Portugal",lang:"pt_PT"},{name:"Russian Russia",lang:"ru_RU"},{name:"Thai Thailand",lang:"th_TH"},{name:"Turkish Turkey",lang:"tr_TR"},{name:"Chinese China",lang:"zh_CN_#Hans"},{name:"Chinese Hong Kong",lang:"zh_HK_#Hans"},{name:"Chinese Hong Kong",
    lang:"zh_HK_#Hant"},{name:"Chinese Taiwan",lang:"zh_TW_#Hant"},{name:"Alex"},{name:"Maged",lang:"ar-SA"},{name:"Zuzana",lang:"cs-CZ"},{name:"Sara",lang:"da-DK"},{name:"Anna",lang:"de-DE"},{name:"Melina",lang:"el-GR"},{name:"Karen",lang:"en-AU"},{name:"Daniel",lang:"en-GB"},{name:"Moira",lang:"en-IE"},{name:"Samantha (Enhanced)",lang:"en-US"},{name:"Samantha",lang:"en-US"},{name:"Tessa",lang:"en-ZA"},{name:"Monica",lang:"es-ES"},{name:"Paulina",lang:"es-MX"},{name:"Satu",lang:"fi-FI"},{name:"Amelie",
    lang:"fr-CA"},{name:"Thomas",lang:"fr-FR"},{name:"Carmit",lang:"he-IL"},{name:"Lekha",lang:"hi-IN"},{name:"Mariska",lang:"hu-HU"},{name:"Damayanti",lang:"id-ID"},{name:"Alice",lang:"it-IT"},{name:"Kyoko",lang:"ja-JP"},{name:"Yuna",lang:"ko-KR"},{name:"Ellen",lang:"nl-BE"},{name:"Xander",lang:"nl-NL"},{name:"Nora",lang:"no-NO"},{name:"Zosia",lang:"pl-PL"},{name:"Luciana",lang:"pt-BR"},{name:"Joana",lang:"pt-PT"},{name:"Ioana",lang:"ro-RO"},{name:"Milena",lang:"ru-RU"},{name:"Laura",lang:"sk-SK"},{name:"Alva",
    lang:"sv-SE"},{name:"Kanya",lang:"th-TH"},{name:"Yelda",lang:"tr-TR"},{name:"Ting-Ting",lang:"zh-CN"},{name:"Sin-Ji",lang:"zh-HK"},{name:"Mei-Jia",lang:"zh-TW"},{name:"Microsoft David Mobile - English (United States)",lang:"en-US"},{name:"Microsoft Zira Mobile - English (United States)",lang:"en-US"},{name:"Microsoft Mark Mobile - English (United States)",lang:"en-US"},{name:"native",lang:""},{name:"Google espa\u00f1ol"},{name:"Google espa\u00f1ol de Estados Unidos"},{name:"Google fran\u00e7ais"},
    {name:"Google Bahasa Indonesia"},{name:"Google italiano"},{name:"Google Nederlands"},{name:"Google polski"},{name:"Google portugu\u00eas do Brasil"},{name:"Google \u0440\u0443\u0441\u0441\u043a\u0438\u0439"},{name:"Google \u0939\u093f\u0928\u094d\u0926\u0940"},{name:"Google \u65e5\u672c\u8a9e"},{name:"Google \u666e\u901a\u8bdd\uff08\u4e2d\u56fd\u5927\u9646\uff09"},{name:"Google \u7ca4\u8a9e\uff08\u9999\u6e2f\uff09"},{name:"zh-HK",rate:.25},{name:"Fallback Chinese (Hong Kong) Female",lang:"zh-HK",
    fallbackvoice:!0,service:"g1",gender:"female"},{name:"Google \u7ca4\u8a9e\uff08\u9999\u6e2f\uff09"},{name:"zh-TW",rate:.25},{name:"Fallback Chinese (Taiwan) Female",lang:"zh-TW",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Microsoft George Mobile - English (United Kingdom)",lang:"en-GB"},{name:"Microsoft Susan Mobile - English (United Kingdom)",lang:"en-GB"},{name:"Microsoft Hazel Mobile - English (United Kingdom)",lang:"en-GB"},{name:"Microsoft Heera Mobile - English (India)",lang:"en-In"},
    {name:"Microsoft Irina Mobile - Russian (Russia)",lang:"ru-RU"},{name:"Microsoft Hedda Mobile - German (Germany)",lang:"de-DE"},{name:"Microsoft Katja Mobile - German (Germany)",lang:"de-DE"},{name:"Microsoft Helena Mobile - Spanish (Spain)",lang:"es-ES"},{name:"Microsoft Laura Mobile - Spanish (Spain)",lang:"es-ES"},{name:"Microsoft Sabina Mobile - Spanish (Mexico)",lang:"es-MX"},{name:"Microsoft Julie Mobile - French (France)",lang:"fr-FR"},{name:"Microsoft Paulina Mobile - Polish (Poland)",lang:"pl-PL"},
    {name:"Microsoft Huihui Mobile - Chinese (Simplified, PRC)",lang:"zh-CN"},{name:"Microsoft Yaoyao Mobile - Chinese (Simplified, PRC)",lang:"zh-CN"},{name:"Microsoft Tracy Mobile - Chinese (Traditional, Hong Kong S.A.R.)",lang:"zh-CN"},{name:"Microsoft Elsa Mobile - Italian (Italy)",lang:"it-IT"},{name:"Microsoft Maria Mobile - Portuguese (Brazil)",lang:"pt-BR"},{name:"Microsoft Ayumi Mobile - Japanese (Japan)",lang:"ja-JP"},{name:"Microsoft Haruka Mobile - Japanese (Japan)",lang:"ja-JP"},{name:"Helena",
    lang:"de-DE"},{name:"Catherine",lang:"en-AU"},{name:"Arthur",lang:"en-GB"},{name:"Martha",lang:"en-GB"},{name:"Marie",lang:"fr-FR"},{name:"O-ren",lang:"ja-JP"},{name:"Yu-shu",lang:"zh-CN"},{name:"Microsoft David - English (United States)",lang:"en-US"},{name:"Microsoft Zira - English (United States)",lang:"en-US"},{name:"Microsoft Mark - English (United States)",lang:"en-US"},{name:"Microsoft George - English (United Kingdom)",lang:"en-GB"},{name:"Microsoft Susan - English (United Kingdom)",lang:"en-GB"},
    {name:"Microsoft Hazel - English (United Kingdom)",lang:"en-GB"},{name:"Microsoft Heera - English (India)",lang:"en-In"},{name:"Microsoft Irina - Russian (Russia)",lang:"ru-RU"},{name:"Microsoft Hedda - German (Germany)",lang:"de-DE"},{name:"Microsoft Katja - German (Germany)",lang:"de-DE"},{name:"Microsoft Helena - Spanish (Spain)",lang:"es-ES"},{name:"Microsoft Laura - Spanish (Spain)",lang:"es-ES"},{name:"Microsoft Sabina - Spanish (Mexico)",lang:"es-MX"},{name:"Microsoft Julie - French (France)",
    lang:"fr-FR"},{name:"Microsoft Paulina - Polish (Poland)",lang:"pl-PL"},{name:"Microsoft Huihui - Chinese (Simplified, PRC)",lang:"zh-CN"},{name:"Microsoft Yaoyao - Chinese (Simplified, PRC)",lang:"zh-CN"},{name:"Microsoft Tracy - Chinese (Traditional, Hong Kong S.A.R.)",lang:"zh-CN"},{name:"Microsoft Elsa - Italian (Italy)",lang:"it-IT"},{name:"Microsoft Maria - Portuguese (Brazil)",lang:"pt-BR"},{name:"Microsoft Ayumi - Japanese (Japan)",lang:"ja-JP"},{name:"Microsoft Haruka - Japanese (Japan)",
    lang:"ja-JP"},{name:"Microsoft Hortense - French (France)",lang:"fr-FR"},{name:"Microsoft Hanhan - Chinese (Traditional, Taiwan)",lang:"zh-TW"},{name:"Microsoft Heami - Korean (Korean)",lang:"ko-KR"},{name:"Microsoft Stefan - German (Germany)",lang:"de-DE"},{name:"Microsoft Ravi - English (India)",lang:"en-IN"},{name:"Microsoft Pablo - Spanish (Spain)",lang:"es-ES"},{name:"Microsoft Raul - Spanish (Mexico)",lang:"es-MX"},{name:"Microsoft Paul - French (France)",lang:"fr-FR"},{name:"Microsoft Cosimo - Italian (Italy)",
    lang:"it-IT"},{name:"Microsoft Ichiro - Japanese (Japan)",lang:"ja-JP"},{name:"Microsoft Adam - Polish (Poland)",lang:"pl-PL"},{name:"Microsoft Daniel - Portuguese (Brazil)",lang:"pt-BR"},{name:"Microsoft Pavel - Russian (Russia)",lang:"ru-RU"},{name:"Microsoft Kangkang - Chinese (Simplified, PRC)",lang:"zh-CN"},{name:"Microsoft Danny - Chinese (Traditional, Hong Kong S.A.R.)",lang:"zh-HK"},{name:"Microsoft Yating - Chinese (Traditional, Taiwan)",lang:"zh-TW"},{name:"Microsoft Zhiwei - Chinese (Traditional, Taiwan)",
    lang:"zh-TW"},{name:"Microsoft Hortense Mobile - French (France)",lang:"fr-FR"},{name:"Microsoft Hanhan Mobile - Chinese (Traditional, Taiwan)",lang:"zh-TW"},{name:"Microsoft Heami Mobile - Korean (Korean)",lang:"ko-KR"},{name:"Microsoft Stefan Mobile - German (Germany)",lang:"de-DE"},{name:"Microsoft Ravi Mobile - English (India)",lang:"en-IN"},{name:"Microsoft Pablo Mobile - Spanish (Spain)",lang:"es-ES"},{name:"Microsoft Raul Mobile - Spanish (Mexico)",lang:"es-MX"},{name:"Microsoft Paul Mobile - French (France)",
    lang:"fr-FR"},{name:"Microsoft Cosimo Mobile - Italian (Italy)",lang:"it-IT"},{name:"Microsoft Ichiro Mobile - Japanese (Japan)",lang:"ja-JP"},{name:"Microsoft Adam Mobile - Polish (Poland)",lang:"pl-PL"},{name:"Microsoft Daniel Mobile - Portuguese (Brazil)",lang:"pt-BR"},{name:"Microsoft Pavel Mobile - Russian (Russia)",lang:"ru-RU"},{name:"Microsoft Kangkang Mobile - Chinese (Simplified, PRC)",lang:"zh-CN"},{name:"Microsoft Danny Mobile - Chinese (Traditional, Hong Kong S.A.R.)",lang:"zh-HK"},{name:"Microsoft Yating Mobile - Chinese (Traditional, Taiwan)",
    lang:"zh-TW"},{name:"Microsoft Zhiwei Mobile - Chinese (Traditional, Taiwan)",lang:"zh-TW"},{name:"Microsoft David Desktop - English (United States)",lang:"en-US"},{name:"Microsoft Zira Desktop - English (United States)",lang:"en-US"},{name:"Microsoft Mark Desktop - English (United States)",lang:"en-US"},{name:"Microsoft George Desktop - English (United Kingdom)",lang:"en-GB"},{name:"Microsoft Susan Desktop - English (United Kingdom)",lang:"en-GB"},{name:"Microsoft Hazel Desktop - English (United Kingdom)",
    lang:"en-GB"},{name:"Microsoft Heera Desktop - English (India)",lang:"en-In"},{name:"Microsoft Irina Desktop - Russian (Russia)",lang:"ru-RU"},{name:"Microsoft Hedda Desktop - German (Germany)",lang:"de-DE"},{name:"Microsoft Katja Desktop - German (Germany)",lang:"de-DE"},{name:"Microsoft Helena Desktop - Spanish (Spain)",lang:"es-ES"},{name:"Microsoft Laura Desktop - Spanish (Spain)",lang:"es-ES"},{name:"Microsoft Sabina Desktop - Spanish (Mexico)",lang:"es-MX"},{name:"Microsoft Julie Desktop - French (France)",
    lang:"fr-FR"},{name:"Microsoft Paulina Desktop - Polish (Poland)",lang:"pl-PL"},{name:"Microsoft Huihui Desktop - Chinese (Simplified, PRC)",lang:"zh-CN"},{name:"Microsoft Yaoyao Desktop - Chinese (Simplified, PRC)",lang:"zh-CN"},{name:"Microsoft Tracy Desktop - Chinese (Traditional, Hong Kong S.A.R.)",lang:"zh-CN"},{name:"Microsoft Elsa Desktop - Italian (Italy)",lang:"it-IT"},{name:"Microsoft Maria Desktop - Portuguese (Brazil)",lang:"pt-BR"},{name:"Microsoft Ayumi Desktop - Japanese (Japan)",lang:"ja-JP"},
    {name:"Microsoft Haruka Desktop - Japanese (Japan)",lang:"ja-JP"},{name:"Microsoft Hortense Desktop - French (France)",lang:"fr-FR"},{name:"Microsoft Hanhan Desktop - Chinese (Traditional, Taiwan)",lang:"zh-TW"},{name:"Microsoft Heami Desktop - Korean (Korean)",lang:"ko-KR"},{name:"Microsoft Stefan Desktop - German (Germany)",lang:"de-DE"},{name:"Microsoft Ravi Desktop - English (India)",lang:"en-IN"},{name:"Microsoft Pablo Desktop - Spanish (Spain)",lang:"es-ES"},{name:"Microsoft Raul Desktop - Spanish (Mexico)",
    lang:"es-MX"},{name:"Microsoft Paul Desktop - French (France)",lang:"fr-FR"},{name:"Microsoft Cosimo Desktop - Italian (Italy)",lang:"it-IT"},{name:"Microsoft Ichiro Desktop - Japanese (Japan)",lang:"ja-JP"},{name:"Microsoft Adam Desktop - Polish (Poland)",lang:"pl-PL"},{name:"Microsoft Daniel Desktop - Portuguese (Brazil)",lang:"pt-BR"},{name:"Microsoft Pavel Desktop - Russian (Russia)",lang:"ru-RU"},{name:"Microsoft Kangkang Desktop - Chinese (Simplified, PRC)",lang:"zh-CN"},{name:"Microsoft Danny Desktop - Chinese (Traditional, Hong Kong S.A.R.)",
    lang:"zh-HK"},{name:"Microsoft Yating Desktop - Chinese (Traditional, Taiwan)",lang:"zh-TW"},{name:"Microsoft Zhiwei Desktop - Chinese (Traditional, Taiwan)",lang:"zh-TW"},{name:"Martin",lang:"de-DE"},{name:"Daniel",lang:"fr-FR"},{name:"Hattori",lang:"ja-JP"},{name:"Li-mu",lang:"zh-CN"},{name:"Gordon",lang:"en-AU"},{name:"Aaron",lang:"en-US"},{name:"Nicky",lang:"en-US"},{name:"Microsoft Hanhan Desktop - Chinese (Taiwan)",lang:"zh-TW"},{name:"Microsoft Heami Desktop - Korean",lang:"ko-KR"},{name:"Fallback Australian Male",
    lang:"en-AU",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Russian Male",lang:"ru",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Arabic Male",lang:"ar",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Chinese",lang:"zh-CN",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Chinese HK",lang:"zh-HK",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Chinese TW",lang:"zh-TW",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback French Male",
    lang:"fr",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Deutsch Male",lang:"de",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Hindi Male",lang:"hi",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Indonesian Male",lang:"id",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Japanese Male",lang:"ja",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Korean Male",lang:"ko",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Polish Male",
    lang:"pl",fallbackvoice:!0,service:"g1",gender:"male"},{name:"Fallback Brazilian Portuguese Male",lang:"pt-BR",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Portuguese Male",lang:"pt-PT",fallbackvoice:!0,service:"g1",gender:"male"},{name:"Fallback Spanish Male",lang:"es",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Spanish (Latin American) Male",lang:"es-419",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Thai Male",lang:"th",fallbackvoice:!0,service:"g3",
    gender:"male"},{name:"Fallback Turkish Male",lang:"tr",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Vietnamese Female",lang:"vi",fallbackvoice:!0,service:"g1",gender:"female"},{name:"Fallback Italian Male",lang:"it",fallbackvoice:!0,service:"g3",gender:"male"},{name:"Fallback Dutch Male",lang:"nl",fallbackvoice:!0,timerSpeed:0,service:"g3",gender:"male"},{name:"Microsoft Anna - English (United States)",lang:"en-US",gender:"female"},{name:"Microsoft Lili - Chinese (China)",lang:"zh-CN",
    gender:"female"}];a.iOS=/(iPad|iPhone|iPod)/g.test(navigator.userAgent);a.iOS9=/(iphone|ipod|ipad).* os 9_/.test(navigator.userAgent.toLowerCase());a.iOS10=/(iphone|ipod|ipad).* os 10_/.test(navigator.userAgent.toLowerCase());a.iOS11=/(iphone|ipod|ipad).* os 11_/.test(navigator.userAgent.toLowerCase());a.iOS9plus=/(iphone|ipod|ipad).* os 10_/.test(navigator.userAgent.toLowerCase())||/(iphone|ipod|ipad).* os 10_/.test(navigator.userAgent.toLowerCase());a.iOS12_0=/(iphone|ipod|ipad).* os 12_0/.test(navigator.userAgent.toLowerCase());
    a.iOS12=/(iphone|ipod|ipad).* os 12_/.test(navigator.userAgent.toLowerCase());a.is_chrome=-1<navigator.userAgent.indexOf("Chrome");a.is_safari=-1<navigator.userAgent.indexOf("Safari");a.is_chrome&&a.is_safari&&(a.is_safari=!1);a.is_opera=!!window.opera||0<=navigator.userAgent.indexOf(" OPR/");a.is_android=-1<navigator.userAgent.toLowerCase().indexOf("android");a.iOS_initialized=!1;a.iOS9_initialized=!1;a.iOS10_initialized=!1;a.iOS11_initialized=!1;a.cache_ios_voices=[{name:"he-IL",voiceURI:"he-IL",
    lang:"he-IL"},{name:"th-TH",voiceURI:"th-TH",lang:"th-TH"},{name:"pt-BR",voiceURI:"pt-BR",lang:"pt-BR"},{name:"sk-SK",voiceURI:"sk-SK",lang:"sk-SK"},{name:"fr-CA",voiceURI:"fr-CA",lang:"fr-CA"},{name:"ro-RO",voiceURI:"ro-RO",lang:"ro-RO"},{name:"no-NO",voiceURI:"no-NO",lang:"no-NO"},{name:"fi-FI",voiceURI:"fi-FI",lang:"fi-FI"},{name:"pl-PL",voiceURI:"pl-PL",lang:"pl-PL"},{name:"de-DE",voiceURI:"de-DE",lang:"de-DE"},{name:"nl-NL",voiceURI:"nl-NL",lang:"nl-NL"},{name:"id-ID",voiceURI:"id-ID",lang:"id-ID"},
    {name:"tr-TR",voiceURI:"tr-TR",lang:"tr-TR"},{name:"it-IT",voiceURI:"it-IT",lang:"it-IT"},{name:"pt-PT",voiceURI:"pt-PT",lang:"pt-PT"},{name:"fr-FR",voiceURI:"fr-FR",lang:"fr-FR"},{name:"ru-RU",voiceURI:"ru-RU",lang:"ru-RU"},{name:"es-MX",voiceURI:"es-MX",lang:"es-MX"},{name:"zh-HK",voiceURI:"zh-HK",lang:"zh-HK"},{name:"sv-SE",voiceURI:"sv-SE",lang:"sv-SE"},{name:"hu-HU",voiceURI:"hu-HU",lang:"hu-HU"},{name:"zh-TW",voiceURI:"zh-TW",lang:"zh-TW"},{name:"es-ES",voiceURI:"es-ES",lang:"es-ES"},{name:"zh-CN",
    voiceURI:"zh-CN",lang:"zh-CN"},{name:"nl-BE",voiceURI:"nl-BE",lang:"nl-BE"},{name:"en-GB",voiceURI:"en-GB",lang:"en-GB"},{name:"ar-SA",voiceURI:"ar-SA",lang:"ar-SA"},{name:"ko-KR",voiceURI:"ko-KR",lang:"ko-KR"},{name:"cs-CZ",voiceURI:"cs-CZ",lang:"cs-CZ"},{name:"en-ZA",voiceURI:"en-ZA",lang:"en-ZA"},{name:"en-AU",voiceURI:"en-AU",lang:"en-AU"},{name:"da-DK",voiceURI:"da-DK",lang:"da-DK"},{name:"en-US",voiceURI:"en-US",lang:"en-US"},{name:"en-IE",voiceURI:"en-IE",lang:"en-IE"},{name:"hi-IN",voiceURI:"hi-IN",
    lang:"hi-IN"},{name:"el-GR",voiceURI:"el-GR",lang:"el-GR"},{name:"ja-JP",voiceURI:"ja-JP",lang:"ja-JP"}];a.cache_ios9_voices=[{name:"Maged",voiceURI:"com.apple.ttsbundle.Maged-compact",lang:"ar-SA",localService:!0,"default":!0},{name:"Zuzana",voiceURI:"com.apple.ttsbundle.Zuzana-compact",lang:"cs-CZ",localService:!0,"default":!0},{name:"Sara",voiceURI:"com.apple.ttsbundle.Sara-compact",lang:"da-DK",localService:!0,"default":!0},{name:"Anna",voiceURI:"com.apple.ttsbundle.Anna-compact",lang:"de-DE",
    localService:!0,"default":!0},{name:"Melina",voiceURI:"com.apple.ttsbundle.Melina-compact",lang:"el-GR",localService:!0,"default":!0},{name:"Karen",voiceURI:"com.apple.ttsbundle.Karen-compact",lang:"en-AU",localService:!0,"default":!0},{name:"Daniel",voiceURI:"com.apple.ttsbundle.Daniel-compact",lang:"en-GB",localService:!0,"default":!0},{name:"Moira",voiceURI:"com.apple.ttsbundle.Moira-compact",lang:"en-IE",localService:!0,"default":!0},{name:"Samantha (Enhanced)",voiceURI:"com.apple.ttsbundle.Samantha-premium",
    lang:"en-US",localService:!0,"default":!0},{name:"Samantha",voiceURI:"com.apple.ttsbundle.Samantha-compact",lang:"en-US",localService:!0,"default":!0},{name:"Tessa",voiceURI:"com.apple.ttsbundle.Tessa-compact",lang:"en-ZA",localService:!0,"default":!0},{name:"Monica",voiceURI:"com.apple.ttsbundle.Monica-compact",lang:"es-ES",localService:!0,"default":!0},{name:"Paulina",voiceURI:"com.apple.ttsbundle.Paulina-compact",lang:"es-MX",localService:!0,"default":!0},{name:"Satu",voiceURI:"com.apple.ttsbundle.Satu-compact",
    lang:"fi-FI",localService:!0,"default":!0},{name:"Amelie",voiceURI:"com.apple.ttsbundle.Amelie-compact",lang:"fr-CA",localService:!0,"default":!0},{name:"Thomas",voiceURI:"com.apple.ttsbundle.Thomas-compact",lang:"fr-FR",localService:!0,"default":!0},{name:"Carmit",voiceURI:"com.apple.ttsbundle.Carmit-compact",lang:"he-IL",localService:!0,"default":!0},{name:"Lekha",voiceURI:"com.apple.ttsbundle.Lekha-compact",lang:"hi-IN",localService:!0,"default":!0},{name:"Mariska",voiceURI:"com.apple.ttsbundle.Mariska-compact",
    lang:"hu-HU",localService:!0,"default":!0},{name:"Damayanti",voiceURI:"com.apple.ttsbundle.Damayanti-compact",lang:"id-ID",localService:!0,"default":!0},{name:"Alice",voiceURI:"com.apple.ttsbundle.Alice-compact",lang:"it-IT",localService:!0,"default":!0},{name:"Kyoko",voiceURI:"com.apple.ttsbundle.Kyoko-compact",lang:"ja-JP",localService:!0,"default":!0},{name:"Yuna",voiceURI:"com.apple.ttsbundle.Yuna-compact",lang:"ko-KR",localService:!0,"default":!0},{name:"Ellen",voiceURI:"com.apple.ttsbundle.Ellen-compact",
    lang:"nl-BE",localService:!0,"default":!0},{name:"Xander",voiceURI:"com.apple.ttsbundle.Xander-compact",lang:"nl-NL",localService:!0,"default":!0},{name:"Nora",voiceURI:"com.apple.ttsbundle.Nora-compact",lang:"no-NO",localService:!0,"default":!0},{name:"Zosia",voiceURI:"com.apple.ttsbundle.Zosia-compact",lang:"pl-PL",localService:!0,"default":!0},{name:"Luciana",voiceURI:"com.apple.ttsbundle.Luciana-compact",lang:"pt-BR",localService:!0,"default":!0},{name:"Joana",voiceURI:"com.apple.ttsbundle.Joana-compact",
    lang:"pt-PT",localService:!0,"default":!0},{name:"Ioana",voiceURI:"com.apple.ttsbundle.Ioana-compact",lang:"ro-RO",localService:!0,"default":!0},{name:"Milena",voiceURI:"com.apple.ttsbundle.Milena-compact",lang:"ru-RU",localService:!0,"default":!0},{name:"Laura",voiceURI:"com.apple.ttsbundle.Laura-compact",lang:"sk-SK",localService:!0,"default":!0},{name:"Alva",voiceURI:"com.apple.ttsbundle.Alva-compact",lang:"sv-SE",localService:!0,"default":!0},{name:"Kanya",voiceURI:"com.apple.ttsbundle.Kanya-compact",
    lang:"th-TH",localService:!0,"default":!0},{name:"Yelda",voiceURI:"com.apple.ttsbundle.Yelda-compact",lang:"tr-TR",localService:!0,"default":!0},{name:"Ting-Ting",voiceURI:"com.apple.ttsbundle.Ting-Ting-compact",lang:"zh-CN",localService:!0,"default":!0},{name:"Sin-Ji",voiceURI:"com.apple.ttsbundle.Sin-Ji-compact",lang:"zh-HK",localService:!0,"default":!0},{name:"Mei-Jia",voiceURI:"com.apple.ttsbundle.Mei-Jia-compact",lang:"zh-TW",localService:!0,"default":!0}];a.cache_ios10_voices=[{name:"Maged",
    voiceURI:"com.apple.ttsbundle.Maged-compact",lang:"ar-SA"},{name:"Zuzana",voiceURI:"com.apple.ttsbundle.Zuzana-compact",lang:"cs-CZ"},{name:"Sara",voiceURI:"com.apple.ttsbundle.Sara-compact",lang:"da-DK"},{name:"Anna",voiceURI:"com.apple.ttsbundle.Anna-compact",lang:"de-DE"},{name:"Helena",voiceURI:"com.apple.ttsbundle.siri_female_de-DE_compact",lang:"de-DE"},{name:"Martin",voiceURI:"com.apple.ttsbundle.siri_male_de-DE_compact",lang:"de-DE"},{name:"Nikos (Enhanced)",voiceURI:"com.apple.ttsbundle.Nikos-premium",
    lang:"el-GR"},{name:"Melina",voiceURI:"com.apple.ttsbundle.Melina-compact",lang:"el-GR"},{name:"Nikos",voiceURI:"com.apple.ttsbundle.Nikos-compact",lang:"el-GR"},{name:"Catherine",voiceURI:"com.apple.ttsbundle.siri_female_en-AU_compact",lang:"en-AU"},{name:"Gordon",voiceURI:"com.apple.ttsbundle.siri_male_en-AU_compact",lang:"en-AU"},{name:"Karen",voiceURI:"com.apple.ttsbundle.Karen-compact",lang:"en-AU"},{name:"Daniel (Enhanced)",voiceURI:"com.apple.ttsbundle.Daniel-premium",lang:"en-GB"},{name:"Arthur",
    voiceURI:"com.apple.ttsbundle.siri_male_en-GB_compact",lang:"en-GB"},{name:"Daniel",voiceURI:"com.apple.ttsbundle.Daniel-compact",lang:"en-GB"},{name:"Martha",voiceURI:"com.apple.ttsbundle.siri_female_en-GB_compact",lang:"en-GB"},{name:"Moira",voiceURI:"com.apple.ttsbundle.Moira-compact",lang:"en-IE"},{name:"Nicky (Enhanced)",voiceURI:"com.apple.ttsbundle.siri_female_en-US_premium",lang:"en-US"},{name:"Samantha (Enhanced)",voiceURI:"com.apple.ttsbundle.Samantha-premium",lang:"en-US"},{name:"Aaron",
    voiceURI:"com.apple.ttsbundle.siri_male_en-US_compact",lang:"en-US"},{name:"Fred",voiceURI:"com.apple.speech.synthesis.voice.Fred",lang:"en-US"},{name:"Nicky",voiceURI:"com.apple.ttsbundle.siri_female_en-US_compact",lang:"en-US"},{name:"Samantha",voiceURI:"com.apple.ttsbundle.Samantha-compact",lang:"en-US"},{name:"Tessa",voiceURI:"com.apple.ttsbundle.Tessa-compact",lang:"en-ZA"},{name:"Monica",voiceURI:"com.apple.ttsbundle.Monica-compact",lang:"es-ES"},{name:"Paulina",voiceURI:"com.apple.ttsbundle.Paulina-compact",
    lang:"es-MX"},{name:"Satu",voiceURI:"com.apple.ttsbundle.Satu-compact",lang:"fi-FI"},{name:"Amelie",voiceURI:"com.apple.ttsbundle.Amelie-compact",lang:"fr-CA"},{name:"Daniel",voiceURI:"com.apple.ttsbundle.siri_male_fr-FR_compact",lang:"fr-FR"},{name:"Marie",voiceURI:"com.apple.ttsbundle.siri_female_fr-FR_compact",lang:"fr-FR"},{name:"Thomas",voiceURI:"com.apple.ttsbundle.Thomas-compact",lang:"fr-FR"},{name:"Carmit",voiceURI:"com.apple.ttsbundle.Carmit-compact",lang:"he-IL"},{name:"Lekha",voiceURI:"com.apple.ttsbundle.Lekha-compact",
    lang:"hi-IN"},{name:"Mariska",voiceURI:"com.apple.ttsbundle.Mariska-compact",lang:"hu-HU"},{name:"Damayanti",voiceURI:"com.apple.ttsbundle.Damayanti-compact",lang:"id-ID"},{name:"Alice",voiceURI:"com.apple.ttsbundle.Alice-compact",lang:"it-IT"},{name:"Hattori",voiceURI:"com.apple.ttsbundle.siri_male_ja-JP_compact",lang:"ja-JP"},{name:"Kyoko",voiceURI:"com.apple.ttsbundle.Kyoko-compact",lang:"ja-JP"},{name:"O-ren",voiceURI:"com.apple.ttsbundle.siri_female_ja-JP_compact",lang:"ja-JP"},{name:"Yuna",
    voiceURI:"com.apple.ttsbundle.Yuna-compact",lang:"ko-KR"},{name:"Ellen",voiceURI:"com.apple.ttsbundle.Ellen-compact",lang:"nl-BE"},{name:"Xander",voiceURI:"com.apple.ttsbundle.Xander-compact",lang:"nl-NL"},{name:"Nora",voiceURI:"com.apple.ttsbundle.Nora-compact",lang:"no-NO"},{name:"Zosia",voiceURI:"com.apple.ttsbundle.Zosia-compact",lang:"pl-PL"},{name:"Luciana",voiceURI:"com.apple.ttsbundle.Luciana-compact",lang:"pt-BR"},{name:"Joana",voiceURI:"com.apple.ttsbundle.Joana-compact",lang:"pt-PT"},{name:"Ioana",
    voiceURI:"com.apple.ttsbundle.Ioana-compact",lang:"ro-RO"},{name:"Milena",voiceURI:"com.apple.ttsbundle.Milena-compact",lang:"ru-RU"},{name:"Laura",voiceURI:"com.apple.ttsbundle.Laura-compact",lang:"sk-SK"},{name:"Alva",voiceURI:"com.apple.ttsbundle.Alva-compact",lang:"sv-SE"},{name:"Kanya",voiceURI:"com.apple.ttsbundle.Kanya-compact",lang:"th-TH"},{name:"Yelda",voiceURI:"com.apple.ttsbundle.Yelda-compact",lang:"tr-TR"},{name:"Li-mu",voiceURI:"com.apple.ttsbundle.siri_male_zh-CN_compact",lang:"zh-CN"},
    {name:"Ting-Ting",voiceURI:"com.apple.ttsbundle.Ting-Ting-compact",lang:"zh-CN"},{name:"Yu-shu",voiceURI:"com.apple.ttsbundle.siri_female_zh-CN_compact",lang:"zh-CN"},{name:"Sin-Ji",voiceURI:"com.apple.ttsbundle.Sin-Ji-compact",lang:"zh-HK"},{name:"Mei-Jia",voiceURI:"com.apple.ttsbundle.Mei-Jia-compact",lang:"zh-TW"}];a.cache_ios11_voices=[{name:"Maged",voiceURI:"com.apple.ttsbundle.Maged-compact",lang:"ar-SA"},{name:"Zuzana",voiceURI:"com.apple.ttsbundle.Zuzana-compact",lang:"cs-CZ"},{name:"Sara",
    voiceURI:"com.apple.ttsbundle.Sara-compact",lang:"da-DK"},{name:"Anna",voiceURI:"com.apple.ttsbundle.Anna-compact",lang:"de-DE"},{name:"Helena",voiceURI:"com.apple.ttsbundle.siri_female_de-DE_compact",lang:"de-DE"},{name:"Martin",voiceURI:"com.apple.ttsbundle.siri_male_de-DE_compact",lang:"de-DE"},{name:"Melina",voiceURI:"com.apple.ttsbundle.Melina-compact",lang:"el-GR"},{name:"Catherine",voiceURI:"com.apple.ttsbundle.siri_female_en-AU_compact",lang:"en-AU"},{name:"Gordon",voiceURI:"com.apple.ttsbundle.siri_male_en-AU_compact",
    lang:"en-AU"},{name:"Karen",voiceURI:"com.apple.ttsbundle.Karen-compact",lang:"en-AU"},{name:"Arthur",voiceURI:"com.apple.ttsbundle.siri_male_en-GB_compact",lang:"en-GB"},{name:"Daniel",voiceURI:"com.apple.ttsbundle.Daniel-compact",lang:"en-GB"},{name:"Martha",voiceURI:"com.apple.ttsbundle.siri_female_en-GB_compact",lang:"en-GB"},{name:"Moira",voiceURI:"com.apple.ttsbundle.Moira-compact",lang:"en-IE"},{name:"Aaron",voiceURI:"com.apple.ttsbundle.siri_male_en-US_compact",lang:"en-US"},{name:"Fred",
    voiceURI:"com.apple.speech.synthesis.voice.Fred",lang:"en-US"},{name:"Nicky",voiceURI:"com.apple.ttsbundle.siri_female_en-US_compact",lang:"en-US"},{name:"Samantha",voiceURI:"com.apple.ttsbundle.Samantha-compact",lang:"en-US"},{name:"Tessa",voiceURI:"com.apple.ttsbundle.Tessa-compact",lang:"en-ZA"},{name:"Monica",voiceURI:"com.apple.ttsbundle.Monica-compact",lang:"es-ES"},{name:"Paulina",voiceURI:"com.apple.ttsbundle.Paulina-compact",lang:"es-MX"},{name:"Satu",voiceURI:"com.apple.ttsbundle.Satu-compact",
    lang:"fi-FI"},{name:"Amelie",voiceURI:"com.apple.ttsbundle.Amelie-compact",lang:"fr-CA"},{name:"Daniel",voiceURI:"com.apple.ttsbundle.siri_male_fr-FR_compact",lang:"fr-FR"},{name:"Marie",voiceURI:"com.apple.ttsbundle.siri_female_fr-FR_compact",lang:"fr-FR"},{name:"Thomas",voiceURI:"com.apple.ttsbundle.Thomas-compact",lang:"fr-FR"},{name:"Carmit",voiceURI:"com.apple.ttsbundle.Carmit-compact",lang:"he-IL"},{name:"Lekha",voiceURI:"com.apple.ttsbundle.Lekha-compact",lang:"hi-IN"},{name:"Mariska",voiceURI:"com.apple.ttsbundle.Mariska-compact",
    lang:"hu-HU"},{name:"Damayanti",voiceURI:"com.apple.ttsbundle.Damayanti-compact",lang:"id-ID"},{name:"Alice",voiceURI:"com.apple.ttsbundle.Alice-compact",lang:"it-IT"},{name:"Hattori",voiceURI:"com.apple.ttsbundle.siri_male_ja-JP_compact",lang:"ja-JP"},{name:"Kyoko",voiceURI:"com.apple.ttsbundle.Kyoko-compact",lang:"ja-JP"},{name:"O-ren",voiceURI:"com.apple.ttsbundle.siri_female_ja-JP_compact",lang:"ja-JP"},{name:"Yuna",voiceURI:"com.apple.ttsbundle.Yuna-compact",lang:"ko-KR"},{name:"Ellen",voiceURI:"com.apple.ttsbundle.Ellen-compact",
    lang:"nl-BE"},{name:"Xander",voiceURI:"com.apple.ttsbundle.Xander-compact",lang:"nl-NL"},{name:"Nora",voiceURI:"com.apple.ttsbundle.Nora-compact",lang:"no-NO"},{name:"Zosia",voiceURI:"com.apple.ttsbundle.Zosia-compact",lang:"pl-PL"},{name:"Luciana",voiceURI:"com.apple.ttsbundle.Luciana-compact",lang:"pt-BR"},{name:"Joana",voiceURI:"com.apple.ttsbundle.Joana-compact",lang:"pt-PT"},{name:"Ioana",voiceURI:"com.apple.ttsbundle.Ioana-compact",lang:"ro-RO"},{name:"Milena",voiceURI:"com.apple.ttsbundle.Milena-compact",
    lang:"ru-RU"},{name:"Laura",voiceURI:"com.apple.ttsbundle.Laura-compact",lang:"sk-SK"},{name:"Alva",voiceURI:"com.apple.ttsbundle.Alva-compact",lang:"sv-SE"},{name:"Kanya",voiceURI:"com.apple.ttsbundle.Kanya-compact",lang:"th-TH"},{name:"Yelda",voiceURI:"com.apple.ttsbundle.Yelda-compact",lang:"tr-TR"},{name:"Li-mu",voiceURI:"com.apple.ttsbundle.siri_male_zh-CN_compact",lang:"zh-CN"},{name:"Ting-Ting",voiceURI:"com.apple.ttsbundle.Ting-Ting-compact",lang:"zh-CN"},{name:"Yu-shu",voiceURI:"com.apple.ttsbundle.siri_female_zh-CN_compact",
    lang:"zh-CN"},{name:"Sin-Ji",voiceURI:"com.apple.ttsbundle.Sin-Ji-compact",lang:"zh-HK"},{name:"Mei-Jia",voiceURI:"com.apple.ttsbundle.Mei-Jia-compact",lang:"zh-TW"}];a.systemvoices=null;a.CHARACTER_LIMIT=100;a.VOICESUPPORT_ATTEMPTLIMIT=5;a.voicesupport_attempts=0;a.fallbackMode=!1;a.WORDS_PER_MINUTE=130;a.fallback_audio=null;a.fallback_playbackrate=1;a.def_fallback_playbackrate=a.fallback_playbackrate;a.fallback_audiopool=[];a.msgparameters=null;a.timeoutId=null;a.OnLoad_callbacks=[];a.useTimer=
    !1;a.utterances=[];a.userInteractionEvents=["mousedown","mouseup","mousewheel","keydown"];a.fallbackBufferLength=5;a.tstCompiled=function(a){return eval("typeof xy === 'undefined'")};a.fallbackServicePath="https://code.responsivevoice.org/"+(a.tstCompiled()?"":"develop/")+"getvoice.php";a.default_rv=a.responsivevoices[0];a.debug=!1;a.rvsMapped=!1;a.forcedFallbackMode=!1;a.speechAllowedByUser=!0;a.log=function(b){a.debug&&console.log(b)};a.init=function(){a.is_android&&(a.useTimer=!0);a.is_opera||
    "undefined"===typeof speechSynthesis?(console.log("RV: Voice synthesis not supported"),a.enableFallbackMode()):setTimeout(function(){var b=setInterval(function(){var c=window.speechSynthesis.getVoices();0!=c.length||null!=a.systemvoices&&0!=a.systemvoices.length?(console.log("RV: Voice support ready"),a.systemVoicesReady(c),clearInterval(b)):(console.log("Voice support NOT ready"),a.voicesupport_attempts++,a.voicesupport_attempts>a.VOICESUPPORT_ATTEMPTLIMIT&&(clearInterval(b),null!=window.speechSynthesis?
    a.iOS?(a.iOS11?a.systemVoicesReady(a.cache_ios11_voices):a.iOS10?a.systemVoicesReady(a.cache_ios10_voices):a.iOS9?a.systemVoicesReady(a.cache_ios9_voices):a.systemVoicesReady(a.cache_ios_voices),console.log("RV: Voice support ready (cached)")):(console.log("RV: speechSynthesis present but no system voices found"),a.enableFallbackMode()):a.enableFallbackMode()))},100)},100);(a.iOS||a.is_android||a.is_safari)&&a.enableWindowClickHook();a.Dispatch("OnLoad")};a.systemVoicesReady=function(b){a.systemvoices=
    b;a.mapRVs();null!=a.OnVoiceReady&&a.OnVoiceReady.call();a.Dispatch("OnReady");window.hasOwnProperty("dispatchEvent")&&window.dispatchEvent(new Event("ResponsiveVoice_OnReady"))};a.enableFallbackMode=function(){a.fallbackMode=!0;a.forcedFallbackMode=!0;console.log("RV: Enabling fallback mode");a.mapRVs();null!=a.OnVoiceReady&&a.OnVoiceReady.call();a.Dispatch("OnReady");window.hasOwnProperty("dispatchEvent")&&window.dispatchEvent(new Event("ResponsiveVoice_OnReady"));a.Dispatch("OnServiceSwitched")};
    a.getVoices=function(){for(var b=[],c=0;c<a.responsivevoices.length;c++)b.push({name:a.responsivevoices[c].name});return b};a.speak=function(b,c,d){if(a.rvsMapped){var h=null;if(a.isPlaying())a.log("Cancelling previous speech"),a.cancel(),setTimeout(function(){a.speak(b,c,d)},50);else{b=b.replace(/["`]/gm,"'");a.msgparameters=d||{};a.msgtext=b;a.msgvoicename=c;a.onstartFired=!1;var k=[];if(b.length>a.CHARACTER_LIMIT){for(var f=b=p(b);f.length>a.CHARACTER_LIMIT;){var g=f.search(/([:!\u00a1?\u00bf;\(\)\[\]\u2014\u00ab\u00bb\n]+|\.[^0-9]+)/),
    e="";if(-1==g||g>=a.CHARACTER_LIMIT)g=f.search(/,[^0-9]+/);if(-1==g||g>=a.CHARACTER_LIMIT){var l=f.split(" ");for(g=0;g<l.length;g++){if(e.length+l[g].length+1>a.CHARACTER_LIMIT){l[g].length>=a.CHARACTER_LIMIT&&(e+=l[g].substr(0,a.CHARACTER_LIMIT-e.length-1));break}e+=(0!=g?" ":"")+l[g]}}else e=f.substr(0,g+1);f=f.substr(e.length,f.length-e.length);k.push(e)}0<f.length&&k.push(f)}else k.push(b);console.log(k);a.multipartText=k;null==c?(g=a.default_rv,a.setDefaultVoice(g.name)):g=a.getResponsiveVoice(c);
    !0===g.deprecated&&console.warn("ResponsiveVoice: Voice "+g.name+" is deprecated and will be removed in future releases");f={};if(null!=g.mappedProfile)f=g.mappedProfile;else if(f.systemvoice=a.getMatchedVoice(g),f.collectionvoice={},null==f.systemvoice){console.log("RV: ERROR: No voice found for: "+c);return}if(a.checkSpeechAllowed()){a.fallbackMode&&0<a.fallback_audiopool.length&&a.clearFallbackPool();a.msgprofile=f;a.log("Voice picked: "+a.msgprofile.systemvoice.name);a.utterances=[];a.fallbackChunks=
    [];for(g=0;g<k.length;g++)if(!a.fallbackMode&&a.getServiceEnabled(a.services.NATIVE_TTS))a.log("Using SpeechSynthesis"),h=a.services.NATIVE_TTS,e=new SpeechSynthesisUtterance,e.voiceURI=f.systemvoice.voiceURI,e.volume=a.selectBest([f.collectionvoice.volume,f.systemvoice.volume,1]),e.rate=a.selectBest([a.iOS9plus?1:null,f.collectionvoice.rate,f.systemvoice.rate,1]),e.pitch=a.selectBest([f.collectionvoice.pitch,f.systemvoice.pitch,1]),e.text=k[g],e.lang=a.selectBest([f.collectionvoice.lang,f.systemvoice.lang]),
    e.rvIndex=g,e.rvTotal=k.length,0==g&&(e.onstart=a.speech_onstart),a.msgparameters.onendcalled=!1,null!=d?(e.voice="undefined"!==typeof d.voice?d.voice:f.systemvoice,g<k.length-1&&1<k.length?(e.onend=a.onPartEnd,e.hasOwnProperty("addEventListener")&&e.addEventListener("end",a.onPartEnd)):(e.onend=a.speech_onend,e.hasOwnProperty("addEventListener")&&e.addEventListener("end",a.speech_onend)),e.onerror=d.onerror||function(b){a.log("RV: Unknow Error");a.log(b)},d.rate=a.validateParameters(d,"rate"),d.pitch=
    a.validateParameters(d,"pitch"),d.volume=a.validateParameters(d,"volume"),e.onpause=d.onpause,e.onresume=d.onresume,e.onmark=d.onmark,e.onboundary=d.onboundary||a.onboundary,e.pitch=null!=d.pitch?d.pitch:e.pitch,e.rate=a.iOS?(null!=d.rate?d.rate*d.rate:1)*e.rate:(null!=d.rate?d.rate:1)*e.rate,e.volume=null!=d.volume?d.volume:e.volume):(a.log("No Params received for current Utterance"),e.voice=f.systemvoice,e.onend=a.speech_onend,e.onboundary=a.onboundary,e.onerror=function(b){a.log("RV: Unknow Error");
    a.log(b)}),a.utterances.push(e),0==g&&(a.currentMsg=e),console.log(e),a.tts_speak(e);else if(a.fallbackMode&&a.getServiceEnabled(a.services.FALLBACK_AUDIO)){h=a.services.FALLBACK_AUDIO;a.fallback_playbackrate=a.def_fallback_playbackrate;e=a.selectBest([f.collectionvoice.pitch,f.systemvoice.pitch,1]);l=a.selectBest([a.iOS9plus?1:null,f.collectionvoice.rate,f.systemvoice.rate,1]);var m=a.selectBest([f.collectionvoice.volume,f.systemvoice.volume,1]);if(null!=d){e*=null!=d.pitch?d.pitch:1;l*=null!=d.rate?
    d.rate:1;m*=null!=d.volume?d.volume:1;var n=d.extraParams||null}e/=2;l/=2;m*=2;e=Math.min(Math.max(e,0),1);l=Math.min(Math.max(l,0),1);m=Math.min(Math.max(m,0),1);e=a.fallbackServicePath+"?t="+encodeURIComponent(k[g])+"&tl="+(f.collectionvoice.lang||f.systemvoice.lang||"en-US")+"&sv="+(f.collectionvoice.service||f.systemvoice.service||"")+"&vn="+(f.collectionvoice.voicename||f.systemvoice.voicename||"")+"&pitch="+e.toString()+"&rate="+l.toString()+"&vol="+m.toString();void 0!==f.collectionvoice.gender&&
    (e+="&gender="+f.collectionvoice.gender);n&&(e+="&extraParams="+JSON.stringify(n));a.fallbackChunks.push({text:k[g],url:e,audio:null})}a.fallbackMode&&a.getServiceEnabled(a.services.FALLBACK_AUDIO)&&(a.fallbackChunkIndex=0,a.fallback_startPart());a.log("Service used: "+h)}else a.scheduledSpeak={text:b,voicename:c,parameters:d}}}else setTimeout(function(){a.speak(b,c,d)},15)};a.startTimeout=function(b,c){var d=a.msgprofile.collectionvoice.timerSpeed;null==a.msgprofile.collectionvoice.timerSpeed&&(d=
    1);0>=d||(a.timeoutId=setTimeout(c,a.getEstimatedTimeLength(b,d)),a.log("Timeout ID: "+a.timeoutId))};a.checkAndCancelTimeout=function(){null!=a.timeoutId&&(clearTimeout(a.timeoutId),a.timeoutId=null)};a.speech_timedout=function(){a.cancel();a.cancelled=!1;a.speech_onend()};a.speech_onend=function(){a.checkAndCancelTimeout();!0===a.cancelled?a.cancelled=!1:(a.log("on end fired"),null!=a.msgparameters&&null!=a.msgparameters.onend&&1!=a.msgparameters.onendcalled&&(a.log("Speech on end called  -"+a.msgtext),
    a.msgparameters.onendcalled=!0,a.msgparameters.onend()))};a.speech_onstart=function(){if(!a.onstartFired){a.onstartFired=!0;a.log("Speech start");if(a.iOS||a.is_safari||a.useTimer)a.fallbackMode||a.startTimeout(a.msgtext,a.speech_timedout);a.msgparameters.onendcalled=!1;if(null!=a.msgparameters&&null!=a.msgparameters.onstart)a.msgparameters.onstart()}};a.fallback_startPart=function(){0==a.fallbackChunkIndex&&a.speech_onstart();a.fallback_updateChunksBuffer();a.fallback_audio=a.fallbackChunks[a.fallbackChunkIndex].audio;
    null==a.fallback_audio?a.log("RV: Fallback Audio is not available"):(function(){var b=a.fallback_audio;setTimeout(function(){b.playbackRate=a.fallback_playbackrate},50);b.onloadedmetadata=function(){b.playbackRate=a.fallback_playbackrate};if(2<=b.readyState)b.play();else{var c=function(){b.play();b.removeEventListener("canplaythrough",c)};b.addEventListener("canplaythrough",c,!1)}}(),a.fallback_errors&&(a.log("RV: Speech cancelled due to errors"),a.speech_onend()),a.fallback_audio.addEventListener("ended",
    a.fallback_finishPart),a.useTimer&&a.startTimeout(a.multipartText[a.fallbackChunkIndex],a.fallback_finishPart))};a.isFallbackAudioPlaying=function(){var b;for(b=0;b<a.fallback_audiopool.length;b++){var c=a.fallback_audiopool[b];if(!c.paused&&!c.ended&&c.currentTime!=c.duration)return!0}return!1};a.fallback_finishPart=function(b){a.isFallbackAudioPlaying()?(a.checkAndCancelTimeout(),a.timeoutId=setTimeout(a.fallback_finishPart,1E3*(a.fallback_audio.duration-a.fallback_audio.currentTime))):(a.checkAndCancelTimeout(),
    a.fallbackChunkIndex<a.fallbackChunks.length-1?(a.fallbackChunkIndex++,a.fallback_startPart()):a.speech_onend())};a.cancel=function(){a.checkAndCancelTimeout();a.fallbackMode?(null!=a.fallback_audio&&a.fallback_audio.pause(),a.clearFallbackPool()):(a.cancelled=!0,speechSynthesis.cancel())};a.voiceSupport=function(){return"speechSynthesis"in window};a.OnFinishedPlaying=function(b){if(null!=a.msgparameters&&null!=a.msgparameters.onend)a.msgparameters.onend()};a.setDefaultVoice=function(b){if(a.rvsMapped){var c=
    a.getResponsiveVoice(b);null!=c&&(a.default_rv=c)}else setTimeout(function(){a.setDefaultVoice(b)},15)};a.mapRVs=function(){if("object"==typeof navigator){var b,c="anguage";var d=navigator;d=(b=d["l"+c+"s"],b&&b.length?b:(c=d["l"+c]||d["browserL"+c]||d["userL"+c])?[c]:c)}else d=void 0;b=d[0];for(c=0;c<a.responsivevoices.length;c++){d=a.responsivevoices[c];for(var h=0;h<d.voiceIDs.length;h++){var k=a.voicecollection[d.voiceIDs[h]];if(1!=k.fallbackvoice){var f=a.getSystemVoice(k.name);a.forcedFallbackMode&&
    (f=null);a.iOS12_0&&d.lang.toLowerCase()!=b.toLowerCase()&&d.lang.toLowerCase().split("-")[0]!=b.toLowerCase()&&(f=null);if(null!=f){d.mappedProfile={systemvoice:f,collectionvoice:k};break}}else{d.mappedProfile={systemvoice:{},collectionvoice:k};break}}}a.rvsMapped=!0};a.getMatchedVoice=function(b){for(var c=0;c<b.voiceIDs.length;c++){var d=a.getSystemVoice(a.voicecollection[b.voiceIDs[c]].name);if(null!=d)return d}return null};a.getSystemVoice=function(b){var c=String.fromCharCode(160);var d=b.replace(new RegExp("\\s+|"+
    c,"g"),"");if("undefined"===typeof a.systemvoices||null===a.systemvoices)return null;for(var h=0;h<a.systemvoices.length;h++)if(0===a.systemvoices[h].name.localeCompare(b)||0===a.systemvoices[h].name.replace(new RegExp("\\s+|"+c,"g"),"").replace(/ *\([^)]*\) */g,"").localeCompare(d))return a.systemvoices[h];return null};a.getResponsiveVoice=function(b){for(var c=0;c<a.responsivevoices.length;c++)if(a.responsivevoices[c].name==b)return b=a.fallbackMode,a.fallbackMode=!0===a.responsivevoices[c].mappedProfile.collectionvoice.fallbackvoice||
    !0===a.forcedFallbackMode?!0:!1,b!=a.fallbackMode&&(a.mapRVs(),a.Dispatch("OnServiceSwitched")),a.responsivevoices[c];return null};a.Dispatch=function(b){if(a.hasOwnProperty(b+"_callbacks")&&null!=a[b+"_callbacks"]&&0<a[b+"_callbacks"].length){for(var c=a[b+"_callbacks"],d=0;d<c.length;d++)c[d]();return!0}var h=b+"_callbacks_timeout",k=b+"_callbacks_timeoutCount";a.hasOwnProperty(h)||(a[k]=10,a[h]=setInterval(function(){--a[k];(a.Dispatch(b)||0>a[k])&&clearTimeout(a[h])},50));return!1};a.AddEventListener=
    function(b,c){a.hasOwnProperty(b+"_callbacks")||(a[b+"_callbacks"]=[]);a[b+"_callbacks"].push(c)};a.addEventListener=a.AddEventListener;a.RemoveEventListener=function(b,c){a[b+"_callbacks"]&&-1!=a[b+"_callbacks"].indexOf(c)&&a[b+"_callbacks"].splice(a[b+"_callbacks"].indexOf(c),1)};a.clickEvent=function(){a.log("Click event");a.click_event_detected=!0;a.initializePermissions();a.userInteractionEvents.forEach(function(b){window.removeEventListener(b,a.clickEvent,!1)});a.Dispatch("OnClickEvent")};a.initializePermissions=
    function(){if(a.iOS&&!a.iOS_initialized){a.log("Initializing iOS click event");var b=new SpeechSynthesisUtterance(" ");speechSynthesis.speak(b);a.iOS_initialized=!0}a.is_android&&!a.android_initialized&&(a.log("Initializing Android click event"),b=new SpeechSynthesisUtterance(" "),speechSynthesis.speak(b));a.initFallbackPool()};a.isPlaying=function(){return a.fallbackMode?null!=a.fallback_audio&&!a.fallback_audio.ended&&!a.fallback_audio.paused:speechSynthesis.speaking};a.clearFallbackPool=function(){for(var b=
    0;b<a.fallback_audiopool.length;b++)null!=a.fallback_audiopool[b]&&(a.fallback_audiopool[b].pause(),a.fallback_audiopool[b].src="");a.fallback_audiopool_index=0;a.fallbackChunks=[]};a.initFallbackPool=function(){if(!a.fallback_audiopool||0==a.fallback_audiopool.length){for(var b=0;10>b;b++){var c=b,d=document.createElement("AUDIO");d.preload="auto";a.is_android&&(d.src="",d.load(),9==c&&(a.log("Android HTML audio initialized"),a.android_initialized=!0));a.iOS&&(d.src="",d.load(),9==c&&(a.log("iOS HTML audio initialized"),
    a.iOS_initialized=!0));a.fallback_audiopool.push(d)}a.fallback_audiopool_index=0}};a.allowSpeechClicked=function(b){a.allowSpeechDiv.parentNode.removeChild(a.allowSpeechDiv);a.allowSpeechDiv=null;if(a.speechAllowedByUser=b)a.clickEvent(),a.scheduledSpeak&&(a.speak(a.scheduledSpeak.text,a.scheduledSpeak.voicename,a.scheduledSpeak.parameters),a.scheduledSpeak=null);a.Dispatch("OnAllowSpeechClicked")};a.checkSpeechAllowed=function(b){if(0==a.speechAllowedByUser)return!1;if((a.is_android||a.iOS||a.is_safari&&
    (a.fallbackMode||a.forcedFallbackMode))&&!a.click_event_detected){if(a.allowSpeechDiv)return;a.allowSpeechDiv_appearances=null==a.allowSpeechDiv_appearances?1:++a.allowSpeechDiv_appearances;if(2<a.allowSpeechDiv_appearances)return console.log("ResponsiveVoice: Speech not allowed by user"),!1;var c=document.createElement("style");c.innerHTML='.rvNotification{position:fixed;background-color:#fff;text-align:center;font-family:-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:400;line-height:1.5;box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);z-index:10000;width:100vw;left:0;bottom:0;font-size:1rem;padding-bottom:.5em;padding-right:.5em}.rvButtonRow{padding-right:2em;padding-bottom:1em;text-align:right;font-size:medium}.rvButton{cursor:pointer;display:inline-block;margin-left:1em;padding:.8em 2em;border-radius:3px;font-size:small}.rvButtonAllow{border:none;background-color:#2b8cff;color:#fff}.rvButtonDeny{border:1px solid #2b8cff;color:#2b8cff;background-color:#fff}.rvTextRow{padding-top:1em;padding-bottom:2em}@media (min-width:576px){.rvNotification{width:60vw;left:20vw}}@media (min-width:768px){.rvNotification{width:50vw;left:25vw}}@media (min-width:992px){.rvNotification{width:40vw;left:30vw}}@media (min-width:1200px){.rvNotification{width:30vw;left:35vw}}';
    document.body.appendChild(c);a.allowSpeechDiv=document.createElement("div");a.allowSpeechDiv.classList.add("rvNotification");void 0==b&&(b={});a.allowSpeechDiv.innerHTML='<div class="rvTextRow"><strong>'+(void 0!=b.urlOverride?b.urlOverride:window.location.hostname)+"</strong> "+(void 0!=b.textOverride?b.textOverride:"wants to play speech")+'</div><div class="rvButtonRow"><div onclick="responsiveVoice.allowSpeechClicked(false);" class="rvButton rvButtonDeny">DENY</div><div onclick="responsiveVoice.allowSpeechClicked(true);" class="rvButton rvButtonAllow">ALLOW</div></div>';
    document.body.appendChild(a.allowSpeechDiv);return!1}return!0};a.fallback_audioPool_getAudio=function(){a.initFallbackPool();a.fallback_audiopool_index>=a.fallback_audiopool.length&&(a.fallback_audiopool_index=0);return a.fallback_audiopool[a.fallback_audiopool_index++]};a.fallback_updateChunksBuffer=function(){for(var b=a.fallbackChunkIndex;b<Math.min(a.fallbackChunks.length,a.fallbackChunkIndex+a.fallbackBufferLength);b++){var c=a.fallbackChunks[b];null==c.audio&&(c.audio=a.fallback_audioPool_getAudio(),
    c.audio.src=c.url,c.audio.playbackRate=a.fallback_playbackrate,c.audio.preload="auto",c.audio.load())}};a.selectBest=function(a){for(var b=0;b<a.length;b++)if(null!=a[b])return a[b];return null};a.pause=function(){a.fallbackMode?null!=a.fallback_audio&&a.fallback_audio.pause():speechSynthesis.pause()};a.resume=function(){a.fallbackMode?null!=a.fallback_audio&&a.fallback_audio.play():speechSynthesis.resume()};a.tts_speak=function(b){setTimeout(function(){a.cancelled=!1;speechSynthesis.speak(b)},.01)};
    a.setVolume=function(b){if(a.isPlaying())if(a.fallbackMode){for(var c=0;c<a.fallback_audiopool.length;c++)a.fallback_audiopool[c].volume=b;a.fallback_audio.volume=b}else for(c=0;c<a.utterances.length;c++)a.utterances[c].volume=b};a.onPartEnd=function(b){if(null!=a.msgparameters&&null!=a.msgparameters.onchuckend)a.msgparameters.onchuckend();a.Dispatch("OnPartEnd");b=a.utterances.indexOf(b.utterance);a.currentMsg=a.utterances[b+1]};a.onboundary=function(b){a.log("On Boundary");a.iOS&&!a.onstartFired&&
    a.speech_onstart()};a.numToWords=function(b){function c(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}var d=function(){return function(a,b){if(Array.isArray(a))return a;if(Symbol.iterator in Object(a)){var c=[],d=!0,e=!1,f=void 0;try{for(var g=a[Symbol.iterator](),h;!(d=(h=g.next()).done)&&(c.push(h.value),!b||c.length!==b);d=!0);}catch(t){e=!0,f=t}finally{try{if(!d&&g["return"])g["return"]()}finally{if(e)throw f;}}return c}throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }}(),h=function(a){return 0===a.length},k=function(a){return function(b){return b.slice(0,a)}},f=function(a){return function(b){return b.slice(a)}},g=function(a){return a.slice(0).reverse()},e=function(a){return function(b){return function(c){return a(b(c))}}},l=function(a){return!a},m=function r(a){return function(b){return h(b)?[]:[k(a)(b)].concat(c(r(a)(f(a)(b))))}},n=" one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" "),
    q="  twenty thirty forty fifty sixty seventy eighty ninety".split(" "),p=" thousand million billion trillion quadrillion quintillion sextillion septillion octillion nonillion".split(" "),u=function(a){var b=d(a,3);a=b[0];var c=b[1];b=b[2];return[0===(Number(b)||0)?"":n[b]+" hundred ",0===(Number(a)||0)?q[c]:q[c]&&q[c]+" "||"",n[c+a]||n[a]].join("")},v=function(a,b){return""===a?a:a+" "+p[b]};return"number"===typeof b?a.numToWords(String(b)):"0"===b?"zero":e(m(3))(g)(Array.from(b)).map(u).map(v).filter(e(l)(h)).reverse().join(" ").trim()};
    a.getWords=function(b){b=b.replace(/$|\u00a5|\u20a1|\u20ac|\u00a3|\u20aa|\u20b9|\uffe5|\u17db|\u20a9|\u20a6|\u0e3f|\u20b4|\u20ab/gi," dummy currency ");var c=b.split(/(\s*[\s,]\s*|\?|;|:|\.|\(|\)|!)/);c=c.filter(function(a){return/[^\s]/.test(a)});for(var d=0;d<c.length;d++)null!=(b=c[d].toString().match(/\d+/))&&(c.splice(d,1),a.numToWords(+b[0]).split(/\s+/).map(function(a){c.push(a)}));return c};a.getEstimatedTimeLength=function(b,c){var d=a.getWords(b),h=0,k=a.fallbackMode?1300:700;c=c||1;d.map(function(a,
    b){h+=(a.toString().match(/[^ ]/igm)||a).length});var f=d.length,g=60/a.WORDS_PER_MINUTE*c*1E3*f;5>f&&(g=c*(k+50*h));a.log("Estimated time length: "+g+" ms, words: ["+d+"], charsCount: "+h);return g};a.validateParameters=function(a,c){if("undefined"===typeof a[c])return a[c];switch(c){case "rate":case "pitch":case "volume":var b=Number(a[c]);isNaN(b)&&console.warn("ResponsiveVoice: the parameter "+c+' has a wrong value "'+a[c]+'". Defaults were used.');a[c]=isNaN(b)?"1":a[c]}return a[c]};a.services=
    {NATIVE_TTS:0,FALLBACK_AUDIO:1};a.servicesPriority=[0,1];a.servicesEnabled=[];a.setServiceEnabled=function(b,c){a.servicesEnabled[b]=c};a.getServiceEnabled=function(b){return a.servicesEnabled[b]||!1};a.setServiceEnabled(a.services.NATIVE_TTS,!0);a.setServiceEnabled(a.services.FALLBACK_AUDIO,!0);a.forceFallbackMode=function(b){a.forcedFallbackMode=b;a.fallbackMode=b;a.mapRVs();a.Dispatch("OnServiceSwitched")};a.enableWindowClickHook=function(){a.userInteractionEvents.forEach(function(b){window.addEventListener(b,
    a.clickEvent,!1)})};"interactive"===document.readyState?a.init():document.addEventListener("DOMContentLoaded",function(){a.init()})},responsiveVoice=new ResponsiveVoice;
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