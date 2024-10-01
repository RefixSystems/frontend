"use strict";(self.webpackChunklaptop_rental_web_app=self.webpackChunklaptop_rental_web_app||[]).push([[252],{98251:(e,n,t)=>{t.d(n,{A:()=>d});var s=t(65043),a=t(25284),r=t(24522),l=t(867),o=t(80899),c=t(4207),i=t(70579);const d=e=>{let{show:n,handleClose:t,handleAddQuote:d,isLoading:m}=e;const[u,x]=(0,s.useState)("");(0,s.useEffect)((()=>{const e=localStorage.getItem("token");if(e){const n=JSON.parse(e);x(n.phoneNumber)}}),[]);const h=o.Ik().shape({userName:o.Yj().min(2,"Full Name must be at least 2 characters").max(50,"Full Name must be at most 50 characters").required("Full Name is required"),phoneNumber:o.Yj().matches(/^[6-9][0-9]{9}$/,"Invalid phone number format").required("Phone Number is required"),email:o.Yj().email("Invalid email format").required("Email is required"),rentalDays:o.ai().typeError("Rental Months must be a number").positive("Rental Months must be a positive number").integer("Rental Months must be an integer").required("Rental Months is required")});return(0,i.jsxs)(a.A,{show:n,onHide:t,centered:!0,backdrop:"static",keyboard:!1,children:[(0,i.jsx)(a.A.Header,{closeButton:!0,children:(0,i.jsx)(a.A.Title,{children:"Quotation Request"})}),(0,i.jsx)(l.l1,{initialValues:{userName:"",phoneNumber:"",email:"",rentalDays:"",phoneNumber:u||""},validationSchema:h,onSubmit:(e,n)=>{let{resetForm:t}=n;d(e),t()},children:e=>{let{handleSubmit:n,handleChange:t,values:s,errors:o,touched:d,setFieldValue:u}=e;return(0,i.jsxs)(l.lV,{noValidate:!0,onSubmit:n,children:[(0,i.jsxs)(a.A.Body,{style:{maxHeight:"400px",overflowY:"scroll"},children:[(0,i.jsxs)(r.A.Group,{controlId:"formUserName",children:[(0,i.jsx)(r.A.Label,{children:"Full Name"}),(0,i.jsx)(l.D0,{as:r.A.Control,type:"text",name:"userName",value:s.userName,onChange:t,isInvalid:d.userName&&!!o.userName}),(0,i.jsx)(l.Kw,{name:"userName",component:"div",className:"text-danger"})]}),(0,i.jsxs)(r.A.Group,{controlId:"formPhoneNumber",className:"mt-3",children:[(0,i.jsx)(r.A.Label,{children:"Phone Number"}),(0,i.jsx)(l.D0,{as:r.A.Control,type:"text",name:"phoneNumber",value:s.phoneNumber,onChange:e=>{const n=e.target.value.replace(/[^0-9]/g,"").slice(0,10);u(n),t(e)},isInvalid:d.phoneNumber&&!!o.phoneNumber}),(0,i.jsx)(l.Kw,{name:"phoneNumber",component:"div",className:"text-danger"})]}),(0,i.jsxs)(r.A.Group,{controlId:"formEmail",className:"mt-3",children:[(0,i.jsx)(r.A.Label,{children:"Email"}),(0,i.jsx)(l.D0,{as:r.A.Control,type:"email",name:"email",value:s.email,onChange:t,isInvalid:d.email&&!!o.email}),(0,i.jsx)(l.Kw,{name:"email",component:"div",className:"text-danger"})]}),(0,i.jsxs)(r.A.Group,{controlId:"formRentalDays",className:"mt-3",children:[(0,i.jsx)(r.A.Label,{children:"Rental (In Months)"}),(0,i.jsx)(l.D0,{as:r.A.Control,type:"number",name:"rentalDays",value:s.rentalDays,onChange:t,isInvalid:d.rentalDays&&!!o.rentalDays}),(0,i.jsx)(l.Kw,{name:"rentalDays",component:"div",className:"text-danger"})]})]}),(0,i.jsx)(a.A.Footer,{children:(0,i.jsx)(c.A,{isLoading:m,className:"bg-main",style:{border:"none"},type:"submit",label:"Submit"})})]})}})]})}},39110:(e,n,t)=>{t.d(n,{A:()=>l});t(65043);var s=t(53519),a=(t(36386),t(79340)),r=t(70579);const l=()=>(0,r.jsxs)(s.A,{className:"vh-100 d-flex flex-column justify-content-center align-items-center",children:[(0,r.jsx)("img",{src:a,alt:"Loading...",style:{width:"150px",height:"150px"}}),(0,r.jsx)("div",{className:"text mt-3",children:"Loading ..."})]})},51285:(e,n,t)=>{t.d(n,{A:()=>d});t(65043);var s=t(78602),a=t(1177),r=t(24522),l=t(38628),o=t(37387),c=t(4207);t.p;var i=t(70579);const d=e=>{let{filters:n,filterOptions:t,handleFilterChange:d,clearFilters:m,handleCustomFilter:u}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(s.A,{xs:12,lg:4,className:"mb-4 d-block d-lg-none",children:[(0,i.jsx)(a.A,{children:(0,i.jsxs)(a.A.Item,{eventKey:"0",children:[(0,i.jsx)(a.A.Header,{children:"Filters"}),(0,i.jsxs)(a.A.Body,{children:[(0,i.jsxs)(s.A,{className:"d-flex flex-row justify-content-between align-items-center",children:[(0,i.jsx)("h5",{children:"Filters"})," ",(0,i.jsx)(o.A,{className:"text-primary text-center pointer",onClick:m,children:"Clear All"})]}),Object.keys(t).map((e=>(0,i.jsx)(a.A,{className:"my-2",children:(0,i.jsxs)(a.A.Item,{eventKey:e,children:[(0,i.jsx)(a.A.Header,{children:e.charAt(0).toUpperCase()+e.slice(1)}),(0,i.jsx)(a.A.Body,{children:t[e].map((t=>(0,i.jsxs)("div",{className:"d-flex mx-2",children:[(0,i.jsx)(r.A.Check,{type:"checkbox",className:"pointer",checked:n[e].includes(t),onChange:()=>d(e,t),id:"".concat(e,"-").concat(t)}),(0,i.jsx)(r.A.Label,{htmlFor:"".concat(e,"-").concat(t),className:"pointer mx-2",children:t})]},t)))})]})},e)))]})]})}),(0,i.jsx)("div",{className:"text-center mt-4",children:(0,i.jsx)(c.A,{label:"Customize your Laptop",className:"w-100",onClick:u})})]}),(0,i.jsxs)(s.A,{xs:12,lg:3,className:"d-none d-lg-block",children:[(0,i.jsxs)(l.A,{className:"p-lg-3 p-xs-1 mb-3",children:[(0,i.jsxs)(s.A,{className:"d-flex flex-row justify-content-between align-items-center",children:[(0,i.jsx)("h5",{children:"Filters"})," ",(0,i.jsx)(o.A,{className:"text-primary text-center pointer",onClick:m,children:"Clear All"})]}),Object.keys(t).map((e=>(0,i.jsx)(a.A,{className:"my-2",children:(0,i.jsxs)(a.A.Item,{eventKey:e,children:[(0,i.jsx)(a.A.Header,{children:"operatingSystem"===e?"OS":e.charAt(0).toUpperCase()+e.slice(1)}),(0,i.jsx)(a.A.Body,{children:t[e].map((t=>(0,i.jsxs)("div",{className:"d-flex mx-2",children:[(0,i.jsx)(r.A.Check,{type:"checkbox",className:"pointer",checked:n[e].includes(t),onChange:()=>d(e,t),id:"".concat(e,"-").concat(t)}),(0,i.jsx)(r.A.Label,{htmlFor:"".concat(e,"-").concat(t),className:"pointer mx-2",children:t})]},t)))})]})},e)))]}),(0,i.jsx)("div",{className:"text-center",children:(0,i.jsx)(c.A,{label:"Customize your Laptop",className:"w-100",onClick:u})})]})]})}},1177:(e,n,t)=>{t.d(n,{A:()=>O});var s=t(98139),a=t.n(s),r=t(65043),l=t(97121),o=t(67852),c=t(8747),i=t(76555),d=t(33492);const m=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return n.filter((e=>null!=e)).reduce(((e,n)=>{if("function"!==typeof n)throw new Error("Invalid Argument Type, must only provide functions, undefined, or null.");return null===e?n:function(){for(var t=arguments.length,s=new Array(t),a=0;a<t;a++)s[a]=arguments[a];e.apply(this,s),n.apply(this,s)}}),null)};var u=t(92643),x=t(20865),h=t(70579);const p={height:["marginTop","marginBottom"],width:["marginLeft","marginRight"]};function y(e,n){const t=n["offset".concat(e[0].toUpperCase()).concat(e.slice(1))],s=p[e];return t+parseInt((0,c.A)(n,s[0]),10)+parseInt((0,c.A)(n,s[1]),10)}const j={[i.kp]:"collapse",[i.ze]:"collapsing",[i.ns]:"collapsing",[i._K]:"collapse show"},N=r.forwardRef(((e,n)=>{let{onEnter:t,onEntering:s,onEntered:l,onExit:o,onExiting:c,className:i,children:p,dimension:N="height",in:f=!1,timeout:A=300,mountOnEnter:b=!1,unmountOnExit:v=!1,appear:g=!1,getDimensionValue:C=y,...E}=e;const w="function"===typeof N?N():N,k=(0,r.useMemo)((()=>m((e=>{e.style[w]="0"}),t)),[w,t]),I=(0,r.useMemo)((()=>m((e=>{const n="scroll".concat(w[0].toUpperCase()).concat(w.slice(1));e.style[w]="".concat(e[n],"px")}),s)),[w,s]),K=(0,r.useMemo)((()=>m((e=>{e.style[w]=null}),l)),[w,l]),F=(0,r.useMemo)((()=>m((e=>{e.style[w]="".concat(C(w,e),"px"),(0,u.A)(e)}),o)),[o,C,w]),R=(0,r.useMemo)((()=>m((e=>{e.style[w]=null}),c)),[w,c]);return(0,h.jsx)(x.A,{ref:n,addEndListener:d.A,...E,"aria-expanded":E.role?f:null,onEnter:k,onEntering:I,onEntered:K,onExit:F,onExiting:R,childRef:p.ref,in:f,timeout:A,mountOnEnter:b,unmountOnExit:v,appear:g,children:(e,n)=>r.cloneElement(p,{...n,className:a()(i,p.props.className,j[e],"width"===w&&"collapse-horizontal")})})}));function f(e,n){return Array.isArray(e)?e.includes(n):e===n}const A=r.createContext({});A.displayName="AccordionContext";const b=A,v=r.forwardRef(((e,n)=>{let{as:t="div",bsPrefix:s,className:l,children:c,eventKey:i,...d}=e;const{activeEventKey:m}=(0,r.useContext)(b);return s=(0,o.oU)(s,"accordion-collapse"),(0,h.jsx)(N,{ref:n,in:f(m,i),...d,className:a()(l,s),children:(0,h.jsx)(t,{children:r.Children.only(c)})})}));v.displayName="AccordionCollapse";const g=v,C=r.createContext({eventKey:""});C.displayName="AccordionItemContext";const E=C,w=r.forwardRef(((e,n)=>{let{as:t="div",bsPrefix:s,className:l,onEnter:c,onEntering:i,onEntered:d,onExit:m,onExiting:u,onExited:x,...p}=e;s=(0,o.oU)(s,"accordion-body");const{eventKey:y}=(0,r.useContext)(E);return(0,h.jsx)(g,{eventKey:y,onEnter:c,onEntering:i,onEntered:d,onExit:m,onExiting:u,onExited:x,children:(0,h.jsx)(t,{ref:n,...p,className:a()(l,s)})})}));w.displayName="AccordionBody";const k=w;const I=r.forwardRef(((e,n)=>{let{as:t="button",bsPrefix:s,className:l,onClick:c,...i}=e;s=(0,o.oU)(s,"accordion-button");const{eventKey:d}=(0,r.useContext)(E),m=function(e,n){const{activeEventKey:t,onSelect:s,alwaysOpen:a}=(0,r.useContext)(b);return r=>{let l=e===t?null:e;a&&(l=Array.isArray(t)?t.includes(e)?t.filter((n=>n!==e)):[...t,e]:[e]),null==s||s(l,r),null==n||n(r)}}(d,c),{activeEventKey:u}=(0,r.useContext)(b);return"button"===t&&(i.type="button"),(0,h.jsx)(t,{ref:n,onClick:m,...i,"aria-expanded":Array.isArray(u)?u.includes(d):d===u,className:a()(l,s,!f(u,d)&&"collapsed")})}));I.displayName="AccordionButton";const K=I,F=r.forwardRef(((e,n)=>{let{as:t="h2",bsPrefix:s,className:r,children:l,onClick:c,...i}=e;return s=(0,o.oU)(s,"accordion-header"),(0,h.jsx)(t,{ref:n,...i,className:a()(r,s),children:(0,h.jsx)(K,{onClick:c,children:l})})}));F.displayName="AccordionHeader";const R=F,L=r.forwardRef(((e,n)=>{let{as:t="div",bsPrefix:s,className:l,eventKey:c,...i}=e;s=(0,o.oU)(s,"accordion-item");const d=(0,r.useMemo)((()=>({eventKey:c})),[c]);return(0,h.jsx)(E.Provider,{value:d,children:(0,h.jsx)(t,{ref:n,...i,className:a()(l,s)})})}));L.displayName="AccordionItem";const S=L,D=r.forwardRef(((e,n)=>{const{as:t="div",activeKey:s,bsPrefix:c,className:i,onSelect:d,flush:m,alwaysOpen:u,...x}=(0,l.Zw)(e,{activeKey:"onSelect"}),p=(0,o.oU)(c,"accordion"),y=(0,r.useMemo)((()=>({activeEventKey:s,onSelect:d,alwaysOpen:u})),[s,d,u]);return(0,h.jsx)(b.Provider,{value:y,children:(0,h.jsx)(t,{ref:n,...x,className:a()(i,p,m&&"".concat(p,"-flush"))})})}));D.displayName="Accordion";const O=Object.assign(D,{Button:K,Collapse:g,Item:S,Header:R,Body:k})}}]);
//# sourceMappingURL=252.b1c7d2a2.chunk.js.map