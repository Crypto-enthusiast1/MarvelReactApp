"use strict";(self.webpackChunkmarvel_react_app=self.webpackChunkmarvel_react_app||[]).push([[50],{293:(e,t,a)=>{a.d(t,{A:()=>n});const s=a.p+"static/media/giphy.9b522a077d09fe14729a.webp";var i=a(579);const n=()=>(0,i.jsx)("img",{src:s,alt:"error",className:"error"})},115:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var s=a(793),i=a(43),n=a(475),c=a(897),l=a(649),r=a(293),o=a(644),m=a(579);const d=e=>{const[t,a]=(0,i.useState)([]),[s,d]=(0,i.useState)(0),[u,h]=(0,i.useState)(!0),[p,j]=(0,i.useState)(!1),{getAllComics:v,loading:x,error:b,clearError:g}=(0,c.A)();(0,i.useEffect)((()=>{v().then((e=>a((t=>[...t,...e.map((e=>({...e,active:!1})))])))).finally((()=>{h(!1)})),_(),g()}),[]);const _=()=>t.map((e=>{const s=e.active?"selected":null;let i={objectFit:"cover"};const c=()=>{(e=>{const s=t.map((t=>t.id===e?{...t,active:!0}:{...t,active:!1}));a(s)})(e.id)};"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"===e.thumbnail&&(i={objectFit:"unset"});return(0,m.jsxs)(n.N_,{to:"/comics/".concat(e.id),tabIndex:0,className:s,onClick:c,onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||c()},children:[(0,m.jsx)("img",{src:e.thumbnail,style:i,alt:"comics"}),(0,m.jsx)("div",{className:"comicsTitle",children:e.title}),(0,m.jsx)("div",{className:"price",children:e.price})]},e.id)})),w=u?(()=>{const e=[];for(let t=0;t<8;t++)e.push((0,m.jsxs)("li",{children:[(0,m.jsx)(l.A,{variant:"rectangular",width:225,height:346,animation:"wave"}),(0,m.jsx)(l.A,{height:36,animation:"wave"}),(0,m.jsx)(l.A,{width:"30%",animation:"wave"})]},t));return e})():null,A=b?(0,m.jsx)(r.A,{}):null,f=_();let k=x&&!u?(0,m.jsx)(o.A,{}):(0,m.jsx)("button",{className:"button button__main button__long",onClick:()=>(e=>{v(e).then((e=>{e.length<8&&j(!0),a((t=>[...t,...e.map((e=>({...e,active:!1})))]))})),d((e=>e+8))})(s+8),children:(0,m.jsx)("div",{className:"inner",children:"load more"})});return p&&(k=null),(0,m.jsxs)("div",{children:[(0,m.jsxs)("ul",{className:"comicsWrapper",children:[w,A,f]}),k]})},u=()=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(s.A,{}),(0,m.jsx)(d,{})]})}}]);
//# sourceMappingURL=50.3d48a9dd.chunk.js.map