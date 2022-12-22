class e{constructor(e){this.data=e}filter(t){return new e(this.data.filter(t))}forEach(e){this.data.forEach(e)}toggle(t){return this.data.includes(t)?new e(this.data.filter((e=>e!==t))):new e(this.data.concat(t))}}const t=[1,2,3,4,5,6,7,8,9];class n{static newGame(r,a){const s=r.map((n=>{const a=new Set(r.filter((e=>n!==e&&e.revealed&&e.realValue&&l(n,e))).map((e=>e.realValue))),s=t.filter((e=>!a.has(e)));return n.populatePlaceholders(new e(s))}));return new n(!1,s,!1,a,[])}constructor(e,t,n,l,r){this.won=e,this.cells=t,this.placeholderMode=n,this.difficulty=l,this.previousStates=r}toggleSelectedCell(e,t){const l=9*--e+--t;return new n(this.won,this.cells.map(((e,t)=>t===l?e.toggleSelected():e.deselect())),this.placeholderMode,this.difficulty,this.previousStates)}numberPressed(e){if(!this.selectedCell())return this;const t=function(e){const t=e.find((e=>e.selected));return t.playerValue?e.map((e=>l(t,e)?new r(e.index,e.realValue,e.revealed,e.playerValue,e.placeholders,e.selected,e.shownNumber()!==t.playerValue):e)):e}(function(e,t){if(e)return t;const n=t.find((e=>e.selected));return t.map((e=>l(n,e)?e.removePlaceholder(n.playerValue):e))}(this.placeholderMode,this.cells.map((t=>t.numberPressed(e,this.placeholderMode))))),a=!t.find((e=>!e.revealed&&!e.playerValue))&&!t.find((e=>!e.valid));return new n(a,t,this.placeholderMode,this.difficulty,this.previousStates.concat(this))}eraseSelected(){return new n(this.won,this.cells.map((e=>e.selected?e.erase():e)),this.placeholderMode,this.difficulty,this.previousStates.concat(this))}togglePlaceholderMode(){return new n(this.won,this.cells,!this.placeholderMode,this.difficulty,this.previousStates)}undo(){if(this.previousStates.length>0){return[...this.previousStates].pop()}return this}selectedCell(){return this.cells.find((e=>e.selected))||null}hasBeenPlayed(){return!!this.cells.find((e=>null!==e.playerValue))}}function l(e,t){return e.index!==t.index&&(e.rowIndex()===t.rowIndex()||e.columnIndex()===t.columnIndex()||function(e,t){const n=Math.ceil(e.rowIndex()/3),l=Math.ceil(e.columnIndex()/3),r=Math.ceil(t.rowIndex()/3),a=Math.ceil(t.columnIndex()/3);return n===r&&l===a}(e,t))}class r{constructor(e,t,n,l,r,a=!1,s=!0){this.index=e,this.realValue=t,this.revealed=n,this.playerValue=l,this.placeholders=r,this.selected=a,this.valid=s}toggleSelected(){return new r(this.index,this.realValue,this.revealed,this.playerValue,this.placeholders,!this.selected)}deselect(){return this.selected?this.toggleSelected():this}populatePlaceholders(e){return new r(this.index,this.realValue,this.revealed,null,e,this.selected)}numberPressed(t,n){return!this.selected||this.revealed?this:n?new r(this.index,this.realValue,this.revealed,null,(this.placeholders||new e([])).toggle(t),this.selected):new r(this.index,this.realValue,this.revealed,this.playerValue===t?null:t,null,this.selected)}removePlaceholder(e){return new r(this.index,this.realValue,this.revealed,this.playerValue,this.placeholders?this.placeholders.filter((t=>t!==e)):null,this.selected)}erase(){return new r(this.index,this.realValue,this.revealed,null,new e([]),this.selected)}shownNumber(){return this.playerValue?this.playerValue:this.revealed?this.realValue:null}rowIndex(){return Math.floor(this.index/9)+1}columnIndex(){return Math.floor(this.index%9)+1}}let a=-1;class s{static start(){let e=0;window.clearInterval(a),a=window.setInterval((()=>{document.hidden||(e+=1,document.getElementById("timer").innerHTML=function(e){const t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${String(n).padStart(2,"0")}`}(e))}),1e3)}}var i={};function o(e,t){void 0===t&&(t=null);var n=d(e);if(null===n.answer)return-1;if(null!=t&&!function(e,t){for(var n=0;n<81;n++)if(e[n]!=t[n])return!1;return!0}(t,n.answer))return-1;var l=n.state.length;return null!=u(n.state).answer?-1:l}function c(e){return d(e).answer}function d(e){var t=[].concat(e),n=h(t);return null===n?{state:[],answer:t}:u([{guesses:n,count:0,board:t}])}function u(e){for(;e.length>0;){var t=e.pop();if(!(t.count>=t.guesses.length)){e.push({guesses:t.guesses,count:t.count+1,board:t.board});var n=[].concat(t.board),l=t.guesses[t.count];n[l.pos]=l.num;var r=h(n);if(null===r)return{state:e,answer:n};e.push({guesses:r,count:0,board:n})}}return{state:[],answer:null}}function h(e){for(;;){for(var t=!0,n=null,l=0,r=p(e),a=r.allowed,s=r.needed,i=0;i<81;i++)if(null===e[i]){if(0===(h=v(a[i])).length)return[];if(1===h.length)e[i]=h[0],t=!1;else if(t){var o=g(n,l,h.map((function(e,t){return{pos:i,num:e}})));n=o.guess,l=o.count}}if(!t){var c=p(e);a=c.allowed,s=c.needed}for(var d=0;d<3;d++)for(var u=0;u<9;u++)for(var h=v(s[9*d+u]),m=0;m<h.length;m++){for(var w=h[m],M=1<<w,x=[],z=0;z<9;z++){a[i=f(u,z,d)]&M&&x.push(i)}if(0===x.length)return[];if(1===x.length)e[x[0]]=w,t=!1;else if(t){var L=g(n,l,x.map((function(e,t){return{pos:e,num:w}})));n=L.guess,l=L.count}}if(t)return null!=n&&y(n),n}}function p(e){for(var t=[],n=e.map((function(e,t){return null===e?511:0}),[]),l=0;l<3;l++)for(var r=0;r<9;r++){var a=m(e,r,l);t.push(a);for(var s=0;s<9;s++){var i=f(r,s,l);n[i]=n[i]&a}}return{allowed:n,needed:t}}function f(e,t,n){return void 0===n&&(n=0),0===n?9*e+t:1===n?9*t+e:[0,3,6,27,30,33,54,57,60][e]+[0,1,2,9,10,11,18,19,20][t]}function m(e,t,n){for(var l=0,r=0;r<9;r++){var a=e[f(t,r,n)];null!=a&&(l|=1<<a)}return 511^l}function v(e){for(var t=[],n=0;n<9;n++)0!=(e&1<<n)&&t.push(n);return t}function g(e,t,n){return null===e||n.length<e.length?{guess:n,count:1}:n.length>e.length?{guess:e,count:t}:0===(l=t,Math.floor(Math.random()*(l+1)))?{guess:n,count:t+1}:{guess:e,count:t+1};var l}function w(e){for(var t=Array(81).fill(null),n=0;n<e.length;n++){var l=e[n],r=l.pos,a=l.num;t[r]=a}return t}function y(e){for(var t=0;t<e.length;t++){for(var n=t;n===t;)n=Math.floor(Math.random()*e.length);var l=e[t];e[t]=e[n],e[n]=l}}function M(e,t,n){var l=e.slice((n||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,l)}function x(e){const t=document.getElementById("root");t.innerHTML="",t.appendChild(function(e){const t=document.createElement("div");t.className="header";const n=document.createElement("div");n.className="difficulty",n.innerHTML=`Difficulty: ${e.difficulty}`,t.appendChild(n);const l=document.createElement("div");return l.id="timer",t.appendChild(l),t}(e)),t.appendChild(L(e)),t.appendChild(S(e)),t.appendChild(function(){const e=document.createElement("div");return e.className="numpad",[1,2,3,4,5,6,7,8,9].forEach((t=>{const n=document.createElement("div");n.innerHTML=String(t),n.onclick=()=>C(t),e.appendChild(n)})),e}()),s.start();const n=()=>t.style.setProperty("--cell-size",Math.min(document.body.clientWidth/9-3,60)+"px");window.addEventListener("resize",n),n()}function z(e){const t=document.getElementById("root");t.replaceChild(L(e),t.querySelector(".board")),t.replaceChild(S(e),t.querySelector(".controls"))}function L(e){const t=document.createElement("table");t.className="board",e.won&&t.classList.add("win");const n=e.selectedCell();n&&n.shownNumber()&&t.classList.add("selected-"+n.shownNumber());return e.cells.reduce(((e,t,l)=>{const r=Math.floor(l/9)+1,a=Math.floor(l%9)+1,s=document.createElement("td");if(s.className="cell",s.dataset.row=String(r),s.dataset.col=String(a),t.shownNumber()&&s.classList.add("number-"+t.shownNumber()),!n||r!==n.rowIndex()&&a!==n.columnIndex()||s.classList.add("highlighted"),!1===t.valid&&s.classList.add("invalid"),t.selected&&s.classList.add("selected"),t.revealed)s.classList.add("revealed"),s.innerHTML=String(t.realValue);else if(t.placeholders){const e=document.createElement("div");e.classList.add("placeholders"),t.placeholders.forEach((t=>{const n=document.createElement("div");n.style.gridArea="a"+String(t),n.innerHTML=String(t),n.classList.add("number-"+t),e.appendChild(n)})),s.appendChild(e)}else t.playerValue&&(s.classList.add("player-value"),s.innerHTML=String(t.playerValue));e[e.length-1].appendChild(s);return 9===a?e.concat(document.createElement("tr")):e}),[document.createElement("tr")]).forEach((e=>t.appendChild(e))),t}function S(e){const t=document.createElement("div");t.className="controls";const n=V(H,'<svg viewBox="0 0 24 24">\n      <path d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698\n        0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518\n        2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4\n        5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059\n        5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443\n        3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z"/>\n    </svg>');n.classList.add("refresh"),t.appendChild(n),t.appendChild(V(P,'<svg viewBox="0 0 30 31">\n      <path d="M13.71 2.46a1 1 0 01.14 1.32l-.08.1-2.15 2.32 3.41.02a10 10 0\n        11-10 10 1 1 0 112 0 8 8 0 108.25-8h-.25l-3.48-.02 2.28 2.53a1 1 0 01.01\n        1.32l-.09.1a1 1 0 01-1.32 0l-.09-.08-3.76-4.18a1 1 0 01-.07-1.25l.08-.1\n        3.7-4.02a1 1 0 011.42-.06z"></path>\n    </svg>'));const l=V(k,'<svg viewBox="0 0 30 31">\n      <path d="M25.43 4.76a5.42 5.42 0 01.19 7.52l-.18.2-13.5\n        13.48a.91.91 0 01-1.21.08l-.1-.08-5.07-5.08-.59 4.34 3.25-.44c.44-.05.84.2\n        1 .58l.03.11.02.11c.06.47-.24.91-.7 1.03l-.1.02-4.45.6a.94.94 0\n        01-.79-.27.92.92 0 01-.26-.65v-.13l1-7.4a.92.92 0 01.19-.44l.08-.09L17.71\n        4.76a5.45 5.45 0 017.72 0zm.35 20.08a1 1 0 110 2h-8.7a1 1 0\n        010-2h8.7zM21.4 10.18L9.43 22.13 11.3\n        24l11.95-11.95-1.86-1.86zm-3.23-3.23L6.2 18.91l1.92 1.91L20.07\n        8.86l-1.9-1.9zm3.42-1.93c-.69 0-1.35.2-1.92.56l-.15.1 5.01 5\n        .1-.14c.33-.5.51-1.09.55-1.7l.01-.22a3.58 3.58 0 00-3.6-3.6z"></path>\n  </svg>');return l.classList.add(e.placeholderMode?"active":"a"),t.appendChild(l),t.appendChild(V(N,'<svg viewBox="0 0 30 31">\n      <path fill-rule="evenodd" d="M27.13 25.11a1 1 0 01.12\n        2h-6.9a1 1 0 01-.11-2H27.13zM21.48 4.08l.17.14.16.15 3.76 3.76a4 4 0\n        01.15 5.5l-.15.16-11.32 11.32h2.04a1 1 0 011 .89v.11a1 1 0 01-.88 1H6.52a3\n        3 0 01-1.98-.74l-.14-.14-2.23-2.22a4 4 0 01-.15-5.5l.15-.16L16.15 4.37a4 4\n        0 015.33-.29zm-11.52 9.3l-6.38 6.38a2 2 0 00-.11 2.7l.11.13 2.23 2.23a1 1\n        0 00.58.28l.13.01h4.9l5.13-5.13-6.59-6.6zm7.87-7.82l-.14.1-.13.13-6.18\n        6.18 6.59 6.6 6.19-6.2a2 2 0 00.11-2.7l-.11-.12-3.77-3.76a2 2 0\n        00-2.56-.22z"></path>\n  </svg>')),t}function V(e,t){const n=document.createElement("div");return n.className="button",n.innerHTML=t,n.onclick=e,n}function E(){const e=i.makepuzzle(),t=i.ratepuzzle(e,4),l=i.solvepuzzle(e).map((e=>e+1)).map(((t,n)=>new r(n,t,null!==e[n],null,null)));return n.newGame(l,t)}i={makepuzzle:function(){return function(e){var t=[],n=Array(81).fill(null),l=[...Array(81).keys()];y(l);for(var r=0;r<l.length;r++){var a=l[r];null===n[a]&&(t.push({pos:a,num:e[a]}),n[a]=e[a],h(n))}for(y(t),r=t.length-1;r>=0;r--){var s=t[r];M(t,r),-1===o(w(t),e)&&t.push(s)}return w(t)}(c(Array(81).fill(null)))},solvepuzzle:c,ratepuzzle:function(e,t){for(var n=0,l=0;l<t;l++){var r=d(e);if(null===r.answer)return-1;n+=r.state.length}return n/t},posfor:f};let b=E();document.onclick=e=>{const t=(e,n)=>e.classList.contains("cell")&&"TD"===e.tagName?e:e.parentElement?t(e.parentElement,n):null,n=t(e.target,"cell");if(n){const{row:e,col:t}=n.dataset;I(parseInt(e),parseInt(t))}},document.onkeyup=e=>{if(e.key.match(/[1-9]/))C(parseInt(e.key));else if(e.key.match(/^(1|2|3|q|w|e|a|s|d)$/)&&!e.ctrlKey){const t={1:1,2:2,3:3,q:4,w:5,e:6,a:7,s:8,d:9},n=t[e.key];t&&C(n)}else"z"===e.key?P():"x"===e.key?k():"c"===e.key&&N()};const C=e=>{b=b.numberPressed(e),z(b)},I=(e,t)=>{b=b.toggleSelectedCell(e,t),z(b)},k=()=>{b=b.togglePlaceholderMode(),z(b)},N=()=>{b=b.eraseSelected(),z(b)},P=()=>{b=b.undo(),z(b)},H=()=>{(b.won||!b.hasBeenPlayed()||confirm("Are you sure?"))&&(b=E(),x(b),z(b))};x(b);
//# sourceMappingURL=index.dd81c038.js.map
