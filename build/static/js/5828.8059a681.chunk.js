"use strict";(self.webpackChunklaptop_rental_web_app=self.webpackChunklaptop_rental_web_app||[]).push([[5828],{65828:(e,s,t)=>{t.r(s),t.d(s,{default:()=>O});var a=t(65043),n=t(61072),r=t(78602),i=t(53519),l=t(24522),c=t(17638),o=t(93058),d=t(25284),m=t(47994),x=t(14282),h=t(27417),u=t(31462),g=t(31340),p=t(37387),j=t(1090),y=t(73216),f=t(35475),N=t(51285),b=t(92467),v=t(60349),A=t(23156),S=t(98251),w=t(76410),F=t(60184),z=(t(4207),t(5605)),C=t(76116),P=t(39110),k=t(79382),R=t(36653),E=t(867),L=t(80899),D=t(77516),I=t(26164),q=t(70579);const O=()=>{const{color:e}=(0,R.D)(),s=(0,y.Zp)(),[t,O]=(0,a.useState)(""),[W,B]=(0,a.useState)(""),[T,_]=(0,a.useState)(1),[K,G]=(0,a.useState)(),[M,Q]=(0,a.useState)(),[Y,H]=(0,a.useState)(),[J,V]=(0,a.useState)(1),[U,Z]=(0,a.useState)(),[X,$]=(0,a.useState)(),[ee,se]=(0,a.useState)(),[te,ae]=(0,a.useState)([]),[ne,re]=(0,a.useState)({}),[ie,le]=(0,a.useState)([]),[ce,oe]=(0,a.useState)(!1),[de,me]=(0,a.useState)("desc"),[xe,he]=(0,a.useState)(""),[ue,ge]=(0,a.useState)(!1),[pe,je]=(0,a.useState)(!1),[ye,fe]=(0,a.useState)(!1),[Ne,be]=(0,a.useState)(""),[ve,Ae]=(0,a.useState)(!1),[Se,we]=(0,a.useState)(!1),[Fe,ze]=(0,a.useState)([]),[Ce,Pe]=(0,a.useState)([]),[ke,Re]=(0,a.useState)(""),[Ee,Le]=(0,a.useState)([]),[De,Ie]=(0,a.useState)(!1),[qe,Oe]=(0,a.useState)(!1),We=(0,a.useRef)(null),Be=window.innerWidth<768,[Te,_e]=(0,a.useState)({brand:[],operatingSystem:[],ram:[],storage:[],screenSize:[],rating:[],processor:[]}),[Ke,Ge]=(0,a.useState)({brand:[],operatingSystem:[],ram:[],storage:[],screenSize:[],rating:[],processor:[]}),Me=new URLSearchParams(Te).toString(),{data:Qe,isLoading:Ye,isFetching:He}=(0,z.eE)({currentPage:T,queryString:Me,sortOption:de,search:t}),{data:Je}=(0,I.b9)({page:J,type:"refurbished"}),[Ve,{isLoading:Ue}]=(0,b._9)(),[Ze]=(0,b.di)();(0,a.useEffect)((()=>{if(Qe&&Qe.data&&(le(Qe.data),ze(Qe.carousel)),Qe&&Qe.availbleOptionsForFilter){var e;Pe(Qe.availbleOptionsForFilter);const{availableBrands:s,availableOperatingSystems:t,availableRams:a,availableStorages:n,availableScreenSizes:r,availableRatings:i,availableProcessors:l}=null!==(e=Qe.availbleOptionsForFilter[0])&&void 0!==e?e:[];Ge({brand:s,operatingSystem:t,ram:a,storage:n,screenSize:r,rating:i,processor:l})}else Pe([]);Qe&&Qe.pagination&&(G(Qe.pagination.totalPages),Q(Qe.pagination.itemsPerPage),H(Qe.pagination.totalItems),_(T)),Qe&&Qe.carousel&&ze(Qe.carousel),Qe&&Qe.refurbishedBanner&&Le(Array.isArray(Qe.refurbishedBanner)?Qe.refurbishedBanner:[Qe.refurbishedBanner])}),[Qe,T,Te,de,t]),(0,a.useEffect)((()=>{const e=localStorage.getItem("token");if(e){const s=JSON.parse(e).phoneNumber;Re(s),console.log(s)}}),[]),(0,a.useEffect)((()=>{Je&&Je.data&&ae(Je.data),Je&&Je.pagination&&(Z(Je.pagination.totalPages),$(Je.pagination.itemsPerPage),se(Je.pagination.totalItems))}),[Je,J]);const Xe=e=>{We.current&&!We.current.contains(e.target)&&Ae(!1)};(0,a.useEffect)((()=>(document.addEventListener("mousedown",Xe),()=>{document.removeEventListener("mousedown",Xe)})),[]);const $e=e=>{s("/refurbished/refurbished-details",{state:{laptop:e,similarProduct:Fe}})},es=L.Ik().shape({message:L.Yj().min(2,"Message must be at least 2 characters").max(250,"Message must be at most 250 characters").required("Message is required")});return(0,q.jsxs)(q.Fragment,{children:[Ye?(0,q.jsx)(v.A,{}):(0,q.jsxs)("div",{children:[(0,q.jsxs)(n.A,{className:"mt-4 align-items-center",children:[(0,q.jsx)(r.A,{xs:"auto",children:(0,q.jsx)(f.N_,{to:"/",style:{width:"40px",height:"40px",backgroundColor:e,borderRadius:"50%"},className:"d-flex flex-column justify-content-center align-items-center",children:(0,q.jsx)(F.QVr,{size:15,color:"#fff"})})}),(0,q.jsx)(r.A,{children:(0,q.jsxs)("h4",{className:"text-center",children:[(0,q.jsx)("span",{className:"main",children:"\u201c"}),"Refurbished Deals",(0,q.jsx)("span",{className:"main",children:"\u201d"})]})})]}),(0,q.jsx)(i.A,{fluid:!0,className:"d-flex flex-column justify-content-center align-items-center",children:Qe&&null!==Qe?(0,q.jsxs)(q.Fragment,{children:[Ce.length>0?(0,q.jsxs)(n.A,{className:"justify-content-between align-items-center d-flex my-4 w-100",children:[(0,q.jsx)(r.A,{xs:8,sm:10,md:6,lg:3,className:"my-2",children:(0,q.jsxs)(l.A,{className:"border rounded d-flex align-items-center justify-content-start position-relative",ref:We,children:[(0,q.jsx)(l.A.Control,{type:"text",placeholder:"Search here...","aria-label":"Location",className:"border-0",style:{paddingLeft:"30px"},value:W,onChange:e=>{const s=e.target.value;B(s),Ae(s.trim().length>0)}}),(0,q.jsx)("div",{className:"position-absolute",style:{top:"150%",left:0,right:0,display:ve>0?"block":"none"}}),(0,q.jsx)("div",{className:"position-absolute",style:{top:"100%",left:0,right:0}}),ce?(0,q.jsx)("div",{className:"p-1 position-absolute pointer",style:{right:"5px",top:"50%",transform:"translateY(-50%)",backgroundColor:"white"},onClick:()=>{O(""),B(""),oe(!1),Ae(!1)},children:(0,q.jsx)(A.V2x,{color:e})}):(0,q.jsx)("div",{className:"p-1 position-absolute pointer",style:{right:"5px",top:"50%",transform:"translateY(-50%)",backgroundColor:"white"},onClick:()=>{O(W),W.length>0&&oe(!0)},children:(0,q.jsx)(u.YQq,{color:e})})]})}),ie.length>0?(0,q.jsx)(r.A,{xs:4,sm:10,md:6,lg:4,className:"my-2",children:(0,q.jsxs)(c.A,{onSelect:e=>{me(e)},className:"d-flex justify-content-center justify-content-md-end custom-dropdown",children:[(0,q.jsx)(c.A.Toggle,{variant:"secondary",id:"dropdown-basic",children:"Sort By"}),(0,q.jsxs)(c.A.Menu,{children:[(0,q.jsx)(c.A.Item,{eventKey:"asc",active:"asc"===de,className:"asc"===de?"selected-asc":"",children:"Asc"}),(0,q.jsx)(c.A.Item,{eventKey:"desc",active:"desc"===de,className:"desc"===de?"selected-desc":"",children:"Desc"})]})]})}):(0,q.jsx)(q.Fragment,{})]}):(0,q.jsx)(q.Fragment,{}),(0,q.jsx)(n.A,{className:"justify-content-center  mb-4 w-100",children:(0,q.jsx)(o.A,{controls:!1,indicators:!1,interval:2e3,nextIcon:(0,q.jsx)("span",{"aria-hidden":"true",className:"carousel-control-next-icon"}),prevIcon:(0,q.jsx)("span",{"aria-hidden":"true",className:"carousel-control-prev-icon"}),className:"w-100",children:Ee.map(((e,s)=>(0,q.jsx)(o.A.Item,{style:{maxHeight:"250px"},children:(0,q.jsxs)(n.A,{children:[(0,q.jsx)("img",{className:"d-block",src:e.image,alt:"Banner ".concat(s+1),style:{height:window.innerWidth<768?"100px":"250px",objectFit:"fill",width:window.innerWidth<768?"80%":"90%",transition:"width 1s ease-in-out"}}),(0,q.jsx)("img",{className:"d-block",src:Ee[(s+1)%Ee.length].image,alt:"Next Banner ".concat(s+2),style:{height:window.innerWidth<768?"100px":"250px",objectFit:"cover",width:window.innerWidth<768?"15%":"5%",transition:"width 1s ease-in-out"}})]})},s)))})}),(0,q.jsxs)(n.A,{className:"w-100 ",children:[Ce.length>0?(0,q.jsxs)(q.Fragment,{children:[" ",(as=Ke,Object.values(as).every((e=>0===e.length))?(0,q.jsx)(q.Fragment,{}):(0,q.jsx)(N.A,{filters:Te,filterOptions:Ke,handleFilterChange:(e,s)=>{_(1),_e((t=>{const a=t[e].includes(s)?t[e].filter((e=>e!==s)):[...t[e],s];return{...t,[e]:a}}))},clearFilters:()=>{_e({brand:[],operatingSystem:[],ram:[],storage:[],screenSize:[],rating:[],processor:[]})},handleCustomFilter:()=>ke?void we(!0):Ie(!0)}))]}):(0,q.jsx)(q.Fragment,{}),(0,q.jsx)(r.A,{xs:12,lg:Ye?12:Ce.length>0?9:12,className:"d-flex flex-row flex-wrap gaps m-0 p-0 justify-content-md-".concat(ie.length>0?"start":"center"," justify-content-center align-items-start align-content-start d-none d-lg-flex d-md-flex d-xxl-flex"),children:He?(0,q.jsx)(P.A,{}):(0,q.jsx)(q.Fragment,{children:ie.length>0?(0,q.jsx)(q.Fragment,{children:ie.map(((e,s)=>{var t;return(0,q.jsxs)("div",{className:"rounded-0 mb-2 p-2 mx-2  products-card d-flex flex-column justify-content-start align-items-start",children:[(0,q.jsx)(r.A,{className:"d-flex justify-content-center align-items-center w-100 pointer",onClick:()=>$e(e),children:(0,q.jsx)("img",{src:null!==(t=e.image)&&void 0!==t?t:g,alt:"Laptop",className:"products-image"})}),(0,q.jsxs)(r.A,{className:"my-1",children:[(0,q.jsx)(p.A,{className:"p-0 m-0",fontSize:"15px",fontWeight:800,children:e.brand}),(0,q.jsx)(p.A,{className:"fw-0 text-wrap p-0 m-0  pointer products-description",fontSize:"11px",fontWeight:400,onClick:()=>$e(e),children:(0,C.EJ)(e.model+" ("+e.ram+" "+e.storage+" "+e.operatingSystem+"  )",42)})]}),(0,q.jsxs)("div",{className:"p-0 m-0 d-flex w-100 flex-row justify-content-between align-items-center",children:[(0,q.jsx)(F.Qp1,{className:"text-start",color:e.color}),e.averageRating>0?(0,q.jsxs)("div",{className:"d-flex align-items-center justify-content-center rounded px-1 rating-box ".concat(e.averageRating>=3.5?"bg-success":e.averageRating>=2.5?"bg-warning":"bg-danger"),style:{minWidth:"40px",textAlign:"center",color:"white"},children:[e.averageRating,(0,q.jsx)(F.gt3,{className:"ml-1 mx-1",size:10})]}):(0,q.jsx)(q.Fragment,{})]})]},e._id)}))}):(0,q.jsx)(n.A,{className:"justify-content-center ",children:(0,q.jsx)(r.A,{xs:"auto",className:"justify-content-center align-item-center",children:(0,q.jsx)("div",{children:(0,q.jsx)(k.A,{})})})})})}),(0,q.jsx)(q.Fragment,{children:(0,q.jsx)(r.A,{xs:12,className:"d-flex flex-row flex-wrap gap-3 m-0 p-0 justify-content-md-".concat(ie.length>0?"start":"center"," justify-content-center align-items-start d-md-none d-xs-flex d-lg-none d-sm-flex"),children:He?(0,q.jsx)(P.A,{}):(0,q.jsx)(q.Fragment,{children:ie.length>0?(0,q.jsx)(q.Fragment,{children:Be?(0,q.jsx)("div",{children:(ss=ie,ts=2,ss.reduce(((e,s,t)=>t%ts===0?e.concat([ss.slice(t,t+ts)]):e),[])).map(((e,s)=>(0,q.jsx)("div",{children:(0,q.jsx)(n.A,{children:e.map((e=>{var s;return(0,q.jsx)(r.A,{xs:6,children:(0,q.jsxs)("div",{className:"rounded-0 mb-2 p-2 mx-2 products-card d-flex flex-column justify-content-start align-items-start m-3",style:{width:"100%",height:"205px"},children:[(0,q.jsx)(r.A,{className:"d-flex justify-content-center align-items-center w-100 pointer",onClick:()=>$e(e),children:(0,q.jsx)("img",{src:null!==(s=e.image)&&void 0!==s?s:g,alt:"Laptop",style:{width:"110px",height:"110px",objectFit:"fill"}})}),(0,q.jsxs)(r.A,{className:"",children:[(0,q.jsxs)("div",{className:"d-flex justify-content-between align-items-center w-100",children:[(0,q.jsx)(p.A,{className:"p-0 m-0",fontSize:"15px",fontWeight:800,children:e.brand}),e.averageRating>0&&(0,q.jsxs)("div",{className:"rounded mt-1 px-1 ".concat(e.averageRating>=3.5?"bg-success":e.averageRating>=2.5?"bg-warning":"bg-danger"),style:{textAlign:"center",color:"white"},children:[e.averageRating,(0,q.jsx)(F.gt3,{className:"ml-1 mx-1",size:11})]})]}),(0,q.jsxs)("span",{style:{fontSize:"11px"},children:["Color: ",e.color," ",(0,q.jsx)(F.Qp1,{className:"text-start",color:e.color})]}),(0,q.jsx)(p.A,{className:"fw-0 text-wrap p-0 m-0 pointer products-description",fontSize:"11px",fontWeight:400,onClick:()=>$e(e),children:(0,C.EJ)("".concat(e.model," (").concat(e.ram," ").concat(e.storage,")"),42)})]})]})},e._id)}))})},s)))}):(0,q.jsx)(n.A,{className:"justify-content-center",children:(0,q.jsx)(r.A,{xs:"auto",className:"justify-content-center align-item-center",children:(0,q.jsx)(k.A,{})})})}):(0,q.jsx)(k.A,{})})})}),ie.length>0?(0,q.jsx)(r.A,{className:"d-flex mt-3 justify-content-end",children:(0,q.jsx)(j.A,{itemsPerPage:M,totalItems:Y,currentPage:T,onPageChange:e=>{_(e),window.scrollTo(0,0)},totalPages:K})}):(0,q.jsx)(q.Fragment,{})]})]}):(0,q.jsx)(n.A,{className:"justify-content-center ",children:(0,q.jsx)(r.A,{xs:"auto",className:"justify-content-center align-item-center",children:(0,q.jsx)("div",{children:(0,q.jsx)(k.A,{})})})})}),(0,q.jsxs)("div",{className:"my-5 w-100",children:[(0,q.jsx)("h4",{className:"text-center",children:"FAQ - Refurbished"}),te&&te.map(((s,t)=>(0,q.jsx)("div",{className:"mt-4",children:(0,q.jsxs)("div",{style:{marginBottom:"15px",border:"1px solid ".concat(e),borderRadius:"8px",backgroundColor:"#ECFEFF"},children:[(0,q.jsxs)("div",{style:{padding:"15px",fontSize:"16px",fontWeight:"600",cursor:"pointer"},onClick:()=>(e=>{re((s=>({...s,[e]:!s[e]})))})(t),"aria-expanded":ne[t],children:[ne[t]?(0,q.jsx)(F.iu5,{style:{marginRight:"10px"}}):(0,q.jsx)(F.OiG,{style:{marginRight:"10px"}}),(0,q.jsx)("span",{className:"faq-question ".concat(ne[t]?"open":""),children:s.question})]}),ne[t]&&(0,q.jsxs)("div",{style:{padding:"15px",fontSize:"16px",fontWeight:"400"},children:[(0,q.jsx)("hr",{className:"horizontal-line"}),(0,q.jsx)("p",{children:s.answer})]})]},s._id)},t)))]}),te.length>0&&U>1?(0,q.jsx)(j.A,{itemsPerPage:X,totalItems:ee,currentPage:J,onPageChange:e=>{V(e),window.scrollTo(0,0)},totalPages:U}):(0,q.jsx)(q.Fragment,{})]}),(0,q.jsx)(S.A,{handleAddQuote:async e=>{const s={phoneNumber:e.phoneNumber,userName:e.userName,email:e.email,laptopId:xe,rentalDays:e.rentalDays};try{const e=await Ve(s);var t,a;if(null!==e&&void 0!==e&&e.data)ge(!1),fe(!1),be(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.message),je(!0),setTimeout((()=>je(!1)),4e3),he("");else ge(!1),fe(!0),be(null===e||void 0===e||null===(a=e.error)||void 0===a?void 0:a.data.error),je(!0),setTimeout((()=>je(!1)),4e3),he("")}catch(n){console.error(n)}},handleClose:()=>ge(!1),show:ue,isLoading:Ue}),(0,q.jsx)(w.A,{showModal:pe,setShowModal:je,successMessage:Ne,error:ye}),(0,q.jsxs)(d.A,{show:Se,onHide:()=>we(!1),backdrop:"static",keyboard:!1,centered:!0,children:[(0,q.jsx)(d.A.Header,{closeButton:!0,children:(0,q.jsx)(d.A.Title,{className:"fs-5",children:"Customize your Laptop"})}),(0,q.jsx)(E.l1,{initialValues:{processor:"",phoneNumber:"",ram:"",operatingSystem:"",quantity:"",type:"",screenSize:"",message:"",phoneNumber:(0,C.f9)(ke)||"",processor:"",ram:"",operatingSystem:"",quantity:"",screenSize:"",type:"Refurbished",message:""},validationSchema:es,onSubmit:async(e,s)=>{let{setSubmitting:t}=s;Oe(!0);const a={phoneNumber:e.phoneNumber,processor:e.processor,operatingSystem:e.operatingSystem,ram:e.ram,screenSize:e.screenSize,quantity:e.quantity,type:e.type,message:e.message};try{const e=await Ze(a);var n,r,i;if(null!==e&&void 0!==e&&e.data)be(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.message),je(!0),setTimeout((()=>je(!1)),4e3),we(!1),Oe(!1);else fe(!0),be(null===e||void 0===e||null===(r=e.error)||void 0===r||null===(i=r.data)||void 0===i?void 0:i.error),je(!0),setTimeout((()=>je(!1)),4e3),Oe(!1)}catch(l){console.error("Error while submitting form:",l)}finally{t(!1),Oe(!1)}},children:s=>{let{handleSubmit:t}=s;return(0,q.jsx)(l.A,{onSubmit:t,children:(0,q.jsxs)(d.A.Body,{style:{maxHeight:"350px",overflowY:"scroll"},children:[(0,q.jsx)(n.A,{className:"my-1",children:(0,q.jsxs)(l.A.Group,{children:[(0,q.jsxs)(l.A.Label,{children:["Phone Number ",(0,q.jsx)("span",{className:"text-danger",children:"*"})]}),(0,q.jsxs)(m.A,{className:"",children:[(0,q.jsx)(m.A.Text,{className:"input-group-prepend",style:{fontSize:"14px",height:"40px"},children:"+91"}),(0,q.jsx)(E.D0,{type:"text",name:"phoneNumber",className:"form-control",placeholder:"Enter your Phone number",onInput:e=>{const s=e.target.value.replace(/\D/g,"");s.length<=10?e.target.value=s:e.target.value=s.slice(0,10)}})]}),(0,q.jsx)(E.Kw,{name:"phoneNumber",component:"div",className:"text-danger"})]})}),(0,q.jsx)(n.A,{className:"my-1",children:(0,q.jsxs)(l.A.Group,{children:[(0,q.jsx)(l.A.Label,{children:"Processor"}),(0,q.jsx)(E.D0,{type:"text",name:"processor",className:"form-control",placeholder:"Enter your Processor"}),(0,q.jsx)(E.Kw,{name:"processor",component:"div",className:"text-danger"})]})}),(0,q.jsx)(n.A,{className:"my-1",children:(0,q.jsxs)(l.A.Group,{children:[(0,q.jsx)(l.A.Label,{children:"Operating System"}),(0,q.jsx)(E.D0,{type:"text",name:"operatingSystem",className:"form-control",placeholder:"Enter your Operating System"}),(0,q.jsx)(E.Kw,{name:"operatingSystem",component:"div",className:"text-danger"})]})}),(0,q.jsx)(n.A,{className:"my-1",children:(0,q.jsxs)(l.A.Group,{children:[(0,q.jsx)(l.A.Label,{children:"Ram"}),(0,q.jsx)(E.D0,{type:"text",name:"ram",className:"form-control",placeholder:"Enter your Ram"}),(0,q.jsx)(E.Kw,{name:"ram",component:"div",className:"text-danger"})]})}),(0,q.jsx)(n.A,{className:"my-1",children:(0,q.jsxs)(l.A.Group,{children:[(0,q.jsx)(l.A.Label,{children:"Screen Size"}),(0,q.jsx)(E.D0,{type:"text",name:"screenSize",className:"form-control",placeholder:"Enter your Screen Size"}),(0,q.jsx)(E.Kw,{name:"screenSize",component:"div",className:"text-danger"})]})}),(0,q.jsx)(n.A,{className:"my-1",children:(0,q.jsxs)(l.A.Group,{children:[(0,q.jsx)(l.A.Label,{children:"Quantity"}),(0,q.jsx)(E.D0,{type:"text",name:"quantity",className:"form-control",placeholder:"Enter your Quantity"}),(0,q.jsx)(E.Kw,{name:"quantity",component:"div",className:"text-danger"})]})}),(0,q.jsx)(n.A,{className:"my-1",children:(0,q.jsxs)(l.A.Group,{children:[(0,q.jsx)(l.A.Label,{children:"Type"}),(0,q.jsx)(E.D0,{type:"text",name:"type",className:"form-control",placeholder:"Enter your Type",readOnly:!0}),(0,q.jsx)(E.Kw,{name:"type",component:"div",className:"text-danger"})]})}),(0,q.jsx)(n.A,{className:"my-1",children:(0,q.jsxs)(l.A.Group,{controlId:"message",children:[(0,q.jsxs)(l.A.Label,{children:["Message ",(0,q.jsx)("span",{className:"text-danger",children:"*"})]}),(0,q.jsx)(E.D0,{name:"message",as:"textarea",placeholder:"Enter Your Message",className:"form-control"}),(0,q.jsx)(E.Kw,{name:"message",component:"div",className:"text-danger"})]})}),(0,q.jsx)(x.A,{type:"submit",className:"w-100 px-3 py-1 my-4",style:{backgroundColor:e,borderColor:e},disabled:qe,children:qe?(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(h.A,{as:"span",animation:"border",size:"sm",role:"status",className:"mx-1"}),"Submit..."]}):"Submit"})]})})}})]}),(0,q.jsx)(D.A,{show:De,handleClose:()=>Ie(!1)})]});var ss,ts,as}}}]);
//# sourceMappingURL=5828.8059a681.chunk.js.map