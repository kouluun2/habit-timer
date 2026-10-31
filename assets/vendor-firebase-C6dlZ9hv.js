import{o as Tp,_ as Ae,R as da}from"./vendor-DiAiI4Y5.js";const Ip=()=>{};var Pu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zl=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},vp=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},eh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,l=s+2<n.length,f=l?n[s+2]:0,p=i>>2,m=(i&3)<<4|c>>4;let R=(c&15)<<2|f>>6,C=f&63;l||(C=64,a||(R=64)),r.push(t[p],t[m],t[R],t[C])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Zl(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):vp(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const f=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||f==null||m==null)throw new Ap;const R=i<<2|c>>4;if(r.push(R),f!==64){const C=c<<4&240|f>>2;if(r.push(C),m!==64){const x=f<<6&192|m;r.push(x)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ap extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const bp=function(n){const e=Zl(n);return eh.encodeByteArray(e,!0)},pi=function(n){return bp(n).replace(/\./g,"")},th=function(n){try{return eh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pp=()=>Rp().__FIREBASE_DEFAULTS__,Vp=()=>{if(typeof process>"u"||typeof Pu>"u")return;const n=Pu.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Sp=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&th(n[1]);return e&&JSON.parse(e)},Ui=()=>{try{return Ip()||Pp()||Vp()||Sp()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},nh=n=>Ui()?.emulatorHosts?.[n],Cp=n=>{const e=nh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},rh=()=>Ui()?.config,sh=n=>Ui()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Np(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[pi(JSON.stringify(t)),pi(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function kp(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(xe())}function Dp(){const n=Ui()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Op(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Lp(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Mp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Up(){const n=xe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Fp(){return!Dp()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Bp(){try{return typeof indexedDB=="object"}catch{return!1}}function qp(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $p="FirebaseError";class Nt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=$p,Object.setPrototypeOf(this,Nt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,_s.prototype.create)}}class _s{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?jp(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new Nt(s,c,r)}}function jp(n,e){try{let t=0,r="";for(;t<n.length;){const s=n.indexOf("{$",t);if(s===-1){r+=n.substring(t);break}const i=n.indexOf("}",s+2);if(i===-1){r+=n.substring(t);break}const a=n.substring(s+2,i),c=e[a];r+=n.substring(t,s)+(c!=null?String(c):`<${a}?>`),t=i+1}return r}catch{return n}}function zp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function An(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Vu(i)&&Vu(a)){if(!An(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Vu(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ys(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Gp(n,e){const t=new Hp(n,e);return t.subscribe.bind(t)}class Hp{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Wp(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=No),s.error===void 0&&(s.error=No),s.complete===void 0&&(s.complete=No);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Wp(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function No(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Es(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ih(n){return(await fetch(n,{credentials:"include"})).ok}class bn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kp{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new xp;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Jp(e))try{this.getOrInitializeService({instanceIdentifier:mn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=mn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=mn){return this.instances.has(e)}getOptions(e=mn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Qp(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=mn){return this.component?this.component.multipleInstances?e:mn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Qp(n){return n===mn?void 0:n}function Jp(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yp{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Kp(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Y;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Y||(Y={}));const Xp={debug:Y.DEBUG,verbose:Y.VERBOSE,info:Y.INFO,warn:Y.WARN,error:Y.ERROR,silent:Y.SILENT},Zp=Y.INFO,em={[Y.DEBUG]:"log",[Y.VERBOSE]:"log",[Y.INFO]:"info",[Y.WARN]:"warn",[Y.ERROR]:"error"},tm=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=em[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class pa{constructor(e){this.name=e,this._logLevel=Zp,this._logHandler=tm,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Xp[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Y.DEBUG,...e),this._logHandler(this,Y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Y.VERBOSE,...e),this._logHandler(this,Y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Y.INFO,...e),this._logHandler(this,Y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Y.WARN,...e),this._logHandler(this,Y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Y.ERROR,...e),this._logHandler(this,Y.ERROR,...e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(rm(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function rm(n){return n.getComponent()?.type==="VERSION"}const jo="@firebase/app",Su="0.16.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt=new pa("@firebase/app"),sm="@firebase/app-compat",im="@firebase/analytics-compat",om="@firebase/analytics",am="@firebase/app-check-compat",cm="@firebase/app-check",um="@firebase/auth",lm="@firebase/auth-compat",hm="@firebase/database",fm="@firebase/data-connect",dm="@firebase/database-compat",pm="@firebase/functions",mm="@firebase/functions-compat",gm="@firebase/installations",_m="@firebase/installations-compat",ym="@firebase/messaging",Em="@firebase/messaging-compat",wm="@firebase/performance",Tm="@firebase/performance-compat",Im="@firebase/remote-config",vm="@firebase/remote-config-compat",Am="@firebase/storage",bm="@firebase/storage-compat",Rm="@firebase/firestore",Pm="@firebase/ai",Vm="@firebase/firestore-compat",Sm="firebase",Cm="13.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zo="[DEFAULT]",xm={[jo]:"fire-core",[sm]:"fire-core-compat",[om]:"fire-analytics",[im]:"fire-analytics-compat",[cm]:"fire-app-check",[am]:"fire-app-check-compat",[um]:"fire-auth",[lm]:"fire-auth-compat",[hm]:"fire-rtdb",[fm]:"fire-data-connect",[dm]:"fire-rtdb-compat",[pm]:"fire-fn",[mm]:"fire-fn-compat",[gm]:"fire-iid",[_m]:"fire-iid-compat",[ym]:"fire-fcm",[Em]:"fire-fcm-compat",[wm]:"fire-perf",[Tm]:"fire-perf-compat",[Im]:"fire-rc",[vm]:"fire-rc-compat",[Am]:"fire-gcs",[bm]:"fire-gcs-compat",[Rm]:"fire-fst",[Vm]:"fire-fst-compat",[Pm]:"fire-vertex","fire-js":"fire-js",[Sm]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wr=new Map,Nm=new Map,Go=new Map;function Cu(n,e){try{n.container.addComponent(e)}catch(t){Rt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Xn(n){const e=n.name;if(Go.has(e))return Rt.debug(`There were multiple attempts to register component ${e}.`),!1;Go.set(e,n);for(const t of Wr.values())Cu(t,n);for(const t of Nm.values())Cu(t,n);return!0}function ma(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function tt(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const km={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Et=new _s("app","Firebase",km);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dm{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new bn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Et.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ar=Cm;function Om(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:zo,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Et.create("bad-app-name",{appName:String(s)});if(t||(t=rh()),!t)throw Et.create("no-options");const i=Wr.get(s);if(i)if(An(t,i.options)){if(An(r,i.config))return i;throw Et.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(r)})}else throw Et.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(t)});const a=new Yp(s);for(const l of Go.values())a.addComponent(l);const c=new Dm(t,r,a);return Wr.set(s,c),c}function oh(n=zo){const e=Wr.get(n);if(!e&&n===zo&&rh())return Om();if(!e)throw Et.create("no-app",{appName:n});return e}function G0(){return Array.from(Wr.values())}function Ht(n,e,t){let r=xm[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Rt.warn(a.join(" "));return}Xn(new bn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lm="firebase-heartbeat-database",Mm=1,Kr="firebase-heartbeat-store";let ko=null;function ah(){return ko||(ko=Tp(Lm,Mm,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Kr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Et.create("idb-open",{originalErrorMessage:n.message})})),ko}async function Um(n){try{const t=(await ah()).transaction(Kr),r=await t.objectStore(Kr).get(ch(n));return await t.done,r}catch(e){if(e instanceof Nt)Rt.warn(e.message);else{const t=Et.create("idb-get",{originalErrorMessage:e?.message});Rt.warn(t.message)}}}async function xu(n,e){try{const r=(await ah()).transaction(Kr,"readwrite");await r.objectStore(Kr).put(e,ch(n)),await r.done}catch(t){if(t instanceof Nt)Rt.warn(t.message);else{const r=Et.create("idb-set",{originalErrorMessage:t?.message});Rt.warn(r.message)}}}function ch(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fm=1024,Bm=30;class qm{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new jm(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Nu();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>Bm){const s=zm(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Rt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Nu(),{heartbeatsToSend:t,unsentEntries:r}=$m(this._heartbeatsCache.heartbeats),s=pi(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Rt.warn(e),""}}}function Nu(){return new Date().toISOString().substring(0,10)}function $m(n,e=Fm){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),ku(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),ku(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class jm{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Bp()?qp().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Um(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return xu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return xu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function ku(n){return pi(JSON.stringify({version:2,heartbeats:n})).length}function zm(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gm(n){Xn(new bn("platform-logger",e=>new nm(e),"PRIVATE")),Xn(new bn("heartbeat",e=>new qm(e),"PRIVATE")),Ht(jo,Su,n),Ht(jo,Su,"esm2020"),Ht("fire-js","")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Gm("");var Hm="firebase",Wm="13.1.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ht(Hm,Wm,"app");var Du=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Wt,uh;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,g){function y(){}y.prototype=g.prototype,T.F=g.prototype,T.prototype=new y,T.prototype.constructor=T,T.D=function(I,w,A){for(var _=Array(arguments.length-2),Le=2;Le<arguments.length;Le++)_[Le-2]=arguments[Le];return g.prototype[w].apply(I,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,g,y){y||(y=0);const I=Array(16);if(typeof g=="string")for(var w=0;w<16;++w)I[w]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(w=0;w<16;++w)I[w]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=T.g[0],y=T.g[1],w=T.g[2];let A=T.g[3],_;_=g+(A^y&(w^A))+I[0]+3614090360&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(w^g&(y^w))+I[1]+3905402710&4294967295,A=g+(_<<12&4294967295|_>>>20),_=w+(y^A&(g^y))+I[2]+606105819&4294967295,w=A+(_<<17&4294967295|_>>>15),_=y+(g^w&(A^g))+I[3]+3250441966&4294967295,y=w+(_<<22&4294967295|_>>>10),_=g+(A^y&(w^A))+I[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(w^g&(y^w))+I[5]+1200080426&4294967295,A=g+(_<<12&4294967295|_>>>20),_=w+(y^A&(g^y))+I[6]+2821735955&4294967295,w=A+(_<<17&4294967295|_>>>15),_=y+(g^w&(A^g))+I[7]+4249261313&4294967295,y=w+(_<<22&4294967295|_>>>10),_=g+(A^y&(w^A))+I[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(w^g&(y^w))+I[9]+2336552879&4294967295,A=g+(_<<12&4294967295|_>>>20),_=w+(y^A&(g^y))+I[10]+4294925233&4294967295,w=A+(_<<17&4294967295|_>>>15),_=y+(g^w&(A^g))+I[11]+2304563134&4294967295,y=w+(_<<22&4294967295|_>>>10),_=g+(A^y&(w^A))+I[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(w^g&(y^w))+I[13]+4254626195&4294967295,A=g+(_<<12&4294967295|_>>>20),_=w+(y^A&(g^y))+I[14]+2792965006&4294967295,w=A+(_<<17&4294967295|_>>>15),_=y+(g^w&(A^g))+I[15]+1236535329&4294967295,y=w+(_<<22&4294967295|_>>>10),_=g+(w^A&(y^w))+I[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^w&(g^y))+I[6]+3225465664&4294967295,A=g+(_<<9&4294967295|_>>>23),_=w+(g^y&(A^g))+I[11]+643717713&4294967295,w=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(w^A))+I[0]+3921069994&4294967295,y=w+(_<<20&4294967295|_>>>12),_=g+(w^A&(y^w))+I[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^w&(g^y))+I[10]+38016083&4294967295,A=g+(_<<9&4294967295|_>>>23),_=w+(g^y&(A^g))+I[15]+3634488961&4294967295,w=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(w^A))+I[4]+3889429448&4294967295,y=w+(_<<20&4294967295|_>>>12),_=g+(w^A&(y^w))+I[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^w&(g^y))+I[14]+3275163606&4294967295,A=g+(_<<9&4294967295|_>>>23),_=w+(g^y&(A^g))+I[3]+4107603335&4294967295,w=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(w^A))+I[8]+1163531501&4294967295,y=w+(_<<20&4294967295|_>>>12),_=g+(w^A&(y^w))+I[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^w&(g^y))+I[2]+4243563512&4294967295,A=g+(_<<9&4294967295|_>>>23),_=w+(g^y&(A^g))+I[7]+1735328473&4294967295,w=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(w^A))+I[12]+2368359562&4294967295,y=w+(_<<20&4294967295|_>>>12),_=g+(y^w^A)+I[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^w)+I[8]+2272392833&4294967295,A=g+(_<<11&4294967295|_>>>21),_=w+(A^g^y)+I[11]+1839030562&4294967295,w=A+(_<<16&4294967295|_>>>16),_=y+(w^A^g)+I[14]+4259657740&4294967295,y=w+(_<<23&4294967295|_>>>9),_=g+(y^w^A)+I[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^w)+I[4]+1272893353&4294967295,A=g+(_<<11&4294967295|_>>>21),_=w+(A^g^y)+I[7]+4139469664&4294967295,w=A+(_<<16&4294967295|_>>>16),_=y+(w^A^g)+I[10]+3200236656&4294967295,y=w+(_<<23&4294967295|_>>>9),_=g+(y^w^A)+I[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^w)+I[0]+3936430074&4294967295,A=g+(_<<11&4294967295|_>>>21),_=w+(A^g^y)+I[3]+3572445317&4294967295,w=A+(_<<16&4294967295|_>>>16),_=y+(w^A^g)+I[6]+76029189&4294967295,y=w+(_<<23&4294967295|_>>>9),_=g+(y^w^A)+I[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^w)+I[12]+3873151461&4294967295,A=g+(_<<11&4294967295|_>>>21),_=w+(A^g^y)+I[15]+530742520&4294967295,w=A+(_<<16&4294967295|_>>>16),_=y+(w^A^g)+I[2]+3299628645&4294967295,y=w+(_<<23&4294967295|_>>>9),_=g+(w^(y|~A))+I[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~w))+I[7]+1126891415&4294967295,A=g+(_<<10&4294967295|_>>>22),_=w+(g^(A|~y))+I[14]+2878612391&4294967295,w=A+(_<<15&4294967295|_>>>17),_=y+(A^(w|~g))+I[5]+4237533241&4294967295,y=w+(_<<21&4294967295|_>>>11),_=g+(w^(y|~A))+I[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~w))+I[3]+2399980690&4294967295,A=g+(_<<10&4294967295|_>>>22),_=w+(g^(A|~y))+I[10]+4293915773&4294967295,w=A+(_<<15&4294967295|_>>>17),_=y+(A^(w|~g))+I[1]+2240044497&4294967295,y=w+(_<<21&4294967295|_>>>11),_=g+(w^(y|~A))+I[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~w))+I[15]+4264355552&4294967295,A=g+(_<<10&4294967295|_>>>22),_=w+(g^(A|~y))+I[6]+2734768916&4294967295,w=A+(_<<15&4294967295|_>>>17),_=y+(A^(w|~g))+I[13]+1309151649&4294967295,y=w+(_<<21&4294967295|_>>>11),_=g+(w^(y|~A))+I[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~w))+I[11]+3174756917&4294967295,A=g+(_<<10&4294967295|_>>>22),_=w+(g^(A|~y))+I[2]+718787259&4294967295,w=A+(_<<15&4294967295|_>>>17),_=y+(A^(w|~g))+I[9]+3951481745&4294967295,T.g[0]=T.g[0]+g&4294967295,T.g[1]=T.g[1]+(w+(_<<21&4294967295|_>>>11))&4294967295,T.g[2]=T.g[2]+w&4294967295,T.g[3]=T.g[3]+A&4294967295}r.prototype.v=function(T,g){g===void 0&&(g=T.length);const y=g-this.blockSize,I=this.C;let w=this.h,A=0;for(;A<g;){if(w==0)for(;A<=y;)s(this,T,A),A+=this.blockSize;if(typeof T=="string"){for(;A<g;)if(I[w++]=T.charCodeAt(A++),w==this.blockSize){s(this,I),w=0;break}}else for(;A<g;)if(I[w++]=T[A++],w==this.blockSize){s(this,I),w=0;break}}this.h=w,this.o+=g},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var g=1;g<T.length-8;++g)T[g]=0;g=this.o*8;for(var y=T.length-8;y<T.length;++y)T[y]=g&255,g/=256;for(this.v(T),T=Array(16),g=0,y=0;y<4;++y)for(let I=0;I<32;I+=8)T[g++]=this.g[y]>>>I&255;return T};function i(T,g){var y=c;return Object.prototype.hasOwnProperty.call(y,T)?y[T]:y[T]=g(T)}function a(T,g){this.h=g;const y=[];let I=!0;for(let w=T.length-1;w>=0;w--){const A=T[w]|0;I&&A==g||(y[w]=A,I=!1)}this.g=y}var c={};function l(T){return-128<=T&&T<128?i(T,function(g){return new a([g|0],g<0?-1:0)}):new a([T|0],T<0?-1:0)}function f(T){if(isNaN(T)||!isFinite(T))return m;if(T<0)return L(f(-T));const g=[];let y=1;for(let I=0;T>=y;I++)g[I]=T/y|0,y*=4294967296;return new a(g,0)}function p(T,g){if(T.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(T.charAt(0)=="-")return L(p(T.substring(1),g));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=f(Math.pow(g,8));let I=m;for(let A=0;A<T.length;A+=8){var w=Math.min(8,T.length-A);const _=parseInt(T.substring(A,A+w),g);w<8?(w=f(Math.pow(g,w)),I=I.j(w).add(f(_))):(I=I.j(y),I=I.add(f(_)))}return I}var m=l(0),R=l(1),C=l(16777216);n=a.prototype,n.m=function(){if(M(this))return-L(this).m();let T=0,g=1;for(let y=0;y<this.g.length;y++){const I=this.i(y);T+=(I>=0?I:4294967296+I)*g,g*=4294967296}return T},n.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(x(this))return"0";if(M(this))return"-"+L(this).toString(T);const g=f(Math.pow(T,6));var y=this;let I="";for(;;){const w=Oe(y,g).g;y=W(y,w.j(g));let A=((y.g.length>0?y.g[0]:y.h)>>>0).toString(T);if(y=w,x(y))return A+I;for(;A.length<6;)A="0"+A;I=A+I}},n.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function x(T){if(T.h!=0)return!1;for(let g=0;g<T.g.length;g++)if(T.g[g]!=0)return!1;return!0}function M(T){return T.h==-1}n.l=function(T){return T=W(this,T),M(T)?-1:x(T)?0:1};function L(T){const g=T.g.length,y=[];for(let I=0;I<g;I++)y[I]=~T.g[I];return new a(y,~T.h).add(R)}n.abs=function(){return M(this)?L(this):this},n.add=function(T){const g=Math.max(this.g.length,T.g.length),y=[];let I=0;for(let w=0;w<=g;w++){let A=I+(this.i(w)&65535)+(T.i(w)&65535),_=(A>>>16)+(this.i(w)>>>16)+(T.i(w)>>>16);I=_>>>16,A&=65535,_&=65535,y[w]=_<<16|A}return new a(y,y[y.length-1]&-2147483648?-1:0)};function W(T,g){return T.add(L(g))}n.j=function(T){if(x(this)||x(T))return m;if(M(this))return M(T)?L(this).j(L(T)):L(L(this).j(T));if(M(T))return L(this.j(L(T)));if(this.l(C)<0&&T.l(C)<0)return f(this.m()*T.m());const g=this.g.length+T.g.length,y=[];for(var I=0;I<2*g;I++)y[I]=0;for(I=0;I<this.g.length;I++)for(let w=0;w<T.g.length;w++){const A=this.i(I)>>>16,_=this.i(I)&65535,Le=T.i(w)>>>16,un=T.i(w)&65535;y[2*I+2*w]+=_*un,ee(y,2*I+2*w),y[2*I+2*w+1]+=A*un,ee(y,2*I+2*w+1),y[2*I+2*w+1]+=_*Le,ee(y,2*I+2*w+1),y[2*I+2*w+2]+=A*Le,ee(y,2*I+2*w+2)}for(T=0;T<g;T++)y[T]=y[2*T+1]<<16|y[2*T];for(T=g;T<2*g;T++)y[T]=0;return new a(y,0)};function ee(T,g){for(;(T[g]&65535)!=T[g];)T[g+1]+=T[g]>>>16,T[g]&=65535,g++}function ae(T,g){this.g=T,this.h=g}function Oe(T,g){if(x(g))throw Error("division by zero");if(x(T))return new ae(m,m);if(M(T))return g=Oe(L(T),g),new ae(L(g.g),L(g.h));if(M(g))return g=Oe(T,L(g)),new ae(L(g.g),g.h);if(T.g.length>30){if(M(T)||M(g))throw Error("slowDivide_ only works with positive integers.");for(var y=R,I=g;I.l(T)<=0;)y=et(y),I=et(I);var w=ve(y,1),A=ve(I,1);for(I=ve(I,2),y=ve(y,2);!x(I);){var _=A.add(I);_.l(T)<=0&&(w=w.add(y),A=_),I=ve(I,1),y=ve(y,1)}return g=W(T,w.j(g)),new ae(w,g)}for(w=m;T.l(g)>=0;){for(y=Math.max(1,Math.floor(T.m()/g.m())),I=Math.ceil(Math.log(y)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),A=f(y),_=A.j(g);M(_)||_.l(T)>0;)y-=I,A=f(y),_=A.j(g);x(A)&&(A=R),w=w.add(A),T=W(T,_)}return new ae(w,T)}n.B=function(T){return Oe(this,T).h},n.and=function(T){const g=Math.max(this.g.length,T.g.length),y=[];for(let I=0;I<g;I++)y[I]=this.i(I)&T.i(I);return new a(y,this.h&T.h)},n.or=function(T){const g=Math.max(this.g.length,T.g.length),y=[];for(let I=0;I<g;I++)y[I]=this.i(I)|T.i(I);return new a(y,this.h|T.h)},n.xor=function(T){const g=Math.max(this.g.length,T.g.length),y=[];for(let I=0;I<g;I++)y[I]=this.i(I)^T.i(I);return new a(y,this.h^T.h)};function et(T){const g=T.g.length+1,y=[];for(let I=0;I<g;I++)y[I]=T.i(I)<<1|T.i(I-1)>>>31;return new a(y,T.h)}function ve(T,g){const y=g>>5;g%=32;const I=T.g.length-y,w=[];for(let A=0;A<I;A++)w[A]=g>0?T.i(A+y)>>>g|T.i(A+y+1)<<32-g:T.i(A+y);return new a(w,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,uh=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=p,Wt=a}).apply(typeof Du<"u"?Du:typeof self<"u"?self:typeof window<"u"?window:{});var Qs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var lh,Dr,hh,ni,Ho,fh,dh,ph;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Qs=="object"&&Qs];for(var u=0;u<o.length;++u){var h=o[u];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,u){if(u)e:{var h=r;o=o.split(".");for(var d=0;d<o.length-1;d++){var v=o[d];if(!(v in h))break e;h=h[v]}o=o[o.length-1],d=h[o],u=u(d),u!=d&&u!=null&&e(h,o,{configurable:!0,writable:!0,value:u})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(u){var h=[],d;for(d in u)Object.prototype.hasOwnProperty.call(u,d)&&h.push([d,u[d]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function c(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function l(o,u,h){return o.call.apply(o.bind,arguments)}function f(o,u,h){return f=l,f.apply(null,arguments)}function p(o,u){var h=Array.prototype.slice.call(arguments,1);return function(){var d=h.slice();return d.push.apply(d,arguments),o.apply(this,d)}}function m(o,u){function h(){}h.prototype=u.prototype,o.Z=u.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(d,v,b){for(var k=Array(arguments.length-2),K=2;K<arguments.length;K++)k[K-2]=arguments[K];return u.prototype[v].apply(d,k)}}var R=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function C(o){const u=o.length;if(u>0){const h=Array(u);for(let d=0;d<u;d++)h[d]=o[d];return h}return[]}function x(o,u){for(let d=1;d<arguments.length;d++){const v=arguments[d];var h=typeof v;if(h=h!="object"?h:v?Array.isArray(v)?"array":h:"null",h=="array"||h=="object"&&typeof v.length=="number"){h=o.length||0;const b=v.length||0;o.length=h+b;for(let k=0;k<b;k++)o[h+k]=v[k]}else o.push(v)}}class M{constructor(u,h){this.i=u,this.j=h,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function L(o){a.setTimeout(()=>{throw o},0)}function W(){var o=T;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class ee{constructor(){this.h=this.g=null}add(u,h){const d=ae.get();d.set(u,h),this.h?this.h.next=d:this.g=d,this.h=d}}var ae=new M(()=>new Oe,o=>o.reset());class Oe{constructor(){this.next=this.g=this.h=null}set(u,h){this.h=u,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let et,ve=!1,T=new ee,g=()=>{const o=Promise.resolve(void 0);et=()=>{o.then(y)}};function y(){for(var o;o=W();){try{o.h.call(o.g)}catch(h){L(h)}var u=ae;u.j(o),u.h<100&&(u.h++,o.next=u.g,u.g=o)}ve=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var A=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,u),a.removeEventListener("test",h,u)}catch{}return o}();function _(o){return/^[\s\xa0]*$/.test(o)}function Le(o,u){w.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,u)}m(Le,w),Le.prototype.init=function(o,u){const h=this.type=o.type,d=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget,u||(h=="mouseover"?u=o.fromElement:h=="mouseout"&&(u=o.toElement)),this.relatedTarget=u,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&Le.Z.h.call(this)},Le.prototype.h=function(){Le.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var un="closure_listenable_"+(Math.random()*1e6|0),jd=0;function zd(o,u,h,d,v){this.listener=o,this.proxy=null,this.src=u,this.type=h,this.capture=!!d,this.ha=v,this.key=++jd,this.da=this.fa=!1}function Ds(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Os(o,u,h){for(const d in o)u.call(h,o[d],d,o)}function Gd(o,u){for(const h in o)u.call(void 0,o[h],h,o)}function Rc(o){const u={};for(const h in o)u[h]=o[h];return u}const Pc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Vc(o,u){let h,d;for(let v=1;v<arguments.length;v++){d=arguments[v];for(h in d)o[h]=d[h];for(let b=0;b<Pc.length;b++)h=Pc[b],Object.prototype.hasOwnProperty.call(d,h)&&(o[h]=d[h])}}function Ls(o){this.src=o,this.g={},this.h=0}Ls.prototype.add=function(o,u,h,d,v){const b=o.toString();o=this.g[b],o||(o=this.g[b]=[],this.h++);const k=co(o,u,d,v);return k>-1?(u=o[k],h||(u.fa=!1)):(u=new zd(u,this.src,b,!!d,v),u.fa=h,o.push(u)),u};function ao(o,u){const h=u.type;if(h in o.g){var d=o.g[h],v=Array.prototype.indexOf.call(d,u,void 0),b;(b=v>=0)&&Array.prototype.splice.call(d,v,1),b&&(Ds(u),o.g[h].length==0&&(delete o.g[h],o.h--))}}function co(o,u,h,d){for(let v=0;v<o.length;++v){const b=o[v];if(!b.da&&b.listener==u&&b.capture==!!h&&b.ha==d)return v}return-1}var uo="closure_lm_"+(Math.random()*1e6|0),lo={};function Sc(o,u,h,d,v){if(Array.isArray(u)){for(let b=0;b<u.length;b++)Sc(o,u[b],h,d,v);return null}return h=Nc(h),o&&o[un]?o.J(u,h,c(d)?!!d.capture:!1,v):Hd(o,u,h,!1,d,v)}function Hd(o,u,h,d,v,b){if(!u)throw Error("Invalid event type");const k=c(v)?!!v.capture:!!v;let K=fo(o);if(K||(o[uo]=K=new Ls(o)),h=K.add(u,h,d,k,b),h.proxy)return h;if(d=Wd(),h.proxy=d,d.src=o,d.listener=h,o.addEventListener)A||(v=k),v===void 0&&(v=!1),o.addEventListener(u.toString(),d,v);else if(o.attachEvent)o.attachEvent(xc(u.toString()),d);else if(o.addListener&&o.removeListener)o.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Wd(){function o(h){return u.call(o.src,o.listener,h)}const u=Kd;return o}function Cc(o,u,h,d,v){if(Array.isArray(u))for(var b=0;b<u.length;b++)Cc(o,u[b],h,d,v);else d=c(d)?!!d.capture:!!d,h=Nc(h),o&&o[un]?(o=o.i,b=String(u).toString(),b in o.g&&(u=o.g[b],h=co(u,h,d,v),h>-1&&(Ds(u[h]),Array.prototype.splice.call(u,h,1),u.length==0&&(delete o.g[b],o.h--)))):o&&(o=fo(o))&&(u=o.g[u.toString()],o=-1,u&&(o=co(u,h,d,v)),(h=o>-1?u[o]:null)&&ho(h))}function ho(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[un])ao(u.i,o);else{var h=o.type,d=o.proxy;u.removeEventListener?u.removeEventListener(h,d,o.capture):u.detachEvent?u.detachEvent(xc(h),d):u.addListener&&u.removeListener&&u.removeListener(d),(h=fo(u))?(ao(h,o),h.h==0&&(h.src=null,u[uo]=null)):Ds(o)}}}function xc(o){return o in lo?lo[o]:lo[o]="on"+o}function Kd(o,u){if(o.da)o=!0;else{u=new Le(u,this);const h=o.listener,d=o.ha||o.src;o.fa&&ho(o),o=h.call(d,u)}return o}function fo(o){return o=o[uo],o instanceof Ls?o:null}var po="__closure_events_fn_"+(Math.random()*1e9>>>0);function Nc(o){return typeof o=="function"?o:(o[po]||(o[po]=function(u){return o.handleEvent(u)}),o[po])}function Pe(){I.call(this),this.i=new Ls(this),this.M=this,this.G=null}m(Pe,I),Pe.prototype[un]=!0,Pe.prototype.removeEventListener=function(o,u,h,d){Cc(this,o,u,h,d)};function ke(o,u){var h,d=o.G;if(d)for(h=[];d;d=d.G)h.push(d);if(o=o.M,d=u.type||u,typeof u=="string")u=new w(u,o);else if(u instanceof w)u.target=u.target||o;else{var v=u;u=new w(d,o),Vc(u,v)}v=!0;let b,k;if(h)for(k=h.length-1;k>=0;k--)b=u.g=h[k],v=Ms(b,d,!0,u)&&v;if(b=u.g=o,v=Ms(b,d,!0,u)&&v,v=Ms(b,d,!1,u)&&v,h)for(k=0;k<h.length;k++)b=u.g=h[k],v=Ms(b,d,!1,u)&&v}Pe.prototype.N=function(){if(Pe.Z.N.call(this),this.i){var o=this.i;for(const u in o.g){const h=o.g[u];for(let d=0;d<h.length;d++)Ds(h[d]);delete o.g[u],o.h--}}this.G=null},Pe.prototype.J=function(o,u,h,d){return this.i.add(String(o),u,!1,h,d)},Pe.prototype.K=function(o,u,h,d){return this.i.add(String(o),u,!0,h,d)};function Ms(o,u,h,d){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();let v=!0;for(let b=0;b<u.length;++b){const k=u[b];if(k&&!k.da&&k.capture==h){const K=k.listener,ge=k.ha||k.src;k.fa&&ao(o.i,k),v=K.call(ge,d)!==!1&&v}}return v&&!d.defaultPrevented}function Qd(o,u){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=f(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(o,u||0)}function kc(o){o.g=Qd(()=>{o.g=null,o.i&&(o.i=!1,kc(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class Jd extends I{constructor(u,h){super(),this.m=u,this.l=h,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:kc(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function gr(o){I.call(this),this.h=o,this.g={}}m(gr,I);var Dc=[];function Oc(o){Os(o.g,function(u,h){this.g.hasOwnProperty(h)&&ho(u)},o),o.g={}}gr.prototype.N=function(){gr.Z.N.call(this),Oc(this)},gr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var mo=a.JSON.stringify,Yd=a.JSON.parse,Xd=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function Lc(){}function Mc(){}var _r={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function go(){w.call(this,"d")}m(go,w);function _o(){w.call(this,"c")}m(_o,w);var ln={},Uc=null;function Us(){return Uc=Uc||new Pe}ln.Ia="serverreachability";function Fc(o){w.call(this,ln.Ia,o)}m(Fc,w);function yr(o){const u=Us();ke(u,new Fc(u))}ln.STAT_EVENT="statevent";function Bc(o,u){w.call(this,ln.STAT_EVENT,o),this.stat=u}m(Bc,w);function De(o){const u=Us();ke(u,new Bc(u,o))}ln.Ja="timingevent";function qc(o,u){w.call(this,ln.Ja,o),this.size=u}m(qc,w);function Er(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},u)}function wr(){this.g=!0}wr.prototype.ua=function(){this.g=!1};function Zd(o,u,h,d,v,b){o.info(function(){if(o.g)if(b){var k="",K=b.split("&");for(let ne=0;ne<K.length;ne++){var ge=K[ne].split("=");if(ge.length>1){const ye=ge[0];ge=ge[1];const at=ye.split("_");k=at.length>=2&&at[1]=="type"?k+(ye+"="+ge+"&"):k+(ye+"=redacted&")}}}else k=null;else k=b;return"XMLHTTP REQ ("+d+") [attempt "+v+"]: "+u+`
`+h+`
`+k})}function ep(o,u,h,d,v,b,k){o.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+v+"]: "+u+`
`+h+`
`+b+" "+k})}function Mn(o,u,h,d){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+np(o,h)+(d?" "+d:"")})}function tp(o,u){o.info(function(){return"TIMEOUT: "+u})}wr.prototype.info=function(){};function np(o,u){if(!o.g)return u;if(!u)return null;try{const b=JSON.parse(u);if(b){for(o=0;o<b.length;o++)if(Array.isArray(b[o])){var h=b[o];if(!(h.length<2)){var d=h[1];if(Array.isArray(d)&&!(d.length<1)){var v=d[0];if(v!="noop"&&v!="stop"&&v!="close")for(let k=1;k<d.length;k++)d[k]=""}}}}return mo(b)}catch{return u}}var Fs={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},$c={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},jc;function yo(){}m(yo,Lc),yo.prototype.g=function(){return new XMLHttpRequest},jc=new yo;function Tr(o){return encodeURIComponent(String(o))}function rp(o){var u=1;o=o.split(":");const h=[];for(;u>0&&o.length;)h.push(o.shift()),u--;return o.length&&h.push(o.join(":")),h}function kt(o,u,h,d){this.j=o,this.i=u,this.l=h,this.S=d||1,this.V=new gr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new zc}function zc(){this.i=null,this.g="",this.h=!1}var Gc={},Eo={};function wo(o,u,h){o.M=1,o.A=qs(ot(u)),o.u=h,o.R=!0,Hc(o,null)}function Hc(o,u){o.F=Date.now(),Bs(o),o.B=ot(o.A);var h=o.B,d=o.S;Array.isArray(d)||(d=[String(d)]),iu(h.i,"t",d),o.C=0,h=o.j.L,o.h=new zc,o.g=vu(o.j,h?u:null,!o.u),o.P>0&&(o.O=new Jd(f(o.Y,o,o.g),o.P)),u=o.V,h=o.g,d=o.ba;var v="readystatechange";Array.isArray(v)||(v&&(Dc[0]=v.toString()),v=Dc);for(let b=0;b<v.length;b++){const k=Sc(h,v[b],d||u.handleEvent,!1,u.h||u);if(!k)break;u.g[k.key]=k}u=o.J?Rc(o.J):{},o.u?(o.v||(o.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,u)):(o.v="GET",o.g.ea(o.B,o.v,null,u)),yr(),Zd(o.i,o.v,o.B,o.l,o.S,o.u)}kt.prototype.ba=function(o){o=o.target;const u=this.O;u&&Lt(o)==3?u.j():this.Y(o)},kt.prototype.Y=function(o){try{if(o==this.g)e:{const K=Lt(this.g),ge=this.g.ya(),ne=this.g.ca();if(!(K<3)&&(K!=3||this.g&&(this.h.h||this.g.la()||fu(this.g)))){this.K||K!=4||ge==7||(ge==8||ne<=0?yr(3):yr(2)),To(this);var u=this.g.ca();this.X=u;var h=sp(this);if(this.o=u==200,ep(this.i,this.v,this.B,this.l,this.S,K,u),this.o){if(this.U&&!this.L){t:{if(this.g){var d,v=this.g;if((d=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(d)){var b=d;break t}}b=null}if(o=b)Mn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Io(this,o);else{this.o=!1,this.m=3,De(12),hn(this),Ir(this);break e}}if(this.R){o=!0;let ye;for(;!this.K&&this.C<h.length;)if(ye=ip(this,h),ye==Eo){K==4&&(this.m=4,De(14),o=!1),Mn(this.i,this.l,null,"[Incomplete Response]");break}else if(ye==Gc){this.m=4,De(15),Mn(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else Mn(this.i,this.l,ye,null),Io(this,ye);if(Wc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),K!=4||h.length!=0||this.h.h||(this.m=1,De(16),o=!1),this.o=this.o&&o,!o)Mn(this.i,this.l,h,"[Invalid Chunked Response]"),hn(this),Ir(this);else if(h.length>0&&!this.W){this.W=!0;var k=this.j;k.g==this&&k.aa&&!k.P&&(k.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),Co(k),k.P=!0,De(11))}}else Mn(this.i,this.l,h,null),Io(this,h);K==4&&hn(this),this.o&&!this.K&&(K==4?Eu(this.j,this):(this.o=!1,Bs(this)))}else Ep(this.g),u==400&&h.indexOf("Unknown SID")>0?(this.m=3,De(12)):(this.m=0,De(13)),hn(this),Ir(this)}}}catch{}finally{}};function sp(o){if(!Wc(o))return o.g.la();const u=fu(o.g);if(u==="")return"";let h="";const d=u.length,v=Lt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return hn(o),Ir(o),"";o.h.i=new a.TextDecoder}for(let b=0;b<d;b++)o.h.h=!0,h+=o.h.i.decode(u[b],{stream:!(v&&b==d-1)});return u.length=0,o.h.g+=h,o.C=0,o.h.g}function Wc(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function ip(o,u){var h=o.C,d=u.indexOf(`
`,h);return d==-1?Eo:(h=Number(u.substring(h,d)),isNaN(h)?Gc:(d+=1,d+h>u.length?Eo:(u=u.slice(d,d+h),o.C=d+h,u)))}kt.prototype.cancel=function(){this.K=!0,hn(this)};function Bs(o){o.T=Date.now()+o.H,Kc(o,o.H)}function Kc(o,u){if(o.D!=null)throw Error("WatchDog timer not null");o.D=Er(f(o.aa,o),u)}function To(o){o.D&&(a.clearTimeout(o.D),o.D=null)}kt.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(tp(this.i,this.B),this.M!=2&&(yr(),De(17)),hn(this),this.m=2,Ir(this)):Kc(this,this.T-o)};function Ir(o){o.j.I==0||o.K||Eu(o.j,o)}function hn(o){To(o);var u=o.O;u&&typeof u.dispose=="function"&&u.dispose(),o.O=null,Oc(o.V),o.g&&(u=o.g,o.g=null,u.abort(),u.dispose())}function Io(o,u){try{var h=o.j;if(h.I!=0&&(h.g==o||vo(h.h,o))){if(!o.L&&vo(h.h,o)&&h.I==3){try{var d=h.Ba.g.parse(u)}catch{d=null}if(Array.isArray(d)&&d.length==3){var v=d;if(v[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)Hs(h),zs(h);else break e;So(h),De(18)}}else h.xa=v[1],0<h.xa-h.K&&v[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=Er(f(h.Va,h),6e3));Yc(h.h)<=1&&h.ta&&(h.ta=void 0)}else dn(h,11)}else if((o.L||h.g==o)&&Hs(h),!_(u))for(v=h.Ba.g.parse(u),u=0;u<v.length;u++){let ne=v[u];const ye=ne[0];if(!(ye<=h.K))if(h.K=ye,ne=ne[1],h.I==2)if(ne[0]=="c"){h.M=ne[1],h.ba=ne[2];const at=ne[3];at!=null&&(h.ka=at,h.j.info("VER="+h.ka));const pn=ne[4];pn!=null&&(h.za=pn,h.j.info("SVER="+h.za));const Mt=ne[5];Mt!=null&&typeof Mt=="number"&&Mt>0&&(d=1.5*Mt,h.O=d,h.j.info("backChannelRequestTimeoutMs_="+d)),d=h;const Ut=o.g;if(Ut){const Ks=Ut.g?Ut.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ks){var b=d.h;b.g||Ks.indexOf("spdy")==-1&&Ks.indexOf("quic")==-1&&Ks.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(Ao(b,b.h),b.h=null))}if(d.G){const xo=Ut.g?Ut.g.getResponseHeader("X-HTTP-Session-Id"):null;xo&&(d.wa=xo,se(d.J,d.G,xo))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),d=h;var k=o;if(d.na=Iu(d,d.L?d.ba:null,d.W),k.L){Xc(d.h,k);var K=k,ge=d.O;ge&&(K.H=ge),K.D&&(To(K),Bs(K)),d.g=k}else _u(d);h.i.length>0&&Gs(h)}else ne[0]!="stop"&&ne[0]!="close"||dn(h,7);else h.I==3&&(ne[0]=="stop"||ne[0]=="close"?ne[0]=="stop"?dn(h,7):Vo(h):ne[0]!="noop"&&h.l&&h.l.qa(ne),h.A=0)}}yr(4)}catch{}}var op=class{constructor(o,u){this.g=o,this.map=u}};function Qc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Jc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Yc(o){return o.h?1:o.g?o.g.size:0}function vo(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function Ao(o,u){o.g?o.g.add(u):o.h=u}function Xc(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}Qc.prototype.cancel=function(){if(this.i=Zc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Zc(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const h of o.g.values())u=u.concat(h.G);return u}return C(o.i)}var eu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ap(o,u){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const d=o[h].indexOf("=");let v,b=null;d>=0?(v=o[h].substring(0,d),b=o[h].substring(d+1)):v=o[h],u(v,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function Dt(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;o instanceof Dt?(this.l=o.l,vr(this,o.j),this.o=o.o,this.g=o.g,Ar(this,o.u),this.h=o.h,bo(this,ou(o.i)),this.m=o.m):o&&(u=String(o).match(eu))?(this.l=!1,vr(this,u[1]||"",!0),this.o=br(u[2]||""),this.g=br(u[3]||"",!0),Ar(this,u[4]),this.h=br(u[5]||"",!0),bo(this,u[6]||"",!0),this.m=br(u[7]||"")):(this.l=!1,this.i=new Pr(null,this.l))}Dt.prototype.toString=function(){const o=[];var u=this.j;u&&o.push(Rr(u,tu,!0),":");var h=this.g;return(h||u=="file")&&(o.push("//"),(u=this.o)&&o.push(Rr(u,tu,!0),"@"),o.push(Tr(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Rr(h,h.charAt(0)=="/"?lp:up,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Rr(h,fp)),o.join("")},Dt.prototype.resolve=function(o){const u=ot(this);let h=!!o.j;h?vr(u,o.j):h=!!o.o,h?u.o=o.o:h=!!o.g,h?u.g=o.g:h=o.u!=null;var d=o.h;if(h)Ar(u,o.u);else if(h=!!o.h){if(d.charAt(0)!="/")if(this.g&&!this.h)d="/"+d;else{var v=u.h.lastIndexOf("/");v!=-1&&(d=u.h.slice(0,v+1)+d)}if(v=d,v==".."||v==".")d="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){d=v.lastIndexOf("/",0)==0,v=v.split("/");const b=[];for(let k=0;k<v.length;){const K=v[k++];K=="."?d&&k==v.length&&b.push(""):K==".."?((b.length>1||b.length==1&&b[0]!="")&&b.pop(),d&&k==v.length&&b.push("")):(b.push(K),d=!0)}d=b.join("/")}else d=v}return h?u.h=d:h=o.i.toString()!=="",h?bo(u,ou(o.i)):h=!!o.m,h&&(u.m=o.m),u};function ot(o){return new Dt(o)}function vr(o,u,h){o.j=h?br(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function Ar(o,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);o.u=u}else o.u=null}function bo(o,u,h){u instanceof Pr?(o.i=u,dp(o.i,o.l)):(h||(u=Rr(u,hp)),o.i=new Pr(u,o.l))}function se(o,u,h){o.i.set(u,h)}function qs(o){return se(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function br(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Rr(o,u,h){return typeof o=="string"?(o=encodeURI(o).replace(u,cp),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function cp(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var tu=/[#\/\?@]/g,up=/[#\?:]/g,lp=/[#\?]/g,hp=/[#\?@]/g,fp=/#/g;function Pr(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function fn(o){o.g||(o.g=new Map,o.h=0,o.i&&ap(o.i,function(u,h){o.add(decodeURIComponent(u.replace(/\+/g," ")),h)}))}n=Pr.prototype,n.add=function(o,u){fn(this),this.i=null,o=Un(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(u),this.h+=1,this};function nu(o,u){fn(o),u=Un(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function ru(o,u){return fn(o),u=Un(o,u),o.g.has(u)}n.forEach=function(o,u){fn(this),this.g.forEach(function(h,d){h.forEach(function(v){o.call(u,v,d,this)},this)},this)};function su(o,u){fn(o);let h=[];if(typeof u=="string")ru(o,u)&&(h=h.concat(o.g.get(Un(o,u))));else for(o=Array.from(o.g.values()),u=0;u<o.length;u++)h=h.concat(o[u]);return h}n.set=function(o,u){return fn(this),this.i=null,o=Un(this,o),ru(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=su(this,o),o.length>0?String(o[0]):u):u};function iu(o,u,h){nu(o,u),h.length>0&&(o.i=null,o.g.set(Un(o,u),C(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(let d=0;d<u.length;d++){var h=u[d];const v=Tr(h);h=su(this,h);for(let b=0;b<h.length;b++){let k=v;h[b]!==""&&(k+="="+Tr(h[b])),o.push(k)}}return this.i=o.join("&")};function ou(o){const u=new Pr;return u.i=o.i,o.g&&(u.g=new Map(o.g),u.h=o.h),u}function Un(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function dp(o,u){u&&!o.j&&(fn(o),o.i=null,o.g.forEach(function(h,d){const v=d.toLowerCase();d!=v&&(nu(this,d),iu(this,v,h))},o)),o.j=u}function pp(o,u){const h=new wr;if(a.Image){const d=new Image;d.onload=p(Ot,h,"TestLoadImage: loaded",!0,u,d),d.onerror=p(Ot,h,"TestLoadImage: error",!1,u,d),d.onabort=p(Ot,h,"TestLoadImage: abort",!1,u,d),d.ontimeout=p(Ot,h,"TestLoadImage: timeout",!1,u,d),a.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=o}else u(!1)}function mp(o,u){const h=new wr,d=new AbortController,v=setTimeout(()=>{d.abort(),Ot(h,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:d.signal}).then(b=>{clearTimeout(v),b.ok?Ot(h,"TestPingServer: ok",!0,u):Ot(h,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(v),Ot(h,"TestPingServer: error",!1,u)})}function Ot(o,u,h,d,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),d(h)}catch{}}function gp(){this.g=new Xd}function Ro(o){this.i=o.Sb||null,this.h=o.ab||!1}m(Ro,Lc),Ro.prototype.g=function(){return new $s(this.i,this.h)};function $s(o,u){Pe.call(this),this.H=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m($s,Pe),n=$s.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=u,this.readyState=1,Sr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(u.body=o),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Vr(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Sr(this)),this.g&&(this.readyState=3,Sr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;au(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function au(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?Vr(this):Sr(this),this.readyState==3&&au(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,Vr(this))},n.Na=function(o){this.g&&(this.response=o,Vr(this))},n.ga=function(){this.g&&Vr(this)};function Vr(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Sr(o)}n.setRequestHeader=function(o,u){this.A.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var h=u.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=u.next();return o.join(`\r
`)};function Sr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty($s.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function cu(o){let u="";return Os(o,function(h,d){u+=d,u+=":",u+=h,u+=`\r
`}),u}function Po(o,u,h){e:{for(d in h){var d=!1;break e}d=!0}d||(h=cu(h),typeof o=="string"?h!=null&&Tr(h):se(o,u,h))}function ce(o){Pe.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(ce,Pe);var _p=/^https?$/i,yp=["POST","PUT"];n=ce.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,u,h,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():jc.g(),this.g.onreadystatechange=R(f(this.Ca,this));try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(b){uu(this,b);return}if(o=h||"",h=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var v in d)h.set(v,d[v]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const b of d.keys())h.set(b,d.get(b));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(h.keys()).find(b=>b.toLowerCase()=="content-type"),v=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(yp,u,void 0)>=0)||d||v||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,k]of h)this.g.setRequestHeader(b,k);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(b){uu(this,b)}};function uu(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.o=5,lu(o),js(o)}function lu(o){o.A||(o.A=!0,ke(o,"complete"),ke(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,ke(this,"complete"),ke(this,"abort"),js(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),js(this,!0)),ce.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?hu(this):this.Xa())},n.Xa=function(){hu(this)};function hu(o){if(o.h&&typeof i<"u"){if(o.v&&Lt(o)==4)setTimeout(o.Ca.bind(o),0);else if(ke(o,"readystatechange"),Lt(o)==4){o.h=!1;try{const b=o.ca();e:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var h;if(!(h=u)){var d;if(d=b===0){let k=String(o.D).match(eu)[1]||null;!k&&a.self&&a.self.location&&(k=a.self.location.protocol.slice(0,-1)),d=!_p.test(k?k.toLowerCase():"")}h=d}if(h)ke(o,"complete"),ke(o,"success");else{o.o=6;try{var v=Lt(o)>2?o.g.statusText:""}catch{v=""}o.l=v+" ["+o.ca()+"]",lu(o)}}finally{js(o)}}}}function js(o,u){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,u||ke(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Lt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return Lt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Yd(u)}};function fu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Ep(o){const u={};o=(o.g&&Lt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<o.length;d++){if(_(o[d]))continue;var h=rp(o[d]);const v=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const b=u[v]||[];u[v]=b,b.push(h)}Gd(u,function(d){return d.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Cr(o,u,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||u}function du(o){this.za=0,this.i=[],this.j=new wr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Cr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Cr("baseRetryDelayMs",5e3,o),this.Za=Cr("retryDelaySeedMs",1e4,o),this.Ta=Cr("forwardChannelMaxRetries",2,o),this.va=Cr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Qc(o&&o.concurrentRequestLimit),this.Ba=new gp,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=du.prototype,n.ka=8,n.I=1,n.connect=function(o,u,h,d){De(0),this.W=o,this.H=u||{},h&&d!==void 0&&(this.H.OSID=h,this.H.OAID=d),this.F=this.X,this.J=Iu(this,null,this.W),Gs(this)};function Vo(o){if(pu(o),o.I==3){var u=o.V++,h=ot(o.J);if(se(h,"SID",o.M),se(h,"RID",u),se(h,"TYPE","terminate"),xr(o,h),u=new kt(o,o.j,u),u.M=2,u.A=qs(ot(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=u.A,h=!0),h||(u.g=vu(u.j,null),u.g.ea(u.A)),u.F=Date.now(),Bs(u)}Tu(o)}function zs(o){o.g&&(Co(o),o.g.cancel(),o.g=null)}function pu(o){zs(o),o.v&&(a.clearTimeout(o.v),o.v=null),Hs(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Gs(o){if(!Jc(o.h)&&!o.m){o.m=!0;var u=o.Ea;et||g(),ve||(et(),ve=!0),T.add(u,o),o.D=0}}function wp(o,u){return Yc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=u.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=Er(f(o.Ea,o,u),wu(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const v=new kt(this,this.j,o);let b=this.o;if(this.U&&(b?(b=Rc(b),Vc(b,this.U)):b=this.U),this.u!==null||this.R||(v.J=b,b=null),this.S)e:{for(var u=0,h=0;h<this.i.length;h++){t:{var d=this.i[h];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break t}d=void 0}if(d===void 0)break;if(u+=d,u>4096){u=h;break e}if(u===4096||h===this.i.length-1){u=h+1;break e}}u=1e3}else u=1e3;u=gu(this,v,u),h=ot(this.J),se(h,"RID",o),se(h,"CVER",22),this.G&&se(h,"X-HTTP-Session-Id",this.G),xr(this,h),b&&(this.R?u="headers="+Tr(cu(b))+"&"+u:this.u&&Po(h,this.u,b)),Ao(this.h,v),this.Ra&&se(h,"TYPE","init"),this.S?(se(h,"$req",u),se(h,"SID","null"),v.U=!0,wo(v,h,null)):wo(v,h,u),this.I=2}}else this.I==3&&(o?mu(this,o):this.i.length==0||Jc(this.h)||mu(this))};function mu(o,u){var h;u?h=u.l:h=o.V++;const d=ot(o.J);se(d,"SID",o.M),se(d,"RID",h),se(d,"AID",o.K),xr(o,d),o.u&&o.o&&Po(d,o.u,o.o),h=new kt(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),u&&(o.i=u.G.concat(o.i)),u=gu(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Ao(o.h,h),wo(h,d,u)}function xr(o,u){o.H&&Os(o.H,function(h,d){se(u,d,h)}),o.l&&Os({},function(h,d){se(u,d,h)})}function gu(o,u,h){h=Math.min(o.i.length,h);const d=o.l?f(o.l.Ka,o.l,o):null;e:{var v=o.i;let K=-1;for(;;){const ge=["count="+h];K==-1?h>0?(K=v[0].g,ge.push("ofs="+K)):K=0:ge.push("ofs="+K);let ne=!0;for(let ye=0;ye<h;ye++){var b=v[ye].g;const at=v[ye].map;if(b-=K,b<0)K=Math.max(0,v[ye].g-100),ne=!1;else try{b="req"+b+"_"||"";try{var k=at instanceof Map?at:Object.entries(at);for(const[pn,Mt]of k){let Ut=Mt;c(Mt)&&(Ut=mo(Mt)),ge.push(b+pn+"="+encodeURIComponent(Ut))}}catch(pn){throw ge.push(b+"type="+encodeURIComponent("_badmap")),pn}}catch{d&&d(at)}}if(ne){k=ge.join("&");break e}}k=void 0}return o=o.i.splice(0,h),u.G=o,k}function _u(o){if(!o.g&&!o.v){o.Y=1;var u=o.Da;et||g(),ve||(et(),ve=!0),T.add(u,o),o.A=0}}function So(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=Er(f(o.Da,o),wu(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,yu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=Er(f(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,De(10),zs(this),yu(this))};function Co(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function yu(o){o.g=new kt(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var u=ot(o.na);se(u,"RID","rpc"),se(u,"SID",o.M),se(u,"AID",o.K),se(u,"CI",o.F?"0":"1"),!o.F&&o.ia&&se(u,"TO",o.ia),se(u,"TYPE","xmlhttp"),xr(o,u),o.u&&o.o&&Po(u,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=qs(ot(u)),h.u=null,h.R=!0,Hc(h,o)}n.Va=function(){this.C!=null&&(this.C=null,zs(this),So(this),De(19))};function Hs(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Eu(o,u){var h=null;if(o.g==u){Hs(o),Co(o),o.g=null;var d=2}else if(vo(o.h,u))h=u.G,Xc(o.h,u),d=1;else return;if(o.I!=0){if(u.o)if(d==1){h=u.u?u.u.length:0,u=Date.now()-u.F;var v=o.D;d=Us(),ke(d,new qc(d,h)),Gs(o)}else _u(o);else if(v=u.m,v==3||v==0&&u.X>0||!(d==1&&wp(o,u)||d==2&&So(o)))switch(h&&h.length>0&&(u=o.h,u.i=u.i.concat(h)),v){case 1:dn(o,5);break;case 4:dn(o,10);break;case 3:dn(o,6);break;default:dn(o,2)}}}function wu(o,u){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*u}function dn(o,u){if(o.j.info("Error code "+u),u==2){var h=f(o.bb,o),d=o.Ua;const v=!d;d=new Dt(d||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||vr(d,"https"),qs(d),v?pp(d.toString(),h):mp(d.toString(),h)}else De(2);o.I=0,o.l&&o.l.pa(u),Tu(o),pu(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),De(2)):(this.j.info("Failed to ping google.com"),De(1))};function Tu(o){if(o.I=0,o.ja=[],o.l){const u=Zc(o.h);(u.length!=0||o.i.length!=0)&&(x(o.ja,u),x(o.ja,o.i),o.h.i.length=0,C(o.i),o.i.length=0),o.l.oa()}}function Iu(o,u,h){var d=h instanceof Dt?ot(h):new Dt(h);if(d.g!="")u&&(d.g=u+"."+d.g),Ar(d,d.u);else{var v=a.location;d=v.protocol,u=u?u+"."+v.hostname:v.hostname,v=+v.port;const b=new Dt(null);d&&vr(b,d),u&&(b.g=u),v&&Ar(b,v),h&&(b.h=h),d=b}return h=o.G,u=o.wa,h&&u&&se(d,h,u),se(d,"VER",o.ka),xr(o,d),d}function vu(o,u,h){if(u&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Aa&&!o.ma?new ce(new Ro({ab:h})):new ce(o.ma),u.Fa(o.L),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Au(){}n=Au.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Ws(){}Ws.prototype.g=function(o,u){return new je(o,u)};function je(o,u){Pe.call(this),this.g=new du(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(o?o["X-WebChannel-Client-Profile"]=u.sa:o={"X-WebChannel-Client-Profile":u.sa}),this.g.U=o,(o=u&&u.Qb)&&!_(o)&&(this.g.u=o),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!_(u)&&(this.g.G=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Fn(this)}m(je,Pe),je.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},je.prototype.close=function(){Vo(this.g)},je.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=mo(o),o=h);u.i.push(new op(u.Ya++,o)),u.I==3&&Gs(u)},je.prototype.N=function(){this.g.l=null,delete this.j,Vo(this.g),delete this.g,je.Z.N.call(this)};function bu(o){go.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const h in u){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}m(bu,go);function Ru(){_o.call(this),this.status=1}m(Ru,_o);function Fn(o){this.g=o}m(Fn,Au),Fn.prototype.ra=function(){ke(this.g,"a")},Fn.prototype.qa=function(o){ke(this.g,new bu(o))},Fn.prototype.pa=function(o){ke(this.g,new Ru)},Fn.prototype.oa=function(){ke(this.g,"b")},Ws.prototype.createWebChannel=Ws.prototype.g,je.prototype.send=je.prototype.o,je.prototype.open=je.prototype.m,je.prototype.close=je.prototype.close,ph=function(){return new Ws},dh=function(){return Us()},fh=ln,Ho={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Fs.NO_ERROR=0,Fs.TIMEOUT=8,Fs.HTTP_ERROR=6,ni=Fs,$c.COMPLETE="complete",hh=$c,Mc.EventType=_r,_r.OPEN="a",_r.CLOSE="b",_r.ERROR="c",_r.MESSAGE="d",Pe.prototype.listen=Pe.prototype.J,Dr=Mc,ce.prototype.listenOnce=ce.prototype.K,ce.prototype.getLastError=ce.prototype.Ha,ce.prototype.getLastErrorCode=ce.prototype.ya,ce.prototype.getStatus=ce.prototype.ca,ce.prototype.getResponseJson=ce.prototype.La,ce.prototype.getResponseText=ce.prototype.la,ce.prototype.send=ce.prototype.ea,ce.prototype.setWithCredentials=ce.prototype.Fa,lh=ce}).apply(typeof Qs<"u"?Qs:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cr="13.1.0";function Km(n){cr=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rn=new pa("@firebase/firestore");function Bn(){return Rn.logLevel}function O(n,...e){if(Rn.logLevel<=Y.DEBUG){const t=e.map(ga);Rn.debug(`Firestore (${cr}): ${n}`,...t)}}function Pt(n,...e){if(Rn.logLevel<=Y.ERROR){const t=e.map(ga);Rn.error(`Firestore (${cr}): ${n}`,...t)}}function st(n,...e){if(Rn.logLevel<=Y.WARN){const t=e.map(ga);Rn.warn(`Firestore (${cr}): ${n}`,...t)}}function ga(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,mh(n,r,t)}function mh(n,e,t){let r=`FIRESTORE (${cr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Pt(r),new Error(r)}function U(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||mh(e,s,r)}function H(n,e){return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qm(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Qm(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function Q(n,e){return n<e?-1:n>e?1:0}function Qr(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Do(s)===Do(i)?Q(s,i):Do(s)?1:-1}return Q(n.length,e.length)}const Jm=55296,Ym=57343;function Do(n){const e=n.charCodeAt(0);return e>=Jm&&e<=Ym}function Zn(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e,t){this.comparator=e,this.root=t||be.EMPTY}insert(e,t){return new ie(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,be.BLACK,null,null))}remove(e){return new ie(this.comparator,this.root.remove(e,this.comparator).copy(null,null,be.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Js(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Js(this.root,e,this.comparator,!1)}getReverseIterator(){return new Js(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Js(this.root,e,this.comparator,!0)}}class Js{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class be{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??be.RED,this.left=s??be.EMPTY,this.right=i??be.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new be(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return be.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return be.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,be.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,be.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw q(43730,{key:this.key,value:this.value});if(this.right.isRed())throw q(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw q(27949);return e+(this.isRed()?0:1)}}be.EMPTY=null,be.RED=!0,be.BLACK=!1;be.EMPTY=new class{constructor(){this.size=0}get key(){throw q(57766)}get value(){throw q(16141)}get color(){throw q(16727)}get left(){throw q(29726)}get right(){throw q(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new be(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e){this.comparator=e,this.data=new ie(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ou(this.data.getIterator())}getIteratorFrom(e){return new Ou(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof pe)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new pe(this.comparator);return t.data=e,t}}class Ou{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends Nt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er="__name__";class ct{constructor(e,t,r){t===void 0?t=0:t>e.length&&q(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&q(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return ct.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ct?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=ct.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return Q(e.length,t.length)}static compareSegments(e,t){const r=ct.isNumericId(e),s=ct.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?ct.extractNumericId(e).compare(ct.extractNumericId(t)):Qr(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Wt.fromString(e.substring(4,e.length-2))}}class Z extends ct{construct(e,t,r){return new Z(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new D(V.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new Z(t)}static emptyPath(){return new Z([])}}const Xm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;let Ke=class qn extends ct{construct(e,t,r){return new qn(e,t,r)}static isValidIdentifier(e){return Xm.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),qn.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===er}static keyField(){return new qn([er])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new D(V.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new D(V.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new D(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new D(V.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new qn(t)}static emptyPath(){return new qn([])}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.fields=e,e.sort(Ke.comparator)}static empty(){return new nt([])}unionWith(e){let t=new pe(Ke.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new nt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Zn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pn(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Cn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Zm(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function gh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.path=e}static fromPath(e){return new F(Z.fromString(e))}static fromName(e){return new F(Z.fromString(e).popFirst(5))}static empty(){return new F(Z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Z.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Z.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new F(new Z(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _h(n,e,t){if(!t)throw new D(V.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function eg(n,e,t,r){if(e===!0&&r===!0)throw new D(V.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Lu(n){if(!F.isDocumentKey(n))throw new D(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Mu(n){if(F.isDocumentKey(n))throw new D(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ws(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Fi(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":q(12329,{type:typeof n})}function yn(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new D(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Fi(n);throw new D(V.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function le(n,e){const t={typeString:n};return e&&(t.value=e),t}function Ts(n,e){if(!ws(n))throw new D(V.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0,a=e[r].optional;if(!(r in n)){if(a)continue;t=`JSON missing required field: '${r}'`;break}const c=n[r];if(s&&typeof c!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&c!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new D(V.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uu=-62135596800,Fu=1e6;class te{static now(){return te.fromMillis(Date.now())}static fromDate(e){return te.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Fu);return new te(t,r)}static fromInstant(e){if(!e||typeof e.t!="bigint")throw new D(V.INVALID_ARGUMENT,"Invalid Temporal.Instant object provided.");return te._fromEpochNanoseconds(e.t)}static _fromEpochNanoseconds(e){let t,r;if(e>=0n)t=Number(e/1000000000n),r=Number(e%1000000000n);else{const s=e%1000000000n;s===0n?(t=Number(e/1000000000n),r=0):(t=Number(e/1000000000n-1n),r=Number(s+1000000000n))}return new te(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Uu)throw new D(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Fu}toInstant(){if(typeof Temporal>"u"||!Temporal.Instant)throw new D(V.FAILED_PRECONDITION,"The Temporal object is not available in the current environment.");const e=1000000000n*BigInt(this.seconds)+BigInt(this.nanoseconds);return Temporal.Instant.__PRIVATE_fromEpochNanoseconds(e)}_compareTo(e){return this.seconds===e.seconds?Q(this.nanoseconds,e.nanoseconds):Q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:te._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ts(e,te._jsonSchema))return new te(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Uu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}te._jsonSchemaVersion="firestore/timestamp/1.0",te._jsonSchema={type:le("string",te._jsonSchemaVersion),seconds:le("number"),nanoseconds:le("number")};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new yh("Invalid base64 string: "+i):i}}(e);return new oe(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new oe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}oe.EMPTY_BYTE_STRING=new oe("");const tg=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Xt(n){if(U(!!n,39018),typeof n=="string"){let e=0;const t=tg.exec(n);if(U(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ue(n.seconds),nanos:ue(n.nanos)}}function ue(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Vn(n){return typeof n=="string"?oe.fromBase64String(n):oe.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eh="server_timestamp",wh="__type__",Th="__previous_value__",Ih="__local_write_time__";function ya(n){return(n?.mapValue?.fields||{})[wh]?.stringValue===Eh}function Is(n){const e=n.mapValue.fields[Th];return ya(e)?Is(e):e}function tr(n){const e=Xt(n.mapValue.fields[Ih].timestampValue);return new te(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(e,t,r,s,i,a,c,l,f,p,m,R,C){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=f,this.isUsingEmulator=p,this.apiKey=m,this._customHeaders=R,this.grpcFlowControlWindow=C}}const mi="(default)";class Jr{constructor(e,t){this.projectId=e,this.database=t||mi}static empty(){return new Jr("","")}get isDefaultDatabase(){return this.database===mi}isEqual(e){return e instanceof Jr&&e.projectId===this.projectId&&e.database===this.database}}function rg(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new D(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Jr(n.options.projectId,e)}/**
 * Copyright 2021 M.Vokhmentsev
 *
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(){this.exponent=0,this.i=0n,this.o=0n,this.u=new Array(4).fill(0n),this.l=new Array(6).fill(0n),this.h=new Array(6).fill(0n),this.T=new Array(6).fill(0n),this.P=new Array(12).fill(0n)}static I(e,t){let r=new $;return r.parse(e,t),r}parse(e,t){t+=e.length-1,this.exponent=0,this.i=0n,this.o=0n;let r=this.T,s=this.R(e,r);if(s==0&&this.isEmpty(r)||(t+=s)<$.A)return;if(t>$.V)return void(this.exponent=Number($.m));let i=this.p(t,r);this.S(t,i,r)}R(e,t){for(let i=0;i<6;i++)t[i]=0n;let r=0;for(;r<e.length&&e[r]==0;)r+=1;if(r==e.length)return 0;let s=-r;if(e.length-r>$.v){let i=e[$.v]>=5,a=new Array($.v).fill(0);for(let c=0;c<$.v;c++)a[c]=e[c+r];i&&(s+=this.D(a)),e=a,r=0}for(let i=e.length-1;i>=r;i--)t[0]|=BigInt(e[i])<<32n,this.C(t);return s}C(e){let t=e.length;for(let r=0;r<t;r++){let s=e[r]%10n;e[r]=e[r]/10n,r+1<t&&(e[r+1]+=s<<32n)}}isEmpty(e){for(let t=0;t<e.length;t++)if(e[t]!=0n)return!1;return!0}D(e){for(let t=e.length-1;t>=0;t--){if(e[t]!=9)return e[t]=e[t]+1,0;e[t]=0}return e[0]=1,1}p(e,t){let r=t[0]<<31n|t[1]>>1n,s=Number(r)/$.F;return Math.floor(Number(e)*$.O+this.log2(s))}log2(e){return $.M*Math.log(e)}S(e,t,r){let s=this.u;this.N(-t,s);let i=this.P;this.B(r,s,i),this.L(i),BigInt(s[0])!=BigInt(-e)&&this.L(i),t+=this.$(i),(t+=$.U)<=0||(t+=this.k(i),BigInt(t)>=$.m?this.exponent=Number($.m):(this.exponent=Number(t),this.i=(i[0]<<32n)+i[1]&0xffffffffffffffffn,this.o=(i[2]<<32n)+i[3]&0xffffffffffffffffn))}N(e,t){if(e==0)return void this.q($.K[0],t);let r=$.K;e<0&&(e=-e,r=$.W);let s=$.G,i=32,a=!0;for(;e>0;)e>=s&&(a?(this.q(r[i],t),a=!1):this.j(t,r[i],t),e-=s),i-=1,s*=.5}q(e,t){for(let r=0;r<t.length;r++)t[r]=e[r]}j(e,t,r){this.H(e,t,this.P);let s=this.J(this.P);this.Y(this.P,r),r[0]=e[0]+t[0]+BigInt(s)}H(e,t,r){for(let s=0;s<r.length;s++)r[s]=0n;this.Z(e,this.l),this.Z(t,this.h);for(let s=5;s>=0;s--)for(let i=5;i>=0;i--){let a=this.l[s]*this.h[i];r[i+s+1]=r[i+s+1]+(a&$.X)&0xffffffffffffffffn,r[i+s]=r[i+s]+(a>>32n)&0xffffffffffffffffn}for(let s=11;s>=1;s--)r[s-1]=r[s-1]+(r[s]>>32n)&0xffffffffffffffffn,r[s]&=$.X}J(e){let t=0;for(;this.ee(e);)this.L(e),t-=1;return t}ee(e){if(e[0]<0x19999999n)return!0;if(e[0]>0x19999999n)return!1;for(let t=1;t<e.length;t++){if(e[t]<0x99999999n)return!0;if(e[t]>0x99999999n)return!1}return!1}B(e,t,r){for(let a=0;a<r.length;a++)r[a]=0n;let s=this.h;this.Z(t,s);let i=e.length;for(let a=i-1;a>=0;a--)for(let c=i-1;c>=0;c--){let l=e[a]*s[c];r[c+a+1]=r[c+a+1]+(l&$.X)&0xffffffffffffffffn,r[c+a]=r[c+a]+(l>>32n)&0xffffffffffffffffn}for(let a=11;a>=1;a--)r[a-1]=r[a-1]+(r[a]>>32n)&0xffffffffffffffffn,r[a]&=$.X}L(e){let t=e.length-1;e[0]&=$.X,e[t]*=10n;for(let r=t-1;r>=0;r--)e[r]=10n*e[r]+(e[r+1]>>32n)&0xffffffffffffffffn,e[r+1]&=$.X}$(e){let t=31-$.te(e[0]);return t!=0&&this.ne(e,t),t}k(e){return this.re(e,5,100n),this.re(e,4,0x80000000n),(e[0]&$.ie<<1n)!=0n?(this.ne(e,1),1):0}Y(e,t){t[1]=(e[0]<<32n)+e[1],t[2]=(e[2]<<32n)+e[3],t[3]=(e[4]<<32n)+e[5]}Z(e,t){t[0]=e[1]>>32n,t[1]=e[1]&$.X,t[2]=e[2]>>32n,t[3]=e[2]&$.X,t[4]=e[3]>>32n,t[5]=e[3]&$.X}ne(e,t){let r=e.length-1,s=BigInt(32-Math.abs(t));if(t>0){let i=BigInt(t);for(let a=r+1-1;a>=1;a--)e[a]=e[a]>>i|e[a-1]<<s&$.X;e[0]=e[0]>>i}else if(t<0){let i=BigInt(-t);e[0]=0xffffffffffffffffn&(e[0]<<i|e[1]>>s);for(let a=1;a<r;a++)e[a]=0xffffffffffffffffn&(e[a]<<i&$.X|e[a+1]>>s);e[r]=e[r]<<i&$.X}}re(e,t,r){let s=t;e[s]=e[s]+r&0xffffffffffffffffn;for(let i=s+1-1;i>=1&&(e[i]&$.ie)!=0n;i--)e[i]&=$.X,e[i-1]+=1n}static te(e){let t=Number(e>>32n);return t==0?32+Math.clz32(Number(BigInt.asUintN(32,e))):Math.clz32(t)}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ee,Gn,Wo,ri,si,Or;$.v=59,$.V=646456993,$.A=-646457032,$.F=0xccccccccccccd00,$.se=0x8000000000000000n,$.G=2147483648,$.X=0x00000000ffffffffn,$.ie=0xffffffff00000000n,$.O=Math.log(10)/Math.log(2),$.M=1/Math.log(2),$.U=2147483647,$.m=0xffffffffn,$.K=[[1n,0x1999999999999999n,0x9999999999999999n,0x999999999999999an],[1n,0x3333333333333333n,0x3333333333333333n,0x3333333333333334n],[1n,0x6666666666666666n,0x6666666666666666n,0x6666666666666667n],[2n,0x28f5c28f5c28f5c2n,0x8f5c28f5c28f5c28n,0xf5c28f5c28f5c290n],[3n,0x4189374bc6a7ef9dn,0xb22d0e5604189374n,0xbc6a7ef9db22d0e6n],[5n,0xa7c5ac471b478423n,0x0fcf80dc33721d53n,0xcddd6e04c0592104n],[10n,0x6df37f675ef6eadfn,0x5ab9a2072d44268dn,0x97df837e6748956en],[20n,0x2f394219248446ban,0xa23d2ec729af3d61n,0x0607aa0167dd94cbn],[39n,0x571cbec554b60dbbn,0xd5f64baf0506840dn,0x451db70d5904029bn],[78n,0x1da48ce468e7c702n,0x6520247d3556476dn,0x1469caf6db224cfan],[155n,0x2252f0e5b39769dcn,0x9ae2eea30ca3ade0n,0xeeaa3c08dfe84e30n],[309n,0x2e055c9a3f6ba793n,0x16583a816eb60a59n,0x22c4b0826cf1ebf7n],[617n,0x52bb45e9cf23f17fn,0x7688c07606e50364n,0xb34479aa9d449a57n],[1234n,0x1abc81c8ff5f846cn,0x8f5e3c9853e38c97n,0x45060097f3bf9296n],[2467n,0x1bec53b510daa7b4n,0x48369ed77dbb0eb1n,0x3b05587b2187b41en],[4933n,0x1e75063a5ba91326n,0x8abfb8e460016ae3n,0x28008702d29e8a3cn],[9865n,0x243c5d8bb5c5fa55n,0x40c6d248c5881915n,0x4c0fd99fd5befc22n],[19729n,0x334a5570c3f4ef3cn,0xa13c36c43f979c90n,0xda7ac473555fb7a8n],[39457n,0x66c304445dd98f3bn,0xa8c293a20e47a41bn,0x4c5b03dc12604964n],[78914n,0x293ffbf5fb028cc4n,0x89d3e5ff44238406n,0x369a339e1bfe8c9bn],[157827n,0x427792fbb68e5d20n,0x7b297cd9fc154b62n,0xf09142114aa9a20cn],[315653n,0xac92bc65ad5c08fcn,0x00beeb115a566c19n,0x4ba882d8a4622437n],[631306n,0x745581440f92e80en,0x4da822cf7f896f41n,0x509d598678164ecdn],[1262612n,0x34dd99b4c69523a5n,0x64bc2e8f0d8b1044n,0xb03b1c96da5dd349n],[2525223n,0x6d2bbea9d6d25a08n,0xa0a4606a88e96b70n,0x182063bbc2fe8520n],[5050446n,0x2e8e47d63bfdd6e3n,0x2b55fa8976eaa3e9n,0x1a6b9d3086412a73n],[10100891n,0x54aa68efa1d719dfn,0xd8505806612c5c8fn,0xad068837fee8b43an],[20201782n,0x1c00464ccb7bae77n,0x9e3877784c77982cn,0xd94af3b61717404fn],[40403563n,0x1ea099c8be2b6cd0n,0x8bfb6d539fa50466n,0x6d3bc37e69a84218n],[80807125n,0x24a457f466ce8d18n,0xf2c8f3b81bc6bb59n,0xa78c757692e02d49n],[161614249n,0x347256677aba6b53n,0x3fbf90d30611a67cn,0x1e039d87e0bdb32bn],[323228497n,0x6b727daf0fd3432an,0x71f71121f9e4200fn,0x8fcd9942d486c10cn],[646456994n,0x2d18e84484d91f78n,0x4079bfe7829dec6fn,0x21551643e365abc6n]],$.W=[[1n,0x1999999999999999n,0x9999999999999999n,0x999999999999999an],[0n,0x8000000000000000n,0x0000000000000000n,0x0000000000000000n],[0n,0x4000000000000000n,0x0000000000000000n,0x0000000000000001n],[-1n,0xa000000000000000n,0x0000000000000000n,0x0000000000000000n],[-2n,0x6400000000000000n,0x0000000000000000n,0x0000000000000000n],[-4n,0x2710000000000000n,0x0000000000000000n,0x0000000000000001n],[-9n,0x3b9aca0000000000n,0x0000000000000000n,0x0000000000000001n],[-19n,0x8ac7230489e80000n,0x0000000000000000n,0x0000000000000000n],[-38n,0x4b3b4ca85a86c47an,0x098a224000000000n,0x0000000000000001n],[-77n,0xdd15fe86affad912n,0x49ef0eb713f39eben,0xaa987b6e6fd2a002n],[-154n,0xbeeefb584aff8603n,0xaafb550ffacfd8fan,0x5ca47e4f88d45371n],[-308n,0x8e679c2f5e44ff8fn,0x570f09eaa7ea7648n,0x5961db50c6d2b888n],[-616n,0x4f371b3399fc2ab0n,0x8170041c9feb05aan,0xc7c343447c75bcf6n],[-1233n,0xf51e928179013fd3n,0xde4bd12cde4d985cn,0x4a573ca6f94bff14n],[-2466n,0xeab388127bccaff7n,0x1667639142b9fbaen,0x775ec9995e1039fbn],[-4932n,0xd72cb2a95c7ef6ccn,0xe81bf1e825ba7515n,0xc2feb521d6cb5dcdn],[-9864n,0xb4dc1be6604502dcn,0xd491079b8eef6535n,0x578d3965d24de84dn],[-19728n,0x7fc6447bee60ea43n,0x2548da5c8b125b27n,0x5f42d1142f41d349n],[-39456n,0x3fc65180f88af8fbn,0x6a6915f383349413n,0x063c3708b6ceb291n],[-78913n,0x9ee0197c8dcd55bfn,0x2b2b9b942c38f4a2n,0x0f8ba634e9c706aen],[-157826n,0x629963a25b8b2d79n,0xd00b9d2286f70876n,0xe97004700c3644fcn],[-315652n,0x25f9cc308ceef4f3n,0x40f19543911a4546n,0xa2cd389452cfc366n],[-631305n,0x385597b0d47e76b8n,0x1b9f67e103bf2329n,0xc3119848595985f7n],[-1262611n,0x7bf795d276c12f66n,0x66a61d62a446659an,0xa1a4d73bebf093d5n],[-2525222n,0x3c07d96ab1ed7799n,0xcb7355c22cc05ac0n,0x4ffc0ab73b1f6a49n],[-5050445n,0x8cc4cd8c3edefb9an,0x6c8ff86a90a97e0cn,0x166cfddbf98b71bfn],[-10100890n,0x4d67d81cc88e1228n,0x1d7cfb06666b79b3n,0x7b916728aaa4e70dn],[-20201781n,0xea0c55494e7a552dn,0xb88cb9484bb86c61n,0x8d44893c610bb7dfn],[-40403562n,0xd5fa8c821ec0c24an,0xa80e46e764e0f8b0n,0xa7276bfa432fac7en],[-80807124n,0xb2dae307426f6791n,0xc970b82f58b12918n,0x0472592f7f39190en],[-161614248n,0x7cf51edd8a15f1c9n,0x656dab3498f8e697n,0x12daa2a80e53c807n],[-323228496n,0x3cfe609ab5883c50n,0xbec8b5d22b198871n,0xe18477703b4622b4n],[-646456993n,0x9152447b9d7cda9an,0x3b4d3f6110d77aadn,0xfa81bad1c394adb4n]];class B{constructor(e,t,r,s){this.negative=e,this._e=t,this.i=r,this.o=s}exponent(){return this._e-$.U}oe(){return this._e===0&&this.i===0n&&this.o===0n}ae(){return this._e===Ae(B,Ee,"f",Gn)&&this.i===0n&&this.o===0n}isNaN(){return this._e===Ae(B,Ee,"f",Gn)&&!(this.i===0n&&this.o===0n)}compareTo(e){if(this.isNaN())return e.isNaN()?0:1;if(e.isNaN())return-1;let t,r;if(this.negative){if(!e.negative)return-1;t=1,r=-1}else{if(e.negative)return 1;t=-1,r=1}return this._e<e._e?t:this._e>e._e?r:this.i<e.i?t:this.i>e.i?r:this.o<e.o?t:this.o>e.o?r:0}debug(){return(this.negative?"+":"-")+Ae(B,Ee,"m",Wo).call(B,this.i)+Ae(B,Ee,"m",Wo).call(B,this.o)+"*2^"+this.exponent()}static fromNumber(e){if(isNaN(e))return B.NaN;if(!isFinite(e))return e<0?B.ue:B.ce;if(e===0)return Math.sign(1/e)>0?B.le:B.Ee;const t=new DataView(new ArrayBuffer(8));t.setFloat64(0,e);const r=t.getBigUint64(0);let s=BigInt.asUintN(64,r<<12n),i=2047&Number(r>>52n);if(i===0){const a=$.te(s);s=a<63?s<<BigInt(a+1):0n,i=-a}return new B(e<0,Ae(B,Ee,"m",Or).call(B,i-1023),s,0n)}static fromString(e){if(e==="NaN")return B.NaN;if(e==="-Infinity")return B.ue;if(e==="Infinity"||e==="+Infinity")return B.ce;const t=new Array(e.length).fill(0);let r=0,s=0,i=0,a=!1;for(e[r]==="-"?(a=!0,r++):e[r]==="+"&&r++;Ae(B,Ee,"m",ri).call(B,e,r);)t[s++]=Ae(B,Ee,"m",si).call(B,e,r++);if(e[r]==="."){const l=++r;for(;Ae(B,Ee,"m",ri).call(B,e,r);)t[s++]=Ae(B,Ee,"m",si).call(B,e,r++);i=l-r}if(e[r]==="e"||e[r]==="E"){let l=0;r++;let f=1;e[r]==="-"?(f=-1,r++):e[r]==="+"&&r++;const p=r;for(;Ae(B,Ee,"m",ri).call(B,e,r);)if(l=10*l+Ae(B,Ee,"m",si).call(B,e,r++),r-p>9)throw new Error("Exponent too large "+e);if(r===p)throw new Error("Invalid number "+e);i+=l*f}if(s===0||r!==e.length)throw new Error("Invalid number "+e);const c=$.I(t.slice(0,s),i);return new B(a,c.exponent,c.i,c.o)}}Ee=B,Wo=function(e){return e.toString(16).padStart(16,"0")},ri=function(e,t){const r=e.codePointAt(t);return r!==void 0&&r>=48&&r<=57},si=function(e,t){return e.codePointAt(t)-48},Or=function(e){return e+$.U},Gn={value:Number($.m)},B.le=new B(!1,0,0n,0n),B.Ee=new B(!0,0,0n,0n),B.NaN=new B(!1,Ae(B,Ee,"f",Gn),1n<<63n,0n),B.ue=new B(!0,Ae(B,Ee,"f",Gn),0n,0n),B.ce=new B(!1,Ae(B,Ee,"f",Gn),0n,0n),new B(!0,Ae(B,Ee,"m",Or).call(B,63),0n,0n),new B(!1,Ae(B,Ee,"m",Or).call(B,0),0n,0n),new B(!0,Ae(B,Ee,"m",Or).call(B,0),0n,0n);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea=-1;function Bi(n){return n==null}function Yr(n){return n===0&&1/n==-1/0}function sg(n){return typeof n=="number"&&Number.isInteger(n)&&!Yr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function ig(n){return typeof n=="string"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wa="__type__",Ta="__vector__",Xr="value",og="server_timestamp",vh="__min__",Ia="__max__",Gt="__regex__",gi="pattern",_i="options",Zr="__oid__",xn="__int__",Zt="__decimal128__",_n="__request_timestamp__",yi="seconds",Ei="increment",qi="__binary__",nr={nullValue:"NULL_VALUE"},Ys={mapValue:{}};var re,Ye;(Ye=re||(re={})).he="regexValue",Ye.Te="bsonObjectIdValue",Ye.Pe="int32Value",Ye.Ie="decimal128Value",Ye.Re="bsonTimestampValue",Ye.Ae="bsonBinaryValue",Ye.Ve="minKeyValue",Ye.de="maxKeyValue",Ye.fe="maxValue",Ye.me="vectorValue",Ye.pe="serverTimestampValue",Ye.ge="regularMapValue";const Bu={[Ta]:re.me,[Ia]:re.fe,[og]:re.pe},Ah={[Gt]:re.he,[Zr]:re.Te,[xn]:re.Pe,[Zt]:re.Ie,[_n]:re.Re,[qi]:re.Ae,[vh]:re.Ve,[Ia]:re.de},ag=new Set(Object.values(Ah)),qe={booleanValue:!0},Te={booleanValue:!1};function me(n){if("nullValue"in n)return 0;if("booleanValue"in n)return 2;if("integerValue"in n||"doubleValue"in n)return 3;if("timestampValue"in n)return 4;if("stringValue"in n)return 7;if("bytesValue"in n)return 8;if("referenceValue"in n)return 9;if("geoPointValue"in n)return 11;if("arrayValue"in n)return 13;if(!("mapValue"in n))return q(28295,{value:n});switch(xh(n)){case re.pe:return 6;case re.fe:return 9007199254740991;case re.me:return 14;case re.he:return 12;case re.Te:return 10;case re.Pe:case re.Ie:return 3;case re.Re:return 5;case re.Ae:return 8;case re.Ve:return 1;case re.de:return 16;default:return 15}}function Xe(n,e,t){if(n===e)return!0;const r=me(n);if(r!==me(e))return!1;switch(r){case 0:case 9007199254740991:case 16:case 1:return!0;case 2:return n.booleanValue===e.booleanValue;case 6:return tr(n).isEqual(tr(e));case 4:return function(i,a){if(typeof i.timestampValue=="string"&&typeof a.timestampValue=="string"&&i.timestampValue.length===a.timestampValue.length)return i.timestampValue===a.timestampValue;const c=Xt(i.timestampValue),l=Xt(a.timestampValue);return c.seconds===l.seconds&&c.nanos===l.nanos}(n,e);case 7:return n.stringValue===e.stringValue;case 8:return function(i,a){return Vh(i,a)===0}(n,e);case 9:return n.referenceValue===e.referenceValue;case 11:return function(i,a){return ue(i.geoPointValue.latitude)===ue(a.geoPointValue.latitude)&&ue(i.geoPointValue.longitude)===ue(a.geoPointValue.longitude)}(n,e);case 3:return function(i,a,c){if(Ze(i)&&Ze(a))return Rh(i,a)===0;if("integerValue"in i&&"integerValue"in a||en(i)&&en(a))return ts(i)===ts(a);let l,f;if("doubleValue"in i&&"doubleValue"in a)l=ue(i.doubleValue),f=ue(a.doubleValue);else{if(!c?.ye)return!1;l=ue(i.integerValue??i.doubleValue),f=ue(a.integerValue??a.doubleValue)}return l===f?!!c?.we||Yr(l)===Yr(f):!!(c===void 0||c.be)&&isNaN(l)&&isNaN(f)}(n,e,t);case 13:return Zn(n.arrayValue.values||[],e.arrayValue.values||[],(s,i)=>Xe(s,i,t));case 14:case 15:return function(i,a,c){const l=i.mapValue.fields||{},f=a.mapValue.fields||{};if(Pn(l)!==Pn(f))return!1;for(const p in l)if(l.hasOwnProperty(p)&&(f[p]===void 0||!Xe(l[p],f[p],c)))return!1;return!0}(n,e,t);case 5:return Ph(n,e)===0;case 12:return Sh(n,e)===0;case 10:return Ch(n,e)===0;default:return q(52216,{left:n})}}function es(n,e){return(n.values||[]).find(t=>Xe(t,e))!==void 0}function $e(n,e){if(n===e)return 0;const t=me(n),r=me(e);if(t!==r)return Q(t,r);switch(t){case 0:case 1:case 16:case 9007199254740991:return 0;case 2:return Q(n.booleanValue,e.booleanValue);case 3:return ns(n,e);case 4:return $u(n.timestampValue,e.timestampValue);case 6:return $u(tr(n),tr(e));case 7:return Qr(n.stringValue,e.stringValue);case 8:return Vh(n,e);case 9:return function(i,a){const c=i.split("/"),l=a.split("/");for(let f=0;f<c.length&&f<l.length;f++){const p=Q(c[f],l[f]);if(p!==0)return p}return Q(c.length,l.length)}(n.referenceValue,e.referenceValue);case 11:return function(i,a){const c=Q(ue(i.latitude),ue(a.latitude));return c!==0?c:Q(ue(i.longitude),ue(a.longitude))}(n.geoPointValue,e.geoPointValue);case 13:return ju(n.arrayValue,e.arrayValue);case 14:return function(i,a){const c=i.fields||{},l=a.fields||{},f=c[Xr]?.arrayValue,p=l[Xr]?.arrayValue,m=Q(f?.values?.length||0,p?.values?.length||0);return m!==0?m:ju(f,p)}(n.mapValue,e.mapValue);case 15:return function(i,a){if(i===Ys.mapValue&&a===Ys.mapValue)return 0;if(i===Ys.mapValue)return 1;if(a===Ys.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),f=a.fields||{},p=Object.keys(f);l.sort(),p.sort();for(let m=0;m<l.length&&m<p.length;++m){const R=Qr(l[m],p[m]);if(R!==0)return R;const C=$e(c[l[m]],f[p[m]]);if(C!==0)return C}return Q(l.length,p.length)}(n.mapValue,e.mapValue);case 5:return Ph(n,e);case 12:return Sh(n,e);case 10:return Ch(n,e);default:throw q(23264,{Se:t})}}function ts(n){let e;return e=en(n)?n.mapValue.fields[xn].integerValue:n.integerValue||n.doubleValue,ue(e)}function bh(n){return n.mapValue.fields[Zt].stringValue}function ns(n,e){if(Ze(n)||Ze(e))return Rh(n,e);const t=ts(n),r=ts(e);return isNaN(t)?isNaN(r)?0:-1:isNaN(r)?1:Q(t,r)}function Rh(n,e){const t=qu(n),r=qu(e);return t.oe()&&r.oe()?0:t.isNaN()?r.isNaN()?0:-1:r.isNaN()?1:t.compareTo(r)}function qu(n){return Ze(n)?B.fromString(bh(n)):B.fromNumber(ts(n))}function $u(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Q(n,e);const t=Xt(n),r=Xt(e),s=Q(t.seconds,r.seconds);return s!==0?s:Q(t.nanos,r.nanos)}function ju(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=$e(t[s],r[s]);if(i!==void 0&&i!==0)return i}return Q(t.length,r.length)}function Ph(n,e){const t=n.mapValue.fields?.[_n].mapValue?.fields?.[yi],r=e.mapValue.fields?.[_n].mapValue?.fields?.[yi],s=n.mapValue.fields?.[_n].mapValue?.fields?.[Ei],i=e.mapValue.fields?.[_n].mapValue?.fields?.[Ei],a=ns(t,r);return a!==0?a:ns(s,i)}function zu(n){if("bytesValue"in n)return{subtype:0,bytes:Vn(n.bytesValue)};const e=n.mapValue?.fields,t=e?.[qi],r=t?.bytesValue;if(!r)throw new Error("Received incorrect value for BsonBinaryData");const s=Vn(r).toUint8Array();if(s.length===0)throw new Error("Received empty bytesValue for BsonBinaryData");const i=s[0],a=s.slice(1);return{subtype:i,bytes:oe.fromUint8Array(a)}}function Vh(n,e){const t=zu(n),r=zu(e);return t.subtype!==r.subtype?t.subtype<r.subtype?-1:1:t.bytes.compareTo(r.bytes)}function Sh(n,e){const t=n.mapValue.fields,r=t?.[Gt]?.mapValue?.fields?.[gi]?.stringValue??"",s=t?.[Gt]?.mapValue?.fields?.[_i]?.stringValue??"",i=e.mapValue.fields,a=i?.[Gt]?.mapValue?.fields?.[gi]?.stringValue??"",c=i?.[Gt]?.mapValue?.fields?.[_i]?.stringValue??"",l=Qr(r,a);return l!==0?l:Q(s,c)}function Ch(n,e){return Qr(n.mapValue.fields?.[Zr]?.stringValue??"",e.mapValue.fields?.[Zr]?.stringValue??"")}function rr(n){return Ko(n)}function Ko(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Xt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Vn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return F.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Ko(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${Ko(t.fields[a])}`;return s+"}"}(n.mapValue):q(61005,{value:n})}function wi(n){switch(me(n)){case 0:case 2:return 4;case 3:return Ze(n)?16:8;case 4:case 11:return 16;case 6:const e=Is(n);return e?16+wi(e):16;case 7:return 2*n.stringValue.length;case 8:return"bytesValue"in n?Vn(n.bytesValue).approximateByteSize():Gu(n.mapValue);case 9:return n.referenceValue.length;case 13:return function(r){return(r.values||[]).reduce((s,i)=>s+wi(i),0)}(n.arrayValue);case 14:case 15:case 12:case 10:case 5:case 1:case 16:return Gu(n.mapValue);default:throw q(13486,{value:n})}}function Gu(n){let e=0;return Cn(n.fields,(t,r)=>{e+=t.length+wi(r)}),e}function Hu(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ut(n){return!!n&&"integerValue"in n}function lt(n){return!!n&&"doubleValue"in n}function Ze(n){if(!n.mapValue?.fields)return!1;const e=n.mapValue.fields;return Pn(e)===1&&e[Zt]&&!!e[Zt].stringValue}function en(n){if(!n.mapValue?.fields)return!1;const e=n.mapValue.fields;return Pn(e)===1&&e[xn]?.integerValue!==void 0}function Vt(n){return ut(n)||lt(n)||!!n&&en(n)||!!n&&Ze(n)}function sr(n){return!!n&&"arrayValue"in n}function We(n){return!!n&&"nullValue"in n}function Ie(n){return!(!lt(n)||!isNaN(Number(n.doubleValue)))||!(!Ze(n)||bh(n)!=="NaN")}function En(n){return!!n&&"mapValue"in n}function xh(n){if(!n.mapValue?.fields)return re.ge;const e=n.mapValue.fields,t=e[wa]?.stringValue;if(t&&Bu[t])return Bu[t];if(Pn(e)===1){const r=Object.keys(e);return Ah[r[0]]??re.ge}return re.ge}function Qo(n){return(n?.mapValue?.fields||{})[wa]?.stringValue===Ta}function Jo(n){return(n?.mapValue?.fields||{})[Xr]?.arrayValue}function Fr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Cn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Fr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Fr(n.arrayValue.values[t]);return e}return{...n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e){this.value=e}static empty(){return new Ge({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!En(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Fr(t)}setAll(e){let t=Ke.emptyPath(),r={},s=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=Fr(a):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());En(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Xe(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];En(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Cn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Ge(Fr(this.value))}}function Nh(n){const e=[];return Cn(n.fields,(t,r)=>{const s=new Ke([t]);if(En(r)&&!function(a){return ag.has(xh(a))}(r)){const i=Nh(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new nt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function va(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Yr(e)?"-0":e}}function Wn(n){return{integerValue:""+n}}function Aa(n,e,t){return sg(e)?Wn(e):va(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(){this._=void 0}}function cg(n,e,t){return n instanceof rs?function(s,i){const a={fields:{[wh]:{stringValue:Eh},[Ih]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ya(i)&&(i=Is(i)),i&&(a.fields[Th]=i),{mapValue:a}}(t,e):n instanceof ss?Dh(n,e):n instanceof is?Oh(n,e):n instanceof os?function(s,i){const a=kh(s,i),c=Wu(a)+Wu(s.xe);return Ze(a)||Ze(s.xe)?{mapValue:{fields:{[Zt]:{stringValue:c.toString()}}}}:en(a)?lt(s.xe)?{doubleValue:c}:ut(s.xe)?{integerValue:c.toString()}:{mapValue:{fields:{[xn]:Wn(c)}}}:ut(a)&&(ut(s.xe)||en(s.xe))?Wn(c):va(s.serializer,c)}(n,e):n instanceof Ti?function(s,i){return!Vt(i)||Ie(s.xe)?s.xe:Ie(i)?i:ns(s.xe,i)<0?s.xe:i}(n,e):n instanceof Ii?function(s,i){return!Vt(i)||Ie(s.xe)?s.xe:Ie(i)?i:ns(s.xe,i)>0?s.xe:i}(n,e):void 0}function ug(n,e,t){return n instanceof ss?Dh(n,e):n instanceof is?Oh(n,e):t}function kh(n,e){return n instanceof os?Vt(e)?e:{integerValue:0}:null}class rs extends $i{}class ss extends $i{constructor(e){super(),this.elements=e}}function Dh(n,e){const t=Lh(e);for(const r of n.elements)t.some(s=>Xe(s,r))||t.push(r);return{arrayValue:{values:t}}}class is extends $i{constructor(e){super(),this.elements=e}}function Oh(n,e){let t=Lh(e);for(const r of n.elements)t=t.filter(s=>!Xe(s,r));return{arrayValue:{values:t}}}class ba extends $i{constructor(e,t){super(),this.serializer=e,this.xe=t}}class os extends ba{}class Ti extends ba{}class Ii extends ba{}function Wu(n){return ut(n)?ue(n.integerValue):lt(n)?ue(n.doubleValue):en(n)?ue(n.mapValue.fields[xn].integerValue):Ze(n)?parseFloat(n.mapValue.fields[Zt].stringValue):0}function Lh(n){return sr(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lg{constructor(e,t){this.field=e,this.transform=t}}function hg(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof ss&&s instanceof ss||r instanceof is&&s instanceof is?Zn(r.elements,s.elements,Xe):r instanceof os&&s instanceof os||r instanceof Ti&&s instanceof Ti||r instanceof Ii&&s instanceof Ii?Xe(r.xe,s.xe):r instanceof rs&&s instanceof rs}(n.transform,e.transform)}class fg{constructor(e,t){this.version=e,this.transformResults=t}}class ht{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ht}static exists(e){return new ht(void 0,e)}static updateTime(e){return new ht(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ii(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class ji{}function Mh(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ra(n.key,ht.none()):new vs(n.key,n.data,ht.none());{const t=n.data,r=Ge.empty();let s=new pe(Ke.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Nn(n.key,r,new nt(s.toArray()),ht.none())}}function dg(n,e,t){n instanceof vs?function(s,i,a){const c=s.value.clone(),l=Qu(s.fieldTransforms,i,a.transformResults);c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Nn?function(s,i,a){if(!ii(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=Qu(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(Uh(s)),l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Br(n,e,t,r){return n instanceof vs?function(i,a,c,l){if(!ii(i.precondition,a))return c;const f=i.value.clone(),p=Ju(i.fieldTransforms,l,a);return f.setAll(p),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(n,e,t,r):n instanceof Nn?function(i,a,c,l){if(!ii(i.precondition,a))return c;const f=Ju(i.fieldTransforms,l,a),p=a.data;return p.setAll(Uh(i)),p.setAll(f),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(n,e,t,r):function(i,a,c){return ii(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function pg(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=kh(r.transform,s||null);i!=null&&(t===null&&(t=Ge.empty()),t.set(r.field,i))}return t||null}function Ku(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Zn(r,s,(i,a)=>hg(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class vs extends ji{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Nn extends ji{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Uh(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Qu(n,e,t){const r=new Map;U(n.length===t.length,32656,{ve:t.length,De:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,ug(a,c,t[s]))}return r}function Ju(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,cg(i,a,e))}return r}class Ra extends ji{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class mg extends ji{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(e,t){this.position=e,this.inclusive=t}}function Yu(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=F.comparator(F.fromName(a.referenceValue),t.key):r=$e(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Xu(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Xe(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fh{}class de extends Fh{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new _g(e,t,r):t==="array-contains"?new wg(e,r):t==="in"?new Tg(e,r):t==="not-in"?new Ig(e,r):t==="array-contains-any"?new vg(e,r):new de(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new yg(e,r):new Eg(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison($e(t,this.value)):t!==null&&me(this.value)===me(t)&&this.matchesComparison($e(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return q(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class it extends Fh{constructor(e,t){super(),this.filters=e,this.op=t,this.Ce=null}static create(e,t){return new it(e,t)}matches(e){return Bh(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Ce!==null||(this.Ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Ce}getFilters(){return Object.assign([],this.filters)}}function Bh(n){return n.op==="and"}function qh(n){return gg(n)&&Bh(n)}function gg(n){for(const e of n.filters)if(e instanceof it)return!1;return!0}function Yo(n){if(n instanceof de)return n.field.canonicalString()+n.op.toString()+rr(n.value);if(qh(n))return n.filters.map(e=>Yo(e)).join(",");{const e=n.filters.map(t=>Yo(t)).join(",");return`${n.op}(${e})`}}function $h(n,e){return n instanceof de?function(r,s){return s instanceof de&&r.op===s.op&&r.field.isEqual(s.field)&&Xe(r.value,s.value)}(n,e):n instanceof it?function(r,s){return s instanceof it&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,c)=>i&&$h(a,s.filters[c]),!0):!1}(n,e):void q(19439)}function jh(n){return n instanceof de?function(t){return`${t.field.canonicalString()} ${t.op} ${rr(t.value)}`}(n):n instanceof it?function(t){return t.op.toString()+" {"+t.getFilters().map(jh).join(" ,")+"}"}(n):"Filter"}class _g extends de{constructor(e,t,r){super(e,t,r),this.key=F.fromName(r.referenceValue)}matches(e){const t=F.comparator(e.key,this.key);return this.matchesComparison(t)}}class yg extends de{constructor(e,t){super(e,"in",t),this.keys=zh("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Eg extends de{constructor(e,t){super(e,"not-in",t),this.keys=zh("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function zh(n,e){return(e.arrayValue?.values||[]).map(t=>F.fromName(t.referenceValue))}class wg extends de{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return sr(t)&&es(t.arrayValue,this.value)}}class Tg extends de{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&es(this.value.arrayValue,t)}}class Ig extends de{constructor(e,t){super(e,"not-in",t)}matches(e){if(es(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!es(this.value.arrayValue,t)}}class vg extends de{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!sr(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>es(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(e,t="asc"){this.field=e,this.dir=t}}function Ag(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{static fromTimestamp(e){return new G(e)}static min(){return new G(new te(0,0))}static max(){return new G(new te(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Ce(e,0,G.min(),G.min(),G.min(),Ge.empty(),0)}static newFoundDocument(e,t,r,s){return new Ce(e,1,t,G.min(),r,s,0)}static newNoDocument(e,t){return new Ce(e,2,t,G.min(),G.min(),Ge.empty(),0)}static newUnknownDocument(e,t){return new Ce(e,3,t,G.min(),G.min(),Ge.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(G.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ge.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ge.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=G.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ce&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ce(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const as=-1;function bg(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=G.fromTimestamp(r===1e9?new te(t+1,0):new te(t,r));return new tn(s,F.empty(),e)}function Rg(n){return new tn(n.readTime,n.key,as)}class tn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new tn(G.min(),F.empty(),as)}static max(){return new tn(G.max(),F.empty(),as)}}function Pg(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=F.comparator(n.documentKey,e.documentKey),t!==0?t:Q(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vg{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Fe=null}}function Zu(n,e=null,t=[],r=[],s=null,i=null,a=null){return new Vg(n,e,t,r,s,i,a)}function Gh(n){const e=H(n);if(e.Fe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Yo(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Bi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>rr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>rr(r)).join(",")),e.Fe=t}return e.Fe}function Hh(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Ag(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!$h(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Xu(n.startAt,e.startAt)&&Xu(n.endAt,e.endAt)}function gn(n){return!!n.isCorePipeline}function Wh(n){return!!n.path&&F.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=l,this.Oe=null,this.Me=null,this.Ne=null,this.startAt,this.endAt}}function Sg(n,e,t,r,s,i,a,c){return new As(n,e,t,r,s,i,a,c)}function Pa(n){return new As(n)}function el(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Cg(n){return F.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Kh(n){return n.collectionGroup!==null}function qr(n){const e=H(n);if(e.Oe===null){e.Oe=[];const t=new Set;for(const i of e.explicitOrderBy)e.Oe.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new pe(Ke.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(f=>{f.isInequality()&&(c=c.add(f.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Oe.push(new Ai(i,r))}),t.has(Ke.keyField().canonicalString())||e.Oe.push(new Ai(Ke.keyField(),r))}return e.Oe}function ft(n){const e=H(n);return e.Me||(e.Me=xg(e,qr(n))),e.Me}function xg(n,e){if(n.limitType==="F")return Zu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ai(s.field,i)});const t=n.endAt?new vi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new vi(n.startAt.position,n.startAt.inclusive):null;return Zu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Xo(n,e){const t=n.filters.concat([e]);return new As(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function bi(n,e,t){return new As(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Ng(n,e){return Hh(ft(n),ft(e))&&n.limitType===e.limitType}function $r(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>jh(s)).join(", ")}]`),Bi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>rr(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>rr(s)).join(",")),`Target(${r})`}(ft(n))}; limitType=${n.limitType})`}function zi(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):F.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of qr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,c,l){const f=Yu(a,c,l);return a.inclusive?f<=0:f<0}(r.startAt,qr(r),s)||r.endAt&&!function(a,c,l){const f=Yu(a,c,l);return a.inclusive?f>=0:f>0}(r.endAt,qr(r),s))}(n,e)}function Va(n){return(e,t)=>{let r=!1;for(const s of qr(n)){const i=kg(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function kg(n,e,t){const r=n.field.isKeyField()?F.comparator(e.key,t.key):function(i,a,c){const l=a.data.field(i),f=c.data.field(i);return l!==null&&f!==null?$e(l,f):q(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return q(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dg{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fe,X;function Og(n){switch(n){case V.OK:return q(64938);case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return q(15467,{code:n})}}function Qh(n){if(n===void 0)return Pt("GRPC error has no .code"),V.UNKNOWN;switch(n){case fe.OK:return V.OK;case fe.CANCELLED:return V.CANCELLED;case fe.UNKNOWN:return V.UNKNOWN;case fe.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case fe.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case fe.INTERNAL:return V.INTERNAL;case fe.UNAVAILABLE:return V.UNAVAILABLE;case fe.UNAUTHENTICATED:return V.UNAUTHENTICATED;case fe.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case fe.NOT_FOUND:return V.NOT_FOUND;case fe.ALREADY_EXISTS:return V.ALREADY_EXISTS;case fe.PERMISSION_DENIED:return V.PERMISSION_DENIED;case fe.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case fe.ABORTED:return V.ABORTED;case fe.OUT_OF_RANGE:return V.OUT_OF_RANGE;case fe.UNIMPLEMENTED:return V.UNIMPLEMENTED;case fe.DATA_LOSS:return V.DATA_LOSS;default:return q(39323,{code:n})}}(X=fe||(fe={}))[X.OK=0]="OK",X[X.CANCELLED=1]="CANCELLED",X[X.UNKNOWN=2]="UNKNOWN",X[X.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",X[X.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",X[X.NOT_FOUND=5]="NOT_FOUND",X[X.ALREADY_EXISTS=6]="ALREADY_EXISTS",X[X.PERMISSION_DENIED=7]="PERMISSION_DENIED",X[X.UNAUTHENTICATED=16]="UNAUTHENTICATED",X[X.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",X[X.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",X[X.ABORTED=10]="ABORTED",X[X.OUT_OF_RANGE=11]="OUT_OF_RANGE",X[X.UNIMPLEMENTED=12]="UNIMPLEMENTED",X[X.INTERNAL=13]="INTERNAL",X[X.UNAVAILABLE=14]="UNAVAILABLE",X[X.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Cn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return gh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lg=new ie(F.comparator);function Fe(){return Lg}const Jh=new ie(F.comparator);function $n(...n){let e=Jh;for(const t of n)e=e.insert(t.key,t);return e}function Yh(n){let e=Jh;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Bt(){return jr()}function Xh(){return jr()}function jr(){return new kn(n=>n.toString(),(n,e)=>n.isEqual(e))}const Mg=new ie(F.comparator),Ug=new pe(F.comparator);function J(...n){let e=Ug;for(const t of n)e=e.add(t);return e}const Fg=new pe(Q);function Bg(){return Fg}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qg(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $g=new Wt([4294967295,4294967295],0);function tl(n){const e=qg().encode(n),t=new uh;return t.update(e),new Uint8Array(t.digest())}function nl(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Wt([t,r],0),new Wt([s,i],0)]}class Sa{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Lr(`Invalid padding: ${t}`);if(r<0)throw new Lr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Lr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Lr(`Invalid padding when bitmap length is 0: ${t}`);this.Be=8*e.length-t,this.Le=Wt.fromNumber(this.Be)}$e(e,t,r){let s=e.add(t.multiply(Wt.fromNumber(r)));return s.compare($g)===1&&(s=new Wt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Le).toNumber()}Ue(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Be===0)return!1;const t=tl(e),[r,s]=nl(t);for(let i=0;i<this.hashCount;i++){const a=this.$e(r,s,i);if(!this.Ue(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Sa(i,s,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.Be===0)return;const t=tl(e),[r,s]=nl(t);for(let i=0;i<this.hashCount;i++){const a=this.$e(r,s,i);this.ke(a)}}ke(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Lr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(e,t,r,s,i,a){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=a}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Rs.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new bs(G.min(),s,new ie(Q),Fe(),Fe(),J())}}class Rs{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Rs(r,t,J(),J(),J())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi{constructor(e,t,r,s){this.Qe=e,this.removedTargetIds=t,this.key=r,this.qe=s}}class Zh{constructor(e,t){this.targetId=e,this.Ke=t}}class ef{constructor(e,t,r=oe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class rl{constructor(e){this.targetId=e,this.We=0,this.Ge=sl(),this.je=oe.EMPTY_BYTE_STRING,this.ze=!1,this.He=!0}get current(){return this.ze}get resumeToken(){return this.je}get Je(){return this.We!==0}get Ye(){return this.He}Ze(e){e.approximateByteSize()>0&&(this.He=!0,this.je=e)}Xe(){let e=J(),t=J(),r=J();return this.Ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:q(38017,{changeType:i})}}),new Rs(this.je,this.ze,e,t,r)}et(){this.He=!1,this.Ge=sl()}tt(e,t){this.He=!0,this.Ge=this.Ge.insert(e,t)}nt(e){this.He=!0,this.Ge=this.Ge.remove(e)}rt(){this.We+=1}it(){this.We-=1,U(this.We>=0,3241,{We:this.We,targetId:this.targetId})}st(){this.He=!0,this.ze=!0}}const Nr="WatchChangeAggregator";class jg{constructor(e){this._t=e,this.ot=new Map,this.ut=Fe(),this.ct=Xs(),this.lt=Fe(),this.Et=Xs(),this.ht=new ie(Q)}Tt(e){for(const t of e.Qe)e.qe&&e.qe.isFoundDocument()?this.Pt(t,e.qe):this.It(t,e.key,e.qe);for(const t of e.removedTargetIds)this.It(t,e.key,e.qe)}Rt(e){this.forEachTarget(e,t=>{const r=this.ot.get(t);if(r)switch(e.state){case 0:this.At(t)&&r.Ze(e.resumeToken);break;case 1:r.it(),r.Je||r.et(),r.Ze(e.resumeToken);break;case 2:r.it(),r.Je||this.removeTarget(t);break;case 3:this.At(t)&&(r.st(),r.Ze(e.resumeToken));break;case 4:this.At(t)&&(this.Vt(t),r.Ze(e.resumeToken));break;default:q(56790,{state:e.state})}else O(Nr,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ot.forEach((r,s)=>{this.At(s)&&t(s)})}dt(e){return gn(e)?e.getPipelineSourceType()==="documents"&&e.getPipelineDocuments()?.length===1:Wh(e)}ft(e){const t=e.targetId,r=e.Ke.count,s=this.gt(t);if(s){const i=s.target;if(this.dt(i))if(r===0){const a=new F(gn(i)?Z.fromString(i.getPipelineDocuments()[0]):i.path);this.It(t,a,Ce.newNoDocument(a,G.min()))}else U(r===1,20013,"Single document existence filter with count: "+r);else{const a=this.yt(t);if(a!==r){const c=this.wt(e),l=c?this.bt(c,e,a):1;if(l!==0){this.Vt(t);const f=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.ht=this.ht.insert(t,f)}}}}}wt(e){const t=e.Ke.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=Vn(r).toUint8Array()}catch(l){if(l instanceof yh)return st("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new Sa(a,s,i)}catch(l){return st(l instanceof Lr?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Be===0?null:c}bt(e,t,r){return t.Ke.count===r-this.vt(e,t.targetId)?0:2}vt(e,t){const r=this._t.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this._t.xt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.It(t,i,null),s++)}),s}Dt(e){const t=new Map;this.ot.forEach((i,a)=>{const c=this.gt(a);if(c){if(i.current&&this.dt(c.target)){const l=gn(c.target)?Z.fromString(c.target.getPipelineDocuments()[0]):c.target.path,f=new F(l);this.Ct(f).has(a)||this.Ft(a,f)||this.It(a,f,Ce.newNoDocument(f,e))}i.Ye&&(t.set(a,i.Xe()),i.et())}});let r=J();this.Et.forEach((i,a)=>{let c=!0;a.forEachWhile(l=>{const f=this.gt(l);return!f||f.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.ut.forEach((i,a)=>a.setReadTime(e)),this.lt.forEach((i,a)=>a.setReadTime(e));const s=new bs(e,t,this.ht,this.ut,this.lt,r);return this.ut=Fe(),this.ct=Xs(),this.lt=Fe(),this.Et=Xs(),this.ht=new ie(Q),s}Pt(e,t){const r=this.ot.get(e);if(!r||!this.At(e))return void O(Nr,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.Ft(e,t.key)?2:0;r.tt(t.key,s),gn(this.gt(e).target)&&this.gt(e).target.getPipelineFlavor()!=="exact"?this.lt=this.lt.insert(t.key,t):this.ut=this.ut.insert(t.key,t),this.ct=this.ct.insert(t.key,this.Ct(t.key).add(e)),this.Et=this.Et.insert(t.key,this.Ot(t.key).add(e))}It(e,t,r){const s=this.ot.get(e);s&&this.At(e)?(this.Ft(e,t)?s.tt(t,1):s.nt(t),this.Et=this.Et.insert(t,this.Ot(t).delete(e)),this.Et=this.Et.insert(t,this.Ot(t).add(e)),r&&(gn(this.gt(e).target)&&this.gt(e).target.getPipelineFlavor()!=="exact"?this.lt=this.lt.insert(t,r):this.ut=this.ut.insert(t,r))):O(Nr,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ot.delete(e)}yt(e){const t=this.ot.get(e);if(!t)return 0;const r=t.Xe();return this._t.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}rt(e){let t=this.ot.get(e);t||(O(Nr,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new rl(e),this.ot.set(e,t)),t.rt()}Ot(e){let t=this.Et.get(e);return t||(t=new pe(Q),this.Et=this.Et.insert(e,t)),t}Ct(e){let t=this.ct.get(e);return t||(t=new pe(Q),this.ct=this.ct.insert(e,t)),t}At(e){const t=this.gt(e)!==null;return t||O(Nr,"Detected inactive target",e),t}gt(e){const t=this.ot.get(e);return t===void 0||t.Je?null:this._t.Mt(e)}Vt(e){this.ot.set(e,new rl(e)),this._t.getRemoteKeysForTarget(e).forEach(t=>{this.It(e,t,null)})}Ft(e,t){return this._t.getRemoteKeysForTarget(e).has(t)}}function Xs(){return new ie(F.comparator)}function sl(){return new ie(F.comparator)}const zg={asc:"ASCENDING",desc:"DESCENDING"},Gg={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Hg={and:"AND",or:"OR"};class Wg{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Zo(n,e){return n.useProto3Json||Bi(e)?e:{value:e}}function zr(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ca(n){const e=Xt(n);return new te(e.seconds,e.nanos)}function ea(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function ai(n,e){return zr(n,e.toTimestamp())}function dt(n){return U(!!n,49232),G.fromTimestamp(Ca(n))}function xa(n,e){return ta(n,e).canonicalString()}function ta(n,e){const t=function(s){return new Z(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function tf(n){const e=Z.fromString(n);return U(af(e),10190,{key:e.toString()}),e}function Ri(n,e){return xa(n.databaseId,e.path)}function Oo(n,e){const t=tf(e);if(t.get(1)!==n.databaseId.projectId)throw new D(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new D(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new F(rf(t))}function nf(n,e){return xa(n.databaseId,e)}function Kg(n){const e=tf(n);return e.length===4?Z.emptyPath():rf(e)}function na(n){return new Z(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function rf(n){return U(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function il(n,e,t){return{name:Ri(n,e),fields:t.value.mapValue.fields}}function Qg(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:q(39313,{state:f})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(f,p){return f.useProto3Json?(U(p===void 0||typeof p=="string",58123),oe.fromBase64String(p||"")):(U(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),oe.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(f){const p=f.code===void 0?V.UNKNOWN:Qh(f.code);return new D(p,f.message||"")}(a);t=new ef(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Oo(n,r.document.name),i=dt(r.document.updateTime),a=r.document.createTime?dt(r.document.createTime):G.min(),c=new Ge({mapValue:{fields:r.document.fields}}),l=Ce.newFoundDocument(s,i,a,c),f=r.targetIds||[],p=r.removedTargetIds||[];t=new oi(f,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Oo(n,r.document),i=r.readTime?dt(r.readTime):G.min(),a=Ce.newNoDocument(s,i),c=r.removedTargetIds||[];t=new oi([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Oo(n,r.document),i=r.removedTargetIds||[];t=new oi([],i,s,null)}else{if(!("filter"in e))return q(11601,{Nt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new Dg(s,i),c=r.targetId;t=new Zh(c,a)}}return t}function Jg(n,e){let t;if(e instanceof vs)t={update:il(n,e.key,e.value)};else if(e instanceof Ra)t={delete:Ri(n,e.key)};else if(e instanceof Nn)t={update:il(n,e.key,e.data),updateMask:o_(e.fieldMask)};else{if(!(e instanceof mg))return q(16599,{Bt:e.type});t={verify:Ri(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const c=a.transform;if(c instanceof rs)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof ss)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof is)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof os)return{fieldPath:a.field.canonicalString(),increment:c.xe};if(c instanceof Ti)return{fieldPath:a.field.canonicalString(),minimum:c.xe};if(c instanceof Ii)return{fieldPath:a.field.canonicalString(),maximum:c.xe};throw q(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:ai(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:q(27497)}(n,e.precondition)),t}function Yg(n,e){return n&&n.length>0?(U(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?dt(s.updateTime):dt(i);return a.isEqual(G.min())&&(a=dt(i)),new fg(a,s.transformResults||[])}(t,e))):[]}function Xg(n,e){return{documents:[nf(n,e.path)]}}function Zg(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=nf(n,s);const i=function(f){if(f.length!==0)return of(it.create(f,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(f){if(f.length!==0)return f.map(p=>function(R){return{field:jn(R.field),direction:r_(R.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=Zo(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(e.endAt)),{Lt:t,parent:s}}function e_(n){let e=Kg(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){U(r===1,65062);const p=t.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let i=[];t.where&&(i=function(m){const R=sf(m);return R instanceof it&&qh(R)?R.getFilters():[R]}(t.where));let a=[];t.orderBy&&(a=function(m){return m.map(R=>function(x){return new Ai(zn(x.field),function(L){switch(L){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(x.direction))}(R))}(t.orderBy));let c=null;t.limit&&(c=function(m){let R;return R=typeof m=="object"?m.value:m,Bi(R)?null:R}(t.limit));let l=null;t.startAt&&(l=function(m){const R=!!m.before,C=m.values||[];return new vi(C,R)}(t.startAt));let f=null;return t.endAt&&(f=function(m){const R=!m.before,C=m.values||[];return new vi(C,R)}(t.endAt)),Sg(e,s,a,i,c,"F",l,f)}function t_(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return q(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function n_(n,e){return{structuredPipeline:{pipeline:{stages:e.stages.map(t=>t._toProto(n))}}}}function sf(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=zn(t.unaryFilter.field);return de.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=zn(t.unaryFilter.field);return de.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=zn(t.unaryFilter.field);return de.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=zn(t.unaryFilter.field);return de.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return q(61313);default:return q(60726)}}(n):n.fieldFilter!==void 0?function(t){return de.create(zn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return q(58110);default:return q(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return it.create(t.compositeFilter.filters.map(r=>sf(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return q(1026)}}(t.compositeFilter.op))}(n):q(30097,{filter:n})}function r_(n){return zg[n]}function s_(n){return Gg[n]}function i_(n){return Hg[n]}function jn(n){return{fieldPath:n.canonicalString()}}function zn(n){return Ke.fromServerFormat(n.fieldPath)}function of(n){return n instanceof de?function(t){if(t.op==="=="){if(Ie(t.value))return{unaryFilter:{field:jn(t.field),op:"IS_NAN"}};if(We(t.value))return{unaryFilter:{field:jn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Ie(t.value))return{unaryFilter:{field:jn(t.field),op:"IS_NOT_NAN"}};if(We(t.value))return{unaryFilter:{field:jn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:jn(t.field),op:s_(t.op),value:t.value}}}(n):n instanceof it?function(t){const r=t.getFilters().map(s=>of(s));return r.length===1?r[0]:{compositeFilter:{op:i_(t.op),filters:r}}}(n):q(54877,{filter:n})}function o_(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function af(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function cf(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function cs(n,e){const t={fields:{}};return e.forEach((r,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=r._toProto(n)}),{mapValue:t}}function uf(n){return{stringValue:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gi(n){return new Wg(n,!0)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Na{constructor(e){this.value=e}isEqual(e){return this.value===e.value}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka{constructor(e,t){if(this.seconds=e,this.increment=t,!Number.isInteger(e)||e<0||e>4294967295)throw new Error("BsonTimestamp 'seconds' must be in the range of a 32-bit unsigned integer (0-4294967295).");if(!Number.isInteger(t)||t<0||t>4294967295)throw new Error("BsonTimestamp 'increment' must be in the range of a 32-bit unsigned integer (0-4294967295).")}isEqual(e){return this.seconds===e.seconds&&this.increment===e.increment}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e,t=0){if(this.subtype=t,!Number.isInteger(t)||t<0||t>255)throw new D(V.INVALID_ARGUMENT,"The subtype for Bytes must be a value in the inclusive [0, 255] range.");this._byteString=e}static fromBase64String(e,t=0){try{return new He(oe.fromBase64String(e),t)}catch(r){throw new D(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+r)}}static fromUint8Array(e,t=0){return new He(oe.fromUint8Array(e),t)}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}get data(){return this.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+", subtype: "+this.subtype+")"}isEqual(e){return this.subtype===e.subtype&&this._byteString.isEqual(e._byteString)}toJSON(){const e={type:He._jsonSchemaVersion,bytes:this.toBase64()};return this.subtype!==0&&(e.subtype=this.subtype),e}static fromJSON(e){if(Ts(e,He._jsonSchema)){const t=e.subtype??0;return He.fromBase64String(e.bytes,t)}}}He._jsonSchemaVersion="firestore/bytes/1.0",He._jsonSchema={type:le("string",He._jsonSchemaVersion),bytes:le("string"),subtype:{...le("number"),optional:!0}};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e){this.stringValue=e,this.value=B.fromString(e)}isEqual(e){return!(!this.value.oe()||!e.value.oe())||this.value.compareTo(e.value)===0}toJSON(){return{Ut:{stringValue:this.stringValue}}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ke(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function a_(){return new Oa(er)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Q(this._lat,e._lat)||Q(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:pt._jsonSchemaVersion}}static fromJSON(e){if(Ts(e,pt._jsonSchema))return new pt(e.latitude,e.longitude)}}pt._jsonSchemaVersion="firestore/geoPoint/1.0",pt._jsonSchema={type:le("string",pt._jsonSchemaVersion),latitude:le("number"),longitude:le("number")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(e){this.value=e}isEqual(e){return this.value===e.value}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(){this.type="MaxKey"}static instance(){return wt.MAX_KEY_VALUE_INSTANCE||(wt.MAX_KEY_VALUE_INSTANCE=new wt),wt.MAX_KEY_VALUE_INSTANCE}}wt.MAX_KEY_VALUE_INSTANCE=null;/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(){this.type="MinKey"}static instance(){return Tt.MIN_KEY_VALUE_INSTANCE||(Tt.MIN_KEY_VALUE_INSTANCE=new Tt),Tt.MIN_KEY_VALUE_INSTANCE}}Tt.MIN_KEY_VALUE_INSTANCE=null;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Se.UNAUTHENTICATED=new Se(null),Se.GOOGLE_CREDENTIALS=new Se("google-credentials-uid"),Se.FIRST_PARTY=new Se("first-party-uid"),Se.MOCK_USER=new Se("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class c_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Se.UNAUTHENTICATED))}shutdown(){}}class u_{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class l_{constructor(e){this.kt=e,this.currentUser=Se.UNAUTHENTICATED,this.Qt=0,this.forceRefresh=!1,this.auth=null}start(e,t){U(this.qt===void 0,42304);let r=this.Qt;const s=l=>this.Qt!==r?(r=this.Qt,t(l)):Promise.resolve();let i=new wn;this.qt=()=>{this.Qt++,this.currentUser=this.Kt(),i.resolve(),i=new wn,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},c=l=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.qt&&(this.auth.addAuthTokenListener(this.qt),a())};this.kt.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.kt.getImmediate({optional:!0});l?c(l):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new wn)}},0),a()}getToken(){const e=this.Qt,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.Qt!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(U(typeof r.accessToken=="string",31837,{Wt:r}),new lf(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.qt&&this.auth.removeAuthTokenListener(this.qt),this.qt=void 0}Kt(){const e=this.auth&&this.auth.getUid();return U(e===null||typeof e=="string",2055,{Gt:e}),new Se(e)}}class h_{constructor(e,t,r){this.jt=e,this.zt=t,this.Ht=r,this.type="FirstParty",this.user=Se.FIRST_PARTY,this.Jt=new Map}Yt(){return this.Ht?this.Ht():null}get headers(){this.Jt.set("X-Goog-AuthUser",this.jt);const e=this.Yt();return e&&this.Jt.set("Authorization",e),this.zt&&this.Jt.set("X-Goog-Iam-Authorization-Token",this.zt),this.Jt}}class f_{constructor(e,t,r){this.jt=e,this.zt=t,this.Ht=r}getToken(){return Promise.resolve(new h_(this.jt,this.zt,this.Ht))}start(e,t){e.enqueueRetryable(()=>t(Se.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ol{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class d_{constructor(e,t){this.Zt=t,this.forceRefresh=!1,this.appCheck=null,this.Xt=null,this.en=null,tt(e)&&e.settings.appCheckToken&&(this.en=e.settings.appCheckToken)}start(e,t){U(this.qt===void 0,3512);const r=i=>{i.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.Xt;return this.Xt=i.token,O("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.qt=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.qt&&this.appCheck.addTokenListener(this.qt)};this.Zt.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.Zt.getImmediate({optional:!0});i?s(i):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.en)return Promise.resolve(new ol(this.en));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(U(typeof t.token=="string",44558,{tokenResult:t}),this.Xt=t.token,new ol(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.qt&&this.appCheck.removeTokenListener(this.qt),this.qt=void 0}}function hf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p_{tn(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const al="ConnectivityMonitor";class cl{constructor(){this.nn=()=>this.rn(),this.sn=()=>this._n(),this.an=[],this.un()}tn(e){this.an.push(e)}shutdown(){window.removeEventListener("online",this.nn),window.removeEventListener("offline",this.sn)}un(){window.addEventListener("online",this.nn),window.addEventListener("offline",this.sn)}rn(){O(al,"Network connectivity changed: AVAILABLE");for(const e of this.an)e(0)}_n(){O(al,"Network connectivity changed: UNAVAILABLE");for(const e of this.an)e(1)}static cn(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zs=null;function ra(){return Zs===null?Zs=function(){return 268435456+Math.round(2147483648*Math.random())}():Zs++,"0x"+Zs.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lo="RestConnection",m_={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class g_{get En(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.hn=t+"://"+e.host,this.Tn=`projects/${r}/databases/${s}`,this.Pn=this.databaseId.database===mi?`project_id=${r}`:`project_id=${r}&database_id=${s}`}In(e,t,r,s,i){const a=ra(),c=this.Rn(e,t.toUriEncodedString());O(Lo,`Sending RPC '${e}' ${a}:`,c,r);const l={"google-cloud-resource-prefix":this.Tn,"x-goog-request-params":this.Pn};this.An(l,s,i);const{host:f}=new URL(c),p=Es(f);return this.Vn(e,c,l,r,p).then(m=>(O(Lo,`Received RPC '${e}' ${a}: `,m),m),m=>{throw st(Lo,`RPC '${e}' ${a} failed with error: `,m,"url: ",c,"request:",r),m})}dn(e,t,r,s,i,a){return this.In(e,t,r,s,i)}An(e,t,r){if(e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+cr}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s),this.databaseInfo._customHeaders)for(const s of Object.keys(this.databaseInfo._customHeaders))e[s]=this.databaseInfo._customHeaders[s]}Rn(e,t){const r=m_[e];let s=`${this.hn}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class __{constructor(e){this.fn=e.fn,this.mn=e.mn}pn(e){this.gn=e}yn(e){this.wn=e}bn(e){this.Sn=e}onMessage(e){this.xn=e}close(){this.mn()}send(e){this.fn(e)}vn(){this.gn()}Dn(){this.wn()}Cn(e){this.Sn(e)}Fn(e){this.xn(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ve="WebChannelConnection",kr=(n,e,t)=>{n.listen(e,r=>{try{t(r)}catch(s){setTimeout(()=>{throw s},0)}})};class Kn extends g_{constructor(e){super(e),this.On=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static Mn(){if(!Kn.Nn){const e=dh();kr(e,fh.STAT_EVENT,t=>{t.stat===Ho.PROXY?O(Ve,"STAT_EVENT: detected buffering proxy"):t.stat===Ho.NOPROXY&&O(Ve,"STAT_EVENT: detected no buffering proxy")}),Kn.Nn=!0}}Vn(e,t,r,s,i){const a=ra();return new Promise((c,l)=>{const f=new lh;f.setWithCredentials(!0),f.listenOnce(hh.COMPLETE,()=>{try{switch(f.getLastErrorCode()){case ni.NO_ERROR:const m=f.getResponseJson();O(Ve,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(m)),c(m);break;case ni.TIMEOUT:O(Ve,`RPC '${e}' ${a} timed out`),l(new D(V.DEADLINE_EXCEEDED,"Request time out"));break;case ni.HTTP_ERROR:const R=f.getStatus();if(O(Ve,`RPC '${e}' ${a} failed with status:`,R,"response text:",f.getResponseText()),R>0){let C=f.getResponseJson();Array.isArray(C)&&(C=C[0]);const x=C?.error;if(x&&x.status&&x.message){const M=function(W){const ee=W.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(ee)>=0?ee:V.UNKNOWN}(x.status);l(new D(M,x.message))}else l(new D(V.UNKNOWN,"Server responded with status "+f.getStatus()))}else l(new D(V.UNAVAILABLE,"Connection failed."));break;default:q(9055,{Bn:e,streamId:a,Ln:f.getLastErrorCode(),$n:f.getLastError()})}}finally{O(Ve,`RPC '${e}' ${a} completed.`)}});const p=JSON.stringify(s);O(Ve,`RPC '${e}' ${a} sending request:`,s),f.send(t,"POST",p,r,15)})}Un(e,t,r){const s=ra(),i=[this.hn,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.useFetchStreams=!0),this.An(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const f=i.join("");O(Ve,`Creating RPC '${e}' stream ${s}: ${f}`,c);const p=a.createWebChannel(f,c);this.kn(p);let m=!1,R=!1;const C=new __({fn:x=>{R?O(Ve,`Not sending because RPC '${e}' stream ${s} is closed:`,x):(m||(O(Ve,`Opening RPC '${e}' stream ${s} transport.`),p.open(),m=!0),O(Ve,`RPC '${e}' stream ${s} sending:`,x),p.send(x))},mn:()=>p.close()});return kr(p,Dr.EventType.OPEN,()=>{R||(O(Ve,`RPC '${e}' stream ${s} transport opened.`),C.vn())}),kr(p,Dr.EventType.CLOSE,()=>{R||(R=!0,O(Ve,`RPC '${e}' stream ${s} transport closed`),C.Cn(),this.Qn(p))}),kr(p,Dr.EventType.ERROR,x=>{R||(R=!0,st(Ve,`RPC '${e}' stream ${s} transport errored. Name:`,x.name,"Message:",x.message),C.Cn(new D(V.UNAVAILABLE,"The operation could not be completed")))}),kr(p,Dr.EventType.MESSAGE,x=>{if(!R){const M=x.data[0];U(!!M,16349);const L=M,W=L?.error||L[0]?.error;if(W){O(Ve,`RPC '${e}' stream ${s} received error:`,W);const ee=W.status;let ae=function(ve){const T=fe[ve];if(T!==void 0)return Qh(T)}(ee),Oe=W.message;ee==="NOT_FOUND"&&Oe.includes("database")&&Oe.includes("does not exist")&&Oe.includes(this.databaseId.database)&&st(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),ae===void 0&&(ae=V.INTERNAL,Oe="Unknown error status: "+ee+" with message "+W.message),R=!0,C.Cn(new D(ae,Oe)),p.close()}else O(Ve,`RPC '${e}' stream ${s} received:`,M),C.Fn(M)}}),Kn.Mn(),setTimeout(()=>{C.Dn()},0),C}terminate(){this.On.forEach(e=>e.close()),this.On=[]}kn(e){this.On.push(e)}Qn(e){this.On=this.On.filter(t=>t===e)}An(e,t,r){super.An(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return ph()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y_(n){return new Kn(n)}Kn.Nn=!1;class ff{constructor(e,t,r=1e3,s=1.5,i=6e4){this.qn=e,this.timerId=t,this.Kn=r,this.Wn=s,this.Gn=i,this.jn=0,this.zn=null,this.Hn=Date.now(),this.reset()}reset(){this.jn=0}Jn(){this.jn=this.Gn}Yn(e){this.cancel();const t=Math.floor(this.jn+this.Zn()),r=Math.max(0,Date.now()-this.Hn),s=Math.max(0,t-r);s>0&&O("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.jn} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.zn=this.qn.enqueueAfterDelay(this.timerId,s,()=>(this.Hn=Date.now(),e())),this.jn*=this.Wn,this.jn<this.Kn&&(this.jn=this.Kn),this.jn>this.Gn&&(this.jn=this.Gn)}Xn(){this.zn!==null&&(this.zn.skipDelay(),this.zn=null)}cancel(){this.zn!==null&&(this.zn.cancel(),this.zn=null)}Zn(){return(Math.random()-.5)*this.jn}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ul="PersistentStream";class df{constructor(e,t,r,s,i,a,c,l){this.qn=e,this.er=r,this.tr=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.nr=0,this.rr=null,this.ir=null,this.stream=null,this.sr=0,this._r=new ff(e,t)}ar(){return this.state===1||this.state===5||this.ur()}ur(){return this.state===2||this.state===3}start(){this.sr=0,this.state!==4?this.auth():this.cr()}async stop(){this.ar()&&await this.close(0)}lr(){this.state=0,this._r.reset()}Er(){this.ur()&&this.rr===null&&(this.rr=this.qn.enqueueAfterDelay(this.er,6e4,()=>this.hr()))}Tr(e){this.Pr(),this.stream.send(e)}async hr(){if(this.ur())return this.close(0)}Pr(){this.rr&&(this.rr.cancel(),this.rr=null)}Ir(){this.ir&&(this.ir.cancel(),this.ir=null)}async close(e,t){this.Pr(),this.Ir(),this._r.cancel(),this.nr++,e!==4?this._r.reset():t&&t.code===V.RESOURCE_EXHAUSTED?(Pt(t.toString()),Pt("Using maximum backoff delay to prevent overloading the backend."),this._r.Jn()):t&&t.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Rr(),this.stream.close(),this.stream=null),this.state=e,await this.listener.bn(t)}Rr(){}auth(){this.state=1;const e=this.Ar(this.nr),t=this.nr;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.nr===t&&this.Vr(r,s)},r=>{e(()=>{const s=new D(V.UNKNOWN,"Fetching auth token failed: "+r.message);return this.dr(s)})})}Vr(e,t){const r=this.Ar(this.nr);this.stream=this.mr(e,t),this.stream.pn(()=>{r(()=>this.listener.pn())}),this.stream.yn(()=>{r(()=>(this.state=2,this.ir=this.qn.enqueueAfterDelay(this.tr,1e4,()=>(this.ur()&&(this.state=3),Promise.resolve())),this.listener.yn()))}),this.stream.bn(s=>{r(()=>this.dr(s))}),this.stream.onMessage(s=>{r(()=>++this.sr==1?this.pr(s):this.onNext(s))})}cr(){this.state=5,this._r.Yn(async()=>{this.state=0,this.start()})}dr(e){return O(ul,`close with error: ${e}`),this.stream=null,this.close(4,e)}Ar(e){return t=>{this.qn.enqueueAndForget(()=>this.nr===e?t():(O(ul,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class E_ extends df{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}mr(e,t){return this.connection.Un("Listen",e,t)}pr(e){return this.onNext(e)}onNext(e){this._r.reset();const t=Qg(this.serializer,e),r=function(i){if(!("targetChange"in i))return G.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?G.min():a.readTime?dt(a.readTime):G.min()}(e);return this.listener.gr(t,r)}yr(e){const t={};t.database=na(this.serializer),t.addTarget=function(i,a){let c;const l=a.target;if(c=gn(l)?{pipelineQuery:n_(i,l)}:Wh(l)?{documents:Xg(i,l)}:{query:Zg(i,l).Lt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=ea(i,a.resumeToken);const f=Zo(i,a.expectedCount);f!==null&&(c.expectedCount=f)}else if(a.snapshotVersion.compareTo(G.min())>0){c.readTime=zr(i,a.snapshotVersion.toTimestamp());const f=Zo(i,a.expectedCount);f!==null&&(c.expectedCount=f)}return c}(this.serializer,e);const r=t_(this.serializer,e);r&&(t.labels=r),this.Tr(t)}wr(e){const t={};t.database=na(this.serializer),t.removeTarget=e,this.Tr(t)}}class w_ extends df{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get br(){return this.sr>0}start(){this.lastStreamToken=void 0,super.start()}Rr(){this.br&&this.Sr([])}mr(e,t){return this.connection.Un("Write",e,t)}pr(e){return U(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,U(!e.writeResults||e.writeResults.length===0,55816),this.listener.vr()}onNext(e){U(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this._r.reset();const t=Yg(e.writeResults,e.commitTime),r=dt(e.commitTime);return this.listener.Dr(r,t)}Cr(){const e={};e.database=na(this.serializer),this.Tr(e)}Sr(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Jg(this.serializer,r))};this.Tr(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{}class I_ extends T_{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.Fr=!1}Or(){if(this.Fr)throw new D(V.FAILED_PRECONDITION,"The client has already been terminated.")}In(e,t,r,s){return this.Or(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.In(e,ta(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new D(V.UNKNOWN,i.toString())})}dn(e,t,r,s,i){return this.Or(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.dn(e,ta(t,r),s,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new D(V.UNKNOWN,a.toString())})}terminate(){this.Fr=!0,this.connection.terminate()}}function v_(n,e,t,r){return new I_(n,e,t,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A_="ComponentProvider",ll=new Map;function b_(n,e,t,r,s){return new ng(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,hf(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r,s._customHeaders,s.grpcFlowControlWindow)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},pf=41943040;class Me{static withCacheSize(e){return new Me(e,Me.DEFAULT_COLLECTION_PERCENTILE,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}Me.DEFAULT_COLLECTION_PERCENTILE=10,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Me.DEFAULT=new Me(pf,Me.DEFAULT_COLLECTION_PERCENTILE,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Me.DISABLED=new Me(-1,0,0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hi{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.Mr(r),this.Nr=r=>t.writeSequenceNumber(r))}Mr(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.Nr&&this.Nr(e),e}}Hi.Br=-1;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R_="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class P_{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ur(n){if(n.code!==V.FAILED_PRECONDITION||n.message!==R_)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&q(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new S((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof S?t:S.resolve(t)}catch(t){return S.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):S.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):S.reject(t)}static resolve(e){return new S((t,r)=>{t(e)})}static reject(e){return new S((t,r)=>{r(e)})}static waitFor(e){return new S((t,r)=>{let s=0,i=0,a=!1;e.forEach(c=>{++s,c.next(()=>{++i,a&&i===s&&t()},l=>r(l))}),a=!0,i===s&&t()})}static or(e){let t=S.resolve(!1);for(const r of e)t=t.next(s=>s?S.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new S((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let l=0;l<i;l++){const f=l;t(e[f]).next(p=>{a[f]=p,++c,c===i&&r(a)},p=>s(p))}})}static doWhile(e,t){return new S((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function V_(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function lr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fl="LruGarbageCollector",S_=1048576;function dl([n,e],[t,r]){const s=Q(n,t);return s===0?Q(e,r):s}class C_{constructor(e){this.ai=e,this.buffer=new pe(dl),this.ui=0}ci(){return++this.ui}li(e){const t=[e,this.ci()];if(this.buffer.size<this.ai)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();dl(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class x_{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ei=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.hi(6e4)}stop(){this.Ei&&(this.Ei.cancel(),this.Ei=null)}get started(){return this.Ei!==null}hi(e){O(fl,`Garbage collection scheduled in ${e}ms`),this.Ei=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ei=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){lr(t)?O(fl,"Ignoring IndexedDB error during garbage collection: ",t):await ur(t)}await this.hi(3e5)})}}class N_{constructor(e,t){this.Ti=e,this.params=t}calculateTargetCount(e,t){return this.Ti.Pi(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return S.resolve(Hi.Br);const r=new C_(t);return this.Ti.forEachTarget(e,s=>r.li(s.sequenceNumber)).next(()=>this.Ti.Ii(e,s=>r.li(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Ti.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Ti.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(hl)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),hl):this.Ri(e,t))}getCacheSize(e){return this.Ti.getCacheSize(e)}Ri(e,t){let r,s,i,a,c,l,f;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,a=Date.now(),this.nthSequenceNumber(e,s))).next(m=>(r=m,c=Date.now(),this.removeTargets(e,r,t))).next(m=>(i=m,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(f=Date.now(),Bn()<=Y.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${m} documents in `+(f-l)+`ms
Total Duration: ${f-p}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m})))}}function k_(n,e){return new N_(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mf="firestore.googleapis.com",pl=!0;class ml{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new D(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=mf,this.ssl=pl}else this.host=e.host,this.ssl=e.ssl??pl;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e._customHeaders&&(this._customHeaders={...e._customHeaders}),e.cacheSizeBytes===void 0)this.cacheSizeBytes=pf;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<S_)throw new D(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}if(eg("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=hf(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new D(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new D(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new D(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams,e.grpcFlowControlWindow!==void 0){if(typeof e.grpcFlowControlWindow!="number"||e.grpcFlowControlWindow<=0||e.grpcFlowControlWindow>2147483647||!Number.isInteger(e.grpcFlowControlWindow))throw new D(V.INVALID_ARGUMENT,"grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");this.grpcFlowControlWindow=e.grpcFlowControlWindow}}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams&&this.grpcFlowControlWindow===e.grpcFlowControlWindow&&function(r,s){if(r===s)return!0;if(!r||!s)return!1;const i=Object.keys(r),a=Object.keys(s);if(i.length!==a.length)return!1;for(const c of i)if(r[c]!==s[c])return!1;return!0}(this._customHeaders,e._customHeaders)}}let Wi=class{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ml({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ml(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new c_;switch(r.type){case"firstParty":return new f_(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new D(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=ll.get(t);r&&(O(A_,"Removing Datastore"),ll.delete(t),r.terminate())}(this),Promise.resolve()}};function D_(n,e,t,r={}){n=yn(n,Wi);const s=Es(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&ih(`https://${c}`),i.host!==mf&&i.host!==c&&st("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...i,host:c,ssl:s,emulatorOptions:r};if(!An(l,a)&&(n._setSettings(l),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=Se.MOCK_USER;else{f=Np(r.mockUserToken,n._app?.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new D(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Se(m)}n._authCredentials=new u_(new lf(f,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Dn(this.firestore,e,this._query)}}class he{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Kt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new he(this.firestore,e,this._key)}toJSON(){return{type:he._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Ts(t,he._jsonSchema))return new he(e,r||null,new F(Z.fromString(t.referencePath)))}}he._jsonSchemaVersion="firestore/documentReference/1.0",he._jsonSchema={type:le("string",he._jsonSchemaVersion),referencePath:le("string")};class Kt extends Dn{constructor(e,t,r){super(e,t,Pa(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new he(this.firestore,null,new F(e))}withConverter(e){return new Kt(this.firestore,e,this._path)}}function K0(n,e,...t){if(n=Qe(n),_h("collection","path",e),n instanceof Wi){const r=Z.fromString(e,...t);return Mu(r),new Kt(n,null,r)}{if(!(n instanceof he||n instanceof Kt))throw new D(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Z.fromString(e,...t));return Mu(r),new Kt(n.firestore,null,r)}}function Q0(n,e,...t){if(n=Qe(n),arguments.length===1&&(e=_a.newId()),_h("doc","path",e),n instanceof Wi){const r=Z.fromString(e,...t);return Lu(r),new he(n,null,new F(r))}{if(!(n instanceof he||n instanceof Kt))throw new D(V.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Z.fromString(e,...t));return Lu(r),new he(n.firestore,n instanceof Kt?n.converter:null,new F(r))}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ua{constructor(e,t){this.pattern=e,this.options=t}isEqual(e){return this.pattern===e.pattern&&this.options===e.options}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Be._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ts(e,Be._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Be(e.vectorValues);throw new D(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Be._jsonSchemaVersion="firestore/vectorValue/1.0",Be._jsonSchema={type:le("string",Be._jsonSchemaVersion),vectorValues:le("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O_=/^__.*__$/;class L_{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Nn(e,this.data,this.fieldMask,t,this.fieldTransforms):new vs(e,this.data,t,this.fieldTransforms)}}function gf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw q(40011,{dataSource:n})}}class Fa{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new Fa({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){const t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){const t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Pi(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(gf(this.dataSource)&&O_.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class M_{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Gi(e)}createContext(e,t,r,s=!1){return new Fa({dataSource:e,methodName:t,targetDoc:r,path:Ke.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function _f(n){const e=n._freezeSettings(),t=Gi(n._databaseId);return new M_(n._databaseId,!!e.ignoreUndefinedProperties,t)}function U_(n,e,t,r,s,i={}){const a=n.createContext(i.merge||i.mergeFields?2:0,e,t,s);Tf("Data must be an object, but it was:",a,r);const c=yf(r,a);let l,f;if(i.merge)l=new nt(a.fieldMask),f=a.fieldTransforms;else if(i.mergeFields){const p=[];for(const m of i.mergeFields){const R=Ki(e,m,t);if(!a.contains(R))throw new D(V.INVALID_ARGUMENT,`Field '${R}' is specified in your field mask but missing from your input data.`);$_(p,R)||p.push(R)}l=new nt(p),f=a.fieldTransforms.filter(m=>l.covers(m.field))}else l=null,f=a.fieldTransforms;return new L_(new Ge(c),l,f)}class Ba extends La{_toFieldTransform(e){return new lg(e.path,new rs)}isEqual(e){return e instanceof Ba}}function F_(n,e,t,r=!1){return ir(t,n.createContext(r?4:3,e))}function ir(n,e,t){if(wf(n=Qe(n)))return Tf("Unsupported field value:",e,n),yf(n,e);if(n instanceof La)return function(s,i){if(!gf(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);const a=s._toFieldTransform(i);a&&i.fieldTransforms.push(a)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return function(s,i){const a=[];let c=0;for(const l of s){let f=ir(l,i.childContextForArray(c));f==null&&(f={nullValue:"NULL_VALUE"}),a.push(f),c++}return{arrayValue:{values:a}}}(n,e)}return function(s,i,a){if((s=Qe(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return Aa(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const c=te.fromDate(s);return{timestampValue:zr(i.serializer,c)}}if(s instanceof te){const c=new te(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:zr(i.serializer,c)}}if(Ef(s)){const c=te.fromInstant(s),l=new te(c.seconds,1e3*Math.floor(c.nanoseconds/1e3));return{timestampValue:zr(i.serializer,l)}}if(s instanceof pt)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof He)return s.subtype===0?{bytesValue:ea(i.serializer,s._byteString)}:function(l,f){const p=f.toUint8Array(),m=new Uint8Array(p.length+1);return m[0]=f.subtype,m.set(p,1),{mapValue:{fields:{[qi]:{bytesValue:ea(l,oe.fromUint8Array(m))}}}}}(i.serializer,s);if(s instanceof he){const c=i.databaseId,l=s.firestore._databaseId;if(!l.isEqual(c))throw i.createError(`Document reference is for database ${l.projectId}/${l.database} but should be for database ${c.projectId}/${c.database}`);return{referenceValue:xa(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof Be)return function(l,f){const p=l instanceof Be?l.toArray():l;return{mapValue:{fields:{[wa]:{stringValue:Ta},[Xr]:{arrayValue:{values:p.map(R=>{if(typeof R!="number")throw f.createError("VectorValues must only contain numeric values.");return va(f.serializer,R)})}}}}}}(s,i);if(s instanceof Ua)return function(l){return{mapValue:{fields:{[Gt]:{mapValue:{fields:{[gi]:{stringValue:l.pattern},[_i]:{stringValue:l.options}}}}}}}}(s);if(s instanceof Na)return function(l){return{mapValue:{fields:{[Zr]:{stringValue:l.value}}}}}(s);if(s instanceof Ma)return function(l){return{mapValue:{fields:{[xn]:Wn(l.value)}}}}(s);if(s instanceof Da)return function(l){return{mapValue:{fields:{[Zt]:{stringValue:l.stringValue}}}}}(s);if(s instanceof ka)return function(l){return{mapValue:{fields:{[_n]:{mapValue:{fields:{[yi]:Wn(l.seconds),[Ei]:Wn(l.increment)}}}}}}}(s);if(s instanceof Tt)return function(){return{mapValue:{fields:{[vh]:{nullValue:"NULL_VALUE"}}}}}();if(s instanceof wt)return function(){return{mapValue:{fields:{[Ia]:{nullValue:"NULL_VALUE"}}}}}();if(cf(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${Fi(s)}`)}(n,e)}function yf(n,e){const t={};return gh(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Cn(n,(r,s)=>{const i=ir(s,e.childContextForField(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function Ef(n){if(typeof n!="object"||n===null)return!1;if(typeof Temporal<"u"&&typeof Temporal.Instant=="function"&&n instanceof Temporal.Instant)return!0;const e=n;return e[Symbol.toStringTag]==="Temporal.Instant"&&typeof e.t=="bigint"}function wf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof te||n instanceof pt||n instanceof He||n instanceof he||n instanceof La||n instanceof Be||n instanceof Tt||n instanceof wt||n instanceof Ma||n instanceof Da||n instanceof Ua||n instanceof Na||n instanceof ka||Ef(n)||cf(n))}function Tf(n,e,t){if(!wf(t)||!ws(t)){const r=Fi(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function Ki(n,e,t){if((e=Qe(e))instanceof Oa)return e._internalPath;if(typeof e=="string")return q_(n,e);throw Pi("Field path arguments must be of type string or ",n,!1,void 0,t)}const B_=new RegExp("[~\\*/\\[\\]]");function q_(n,e,t){if(e.search(B_)>=0)throw Pi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Oa(...e.split("."))._internalPath}catch{throw Pi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Pi(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${r}`),a&&(l+=` in document ${s}`),l+=")"),new D(V.INVALID_ARGUMENT,c+n+l)}function $_(n,e){return n.some(t=>t.isEqual(e))}function j_(n){return typeof n._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const r=Ge.empty();for(const s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){const i=this.optionDefinitions[s];if(s in e){const a=e[s];let c;i.nestedOptions&&ws(a)?c={mapValue:{fields:new Ne(i.nestedOptions).getOptionsProto(t,a)}}:a&&(c=ir(a,t)??void 0),c&&r.set(Ke.fromServerFormat(i.serverName),c)}}return r}getOptionsProto(e,t,r){const s=this._getKnownOptions(t,e);if(r){const i=new Map(Zm(r,(a,c)=>[Ke.fromServerFormat(c),a!==void 0?ir(a,e):null]));s.setAll(i)}return s.value.mapValue.fields??{}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z_(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")}(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")}(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))}(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!ws(t.fields))}(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))}(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))}(n.pipelineValue)))}function J0(){return new Ba("serverTimestamp")}function G_(n){return new Be(n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N(n){let e;return n instanceof On?n:(e=ws(n)?Y_(n):n instanceof Array?X_(n):If(n,void 0),e)}function Mo(n){if(n instanceof On)return n;if(n instanceof Be)return us(n);if(Array.isArray(n))return us(G_(n));throw new Error("Unsupported value: "+typeof n)}function qa(n){return ig(n)?K_(n):N(n)}class On{constructor(){this._protoValueType="ProtoValue"}add(e){return new P("add",[this,N(e)],"add")}asBoolean(){if(this instanceof nn)return this;if(this instanceof hr)return new Af(this);if(this instanceof Ps)return new J_(this);if(this instanceof P)return new vf(this);throw new D("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new P("subtract",[this,N(e)],"subtract")}multiply(e){return new P("multiply",[this,N(e)],"multiply")}divide(e){return new P("divide",[this,N(e)],"divide")}mod(e){return new P("mod",[this,N(e)],"mod")}equal(e){return new P("equal",[this,N(e)],"equal").asBoolean()}notEqual(e){return new P("not_equal",[this,N(e)],"notEqual").asBoolean()}lessThan(e){return new P("less_than",[this,N(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new P("less_than_or_equal",[this,N(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new P("greater_than",[this,N(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new P("greater_than_or_equal",[this,N(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){const r=[e,...t].map(s=>N(s));return new P("array_concat",[this,...r],"arrayConcat")}arrayContains(e){return new P("array_contains",[this,N(e)],"arrayContains").asBoolean()}arrayContainsAll(e){const t=Array.isArray(e)?new Mr(e.map(N),"arrayContainsAll"):e;return new P("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){const t=Array.isArray(e)?new Mr(e.map(N),"arrayContainsAny"):e;return new P("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new P("array_reverse",[this])}arrayLength(){return new P("array_length",[this],"arrayLength")}equalAny(e){const t=Array.isArray(e)?new Mr(e.map(N),"equalAny"):e;return new P("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){const t=Array.isArray(e)?new Mr(e.map(N),"notEqualAny"):e;return new P("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new P("exists",[this],"exists").asBoolean()}charLength(){return new P("char_length",[this],"charLength")}like(e){return new P("like",[this,N(e)],"like").asBoolean()}regexContains(e){return new P("regex_contains",[this,N(e)],"regexContains").asBoolean()}regexFind(e){return new P("regex_find",[this,N(e)],"regexFind")}regexFindAll(e){return new P("regex_find_all",[this,N(e)],"regexFindAll")}regexMatch(e){return new P("regex_match",[this,N(e)],"regexMatch").asBoolean()}stringContains(e){return new P("string_contains",[this,N(e)],"stringContains").asBoolean()}startsWith(e){return new P("starts_with",[this,N(e)],"startsWith").asBoolean()}endsWith(e){return new P("ends_with",[this,N(e)],"endsWith").asBoolean()}toLower(){return new P("to_lower",[this],"toLower")}toUpper(){return new P("to_upper",[this],"toUpper")}trim(e){const t=[this];return e&&t.push(N(e)),new P("trim",t,"trim")}ltrim(e){const t=[this];return e&&t.push(N(e)),new P("ltrim",t,"ltrim")}rtrim(e){const t=[this];return e&&t.push(N(e)),new P("rtrim",t,"rtrim")}type(){return new P("type",[this])}isType(e){return new P("is_type",[this,us(e)],"isType").asBoolean()}stringConcat(e,...t){const r=[e,...t].map(N);return new P("string_concat",[this,...r],"stringConcat")}stringIndexOf(e){return new P("string_index_of",[this,N(e)],"stringIndexOf")}stringRepeat(e){return new P("string_repeat",[this,N(e)],"stringRepeat")}stringReplaceAll(e,t){return new P("string_replace_all",[this,N(e),N(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new P("string_replace_one",[this,N(e),N(t)],"stringReplaceOne")}concat(e,...t){const r=[e,...t].map(N);return new P("concat",[this,...r],"concat")}reverse(){return new P("reverse",[this],"reverse")}arrayFilter(e,t){return new P("array_filter",[this,N(e),t],"arrayFilter")}arrayTransform(e,t){return new P("array_transform",[this,N(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,r){return new P("array_transform",[this,N(e),N(t),r],"arrayTransformWithIndex")}arraySlice(e,t){const r=[this,N(e)];return t!==void 0&&r.push(N(t)),new P("array_slice",r,"arraySlice")}arrayFirst(){return new P("array_first",[this],"arrayFirst")}arrayFirstN(e){return new P("array_first_n",[this,N(e)],"arrayFirstN")}arrayLast(){return new P("array_last",[this],"arrayLast")}arrayLastN(e){return new P("array_last_n",[this,N(e)],"arrayLastN")}arrayMaximum(){return new P("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new P("maximum_n",[this,N(e)],"arrayMaximumN")}arrayMinimum(){return new P("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new P("minimum_n",[this,N(e)],"arrayMinimumN")}arrayIndexOf(e){return new P("array_index_of",[this,N(e),N("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new P("array_index_of",[this,N(e),N("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new P("array_index_of_all",[this,N(e)],"arrayIndexOfAll")}byteLength(){return new P("byte_length",[this],"byteLength")}ceil(){return new P("ceil",[this])}floor(){return new P("floor",[this])}abs(){return new P("abs",[this])}exp(){return new P("exp",[this])}mapGet(e){return new P("map_get",[this,us(e)],"mapGet")}mapSet(e,t,...r){const s=[this,N(e),N(t),...r.map(N)];return new P("map_set",s,"mapSet")}mapKeys(){return new P("map_keys",[this],"mapKeys")}mapValues(){return new P("map_values",[this],"mapValues")}mapEntries(){return new P("map_entries",[this],"mapEntries")}getField(e){return new P("get_field",[this,N(e)],"get_field")}count(){return ze._create("count",[this],"count")}sum(){return ze._create("sum",[this],"sum")}average(){return ze._create("average",[this],"average")}minimum(){return ze._create("minimum",[this],"minimum")}maximum(){return ze._create("maximum",[this],"maximum")}first(){return ze._create("first",[this],"first")}last(){return ze._create("last",[this],"last")}arrayAgg(){return ze._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return ze._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return ze._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){const r=[e,...t];return new P("maximum",[this,...r.map(N)],"logicalMaximum")}logicalMinimum(e,...t){const r=[e,...t];return new P("minimum",[this,...r.map(N)],"minimum")}vectorLength(){return new P("vector_length",[this],"vectorLength")}cosineDistance(e){return new P("cosine_distance",[this,Mo(e)],"cosineDistance")}dotProduct(e){return new P("dot_product",[this,Mo(e)],"dotProduct")}euclideanDistance(e){return new P("euclidean_distance",[this,Mo(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new P("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new P("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new P("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new P("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new P("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new P("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new P("timestamp_add",[this,N(e),N(t)],"timestampAdd")}timestampSubtract(e,t){return new P("timestamp_subtract",[this,N(e),N(t)],"timestampSubtract")}timestampDiff(e,t){return new P("timestamp_diff",[this,qa(e),N(t)],"timestampDiff")}timestampExtract(e,t){const r=[this,N(e)];return t&&r.push(N(t)),new P("timestamp_extract",r,"timestampExtract")}documentId(){return new P("document_id",[this],"documentId")}parent(){return new P("parent",[this],"parent")}substring(e,t){const r=N(e);return new P("substring",t===void 0?[this,r]:[this,r,N(t)],"substring")}arrayGet(e){return new P("array_get",[this,N(e)],"arrayGet")}isError(){return new P("is_error",[this],"isError").asBoolean()}ifError(e){const t=new P("if_error",[this,N(e)],"ifError");return e instanceof nn?t.asBoolean():t}isAbsent(){return new P("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new P("map_remove",[this,N(e)],"mapRemove")}mapMerge(e,...t){const r=N(e),s=t.map(N);return new P("map_merge",[this,r,...s],"mapMerge")}pow(e){return new P("pow",[this,N(e)])}trunc(e){return e===void 0?new P("trunc",[this]):new P("trunc",[this,N(e)],"trunc")}round(e){return e===void 0?new P("round",[this]):new P("round",[this,N(e)],"round")}collectionId(){return new P("collection_id",[this])}length(){return new P("length",[this])}ln(){return new P("ln",[this])}sqrt(){return new P("sqrt",[this])}stringReverse(){return new P("string_reverse",[this])}ifAbsent(e){return new P("if_absent",[this,N(e)],"ifAbsent")}ifNull(e){return new P("if_null",[this,N(e)],"ifNull")}coalesce(e,...t){return new P("coalesce",[this,N(e),...t.map(N)],"coalesce")}join(e){return new P("join",[this,N(e)],"join")}log10(){return new P("log10",[this])}arraySum(){return new P("sum",[this])}split(e){return new P("split",[this,N(e)])}timestampTruncate(e,t){const r=[this,N(e)];return t&&r.push(N(t)),new P("timestamp_trunc",r)}ascending(){return Z_(this)}descending(){return ey(this)}as(e){return new W_(this,e,"as")}}class ze{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,r){const s=new ze(e,t);return s._methodName=r,s}as(e){return new H_(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map(t=>t._toProto(e))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e))}}class H_{constructor(e,t,r){this.aggregate=e,this.alias=t,this._methodName=r}_readUserData(e){this.aggregate._readUserData(e)}}class W_{constructor(e,t,r){this.expr=e,this.alias=t,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}}class Mr extends On{constructor(e,t){super(),this.di=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.di.map(t=>t._toProto(e))}}}_readUserData(e){this.di.forEach(t=>t._readUserData(e))}}class Ps extends On{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new P("geo_distance",[this,N(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}}function K_(n){return Q_(n,"field")}function Q_(n,e){return new Ps(typeof n=="string"?er===n?a_()._internalPath:Ki("field",n):n._internalPath,e)}class hr extends On{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){const t=new hr(e,void 0);return t._protoValue=e,t}_toProto(e){return U(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,z_(this._protoValue)||(this._protoValue=ir(this.value,e))}}function us(n,e){return If(n,"constant")}function If(n,e){const t=new hr(n,e);return typeof n=="boolean"?new Af(t):t}class P extends On{constructor(e,t,r,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,r!==void 0&&(this._methodName=r),s!==void 0&&(this._options=s)}get _optionsUtil(){return new Ne({})}_toProto(e){const t={functionValue:{name:this.name,args:this.params.map(r=>r._toProto(e))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e)),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}}class nn extends On{get _methodName(){return this._expr._methodName}countIf(){return ze._create("count_if",[this],"countIf")}not(){return new P("not",[this],"not").asBoolean()}conditional(e,t){return new P("conditional",[this,e,t],"conditional")}ifError(e){const t=N(e),r=new P("if_error",[this,t],"ifError");return t instanceof nn?r.asBoolean():r}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}}class vf extends nn{constructor(e){super(),this._expr=e,this.expressionType="Function"}}class Af extends nn{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class J_ extends nn{constructor(e){super(),this._expr=e,this.expressionType="Field"}}function Y_(n,e){const t=[];for(const r in n)if(Object.prototype.hasOwnProperty.call(n,r)){const s=n[r];t.push(us(r)),t.push(N(s))}return new P("map",t,"map")}function X_(n){return function(t,r){return new P("array",t.map(s=>N(s)),r)}(n,"array")}function Z_(n){return new bf(qa(n),"ascending","ascending")}function ey(n){return new bf(qa(n),"descending","descending")}class bf{constructor(e,t,r){this.expr=e,this.direction=t,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:uf(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}}class Je{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}}class Rf extends Je{get _name(){return"add_fields"}get _optionsUtil(){return new Ne({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[cs(e,this.fields)]}}_readUserData(e){super._readUserData(e),rn(this.fields,e)}}class Pf extends Je{get _name(){return"aggregate"}get _optionsUtil(){return new Ne({})}constructor(e,t,r){super(r),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[cs(e,this.accumulators),cs(e,this.groups)]}}_readUserData(e){super._readUserData(e),rn(this.groups,e),rn(this.accumulators,e)}}class Vf extends Je{get _name(){return"distinct"}get _optionsUtil(){return new Ne({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[cs(e,this.groups)]}}_readUserData(e){super._readUserData(e),rn(this.groups,e)}}class Qi extends Je{get _name(){return"collection"}get _optionsUtil(){return new Ne({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.pi=ny(e)}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.pi}]}}_readUserData(e){super._readUserData(e)}}class Ji extends Je{get _name(){return"collection_group"}get _optionsUtil(){return new Ne({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}}class $a extends Je{get _name(){return"database"}get _optionsUtil(){return new Ne({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}}class ja extends Je{get _name(){return"documents"}get _optionsUtil(){return new Ne({})}constructor(e,t){if(super(t),!e||e.length===0)throw new D(V.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const r=e.map(i=>i.startsWith("/")?i:"/"+i),s=new Set(r);if(s.size!==r.length)throw new D(V.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.gi=r,this.yi=s}_toProto(e){return{...super._toProto(e),args:this.gi.map(t=>({referenceValue:t}))}}_readUserData(e){super._readUserData(e)}}class za extends Je{get _name(){return"where"}get _optionsUtil(){return new Ne({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),rn(this.condition,e)}}class ls extends Je{get _name(){return"limit"}get _optionsUtil(){return new Ne({})}constructor(e,t){U(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[Aa(e,this.limit)]}}}class gl extends Je{get _name(){return"offset"}get _optionsUtil(){return new Ne({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[Aa(e,this.offset)]}}}class ty extends Je{get _name(){return"select"}get _optionsUtil(){return new Ne({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[cs(e,this.selections)]}}_readUserData(e){super._readUserData(e),rn(this.selections,e)}}class Ga extends Je{get _name(){return"sort"}get _optionsUtil(){return new Ne({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map(t=>t._toProto(e))}}_readUserData(e){super._readUserData(e),rn(this.orderings,e)}}class Ha extends Je{get _name(){return"replace_with"}get _optionsUtil(){return new Ne({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),uf(Ha.bi)]}}_readUserData(e){super._readUserData(e),rn(this.map,e)}}Ha.bi="full_replace";function ny(n){const e=typeof n=="string"?n:n.path;return e.startsWith("/")?e:"/"+e}function rn(n,e){return j_(n)?n._readUserData(e):Array.isArray(n)?n.forEach(t=>t._readUserData(e)):n instanceof Map?n.forEach(t=>t._readUserData(e)):Object.values(n).forEach(t=>t._readUserData(e)),n}// Copyright 2024 Google LLC* @license
class Ue{constructor(e,t,r){this.serializer=e,this.stages=t,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return Yi(this)}getPipelineCollectionGroup(){return Wa(this)}getPipelineCollectionId(){return ry(this)}getPipelineDocuments(){return sa(this)}getPipelineFlavor(){return function(t){let r="exact";return t.stages.forEach((s,i)=>{s._name!==Vf.name&&s._name!==Pf.name||(r="keyless"),s._name===ty.name&&r==="exact"&&(r="augmented"),s._name===Rf.name&&i<t.stages.length-1&&r==="exact"&&(r="augmented")}),r}(this)}getPipelineSourceType(){return Qt(this)}}function Qt(n){const e=n.stages[0];return e instanceof Qi||e instanceof Ji||e instanceof $a||e instanceof ja?e._name:"unknown"}function Yi(n){if(Qt(n)==="collection")return n.stages[0].pi}function Wa(n){if(Qt(n)==="collection_group")return n.stages[0].collectionId}function ry(n){switch(Qt(n)){case"collection":return Z.fromString(Yi(n)).lastSegment();case"collection_group":return Wa(n);default:return}}function sa(n){if(Qt(n)==="documents")return n.stages[0].gi}class E{constructor(e,t){this.type=e,this.value=t}static Oi(){return new E("ERROR",void 0)}static Mi(){return new E("UNSET",void 0)}static Ni(){return new E("NULL",nr)}static newValue(e){return We(e)?new E("NULL",nr):function(r){return!!r&&"booleanValue"in r}(e)?new E("BOOLEAN",e):ut(e)?new E("INT",e):lt(e)?new E("DOUBLE",e):function(r){return!!r&&"timestampValue"in r&&!!r.timestampValue}(e)?new E("TIMESTAMP",e):function(r){return!!r&&"stringValue"in r}(e)?new E("STRING",e):function(r){return!!r&&"bytesValue"in r}(e)?new E("BYTES",e):e.referenceValue?new E("REFERENCE",e):e.geoPointValue?new E("GEO_POINT",e):sr(e)?new E("ARRAY",e):Qo(e)?new E("VECTOR",e):En(e)?new E("MAP",e):new E("ERROR",void 0)}Bi(){return this.type==="ERROR"||this.type==="UNSET"}Li(){return this.type==="NULL"}}function Gr(n){if(!n.Bi())return n.value}function Sf(n){return n instanceof nn?n._expr:n}function j(n){if((n=Sf(n))instanceof Ps)return new sy(n);if(n instanceof hr)return new iy(n);if(n instanceof Mr)return new oy(n);if(n instanceof P){if(n.name==="add")return new uy(n);if(n.name==="subtract")return new ly(n);if(n.name==="multiply")return new hy(n);if(n.name==="divide")return new fy(n);if(n.name==="mod")return new dy(n);if(n.name==="and")return new py(n);if(n.name==="equal")return new Ry(n);if(n.name==="not_equal")return new Py(n);if(n.name==="less_than")return new Vy(n);if(n.name==="less_than_or_equal")return new Sy(n);if(n.name==="greater_than")return new Cy(n);if(n.name==="greater_than_or_equal")return new xy(n);if(n.name==="array_concat")return new Ny(n);if(n.name==="array_reverse")return new ky(n);if(n.name==="array_contains")return new Dy(n);if(n.name==="array_contains_all")return new Oy(n);if(n.name==="array_contains_any")return new Ly(n);if(n.name==="array_length")return new My(n);if(n.name==="array_element")return new Uy(n);if(n.name==="equal_any")return new Cf(n);if(n.name==="not_equal_any")return new gy(n);if(n.name==="is_nan")return new _y(n);if(n.name==="is_not_nan")return new yy(n);if(n.name==="is_null")return new Ey(n);if(n.name==="is_not_null")return new wy(n);if(n.name==="is_error")return new Ty(n);if(n.name==="exists")return new Iy(n);if(n.name==="not")return new Xi(n);if(n.name==="or")return new my(n);if(n.name==="xor")return new Ka(n);if(n.name==="conditional")return new vy(n);if(n.name==="maximum")return new Ay(n);if(n.name==="minimum")return new by(n);if(n.name==="reverse")return new Fy(n);if(n.name==="replace_first")return new By(n);if(n.name==="replace_all")return new qy(n);if(n.name==="char_length")return new $y(n);if(n.name==="byte_length")return new jy(n);if(n.name==="like")return new zy(n);if(n.name==="regex_contains")return new Gy(n);if(n.name==="regex_match")return new Hy(n);if(n.name==="string_contains")return new Wy(n);if(n.name==="starts_with")return new Ky(n);if(n.name==="ends_with")return new Qy(n);if(n.name==="to_lower")return new Jy(n);if(n.name==="to_upper")return new Yy(n);if(n.name==="trim")return new Xy(n);if(n.name==="string_concat")return new Zy(n);if(n.name==="map_get")return new eE(n);if(n.name==="cosine_distance")return new tE(n);if(n.name==="dot_product")return new nE(n);if(n.name==="euclidean_distance")return new rE(n);if(n.name==="vector_length")return new sE(n);if(n.name==="unix_micros_to_timestamp")return new uE(n);if(n.name==="timestamp_to_unix_micros")return new fE(n);if(n.name==="unix_millis_to_timestamp")return new lE(n);if(n.name==="timestamp_to_unix_millis")return new dE(n);if(n.name==="unix_seconds_to_timestamp")return new hE(n);if(n.name==="timestamp_to_unix_seconds")return new pE(n);if(n.name==="timestamp_add")return new mE(n);if(n.name==="timestamp_subtract")return new gE(n)}throw new Error(`Unknown Expr : ${n}`)}class sy{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===er)return E.newValue({referenceValue:Ri(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return E.newValue({timestampValue:ai(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return E.newValue({timestampValue:ai(e.serializer,t.createTime)});const r=t.data.field(this.expr._fieldPath);return r?ya(r)?E.newValue(function(i,a){if(i.serverTimestampBehavior==="estimate")return{timestampValue:ai(i.serializer,G.fromTimestamp(tr(a)))};if(i.serverTimestampBehavior==="previous"){const c=Is(a);if(c)return c}return{nullValue:"NULL_VALUE"}}(e,r)):E.newValue(r):E.Mi()}}class iy{constructor(e){this.expr=e}evaluate(e,t){return E.newValue(this.expr._getValue())}}class oy{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.di.map(s=>j(s).evaluate(e,t));return r.some(s=>s.Bi())?E.Oi():E.newValue({arrayValue:{values:r.map(s=>s.value)}})}}function Re(n){return lt(n)?Number(n.doubleValue):Number(n.integerValue)}function _t(n){return BigInt(n.integerValue)}const ay=BigInt("0x7fffffffffffffff"),cy=-BigInt("0x8000000000000000");class Vs{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length>=2,24778);const r=j(this.expr.params[0]).evaluate(e,t),s=j(this.expr.params[1]).evaluate(e,t);let i=this.$i(r,s);for(const a of this.expr.params.slice(2)){const c=j(a).evaluate(e,t);i=this.$i(i,c)}return i}$i(e,t){if(e.Bi()||t.Bi())return E.Oi();if(e.Li()||t.Li())return E.Ni();const r=e.value,s=t.value;if(!lt(r)&&!ut(r)||!lt(s)&&!ut(s))return E.Oi();if(lt(r)||lt(s)){const i=this.Ui(r,s);return i?E.newValue(i):E.Oi()}if(ut(r)&&ut(s)){const i=this.ki(r,s);return i===void 0?E.Oi():typeof i=="number"?E.newValue({doubleValue:i}):i<cy||i>ay?E.Oi():E.newValue({integerValue:`${i}`})}return E.Oi()}}function St(n,e){return me(n)!==me(e)?"TYPE_MISMATCH":Ie(n)||Ie(e)?"NOT_EQ":We(n)&&We(e)?"EQ":We(n)||We(e)?"NULL":sr(n)&&sr(e)?function(r,s){if(r.values?.length!==s.values?.length)return"NOT_EQ";let i=!1;for(let a=0;a<(r.values?.length??0);a++){const c=r.values[a],l=s.values[a];switch(St(c,l)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:q(44609,{Qi:c,qi:l})}}return i?"NULL":"EQ"}(n.arrayValue,e.arrayValue):Qo(n)&&Qo(e)||En(n)&&En(e)?function(r,s){const i=r.fields||{},a=s.fields||{};if(Pn(i)!==Pn(a))return"NOT_EQ";let c=!1;for(const l in i)if(i.hasOwnProperty(l)){if(a[l]===void 0)return"NOT_EQ";switch(St(i[l],a[l])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":c=!0}}return c?"NULL":"EQ"}(n.mapValue,e.mapValue):function(r,s){return Xe(r,s,{be:!1,ye:!0,we:!0})}(n,e)?"EQ":"NOT_EQ"}class uy extends Vs{ki(e,t){return _t(e)+_t(t)}Ui(e,t){return{doubleValue:Re(e)+Re(t)}}}class ly extends Vs{constructor(e){super(e),this.expr=e}ki(e,t){return _t(e)-_t(t)}Ui(e,t){return{doubleValue:Re(e)-Re(t)}}}class hy extends Vs{constructor(e){super(e),this.expr=e}ki(e,t){return _t(e)*_t(t)}Ui(e,t){return{doubleValue:Re(e)*Re(t)}}}class fy extends Vs{constructor(e){super(e),this.expr=e}ki(e,t){const r=_t(t);if(r!==BigInt(0))return _t(e)/r}Ui(e,t){const r=Re(t);return r===0?{doubleValue:Yr(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:Re(e)/r}}}class dy extends Vs{constructor(e){super(e),this.expr=e}ki(e,t){const r=_t(t);if(r!==BigInt(0))return _t(e)%r}Ui(e,t){const r=Re(t);if(r!==0)return{doubleValue:Re(e)%r}}}class py{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(const i of this.expr.params){const a=j(i).evaluate(e,t);switch(a.type){case"BOOLEAN":if(!a.value?.booleanValue)return E.newValue(Te);break;case"NULL":s=!0;break;default:r=!0}}return r?E.Oi():s?E.Ni():E.newValue(qe)}}class Xi{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,9634);const r=j(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return E.newValue({booleanValue:!r.value?.booleanValue});case"NULL":return E.Ni();default:return E.Oi()}}}class my{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(const i of this.expr.params){const a=j(i).evaluate(e,t);switch(a.type){case"BOOLEAN":if(a.value?.booleanValue)return E.newValue(qe);break;case"NULL":s=!0;break;default:r=!0}}return r?E.Oi():s?E.Ni():E.newValue(Te)}}class Ka{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(const i of this.expr.params){const a=j(i).evaluate(e,t);switch(a.type){case"BOOLEAN":r=Ka.xor(r,!!a.value?.booleanValue);break;case"NULL":s=!0;break;default:return E.Oi()}}return s?E.Ni():E.newValue({booleanValue:r})}static xor(e,t){return(e||t)&&!(e&&t)}}class Cf{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===2,55094);let r=!1;const s=j(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return E.Oi()}const i=j(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.Oi()}if(r)return E.Ni();for(const a of i.value?.arrayValue?.values??[])switch(We(s.value)&&We(a)?"EQ":St(s.value,a)){case"EQ":return E.newValue(qe);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:q(44608,{value:s.value,candidate:a})}return r?E.Ni():E.newValue(Te)}}class gy{constructor(e){this.expr=e}evaluate(e,t){return new Xi(new P("not",[new P("equal_any",this.expr.params)])).evaluate(e,t)}}class _y{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,23322);const r=j(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return E.newValue(Te);case"DOUBLE":return E.newValue({booleanValue:isNaN(Re(r.value))});case"NULL":return E.Ni();default:return E.Oi()}}}class yy{constructor(e){this.expr=e}evaluate(e,t){return U(this.expr.params.length===1,50406),new Xi(new P("not",[new P("is_nan",this.expr.params)])).evaluate(e,t)}}class Ey{constructor(e){this.expr=e}evaluate(e,t){switch(U(this.expr.params.length===1,23123),j(this.expr.params[0]).evaluate(e,t).type){case"NULL":return E.newValue(qe);case"UNSET":case"ERROR":return E.Oi();default:return E.newValue(Te)}}}class wy{constructor(e){this.expr=e}evaluate(e,t){return U(this.expr.params.length===1,23167),new Xi(new P("not",[new P("is_null",this.expr.params)])).evaluate(e,t)}}class Ty{constructor(e){this.expr=e}evaluate(e,t){return U(this.expr.params.length===1,5228),j(this.expr.params[0]).evaluate(e,t).type==="ERROR"?E.newValue(qe):E.newValue(Te)}}class Iy{constructor(e){this.expr=e}evaluate(e,t){switch(U(this.expr.params.length===1,6877),j(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return E.Oi();case"UNSET":return E.newValue(Te);default:return E.newValue(qe)}}}class vy{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===3,11706);const r=j(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return r.value?.booleanValue?j(this.expr.params[1]).evaluate(e,t):j(this.expr.params[2]).evaluate(e,t);case"NULL":return j(this.expr.params[2]).evaluate(e,t);default:return E.Oi()}}}class Ay{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map(i=>j(i).evaluate(e,t));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||$e(i.value,s.value)>0?i:s}return s===void 0?E.Ni():s}}class by{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map(i=>j(i).evaluate(e,t));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||$e(i.value,s.value)<0?i:s}return s===void 0?E.Ni():s}}class fr{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const r=j(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ERROR":case"UNSET":return E.Oi()}const s=j(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return E.Oi()}return this.Ki(r,s)}}class Ry extends fr{constructor(e){super(e),this.expr=e}Ki(e,t){if(e.Li()&&t.Li())return E.newValue(qe);if(e.Li()||t.Li()||Ie(e.value)||Ie(t.value)||me(e.value)!==me(t.value))return E.newValue(Te);switch(St(e.value,t.value)){case"EQ":return E.newValue(qe);case"NOT_EQ":return E.newValue(Te);case"NULL":return E.Ni();default:q(44615,{left:e,right:t})}}}class Py extends fr{constructor(e){super(e),this.expr=e}Ki(e,t){switch(St(e.value,t.value)){case"EQ":return E.newValue(Te);case"NOT_EQ":case"TYPE_MISMATCH":return E.newValue(qe);case"NULL":return E.Ni();default:q(44614,{left:e,right:t})}}}class Vy extends fr{constructor(e){super(e),this.expr=e}Ki(e,t){return me(e.value)!==me(t.value)||Ie(e.value)||Ie(t.value)?E.newValue(Te):E.newValue({booleanValue:$e(e.value,t.value)<0})}}class Sy extends fr{constructor(e){super(e),this.expr=e}Ki(e,t){return me(e.value)!==me(t.value)||Ie(e.value)||Ie(t.value)?E.newValue(Te):St(e.value,t.value)==="EQ"?E.newValue(qe):E.newValue({booleanValue:$e(e.value,t.value)<0})}}class Cy extends fr{constructor(e){super(e),this.expr=e}Ki(e,t){return me(e.value)!==me(t.value)||Ie(e.value)||Ie(t.value)?E.newValue(Te):E.newValue({booleanValue:$e(e.value,t.value)>0})}}class xy extends fr{constructor(e){super(e),this.expr=e}Ki(e,t){return me(e.value)!==me(t.value)||Ie(e.value)||Ie(t.value)?E.newValue(Te):St(e.value,t.value)==="EQ"?E.newValue(qe):E.newValue({booleanValue:$e(e.value,t.value)>0})}}class Ny{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class ky{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,216);const r=j(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return E.Ni();case"ARRAY":{const s=r.value.arrayValue?.values??[];return E.newValue({arrayValue:{values:[...s].reverse()}})}default:return E.Oi()}}}class Dy{constructor(e){this.expr=e}evaluate(e,t){return U(this.expr.params.length===2,52884),new Cf(new P("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}}class Oy{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===2,1392);let r=!1;const s=j(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.Oi()}const i=j(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.Oi()}if(r)return E.Ni();const a=i.value?.arrayValue?.values??[],c=s.value?.arrayValue?.values??[];for(const l of a){let f=!1;r=!1;for(const p of c){switch(We(l)&&We(p)?"EQ":St(l,p)){case"EQ":f=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:q(44613,{value:p,search:l})}if(f)break}if(!f)return E.newValue(Te)}return E.newValue(qe)}}class Ly{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===2,2680);let r=!1;const s=j(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.Oi()}const i=j(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.Oi()}if(r)return E.Ni();const a=i.value?.arrayValue?.values??[],c=s.value?.arrayValue?.values??[];for(const l of c)for(const f of a)switch(We(l)&&We(f)?"EQ":St(l,f)){case"EQ":return E.newValue(qe);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:q(60403,{value:l,search:f})}return r?E.Ni():E.newValue(Te)}}class My{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,38605);const r=j(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return E.Ni();case"ARRAY":return E.newValue({integerValue:`${r.value?.arrayValue?.values?.length??0}`});default:return E.Oi()}}}class Uy{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class Fy{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,1508);const r=j(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return E.Ni();case"BYTES":{const s=r.value?.bytesValue;if(typeof s=="string"){const i=oe.fromBase64String(s).toUint8Array();return i.reverse(),E.newValue({bytesValue:oe.fromUint8Array(i).toBase64()})}return E.newValue({bytesValue:new Uint8Array(s).reverse()})}case"STRING":{const s=r.value?.stringValue,i=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(s),a=Array.from(i,c=>c.segment).reverse();return E.newValue({stringValue:a.join("")})}default:return E.Oi()}}}class By{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class qy{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class $y{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,19400);const r=j(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return E.Ni();case"STRING":{const s=function(a){let c=0;for(let l=0;l<a.length;l++){const f=a.codePointAt(l);if(f===void 0)return;if(f<=65535)if(f>=55296&&f<=57343)if(f<=56319){const p=a.codePointAt(l+1);p!==void 0&&p>=56320&&p<=57343?(c+=1,l++):c+=1}else c+=1;else c+=1;else{if(!(f<=1114111))return;c+=1,l++}}return c}(r.value.stringValue);return s===void 0?E.Oi():E.newValue({integerValue:s})}default:return E.Oi()}}}class jy{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,8486);const r=j(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BYTES":{const s=r.value?.bytesValue;return typeof s=="string"?E.newValue({integerValue:oe.fromBase64String(s).toUint8Array().length}):E.newValue({integerValue:new Uint8Array(s).length})}case"STRING":{const s=function(a){let c=0;for(let l=0;l<a.length;l++){const f=a.codePointAt(l);if(f===void 0)return;if(f>=55296&&f<=57343){if(!(f<=56319))return;{const p=a.codePointAt(l+1);if(p===void 0||!(p>=56320&&p<=57343))return;c+=4,l++}}else if(f<=127)c+=1;else if(f<=2047)c+=2;else if(f<=65535)c+=3;else{if(!(f<=1114111))return;c+=4,l++}}return c}(r.value?.stringValue);return s===void 0?E.Oi():E.newValue({integerValue:s})}case"NULL":return E.Ni();default:return E.Oi()}}}class dr{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1;const s=j(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return E.Oi()}const i=j(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":r=!0;break;default:return E.Oi()}return r?E.Ni():this.Wi(s.value?.stringValue,i.value?.stringValue)}}class zy extends dr{Wi(e,t){try{const r=function(a){let c="";for(let l=0;l<a.length;l++){const f=a.charAt(l);switch(f){case"_":c+=".";break;case"%":c+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":c+="\\"+f;break;default:c+=f}}return"^"+c+"$"}(t),s=da.compile(r);return E.newValue({booleanValue:s.matches(e)})}catch(r){return st(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${r}`),E.Oi()}}}class Gy extends dr{Wi(e,t){try{const r=da.compile(t);return E.newValue({booleanValue:r.test(e)})}catch{return st(`Invalid regex pattern found in regex_contains: ${t}, returning error`),E.Oi()}}}class Hy extends dr{Wi(e,t){try{return E.newValue({booleanValue:da.compile(t).matches(e)})}catch{return st(`Invalid regex pattern found in regex_match: ${t}, returning error`),E.Oi()}}}class Wy extends dr{Wi(e,t){return E.newValue({booleanValue:e.includes(t)})}}class Ky extends dr{Wi(e,t){return E.newValue({booleanValue:e.startsWith(t)})}}class Qy extends dr{Wi(e,t){return E.newValue({booleanValue:e.endsWith(t)})}}class Jy{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,29079);const r=j(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return E.newValue({stringValue:r.value?.stringValue?.toLowerCase()});case"NULL":return E.Ni();default:return E.Oi()}}}class Yy{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,60487);const r=j(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return E.newValue({stringValue:r.value?.stringValue?.toUpperCase()});case"NULL":return E.Ni();default:return E.Oi()}}}class Xy{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,28544);const r=j(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return E.newValue({stringValue:r.value?.stringValue?.trim()});case"NULL":return E.Ni();default:return E.Oi()}}}class Zy{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map(a=>j(a).evaluate(e,t));let s="",i=!1;for(const a of r)switch(a.type){case"STRING":s+=a.value.stringValue;break;case"NULL":i=!0;break;default:return E.Oi()}return i?E.Ni():E.newValue({stringValue:s})}}class eE{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===2,4483);const r=j(this.expr.params[0]).evaluate(e,t);switch(r.type){case"UNSET":return E.Mi();case"MAP":break;default:return E.Oi()}const s=j(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return E.Oi();const i=r.value?.mapValue?.fields?.[s.value?.stringValue];return i===void 0?E.Mi():E.newValue(i)}}class Qa{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1;const s=j(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return E.Oi()}const i=j(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":r=!0;break;default:return E.Oi()}if(r)return E.Ni();const a=Jo(s.value),c=Jo(i.value);if(a===void 0||c===void 0||a.values?.length!==c.values?.length)return E.Oi();const l=this.Gi(a,c);return l===void 0||isNaN(l)?E.Oi():E.newValue({doubleValue:l})}}class tE extends Qa{Gi(e,t){const r=e?.values??[],s=t?.values??[];if(r.length===0)return;let i=0,a=0,c=0;for(let f=0;f<r.length;f++){if(!Vt(r[f])||!Vt(s[f]))return;const p=Re(r[f]),m=Re(s[f]);i+=p*m,a+=p*p,c+=m*m}const l=Math.sqrt(a)*Math.sqrt(c);if(l!==0)return 1-Math.max(-1,Math.min(1,i/l))}}class nE extends Qa{Gi(e,t){const r=e?.values??[],s=t?.values??[];if(r.length===0)return 0;let i=0;for(let a=0;a<r.length;a++){if(!Vt(r[a])||!Vt(s[a]))return;i+=Re(r[a])*Re(s[a])}return i}}class rE extends Qa{Gi(e,t){const r=e?.values??[],s=t?.values??[];if(r.length===0)return 0;let i=0;for(let a=0;a<r.length;a++){if(!Vt(r[a])||!Vt(s[a]))return;const c=Re(r[a]),l=Re(s[a]);i+=Math.pow(c-l,2)}return Math.sqrt(i)}}class sE{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,39044);const r=j(this.expr.params[0]).evaluate(e,t);switch(r.type){case"VECTOR":{const s=Jo(r.value);return E.newValue({integerValue:s?.values?.length??0})}case"NULL":return E.Ni();default:return E.Oi()}}}const hs=BigInt(-62135596800),fs=BigInt(253402300799),Vi=BigInt(1e3),Jt=BigInt(1e6),iE=hs*Vi,oE=fs*Vi+BigInt(999),aE=hs*Jt,cE=fs*Jt+BigInt(999999);function Ja(n){return n>=aE&&n<=cE}function xf(n){return n>=hs&&n<=fs}function ds(n,e){const t=BigInt(n);return!(t<hs||t>fs)&&!(e<0||e>=1e9)&&(t!==hs||e===0)&&!(t===fs&&e>999999999)}function Nf(n,e){return e<0?{seconds:n-1,nanos:e+1e9}:{seconds:n,nanos:e}}function Ya(n){return BigInt(n.seconds)*Jt+BigInt(Math.trunc(n.nanoseconds/1e3))}class Xa{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const r=j(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return E.Ni();default:return E.Oi()}}}class uE extends Xa{toTimestamp(e){if(!Ja(e))return E.Oi();let t=Number(e/Jt),r=Number(e%Jt*BigInt(1e3));const s=Nf(t,r);return t=s.seconds,r=s.nanos,ds(t,r)?E.newValue({timestampValue:{seconds:t,nanos:r}}):E.Oi()}}class lE extends Xa{toTimestamp(e){if(!function(a){return a>=iE&&a<=oE}(e))return E.Oi();let t=Number(e/Vi),r=Number(e%Vi*BigInt(1e6));const s=Nf(t,r);return t=s.seconds,r=s.nanos,ds(t,r)?E.newValue({timestampValue:{seconds:t,nanos:r}}):E.Oi()}}class hE extends Xa{toTimestamp(e){if(!xf(e))return E.Oi();const t=Number(e);return E.newValue({timestampValue:{seconds:t,nanos:0}})}}class Za{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const r=j(this.expr.params[0]).evaluate(e,t);switch(r.type){case"TIMESTAMP":break;case"NULL":return E.Ni();default:return E.Oi()}const s=Ca(r.value.timestampValue);return ds(s.seconds,s.nanoseconds)?this.ji(s):E.Oi()}}class fE extends Za{ji(e){const t=Ya(e);return Ja(t)?E.newValue({integerValue:`${t.toString()}`}):E.Oi()}}class dE extends Za{ji(e){const t=Ya(e),r=t/BigInt(1e3),s=t%BigInt(1e3);return r>BigInt(0)||s===BigInt(0)?E.newValue({integerValue:r.toString()}):E.newValue({integerValue:(r-BigInt(1)).toString()})}}class pE extends Za{ji(e){const t=BigInt(e.seconds);return xf(t)?E.newValue({integerValue:t.toString()}):E.Oi()}}class kf{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let r=!1;const s=j(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":r=!0;break;default:return E.Oi()}const i=j(this.expr.params[1]).evaluate(e,t);let a;switch(i.type){case"STRING":if(a=function(ee){switch(ee){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}}(i.value.stringValue),a===void 0)return E.Oi();break;case"NULL":r=!0;break;default:return E.Oi()}const c=j(this.expr.params[2]).evaluate(e,t);switch(c.type){case"INT":break;case"NULL":r=!0;break;default:return E.Oi()}if(r)return E.Ni();const l=BigInt(c.value.integerValue);let f;try{switch(a){case"microsecond":f=l;break;case"millisecond":f=l*BigInt(1e3);break;case"second":f=l*BigInt(1e6);break;case"minute":f=l*BigInt(6e7);break;case"hour":f=l*BigInt(36e8);break;case"day":f=l*BigInt(864e8);break;default:return E.Oi()}if(a!=="microsecond"&&l!==BigInt(0)&&f/l!==BigInt(this.zi(a)))return E.Oi()}catch(W){return st(`Error during timestamp arithmetic: ${W}`),E.Oi()}const p=Ca(s.value.timestampValue);if(!ds(p.seconds,p.nanoseconds))return E.Oi();const m=Ya(p),R=this.Hi(m,f);if(!Ja(R))return E.Oi();const C=Number(R/Jt),x=R%Jt,M=Number((x<0?x+Jt:x)*BigInt(1e3)),L=x<0?C-1:C;return ds(L,M)?E.newValue({timestampValue:{seconds:L,nanos:M}}):E.Oi()}zi(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class mE extends kf{Hi(e,t){return e+t}}class gE extends kf{Hi(e,t){return e-t}}function ps(n){if((n=Sf(n))instanceof Ps)return`fld(${n.fieldName})`;if(n instanceof hr)return`cst(${function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof he?`ref(${t.path})`:t instanceof Be?`vec(${JSON.stringify(t)})`:JSON.stringify(t)}(n.value)})`;if(n instanceof P)return`fn(${n.name},[${n.params.map(ps).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.di.map(ps).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function _E(n){if(n instanceof Rf)return`${n._name}(${ei(n.fields)})`;if(n instanceof Pf){let e=`${n._name}(${ei(n.accumulators)})`;return n.groups.size>0&&(e+=`grouping(${ei(n.groups)})`),e}if(n instanceof Vf)return`${n._name}(${ei(n.groups)})`;if(n instanceof Qi)return`${n._name}(${n.pi})`;if(n instanceof Ji)return`${n._name}(${n.collectionId})`;if(n instanceof $a)return`${n._name}()`;if(n instanceof ja)return`${n._name}(${n.gi.sort()})`;if(n instanceof za)return`${n._name}(${ps(n.condition)})`;if(n instanceof ls)return`${n._name}(${n.limit})`;if(n instanceof Ga)return`${n._name}(${function(t){return t.map(r=>`${ps(r.expr)}${r.direction}`).join(",")}(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function ei(n){return`${Array.from(n.entries()).sort().map(([e,t])=>`${e}=${ps(t)}`).join(",")}`}function bt(n){return n.stages.map(e=>_E(e)).join("|")}function Df(n,e){return bt(n)===bt(e)}function _e(n){return n instanceof Ue}function _l(n){return _e(n)?bt(n):$r(n)}function Of(n){return _e(n)?bt(n):function(t){return`${Gh(ft(t))}|lt:${t.limitType}`}(n)}function Zi(n,e){return n instanceof Ue&&e instanceof Ue?Df(n,e):!(n instanceof Ue&&!(e instanceof Ue)||!(n instanceof Ue)&&e instanceof Ue)&&Ng(n,e)}function Lf(n){return gn(n)?bt(n):Gh(n)}function Mf(n,e){return n instanceof Ue&&e instanceof Ue?Df(n,e):!(n instanceof Ue&&!(e instanceof Ue)||!(n instanceof Ue)&&e instanceof Ue)&&Hh(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yE{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&dg(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Br(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Br(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Xh();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const l=Mh(a,c);l!==null&&r.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(G.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),J())}isEqual(e){return this.batchId===e.batchId&&Zn(this.mutations,e.mutations,(t,r)=>Ku(t,r))&&Zn(this.baseMutations,e.baseMutations,(t,r)=>Ku(t,r))}}class ec{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){U(e.mutations.length===r.length,58842,{Ji:e.mutations.length,Yi:r.length});let s=function(){return Mg}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new ec(e,t,r,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uf="";function EE(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=yl(e)),e=wE(n.get(t),e);return yl(e)}function wE(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Uf:t+="";break;default:t+=i}}return t}function yl(n){return n+Uf+""}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TE{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e,t,r,s,i=G.min(),a=G.min(),c=oe.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new It(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new It(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new It(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new It(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IE{constructor(e){this.Xi=e}}function vE(n){const e=e_({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?bi(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AE{constructor(){this.d_=new bE}addToCollectionParentIndex(e,t){return this.d_.add(t),S.resolve()}getCollectionParents(e,t){return S.resolve(this.d_.getEntries(t))}addFieldIndex(e,t){return S.resolve()}deleteFieldIndex(e,t){return S.resolve()}deleteAllFieldIndexes(e){return S.resolve()}createTargetIndexes(e,t){return S.resolve()}getDocumentsMatchingTarget(e,t){return S.resolve(null)}getIndexType(e,t){return S.resolve(0)}getFieldIndexes(e,t){return S.resolve([])}getNextCollectionGroupToUpdate(e){return S.resolve(null)}getMinOffset(e,t){return S.resolve(tn.min())}getMinOffsetFromCollectionGroup(e,t){return S.resolve(tn.min())}updateCollectionGroup(e,t,r){return S.resolve()}updateIndexEntries(e,t){return S.resolve()}}class bE{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new pe(Z.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new pe(Z.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e){this.K_=e}next(){return this.K_+=2,this.K_}static W_(){return new sn(0)}static G_(){return new sn(-1)}}// Copyright 2024 Google LLC* @license
function Ff(n,e){let t=e;for(const r of n.stages)t=PE({serializer:n.serializer,serverTimestampBehavior:n.listenOptions?.serverTimestampBehavior},r,t);return t}function eo(n,e){return Ff(n,[e]).length>0}function RE(n,e){return _e(n)?eo(n,e):zi(n,e)}function PE(n,e,t){if(e instanceof Qi)return function(s,i,a){return a.filter(c=>c.isFoundDocument()&&`/${c.key.getCollectionPath().canonicalString()}`===i.pi)}(0,e,t);if(e instanceof za)return function(s,i,a){return a.filter(c=>{const l=Gr(j(i.condition).evaluate(s,c));return l!==void 0&&Xe(l,qe)})}(n,e,t);if(e instanceof Ji)return function(s,i,a){return a.filter(c=>c.isFoundDocument()&&c.key.getCollectionPath().lastSegment()===i.collectionId)}(0,e,t);if(e instanceof $a)return function(s,i,a){return a.filter(c=>c.isFoundDocument())}(0,0,t);if(e instanceof ja)return function(s,i,a){return a.filter(c=>c.isFoundDocument()&&i.yi.has(c.key.path.toStringWithLeadingSlash()))}(0,e,t);if(e instanceof ls)return function(s,i,a){return a.slice(0,i.limit)}(0,e,t);if(e instanceof Ga)return function(s,i,a){const c=i.orderings.map(l=>({eo:j(l.expr),direction:l.direction}));return[...a].sort((l,f)=>{for(const{eo:p,direction:m}of c){const R=Gr(p.evaluate(s,l)),C=Gr(p.evaluate(s,f)),x=$e(R??nr,C??nr);if(x!==0)return m==="ascending"?x:-x}return 0})}(n,e,t);throw new Error(`Unknown stage: ${e._name}`)}function ia(n){const e=function(r){for(let s=r.stages.length-1;s>=0;s--){const i=r.stages[s];if(i instanceof Ga)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")}(n);return(t,r)=>{for(const s of e){const i=Gr(j(s.expr).evaluate({serializer:n.serializer},t)),a=Gr(j(s.expr).evaluate({serializer:n.serializer},r)),c=$e(i||nr,a||nr);if(c!==0)return s.direction==="ascending"?c:-c}return 0}}function Uo(n){for(let e=n.stages.length-1;e>=0;e--){const t=n.stages[e];if(t instanceof ls)return{limit:t.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VE{constructor(){this.changes=new kn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ce.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?S.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CE{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Br(r.mutation,s,nt.empty(),te.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,J()).next(()=>r))}getLocalViewOfDocuments(e,t,r=J()){const s=Bt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=$n();return i.forEach((c,l)=>{a=a.insert(c,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Bt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,J()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,s){let i=Fe();const a=jr(),c=function(){return jr()}();return t.forEach((l,f)=>{const p=r.get(f.key);s.has(f.key)&&(p===void 0||p.mutation instanceof Nn)?i=i.insert(f.key,f):p!==void 0?(a.set(f.key,p.mutation.getFieldMask()),Br(p.mutation,f,p.mutation.getFieldMask(),te.now())):a.set(f.key,nt.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((f,p)=>a.set(f,p)),t.forEach((f,p)=>c.set(f,new SE(p,a.get(f)??null))),c))}recalculateAndSaveOverlays(e,t){const r=jr();let s=new ie((a,c)=>a-c),i=J();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(l=>{const f=t.get(l);if(f===null)return;let p=r.get(l)||nt.empty();p=c.applyToLocalView(f,p),r.set(l,p);const m=(s.get(c.batchId)||J()).add(l);s=s.insert(c.batchId,m)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),f=l.key,p=l.value,m=Xh();p.forEach(R=>{if(!i.has(R)){const C=Mh(t.get(R),r.get(R));C!==null&&m.set(R,C),i=i.add(R)}}),a.push(this.documentOverlayCache.saveOverlays(e,f,m))}return S.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return _e(t)?this.getDocumentsMatchingPipeline(e,t,r,s):Cg(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Kh(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):S.resolve(Bt());let c=as,l=i;return a.next(f=>S.forEach(f,(p,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(p)?S.resolve():this.remoteDocumentCache.getEntry(e,p).next(R=>{l=l.insert(p,R)}))).next(()=>this.populateOverlays(e,f,i)).next(()=>this.computeViews(e,l,f,J())).next(p=>({batchId:c,changes:Yh(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new F(t)).next(r=>{let s=$n();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=$n();return this.indexManager.getCollectionParents(e,i).next(c=>S.forEach(c,l=>{const f=function(m,R){return new As(R,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,f,r,s).next(p=>{p.forEach((m,R)=>{a=a.insert(m,R)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>this.retrieveMatchingLocalDocuments(i,a,c=>zi(t,c)))}getDocumentsMatchingPipeline(e,t,r,s){if(Qt(t)==="collection_group"){const i=Wa(t);let a=$n();return this.indexManager.getCollectionParents(e,i).next(c=>S.forEach(c,l=>{const f=function(m,R){const C=m.stages.map(x=>x instanceof Ji?new Qi(R.canonicalString(),{}):x);return new Ue(m.serializer,C)}(t,l.child(i));return this.getDocumentsMatchingPipeline(e,f,r,s).next(p=>{p.forEach((m,R)=>{a=a.insert(m,R)})})}).next(()=>a))}{let i;return this.getOverlaysForPipeline(e,t,r.largestBatchId).next(a=>{switch(i=a,Qt(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s);case"documents":let c=J();for(const l of sa(t))c=c.add(F.fromPath(l));return this.remoteDocumentCache.getEntries(e,c);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new D("invalid-argument",`Invalid pipeline source to execute offline: ${bt(t)}`)}}).next(a=>this.retrieveMatchingLocalDocuments(i,a,c=>eo(t,c)))}}retrieveMatchingLocalDocuments(e,t,r){e.forEach((i,a)=>{const c=a.getKey();t.get(c)===null&&(t=t.insert(c,Ce.newInvalidDocument(c)))});let s=$n();return t.forEach((i,a)=>{const c=e.get(i);c!==void 0&&Br(c.mutation,a,nt.empty(),te.now()),r(a)&&(s=s.insert(i,a))}),s}getOverlaysForPipeline(e,t,r){switch(Qt(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,Z.fromString(Yi(t)),r);case"collection_group":throw new D("invalid-argument",`Unexpected collection group pipeline: ${bt(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,sa(t).map(s=>F.fromPath(s)));case"database":return this.documentOverlayCache.getAllOverlays(e,r);default:throw new D("invalid-argument",`Failed to get overlays for pipeline: ${bt(t)}`)}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xE{constructor(e){this.serializer=e,this.co=new Map,this.lo=new Map}getBundleMetadata(e,t){return S.resolve(this.co.get(t))}saveBundleMetadata(e,t){return this.co.set(t.id,function(s){return{id:s.id,version:s.version,createTime:dt(s.createTime)}}(t)),S.resolve()}getNamedQuery(e,t){return S.resolve(this.lo.get(t))}saveNamedQuery(e,t){return this.lo.set(t.name,function(s){return{name:s.name,query:vE(s.bundledQuery),readTime:dt(s.readTime)}}(t)),S.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NE{constructor(){this.overlays=new ie(F.comparator),this.Eo=new Map}getOverlay(e,t){return S.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Bt();return S.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}getAllOverlays(e,t){const r=Bt();return this.overlays.forEach((s,i)=>{i.largestBatchId>t&&r.set(s,i)}),S.resolve(r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.Es(e,t,i)}),S.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Eo.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Eo.delete(r)),S.resolve()}getOverlaysForCollection(e,t,r){const s=Bt(),i=t.length+1,a=new F(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const l=c.getNext().value,f=l.getKey();if(!t.isPrefixOf(f.path))break;f.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return S.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new ie((f,p)=>f-p);const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===t&&f.largestBatchId>r){let p=i.get(f.largestBatchId);p===null&&(p=Bt(),i=i.insert(f.largestBatchId,p)),p.set(f.getKey(),f)}}const c=Bt(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((f,p)=>c.set(f,p)),!(c.size()>=s)););return S.resolve(c)}Es(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Eo.get(s.largestBatchId).delete(r.key);this.Eo.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new TE(t,r));let i=this.Eo.get(t);i===void 0&&(i=J(),this.Eo.set(t,i)),this.Eo.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{constructor(){this.sessionToken=oe.EMPTY_BYTE_STRING}getSessionToken(e){return S.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(){this.ho=new pe(we.To),this.Po=new pe(we.Io)}isEmpty(){return this.ho.isEmpty()}addReference(e,t){const r=new we(e,t);this.ho=this.ho.add(r),this.Po=this.Po.add(r)}Ro(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Ao(new we(e,t))}Vo(e,t){e.forEach(r=>this.removeReference(r,t))}fo(e){const t=new F(new Z([])),r=new we(t,e),s=new we(t,e+1),i=[];return this.Po.forEachInRange([r,s],a=>{this.Ao(a),i.push(a.key)}),i}mo(){this.ho.forEach(e=>this.Ao(e))}Ao(e){this.ho=this.ho.delete(e),this.Po=this.Po.delete(e)}po(e){const t=new F(new Z([])),r=new we(t,e),s=new we(t,e+1);let i=J();return this.Po.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new we(e,0),r=this.ho.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class we{constructor(e,t){this.key=e,this.yo=t}static To(e,t){return F.comparator(e.key,t.key)||Q(e.yo,t.yo)}static Io(e,t){return Q(e.yo,t.yo)||F.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.rs=1,this.wo=new pe(we.To)}checkEmpty(e){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.rs;this.rs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new yE(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.wo=this.wo.add(new we(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return S.resolve(a)}lookupMutationBatch(e,t){return S.resolve(this.bo(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.So(r),i=s<0?0:s;return S.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?Ea:this.rs-1)}getAllMutationBatches(e){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new we(t,0),s=new we(t,Number.POSITIVE_INFINITY),i=[];return this.wo.forEachInRange([r,s],a=>{const c=this.bo(a.yo);i.push(c)}),S.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new pe(Q);return t.forEach(s=>{const i=new we(s,0),a=new we(s,Number.POSITIVE_INFINITY);this.wo.forEachInRange([i,a],c=>{r=r.add(c.yo)})}),S.resolve(this.xo(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;F.isDocumentKey(i)||(i=i.child(""));const a=new we(new F(i),0);let c=new pe(Q);return this.wo.forEachWhile(l=>{const f=l.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(c=c.add(l.yo)),!0)},a),S.resolve(this.xo(c))}xo(e){const t=[];return e.forEach(r=>{const s=this.bo(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){U(this.vo(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.wo;return S.forEach(t.mutations,s=>{const i=new we(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.wo=r})}us(e){}containsKey(e,t){const r=new we(t,0),s=this.wo.firstAfterOrEqual(r);return S.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,S.resolve()}vo(e,t){return this.So(e)}So(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}bo(e){const t=this.So(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OE{constructor(e){this.Do=e,this.docs=function(){return new ie(F.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.Do(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return S.resolve(r?r.document.mutableCopy():Ce.newInvalidDocument(t))}getEntries(e,t){let r=Fe();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Ce.newInvalidDocument(s))}),S.resolve(r)}getAllEntries(e){let t=Fe();return this.docs.forEach((r,s)=>{t=t.insert(r,s.document)}),S.resolve(t)}getDocumentsMatchingQuery(e,t,r,s){let i,a;_e(t)?(i=Z.fromString(Yi(t)),a=p=>eo(t,p)):(i=t.path,a=p=>zi(t,p));let c=Fe();const l=new F(i.child("__id-9223372036854775808__")),f=this.docs.getIteratorFrom(l);for(;f.hasNext();){const{key:p,value:{document:m}}=f.getNext();if(!i.isPrefixOf(p.path))break;p.path.length>i.length+1||Pg(Rg(m),r)<=0||(s.has(m.key)||a(m))&&(c=c.insert(m.key,m.mutableCopy()))}return S.resolve(c)}getAllFromCollectionGroup(e,t,r,s){q(9500)}Co(e,t){return S.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new LE(this)}getSize(e){return S.resolve(this.size)}}class LE extends VE{constructor(e){super(),this.ao=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.ao.addEntry(e,s)):this.ao.removeEntry(r)}),S.waitFor(t)}getFromCache(e,t){return this.ao.getEntry(e,t)}getAllFromCache(e,t){return this.ao.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ME{constructor(e){this.persistence=e,this.Fo=new kn(t=>Lf(t),Mf),this.lastRemoteSnapshotVersion=G.min(),this.highestTargetId=0,this.Oo=0,this.Mo=new tc,this.targetCount=0,this.No=sn.W_()}forEachTarget(e,t){return this.Fo.forEach((r,s)=>t(s)),S.resolve()}getLastRemoteSnapshotVersion(e){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return S.resolve(this.Oo)}allocateTargetId(e){return this.highestTargetId=this.No.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Oo&&(this.Oo=t),S.resolve()}H_(e){this.Fo.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.No=new sn(t),this.highestTargetId=t),e.sequenceNumber>this.Oo&&(this.Oo=e.sequenceNumber)}addTargetData(e,t){return this.H_(t),this.targetCount+=1,S.resolve()}updateTargetData(e,t){return this.H_(t),S.resolve()}removeTargetData(e,t){return this.Fo.delete(t.target),this.Mo.fo(t.targetId),this.targetCount-=1,S.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Fo.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Fo.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),S.waitFor(i).next(()=>s)}getTargetCount(e){return S.resolve(this.targetCount)}getTargetData(e,t){const r=this.Fo.get(t)||null;return S.resolve(r)}addMatchingKeys(e,t,r){return this.Mo.Ro(t,r),S.resolve()}removeMatchingKeys(e,t,r){this.Mo.Vo(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),S.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Mo.fo(t),S.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Mo.po(t);return S.resolve(r)}containsKey(e,t){return S.resolve(this.Mo.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf{constructor(e,t){this.Bo={},this.overlays={},this.Lo=new Hi(0),this.$o=!1,this.$o=!0,this.Uo=new kE,this.referenceDelegate=e(this),this.ko=new ME(this),this.indexManager=new AE,this.remoteDocumentCache=function(s){return new OE(s)}(r=>this.referenceDelegate.Qo(r)),this.serializer=new IE(t),this.qo=new xE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.$o=!1,Promise.resolve()}get started(){return this.$o}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new NE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Bo[e.toKey()];return r||(r=new DE(t,this.referenceDelegate),this.Bo[e.toKey()]=r),r}getGlobalsCache(){return this.Uo}getTargetCache(){return this.ko}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.qo}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);const s=new UE(this.Lo.next());return this.referenceDelegate.Ko(),r(s).next(i=>this.referenceDelegate.Wo(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Go(e,t){return S.or(Object.values(this.Bo).map(r=>()=>r.containsKey(e,t)))}}class UE extends P_{constructor(e){super(),this.currentSequenceNumber=e}}class nc{constructor(e){this.persistence=e,this.jo=new tc,this.zo=null}static Ho(e){return new nc(e)}get Jo(){if(this.zo)return this.zo;throw q(60996)}addReference(e,t,r){return this.jo.addReference(r,t),this.Jo.delete(r.toString()),S.resolve()}removeReference(e,t,r){return this.jo.removeReference(r,t),this.Jo.add(r.toString()),S.resolve()}markPotentiallyOrphaned(e,t){return this.Jo.add(t.toString()),S.resolve()}removeTarget(e,t){this.jo.fo(t.targetId).forEach(s=>this.Jo.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.Jo.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ko(){this.zo=new Set}Wo(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.Jo,r=>{const s=F.fromPath(r);return this.Yo(e,s).next(i=>{i||t.removeEntry(s,G.min())})}).next(()=>(this.zo=null,t.apply(e)))}updateLimboDocument(e,t){return this.Yo(e,t).next(r=>{r?this.Jo.delete(t.toString()):this.Jo.add(t.toString())})}Qo(e){return 0}Yo(e,t){return S.or([()=>S.resolve(this.jo.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Go(e,t)])}}class Si{constructor(e,t){this.persistence=e,this.Zo=new kn(r=>EE(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=k_(this,t)}static Ho(e,t){return new Si(e,t)}Ko(){}Wo(e){return S.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Pi(e){const t=this.Y_(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}Y_(e){let t=0;return this.Ii(e,r=>{t++}).next(()=>t)}Ii(e,t){return S.forEach(this.Zo,(r,s)=>this.X_(e,r,s).next(i=>i?S.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.Co(e,a=>this.X_(e,a,t).next(c=>{c||(r++,i.removeEntry(a,G.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.Zo.set(t,e.currentSequenceNumber),S.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.Zo.set(r,e.currentSequenceNumber),S.resolve()}removeReference(e,t,r){return this.Zo.set(r,e.currentSequenceNumber),S.resolve()}updateLimboDocument(e,t){return this.Zo.set(t,e.currentSequenceNumber),S.resolve()}Qo(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=wi(e.data.value)),t}X_(e,t,r){return S.or([()=>this.persistence.Go(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.Zo.get(t);return S.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.$a=r,this.Ua=s}static ka(e,t){let r=J(),s=J();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new rc(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FE(n,e){return F.comparator(n.key,e.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qE{constructor(){this.Qa=!1,this.qa=!1,this.Ka=100,this.Wa=function(){return Fp()?8:V_(xe())>0?6:4}()}initialize(e,t){this.Ga=e,this.indexManager=t,this.Qa=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ja(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.za(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new BE;return this.Ha(e,t,a).next(c=>{if(i.result=c,this.qa)return this.Ja(e,t,a,c.size)})}).next(()=>i.result)}Ja(e,t,r,s){return _e(t)?S.resolve():r.documentReadCount<this.Ka?(Bn()<=Y.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",$r(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Ka,"documents"),S.resolve()):(Bn()<=Y.DEBUG&&O("QueryEngine","Query:",$r(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Wa*s?(Bn()<=Y.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",$r(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ft(t))):S.resolve())}ja(e,t){if(_e(t))return S.resolve(null);let r=t;if(el(r))return S.resolve(null);let s=ft(r);return this.indexManager.getIndexType(e,s).next(i=>i===0?null:(r.limit!==null&&i===1&&(r=bi(r,null,"F"),s=ft(r)),this.indexManager.getDocumentsMatchingTarget(e,s).next(a=>{const c=J(...a);return this.Ga.getDocuments(e,c).next(l=>this.indexManager.getMinOffset(e,s).next(f=>{const p=this.Ya(r,l);return this.Za(r,p,c,f.readTime)?this.ja(e,bi(r,null,"F")):this.Xa(e,p,r,f)}))})))}za(e,t,r,s){return(_e(t)?function(a){for(const c of a.stages){if(c instanceof ls||c instanceof gl)return!1;if(c instanceof za){if(c.condition instanceof vf&&c.condition._expr.name==="exists"&&c.condition._expr.params[0]instanceof Ps&&c.condition._expr.params[0].fieldName===er)continue;return!1}}return!0}(t):el(t))||s.isEqual(G.min())?S.resolve(null):this.Ga.getDocuments(e,r).next(i=>{const a=this.Ya(t,i);return this.Za(t,a,r,s)?S.resolve(null):(Bn()<=Y.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),_l(t)),this.Xa(e,a,t,bg(s,as)).next(c=>c))})}Ya(e,t){let r,s;return _e(e)?(r=new pe(FE),s=i=>eo(e,i)):(r=new pe(Va(e)),s=i=>zi(e,i)),t.forEach((i,a)=>{s(a)&&(r=r.add(a))}),r}Za(e,t,r,s){if(_e(e))return function(c){return c.stages.some(l=>l instanceof ls||l instanceof gl)}(e);if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ha(e,t,r){return Bn()<=Y.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",_l(t)),this.Ga.getDocumentsMatchingQuery(e,t,tn.min(),r)}Xa(e,t,r,s){return this.Ga.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sc="LocalStore",$E=3e8;class jE{constructor(e,t,r,s){this.persistence=e,this.eu=t,this.serializer=s,this.tu=new ie(Q),this.nu=new kn(i=>Lf(i),Mf),this.ru=new Map,this.iu=e.getRemoteDocumentCache(),this.ko=e.getTargetCache(),this.qo=e.getBundleCache(),this.su(r)}su(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new CE(this.iu,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.iu.setIndexManager(this.indexManager),this.eu.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.tu))}}function zE(n,e,t,r){return new jE(n,e,t,r)}async function qf(n,e){const t=H(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.su(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],c=[];let l=J();for(const f of s){a.push(f.batchId);for(const p of f.mutations)l=l.add(p.key)}for(const f of i){c.push(f.batchId);for(const p of f.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(f=>({_u:f,removedBatchIds:a,addedBatchIds:c}))})})}function GE(n,e){const t=H(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.iu.newChangeBuffer({trackRemovals:!0});return function(c,l,f,p){const m=f.batch,R=m.keys();let C=S.resolve();return R.forEach(x=>{C=C.next(()=>p.getEntry(l,x)).next(M=>{const L=f.docVersions.get(x);U(L!==null,48541),M.version.compareTo(L)<0&&(m.applyToRemoteDocument(M,f),M.isValidDocument()&&(M.setReadTime(f.commitVersion),p.addEntry(M)))})}),C.next(()=>c.mutationQueue.removeMutationBatch(l,m))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=J();for(let f=0;f<c.mutationResults.length;++f)c.mutationResults[f].transformResults.length>0&&(l=l.add(c.batch.mutations[f].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function $f(n){const e=H(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.ko.getLastRemoteSnapshotVersion(t))}function HE(n,e){const t=H(n),r=e.snapshotVersion;let s=t.tu;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.iu.newChangeBuffer({trackRemovals:!0});s=t.tu;const c=[];e.targetChanges.forEach((p,m)=>{const R=s.get(m);if(!R)return;c.push(t.ko.removeMatchingKeys(i,p.removedDocuments,m).next(()=>t.ko.addMatchingKeys(i,p.addedDocuments,m)));let C=R.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?C=C.withResumeToken(oe.EMPTY_BYTE_STRING,G.min()).withLastLimboFreeSnapshotVersion(G.min()):p.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(p.resumeToken,r)),s=s.insert(m,C),function(M,L,W){return M.resumeToken.approximateByteSize()===0||L.snapshotVersion.toMicroseconds()-M.snapshotVersion.toMicroseconds()>=$E?!0:W.addedDocuments.size+W.modifiedDocuments.size+W.removedDocuments.size>0}(R,C,p)&&c.push(t.ko.updateTargetData(i,C))});let l=Fe(),f=J();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,p))}),c.push(WE(i,a,e.documentUpdates).next(p=>{l=p.ou,f=p.au})),!r.isEqual(G.min())){const p=t.ko.getLastRemoteSnapshotVersion(i).next(m=>t.ko.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(p)}return S.waitFor(c).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,l,f)).next(()=>l)}).then(i=>(t.tu=s,i))}function WE(n,e,t){let r=J(),s=J();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=Fe();return t.forEach((c,l)=>{const f=i.get(c);l.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(G.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!f.isValidDocument()||l.version.compareTo(f.version)>0||l.version.compareTo(f.version)===0&&f.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):O(sc,"Ignoring outdated watch update for ",c,". Current version:",f.version," Watch version:",l.version)}),{ou:a,au:s}})}function KE(n,e){const t=H(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Ea),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function QE(n,e){const t=H(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.ko.getTargetData(r,e).next(i=>i?(s=i,S.resolve(s)):t.ko.allocateTargetId(r).next(a=>(s=new It(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.ko.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.tu.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.tu=t.tu.insert(r.targetId,r),t.nu.set(e,r.targetId)),r})}async function oa(n,e,t){const r=H(n),s=r.tu.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!lr(a))throw a;O(sc,`Failed to update sequence numbers for target ${e}: ${a}`)}r.tu=r.tu.remove(e),r.nu.delete(s.target)}function El(n,e,t){const r=H(n);let s=G.min(),i=J();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,f,p){const m=H(l),R=m.nu.get(p);return R!==void 0?S.resolve(m.tu.get(R)):m.ko.getTargetData(f,p)}(r,a,_e(e)?e:ft(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.ko.getMatchingKeysForTargetId(a,c.targetId).next(l=>{i=l})}).next(()=>r.eu.getDocumentsMatchingQuery(a,e,t?s:G.min(),t?i:J())).next(c=>(JE(r,c),{documents:c,uu:i})))}function JE(n,e){e.forEach((t,r)=>{const s=r.key.getCollectionGroup(),i=n.ru.get(s)||G.min();r.readTime.compareTo(i)>0&&n.ru.set(s,r.readTime)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YE{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Pu=0,this.Iu=null,this.Ru=!0}Au(){this.Pu===0&&(this.Vu("Unknown"),this.Iu=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.Iu=null,this.du("Backend didn't respond within 10 seconds."),this.Vu("Offline"),Promise.resolve())))}fu(e){this.state==="Online"?this.Vu("Unknown"):(this.Pu++,this.Pu>=1&&(this.mu(),this.du(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Vu("Offline")))}set(e){this.mu(),this.Pu=0,e==="Online"&&(this.Ru=!1),this.Vu(e)}Vu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}du(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ru?(Pt(t),this.Ru=!1):O("OnlineStateTracker",t)}mu(){this.Iu!==null&&(this.Iu.cancel(),this.Iu=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt="RemoteStore";class XE{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.pu=[],this.gu=new Map,this.yu=new Map,this.wu=new Map,this.bu=new sn(1e3),this.Su=new sn(1001),this.xu=new Set,this.vu=[],this.Du=i,this.Du.tn(a=>{r.enqueueAndForget(async()=>{Ln(this)&&(O(yt,"Restarting streams for network reachability change."),await async function(l){const f=H(l);f.xu.add(4),await Ss(f),f.Cu.set("Unknown"),f.xu.delete(4),await to(f)}(this))})}),this.Cu=new YE(r,s)}}async function to(n){if(Ln(n))for(const e of n.vu)await e(!0)}async function Ss(n){for(const e of n.vu)await e(!1)}function aa(n,e){return n.yu.get(e)||void 0}function jf(n,e){const t=H(n),r=aa(t,e.targetId);if(r!==void 0&&t.gu.has(r))return;const s=function(c,l){const f=aa(c,l);f!==void 0&&c.wu.delete(f);const p=function(R,C){return C%2!=0?R.Su.next():R.bu.next()}(c,l);return c.yu.set(l,p),c.wu.set(p,l),p}(t,e.targetId);O(yt,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new It(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.gu.set(s,i),cc(t)?ac(t):pr(t).ur()&&oc(t,i)}function ic(n,e){const t=H(n),r=pr(t),s=aa(t,e);O(yt,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.gu.delete(s),t.yu.delete(e),t.wu.delete(s),r.ur()&&zf(t,s),t.gu.size===0&&(r.ur()?r.Er():Ln(t)&&t.Cu.set("Unknown"))}function oc(n,e){if(n.Fu.rt(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(G.min())>0){const t=n.wu.get(e.targetId);if(t===void 0)return void O(yt,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}pr(n).yr(e)}function zf(n,e){n.Fu.rt(e),pr(n).wr(e)}function ac(n){n.Fu=new jg({getRemoteKeysForTarget:e=>{const t=n.wu.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):J()},Mt:e=>n.gu.get(e)||null,xt:()=>n.datastore.serializer.databaseId}),pr(n).start(),n.Cu.Au()}function cc(n){return Ln(n)&&!pr(n).ar()&&n.gu.size>0}function Ln(n){return H(n).xu.size===0}function Gf(n){n.Fu=void 0}async function ZE(n){n.Cu.set("Online")}async function ew(n){n.gu.forEach((e,t)=>{oc(n,e)})}async function tw(n,e){Gf(n),cc(n)?(n.Cu.fu(e),ac(n)):n.Cu.set("Unknown")}async function nw(n,e,t){if(n.Cu.set("Online"),e instanceof ef&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const c of i.targetIds){if(s.gu.has(c)){const l=s.wu.get(c);l!==void 0&&(await s.remoteSyncer.rejectListen(l,a),s.yu.delete(l),s.wu.delete(c)),s.gu.delete(c)}s.Fu.removeTarget(c)}}(n,e)}catch(r){O(yt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ci(n,r)}else if(e instanceof oi?n.Fu.Tt(e):e instanceof Zh?n.Fu.ft(e):n.Fu.Rt(e),!t.isEqual(G.min()))try{const r=await $f(n.localStore);t.compareTo(r)>=0&&await function(i,a){const c=i.Fu.Dt(a);c.targetChanges.forEach((f,p)=>{if(f.resumeToken.approximateByteSize()>0){const m=i.gu.get(p);m&&i.gu.set(p,m.withResumeToken(f.resumeToken,a))}}),c.targetMismatches.forEach((f,p)=>{const m=i.gu.get(f);if(!m)return;i.gu.set(f,m.withResumeToken(oe.EMPTY_BYTE_STRING,m.snapshotVersion)),zf(i,f);const R=new It(m.target,f,p,m.sequenceNumber);oc(i,R)});const l=function(p,m){const R=new Map;m.targetChanges.forEach((x,M)=>{const L=p.wu.get(M);L!==void 0&&R.set(L,x)});let C=new ie(Q);return m.targetMismatches.forEach((x,M)=>{const L=p.wu.get(x);L!==void 0&&(C=C.insert(L,M))}),new bs(m.snapshotVersion,R,C,m.documentUpdates,m.augmentedDocumentUpdates,m.resolvedLimboDocuments)}(i,c);return i.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){O(yt,"Failed to raise snapshot:",r),await Ci(n,r)}}async function Ci(n,e,t){if(!lr(e))throw e;n.xu.add(1),await Ss(n),n.Cu.set("Offline"),t||(t=()=>$f(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{O(yt,"Retrying IndexedDB access"),await t(),n.xu.delete(1),await to(n)})}function Hf(n,e){return e().catch(t=>Ci(n,t,e))}async function no(n){const e=H(n),t=on(e);let r=e.pu.length>0?e.pu[e.pu.length-1].batchId:Ea;for(;rw(e);)try{const s=await KE(e.localStore,r);if(s===null){e.pu.length===0&&t.Er();break}r=s.batchId,sw(e,s)}catch(s){await Ci(e,s)}Wf(e)&&Kf(e)}function rw(n){return Ln(n)&&n.pu.length<10}function sw(n,e){n.pu.push(e);const t=on(n);t.ur()&&t.br&&t.Sr(e.mutations)}function Wf(n){return Ln(n)&&!on(n).ar()&&n.pu.length>0}function Kf(n){on(n).start()}async function iw(n){on(n).Cr()}async function ow(n){const e=on(n);for(const t of n.pu)e.Sr(t.mutations)}async function aw(n,e,t){const r=n.pu.shift(),s=ec.from(r,e,t);await Hf(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await no(n)}async function cw(n,e){e&&on(n).br&&await async function(r,s){if(function(a){return Og(a)&&a!==V.ABORTED}(s.code)){const i=r.pu.shift();on(r).lr(),await Hf(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await no(r)}}(n,e),Wf(n)&&Kf(n)}async function wl(n,e){const t=H(n);t.asyncQueue.verifyOperationInProgress(),O(yt,"RemoteStore received new credentials");const r=Ln(t);t.xu.add(3),await Ss(t),r&&t.Cu.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.xu.delete(3),await to(t)}async function uw(n,e){const t=H(n);e?(t.xu.delete(2),await to(t)):e||(t.xu.add(2),await Ss(t),t.Cu.set("Unknown"))}function pr(n){return n.Ou||(n.Ou=function(t,r,s){const i=H(t);return i.Or(),new E_(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{pn:ZE.bind(null,n),yn:ew.bind(null,n),bn:tw.bind(null,n),gr:nw.bind(null,n)}),n.vu.push(async e=>{e?(n.Ou.lr(),cc(n)?ac(n):n.Cu.set("Unknown")):(await n.Ou.stop(),Gf(n))})),n.Ou}function on(n){return n.Mu||(n.Mu=function(t,r,s){const i=H(t);return i.Or(),new w_(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{pn:()=>Promise.resolve(),yn:iw.bind(null,n),bn:cw.bind(null,n),vr:ow.bind(null,n),Dr:aw.bind(null,n)}),n.vu.push(async e=>{e?(n.Mu.lr(),await no(n)):(await n.Mu.stop(),n.pu.length>0&&(O(yt,`Stopping write stream with ${n.pu.length} pending writes`),n.pu=[]))})),n.Mu}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lw{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Nu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Nu(this.observer.error,e):Pt("Uncaught Error in snapshot listener:",e.toString()))}Bu(){this.muted=!0}Nu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new wn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new uc(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(V.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function lc(n,e){if(Pt("AsyncQueue",`${e}: ${n}`),lr(n))return new D(V.UNAVAILABLE,`${e}: ${n}`);throw n}class Tl{constructor(){this.activeTargetIds=Bg()}nc(e){this.activeTargetIds=this.activeTargetIds.add(e)}rc(e){this.activeTargetIds=this.activeTargetIds.delete(e)}tc(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class hw{constructor(){this.kc=new Tl,this.Qc={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.kc.nc(e),this.Qc[e]||"not-current"}updateQueryState(e,t,r){this.Qc[e]=t}removeLocalQueryTarget(e){this.kc.rc(e)}isLocalQueryTarget(e){return this.kc.activeTargetIds.has(e)}clearQueryState(e){delete this.Qc[e]}getAllActiveQueryTargets(){return this.kc.activeTargetIds}isActiveQueryTarget(e){return this.kc.activeTargetIds.has(e)}start(){return this.kc=new Tl,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}function Fo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{static emptySet(e){return new Tn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||F.comparator(t.key,r.key):(t,r)=>F.comparator(t.key,r.key),this.keyedMap=$n(),this.sortedSet=new ie(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Tn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Tn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Il{constructor(){this.qc=new ie(F.comparator)}track(e){const t=e.doc.key,r=this.qc.get(t);r?e.type!==0&&r.type===3?this.qc=this.qc.insert(t,e):e.type===3&&r.type!==1?this.qc=this.qc.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.qc=this.qc.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.qc=this.qc.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.qc=this.qc.remove(t):e.type===1&&r.type===2?this.qc=this.qc.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.qc=this.qc.insert(t,{type:2,doc:e.doc}):q(63341,{Nt:e,Kc:r}):this.qc=this.qc.insert(t,e)}Wc(){const e=[];return this.qc.inorderTraversal((t,r)=>{e.push(r)}),e}}class or{constructor(e,t,r,s,i,a,c,l,f){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=f}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new or(e,t,Tn.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Zi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fw{constructor(){this.Gc=void 0,this.jc=[]}zc(){return this.jc.some(e=>e.Hc())}}class dw{constructor(){this.queries=vl(),this.onlineState="Unknown",this.Jc=new Set}terminate(){(function(t,r){const s=H(t),i=s.queries;s.queries=vl(),i.forEach((a,c)=>{for(const l of c.jc)l.onError(r)})})(this,new D(V.ABORTED,"Firestore shutting down"))}}function vl(){return new kn(n=>Of(n),Zi)}async function pw(n,e){const t=H(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.zc()&&e.Hc()&&(r=2):(i=new fw,r=e.Hc()?0:1);try{switch(r){case 0:i.Gc=await t.onListen(s,!0);break;case 1:i.Gc=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=lc(a,`Initialization of query '${_e(e.query)?bt(e.query):$r(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.jc.push(e),e.Yc(t.onlineState),i.Gc&&e.Zc(i.Gc)&&hc(t)}async function mw(n,e){const t=H(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.jc.indexOf(e);a>=0&&(i.jc.splice(a,1),i.jc.length===0?s=e.Hc()?0:1:!i.zc()&&e.Hc()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function gw(n,e){const t=H(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.jc)c.Zc(s)&&(r=!0);a.Gc=s}}r&&hc(t)}function _w(n,e,t){const r=H(n),s=r.queries.get(e);if(s)for(const i of s.jc)i.onError(t);r.queries.delete(e)}function hc(n){n.Jc.forEach(e=>{e.next()})}var ca;(function(n){n.Default="default",n.Cache="cache"})(ca||(ca={}));class yw{constructor(e,t,r){this.query=e,this.Xc=t,this.el=!1,this.tl=null,this.onlineState="Unknown",this.options=r||{}}Zc(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new or(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.el?this.nl(e)&&(this.Xc.next(e),t=!0):this.rl(e,this.onlineState)&&(this.il(e),t=!0),this.tl=e,t}onError(e){this.Xc.error(e)}Yc(e){this.onlineState=e;let t=!1;return this.tl&&!this.el&&this.rl(this.tl,e)&&(this.il(this.tl),t=!0),t}rl(e,t){if(!e.fromCache||!this.Hc())return!0;const r=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}nl(e){if(e.docChanges.length>0)return!0;const t=this.tl&&this.tl.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}il(e){e=or.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.el=!0,this.Xc.next(e)}Hc(){return this.options.source!==ca.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(e){this.key=e}}class Jf{constructor(e){this.key=e}}class Ew{constructor(e,t){this.query=e,this.hl=t,this.Tl=null,this.hasCachedResults=!1,this.current=!1,this.Pl=J(),this.mutatedKeys=J(),this.Il=_e(e)?ia(e):Va(e),this.Rl=new Tn(this.Il)}get Al(){return this.hl}Vl(e,t){const r=t?t.dl:new Il,s=t?t.Rl:this.Rl;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const[l,f]=this.fl(this.query,s);e.inorderTraversal((m,R)=>{const C=s.get(m),x=RE(this.query,R)?R:null,M=!!C&&this.mutatedKeys.has(C.key),L=!!x&&(x.hasLocalMutations||this.mutatedKeys.has(x.key)&&x.hasCommittedMutations);let W=!1;C&&x?C.data.isEqual(x.data)?M!==L&&(r.track({type:3,doc:x}),W=!0):this.ml(C,x)||(r.track({type:2,doc:x}),W=!0,(l&&this.Il(x,l)>0||f&&this.Il(x,f)<0)&&(c=!0)):!C&&x?(r.track({type:0,doc:x}),W=!0):C&&!x&&(r.track({type:1,doc:C}),W=!0,(l||f)&&(c=!0)),W&&(x?(a=a.add(x),i=L?i.add(m):i.delete(m)):(a=a.delete(m),i=i.delete(m)))});const p=this.pl(this.query);if(p)if(_e(this.query)){const m=[];a.forEach(x=>m.push(x));const R=Ff(this.query,m);let C=new Tn(ia(this.query));for(const x of R)C=C.add(x);a.forEach(x=>{C.has(x.key)||(i=i.delete(x.key),r.track({type:1,doc:x}))}),a=C}else{const m=this.gl(this.query);for(;a.size>p;){const R=m==="F"?a.last():a.first();a=a.delete(R.key),i=i.delete(R.key),r.track({type:1,doc:R})}}return{Rl:a,dl:r,Za:c,mutatedKeys:i}}pl(e){return _e(e)?Uo(e)?.limit:e.limit||void 0}gl(e){if(_e(e)){const t=Uo(e);return t&&t.limit<0?"L":"F"}return e.limitType}fl(e,t){if(_e(e)){const r=Uo(e)?.limit;return[t.size===r?t.last():null,null]}return[e.limitType==="F"&&t.size===this.pl(this.query)?t.last():null,e.limitType==="L"&&t.size===this.pl(this.query)?t.first():null]}ml(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.Rl;this.Rl=e.Rl,this.mutatedKeys=e.mutatedKeys;const a=e.dl.Wc();a.sort((p,m)=>function(C,x){const M=L=>{switch(L){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return q(20277,{Nt:L})}};return M(C)-M(x)}(p.type,m.type)||this.Il(p.doc,m.doc)),this.yl(r),s=s??!1;const c=t&&!s?this.wl():[],l=this.Pl.size===0&&this.current&&!s?1:0,f=l!==this.Tl;return this.Tl=l,a.length!==0||f?{snapshot:new or(this.query,e.Rl,i,a,e.mutatedKeys,l===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),bl:c}:{bl:c}}Yc(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Rl:this.Rl,dl:new Il,mutatedKeys:this.mutatedKeys,Za:!1},!1)):{bl:[]}}Sl(e){return!this.hl.has(e)&&!!this.Rl.has(e)&&!this.Rl.get(e).hasLocalMutations}yl(e){e&&(e.addedDocuments.forEach(t=>this.hl=this.hl.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.hl=this.hl.delete(t)),this.current=e.current)}wl(){if(!this.current)return[];const e=this.Pl;this.Pl=J(),this.Rl.forEach(r=>{this.Sl(r.key)&&(this.Pl=this.Pl.add(r.key))});const t=[];return e.forEach(r=>{this.Pl.has(r)||t.push(new Jf(r))}),this.Pl.forEach(r=>{e.has(r)||t.push(new Qf(r))}),t}xl(e){this.hl=e.uu,this.Pl=J();const t=this.Vl(e.documents);return this.applyChanges(t,!0)}vl(){return or.fromInitialDocuments(this.query,this.Rl,this.mutatedKeys,this.Tl===0,this.hasCachedResults)}}const fc="SyncEngine";class ww{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Tw{constructor(e){this.key=e,this.Dl=!1}}class Iw{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Cl={},this.Fl=new kn(c=>Of(c),Zi),this.Ol=new Map,this.Ml=new Set,this.Nl=new ie(F.comparator),this.Bl=new Map,this.Ll=new tc,this.$l={},this.Ul=new Map,this.kl=sn.G_(),this.onlineState="Unknown",this.Ql=void 0}get isPrimaryClient(){return this.Ql===!0}}async function vw(n,e,t=!0){const r=nd(n);let s;const i=r.Fl.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.vl()):s=await Yf(r,e,t,!0),s}async function Aw(n,e){const t=nd(n);await Yf(t,e,!0,!1)}async function Yf(n,e,t,r){const s=await QE(n.localStore,_e(e)?e:ft(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await bw(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&jf(n.remoteStore,s),c}async function bw(n,e,t,r,s){n.ql=(m,R,C)=>async function(M,L,W,ee){let ae=L.view.Vl(W);ae.Za&&(ae=await El(M.localStore,L.query,!1).then(({documents:T})=>L.view.Vl(T,ae)));const Oe=ee&&ee.targetChanges.get(L.targetId),et=ee&&ee.targetMismatches.get(L.targetId)!=null,ve=L.view.applyChanges(ae,M.isPrimaryClient,Oe,et);return bl(M,L.targetId,ve.bl),ve.snapshot}(n,m,R,C);const i=await El(n.localStore,e,!0),a=new Ew(e,i.uu),c=a.Vl(i.documents),l=Rs.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),f=a.applyChanges(c,n.isPrimaryClient,l);bl(n,t,f.bl);const p=new ww(e,t,a);return n.Fl.set(e,p),n.Ol.has(t)?n.Ol.get(t).push(e):n.Ol.set(t,[e]),f.snapshot}async function Rw(n,e,t){const r=H(n),s=r.Fl.get(e),i=r.Ol.get(s.targetId);if(i.length>1)return r.Ol.set(s.targetId,i.filter(a=>!Zi(a,e))),void r.Fl.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await oa(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&ic(r.remoteStore,s.targetId),ua(r,s.targetId)}).catch(ur)):(ua(r,s.targetId),await oa(r.localStore,s.targetId,!0))}async function Pw(n,e){const t=H(n),r=t.Fl.get(e),s=t.Ol.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ic(t.remoteStore,r.targetId))}async function Vw(n,e,t){const r=Ow(n);try{const s=await function(a,c){const l=H(a),f=te.now(),p=c.reduce((C,x)=>C.add(x.key),J());let m,R;return l.persistence.runTransaction("Locally write mutations","readwrite",C=>{let x=Fe(),M=J();return l.iu.getEntries(C,p).next(L=>{x=L,x.forEach((W,ee)=>{ee.isValidDocument()||(M=M.add(W))})}).next(()=>l.localDocuments.getOverlayedDocuments(C,x)).next(L=>{m=L;const W=[];for(const ee of c){const ae=pg(ee,m.get(ee.key).overlayedDocument);ae!=null&&W.push(new Nn(ee.key,ae,Nh(ae.value.mapValue),ht.exists(!0)))}return l.mutationQueue.addMutationBatch(C,f,W,c)}).next(L=>{R=L;const W=L.applyToLocalDocumentSet(m,M);return l.documentOverlayCache.saveOverlays(C,L.batchId,W)})}).then(()=>({batchId:R.batchId,changes:Yh(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,c,l){let f=a.$l[a.currentUser.toKey()];f||(f=new ie(Q)),f=f.insert(c,l),a.$l[a.currentUser.toKey()]=f}(r,s.batchId,t),await Cs(r,s.changes),await no(r.remoteStore)}catch(s){const i=lc(s,"Failed to persist write");t.reject(i)}}async function Xf(n,e){const t=H(n);try{const r=await HE(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Bl.get(i);a&&(U(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Dl=!0:s.modifiedDocuments.size>0?U(a.Dl,14607):s.removedDocuments.size>0&&(U(a.Dl,42227),a.Dl=!1))}),await Cs(t,r,e)}catch(r){await ur(r)}}function Al(n,e,t){const r=H(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Fl.forEach((i,a)=>{const c=a.view.Yc(e);c.snapshot&&s.push(c.snapshot)}),function(a,c){const l=H(a);l.onlineState=c;let f=!1;l.queries.forEach((p,m)=>{for(const R of m.jc)R.Yc(c)&&(f=!0)}),f&&hc(l)}(r.eventManager,e),s.length&&r.Cl.gr(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Sw(n,e,t){const r=H(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Bl.get(e),i=s&&s.key;if(i){let a=new ie(F.comparator);a=a.insert(i,Ce.newNoDocument(i,G.min()));const c=J().add(i),l=new bs(G.min(),new Map,new ie(Q),a,Fe(),c);await Xf(r,l),r.Nl=r.Nl.remove(i),r.Bl.delete(e),dc(r)}else await oa(r.localStore,e,!1).then(()=>ua(r,e,t)).catch(ur)}async function Cw(n,e){const t=H(n),r=e.batch.batchId;try{const s=await GE(t.localStore,e);ed(t,r,null),Zf(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Cs(t,s)}catch(s){await ur(s)}}async function xw(n,e,t){const r=H(n);try{const s=await function(a,c){const l=H(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let p;return l.mutationQueue.lookupMutationBatch(f,c).next(m=>(U(m!==null,37113),p=m.keys(),l.mutationQueue.removeMutationBatch(f,m))).next(()=>l.mutationQueue.performConsistencyCheck(f)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(f,p,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,p)).next(()=>l.localDocuments.getDocuments(f,p))})}(r.localStore,e);ed(r,e,t),Zf(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Cs(r,s)}catch(s){await ur(s)}}function Zf(n,e){(n.Ul.get(e)||[]).forEach(t=>{t.resolve()}),n.Ul.delete(e)}function ed(n,e,t){const r=H(n);let s=r.$l[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.$l[r.currentUser.toKey()]=s}}function ua(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ol.get(e))n.Fl.delete(r),t&&n.Cl.Kl(r,t);n.Ol.delete(e),n.isPrimaryClient&&n.Ll.fo(e).forEach(r=>{n.Ll.containsKey(r)||td(n,r)})}function td(n,e){n.Ml.delete(e.path.canonicalString());const t=n.Nl.get(e);t!==null&&(ic(n.remoteStore,t),n.Nl=n.Nl.remove(e),n.Bl.delete(t),dc(n))}function bl(n,e,t){for(const r of t)r instanceof Qf?(n.Ll.addReference(r.key,e),Nw(n,r)):r instanceof Jf?(O(fc,"Document no longer in limbo: "+r.key),n.Ll.removeReference(r.key,e),n.Ll.containsKey(r.key)||td(n,r.key)):q(19791,{Wl:r})}function Nw(n,e){const t=e.key,r=t.path.canonicalString();n.Nl.get(t)||n.Ml.has(r)||(O(fc,"New document in limbo: "+t),n.Ml.add(r),dc(n))}function dc(n){for(;n.Ml.size>0&&n.Nl.size<n.maxConcurrentLimboResolutions;){const e=n.Ml.values().next().value;n.Ml.delete(e);const t=new F(Z.fromString(e)),r=n.kl.next();n.Bl.set(r,new Tw(t)),n.Nl=n.Nl.insert(t,r),jf(n.remoteStore,new It(ft(Pa(t.path)),r,"TargetPurposeLimboResolution",Hi.Br))}}async function Cs(n,e,t){const r=H(n),s=[],i=[],a=[];r.Fl.isEmpty()||(r.Fl.forEach((c,l)=>{a.push(r.ql(l,e,t).then(f=>{if((f||t)&&r.isPrimaryClient){const p=f?!f.fromCache:t?.targetChanges.get(l.targetId)?.current;r.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(f){s.push(f);const p=rc.ka(l.targetId,f);i.push(p)}}))}),await Promise.all(a),r.Cl.gr(s),await async function(l,f){const p=H(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>S.forEach(f,R=>S.forEach(R.$a,C=>p.persistence.referenceDelegate.addReference(m,R.targetId,C)).next(()=>S.forEach(R.Ua,C=>p.persistence.referenceDelegate.removeReference(m,R.targetId,C)))))}catch(m){if(!lr(m))throw m;O(sc,"Failed to update sequence numbers: "+m)}for(const m of f){const R=m.targetId;if(!m.fromCache){const C=p.tu.get(R),x=C.snapshotVersion,M=C.withLastLimboFreeSnapshotVersion(x);p.tu=p.tu.insert(R,M)}}}(r.localStore,i))}async function kw(n,e){const t=H(n);if(!t.currentUser.isEqual(e)){O(fc,"User change. New user:",e.toKey());const r=await qf(t.localStore,e);t.currentUser=e,function(i,a){i.Ul.forEach(c=>{c.forEach(l=>{l.reject(new D(V.CANCELLED,a))})}),i.Ul.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Cs(t,r._u)}}function Dw(n,e){const t=H(n),r=t.Bl.get(e);if(r&&r.Dl)return J().add(r.key);{let s=J();const i=t.Ol.get(e);if(!i)return s;for(const a of i??[]){const c=t.Fl.get(a);s=s.unionWith(c.view.Al)}return s}}function nd(n){const e=H(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Xf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Dw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Sw.bind(null,e),e.Cl.gr=gw.bind(null,e.eventManager),e.Cl.Kl=_w.bind(null,e.eventManager),e}function Ow(n){const e=H(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Cw.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=xw.bind(null,e),e}class xi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Gi(e.databaseInfo.databaseId),this.sharedClientState=this.jl(e),this.persistence=this.zl(e),await this.persistence.start(),this.localStore=this.Hl(e),this.gcScheduler=this.Jl(e,this.localStore),this.indexBackfillerScheduler=this.Yl(e,this.localStore)}Jl(e,t){return null}Yl(e,t){return null}Hl(e){return zE(this.persistence,new qE,e.initialUser,this.serializer)}zl(e){return new Bf(nc.Ho,this.serializer)}jl(e){return new hw}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}xi.provider={build:()=>new xi};class Lw extends xi{constructor(e){super(),this.cacheSizeBytes=e}Jl(e,t){U(this.persistence.referenceDelegate instanceof Si,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new x_(r,e.asyncQueue,t)}zl(e){const t=this.cacheSizeBytes!==void 0?Me.withCacheSize(this.cacheSizeBytes):Me.DEFAULT;return new Bf(r=>Si.Ho(r,t),this.serializer)}}class la{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Al(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=kw.bind(null,this.syncEngine),await uw(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new dw}()}createDatastore(e){const t=Gi(e.databaseInfo.databaseId),r=y_(e.databaseInfo);return v_(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,c){return new XE(r,s,i,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Al(this.syncEngine,t,0),function(){return cl.cn()?new cl:new p_}())}createSyncEngine(e,t){return function(s,i,a,c,l,f,p){const m=new Iw(s,i,a,c,l,f);return p&&(m.Ql=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(t){const r=H(t);O(yt,"RemoteStore shutting down."),r.xu.add(5),await Ss(r),r.Du.shutdown(),r.Cu.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}la.provider={build:()=>new la};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const an="FirestoreClient";class Mw{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Se.UNAUTHENTICATED,this.clientId=_a.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{O(an,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(O(an,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new wn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=lc(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Bo(n,e){n.asyncQueue.verifyOperationInProgress(),O(an,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await qf(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Rl(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Uw(n);O(an,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>wl(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>wl(e.remoteStore,s)),n._onlineComponents=e}async function Uw(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O(an,"Using user provided OfflineComponentProvider");try{await Bo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===V.FAILED_PRECONDITION||s.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;st("Error using user provided cache. Falling back to memory cache: "+t),await Bo(n,new xi)}}else O(an,"Using default OfflineComponentProvider"),await Bo(n,new Lw(void 0));return n._offlineComponents}async function rd(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O(an,"Using user provided OnlineComponentProvider"),await Rl(n,n._uninitializedComponentsProvider._online)):(O(an,"Using default OnlineComponentProvider"),await Rl(n,new la))),n._onlineComponents}function Fw(n){return rd(n).then(e=>e.syncEngine)}async function Pl(n){const e=await rd(n),t=e.eventManager;return t.onListen=vw.bind(null,e.syncEngine),t.onUnlisten=Rw.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Aw.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Pw.bind(null,e.syncEngine),t}function Bw(n,e,t,r){const s=new lw(r),i=new yw(e,s,t);return n.asyncQueue.enqueueAndForget(async()=>pw(await Pl(n),i)),()=>{s.Bu(),n.asyncQueue.enqueueAndForget(async()=>mw(await Pl(n),i))}}function qw(n,e){const t=new wn;return n.asyncQueue.enqueueAndForget(async()=>Vw(await Fw(n),e,t)),t.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sd=class{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new he(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new $w(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(Ki("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},$w=class extends sd{data(){return super.data()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{convertValue(e,t="none"){switch(me(e)){case 0:return null;case 2:return e.booleanValue;case 3:if("mapValue"in e){if(en(e))return this.convertToInt32Value(e.mapValue);if(Ze(e))return this.convertToDecimal128Value(e.mapValue)}return ue(e.integerValue||e.doubleValue);case 4:return this.convertTimestamp(e.timestampValue);case 6:return this.convertServerTimestamp(e,t);case 7:return e.stringValue;case 8:return"bytesValue"in e?this.convertBytes(Vn(e.bytesValue)):this.convertToBytesWithSubtype(e.mapValue);case 9:return this.convertReference(e.referenceValue);case 11:return this.convertGeoPoint(e.geoPointValue);case 13:return this.convertArray(e.arrayValue,t);case 15:return this.convertObject(e.mapValue,t);case 14:return this.convertVectorValue(e.mapValue);case 12:return this.convertToRegexValue(e.mapValue);case 10:return this.convertToBsonObjectId(e.mapValue);case 5:return this.convertToBsonTimestamp(e.mapValue);case 16:return wt.instance();case 1:return Tt.instance();default:throw q(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Cn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){const t=e.fields?.[Xr].arrayValue?.values?.map(r=>ue(r.doubleValue));return new Be(t)}convertToBsonObjectId(e){const t=e.fields?.[Zr]?.stringValue??"";return new Na(t)}convertToBytesWithSubtype(e){const t=e.fields?.[qi],r=t?.bytesValue;if(!r)throw new Error("Received incorrect bytesValue for Bytes with subtype");const s=Vn(r).toUint8Array();if(s.length===0)throw new Error("Received empty bytesValue for Bytes with subtype");const i=s[0],a=s.slice(1);return new He(oe.fromUint8Array(a),i)}convertToBsonTimestamp(e){const t=e.fields?.[_n],r=Number(t?.mapValue?.fields?.[yi]?.integerValue),s=Number(t?.mapValue?.fields?.[Ei]?.integerValue);return new ka(r,s)}convertToRegexValue(e){const t=e.fields?.[Gt]?.mapValue?.fields?.[gi]?.stringValue??"",r=e.fields?.[Gt]?.mapValue?.fields?.[_i]?.stringValue??"";return new Ua(t,r)}convertToInt32Value(e){const t=Number(e.fields?.[xn]?.integerValue);return new Ma(t)}convertToDecimal128Value(e){const t=e.fields?.[Zt]?.stringValue??"";return new Da(t)}convertGeoPoint(e){return new pt(ue(e.latitude),ue(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Is(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(tr(e));default:return null}}convertTimestamp(e){const t=Xt(e);return new te(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Z.fromString(e);U(af(r),9688,{name:e});const s=new Jr(r.get(1),r.get(3)),i=new F(r.popFirst(5));return s.isEqual(t)||Pt(`A document reference to ${i} refers to a different database (${s.projectId}/${s.database}), which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zw(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vl="AsyncQueue";class Sl{constructor(e=Promise.resolve()){this._E=[],this.oE=!1,this.aE=[],this.uE=null,this.cE=!1,this.lE=!1,this.EE=[],this._r=new ff(this,"async_queue_retry"),this.hE=()=>{const r=Fo();r&&O(Vl,"Visibility state changed to "+r.visibilityState),this._r.Xn()},this.TE=e;const t=Fo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.hE)}get isShuttingDown(){return this.oE}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.PE(),this.IE(e)}enterRestrictedMode(e){if(!this.oE){this.oE=!0,this.lE=e||!1;const t=Fo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.hE)}}enqueue(e){if(this.PE(),this.oE)return new Promise(()=>{});const t=new wn;return this.IE(()=>this.oE&&this.lE?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this._E.push(e),this.RE()))}async RE(){if(this._E.length!==0){try{await this._E[0](),this._E.shift(),this._r.reset()}catch(e){if(!lr(e))throw e;O(Vl,"Operation failed with retryable error: "+e)}this._E.length>0&&this._r.Yn(()=>this.RE())}}IE(e){const t=this.TE.then(()=>(this.cE=!0,e().catch(r=>{throw this.uE=r,this.cE=!1,Pt("INTERNAL UNHANDLED ERROR: ",Cl(r)),r}).then(r=>(this.cE=!1,r))));return this.TE=t,t}enqueueAfterDelay(e,t,r){this.PE(),this.EE.indexOf(e)>-1&&(t=0);const s=uc.createAndSchedule(this,e,t,r,i=>this.AE(i));return this.aE.push(s),s}PE(){this.uE&&q(47125,{VE:Cl(this.uE)})}verifyOperationInProgress(){}async dE(){let e;do e=this.TE,await e;while(e!==this.TE)}fE(e){for(const t of this.aE)if(t.timerId===e)return!0;return!1}mE(e){return this.dE().then(()=>{this.aE.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.aE)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.dE()})}pE(e){this.EE.push(e)}AE(e){const t=this.aE.indexOf(e);this.aE.splice(t,1)}}function Cl(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class ms extends Wi{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Sl,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Sl(e),this._firestoreClient=void 0,await e}}}function Z0(n,e){const t=typeof n=="object"?n:oh(),r=typeof n=="string"?n:mi,s=ma(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Cp("firestore");i&&D_(s,...i)}return s}function id(n){if(n._terminated)throw new D(V.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Gw(n),n._firestoreClient}function Gw(n){const e=n._freezeSettings(),t=b_(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Mw(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}}(n._componentsProvider))}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class od extends jw{constructor(e){super(),this.firestore=e}convertBytes(e){return new He(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new he(this.firestore,null,t)}}class Ur{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class In extends sd{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ci(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Ki("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=In._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}In._jsonSchemaVersion="firestore/documentSnapshot/1.0",In._jsonSchema={type:le("string",In._jsonSchemaVersion),bundleSource:le("string","DocumentSnapshot"),bundleName:le("string"),bundle:le("string")};class ci extends In{data(e={}){return super.data(e)}}class Qn{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Ur(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new ci(this._firestore,this._userDataWriter,r.key,r,new Ur(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(c=>{_e(s._snapshot.query)?ia(s._snapshot.query):Va(s.query._query);const l=new ci(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Ur(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const l=new ci(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Ur(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let f=-1,p=-1;return c.type!==0&&(f=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),p=a.indexOf(c.doc.key)),{type:Hw(c.type),doc:l,oldIndex:f,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Qn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=_a.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Hw(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return q(61501,{type:n})}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Qn._jsonSchemaVersion="firestore/querySnapshot/1.0",Qn._jsonSchema={type:le("string",Qn._jsonSchemaVersion),bundleSource:le("string","QuerySnapshot"),bundleName:le("string"),bundle:le("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ww(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new D(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class pc{}class ad extends pc{}function eI(n,e,...t){let r=[];e instanceof pc&&r.push(e),r=r.concat(t),function(i){const a=i.filter(l=>l instanceof gc).length,c=i.filter(l=>l instanceof mc).length;if(a>1||a>0&&c>0)throw new D(V.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class mc extends ad{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new mc(e,t,r)}_apply(e){const t=this._parse(e);return cd(e._query,t),new Dn(e.firestore,e.converter,Xo(e._query,t))}_parse(e){const t=_f(e.firestore);return function(i,a,c,l,f,p,m){let R;if(function(M,L){if(typeof M=="number"&&isNaN(M)&&L!=="=="&&L!=="!="&&L!=="array-contains")throw new Error("Invalid query. You can only perform '==' and '!=' comparisons on NaN.");if(M===null&&L!=="=="&&L!=="!="&&L!=="array-contains")throw new Error("Invalid query. You can only perform '==' and '!=' comparisons on Null.")}(m,p),f.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new D(V.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){Nl(m,p);const x=[];for(const M of m)x.push(xl(l,i,M));R={arrayValue:{values:x}}}else R=xl(l,i,m)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||Nl(m,p),R=F_(c,a,m,p==="in"||p==="not-in");return de.create(f,p,R)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class gc extends pc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new gc(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:it.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const c=i.getFlattenedFilters();for(const l of c)cd(a,l),a=Xo(a,l)}(e._query,t),new Dn(e.firestore,e.converter,Xo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class _c extends ad{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new _c(e,t,r)}_apply(e){return new Dn(e.firestore,e.converter,bi(e._query,this._limit,this._limitType))}}function tI(n){return _c._create("limit",n,"F")}function xl(n,e,t){if(typeof(t=Qe(t))=="string"){if(t==="")throw new D(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Kh(e)&&t.indexOf("/")!==-1)throw new D(V.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Z.fromString(t));if(!F.isDocumentKey(r))throw new D(V.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Hu(n,new F(r))}if(t instanceof he)return Hu(n,t._key);throw new D(V.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Fi(t)}.`)}function Nl(n,e){if(!Array.isArray(n)||n.length===0)throw new D(V.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function cd(n,e){const t=function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new D(V.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new D(V.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kl(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}function nI(n,e,t){n=yn(n,he);const r=yn(n.firestore,ms),s=zw(n.converter,e,t),i=_f(r);return ud(r,[U_(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,ht.none())])}function rI(n){return ud(yn(n.firestore,ms),[new Ra(n._key,ht.none())])}function sI(n,...e){n=Qe(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||kl(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(kl(e[r])){const f=e[r];e[r]=f.next?.bind(f),e[r+1]=f.error?.bind(f),e[r+2]=f.complete?.bind(f)}let i,a,c;if(n instanceof he)a=yn(n.firestore,ms),c=Pa(n._key.path),i={next:f=>{e[r]&&e[r](Kw(a,n,f))},error:e[r+1],complete:e[r+2]};else{const f=yn(n,Dn);a=yn(f.firestore,ms),c=f._query;const p=new od(a);i={next:m=>{e[r]&&e[r](new Qn(a,p,f,m))},error:e[r+1],complete:e[r+2]},Ww(n._query)}const l=id(a);return Bw(l,c,s,i)}function ud(n,e){const t=id(n);return qw(t,e)}function Kw(n,e,t){const r=t.docs.get(e._key),s=new od(n);return new In(n,s,e._key,r,new Ur(t.hasPendingWrites,t.fromCache),e.converter)}const Dl="@firebase/firestore",Ol="4.19.0";(function(e,t=!0){Km(ar),Xn(new bn("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new ms(new l_(r.getProvider("auth-internal")),new d_(a,r.getProvider("app-check-internal")),rg(a,s),a);return i={useFetchStreams:t,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),Ht(Dl,Ol,e),Ht(Dl,Ol,"esm2020")})();function ld(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Qw=ld,hd=new _s("auth","Firebase",ld());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ni=new pa("@firebase/auth");function ui(n,...e){Ni.logLevel<=Y.WARN&&Ni.warn(`Auth (${ar}): ${n}`,...e)}function li(n,...e){Ni.logLevel<=Y.ERROR&&Ni.error(`Auth (${ar}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(n,...e){throw Ec(n,...e)}function mt(n,...e){return Ec(n,...e)}function yc(n,e,t){const r={...Qw(),[e]:t};return new _s("auth","Firebase",r).create(e,{appName:n.name})}function Yt(n){return yc(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ec(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return hd.create(n,...e)}function z(n,e,...t){if(!n)throw Ec(e,...t)}function vt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw li(e),new Error(e)}function xt(n,e){n||vt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ha(){return typeof self<"u"&&self.location?.href||""}function Jw(){return Ll()==="http:"||Ll()==="https:"}function Ll(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Jw()||Lp()||"connection"in navigator)?navigator.onLine:!0}function Xw(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(e,t){this.shortDelay=e,this.longDelay=t,xt(t>e,"Short delay should be less than long delay!"),this.isMobile=kp()||Mp()}get(){return Yw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wc(n,e){xt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;vt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;vt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;vt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eT=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],tT=new xs(3e4,6e4);function ro(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function mr(n,e,t,r,s={}){return dd(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=ys({...a,key:n.config.apiKey}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const f={method:e,headers:l,...i};return Op()||(f.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&Es(n.emulatorConfig.host)&&(f.credentials="include"),fd.fetch()(await md(n,n.config.apiHost,t,c),f)})}async function dd(n,e,t){n._canInitEmulator=!1;const r={...Zw,...e};try{const s=new nT(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw ti(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[l,f]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw ti(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw ti(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw ti(n,"user-disabled",a);const p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw yc(n,p,f);Ct(n,p)}}catch(s){if(s instanceof Nt)throw s;Ct(n,"network-request-failed",{message:String(s)})}}async function pd(n,e,t,r,s={}){const i=await mr(n,e,t,r,s);return"mfaPendingCredential"in i&&Ct(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function md(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?wc(n.config,s):`${n.config.apiScheme}://${s}`;return eT.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class nT{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(mt(this.auth,"network-request-failed")),tT.get())})}}function ti(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=mt(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rT(n,e){return mr(n,"POST","/v1/accounts:delete",e)}async function ki(n,e){return mr(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function sT(n,e=!1){const t=Qe(n),r=await t.getIdToken(e),s=Tc(r);z(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:Hr(qo(s.auth_time)),issuedAtTime:Hr(qo(s.iat)),expirationTime:Hr(qo(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function qo(n){return Number(n)*1e3}function Tc(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return li("JWT malformed, contained fewer than 3 sections"),null;try{const s=th(t);return s?JSON.parse(s):(li("Failed to decode base64 JWT payload"),null)}catch(s){return li("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Ml(n){const e=Tc(n);return z(e,"internal-error"),z(typeof e.exp<"u","internal-error"),z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gs(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw gd(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function gd(n){return n instanceof Nt?n.code==="auth/user-disabled"||n.code==="auth/user-token-expired":!1}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iT{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Hr(this.lastLoginAt),this.creationTime=Hr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Di(n){const e=n.auth,t=await n.getIdToken(),r=await gs(n,ki(e,{idToken:t}));z(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?_d(s.providerUserInfo):[],a=aT(n.providerData,i),c=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!a?.length,f=c?l:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new fa(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(n,p)}async function oT(n){const e=Qe(n);await Di(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function aT(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function _d(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cT(n,e){const t=await dd(n,{},async()=>{const r=ys({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await md(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return n.emulatorConfig&&Es(n.emulatorConfig.host)&&(l.credentials="include"),fd.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function uT(n,e){return mr(n,"POST","/v2/accounts:revokeToken",ro(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){z(e.idToken,"internal-error"),z(typeof e.idToken<"u","internal-error"),z(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ml(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){z(e.length!==0,"internal-error");const t=Ml(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(z(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await cT(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Jn;return r&&(z(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(z(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(z(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Jn,this.toJSON())}_performRefresh(){return vt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ft(n,e){z(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class rt{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new iT(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new fa(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await gs(this,this.stsTokenManager.getToken(this.auth,e));return z(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return sT(this,e)}reload(){return oT(this)}_assign(e){this!==e&&(z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new rt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Di(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(tt(this.auth.app))return Promise.reject(Yt(this.auth));const e=await this.getIdToken();return await gs(this,rT(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,l=t._redirectEventId??void 0,f=t.createdAt??void 0,p=t.lastLoginAt??void 0,{uid:m,emailVerified:R,isAnonymous:C,providerData:x,stsTokenManager:M}=t;z(m&&M,e,"internal-error");const L=Jn.fromJSON(this.name,M);z(typeof m=="string",e,"internal-error"),Ft(r,e.name),Ft(s,e.name),z(typeof R=="boolean",e,"internal-error"),z(typeof C=="boolean",e,"internal-error"),Ft(i,e.name),Ft(a,e.name),Ft(c,e.name),Ft(l,e.name),Ft(f,e.name),Ft(p,e.name);const W=new rt({uid:m,auth:e,email:s,emailVerified:R,displayName:r,isAnonymous:C,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:L,createdAt:f,lastLoginAt:p});return x&&Array.isArray(x)&&(W.providerData=x.map(ee=>({...ee}))),l&&(W._redirectEventId=l),W}static async _fromIdTokenResponse(e,t,r=!1){const s=new Jn;s.updateFromServerResponse(t);const i=new rt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Di(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];z(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?_d(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,c=new Jn;c.updateFromIdToken(r);const l=new rt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new fa(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(l,f),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ul=new Map;function At(n){xt(n instanceof Function,"Expected a class definition");let e=Ul.get(n);return e?(xt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ul.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}yd.type="NONE";const Fl=yd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hi(n,e,t){return`firebase:${n}:${e}:${t}`}class vn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=hi(this.userKey,s.apiKey,i),this.fullPersistenceKey=hi("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ki(this.auth,{idToken:e}).catch(()=>{});return t?rt._fromGetAccountInfoResponse(this.auth,t,e):null}return rt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,t,r="authUser"){if(!t.length)return new vn(At(Fl),e,r);const s=(await Promise.all(t.map(async f=>{try{if(await f._isAvailable())return f}catch{return}}))).filter(f=>f);let i=s[0]||At(Fl);const a=hi(r,e.config.apiKey,e.name);let c=null;for(const f of t)try{const p=await f._get(a);if(p){let m;if(typeof p=="string"){const R=await ki(e,{idToken:p}).catch(()=>{});if(!R)break;m=await rt._fromGetAccountInfoResponse(e,R,p)}else m=rt._fromJSON(e,p);f!==i&&(c=m),i=f;break}}catch{}const l=s.filter(f=>f._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new vn(i,e,r):(i=l[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async f=>{if(f!==i)try{await f._remove(a)}catch{}})),new vn(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bl(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Id(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ed(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ad(e))return"Blackberry";if(bd(e))return"Webos";if(wd(e))return"Safari";if((e.includes("chrome/")||Td(e))&&!e.includes("edge/"))return"Chrome";if(vd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Ed(n=xe()){return/firefox\//i.test(n)}function wd(n=xe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Td(n=xe()){return/crios\//i.test(n)}function Id(n=xe()){return/iemobile/i.test(n)}function vd(n=xe()){return/android/i.test(n)}function Ad(n=xe()){return/blackberry/i.test(n)}function bd(n=xe()){return/webos/i.test(n)}function Ic(n=xe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function lT(n=xe()){return Ic(n)&&!!window.navigator?.standalone}function hT(){return Up()&&document.documentMode===10}function Rd(n=xe()){return Ic(n)||vd(n)||bd(n)||Ad(n)||/windows phone/i.test(n)||Id(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pd(n,e=[]){let t;switch(n){case"Browser":t=Bl(xe());break;case"Worker":t=`${Bl(xe())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ar}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fT{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const l=e(i);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dT(n,e={}){return mr(n,"GET","/v2/passwordPolicy",ro(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pT=6;class mT{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??pT,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gT{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ql(this),this.idTokenSubscription=new ql(this),this.beforeStateQueue=new fT(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=hd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=At(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted){try{this.persistenceManager=await vn.create(this,e)}catch(r){ui(`Failed to initialize persistence: ${r}`),this.persistenceManager=await vn.create(this,[])}finally{this._resolvePersistenceManagerAvailable?.()}if(!this._deleted){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(t)}catch(r){ui(`Failed to initialize current user: ${r}`),await this.directlySetCurrentUser(null).catch(()=>{})}this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ki(this,{idToken:e}),r=await rt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(tt(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,a=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===a)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Di(e)}catch(t){if(gd(t))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Xw()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(tt(this.app))return Promise.reject(Yt(this));const t=e?Qe(e):null;return t&&z(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return tt(this.app)?Promise.reject(Yt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return tt(this.app)?Promise.reject(Yt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(At(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await dT(this),t=new mT(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new _s("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await uT(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&At(e)||this._popupRedirectResolver;z(t,this,"argument-error"),this.redirectPersistenceManager=await vn.create(this,[At(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(z(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}).catch(l=>{if(!a)if(typeof t!="function"&&t.error)t.error(l);else if(r)r(l);else throw l}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(t){const r=t?.message||String(t),s=yc(this,"internal-error",`An internal AuthError has occurred: ${r}`);throw s.customData={originalError:t},s}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Pd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(tt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&ui(`Error while retrieving App Check token: ${e.error}`),e?.token}}function so(n){return Qe(n)}class ql{constructor(e){this.auth=e,this.observer=null,this.addObserver=Gp(t=>this.observer=t)}get next(){return z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function _T(n){vc=n}function yT(n){return vc.loadJS(n)}function ET(){return vc.gapiScript}function wT(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TT(n,e){const t=ma(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(An(i,e??{}))return s;Ct(s,"already-initialized")}return t.initialize({options:e})}function IT(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(At);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function vT(n,e,t){const r=so(n);z(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Vd(e),{host:a,port:c}=AT(e),l=c===null?"":`:${c}`,f={url:`${i}//${a}${l}/`},p=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){z(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),z(An(f,r.config.emulator)&&An(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=f,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,Es(a)?ih(`${i}//${a}${l}`):bT()}function Vd(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function AT(n){const e=Vd(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:$l(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:$l(a)}}}function $l(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function bT(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return vt("not implemented")}_getIdTokenResponse(e){return vt("not implemented")}_linkToIdToken(e,t){return vt("not implemented")}_getReauthenticationResolver(e){return vt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yn(n,e){return pd(n,"POST","/v1/accounts:signInWithIdp",ro(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RT="http://localhost";class Sn extends Sd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Sn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ct("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new Sn(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Yn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Yn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Yn(e,t)}buildRequest(){const e={requestUri:RT,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ys(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns extends Cd{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt extends Ns{constructor(){super("facebook.com")}static credential(e){return Sn._fromParams({providerId:qt.PROVIDER_ID,signInMethod:qt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qt.credentialFromTaggedObject(e)}static credentialFromError(e){return qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return qt.credential(e.oauthAccessToken)}catch{return null}}}qt.FACEBOOK_SIGN_IN_METHOD="facebook.com";qt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t extends Ns{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Sn._fromParams({providerId:$t.PROVIDER_ID,signInMethod:$t.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return $t.credentialFromTaggedObject(e)}static credentialFromError(e){return $t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return $t.credential(t,r)}catch{return null}}}$t.GOOGLE_SIGN_IN_METHOD="google.com";$t.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt extends Ns{constructor(){super("github.com")}static credential(e){return Sn._fromParams({providerId:jt.PROVIDER_ID,signInMethod:jt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return jt.credentialFromTaggedObject(e)}static credentialFromError(e){return jt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return jt.credential(e.oauthAccessToken)}catch{return null}}}jt.GITHUB_SIGN_IN_METHOD="github.com";jt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt extends Ns{constructor(){super("twitter.com")}static credential(e,t){return Sn._fromParams({providerId:zt.PROVIDER_ID,signInMethod:zt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return zt.credentialFromTaggedObject(e)}static credentialFromError(e){return zt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return zt.credential(t,r)}catch{return null}}}zt.TWITTER_SIGN_IN_METHOD="twitter.com";zt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PT(n,e){return pd(n,"POST","/v1/accounts:signUp",ro(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await rt._fromIdTokenResponse(e,r,s),a=jl(r);return new cn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=jl(r);return new cn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function jl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iI(n){if(tt(n.app))return Promise.reject(Yt(n));const e=so(n);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new cn({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await PT(e,{returnSecureToken:!0}),r=await cn._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(r.user),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi extends Nt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Oi.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Oi(e,t,r,s)}}function xd(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Oi._fromErrorAndOperation(n,i,e,r):i})}async function VT(n,e,t=!1){const r=await gs(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return cn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ST(n,e,t=!1){const{auth:r}=n;if(tt(r.app))return Promise.reject(Yt(r));const s="reauthenticate";try{const i=await gs(n,xd(r,s,e,n),t);z(i.idToken,r,"internal-error");const a=Tc(i.idToken);z(a,r,"internal-error");const{sub:c}=a;return z(n.uid===c,r,"user-mismatch"),cn._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&Ct(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function CT(n,e,t=!1){if(tt(n.app))return Promise.reject(Yt(n));const r="signIn",s=await xd(n,r,e),i=await cn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function xT(n,e,t,r){return Qe(n).onIdTokenChanged(e,t,r)}function NT(n,e,t){return Qe(n).beforeAuthStateChanged(e,t)}const Li="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nd{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Li,"1"),this.storage.removeItem(Li),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kT=1e3,DT=10;class kd extends Nd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Rd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);hT()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,DT):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},kT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}kd.type="LOCAL";const OT=kd;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd extends Nd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Dd.type="SESSION";const Od=Dd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LT(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class io{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new io(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async f=>f(t.origin,i)),l=await LT(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}io.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ac(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MT{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,l)=>{const f=Ac("",20);s.port1.start();const p=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(m){const R=m;if(R.data.eventId===f)switch(R.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(R.data.response);break;default:clearTimeout(p),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:f,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gt(){return window}function UT(n){gt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ld(){return typeof gt().WorkerGlobalScope<"u"&&typeof gt().importScripts=="function"}async function FT(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function BT(){return navigator?.serviceWorker?.controller||null}function qT(){return Ld()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Md="firebaseLocalStorageDb",$T=1,Mi="firebaseLocalStorage",Ud="fbase_key";class ks{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function oo(n,e){return n.transaction([Mi],e?"readwrite":"readonly").objectStore(Mi)}function jT(){const n=indexedDB.deleteDatabase(Md);return new ks(n).toPromise()}function Fd(){const n=indexedDB.open(Md,$T);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Mi,{keyPath:Ud})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Mi)?e(r):(r.close(),await jT(),e(await Fd()))})})}async function zl(n,e,t){const r=oo(n,!0).put({[Ud]:e,value:t});return new ks(r).toPromise()}async function zT(n,e){const t=oo(n,!1).get(e),r=await new ks(t).toPromise();return r===void 0?null:r.value}function Gl(n,e){const t=oo(n,!0).delete(e);return new ks(t).toPromise()}const GT=800,HT=3;class Bd{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=Fd(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>HT)throw r;if(this.dbPromise){const s=this.dbPromise;this.dbPromise=null;try{(await s).close()}catch{}}}}async initializeServiceWorkerMessaging(){return Ld()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=io._getInstance(qT()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await FT(),!this.activeServiceWorker)return;this.sender=new MT(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||BT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await zl(e,Li,"1"),await Gl(e,Li)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>zl(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>zT(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Gl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{const e=await this._withRetries(s=>{const i=oo(s,!1).getAll();return new ks(i).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}catch(e){return this.isClosing||ui(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),GT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}}Bd.type="LOCAL";const WT=Bd;new xs(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KT(n,e){return e?At(e):(z(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bc extends Sd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Yn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Yn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Yn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function QT(n){return CT(n.auth,new bc(n),n.bypassAuthState)}function JT(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),ST(t,new bc(n),n.bypassAuthState)}async function YT(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),VT(t,new bc(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qd{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return QT;case"linkViaPopup":case"linkViaRedirect":return YT;case"reauthViaPopup":case"reauthViaRedirect":return JT;default:Ct(this.auth,"internal-error")}}resolve(e){xt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){xt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XT=new xs(2e3,1e4);class Hn extends qd{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Hn.currentPopupAction&&Hn.currentPopupAction.cancel(),Hn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return z(e,this.auth,"internal-error"),e}async onExecution(){xt(this.filter.length===1,"Popup operations only handle one event");const e=Ac();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(mt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(mt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Hn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(mt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,XT.get())};e()}}Hn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZT="pendingRedirect",fi=new Map;class e0 extends qd{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=fi.get(this.auth._key());if(!e){try{const r=await t0(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}fi.set(this.auth._key(),e)}return this.bypassAuthState||fi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function t0(n,e){const t=s0(e),r=r0(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function n0(n,e){fi.set(n._key(),e)}function r0(n){return At(n._redirectPersistence)}function s0(n){return hi(ZT,n.config.apiKey,n.name)}async function i0(n,e,t=!1){if(tt(n.app))return Promise.reject(Yt(n));const r=so(n),s=KT(r,e),a=await new e0(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o0=10*60*1e3;class a0{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!c0(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!$d(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(mt(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=o0&&this.cachedEventUids.clear(),this.cachedEventUids.has(Hl(e))}saveEventToCache(e){this.cachedEventUids.add(Hl(e)),this.lastProcessedEventTime=Date.now()}}function Hl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function $d({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function c0(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return $d(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function u0(n,e={}){return mr(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l0=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,h0=/^https?/;async function f0(n){if(n.config.emulator)return;const{authorizedDomains:e}=await u0(n);for(const t of e)try{if(d0(t))return}catch{}Ct(n,"unauthorized-domain")}function d0(n){const e=ha(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!h0.test(t))return!1;if(l0.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p0=new xs(3e4,6e4);function Wl(){const n=gt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function m0(n){return new Promise((e,t)=>{function r(){Wl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Wl(),t(mt(n,"network-request-failed"))},timeout:p0.get()})}if(gt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(gt().gapi?.load)r();else{const s=wT("iframefcb");return gt()[s]=()=>{gapi.load?r():t(mt(n,"network-request-failed"))},yT(`${ET()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw di=null,e})}let di=null;function g0(n){return di=di||m0(n),di}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _0=new xs(5e3,15e3),y0="__/auth/iframe",E0="emulator/auth/iframe",w0={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},T0=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function I0(n){const e=n.config;z(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?wc(e,E0):`https://${n.config.authDomain}/${y0}`,r={apiKey:e.apiKey,appName:n.name,v:ar},s=T0.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${ys(r).slice(1)}`}async function v0(n){const e=await g0(n),t=gt().gapi;return z(t,n,"internal-error"),e.open({where:document.body,url:I0(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:w0,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=mt(n,"network-request-failed"),c=gt().setTimeout(()=>{i(a)},_0.get());function l(){gt().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A0={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},b0=500,R0=600,P0="_blank",V0="http://localhost";class Kl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function S0(n,e,t,r=b0,s=R0){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l={...A0,width:r.toString(),height:s.toString(),top:i,left:a},f=xe().toLowerCase();t&&(c=Td(f)?P0:t),Ed(f)&&(e=e||V0,l.scrollbars="yes");const p=Object.entries(l).reduce((R,[C,x])=>`${R}${C}=${x},`,"");if(lT(f)&&c!=="_self")return C0(e||"",c),new Kl(null);const m=window.open(e||"",c,p);z(m,n,"popup-blocked");try{m.focus()}catch{}return new Kl(m)}function C0(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x0="__/auth/handler",N0="emulator/auth/handler",k0=encodeURIComponent("fac");async function Ql(n,e,t,r,s,i){z(n.config.authDomain,n,"auth-domain-config-required"),z(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ar,eventId:s};if(e instanceof Cd){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",zp(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,m]of Object.entries({}))a[p]=m}if(e instanceof Ns){const p=e.getScopes().filter(m=>m!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const l=await n._getAppCheckToken(),f=l?`#${k0}=${encodeURIComponent(l)}`:"";return`${D0(n)}?${ys(c).slice(1)}${f}`}function D0({config:n}){return n.emulator?wc(n,N0):`https://${n.authDomain}/${x0}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $o="webStorageSupport";class O0{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Od,this._completeRedirectFn=i0,this._overrideRedirectResult=n0}async _openPopup(e,t,r,s){xt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Ql(e,t,r,ha(),s);return S0(e,i,Ac())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Ql(e,t,r,ha(),s);return UT(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(xt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await v0(e),r=new a0(e);return t.register("authEvent",s=>(z(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send($o,{type:$o},s=>{const i=s?.[0]?.[$o];i!==void 0&&t(!!i),Ct(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=f0(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Rd()||wd()||Ic()}}const L0=O0;var Jl="@firebase/auth",Yl="1.13.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M0{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U0(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function F0(n){Xn(new bn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;z(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Pd(n)},f=new gT(r,s,i,l);return IT(f,t),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Xn(new bn("auth-internal",e=>{const t=so(e.getProvider("auth").getImmediate());return(r=>new M0(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ht(Jl,Yl,U0(n)),Ht(Jl,Yl,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B0=5*60,q0=sh("authIdTokenMaxAge")||B0;let Xl=null;const $0=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>q0)return;const s=t?.token;Xl!==s&&(Xl=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function oI(n=oh()){const e=ma(n,"auth");if(e.isInitialized())return e.getImmediate();const t=TT(n,{popupRedirectResolver:L0,persistence:[WT,OT,Od]}),r=sh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=$0(i.toString());NT(t,a,()=>a(t.currentUser)),xT(t,c=>a(c))}}const s=nh("auth");return s&&vT(t,`http://${s}`),t}function j0(){return document.getElementsByTagName("head")?.[0]??document}_T({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=mt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",j0().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});F0("Browser");export{J0 as a,rI as b,K0 as c,Q0 as d,oh as e,Z0 as f,G0 as g,oI as h,Om as i,iI as j,tI as l,sI as o,eI as q,nI as s};
