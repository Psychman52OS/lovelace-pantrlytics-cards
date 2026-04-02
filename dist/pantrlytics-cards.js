function t(t,e,i,s){var o,r=arguments.length,a=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(o=t[n])&&(a=(r<3?o(a):r>3?o(e,i,a):o(e,i))||a);return r>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,g=_.trustedTypes,m=g?g.emptyScript:"",f=_.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const r=this.constructor;if(!1===s&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,f?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=t=>t,k=x.trustedTypes,E=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+S,D=`<${P}>`,q=document,z=()=>q.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,j="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,R=/>/g,T=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,M=/"/g,H=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),X=new WeakMap,V=q.createTreeWalker(q,129);function Q(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",a=O;for(let e=0;e<i;e++){const i=t[e];let n,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===O?"!--"===l[1]?a=L:void 0!==l[1]?a=R:void 0!==l[2]?(H.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=T):void 0!==l[3]&&(a=T):a===T?">"===l[0]?(a=o??O,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?T:'"'===l[3]?M:N):a===M||a===N?a=T:a===L||a===R?a=O:(a=T,o=void 0);const h=a===T&&t[e+1].startsWith("/>")?" ":"";r+=a===O?i+D:c>=0?(s.push(n),i.slice(0,c)+C+i.slice(c)+S+h):i+S+(-2===c?e:h)}return[Q(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const a=t.length-1,n=this.parts,[l,c]=Y(t,e);if(this.el=J.createElement(l,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&n.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[r++],i=s.getAttribute(t).split(S),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?et:"?"===a[1]?it:"@"===a[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(S)&&(n.push({type:6,index:o}),s.removeAttribute(t));if(H.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],z()),V.nextNode(),n.push({type:2,index:++o});s.append(t[e],z())}}}else if(8===s.nodeType)if(s.data===P)n.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)n.push({type:7,index:o}),t+=S.length-1}o++}}static createElement(t,e){const i=q.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===W)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=U(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=K(t,o._$AS(t,e.values),o,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??q).importNode(e,!0);V.currentNode=s;let o=V.nextNode(),r=0,a=0,n=i[0];for(;void 0!==n;){if(r===n.index){let e;2===n.type?e=new G(o,o.nextSibling,this,t):1===n.type?e=new n.ctor(o,n.name,n.strings,this,t):6===n.type&&(e=new ot(o,this,t)),this._$AV.push(e),n=i[++a]}r!==n?.index&&(o=V.nextNode(),r++)}return V.currentNode=q,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),U(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>I(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(q.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new J(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new G(this.O(z()),this.O(z()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=K(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const s=t;let a,n;for(t=o[0],a=0;a<o.length-1;a++)n=K(this,s[i+a],e,a),n===W&&(n=this._$AH[a]),r||=!U(n)||n!==this._$AH[a],n===F?t=F:t!==F&&(t+=(n??"")+o[a+1]),this._$AH[a]=n}r&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class st extends tt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??F)===W)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(J,G),(x.litHtmlVersions??=[]).push("3.3.2");const at=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new G(e.insertBefore(z(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}nt._$litElement$=!0,nt.finalized=!0,at.litElementHydrateSupport?.({LitElement:nt});const lt=at.litElementPolyfillSupport;lt?.({LitElement:nt}),(at.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},ht=(t=dt,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return pt({...t,state:!0,attribute:!1})}class _t extends nt{constructor(){super(...arguments),this.hass=null,this._resolvedBase=null,this._basePromise=null}_resolveBase(t){return this._basePromise||(this._basePromise=(async()=>{var e;if(this.hass){const t=this._slugsFromPanels();for(const i of t)try{const t=await this.hass.callWS({type:"supervisor/api",endpoint:`/addons/${i}/info`,method:"get",timeout:!1}),s=null!==(e=null==t?void 0:t.ingress_entry)&&void 0!==e?e:null==t?void 0:t.ingress_url;if(s)return{url:s.replace(/\/+$/,""),useHass:!0}}catch{}}return{url:t.replace(/\/$/,""),useHass:!1}})()),this._basePromise}_slugsFromPanels(){var t,e,i;const s=[];if(null===(t=this.hass)||void 0===t?void 0:t.panels)for(const t of Object.values(this.hass.panels)){const o=t;(null!==(i=null===(e=o.config)||void 0===e?void 0:e.addon)&&void 0!==i?i:"").toLowerCase().includes("pantrlytics")&&s.push(o.config.addon)}return s.length?[...new Set(s)]:["local_pantrlytics","pantrlytics"]}_resetBase(){this._basePromise=null,this._resolvedBase=null}async _apiFetch(t,e,i){var s;const{url:o,useHass:r}=await this._resolveBase(t);this._resolvedBase||(this._resolvedBase=o);const a=o+e;return r&&(null===(s=this.hass)||void 0===s?void 0:s.fetchWithAuth)?this.hass.fetchWithAuth(a,i):fetch(a,i)}_navUrl(t,e){var i;const s=null!==(i=this._resolvedBase)&&void 0!==i?i:t.replace(/\/$/,"");return s.startsWith("/")?window.location.origin+s+e:s+e}}t([pt({attribute:!1})],_t.prototype,"hass",void 0),t([ut()],_t.prototype,"_resolvedBase",void 0);let gt=class extends _t{constructor(){super(...arguments),this._config=null,this._data=null,this._error=null,this._loading=!0,this._timer=null}setConfig(t){if(!t.url)throw new Error("url is required");this._config=t}connectedCallback(){var t,e;super.connectedCallback(),this._fetch();const i=1e3*(null!==(e=null===(t=this._config)||void 0===t?void 0:t.refresh_interval)&&void 0!==e?e:600);this._timer=setInterval(()=>this._fetch(),i)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _fetch(){if(this._config)try{const t=await this._apiFetch(this._config.url,"/api/health-score");if(!t.ok)throw new Error(`HTTP ${t.status}`);this._data=await t.json(),this._error=null}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}_scoreClass(t){return t?`score-${t.toLowerCase()}`:"score-none"}render(){var t,e,i;if(!this._config)return F;if(this._loading)return B`<ha-card><div class="no-data">Loading…</div></ha-card>`;if(this._error)return B`<ha-card><div class="no-data">Error: ${this._error}</div></ha-card>`;if(!this._data||0===this._data.total_active)return B`<ha-card><div class="no-data">No inventory data</div></ha-card>`;const s=this._data;return B`
      <ha-card>
        <div class="card-header"><h2>${null!==(t=this._config.title)&&void 0!==t?t:"Inventory Health"}</h2></div>
        <div class="score-row">
          <div class="score-circle ${this._scoreClass(s.grade)}">
            <span class="number">${null!==(e=s.score)&&void 0!==e?e:"—"}</span>
            <span class="grade">${null!==(i=s.grade)&&void 0!==i?i:""}</span>
          </div>
          <div class="breakdown">
            <div class="breakdown-row"><span>Compliance</span><span>${s.compliance}%</span></div>
            <div class="breakdown-row"><span>Coverage</span><span>${s.coverage}%</span></div>
            <div class="breakdown-row"><span>Audit</span><span>${s.audit}%</span></div>
          </div>
        </div>
        ${s.action_items.length>0?B`<div class="actions">
              ${s.action_items.map(t=>B`
                <div class="action-item action-${t.severity}">
                  <span class="dot dot-${t.severity}"></span>${t.text}
                </div>`)}
            </div>`:B`<div class="no-data" style="padding:8px 0">All clear — no action items</div>`}
        <a class="open-link" href="${this._navUrl(this._config.url,"/reports")}" target="_blank">Open Reports →</a>
      </ha-card>
    `}static getConfigElement(){return document.createElement("pantrlytics-reports-card-editor")}static getStubConfig(){return{url:"http://homeassistant.local:8099"}}};gt.styles=a`
    :host { --pl-accent: #f97316; }
    @media (prefers-color-scheme: light) { :host { --pl-accent: #d97706; } }
    ha-card { padding: 16px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .card-header h2 { margin: 0; font-size: 1rem; font-weight: 500; color: var(--primary-text-color); }
    .score-row { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
    .score-circle {
      width: 72px; height: 72px; border-radius: 50%;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      flex-shrink: 0; font-weight: bold; color: white;
    }
    .score-circle .number { font-size: 1.5rem; line-height: 1; }
    .score-circle .grade { font-size: 0.9rem; opacity: 0.9; }
    .score-a { background: #2e7d32; } .score-b { background: #558b2f; }
    .score-c { background: #f57f17; } .score-d { background: #e65100; }
    .score-f { background: #b71c1c; } .score-none { background: var(--secondary-text-color); }
    .breakdown { flex: 1; display: flex; flex-direction: column; gap: 4px; }
    .breakdown-row { display: flex; justify-content: space-between; font-size: 0.82rem; color: var(--secondary-text-color); }
    .breakdown-row span:last-child { font-weight: 500; color: var(--primary-text-color); }
    .actions { margin-top: 8px; display: flex; flex-direction: column; gap: 6px; }
    .action-item { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; padding: 6px 8px; border-radius: 6px; }
    .action-danger { background: rgba(183,28,28,0.1); color: #b71c1c; }
    .action-warn   { background: rgba(245,127,23,0.1); color: #e65100; }
    .action-info   { background: rgba(2,119,189,0.1);  color: #0277bd; }
    .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .dot-danger { background: #b71c1c; } .dot-warn { background: #e65100; } .dot-info { background: #0277bd; }
    .no-data { color: var(--secondary-text-color); font-size: 0.9rem; text-align: center; padding: 16px 0; }
    .open-link { display: block; margin-top: 12px; text-align: right; font-size: 0.8rem; color: var(--pl-accent); text-decoration: none; }
    .open-link:hover { text-decoration: underline; }
  `,t([ut()],gt.prototype,"_config",void 0),t([ut()],gt.prototype,"_data",void 0),t([ut()],gt.prototype,"_error",void 0),t([ut()],gt.prototype,"_loading",void 0),gt=t([ct("pantrlytics-reports-card")],gt);let mt=class extends _t{constructor(){super(...arguments),this._config=null,this._data=null,this._error=null,this._loading=!0,this._timer=null}setConfig(t){if(!t.url)throw new Error("url is required");this._config=t}connectedCallback(){var t,e;super.connectedCallback(),this._fetch();const i=1e3*(null!==(e=null===(t=this._config)||void 0===t?void 0:t.refresh_interval)&&void 0!==e?e:300);this._timer=setInterval(()=>this._fetch(),i)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _fetch(){if(this._config)try{const t=await this._apiFetch(this._config.url,"/api/stats");if(!t.ok)throw new Error(`HTTP ${t.status}`);this._data=await t.json(),this._error=null}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}render(){var t;if(!this._config)return F;if(this._loading)return B`<ha-card><div class="no-data">Loading…</div></ha-card>`;if(this._error)return B`<ha-card><div class="no-data">Error: ${this._error}</div></ha-card>`;if(!this._data)return B`<ha-card><div class="no-data">No data</div></ha-card>`;const e=this._data,i=e.expiring_7_days>0?"stat-warn":"";return B`
      <ha-card>
        <div class="card-header"><h2>${null!==(t=this._config.title)&&void 0!==t?t:"PantrLytics"}</h2></div>
        <div class="stats-grid">
          <div class="stat-box">
            <span class="stat-value">${e.total_active}</span>
            <span class="stat-label">Active Items</span>
          </div>
          <div class="stat-box ${i}">
            <span class="stat-value">${e.expiring_7_days}</span>
            <span class="stat-label">Expiring (7d)</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">${e.depleted_today}</span>
            <span class="stat-label">Used Today</span>
          </div>
        </div>
        <a class="open-link" href="${this._navUrl(this._config.url,"/")}" target="_blank">Open PantrLytics →</a>
      </ha-card>
    `}static getConfigElement(){return document.createElement("pantrlytics-stats-card-editor")}static getStubConfig(){return{url:"http://homeassistant.local:8099"}}};mt.styles=a`
    :host { --pl-accent: #f97316; }
    @media (prefers-color-scheme: light) { :host { --pl-accent: #d97706; } }
    ha-card { padding: 16px; }
    .card-header h2 { margin: 0 0 12px; font-size: 1rem; font-weight: 500; color: var(--primary-text-color); }
    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .stat-box {
      display: flex; flex-direction: column; align-items: center;
      padding: 12px 8px; border-radius: 8px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
    }
    .stat-value { font-size: 1.8rem; font-weight: bold; line-height: 1; color: var(--primary-text-color); }
    .stat-label { font-size: 0.72rem; color: var(--secondary-text-color); text-align: center; margin-top: 4px; }
    .stat-warn .stat-value { color: #e65100; }
    .no-data { color: var(--secondary-text-color); font-size: 0.9rem; text-align: center; padding: 16px 0; }
    .open-link { display: block; margin-top: 12px; text-align: right; font-size: 0.8rem; color: var(--pl-accent); text-decoration: none; }
    .open-link:hover { text-decoration: underline; }
  `,t([ut()],mt.prototype,"_config",void 0),t([ut()],mt.prototype,"_data",void 0),t([ut()],mt.prototype,"_error",void 0),t([ut()],mt.prototype,"_loading",void 0),mt=t([ct("pantrlytics-stats-card")],mt);let ft=class extends _t{constructor(){super(...arguments),this._config=null,this._items=[],this._error=null,this._loading=!0,this._timer=null}setConfig(t){if(!t.url)throw new Error("url is required");this._config=t}connectedCallback(){var t,e;super.connectedCallback(),this._fetch();const i=1e3*(null!==(e=null===(t=this._config)||void 0===t?void 0:t.refresh_interval)&&void 0!==e?e:300);this._timer=setInterval(()=>this._fetch(),i)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _fetch(){var t,e;if(!this._config)return;const i=null!==(t=this._config.days)&&void 0!==t?t:7,s=null!==(e=this._config.max_items)&&void 0!==e?e:10;try{const t=await this._apiFetch(this._config.url,`/api/items/expiring?days=${i}&max_items=${s}`);if(!t.ok)throw new Error(`HTTP ${t.status}`);this._items=await t.json(),this._error=null}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}_daysLabel(t){return t<0?`${Math.abs(t)}d ago`:0===t?"Today":`${t}d`}_daysClass(t){return t<0?"days-expired":t<=3?"days-soon":"days-ok"}render(){var t;return this._config?this._loading?B`<ha-card><div class="no-data">Loading…</div></ha-card>`:this._error?B`<ha-card><div class="no-data">Error: ${this._error}</div></ha-card>`:B`
      <ha-card>
        <div class="card-header">
          <h2>${null!==(t=this._config.title)&&void 0!==t?t:"Expiring Soon"}</h2>
          ${this._items.length>0?B`<span class="badge">${this._items.length}</span>`:F}
        </div>
        ${0===this._items.length?B`<div class="no-data">Nothing expiring soon</div>`:B`<div class="item-list">
              ${this._items.map(t=>B`
                <a class="item-row" href="${this._navUrl(this._config.url,`/item/${t.id}`)}" target="_blank">
                  <div class="item-info">
                    <span class="item-name">${t.name}</span>
                    <span class="item-meta">
                      ${[t.location,t.category].filter(Boolean).join(" · ")}
                      ${t.quantity>1?` · qty ${t.quantity}`:""}
                    </span>
                  </div>
                  <span class="item-days ${this._daysClass(t.days_remaining)}">
                    ${this._daysLabel(t.days_remaining)}
                  </span>
                </a>`)}
            </div>`}
      </ha-card>
    `:F}static getConfigElement(){return document.createElement("pantrlytics-expiring-card-editor")}static getStubConfig(){return{url:"http://homeassistant.local:8099",days:7}}};ft.styles=a`
    :host { --pl-accent: #f97316; }
    @media (prefers-color-scheme: light) { :host { --pl-accent: #d97706; } }
    ha-card { padding: 16px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .card-header h2 { margin: 0; font-size: 1rem; font-weight: 500; color: var(--primary-text-color); }
    .badge { font-size: 0.75rem; background: var(--pl-accent); color: white; padding: 2px 7px; border-radius: 10px; }
    .item-list { display: flex; flex-direction: column; gap: 4px; }
    .item-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 7px 10px; border-radius: 6px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      text-decoration: none; color: var(--primary-text-color); font-size: 0.88rem;
    }
    .item-row:hover { background: var(--secondary-background-color, #f5f5f5); }
    .item-info { display: flex; flex-direction: column; gap: 1px; }
    .item-name { font-weight: 500; }
    .item-meta { font-size: 0.75rem; color: var(--secondary-text-color); }
    .item-days { font-weight: bold; font-size: 0.85rem; min-width: 44px; text-align: right; }
    .days-expired { color: #b71c1c; } .days-soon { color: #e65100; } .days-ok { color: #2e7d32; }
    .no-data { color: var(--secondary-text-color); font-size: 0.9rem; text-align: center; padding: 16px 0; }
  `,t([ut()],ft.prototype,"_config",void 0),t([ut()],ft.prototype,"_items",void 0),t([ut()],ft.prototype,"_error",void 0),t([ut()],ft.prototype,"_loading",void 0),ft=t([ct("pantrlytics-expiring-card")],ft);const vt={show_category:!0,show_tags:!1,show_location:!0,show_bin:!1,show_quantity:!0,show_unit:!1,show_condition:!1,show_origin_date:!1,show_use_by_date:!0,show_use_within:!0,show_review_window:!1,show_notes:!0};let bt=class extends _t{constructor(){super(...arguments),this._config=null,this._formData=null,this._loading=!0,this._submitting=!1,this._success=null,this._error=null,this._name="",this._category="",this._tags="",this._location="",this._binNumber="",this._quantity=1,this._unit="",this._condition="",this._originDateLabel="Cooked On",this._originDate="",this._useByDate="",this._useWithin="",this._reviewWindowDays="",this._notes=""}setConfig(t){if(!t.url)throw new Error("url is required");this._config=t}connectedCallback(){super.connectedCallback(),this._fetchFormData()}_show(t){var e,i;if(!this._config)return null===(e=vt[t])||void 0===e||e;const s=this._config[t];return void 0===s?null===(i=vt[t])||void 0===i||i:s}async _fetchFormData(){if(this._config)try{const t=await this._apiFetch(this._config.url,"/api/form-data");if(!t.ok)throw new Error(`HTTP ${t.status}`);this._formData=await t.json(),this._error=null}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}async _submit(t){var e;if(t.preventDefault(),this._config&&this._name.trim()){this._submitting=!0,this._error=null,this._success=null;try{const t=await this._apiFetch(this._config.url,"/api/items",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:this._name,category:this._category||void 0,tags:this._tags||void 0,location:this._location||void 0,bin_number:this._binNumber||void 0,quantity:this._quantity,unit:this._unit||void 0,condition:this._condition||void 0,origin_date_label:this._originDate?this._originDateLabel||"Cooked On":void 0,origin_date:this._originDate||void 0,use_by_date:this._useByDate||void 0,use_within:this._useWithin||void 0,review_window_days:this._reviewWindowDays?parseInt(this._reviewWindowDays):void 0,notes:this._notes||void 0})}),i=await t.json();i.ok?(this._success={item_id:i.item_id,serial_number:i.serial_number},this._clearForm()):this._error=null!==(e=i.error)&&void 0!==e?e:"Unknown error"}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._submitting=!1}}}_clearForm(){this._name="",this._category="",this._tags="",this._location="",this._binNumber="",this._quantity=1,this._unit="",this._condition="",this._originDateLabel="Cooked On",this._originDate="",this._useByDate="",this._useWithin="",this._reviewWindowDays="",this._notes=""}render(){var t,e,i,s,o,r,a,n;if(!this._config)return F;if(this._loading)return B`<ha-card><div class="no-data">Loading…</div></ha-card>`;const l=this._formData,c=null!==(t=null==l?void 0:l.required_fields)&&void 0!==t?t:[];return B`
      <ha-card>
        <div class="card-header"><h2>${null!==(e=this._config.title)&&void 0!==e?e:"Quick Add Item"}</h2></div>
        ${this._success?B`<div class="success-box">
              Added <a href="${this._navUrl(this._config.url,`/item/${this._success.item_id}`)}" target="_blank">${this._success.serial_number}</a> — created successfully.
            </div>`:F}
        ${this._error?B`<div class="error-box">${this._error}</div>`:F}
        <form class="form" @submit=${this._submit}>

          <div class="field">
            <label>Name${c.includes("name")?" *":""}</label>
            <input type="text" .value=${this._name}
              @input=${t=>this._name=t.target.value}
              placeholder="Item name" required />
          </div>

          ${this._show("show_category")?B`
          <div class="field">
            <label>Category${c.includes("category")?" *":""}</label>
            <input type="text" list="pl-cats" .value=${this._category}
              @input=${t=>this._category=t.target.value}
              placeholder="Category" />
            <datalist id="pl-cats">
              ${null!==(i=null==l?void 0:l.categories.map(t=>B`<option value=${t}></option>`))&&void 0!==i?i:F}
            </datalist>
          </div>`:F}

          ${this._show("show_tags")?B`
          <div class="field">
            <label>Tags${c.includes("tags")?" *":""} <span style="font-size:0.72rem;opacity:.7">(comma-separated)</span></label>
            <input type="text" .value=${this._tags}
              @input=${t=>this._tags=t.target.value}
              placeholder="tag1, tag2" />
          </div>`:F}

          ${this._show("show_location")?B`
          <div class="field">
            <label>Location${c.includes("location")?" *":""}</label>
            <input type="text" list="pl-locs" .value=${this._location}
              @input=${t=>this._location=t.target.value}
              placeholder="Where is it stored?" />
            <datalist id="pl-locs">
              ${null!==(s=null==l?void 0:l.locations.map(t=>B`<option value=${t}></option>`))&&void 0!==s?s:F}
            </datalist>
          </div>`:F}

          ${this._show("show_bin")?B`
          <div class="field">
            <label>Bin #${c.includes("bin_number")?" *":""}</label>
            <input type="text" list="pl-bins" .value=${this._binNumber}
              @input=${t=>this._binNumber=t.target.value}
              placeholder="Bin number" />
            <datalist id="pl-bins">
              ${null!==(o=null==l?void 0:l.bins.map(t=>B`<option value=${t}></option>`))&&void 0!==o?o:F}
            </datalist>
          </div>`:F}

          ${this._show("show_quantity")||this._show("show_unit")?B`
          <div class="row-half">
            ${this._show("show_quantity")?B`
            <div class="field">
              <label>Qty${c.includes("quantity")?" *":""}</label>
              <input type="number" min="0" .value=${String(this._quantity)}
                @input=${t=>this._quantity=parseInt(t.target.value)||1} />
            </div>`:F}
            ${this._show("show_unit")?B`
            <div class="field">
              <label>Unit${c.includes("unit")?" *":""}</label>
              <input type="text" list="pl-units" .value=${this._unit}
                @input=${t=>this._unit=t.target.value}
                placeholder="each" />
              <datalist id="pl-units">
                ${null!==(r=null==l?void 0:l.units.map(t=>B`<option value=${t}></option>`))&&void 0!==r?r:F}
              </datalist>
            </div>`:F}
          </div>`:F}

          ${this._show("show_condition")?B`
          <div class="field">
            <label>Condition${c.includes("condition")?" *":""}</label>
            <input type="text" .value=${this._condition}
              @input=${t=>this._condition=t.target.value}
              placeholder="new / good / used / frozen" />
          </div>`:F}

          ${this._show("show_origin_date")?B`
          <div class="row">
            <div class="field">
              <label>Origin Date${c.includes("origin_date")?" *":""}</label>
              <input type="date" .value=${this._originDate}
                @input=${t=>this._originDate=t.target.value} />
            </div>
            <div class="field">
              <label>Label</label>
              <select @change=${t=>this._originDateLabel=t.target.value}>
                ${(null!==(a=null==l?void 0:l.origin_date_labels)&&void 0!==a?a:["Cooked On"]).map(t=>B`
                  <option value=${t} ?selected=${t===this._originDateLabel}>${t}</option>`)}
              </select>
            </div>
          </div>`:F}

          ${this._show("show_use_by_date")||this._show("show_use_within")?B`
          <div class="row">
            ${this._show("show_use_by_date")?B`
            <div class="field">
              <label>Use-by Date${c.includes("use_by_date")?" *":""}</label>
              <input type="date" .value=${this._useByDate}
                @input=${t=>this._useByDate=t.target.value} />
            </div>`:F}
            ${this._show("show_use_within")?B`
            <div class="field">
              <label>Use Within${c.includes("use_within")?" *":""}</label>
              <select @change=${t=>this._useWithin=t.target.value}>
                <option value="">—</option>
                ${null!==(n=null==l?void 0:l.use_withins.map(t=>B`<option value=${t} ?selected=${t===this._useWithin}>${t}</option>`))&&void 0!==n?n:F}
              </select>
            </div>`:F}
          </div>`:F}

          ${this._show("show_review_window")?B`
          <div class="field">
            <label>Review window (days${l?`, default ${l.audit_window_days}d`:""})</label>
            <input type="number" min="1" max="365" .value=${this._reviewWindowDays}
              @input=${t=>this._reviewWindowDays=t.target.value}
              placeholder="Use default" />
          </div>`:F}

          ${this._show("show_notes")?B`
          <div class="field">
            <label>Notes${c.includes("notes")?" *":""}</label>
            <textarea .value=${this._notes}
              @input=${t=>this._notes=t.target.value}
              placeholder="Optional notes"></textarea>
          </div>`:F}

          <div class="btn-row">
            <button type="submit" class="btn-submit" ?disabled=${this._submitting||!this._name.trim()}>
              ${this._submitting?"Adding…":"Add Item"}
            </button>
            <button type="button" class="btn-clear" @click=${this._clearForm}>Clear</button>
          </div>
        </form>
      </ha-card>
    `}static getConfigElement(){return document.createElement("pantrlytics-quick-add-card-editor")}static getStubConfig(){return{url:"http://homeassistant.local:8099"}}};bt.styles=a`
    :host { --pl-accent: #f97316; }
    @media (prefers-color-scheme: light) { :host { --pl-accent: #d97706; } }
    ha-card { padding: 16px; }
    .card-header h2 { margin: 0 0 14px; font-size: 1rem; font-weight: 500; color: var(--primary-text-color); }
    .form { display: flex; flex-direction: column; gap: 10px; }
    .field { display: flex; flex-direction: column; gap: 3px; }
    label { font-size: 0.78rem; color: var(--secondary-text-color); }
    input, select, textarea {
      padding: 7px 10px; border: 1px solid var(--divider-color, #ccc);
      border-radius: 6px; background: var(--card-background-color, #fff);
      color: var(--primary-text-color); font-size: 0.9rem;
      width: 100%; box-sizing: border-box;
    }
    input:focus, select:focus, textarea:focus { outline: none; border-color: var(--pl-accent); }
    .row { display: grid; grid-template-columns: 2fr 1fr; gap: 8px; }
    .row-half { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    textarea { resize: vertical; min-height: 56px; }
    .btn-row { display: flex; gap: 8px; margin-top: 4px; }
    button { flex: 1; padding: 9px; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 500; }
    .btn-submit { background: var(--pl-accent); color: white; }
    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-clear { background: var(--divider-color, #e0e0e0); color: var(--primary-text-color); }
    .success-box { padding: 12px; background: rgba(46,125,50,0.1); border-radius: 8px; color: #2e7d32; font-size: 0.88rem; margin-bottom: 10px; }
    .success-box a { color: #2e7d32; font-weight: 500; }
    .error-box { padding: 8px 12px; background: rgba(183,28,28,0.1); border-radius: 6px; color: #b71c1c; font-size: 0.85rem; }
    .no-data { color: var(--secondary-text-color); font-size: 0.9rem; text-align: center; padding: 16px 0; }
  `,t([ut()],bt.prototype,"_config",void 0),t([ut()],bt.prototype,"_formData",void 0),t([ut()],bt.prototype,"_loading",void 0),t([ut()],bt.prototype,"_submitting",void 0),t([ut()],bt.prototype,"_success",void 0),t([ut()],bt.prototype,"_error",void 0),t([ut()],bt.prototype,"_name",void 0),t([ut()],bt.prototype,"_category",void 0),t([ut()],bt.prototype,"_tags",void 0),t([ut()],bt.prototype,"_location",void 0),t([ut()],bt.prototype,"_binNumber",void 0),t([ut()],bt.prototype,"_quantity",void 0),t([ut()],bt.prototype,"_unit",void 0),t([ut()],bt.prototype,"_condition",void 0),t([ut()],bt.prototype,"_originDateLabel",void 0),t([ut()],bt.prototype,"_originDate",void 0),t([ut()],bt.prototype,"_useByDate",void 0),t([ut()],bt.prototype,"_useWithin",void 0),t([ut()],bt.prototype,"_reviewWindowDays",void 0),t([ut()],bt.prototype,"_notes",void 0),bt=t([ct("pantrlytics-quick-add-card")],bt);const yt={edit:{icon:"✏️",label:"Edit"},deplete:{icon:"📦",label:"Deplete"},open:{icon:"🔗",label:"Open"},print:{icon:"🖨️",label:"Print"},none:{icon:"",label:""}};let $t=class extends _t{constructor(){super(...arguments),this._config=null,this._items={},this._swipeActions={right:"edit",left:"deplete"},this._depletionReasons=["Consumed/Used","Discarded (expired/spoiled)","Discarded (damaged)","Donated/Returned","Lost/Missing","Restocked/Replaced (new batch)","Other"],this._dialog=null,this._loading=!0,this._adjusting={},this._flash={},this._error=null,this._swipeState=new Map}setConfig(t){if(!t.url)throw new Error("url is required");this._config=t}_configuredIds(){if(!this._config)return[];const t=[];this._config.item_id&&t.push(Number(this._config.item_id));for(let e=1;e<=10;e++){const i=this._config[`item_id_${e}`];i&&t.push(Number(i))}return[...new Set(t)]}connectedCallback(){super.connectedCallback(),this._fetchAll()}async _fetchAll(){var t;const e=this._configuredIds();if(e.length&&this._config)try{const[i,s]=await Promise.all([Promise.all(e.map(t=>this._apiFetch(this._config.url,`/api/items/${t}`).then(t=>t.ok?t.json():null).catch(()=>null))),this._apiFetch(this._config.url,"/api/form-data").then(t=>t.ok?t.json():null).catch(()=>null)]),o={};for(const t of i)(null==t?void 0:t.id)&&(o[t.id]=t);this._items=o,(null==s?void 0:s.swipe_actions)&&(this._swipeActions=s.swipe_actions),(null===(t=null==s?void 0:s.depletion_reasons)||void 0===t?void 0:t.length)&&(this._depletionReasons=s.depletion_reasons),this._error=null}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}async _adjust(t,e){if(this._config&&!this._adjusting[t]){this._adjusting={...this._adjusting,[t]:!0},this._flash={...this._flash,[t]:""};try{const i=await this._apiFetch(this._config.url,`/item/${t}/adjust-qty`,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded","X-Requested-With":"xmlhttprequest"},body:`delta=${e}`}),s=await i.json();s.ok?(this._items={...this._items,[t]:{...this._items[t],quantity:s.quantity}},this._flash={...this._flash,[t]:e>0?`+${e}`:`${e}`},setTimeout(()=>{this._flash={...this._flash,[t]:""}},2e3)):this._error="depleted"===s.reason?"Item fully depleted":"Cannot adjust quantity"}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._adjusting={...this._adjusting,[t]:!1}}}}_runSwipeAction(t,e){var i;if(this._config)if("deplete"===e){const e=this._items[t];if(!e)return;const s=new Date,o=new Date(s.getTime()-6e4*s.getTimezoneOffset()).toISOString().slice(0,16);this._dialog={itemId:t,itemName:e.name,reason:null!==(i=this._depletionReasons[0])&&void 0!==i?i:"",depleted_at:o}}else"edit"!==e&&"open"!==e&&"print"!==e||window.open(this._navUrl(this._config.url,`/item/${t}`),"_blank")}async _confirmDeplete(){if(!this._config||!this._dialog)return;const{itemId:t,reason:e,depleted_at:i}=this._dialog;this._dialog=null,this._adjusting={...this._adjusting,[t]:!0};try{const s=await this._apiFetch(this._config.url,`/item/${t}/deplete`,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded","X-Requested-With":"xmlhttprequest"},body:`reason=${encodeURIComponent(e)}&depleted_at_input=${encodeURIComponent(i)}`}),o=await s.json();o.ok?(this._items={...this._items,[t]:{...this._items[t],quantity:0}},this._flash={...this._flash,[t]:"Depleted"},setTimeout(()=>{this._flash={...this._flash,[t]:""}},2500)):this._error="already_depleted"===o.reason?"Already depleted":"Could not deplete"}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._adjusting={...this._adjusting,[t]:!1}}}_onPointerDown(t,e){const i=t.currentTarget;i.closest(".item-row-wrap")&&!this._adjusting[e]&&(i.setPointerCapture(t.pointerId),this._swipeState.set(e,{startX:t.clientX,startY:t.clientY,dx:0,pointerId:t.pointerId,rowEl:i,innerEl:i,committed:!1}))}_onPointerMove(t,e){const i=this._swipeState.get(e);if(!i)return;const s=t.clientX-i.startX,o=t.clientY-i.startY;if(!i.committed&&Math.abs(o)>Math.abs(s)+5)return void this._cancelSwipe(e);i.committed=!0,i.dx=s,i.innerEl.style.transform=`translateX(${s}px)`,i.innerEl.style.transition="none";const r=i.innerEl.closest(".item-row-wrap");if(r){const t=r.querySelector(".swipe-bg-right"),e=r.querySelector(".swipe-bg-left");t&&t.classList.toggle("visible",s>20),e&&e.classList.toggle("visible",s<-20)}}_onPointerUp(t,e){var i,s;const o=this._swipeState.get(e);if(!o)return;const r=o.dx;this._swipeState.delete(e),o.innerEl.style.transition="transform 0.25s ease",o.innerEl.style.transform="translateX(0)";const a=o.innerEl.closest(".item-row-wrap");if(a&&(null===(i=a.querySelector(".swipe-bg-right"))||void 0===i||i.classList.remove("visible"),null===(s=a.querySelector(".swipe-bg-left"))||void 0===s||s.classList.remove("visible")),Math.abs(r)>=80){const t=r>0?this._swipeActions.right:this._swipeActions.left;t&&"none"!==t&&this._runSwipeAction(e,t)}}_cancelSwipe(t){var e,i;const s=this._swipeState.get(t);if(!s)return;this._swipeState.delete(t),s.innerEl.style.transition="transform 0.2s ease",s.innerEl.style.transform="translateX(0)";const o=s.innerEl.closest(".item-row-wrap");o&&(null===(e=o.querySelector(".swipe-bg-right"))||void 0===e||e.classList.remove("visible"),null===(i=o.querySelector(".swipe-bg-left"))||void 0===i||i.classList.remove("visible"))}render(){var t,e;if(!this._config)return F;const i=this._configuredIds();if(!i.length)return B`<ha-card><div class="no-data">No items configured</div></ha-card>`;if(this._loading)return B`<ha-card><div class="no-data">Loading…</div></ha-card>`;const s=null!==(t=yt[this._swipeActions.right])&&void 0!==t?t:yt.none,o=null!==(e=yt[this._swipeActions.left])&&void 0!==e?e:yt.none;return B`
      <ha-card>
        ${this._config.title?B`<div class="card-header"><h2>${this._config.title}</h2></div>`:F}
        <div class="item-list">
          ${i.map(t=>{const e=this._items[t];if(!e)return F;const i=!!this._adjusting[t],r=this._flash[t],a=[e.location,e.category].filter(Boolean).join(" · ");return B`
              <div class="item-row-wrap">
                ${s.label?B`
                  <div class="swipe-bg swipe-bg-right">
                    <span class="icon">${s.icon}</span>${s.label}
                  </div>`:F}
                ${o.label?B`
                  <div class="swipe-bg swipe-bg-left">
                    <span class="icon">${o.icon}</span>${o.label}
                  </div>`:F}
                <div class="item-row"
                  @pointerdown=${e=>this._onPointerDown(e,t)}
                  @pointermove=${e=>this._onPointerMove(e,t)}
                  @pointerup=${e=>this._onPointerUp(e,t)}
                  @pointercancel=${()=>this._cancelSwipe(t)}>
                  <div class="item-info">
                    <div class="item-name">${e.name}</div>
                    ${a?B`<div class="item-meta">${a}</div>`:F}
                    ${r?B`<div class="flash">${r}</div>`:F}
                  </div>
                  <div class="item-controls">
                    <button class="qty-btn" ?disabled=${i||e.quantity<=0}
                      @click=${e=>{e.stopPropagation(),this._adjust(t,-1)}}>−</button>
                    <div>
                      <div class="qty-display">${e.quantity}</div>
                      ${e.unit?B`<div class="qty-unit">${e.unit}</div>`:F}
                    </div>
                    <button class="qty-btn" ?disabled=${i}
                      @click=${e=>{e.stopPropagation(),this._adjust(t,1)}}>+</button>
                  </div>
                </div>
              </div>`})}
        </div>
        ${this._error?B`<div class="error-box">${this._error}</div>`:F}
        ${this._dialog?B`
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Deplete Item</h3>
              <div class="dialog-item">${this._dialog.itemName}</div>
              <div class="dialog-field">
                <label>Reason</label>
                <select @change=${t=>{this._dialog&&(this._dialog={...this._dialog,reason:t.target.value})}}>
                  ${this._depletionReasons.map(t=>B`
                    <option value=${t} ?selected=${t===this._dialog.reason}>${t}</option>`)}
                </select>
              </div>
              <div class="dialog-field">
                <label>Date &amp; Time</label>
                <input type="datetime-local" .value=${this._dialog.depleted_at}
                  @input=${t=>{this._dialog&&(this._dialog={...this._dialog,depleted_at:t.target.value})}} />
              </div>
              <div class="dialog-buttons">
                <button class="btn-confirm" @click=${this._confirmDeplete}>Deplete</button>
                <button class="btn-cancel"  @click=${()=>this._dialog=null}>Cancel</button>
              </div>
            </div>
          </div>`:F}
      </ha-card>
    `}static getConfigElement(){return document.createElement("pantrlytics-quick-adjust-card-editor")}static getStubConfig(){return{url:"http://homeassistant.local:8099",item_id_1:1}}};function wt(t){return t>=1048576?`${(t/1048576).toFixed(1)} MB`:t>=1024?`${Math.round(t/1024)} KB`:`${t} B`}$t.styles=a`
    :host { --pl-accent: #f97316; }
    @media (prefers-color-scheme: light) { :host { --pl-accent: #d97706; } }
    ha-card { padding: 16px; position: relative; }
    .card-header h2 { margin: 0 0 10px; font-size: 1rem; font-weight: 500; color: var(--primary-text-color); }
    .item-list { display: flex; flex-direction: column; gap: 8px; }

    /* Swipe wrapper */
    .item-row-wrap {
      position: relative; overflow: hidden;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
    }
    .swipe-bg {
      position: absolute; top: 0; bottom: 0;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      width: 80px; font-size: 10px; font-weight: 700;
      letter-spacing: 0.5px; text-transform: uppercase;
      color: #fff; gap: 4px; opacity: 0;
      transition: opacity 0.1s;
      pointer-events: none;
    }
    .swipe-bg.visible { opacity: 1; }
    .swipe-bg-right { left: 0;  background: #1864ab; border-radius: 8px 0 0 8px; }
    .swipe-bg-left  { right: 0; background: #ef4444; border-radius: 0 8px 8px 0; }
    .swipe-bg .icon { font-size: 20px; line-height: 1; }

    .item-row {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px;
      background: var(--card-background-color, #1b1d22);
      will-change: transform;
      touch-action: pan-y;
      cursor: grab;
      user-select: none;
    }
    .item-row:active { cursor: grabbing; }
    @media (pointer: coarse) { .item-row { cursor: auto; } }

    .item-info { flex: 1; min-width: 0; }
    .item-name {
      font-size: 1.05rem; font-weight: 600;
      color: var(--primary-text-color);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .item-meta { font-size: 0.75rem; color: var(--secondary-text-color); margin-top: 1px; }
    .item-controls { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .qty-btn {
      width: 32px; height: 32px; border-radius: 50%;
      border: 2px solid var(--pl-accent);
      background: transparent; color: var(--pl-accent);
      font-size: 1.2rem; font-weight: bold; cursor: pointer;
      display: flex; align-items: center; justify-content: center; line-height: 1;
    }
    .qty-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .qty-btn:hover:not(:disabled) { background: var(--pl-accent); color: white; }
    .qty-display { font-size: 1.3rem; font-weight: bold; min-width: 32px; text-align: center; color: var(--primary-text-color); }
    .qty-unit { font-size: 0.7rem; color: var(--secondary-text-color); text-align: center; }
    .flash { font-size: 0.75rem; color: #2e7d32; margin-top: 1px; }
    .error-box { padding: 8px 12px; background: rgba(183,28,28,0.1); border-radius: 6px; color: #b71c1c; font-size: 0.85rem; margin-top: 8px; }
    .no-data { color: var(--secondary-text-color); font-size: 0.9rem; text-align: center; padding: 16px 0; }

    /* Deplete dialog */
    .dialog-overlay {
      position: absolute; inset: 0; z-index: 10;
      background: rgba(0,0,0,0.55); border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
    }
    .dialog {
      background: var(--card-background-color, #1b1d22);
      border: 1px solid var(--divider-color, #2a2f36);
      border-radius: 10px; padding: 16px; width: 90%; max-width: 320px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .dialog h3 { margin: 0; font-size: 0.95rem; font-weight: 600; color: var(--primary-text-color); }
    .dialog-item { font-size: 0.85rem; color: var(--secondary-text-color); }
    .dialog label { font-size: 0.78rem; color: var(--secondary-text-color); }
    .dialog select, .dialog input[type="datetime-local"] {
      padding: 7px 10px; border: 1px solid var(--divider-color, #ccc);
      border-radius: 6px; background: var(--card-background-color, #fff);
      color: var(--primary-text-color); font-size: 0.88rem;
      width: 100%; box-sizing: border-box;
    }
    .dialog-field { display: flex; flex-direction: column; gap: 3px; }
    .dialog-buttons { display: flex; gap: 8px; margin-top: 4px; }
    .dialog-buttons button { flex: 1; padding: 8px; border: none; border-radius: 6px; font-size: 0.88rem; font-weight: 500; cursor: pointer; }
    .btn-confirm { background: #ef4444; color: white; }
    .btn-confirm:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-cancel  { background: var(--divider-color, #e0e0e0); color: var(--primary-text-color); }
  `,t([ut()],$t.prototype,"_config",void 0),t([ut()],$t.prototype,"_items",void 0),t([ut()],$t.prototype,"_swipeActions",void 0),t([ut()],$t.prototype,"_depletionReasons",void 0),t([ut()],$t.prototype,"_dialog",void 0),t([ut()],$t.prototype,"_loading",void 0),t([ut()],$t.prototype,"_adjusting",void 0),t([ut()],$t.prototype,"_flash",void 0),t([ut()],$t.prototype,"_error",void 0),$t=t([ct("pantrlytics-quick-adjust-card")],$t);let xt=class extends _t{constructor(){super(...arguments),this._config=null,this._data=null,this._error=null,this._loading=!0,this._storageOpen=!1,this._timer=null}setConfig(t){if(!t.url)throw new Error("url is required");this._config=t}connectedCallback(){var t,e;super.connectedCallback(),this._fetch();const i=1e3*(null!==(e=null===(t=this._config)||void 0===t?void 0:t.refresh_interval)&&void 0!==e?e:60);this._timer=setInterval(()=>this._fetch(),i)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _fetch(){if(this._config)try{const t=await this._apiFetch(this._config.url,"/api/health-status");if(!t.ok)throw new Error(`HTTP ${t.status}`);this._data=await t.json(),this._error=null}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}_show(t){var e;const i=null===(e=this._config)||void 0===e?void 0:e[t];return void 0===i||Boolean(i)}_ippDotClass(t){return"Reachable"===t?"dot-ok":"Not configured"===t?"dot-none":"dot-err"}render(){var t;if(!this._config)return F;if(this._loading)return B`<ha-card><div class="no-data">Loading…</div></ha-card>`;if(this._error)return B`<ha-card><div class="no-data">Error: ${this._error}</div></ha-card>`;if(!this._data)return B`<ha-card><div class="no-data">No data</div></ha-card>`;const e=this._data,i=e.storage;return B`
      <ha-card>
        <div class="card-header">
          <div class="card-header-text">
            <h2>${null!==(t=this._config.title)&&void 0!==t?t:"PantrLytics"}</h2>
            <div class="card-subtitle">App Status</div>
          </div>
          <span class="version">v${e.version}</span>
        </div>
        <div class="row-list">

          ${this._show("show_ipp")?B`
          <div class="row">
            <span class="row-label">
              <span class="status-dot ${this._ippDotClass(e.ipp_status)}"></span>IPP Printer
            </span>
            <span class="row-value">${e.ipp_status}${e.ipp_host?B` <span style="font-weight:400;font-size:0.8rem;color:var(--secondary-text-color);">(${e.ipp_host})</span>`:F}</span>
          </div>`:F}

          ${this._show("show_storage")?B`
          <div class="row storage-row ${this._storageOpen?"open":""}"
            @click=${()=>this._storageOpen=!this._storageOpen}>
            <span class="row-label">App Storage</span>
            <span class="row-value">
              ${wt(i.total)}
              <span class="chevron">▾</span>
            </span>
          </div>
          ${this._storageOpen?B`
            <div class="storage-breakdown">
              ${[["Database",i.db],["Photos",i.photos],["Backups",i.backups],["Other",i.other]].map(([t,e])=>B`
                <div class="breakdown-row">
                  <span>${t}</span>
                  <span>${wt(e)}</span>
                </div>`)}
            </div>`:F}`:F}

          ${this._show("show_items")?B`
          <div class="row">
            <span class="row-label">Active Items</span>
            <span class="row-value">${e.active_items}
              <span style="font-weight:400;font-size:0.8rem;color:var(--secondary-text-color);">/ ${e.total_items} total</span>
            </span>
          </div>`:F}

        </div>
      </ha-card>
    `}static getConfigElement(){return document.createElement("pantrlytics-status-card-editor")}static getStubConfig(){return{url:"http://homeassistant.local:8099"}}};function At(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value}}))}xt.styles=a`
    :host { --pl-accent: #f97316; }
    @media (prefers-color-scheme: light) { :host { --pl-accent: #d97706; } }
    ha-card { padding: 16px; }
    .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .card-header-text h2 { margin: 0; font-size: 1rem; font-weight: 600; color: var(--primary-text-color); line-height: 1.2; }
    .card-subtitle { font-size: 0.75rem; color: var(--secondary-text-color); margin-top: 2px; }
    .version { font-size: 0.75rem; color: var(--secondary-text-color); white-space: nowrap; padding-top: 2px; }
    .row-list { display: flex; flex-direction: column; gap: 6px; }
    .row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 12px; border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      font-size: 0.88rem;
    }
    .row-label { color: var(--secondary-text-color); }
    .row-value { font-weight: 500; color: var(--primary-text-color); }
    .status-dot {
      display: inline-block; width: 8px; height: 8px;
      border-radius: 50%; margin-right: 6px; flex-shrink: 0;
    }
    .dot-ok         { background: #2e7d32; }
    .dot-warn       { background: #e65100; }
    .dot-err        { background: #b71c1c; }
    .dot-none       { background: var(--secondary-text-color); }
    .storage-row { cursor: pointer; user-select: none; }
    .storage-row .chevron {
      font-size: 0.8rem; margin-left: 4px;
      display: inline-block; transition: transform 0.2s ease;
    }
    .storage-row.open .chevron { transform: rotate(180deg); }
    .storage-breakdown {
      margin-top: 4px; padding: 6px 12px;
      border-radius: 0 0 8px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-top: none;
      display: flex; flex-direction: column; gap: 4px;
    }
    .breakdown-row { display: flex; justify-content: space-between; font-size: 0.8rem; }
    .breakdown-row span:first-child { color: var(--secondary-text-color); }
    .breakdown-row span:last-child  { color: var(--primary-text-color); font-weight: 500; }
    .no-data { color: var(--secondary-text-color); font-size: 0.9rem; text-align: center; padding: 16px 0; }
  `,t([ut()],xt.prototype,"_config",void 0),t([ut()],xt.prototype,"_data",void 0),t([ut()],xt.prototype,"_error",void 0),t([ut()],xt.prototype,"_loading",void 0),t([ut()],xt.prototype,"_storageOpen",void 0),xt=t([ct("pantrlytics-status-card")],xt);let kt=class extends nt{constructor(){super(...arguments),this._schema=[{name:"url",label:"PantrLytics URL",required:!0,selector:{text:{}}},{name:"title",label:"Card title (optional)",selector:{text:{}}},{name:"refresh_interval",label:"Refresh interval (seconds)",selector:{number:{min:30,max:3600,step:30,mode:"box"}}}]}setConfig(t){this._config=t}render(){return this._config&&this.hass?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.label}
        @value-changed=${At.bind(this)}
      ></ha-form>
    `:B``}};t([pt({attribute:!1})],kt.prototype,"hass",void 0),t([pt({attribute:!1})],kt.prototype,"_config",void 0),kt=t([ct("pantrlytics-stats-card-editor")],kt);let Et=class extends nt{constructor(){super(...arguments),this._schema=[{name:"url",label:"PantrLytics URL",required:!0,selector:{text:{}}},{name:"title",label:"Card title (optional)",selector:{text:{}}},{name:"days",label:"Days ahead to show",selector:{number:{min:1,max:90,step:1,mode:"box"}}},{name:"max_items",label:"Max items to show",selector:{number:{min:1,max:50,step:1,mode:"box"}}},{name:"refresh_interval",label:"Refresh interval (seconds)",selector:{number:{min:30,max:3600,step:30,mode:"box"}}}]}setConfig(t){this._config=t}render(){return this._config&&this.hass?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.label}
        @value-changed=${At.bind(this)}
      ></ha-form>
    `:B``}};t([pt({attribute:!1})],Et.prototype,"hass",void 0),t([pt({attribute:!1})],Et.prototype,"_config",void 0),Et=t([ct("pantrlytics-expiring-card-editor")],Et);let Ct=class extends nt{constructor(){super(...arguments),this._schema=[{name:"url",label:"PantrLytics URL",required:!0,selector:{text:{}}},{name:"title",label:"Card title (optional)",selector:{text:{}}},{name:"refresh_interval",label:"Refresh interval (seconds)",selector:{number:{min:30,max:3600,step:30,mode:"box"}}}]}setConfig(t){this._config=t}render(){return this._config&&this.hass?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.label}
        @value-changed=${At.bind(this)}
      ></ha-form>
    `:B``}};t([pt({attribute:!1})],Ct.prototype,"hass",void 0),t([pt({attribute:!1})],Ct.prototype,"_config",void 0),Ct=t([ct("pantrlytics-reports-card-editor")],Ct);let St=class extends nt{constructor(){super(...arguments),this._schema=[{name:"url",label:"PantrLytics URL",required:!0,selector:{text:{}}},{name:"title",label:"Card title (optional)",selector:{text:{}}},{type:"expandable",title:"Fields to show",schema:[{name:"show_category",label:"Category",selector:{boolean:{}}},{name:"show_tags",label:"Tags",selector:{boolean:{}}},{name:"show_location",label:"Location",selector:{boolean:{}}},{name:"show_bin",label:"Bin #",selector:{boolean:{}}},{name:"show_quantity",label:"Quantity",selector:{boolean:{}}},{name:"show_unit",label:"Unit",selector:{boolean:{}}},{name:"show_condition",label:"Condition",selector:{boolean:{}}},{name:"show_origin_date",label:"Origin Date",selector:{boolean:{}}},{name:"show_use_by_date",label:"Use-by Date",selector:{boolean:{}}},{name:"show_use_within",label:"Use Within",selector:{boolean:{}}},{name:"show_review_window",label:"Review Window",selector:{boolean:{}}},{name:"show_notes",label:"Notes",selector:{boolean:{}}}]}]}setConfig(t){this._config=t}render(){return this._config&&this.hass?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.label}
        @value-changed=${At.bind(this)}
      ></ha-form>
    `:B``}};t([pt({attribute:!1})],St.prototype,"hass",void 0),t([pt({attribute:!1})],St.prototype,"_config",void 0),St=t([ct("pantrlytics-quick-add-card-editor")],St);let Pt=class extends nt{constructor(){super(...arguments),this._schema=[{name:"url",label:"PantrLytics URL",required:!0,selector:{text:{}}},{name:"title",label:"Card title (app name, optional)",selector:{text:{}}},{name:"refresh_interval",label:"Refresh interval (seconds)",selector:{number:{min:30,max:3600,step:30,mode:"box"}}},{type:"expandable",title:"Rows to show",schema:[{name:"show_ipp",label:"IPP Printer status",selector:{boolean:{}}},{name:"show_storage",label:"App Storage",selector:{boolean:{}}},{name:"show_items",label:"Active / Total Items",selector:{boolean:{}}}]}]}setConfig(t){this._config=t}render(){return this._config&&this.hass?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.label}
        @value-changed=${At.bind(this)}
      ></ha-form>
    `:B``}};t([pt({attribute:!1})],Pt.prototype,"hass",void 0),t([pt({attribute:!1})],Pt.prototype,"_config",void 0),Pt=t([ct("pantrlytics-status-card-editor")],Pt);let Dt=class extends nt{constructor(){super(...arguments),this._schema=[{name:"url",label:"PantrLytics URL",required:!0,selector:{text:{}}},{name:"title",label:"Card title (optional)",selector:{text:{}}},{type:"expandable",title:"Items (up to 10)",schema:[{name:"item_id_1",label:"Item 1 ID",selector:{number:{min:1,step:1,mode:"box"}}},{name:"item_id_2",label:"Item 2 ID",selector:{number:{min:1,step:1,mode:"box"}}},{name:"item_id_3",label:"Item 3 ID",selector:{number:{min:1,step:1,mode:"box"}}},{name:"item_id_4",label:"Item 4 ID",selector:{number:{min:1,step:1,mode:"box"}}},{name:"item_id_5",label:"Item 5 ID",selector:{number:{min:1,step:1,mode:"box"}}},{name:"item_id_6",label:"Item 6 ID",selector:{number:{min:1,step:1,mode:"box"}}},{name:"item_id_7",label:"Item 7 ID",selector:{number:{min:1,step:1,mode:"box"}}},{name:"item_id_8",label:"Item 8 ID",selector:{number:{min:1,step:1,mode:"box"}}},{name:"item_id_9",label:"Item 9 ID",selector:{number:{min:1,step:1,mode:"box"}}},{name:"item_id_10",label:"Item 10 ID",selector:{number:{min:1,step:1,mode:"box"}}}]}]}setConfig(t){this._config=t}render(){return this._config&&this.hass?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${t=>t.label}
        @value-changed=${At.bind(this)}
      ></ha-form>
    `:B``}};var qt,zt;t([pt({attribute:!1})],Dt.prototype,"hass",void 0),t([pt({attribute:!1})],Dt.prototype,"_config",void 0),Dt=t([ct("pantrlytics-quick-adjust-card-editor")],Dt),null!==(qt=(zt=window).customCards)&&void 0!==qt||(zt.customCards=[]),window.customCards.push({type:"pantrlytics-reports-card",name:"PantrLytics Reports",description:"Inventory health score and action items",preview:!1,configurable:!0},{type:"pantrlytics-stats-card",name:"PantrLytics Stats",description:"Quick inventory statistics",preview:!1,configurable:!0},{type:"pantrlytics-expiring-card",name:"PantrLytics Expiring Items",description:"Items nearing their use-by date",preview:!1,configurable:!0},{type:"pantrlytics-quick-add-card",name:"PantrLytics Quick Add",description:"Add a new item to inventory",preview:!1,configurable:!0},{type:"pantrlytics-quick-adjust-card",name:"PantrLytics Quick Adjust",description:"Adjust quantity for a single item",preview:!1,configurable:!0},{type:"pantrlytics-status-card",name:"PantrLytics Status",description:"App health: IPP connectivity, storage breakdown, item counts",preview:!1,configurable:!0});
