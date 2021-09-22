parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"hDlO":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=function(e){var t=e.condition,r=e.src,n=e.parent,o=e.onMount;if(!t)return null;if(!n.querySelector('script[src="'.concat(r,'"]'))){console.log("creating script");var c=document.createElement("script");c.id="myID1",c.src=r,o&&c.addEventListener("load",function(){return o(c)}),n.appendChild(c)}return null},t=e;exports.default=t;
},{}],"pVGv":[function(require,module,exports) {

},{}],"sARD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=I;var e=require("./index"),t=r(require("../../components/ScriptAppender"));require("./styles.css");var n=["attributes","setAttributes"];function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){return u(e)||i(e,t)||o(e,t)||l()}function l(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(e,t){if(e){if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,t):void 0}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l=[],o=!0,c=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);o=!0);}catch(i){c=!0,a=i}finally{try{o||null==n.return||n.return()}finally{if(c)throw a}}return l}}function u(e){if(Array.isArray(e))return e}function s(e,t){if(null==e)return{};var n,r,a=m(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function m(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}var p=wp.i18n,f=p.__,d=p.sprintf,y=wp.element,b=y.useEffect,h=y.useState,v=y.useRef,g=y.useCallback,E=wp.apiFetch,w=wp.blockEditor,R=w.BlockIcon,S=w.BlockControls,k=wp.components,O=k.Placeholder,C=k.Button,_=k.SelectControl,j=k.Spinner,A=k.ToolbarButton,P=k.ToolbarGroup;function I(r){var l=r.attributes,o=r.setAttributes,c=(s(r,n),l.campaignPath),i=e.metadata.icon,u=e.metadata.title,m=a(h(!0),2),p=m[0],y=m[1],w=a(h(null),2),k=w[0],I=w[1],B=a(h([]),2),x=B[0],M=B[1],N=a(h(c),2),q=N[0],T=N[1],F=a(h(!1),2),U=F[0],G=F[1],L=a(h(!!c),2),$=L[0],z=L[1],D=a(h(null),2),H=D[0],J=D[1],K=g(J,[]),Q=v(null),V=v();b(function(){var e;return V.current=!0,null!==(e=window.raiselyBlocks)&&void 0!==e&&e.nonce&&E.use(E.createNonceMiddleware(window.raiselyBlocks.nonce)),E({path:"/raisely/v1/campaigns-list"}).then(function(e){var t,n;V.current&&(y(!1),e.auth?M(e.data):I(React.createElement("span",null,f("Setup your connection with Raisely on the","raisely")," ",React.createElement("a",{href:null===(t=window)||void 0===t?void 0:null===(n=t.raiselyBlocks)||void 0===n?void 0:n.settingsPage,target:"_blank"},f("Raisely Settings page","raisely"))," ",f("to retrieve a list of your Raisely campaigns.","raisely"))))}).catch(function(e){V.current&&(console.error(e),M([]),y(!1),I(f("Oops... Something went wrong. Please try again later.","raisely")))}),function(){V.current=!1,Q.current&&clearInterval(Q.current)}},[]);return React.createElement(React.Fragment,null,React.createElement(S,null,React.createElement(P,null,$&&React.createElement(A,{className:"components-toolbar__control",label:f("Edit URL","raisely"),icon:"edit",onClick:function(){return z(!1)}}))),React.createElement("div",{class:"wp-raisely-block-donation-form"},$?React.createElement("div",{id:"raisely-donate","data-campaign-path":c,"data-width":"100%","data-height":"800",ref:K},!U&&React.createElement(j,null),React.createElement(t.default,{condition:!!H,src:"https://cdn.raisely.com/v3/public/embed.js",parent:H,onMount:function(){var e=setInterval(function(){var e=H.querySelector("iframe");e&&(e.attachEvent?e.attachEvent("onload",function(){G(!0)}):e.onload=function(){G(!0)},e.style.pointerEvents="none",clearInterval(Q.current),Q.current=null)},1e3);Q.current=e}})):React.createElement(O,{icon:React.createElement(R,{icon:i,showColors:!0}),label:d(f("%s Campaign","raisely"),u),className:"wp-block-embed",instructions:f("Raisely Campaign you wish to embed","raisely")},p?React.createElement(j,null):k?React.createElement("p",null,k):x.length?React.createElement(React.Fragment,null,React.createElement(_,{className:"raisely-placeholder__input",value:c,onChange:function(e){return T(e)},options:x.map(function(e){return{value:e.path,label:e.name}})}),React.createElement(C,{className:"is-primary",onClick:function(){console.log({embedCampaignPath:q}),o({campaignPath:q}),z(!0)}},"Embed")):React.createElement("p",null,f("There are no campaigns to select from.","raisely")))))}
},{"./index":"VUH8","../../components/ScriptAppender":"hDlO","./styles.css":"pVGv"}],"oOo6":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.logo=void 0;var e=wp.primitives,l=e.SVG,t=e.Path,o=React.createElement(l,{fill:"none",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 152 152"},React.createElement(t,{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M34.2 123.5l41.9-47.3 41.7 47.4a63.22 63.22 0 01-41.7 15.8c-16.1-.1-30.8-6.1-41.9-15.9zM76 12.7c34.9 0 63.3 28.4 63.3 63.3 0 14.4-4.8 27.6-12.9 38.3L76.1 57.1l-50.6 57.1c-8-10.6-12.8-23.8-12.8-38.2 0-34.9 28.4-63.3 63.3-63.3zM76 0C34.1 0 0 34.1 0 76s34.1 76 76 76 76-34.1 76-76S117.9 0 76 0z",fill:"#6138D8"}));exports.logo=o;
},{}],"lJq5":[function(require,module,exports) {
module.exports={apiVersion:2,name:"raisely/donation-form",title:"Raisely Donation Form",category:"embed",keywords:["recent content"],textdomain:"default",attributes:{campaignPath:{type:"string"}},supports:{align:!1,html:!1,className:!1}};
},{}],"VUH8":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"metadata",{enumerable:!0,get:function(){return r.default}}),exports.settings=exports.name=void 0;var e=a(require("./edit")),t=require("./icon"),r=a(require("./block.json"));function a(e){return e&&e.__esModule?e:{default:e}}var i=wp.i18n.__,o=r.default.name;exports.name=o;var n={icon:t.logo,description:i("Displays a Raisely campaign donation form.","raisely"),example:{},edit:e.default};exports.settings=n;
},{"./edit":"sARD","./icon":"oOo6","./block.json":"lJq5"}],"Focm":[function(require,module,exports) {
"use strict";var e=r(require("./blocks/RaiselyDonationForm"));function t(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap,n=new WeakMap;return(t=function(e){return e?n:r})(e)}function r(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=t(r);if(n&&n.has(e))return n.get(e);var a={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if("default"!==i&&Object.prototype.hasOwnProperty.call(e,i)){var f=o?Object.getOwnPropertyDescriptor(e,i):null;f&&(f.get||f.set)?Object.defineProperty(a,i,f):a[i]=e[i]}return a.default=e,n&&n.set(e,a),a}var n=wp.blocks.registerBlockType,a=function(e){if(e){var t=e.metadata,r=e.settings,a=e.name;n(a,Object.assign(t,r))}};[e].forEach(a);
},{"./blocks/RaiselyDonationForm":"VUH8"}]},{},["Focm"], null)