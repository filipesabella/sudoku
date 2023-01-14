class e{constructor(e){this.data=e}filter(t){return new e(this.data.filter(t))}forEach(e){this.data.forEach(e)}toggle(t){return this.data.includes(t)?new e(this.data.filter((e=>e!==t))):new e(this.data.concat(t))}}const t=[1,2,3,4,5,6,7,8,9];class l{static newGame(r,s){const a=r.map((l=>{const s=new Set(r.filter((e=>l!==e&&e.revealed&&e.realValue&&n(l,e))).map((e=>e.realValue))),a=t.filter((e=>!s.has(e)));return l.populatePlaceholders(new e(a))}));return new l(!1,a,!1,s,[],!1,null)}constructor(e,t,l,n,r,s,a){this.won=e,this.cells=t,this.placeholderMode=l,this.difficulty=n,this.previousStates=r,this.messedUp=s,this.previouslyPressedNumber=a}toggleSelectedCell(e,t){const n=9*--e+--t;return new l(this.won,this.cells.map(((e,t)=>t===n?e.toggleSelected():e.deselect())),this.placeholderMode,this.difficulty,this.previousStates,this.messedUp,null)}numberPressed(e,t){if(!this.selectedCell())return this;const s=function(e){const t=e.find((e=>e.selected));return t.playerValue?e.map((e=>n(t,e)?new r(e.index,e.realValue,e.revealed,e.playerValue,e.placeholders,e.selected,e.shownNumber()!==t.playerValue):e)):e}(function(e,t){if(e)return t;const l=t.find((e=>e.selected));return t.map((e=>n(l,e)?e.removePlaceholder(l.playerValue):e))}(this.placeholderMode,this.cells.map((l=>l.numberPressed(e,t||this.placeholderMode))))),a=!s.find((e=>!e.revealed&&!e.playerValue))&&!s.find((e=>!e.valid));this.messedUp&&alert("Messed up");const i=!!s.filter((e=>!e.selected)).find((e=>e.isWrong()));return new l(a,s,this.placeholderMode,this.difficulty,this.previousStates.concat(this),i,e)}eraseSelected(){return new l(this.won,this.cells.map((e=>e.selected?e.erase():e)),this.placeholderMode,this.difficulty,this.previousStates.concat(this),this.messedUp,this.previouslyPressedNumber)}togglePlaceholderMode(){return new l(this.won,this.cells,!this.placeholderMode,this.difficulty,this.previousStates,this.messedUp,this.previouslyPressedNumber)}undo(){if(this.previousStates.length>0){return[...this.previousStates].pop()}return this}selectedCell(){return this.cells.find((e=>e.selected))||null}hasBeenPlayed(){return!!this.cells.find((e=>null!==e.playerValue))}}function n(e,t){return e.index!==t.index&&(e.rowIndex()===t.rowIndex()||e.columnIndex()===t.columnIndex()||function(e,t){const l=Math.ceil(e.rowIndex()/3),n=Math.ceil(e.columnIndex()/3),r=Math.ceil(t.rowIndex()/3),s=Math.ceil(t.columnIndex()/3);return l===r&&n===s}(e,t))}class r{constructor(e,t,l,n,r,s=!1,a=!0){this.index=e,this.realValue=t,this.revealed=l,this.playerValue=n,this.placeholders=r,this.selected=s,this.valid=a}toggleSelected(){return new r(this.index,this.realValue,this.revealed,this.playerValue,this.placeholders,!this.selected)}deselect(){return this.selected?this.toggleSelected():this}populatePlaceholders(e){return new r(this.index,this.realValue,this.revealed,null,e,this.selected)}numberPressed(t,l){return!this.selected||this.revealed?this:l?new r(this.index,this.realValue,this.revealed,null,(this.placeholders||new e([])).toggle(t),this.selected):new r(this.index,this.realValue,this.revealed,this.playerValue===t?null:t,null,this.selected)}removePlaceholder(e){return new r(this.index,this.realValue,this.revealed,this.playerValue,this.placeholders?this.placeholders.filter((t=>t!==e)):null,this.selected)}erase(){return new r(this.index,this.realValue,this.revealed,null,new e([]),this.selected)}shownNumber(){return this.playerValue?this.playerValue:this.revealed?this.realValue:null}rowIndex(){return Math.floor(this.index/9)+1}columnIndex(){return Math.floor(this.index%9)+1}isWrong(){return!!this.playerValue&&this.realValue!==this.playerValue}}let s=-1;class a{static start(){let e=0;window.clearInterval(s),s=window.setInterval((()=>{document.hidden||(e+=1,document.getElementById("timer").innerHTML=function(e){const t=Math.floor(e/60),l=Math.floor(e%60);return`${t}:${String(l).padStart(2,"0")}`}(e))}),1e3)}}var i={};function o(e,t){void 0===t&&(t=null);var l=u(e);if(null===l.answer)return-1;if(null!=t&&!function(e,t){for(var l=0;l<81;l++)if(e[l]!=t[l])return!1;return!0}(t,l.answer))return-1;var n=l.state.length;return null!=c(l.state).answer?-1:n}function d(e){return u(e).answer}function u(e){var t=[].concat(e),l=h(t);return null===l?{state:[],answer:t}:c([{guesses:l,count:0,board:t}])}function c(e){for(;e.length>0;){var t=e.pop();if(!(t.count>=t.guesses.length)){e.push({guesses:t.guesses,count:t.count+1,board:t.board});var l=[].concat(t.board),n=t.guesses[t.count];l[n.pos]=n.num;var r=h(l);if(null===r)return{state:e,answer:l};e.push({guesses:r,count:0,board:l})}}return{state:[],answer:null}}function h(e){for(;;){for(var t=!0,l=null,n=0,r=p(e),s=r.allowed,a=r.needed,i=0;i<81;i++)if(null===e[i]){if(0===(h=v(s[i])).length)return[];if(1===h.length)e[i]=h[0],t=!1;else if(t){var o=g(l,n,h.map((function(e,t){return{pos:i,num:e}})));l=o.guess,n=o.count}}if(!t){var d=p(e);s=d.allowed,a=d.needed}for(var u=0;u<3;u++)for(var c=0;c<9;c++)for(var h=v(a[9*u+c]),m=0;m<h.length;m++){for(var w=h[m],M=1<<w,x=[],V=0;V<9;V++){s[i=f(c,V,u)]&M&&x.push(i)}if(0===x.length)return[];if(1===x.length)e[x[0]]=w,t=!1;else if(t){var b=g(l,n,x.map((function(e,t){return{pos:e,num:w}})));l=b.guess,n=b.count}}if(t)return null!=l&&y(l),l}}function p(e){for(var t=[],l=e.map((function(e,t){return null===e?511:0}),[]),n=0;n<3;n++)for(var r=0;r<9;r++){var s=m(e,r,n);t.push(s);for(var a=0;a<9;a++){var i=f(r,a,n);l[i]=l[i]&s}}return{allowed:l,needed:t}}function f(e,t,l){return void 0===l&&(l=0),0===l?9*e+t:1===l?9*t+e:[0,3,6,27,30,33,54,57,60][e]+[0,1,2,9,10,11,18,19,20][t]}function m(e,t,l){for(var n=0,r=0;r<9;r++){var s=e[f(t,r,l)];null!=s&&(n|=1<<s)}return 511^n}function v(e){for(var t=[],l=0;l<9;l++)0!=(e&1<<l)&&t.push(l);return t}function g(e,t,l){return null===e||l.length<e.length?{guess:l,count:1}:l.length>e.length?{guess:e,count:t}:0===(n=t,Math.floor(Math.random()*(n+1)))?{guess:l,count:t+1}:{guess:e,count:t+1};var n}function w(e){for(var t=Array(81).fill(null),l=0;l<e.length;l++){var n=e[l],r=n.pos,s=n.num;t[r]=s}return t}function y(e){for(var t=0;t<e.length;t++){for(var l=t;l===t;)l=Math.floor(Math.random()*e.length);var n=e[t];e[t]=e[l],e[l]=n}}function M(e,t,l){var n=e.slice((l||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,n)}function x(e){const t=document.getElementById("root");t.innerHTML="",t.appendChild(function(e){const t=document.createElement("div");t.className="header";const l=document.createElement("div");l.className="difficulty",l.innerHTML=`Difficulty: ${e.difficulty}`,t.appendChild(l);const n=document.createElement("div");return n.id="timer",t.appendChild(n),t}(e)),t.appendChild(b(e)),t.appendChild(L(e)),t.appendChild(function(){const e=document.createElement("div");return e.className="numpad",[1,2,3,4,5,6,7,8,9].forEach((t=>{const l=document.createElement("div");l.innerHTML=String(t),l.onclick=()=>I(t,!1),e.appendChild(l)})),e}()),a.start();const l=()=>t.style.setProperty("--cell-size",Math.min(document.body.clientWidth/9-3,60)+"px");window.addEventListener("resize",l),l()}function V(e){const t=document.getElementById("root");t.replaceChild(b(e),t.querySelector(".board")),t.replaceChild(L(e),t.querySelector(".controls"))}function b(e){const t=document.createElement("table");t.className="board",e.won&&t.classList.add("win"),e.messedUp&&alert("Messed up");const l=e.selectedCell();l&&(l.shownNumber()?t.classList.add("selected-"+l.shownNumber()):!l.shownNumber()&&e.previouslyPressedNumber&&t.classList.add("selected-"+e.previouslyPressedNumber));return e.cells.reduce(((e,t,n)=>{const r=Math.floor(n/9)+1,s=Math.floor(n%9)+1,a=document.createElement("td");if(a.className="cell",a.dataset.row=String(r),a.dataset.col=String(s),t.shownNumber()&&a.classList.add("number-"+t.shownNumber()),!l||r!==l.rowIndex()&&s!==l.columnIndex()||a.classList.add("highlighted"),!1===t.valid&&a.classList.add("invalid"),t.selected&&a.classList.add("selected"),t.revealed)a.classList.add("revealed"),a.innerHTML=String(t.realValue);else if(t.placeholders){const e=document.createElement("div");e.classList.add("placeholders"),t.placeholders.forEach((t=>{const l=document.createElement("div");l.style.gridArea="a"+String(t),l.innerHTML=String(t),l.classList.add("number-"+t),e.appendChild(l)})),a.appendChild(e)}else t.playerValue&&(a.classList.add("player-value"),a.innerHTML=String(t.playerValue));e[e.length-1].appendChild(a);return 9===s?e.concat(document.createElement("tr")):e}),[document.createElement("tr")]).forEach((e=>t.appendChild(e))),t}function L(e){const t=document.createElement("div");t.className="controls";const l=z(B,'<svg viewBox="0 0 24 24">\n      <path d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698\n        0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518\n        2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4\n        5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059\n        5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443\n        3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z"/>\n    </svg>');l.classList.add("refresh"),t.appendChild(l),t.appendChild(z(H,'<svg viewBox="0 0 30 31">\n      <path d="M13.71 2.46a1 1 0 01.14 1.32l-.08.1-2.15 2.32 3.41.02a10 10 0\n        11-10 10 1 1 0 112 0 8 8 0 108.25-8h-.25l-3.48-.02 2.28 2.53a1 1 0 01.01\n        1.32l-.09.1a1 1 0 01-1.32 0l-.09-.08-3.76-4.18a1 1 0 01-.07-1.25l.08-.1\n        3.7-4.02a1 1 0 011.42-.06z"></path>\n    </svg>'));const n=z(P,'<svg viewBox="0 0 30 31">\n      <path d="M25.43 4.76a5.42 5.42 0 01.19 7.52l-.18.2-13.5\n        13.48a.91.91 0 01-1.21.08l-.1-.08-5.07-5.08-.59 4.34 3.25-.44c.44-.05.84.2\n        1 .58l.03.11.02.11c.06.47-.24.91-.7 1.03l-.1.02-4.45.6a.94.94 0\n        01-.79-.27.92.92 0 01-.26-.65v-.13l1-7.4a.92.92 0 01.19-.44l.08-.09L17.71\n        4.76a5.45 5.45 0 017.72 0zm.35 20.08a1 1 0 110 2h-8.7a1 1 0\n        010-2h8.7zM21.4 10.18L9.43 22.13 11.3\n        24l11.95-11.95-1.86-1.86zm-3.23-3.23L6.2 18.91l1.92 1.91L20.07\n        8.86l-1.9-1.9zm3.42-1.93c-.69 0-1.35.2-1.92.56l-.15.1 5.01 5\n        .1-.14c.33-.5.51-1.09.55-1.7l.01-.22a3.58 3.58 0 00-3.6-3.6z"></path>\n  </svg>');return n.classList.add(e.placeholderMode?"active":"a"),t.appendChild(n),t.appendChild(z(k,'<svg viewBox="0 0 30 31">\n      <path fill-rule="evenodd" d="M27.13 25.11a1 1 0 01.12\n        2h-6.9a1 1 0 01-.11-2H27.13zM21.48 4.08l.17.14.16.15 3.76 3.76a4 4 0\n        01.15 5.5l-.15.16-11.32 11.32h2.04a1 1 0 011 .89v.11a1 1 0 01-.88 1H6.52a3\n        3 0 01-1.98-.74l-.14-.14-2.23-2.22a4 4 0 01-.15-5.5l.15-.16L16.15 4.37a4 4\n        0 015.33-.29zm-11.52 9.3l-6.38 6.38a2 2 0 00-.11 2.7l.11.13 2.23 2.23a1 1\n        0 00.58.28l.13.01h4.9l5.13-5.13-6.59-6.6zm7.87-7.82l-.14.1-.13.13-6.18\n        6.18 6.59 6.6 6.19-6.2a2 2 0 00.11-2.7l-.11-.12-3.77-3.76a2 2 0\n        00-2.56-.22z"></path>\n  </svg>')),t}function z(e,t){const l=document.createElement("div");return l.className="button",l.innerHTML=t,l.onclick=e,l}function S(){const e=i.makepuzzle(),t=i.ratepuzzle(e,4),n=i.solvepuzzle(e).map((e=>e+1)).map(((t,l)=>new r(l,t,null!==e[l],null,null)));return l.newGame(n,t)}i={makepuzzle:function(){return function(e){var t=[],l=Array(81).fill(null),n=[...Array(81).keys()];y(n);for(var r=0;r<n.length;r++){var s=n[r];null===l[s]&&(t.push({pos:s,num:e[s]}),l[s]=e[s],h(l))}for(y(t),r=t.length-1;r>=0;r--){var a=t[r];M(t,r),-1===o(w(t),e)&&t.push(a)}return w(t)}(d(Array(81).fill(null)))},solvepuzzle:d,ratepuzzle:function(e,t){for(var l=0,n=0;n<t;n++){var r=u(e);if(null===r.answer)return-1;l+=r.state.length}return l/t},posfor:f};let E=S();document.onclick=e=>{const t=(e,l)=>e.classList.contains("cell")&&"TD"===e.tagName?e:e.parentElement?t(e.parentElement,l):null,l=t(e.target,"cell");if(l){const{row:e,col:t}=l.dataset;N(parseInt(e),parseInt(t))}else"root"===e.target.id&&P()};let C=!1;document.onkeydown=e=>{"x"===e.key&&(C=!0)},document.onkeyup=e=>{if(e.key.match(/[1-9]/))I(parseInt(e.key),C);else if(e.key.match(/^(1|2|3|q|w|e|a|s|d)$/)&&!e.ctrlKey){const t={1:1,2:2,3:3,q:4,w:5,e:6,a:7,s:8,d:9},l=t[e.key];t&&I(l,C)}else"z"===e.key?H():"x"===e.key?C=!1:"c"===e.key?k():"v"===e.key&&console.log(E.cells.map((e=>e.revealed?e.realValue:e.playerValue||0)).join(""))};const I=(e,t)=>{E=E.numberPressed(e,t),V(E)},N=(e,t)=>{E=E.toggleSelectedCell(e,t),V(E)},P=()=>{E=E.togglePlaceholderMode(),V(E)},k=()=>{E=E.eraseSelected(),V(E)},H=()=>{E=E.undo(),V(E)},B=()=>{(E.won||!E.hasBeenPlayed()||confirm("Are you sure?"))&&(E=S(),x(E),V(E))};x(E);
//# sourceMappingURL=index.2b16bbd6.js.map
