"use strict";(self.webpackChunklaptop_rental_web_app=self.webpackChunklaptop_rental_web_app||[]).push([[7248],{39110:(e,s,t)=>{t.d(s,{A:()=>n});t(65043);var a=t(53519),l=(t(36386),t(79340)),i=t(70579);const n=()=>(0,i.jsxs)(a.A,{className:"vh-100 d-flex flex-column justify-content-center align-items-center",children:[(0,i.jsx)("img",{src:l,alt:"Loading...",style:{width:"150px",height:"150px"}}),(0,i.jsx)("div",{className:"text mt-3",children:"Loading ..."})]})},17248:(e,s,t)=>{t.r(s),t.d(s,{default:()=>b});var a=t(65043),l=t(53519),i=t(61072),n=t(78602),r=t(14282),o=t(25284),c=t(24522),d=t(90671),h=t(6720),x=t(32479),u=t(39110),j=t(36017),m=t(63401),p=(t(2519),t(79382)),v=t(31121),f=t(36653),A=t(73216),N=t(33056),g=t(70579);const b=()=>{var e;const{color:s}=(0,f.D)(),[t,b]=(0,a.useState)(null),[w,y]=(0,a.useState)(!1),[C,S]=(0,a.useState)(!1),[D,E]=(0,a.useState)([]),[_,L]=(0,a.useState)(""),[k,T]=(0,a.useState)(""),O=(0,x.L)(),I=(0,N.O)(),[H]=(0,d.nC)(),{data:R,refetch:B,isLoading:F,error:G}=((0,A.Zp)(),(0,d.jH)({role:O,phoneNumber:I}));(0,a.useEffect)((()=>{const e=JSON.parse(localStorage.getItem("viewedNotifications"))||[];E(e)}),[]);const J=()=>{y(!1)};return(0,g.jsxs)("div",{children:[F?(0,g.jsx)(u.A,{}):(0,g.jsxs)(l.A,{fluid:!0,className:"mt-3 ",children:[(0,g.jsx)(i.A,{className:"boxShadow p-4 mb-4 mt-4",children:(0,g.jsxs)(n.A,{className:"d-flex flex-row justify-content-between mt-1",children:[(0,g.jsx)("h4",{className:"fw-bold",children:"Notifications"}),R&&R.data&&0===R.data.length?(0,g.jsx)(g.Fragment,{}):(0,g.jsx)("div",{children:(0,g.jsxs)(r.A,{variant:"danger",className:"p-2 m-1",onClick:()=>{S(!0)},children:[(0,g.jsx)(h.b6i,{size:20}),(0,g.jsx)("span",{className:"d-none d-md-inline",children:" Clear All"})]})})]})}),R&&R.data&&0===R.data.length?(0,g.jsx)(i.A,{className:"justify-content-center ",children:(0,g.jsx)(n.A,{xs:"auto",className:"justify-content-center align-item-center",children:(0,g.jsx)("div",{children:(0,g.jsx)(p.A,{})})})}):null===R||void 0===R||null===(e=R.data)||void 0===e?void 0:e.map((e=>{return(0,g.jsx)(i.A,{className:"boxShadow p-3 mb-4",style:{cursor:"pointer"},onClick:()=>(e=>{if(e&&e.orderDetails){var s;const t=null!==(s=e.orderDetails[0])&&void 0!==s?s:{};L(t.phoneNumber),T(t.email)}if(b(e),y(!0),!D.includes(e._id)){const s=[...D,e._id];E(s),localStorage.setItem("viewedNotifications",JSON.stringify(s))}})(e),children:(0,g.jsxs)(n.A,{xs:12,children:[(0,g.jsxs)("div",{className:"notification-item ".concat(D.includes(e._id)?"":"unviewed"),children:[(0,g.jsx)("h4",{children:e.title}),(0,g.jsx)("p",{children:e.subtitle})]}),(0,g.jsxs)("div",{className:"d-flex justify-content-between m-1",children:[(0,g.jsx)("span",{children:(t=e.createdAt,new Date(t).toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"}))}),(0,g.jsx)("span",{children:(s=e.createdAt,(0,v.GP)(new Date(s)," h:mm a"))})]})]})},e._id);var s,t}))]}),(0,g.jsxs)(o.A,{show:w,onHide:J,centered:!0,dialogClassName:"review-modal",children:[(0,g.jsx)(o.A.Header,{closeButton:!0,children:(0,g.jsx)(o.A.Title,{children:"Notification Details"})}),(0,g.jsx)(o.A.Body,{children:t&&t.orderDetails.length>0?t.orderDetails.map(((e,s)=>(0,g.jsxs)("div",{children:[Object.entries(e).map((e=>{let[s,t]=e;return"_id"!==s&&"products"!==s&&(0,g.jsxs)(c.A.Group,{className:"mb-3",children:[(0,g.jsx)(c.A.Label,{children:(0,g.jsx)("strong",{children:s})}),(0,g.jsx)(c.A.Control,{type:"text",readOnly:!0,disabled:!0,value:t})]},s)})),(0,g.jsx)("hr",{})]},s))):(0,g.jsx)(p.A,{})}),(0,g.jsx)(o.A.Footer,{children:(0,g.jsx)(r.A,{style:{backgroundColor:s},onClick:J,children:"Close"})})]}),(0,g.jsx)(j.A,{YES:async()=>{try{const t=await H({role:O,phoneNumber:I});var e,s;if(S(!1),null!==t&&void 0!==t&&t.data)m.oR.success(t.data.message,{autoClose:1e3}),B();else m.oR.error(null===t||void 0===t||null===(e=t.error)||void 0===e||null===(s=e.data)||void 0===s?void 0:s.error,{autoClose:1e3})}catch(G){console.error(G)}},DELETESTATE:C,ONCLICK:()=>{S(!1)},DESCRIPTION:"Are you sure you want to delete all notifications",DELETETITLE:"Notification"})]})}}}]);
//# sourceMappingURL=7248.e8b39375.chunk.js.map