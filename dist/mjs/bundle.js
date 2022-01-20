(()=>{"use strict";var e={597:(e,t,i)=>{i.d(t,{Z:()=>a});var s=i(935),o=i.n(s),r=i(715),n=i.n(r)()(o());n.push([e.id,':root{--vbg-theme: white;--vbg-bg: black;--vbg-overlay-opacity: 0.5;--vbg-transition-speed: 0.5s;--vbg-preloader-size: 32px}video-background{width:100%;height:100%;display:block;box-sizing:border-box;position:absolute;z-index:0;top:0;left:0;background:var(--vbg-bg);margin:0;padding:0;overflow:hidden}video-background[status=loading]::after,video-background[status=waiting]::after{content:"";border-radius:50%;position:absolute;top:50%;left:50%;width:var(--vbg-preloader-size, 32px);height:var(--vbg-preloader-size, 32px);margin:calc(0px - var(--vbg-preloader-size)*.5) 0 0 calc(0px - var(--vbg-preloader-size)*.5);border:4px solid var(--vbg-theme);border-top-color:transparent;z-index:2;animation:loader-spin 1s infinite ease}video-background iframe{position:absolute;top:0;left:0;z-index:4;width:100%;height:100%;pointer-events:none}.vbg__controls{z-index:6}.vbg__video,.vbg__poster,.vbg__overlay{position:absolute;width:100%;height:100%;top:0;left:0;display:block;object-fit:cover;object-position:50% 50%;transition:opacity var(--vbg-transition-speed) ease}.vbg__video{z-index:4}.vbg__poster{z-index:3}.vbg__overlay{z-index:5;pointer-events:none;background-color:var(--vbg-bg);opacity:var(--vbg-overlay-opacity)}.vbg--loading{opacity:0}@keyframes loader-spin{100%{transform:rotate(360deg)}}',""]);const a=n},715:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var i="",s=void 0!==t[5];return t[4]&&(i+="@supports (".concat(t[4],") {")),t[2]&&(i+="@media ".concat(t[2]," {")),s&&(i+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),i+=e(t),s&&(i+="}"),t[2]&&(i+="}"),t[4]&&(i+="}"),i})).join("")},t.i=function(e,i,s,o,r){"string"==typeof e&&(e=[[null,e,void 0]]);var n={};if(s)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(n[l]=!0)}for(var u=0;u<e.length;u++){var d=[].concat(e[u]);s&&n[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),i&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=i):d[2]=i),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),t.push(d))}},t}},935:e=>{e.exports=function(e){return e[1]}},878:(e,t)=>{var i=Object.prototype.hasOwnProperty;function s(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(e){return null}}function o(e){try{return encodeURIComponent(e)}catch(e){return null}}t.stringify=function(e,t){t=t||"";var s,r,n=[];for(r in"string"!=typeof t&&(t="?"),e)if(i.call(e,r)){if((s=e[r])||null!=s&&!isNaN(s)||(s=""),r=o(r),s=o(s),null===r||null===s)continue;n.push(r+"="+s)}return n.length?t+n.join("&"):""},t.parse=function(e){for(var t,i=/([^=?#&]+)=?([^&]*)/g,o={};t=i.exec(e);){var r=s(t[1]),n=s(t[2]);null===r||null===n||r in o||(o[r]=n)}return o}},384:e=>{e.exports=function(e,t){if(t=t.split(":")[0],!(e=+e))return!1;switch(t){case"http":case"ws":return 80!==e;case"https":case"wss":return 443!==e;case"ftp":return 21!==e;case"gopher":return 70!==e;case"file":return!1}return 0!==e}},197:e=>{var t=[];function i(e){for(var i=-1,s=0;s<t.length;s++)if(t[s].identifier===e){i=s;break}return i}function s(e,s){for(var r={},n=[],a=0;a<e.length;a++){var l=e[a],u=s.base?l[0]+s.base:l[0],d=r[u]||0,c="".concat(u," ").concat(d);r[u]=d+1;var h=i(c),p={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==h)t[h].references++,t[h].updater(p);else{var g=o(p,s);s.byIndex=a,t.splice(a,0,{identifier:c,updater:g,references:1})}n.push(c)}return n}function o(e,t){var i=t.domAPI(t);i.update(e);return function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;i.update(e=t)}else i.remove()}}e.exports=function(e,o){var r=s(e=e||[],o=o||{});return function(e){e=e||[];for(var n=0;n<r.length;n++){var a=i(r[n]);t[a].references--}for(var l=s(e,o),u=0;u<r.length;u++){var d=i(r[u]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}r=l}}},166:e=>{var t={};e.exports=function(e,i){var s=function(e){if(void 0===t[e]){var i=document.querySelector(e);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(e){i=null}t[e]=i}return t[e]}(e);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(i)}},835:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},469:(e,t,i)=>{e.exports=function(e){var t=i.nc;t&&e.setAttribute("nonce",t)}},131:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(i){!function(e,t,i){var s="";i.supports&&(s+="@supports (".concat(i.supports,") {")),i.media&&(s+="@media ".concat(i.media," {"));var o=void 0!==i.layer;o&&(s+="@layer".concat(i.layer.length>0?" ".concat(i.layer):""," {")),s+=i.css,o&&(s+="}"),i.media&&(s+="}"),i.supports&&(s+="}");var r=i.sourceMap;r&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleTagTransform(s,e,t.options)}(t,e,i)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},911:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},843:(e,t,i)=>{var s=i(384),o=i(878),r=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,n=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,a=/^[a-zA-Z]:/,l=new RegExp("^[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]+");function u(e){return(e||"").toString().replace(l,"")}var d=[["#","hash"],["?","query"],function(e,t){return p(t.protocol)?e.replace(/\\/g,"/"):e},["/","pathname"],["@","auth",1],[NaN,"host",void 0,1,1],[/:(\d+)$/,"port",void 0,1],[NaN,"hostname",void 0,1,1]],c={hash:1,query:1};function h(e){var t,s=("undefined"!=typeof window?window:void 0!==i.g?i.g:"undefined"!=typeof self?self:{}).location||{},o={},n=typeof(e=e||s);if("blob:"===e.protocol)o=new m(unescape(e.pathname),{});else if("string"===n)for(t in o=new m(e,{}),c)delete o[t];else if("object"===n){for(t in e)t in c||(o[t]=e[t]);void 0===o.slashes&&(o.slashes=r.test(e.href))}return o}function p(e){return"file:"===e||"ftp:"===e||"http:"===e||"https:"===e||"ws:"===e||"wss:"===e}function g(e,t){e=u(e),t=t||{};var i,s=n.exec(e),o=s[1]?s[1].toLowerCase():"",r=!!s[2],a=!!s[3],l=0;return r?a?(i=s[2]+s[3]+s[4],l=s[2].length+s[3].length):(i=s[2]+s[4],l=s[2].length):a?(i=s[3]+s[4],l=s[3].length):i=s[4],"file:"===o?l>=2&&(i=i.slice(2)):p(o)?i=s[4]:o?r&&(i=i.slice(2)):l>=2&&p(t.protocol)&&(i=s[4]),{protocol:o,slashes:r||p(o),slashesCount:l,rest:i}}function m(e,t,i){if(e=u(e),!(this instanceof m))return new m(e,t,i);var r,n,l,c,y,f,v=d.slice(),b=typeof t,w=this,E=0;for("object"!==b&&"string"!==b&&(i=t,t=null),i&&"function"!=typeof i&&(i=o.parse),r=!(n=g(e||"",t=h(t))).protocol&&!n.slashes,w.slashes=n.slashes||r&&t.slashes,w.protocol=n.protocol||t.protocol||"",e=n.rest,("file:"===n.protocol&&(2!==n.slashesCount||a.test(e))||!n.slashes&&(n.protocol||n.slashesCount<2||!p(w.protocol)))&&(v[3]=[/(.*)/,"pathname"]);E<v.length;E++)"function"!=typeof(c=v[E])?(l=c[0],f=c[1],l!=l?w[f]=e:"string"==typeof l?~(y=e.indexOf(l))&&("number"==typeof c[2]?(w[f]=e.slice(0,y),e=e.slice(y+c[2])):(w[f]=e.slice(y),e=e.slice(0,y))):(y=l.exec(e))&&(w[f]=y[1],e=e.slice(0,y.index)),w[f]=w[f]||r&&c[3]&&t[f]||"",c[4]&&(w[f]=w[f].toLowerCase())):e=c(e,w);i&&(w.query=i(w.query)),r&&t.slashes&&"/"!==w.pathname.charAt(0)&&(""!==w.pathname||""!==t.pathname)&&(w.pathname=function(e,t){if(""===e)return t;for(var i=(t||"/").split("/").slice(0,-1).concat(e.split("/")),s=i.length,o=i[s-1],r=!1,n=0;s--;)"."===i[s]?i.splice(s,1):".."===i[s]?(i.splice(s,1),n++):n&&(0===s&&(r=!0),i.splice(s,1),n--);return r&&i.unshift(""),"."!==o&&".."!==o||i.push(""),i.join("/")}(w.pathname,t.pathname)),"/"!==w.pathname.charAt(0)&&p(w.protocol)&&(w.pathname="/"+w.pathname),s(w.port,w.protocol)||(w.host=w.hostname,w.port=""),w.username=w.password="",w.auth&&(c=w.auth.split(":"),w.username=c[0],w.password=c[1]||""),w.origin="file:"!==w.protocol&&p(w.protocol)&&w.host?w.protocol+"//"+w.host:"null",w.href=w.toString()}m.prototype={set:function(e,t,i){var r=this;switch(e){case"query":"string"==typeof t&&t.length&&(t=(i||o.parse)(t)),r[e]=t;break;case"port":r[e]=t,s(t,r.protocol)?t&&(r.host=r.hostname+":"+t):(r.host=r.hostname,r[e]="");break;case"hostname":r[e]=t,r.port&&(t+=":"+r.port),r.host=t;break;case"host":r[e]=t,/:\d+$/.test(t)?(t=t.split(":"),r.port=t.pop(),r.hostname=t.join(":")):(r.hostname=t,r.port="");break;case"protocol":r.protocol=t.toLowerCase(),r.slashes=!i;break;case"pathname":case"hash":if(t){var n="pathname"===e?"/":"#";r[e]=t.charAt(0)!==n?n+t:t}else r[e]=t;break;case"username":case"password":r[e]=encodeURIComponent(t);break;case"auth":var a=t.split(":");r.username=a[0],r.password=2===a.length?a[1]:""}for(var l=0;l<d.length;l++){var u=d[l];u[4]&&(r[u[1]]=r[u[1]].toLowerCase())}return r.auth=r.password?r.username+":"+r.password:r.username,r.origin="file:"!==r.protocol&&p(r.protocol)&&r.host?r.protocol+"//"+r.host:"null",r.href=r.toString(),r},toString:function(e){e&&"function"==typeof e||(e=o.stringify);var t,i=this,s=i.protocol;s&&":"!==s.charAt(s.length-1)&&(s+=":");var r=s+(i.protocol&&i.slashes||p(i.protocol)?"//":"");return i.username?(r+=i.username,i.password&&(r+=":"+i.password),r+="@"):i.password&&(r+=":"+i.password,r+="@"),r+=i.host+i.pathname,(t="object"==typeof i.query?e(i.query):i.query)&&(r+="?"!==t.charAt(0)?"?"+t:t),i.hash&&(r+=i.hash),r}},m.extractProtocol=g,m.location=h,m.trimLeft=u,m.qs=o,e.exports=m}},t={};function i(s){var o=t[s];if(void 0!==o)return o.exports;var r=t[s]={id:s,exports:{}};return e[s](r,r.exports,i),r.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=new Blob([new Uint8Array([255,227,24,196,0,0,0,3,72,1,64,0,0,4,132,16,31,227,192,225,76,255,67,12,255,221,27,255,228,97,73,63,255,195,131,69,192,232,223,255,255,207,102,239,255,255,255,101,158,206,70,20,59,255,254,95,70,149,66,4,16,128,0,2,2,32,240,138,255,36,106,183,255,227,24,196,59,11,34,62,80,49,135,40,0,253,29,191,209,200,141,71,7,255,252,152,74,15,130,33,185,6,63,255,252,195,70,203,86,53,15,255,255,247,103,76,121,64,32,47,255,34,227,194,209,138,76,65,77,69,51,46,57,55,170,170,170,170,170,170,170,170,170,170,255,227,24,196,73,13,153,210,100,81,135,56,0,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170])],{type:"audio/mpeg"}),t=new Blob([new Uint8Array([0,0,0,28,102,116,121,112,105,115,111,109,0,0,2,0,105,115,111,109,105,115,111,50,109,112,52,49,0,0,0,8,102,114,101,101,0,0,2,239,109,100,97,116,33,16,5,32,164,27,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,55,167,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,33,16,5,32,164,27,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,55,167,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,0,0,2,194,109,111,111,118,0,0,0,108,109,118,104,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,232,0,0,0,47,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,1,236,116,114,97,107,0,0,0,92,116,107,104,100,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,47,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,101,100,116,115,0,0,0,28,101,108,115,116,0,0,0,0,0,0,0,1,0,0,0,47,0,0,0,0,0,1,0,0,0,0,1,100,109,100,105,97,0,0,0,32,109,100,104,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,172,68,0,0,8,0,85,196,0,0,0,0,0,45,104,100,108,114,0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0,0,0,1,15,109,105,110,102,0,0,0,16,115,109,104,100,0,0,0,0,0,0,0,0,0,0,0,36,100,105,110,102,0,0,0,28,100,114,101,102,0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1,0,0,0,211,115,116,98,108,0,0,0,103,115,116,115,100,0,0,0,0,0,0,0,1,0,0,0,87,109,112,52,97,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,2,0,16,0,0,0,0,172,68,0,0,0,0,0,51,101,115,100,115,0,0,0,0,3,128,128,128,34,0,2,0,4,128,128,128,20,64,21,0,0,0,0,1,244,0,0,1,243,249,5,128,128,128,2,18,16,6,128,128,128,1,2,0,0,0,24,115,116,116,115,0,0,0,0,0,0,0,1,0,0,0,2,0,0,4,0,0,0,0,28,115,116,115,99,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,2,0,0,0,1,0,0,0,28,115,116,115,122,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,115,0,0,1,116,0,0,0,20,115,116,99,111,0,0,0,0,0,0,0,1,0,0,0,44,0,0,0,98,117,100,116,97,0,0,0,90,109,101,116,97,0,0,0,0,0,0,0,33,104,100,108,114,0,0,0,0,0,0,0,0,109,100,105,114,97,112,112,108,0,0,0,0,0,0,0,0,0,0,0,0,45,105,108,115,116,0,0,0,37,169,116,111,111,0,0,0,29,100,97,116,97,0,0,0,1,0,0,0,0,76,97,118,102,53,54,46,52,48,46,49,48,49])],{type:"video/mp4"});function s(e){return Object.assign({muted:!1,timeout:250,inline:!1},e)}function o(e,t){var i=e.muted,s=e.timeout,o=e.inline,r=t(),n=r.element,a=r.source,l=void 0,u=void 0,d=void 0;return n.muted=i,!0===i&&n.setAttribute("muted","muted"),!0===o&&n.setAttribute("playsinline","playsinline"),n.src=a,new Promise((function(e){l=n.play(),u=setTimeout((function(){d(!1,new Error("Timeout "+s+" ms has been reached"))}),s),d=function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;n.remove(),n.srcObject=null,clearTimeout(u),e({result:t,error:i})},void 0!==l?l.then((function(){return d(!0)})).catch((function(e){return d(!1,e)})):d(!0)}))}var r={audio:function(t){return o(t=s(t),(function(){return{element:document.createElement("audio"),source:URL.createObjectURL(e)}}))},video:function(e){return o(e=s(e),(function(){return{element:document.createElement("video"),source:URL.createObjectURL(t)}}))}};const n=r,a="https://youtu.be/xkEmYQvJ_68";i(843);const l={youtube:{parsePath:"query.t",timeRegex:/[hms]/,idRegex:/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/,getDimensions:e=>{let t,i;for(let s in e){let o=e[s];if("object"==typeof o&&o.width&&o.height){t=o.width,i=o.height;break}}return{w:t,h:i}}},vimeo:{parsePath:null,timeRegex:/[#t=s]/,idRegex:/^.*(vimeo\.com\/)(channels\/[a-zA-Z0-9]*\/)?([0-9]{7,}(#t\=.*s)?)/,getDimensions:e=>{let t,i;return e.dimensions?(t=e.dimensions.width,i=e.dimensions.height):e.iframe&&(t=e.iframe.clientWidth,i=e.iframe.clientHeight),{w:t,h:i}}}},u=e=>{let t=e.querySelector("#player");return t||(t=e.ownerDocument.createElement("div"),t.id="player",e.appendChild(t)),t.setAttribute("style","position: absolute; top: 0; bottom: 0; left: 0; right: 0;"),t};let d,c="*",h=null;const p=(e,t)=>{const i={method:e};t&&(i.value=t);const s=JSON.stringify(i);d.ownerDocument.defaultView.eval("(function(playerIframe){ playerIframe.contentWindow.postMessage("+s+", "+JSON.stringify(c)+") })")(d)},g={vimeo:{api:()=>new Promise(((e,t)=>{e("no api needed")})),player:({win:e,instance:t,container:i,videoId:s,startTime:o,readyCallback:r,stateChangeCallback:n})=>new Promise(((a,l)=>{const g=t.logger||function(){};d=e.document.createElement("iframe"),d.id="vimeoplayer";d.src="//player.vimeo.com/video/"+s+"?api=1&background=1";u(i).appendChild(d);const m={iframe:d,setPlaybackRate:()=>{}};a(m);const y=()=>{p("getDuration"),p("getVideoHeight"),p("getVideoWidth")};let f=null;const v=(e=!1)=>{(e||m.dimensions.width&&m.dimensions.height&&m.duration)&&(e&&y(),m.dimensions.width=m.dimensions.width||m.iframe.parentNode.offsetWidth,m.dimensions.height=m.dimensions.height||m.iframe.parentNode.offsetHeight,m.duration=m.duration||10,p("setVolume","0"),p("setLoop","true"),p("seekTo",o),p("addEventListener","playProgress"),r(m))},b=e=>{if(!/^https?:\/\/player.vimeo.com/.test(e.origin))return!1;c=e.origin;let i=e.data;switch("string"==typeof i&&(i=JSON.parse(i)),i.event){case"ready":h&&(clearTimeout(h),h=null),m.dimensions||(m.dimensions={},y(),n("buffering"),f=setTimeout((()=>{g.call(t,"retrying"),v(!0)}),1875));break;case"playProgress":case"timeupdate":f&&(clearTimeout(f),f=null),n("playing",i),p("setVolume","0"),i.data.percent>=.98&&o>0&&p("seekTo",o)}switch(i.method){case"getVideoHeight":g.call(t,i.method),m.dimensions.height=i.value,v();break;case"getVideoWidth":g.call(t,i.method),m.dimensions.width=i.value,v();break;case"getDuration":g.call(t,i.method),m.duration=i.value,o>=m.duration&&(o=0),v()}},w=e=>{b(e)};e.addEventListener("message",w,!1),m.destroy=()=>{e.removeEventListener("message",w),m.iframe.parentElement&&m.iframe.parentElement.removeChild(m.iframe)},h=setTimeout((()=>{l("Ran out of time")}),2500)}))},youtube:{api:e=>new Promise(((t,i)=>{if(e.document.documentElement.querySelector('script[src*="www.youtube.com/iframe_api"].loaded'))return void t("already loaded");const s=e.document.createElement("script");s.src="https://www.youtube.com/iframe_api";const o=e.document.getElementsByTagName("script")[0];o.parentNode.insertBefore(s,o),s.addEventListener("load",(e=>{e.currentTarget.classList.add("loaded"),t("api script tag created and loaded")}),!0),s.addEventListener("error",(e=>{i("Failed to load YouTube script: ",e)}))})),player:({container:e,win:t,videoId:i,startTime:s,speed:o,readyCallback:r,stateChangeCallback:n})=>{let a=u(e);const l=()=>new t.YT.Player(a,{videoId:i,host:"https://www.youtube-nocookie.com",playerVars:{autohide:1,autoplay:0,controls:0,enablejsapi:1,iv_load_policy:3,loop:0,modestbranding:1,muted:!0,playsinline:1,rel:0,showinfo:0,wmode:"opaque"},events:{onReady:function(e){((e,t)=>{const i=e.target;i.iframe=i.getIframe(),i.mute(),i.ready=!0,i.seekTo(t<i.getDuration()?t:0),1==i.shouldPlay?i.playVideo():i.pauseVideo()})(e,s),r(e.target)},onStateChange:function(e){const i=((e,t,i,s=1)=>{const o=e.target,r=(o.getDuration()-t)/s,n=()=>{o.getCurrentTime()+.1>=o.getDuration()&&(o.pauseVideo(),o.seekTo(t),1==o.shouldPlay?o.playVideo():o.pauseVideo()),requestAnimationFrame(n)};return e.data===i.YT.PlayerState.BUFFERING&&1!==o.getVideoLoadedFraction()&&(0===o.getCurrentTime()||o.getCurrentTime()>r- -.1)?"buffering":e.data===i.YT.PlayerState.PLAYING?1==o.shouldPlay?(requestAnimationFrame(n),"playing"):(o.pauseVideo(),"pausing"):void(e.data===i.YT.PlayerState.ENDED&&(1==o.shouldPlay?o.playVideo():o.pauseVideo()))})(e,s,t,o);n(i,i)}}});return new Promise(((e,i)=>{const s=()=>{1===t.YT.loaded?e(l()):setTimeout(s,100)};s()}))}}};class m extends HTMLElement{breakpoints;browserCanAutoPlay;container;debug;observer;canUnmute;muteButton;overlayEl;pauseButton;player;playerReady;isIntersecting;posterEl;scaleFactor;size;startTime;sourceId;sources;sourcesReady;type;url;videoAspectRatio;videoCanAutoPlay;videoEl;widthStore;constructor(){super(),this.sourcesReady=!1,this.container=this,this.browserCanAutoPlay=!1,this.videoCanAutoPlay=!1,this.scaleFactor=1.2,this.videoAspectRatio=.69,this.playerReady=!1,this.isIntersecting=!1,this.canUnmute=!1,this.muted=!0,this.player={ready:!1,shouldPlay:!1,playVideo:()=>{},pauseVideo:()=>{},mute:()=>{}},this.getAttribute("debug")?"verbose"==this.getAttribute("debug")?this.debug={enabled:!0,verbose:!0}:this.debug={enabled:!0,verbose:!1}:this.debug={enabled:!1,verbose:!1},this.logger("Debugging video-background."),this.init()}init(){this.status="waiting",this.compileSources(this.src),this.buildDOM(),this.buildIntersectionObserver(),this.addEventListener("playCheck",this.handlePlayCheck.bind(this))}buildDOM(){this.buildOverlay(),this.buildPoster(),n.video({timeout:1200,muted:!0}).then((({result:e,error:t})=>{0==e?(this.logger("Browser autoplay check failed"),this.handleFallbackNoVideo()):(this.browserCanAutoPlay=!0,this.buildVideo())}))}buildVideo(){if(!this.sourcesReady)return!1;this.logger("Building video based on type: "+this.type),"local"==this.type?this.buildLocalVideo():(this.initializeVideoAPI(),window.addEventListener("resize",this.syncPlayer.bind(this)))}handleFallbackNoVideo(){this.status="fallback",this.logger("Video Won't play, defaulting to fallback"),this.status="fallback"}initializeVideoAPI(){if(this.url&&this.player&&("youtube"==this.type||"vimeo"==this.type))if(this.sourceId=((e=a,t=null)=>{const i=l[t];let s=i&&e.match(i.idRegex);const o="vimeo"===t?s[3]:s[2];if(s&&o.length)return o;console.error(`Video id at ${e} is not valid`)})(this.url,this.type),this.browserCanAutoPlay&&this.sourceId){this.player.ready=!1;(0,g[this.type].api)(window).then((e=>{this.logger(e),this.player&&(this.player.ready=!1),this.initializeVideoPlayer()})).catch((e=>{document.body.classList.add("ready"),this.logger(e)}))}else document.body.classList.add("ready");else this.logger("Problem with initializing video API. Contact the developer",!0)}initializeVideoPlayer(){if(!this.url||!this.player||"youtube"!=this.type&&"vimeo"!=this.type)return void this.logger("Problem with initializing video API. Contact the developer",!0);if(this.player.ready){try{this.player.destroy()}catch(e){}this.player.ready=!1}if("youtube"!=this.type&&"vimeo"!=this.type)return!1;(0,g[this.type].player)({instance:this,container:this,win:window,videoId:this.sourceId,speed:1,startTime:this.startTime,readyCallback:()=>{this.player&&this.player.iframe&&this.player.iframe.classList.add("background-video"),this.videoAspectRatio=((e,t,i)=>{let s,o;if(t){const e=l[i].getDimensions(t);s=e.w,o=e.h}return s&&o||(s=e.clientWidth,o=e.clientHeight,console.warn(`No width and height found in ${i} player ${t}. Using container dimensions.`)),parseInt(s,10)/parseInt(o,10)})(this.container,this.player,this.type),this.syncPlayer();const e=new CustomEvent("ready");this.container.dispatchEvent(e),this.container.dispatchEvent(new CustomEvent("playCheck")),this.playerReady=!0},stateChangeCallback:(e,t)=>{if("playing"===e)this.videoCanAutoPlay||(this.videoCanAutoPlay=!0,this.player&&(this.player.ready=!0,this.player.iframe&&this.player.iframe.classList.add("ready")),this.container.classList.remove("mobile"));e&&this.logger(e),t&&this.logger(t.toString())}}).then((e=>{this.player=e}),(e=>{this.logger(e)}))}syncPlayer(){this.scaleVideo()}scaleVideo(e=1.3){if(!this.player)return;const t=this.player.iframe;if(!t)return;let i=this.scaleFactor??e;if("fill"!==this.mode)return t.style.width="",void(t.style.height="");const s=t.parentElement;if(null==s)return;const o=s.clientWidth,r=s.clientHeight,n=o/r;let a=0,l=0;n>this.videoAspectRatio?(a=o*i,l=o*i/this.videoAspectRatio):this.videoAspectRatio>n?(a=r*i*this.videoAspectRatio,l=r*i):(a=o*i,l=r*i),t.style.width=a+"px",t.style.height=l+"px",t.style.left=0-(a-o)/2+"px",t.style.top=0-(l-r)/2+"px"}buildLocalVideo(){if(this.logger("Building local video"),this.videoEl&&this.videoEl.hasAttribute("playsinline")&&this.removeChild(this.videoEl),!this.sources)return this.logger("No sources for local video"),this.handleFallbackNoVideo();let e=this.sources;if(this.breakpoints&&this.breakpoints.length>0&&(this.logger("Video has breakpoints"),e=this.getSourcesFilteredBySize(this.sources),window.addEventListener("resize",this.checkIfPassedBreakpoints.bind(this))),e&&e.length){this.videoEl=document.createElement("video"),this.videoEl.classList.add("vbg__video"),this.videoEl.classList.add("vbg--loading"),this.videoEl.setAttribute("playsinline",""),this.videoEl.setAttribute("preload","metadata"),this.videoEl.setAttribute("muted",""),"string"==typeof this.poster&&this.videoEl.setAttribute("poster",this.poster),this.autoplay,this.loop&&this.videoEl.setAttribute("loop",""),this.muted&&this.videoEl.setAttribute("muted",""),this.videoEl.innerHTML="",e.forEach((e=>{const i=document.createElement("source");"fileType"in e&&(i.type="video/"+e.fileType),i.src=e.url,i.addEventListener("loadeddata",(function(){t.videoEl&&t.videoEl.classList.remove("vbg--loading")})),this.videoEl?.append(i)}));const t=this;this.playerReady=!0,this.append(this.videoEl),this.videoEl.addEventListener("canplay",(()=>{t.videoEl?.classList.remove("vbg--loading")})),this.container.dispatchEvent(new CustomEvent("playCheck"))}else this.logger("No source found!")}handlePlayCheck(){this.logger(`Ready: ${this.playerReady}, intersecting: ${this.isIntersecting}`),this.playerReady&&this.isIntersecting?(this.status="playing","local"==this.type&&this.videoEl?this.autoplay&&(!this.videoEl.currentTime||this.videoEl.currentTime<=1?(this.videoEl.setAttribute("autoplay",""),this.videoEl.load()):this.videoEl.play()):this.player&&(this.player.shouldPlay=!0,this.player.playVideo())):(this.status="paused","local"==this.type&&this.videoEl?this.videoEl.pause():this.player&&(this.player.shouldPlay=!1,this.player.pauseVideo())),this.muted&&this.muteVideo()}muteVideo(){if(this.logger("muting video"),"local"==this.type){const e=this.querySelector("video");e&&(e.volume=0,e.muted=!0)}else this.player&&this.player.mute()}getSourcesFilteredBySize(e){const t=window.innerWidth;this.widthStore=t;let i={max:[]};if(e.forEach((e=>{if("maxWidth"in e&&e.maxWidth){const t=e.maxWidth.toString();null==i||Object.keys(i).includes(t)?i[t].push(e):i[t]=[e]}else"maxWidth"in e&&i.max.push(e)})),!this.breakpoints)return this.logger("Breakpoints not defined at size filter. Something's wrong",!0),e;let s=[...this.breakpoints,t].sort(((e,t)=>e-t));const o=s.indexOf(t);return o==s.length-1?i.max:i[s[o+1].toString()]}checkIfPassedBreakpoints(){if(!this.widthStore||!this.breakpoints)return;const e=window.innerWidth;let t=[...this.breakpoints,this.widthStore].sort(((e,t)=>e-t)),i=[...this.breakpoints,e].sort(((e,t)=>e-t));t.indexOf(this.widthStore)!=i.indexOf(e)&&this.buildLocalVideo()}checkForInherentPoster(){const e=this.container.querySelector("img");return e||!1}buildPoster(){let e=!1;const t=this.checkForInherentPoster();if(!this.posterSet&&!this.poster&&!t)return!1;if(this.logger(`Hello, looking for an inherent image. The result is ${t}.`),0!=t?(this.logger("Found an inherent poster"),e=!0,this.posterEl=t,this.container.innerHTML=""):(this.container.innerHTML="",this.posterEl=document.createElement("img"),this.posterEl.classList.add("vbg--loading")),this.posterEl.classList.add("vbg__poster"),this.poster){const e=this,t=new Image;t.src=this.poster,t.addEventListener("load",(function(){e&&e.posterEl&&(e.posterEl.src=t.src,e.posterEl.classList.remove("vbg--loading"))}))}this.posterSet&&(this.posterEl.srcset=this.posterSet,this.posterEl.sizes=this.size||"100vw"),this.appendChild(this.posterEl)}buildOverlay(){this.overlayEl=document.createElement("div"),this.overlayEl.classList.add("vbg__overlay"),this.appendChild(this.overlayEl)}buildIntersectionObserver(){this.observer=new IntersectionObserver(this.handleIntersection.bind(this),{threshold:.3}),this.observer.observe(this.container)}handleIntersection(e,t){e.forEach((e=>{e.target==this.container&&(this.logger(`Observing! Intersection found: ${e.isIntersecting}.`),this.isIntersecting=e.isIntersecting)})),this.dispatchEvent(new CustomEvent("playCheck"))}get autoplay(){return"false"!=this.getAttribute("autoplay")}get loop(){return"false"!=this.getAttribute("loop")}get muted(){return"false"!=this.getAttribute("muted")}set autoplay(e){e?this.setAttribute("autoplay",""):this.removeAttribute("autoplay")}set muted(e){e?this.setAttribute("muted",""):this.removeAttribute("muted")}set loop(e){e?this.setAttribute("loop",""):this.removeAttribute("loop")}get mode(){return"fit"==this.getAttribute("mode")?"fit":"fill"}set mode(e){this.setAttribute("mode",e)}get status(){const e=this.getAttribute("status");return"string"!=typeof e||"loading"!=e&&"playing"!=e&&"paused"!=e&&"fallback"!=e&&"loaded"!=e&&"buffering"!=e&&"failed"!=e&&"waiting"!=e&&"none"!=e&&"error"!=e?(this.status="none","none"):e}set status(e){e?this.setAttribute("status",e):this.setAttribute("status","error")}get poster(){const e=this.getAttribute("poster");return null!=e&&e}get posterSet(){const e=this.getAttribute("posterset");return null!=e&&e}get src(){const e=this.getAttribute("src");return"string"==typeof e&&this.compileSources(e),e}set src(e){null==e?this.removeAttribute("src"):(this.setAttribute("src",e),this.compileSources(e))}set poster(e){e?(this.setAttribute("poster",e),this.buildPoster()):this.removeAttribute("poster")}compileSources(e){if(null==e)return this.logger("No source provided for video background"),!1;let t=e.trim(),i=[],s=[],o=[],r=!1;if(t.indexOf(",")>=0&&(this.logger("Has sizes separated by comma"),o=e.split(","),o.length>=2&&o.forEach((e=>{const t=e.trim().split(" ");if(t.length<=1)i.push(this.prepareSingleSource(e));else{const s=parseInt(t[t.length-1].replace("w",""));this.logger("Found a size: "+s+" from string "+e),t.forEach((e=>{i.push(this.prepareSingleSource(e,s))}))}})),r=!0),t.indexOf(" ")>=0){if(this.logger("Has multiple sources separated by spaces"),o.length>=2);else{e.split(" ").forEach((e=>{s.push(e.trim())}))}s.forEach((e=>{i.push(this.prepareSingleSource(e))}))}r||i.push(this.prepareSingleSource(t)),this.sources=this.cleanupSources(i)}cleanupSources(e){if(this.type=e[0].type,this.url=e[0].url,"object"!=typeof e||e.length<=1)return this.sourcesReady=!0,e;if("youtube"==this.type||"vimeo"==this.type)return this.sourcesReady=!0,[e[0]];{let t=[];return e.forEach((e=>{"maxWidth"in e&&"number"==typeof e.maxWidth&&(t.includes(e.maxWidth)||t.push(e.maxWidth),this.breakpoints=t)})),this.sourcesReady=!0,e.filter((e=>e.type==this.type))}}prepareSingleSource(e,t=!1){const i=this.getSourceType(e);let s={url:e,type:i};if("local"==i){const i=this.getFileType(e);if(i)return{...s,maxWidth:t,fileType:i}}return s}getFileType(e){return e.includes(".mp4")?"mp4":e.includes(".webm")?"webm":e.includes(".ogg")?"ogg":!!e.includes(".ogm")&&"ogm"}handleMalformedSource(e){return this.logger(`Handling error for ${e}`),{url:e,type:"error"}}getSourceType(e){const t=new RegExp(/^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*$/),i=new RegExp(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),s=new RegExp(/.*?\/.*(webm|mp4|ogg|ogm).*?/i);return t.test(e)?"youtube":i.test(e)?"vimeo":s.test(e)?"local":"error"}connectedCallback(){}logger(e,t=!1){if(t&&this.debug.enabled)console.log(e);else{if(!this.debug.enabled||!this.debug.verbose)return;console.log(e)}}}var y=i(197),f=i.n(y),v=i(131),b=i.n(v),w=i(166),E=i.n(w),A=i(469),x=i.n(A),k=i(835),C=i.n(k),S=i(911),P=i.n(S),T=i(597),I={};I.styleTagTransform=P(),I.setAttributes=x(),I.insert=E().bind(null,"head"),I.domAPI=b(),I.insertStyleElement=C();f()(T.Z,I);T.Z&&T.Z.locals&&T.Z.locals;customElements.get("video-background")||customElements.define("video-background",m)})()})();