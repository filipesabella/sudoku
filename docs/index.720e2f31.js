class e{constructor(e){this.data=e}filter(t){return new e(this.data.filter(t))}forEach(e){this.data.forEach(e)}toggle(t){return this.data.includes(t)?new e(this.data.filter((e=>e!==t))):new e(this.data.concat(t))}}class t{constructor(e,t,n,l){this.cells=e,this.placeholderMode=t,this.difficulty=n,this.previousStates=l}toggleSelectedCell(e,n){const l=9*--e+--n;return new t(this.cells.map(((e,t)=>t===l?e.toggleSelected():e.deselect())),this.placeholderMode,this.difficulty,this.previousStates)}numberPressed(e){if(!this.selectedCell())return this;const r=function(e){const t=e.find((e=>e.selected));return t.playerValue?e.map((e=>n(t,e)?new l(e.index,e.realValue,e.revealed,e.playerValue,e.placeholders,e.selected,e.shownNumber()!==t.playerValue):e)):e}(function(e,t){if(e)return t;const l=t.find((e=>e.selected));return t.map((e=>n(l,e)?e.removePlaceholder(l.playerValue):e))}(this.placeholderMode,this.cells.map((t=>t.numberPressed(e,this.placeholderMode)))));if(!r.find((e=>!e.revealed&&!e.playerValue))){!r.find((e=>!e.valid))?alert("win"):alert("no")}return new t(r,this.placeholderMode,this.difficulty,this.previousStates.concat(this))}eraseSelected(){return new t(this.cells.map((e=>e.selected?e.erase():e)),this.placeholderMode,this.difficulty,this.previousStates.concat(this))}togglePlaceholderMode(){return new t(this.cells,!this.placeholderMode,this.difficulty,this.previousStates)}undo(){if(this.previousStates.length>0){return[...this.previousStates].pop()}return this}selectedCell(){return this.cells.find((e=>e.selected))||null}}function n(e,t){return e.index!==t.index&&(e.rowIndex()===t.rowIndex()||e.columnIndex()===t.columnIndex()||function(e,t){const n=Math.ceil(e.rowIndex()/3),l=Math.ceil(e.columnIndex()/3),r=Math.ceil(t.rowIndex()/3),a=Math.ceil(t.columnIndex()/3);return n===r&&l===a}(e,t))}class l{constructor(e,t,n,l,r,a=!1,s=!0){this.index=e,this.realValue=t,this.revealed=n,this.playerValue=l,this.placeholders=r,this.selected=a,this.valid=s}toggleSelected(){return new l(this.index,this.realValue,this.revealed,this.playerValue,this.placeholders,!this.selected)}deselect(){return this.selected?this.toggleSelected():this}numberPressed(t,n){return!this.selected||this.revealed?this:n?new l(this.index,this.realValue,this.revealed,null,(this.placeholders||new e([])).toggle(t),this.selected):new l(this.index,this.realValue,this.revealed,this.playerValue===t?null:t,null,this.selected)}removePlaceholder(e){return new l(this.index,this.realValue,this.revealed,this.playerValue,this.placeholders?this.placeholders.filter((t=>t!==e)):null,this.selected)}erase(){return new l(this.index,this.realValue,this.revealed,null,new e([]),this.selected)}shownNumber(){return this.playerValue?this.playerValue:this.revealed?this.realValue:null}rowIndex(){return Math.floor(this.index/9)+1}columnIndex(){return Math.floor(this.index%9)+1}}class r{static start(){let e=0;window.setInterval((()=>{document.hidden||(e+=1,document.getElementById("timer").innerHTML=function(e){const t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${String(n).padStart(2,"0")}`}(e))}),1e3)}}var a={};function s(e,t){void 0===t&&(t=null);var n=o(e);if(null===n.answer)return-1;if(null!=t&&!function(e,t){for(var n=0;n<81;n++)if(e[n]!=t[n])return!1;return!0}(t,n.answer))return-1;var l=n.state.length;return null!=c(n.state).answer?-1:l}function i(e){return o(e).answer}function o(e){var t=[].concat(e),n=u(t);return null===n?{state:[],answer:t}:c([{guesses:n,count:0,board:t}])}function c(e){for(;e.length>0;){var t=e.pop();if(!(t.count>=t.guesses.length)){e.push({guesses:t.guesses,count:t.count+1,board:t.board});var n=[].concat(t.board),l=t.guesses[t.count];n[l.pos]=l.num;var r=u(n);if(null===r)return{state:e,answer:n};e.push({guesses:r,count:0,board:n})}}return{state:[],answer:null}}function u(e){for(;;){for(var t=!0,n=null,l=0,r=d(e),a=r.allowed,s=r.needed,i=0;i<81;i++)if(null===e[i]){if(0===(v=f(a[i])).length)return[];if(1===v.length)e[i]=v[0],t=!1;else if(t){var o=m(n,l,v.map((function(e,t){return{pos:i,num:e}})));n=o.guess,l=o.count}}if(!t){var c=d(e);a=c.allowed,s=c.needed}for(var u=0;u<3;u++)for(var p=0;p<9;p++)for(var v=f(s[9*u+p]),w=0;w<v.length;w++){for(var y=v[w],M=1<<y,x=[],z=0;z<9;z++){a[i=h(p,z,u)]&M&&x.push(i)}if(0===x.length)return[];if(1===x.length)e[x[0]]=y,t=!1;else if(t){var S=m(n,l,x.map((function(e,t){return{pos:e,num:y}})));n=S.guess,l=S.count}}if(t)return null!=n&&g(n),n}}function d(e){for(var t=[],n=e.map((function(e,t){return null===e?511:0}),[]),l=0;l<3;l++)for(var r=0;r<9;r++){var a=p(e,r,l);t.push(a);for(var s=0;s<9;s++){var i=h(r,s,l);n[i]=n[i]&a}}return{allowed:n,needed:t}}function h(e,t,n){return void 0===n&&(n=0),0===n?9*e+t:1===n?9*t+e:[0,3,6,27,30,33,54,57,60][e]+[0,1,2,9,10,11,18,19,20][t]}function p(e,t,n){for(var l=0,r=0;r<9;r++){var a=e[h(t,r,n)];null!=a&&(l|=1<<a)}return 511^l}function f(e){for(var t=[],n=0;n<9;n++)0!=(e&1<<n)&&t.push(n);return t}function m(e,t,n){return null===e||n.length<e.length?{guess:n,count:1}:n.length>e.length?{guess:e,count:t}:0===(l=t,Math.floor(Math.random()*(l+1)))?{guess:n,count:t+1}:{guess:e,count:t+1};var l}function v(e){for(var t=Array(81).fill(null),n=0;n<e.length;n++){var l=e[n],r=l.pos,a=l.num;t[r]=a}return t}function g(e){for(var t=0;t<e.length;t++){for(var n=t;n===t;)n=Math.floor(Math.random()*e.length);var l=e[t];e[t]=e[n],e[n]=l}}function w(e,t,n){var l=e.slice((n||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,l)}function y(e){const t=document.getElementById("root");t.replaceChild(M(e),t.querySelector(".board")),t.replaceChild(x(e),t.querySelector(".controls"))}function M(e){const t=document.createElement("table");t.className="board";const n=e.selectedCell();return e.cells.reduce(((e,t,l)=>{const r=Math.floor(l/9)+1,a=Math.floor(l%9)+1,s=document.createElement("td");if(s.className="cell",s.dataset.row=String(r),s.dataset.col=String(a),!n||r!==n.rowIndex()&&a!==n.columnIndex()||s.classList.add("highlighted"),n&&t!==n&&t.shownNumber()&&t.shownNumber()===n.shownNumber()&&s.classList.add("sibling-selected"),!1===t.valid&&s.classList.add("invalid"),t.selected&&s.classList.add("selected"),t.revealed)s.classList.add("revealed"),s.innerHTML=String(t.realValue);else if(t.placeholders){const e=document.createElement("div");e.classList.add("placeholders"),t.placeholders.forEach((t=>{const n=document.createElement("div");n.style.gridArea="a"+String(t),n.innerHTML=String(t),e.appendChild(n)})),s.appendChild(e)}else t.playerValue&&(s.classList.add("player-value"),s.innerHTML=String(t.playerValue));e[e.length-1].appendChild(s);return 9===a?e.concat(document.createElement("tr")):e}),[document.createElement("tr")]).forEach((e=>t.appendChild(e))),t}function x(e){const t=document.createElement("div");t.className="controls",t.appendChild(z(b,'<svg viewBox="0 0 30 31">\n      <path d="M13.71 2.46a1 1 0 01.14 1.32l-.08.1-2.15 2.32 3.41.02a10 10 0\n        11-10 10 1 1 0 112 0 8 8 0 108.25-8h-.25l-3.48-.02 2.28 2.53a1 1 0 01.01\n        1.32l-.09.1a1 1 0 01-1.32 0l-.09-.08-3.76-4.18a1 1 0 01-.07-1.25l.08-.1\n        3.7-4.02a1 1 0 011.42-.06z"></path>\n    </svg>'));const n=z(V,'<svg viewBox="0 0 30 31">\n      <path d="M25.43 4.76a5.42 5.42 0 01.19 7.52l-.18.2-13.5\n        13.48a.91.91 0 01-1.21.08l-.1-.08-5.07-5.08-.59 4.34 3.25-.44c.44-.05.84.2\n        1 .58l.03.11.02.11c.06.47-.24.91-.7 1.03l-.1.02-4.45.6a.94.94 0\n        01-.79-.27.92.92 0 01-.26-.65v-.13l1-7.4a.92.92 0 01.19-.44l.08-.09L17.71\n        4.76a5.45 5.45 0 017.72 0zm.35 20.08a1 1 0 110 2h-8.7a1 1 0\n        010-2h8.7zM21.4 10.18L9.43 22.13 11.3\n        24l11.95-11.95-1.86-1.86zm-3.23-3.23L6.2 18.91l1.92 1.91L20.07\n        8.86l-1.9-1.9zm3.42-1.93c-.69 0-1.35.2-1.92.56l-.15.1 5.01 5\n        .1-.14c.33-.5.51-1.09.55-1.7l.01-.22a3.58 3.58 0 00-3.6-3.6z"></path>\n  </svg>');return n.classList.add(e.placeholderMode?"active":"a"),t.appendChild(n),t.appendChild(z(C,'<svg viewBox="0 0 30 31">\n      <path fill-rule="evenodd" d="M27.13 25.11a1 1 0 01.12\n        2h-6.9a1 1 0 01-.11-2H27.13zM21.48 4.08l.17.14.16.15 3.76 3.76a4 4 0\n        01.15 5.5l-.15.16-11.32 11.32h2.04a1 1 0 011 .89v.11a1 1 0 01-.88 1H6.52a3\n        3 0 01-1.98-.74l-.14-.14-2.23-2.22a4 4 0 01-.15-5.5l.15-.16L16.15 4.37a4 4\n        0 015.33-.29zm-11.52 9.3l-6.38 6.38a2 2 0 00-.11 2.7l.11.13 2.23 2.23a1 1\n        0 00.58.28l.13.01h4.9l5.13-5.13-6.59-6.6zm7.87-7.82l-.14.1-.13.13-6.18\n        6.18 6.59 6.6 6.19-6.2a2 2 0 00.11-2.7l-.11-.12-3.77-3.76a2 2 0\n        00-2.56-.22z"></path>\n  </svg>')),t}function z(e,t){const n=document.createElement("div");return n.className="button",n.innerHTML=t,n.onclick=e,n}a={makepuzzle:function(){return function(e){var t=[],n=Array(81).fill(null),l=[...Array(81).keys()];g(l);for(var r=0;r<l.length;r++){var a=l[r];null===n[a]&&(t.push({pos:a,num:e[a]}),n[a]=e[a],u(n))}for(g(t),r=t.length-1;r>=0;r--){var i=t[r];w(t,r),-1===s(v(t),e)&&t.push(i)}return v(t)}(i(Array(81).fill(null)))},solvepuzzle:i,ratepuzzle:function(e,t){for(var n=0,l=0;l<t;l++){var r=o(e);if(null===r.answer)return-1;n+=r.state.length}return n/t},posfor:h};let S=function(){const e=a.makepuzzle(),n=a.ratepuzzle(e,4),r=a.solvepuzzle(e).map((e=>e+1)).map(((t,n)=>new l(n,t,null!==e[n],null,null)));return new t(r,!1,n,[])}();document.onclick=e=>{const t=(e,n)=>e.classList.contains("cell")&&"TD"===e.tagName?e:e.parentElement?t(e.parentElement,n):null,n=t(e.target,"cell");if(n){const{row:e,col:t}=n.dataset;L(parseInt(e),parseInt(t))}},document.onkeyup=e=>{if(e.key.match(/[1-9]/))E(parseInt(e.key));else if(e.key.match(/^(1|2|3|q|w|e|a|s|d)$/)&&!e.ctrlKey){const t={1:1,2:2,3:3,q:4,w:5,e:6,a:7,s:8,d:9},n=t[e.key];t&&E(n)}else"z"===e.key?b():"x"===e.key?V():"c"===e.key&&C()};const E=e=>{S=S.numberPressed(e),y(S)},L=(e,t)=>{S=S.toggleSelectedCell(e,t),y(S)},V=()=>{S=S.togglePlaceholderMode(),y(S)},C=()=>{S=S.eraseSelected(),y(S)},b=()=>{S=S.undo(),y(S)};!function(e){const t=document.getElementById("root");t.appendChild(function(e){const t=document.createElement("div");t.className="header";const n=document.createElement("div");n.className="difficulty",n.innerHTML=`Difficulty: ${e.difficulty}`,t.appendChild(n);const l=document.createElement("div");return l.id="timer",t.appendChild(l),t}(e)),t.appendChild(M(e)),t.appendChild(x(e)),t.appendChild(function(){const e=document.createElement("div");return e.className="numpad",[1,2,3,4,5,6,7,8,9].forEach((t=>{const n=document.createElement("div");n.innerHTML=String(t),n.onclick=()=>E(t),e.appendChild(n)})),e}()),r.start();const n=()=>t.style.setProperty("--cell-size",Math.min(document.body.clientWidth/9-3,60)+"px");window.addEventListener("resize",n),n()}(S);
//# sourceMappingURL=index.720e2f31.js.map
