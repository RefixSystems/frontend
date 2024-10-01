"use strict";(self.webpackChunklaptop_rental_web_app=self.webpackChunklaptop_rental_web_app||[]).push([[1567],{93779:(e,a,s)=>{s.d(a,{A:()=>d});s(65043);var l=s(94281),r=s(24522),n=s(75200),i=s(36653),t=s(63401),o=s(70579);const d=e=>{let{setFieldValue:a=(()=>{}),touched:s={},errors:d={},labelText:m="Upload Image",nameText:c="image",accepts:g={"image/*":[".png",".jpeg",".jpg",".svg",".webp",".gif"]},handleFileChange:p=null,disabled:x=!1}=e;const{getRootProps:h,getInputProps:u,isDragActive:j}=(0,l.VB)({accept:g||"",onDrop:e=>{const s=e[0],l=s.name.split(".").pop().toLowerCase();g["image/*"].map((e=>e.replace(".","").toLowerCase().trim())).includes(l)?(a(c,s),p&&p(s)):t.oR.warning("This file type not accepted",{autoClose:2e3,position:"bottom-center"})},onDropRejected:e=>{t.oR.warning("This file type not accepted",{autoClose:2e3,position:"bottom-center"})},disabled:x}),{color:f}=(0,i.D)();return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(r.A.Group,{children:[(0,o.jsxs)(r.A.Label,{children:[m," ",(0,o.jsx)("span",{className:"text-danger"})]}),(0,o.jsxs)("div",{...h(),className:"form-control dropzone ".concat(j?"active":""," ").concat(s[c]&&d[c]?"is-invalid":""),style:{border:"2px dashed #ced4da",padding:"20px",textAlign:"center",borderRadius:"5px",cursor:x?"not-allowed":"pointer",background:j?"#f8f9fa":"transparent"},children:[(0,o.jsx)("input",{...u(),disabled:x}),j?(0,o.jsx)("p",{children:"Drop the files here..."}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.YoE,{size:50,color:f}),(0,o.jsx)("p",{children:"Drag & drop an image here, or click to select one"})]})]}),s[c]&&d[c]&&(0,o.jsx)("p",{className:"text-danger",children:d[c]})]})})}},24796:(e,a,s)=>{s.d(a,{A:()=>r});s(65043);var l=s(70579);const r=e=>{let{image:a,valueImage:s}=e;const r=a&&(!Array.isArray(a)||a.length>0),n=s!==a?a:a instanceof File?URL.createObjectURL(a):a;return(0,l.jsx)(l.Fragment,{children:r?(0,l.jsx)("img",{src:n,width:100,height:70,alt:"image",className:"mt-3",style:{objectFit:"contain"}}):(0,l.jsx)(l.Fragment,{})})}},97355:(e,a,s)=>{s.d(a,{A:()=>n});s(65043);var l=s(24522),r=s(70579);const n=e=>{const{label:a,rows:s,type:n,name:i,value:t,onChange:o,htmlFor:d,validation:m,className:c,lg:g,md:p,xxl:x,xl:h,sm:u,placeholder:j,star:f}=e;return(0,r.jsxs)(l.A.Group,{controlId:"formBasicTextArea",children:[(0,r.jsxs)(l.A.Label,{htmlFor:d,children:[a,(0,r.jsx)("span",{className:"text-danger ".concat("none"===f?"d-".concat(f):""),children:"*"})," "]}),(0,r.jsx)(l.A.Control,{as:"textarea",name:i,rows:s,value:t,type:n,placeholder:j,onChange:o,className:c,lg:g,md:p,xxl:x,xl:h,sm:u}),m]})}},13256:(e,a,s)=>{s.d(a,{A:()=>n});s(65043);var l=s(24522),r=s(70579);const n=e=>{const{label:a,name:s,id:n,type:i,placeholder:t,htmlFor:o,lableClassName:d,value:m,onChange:c,onBlur:g,disabled:p,className:x,lg:h,md:u,xxl:j,xl:f,sm:v,validation:b,star:A,ref:N,accept:y}=e;return(0,r.jsxs)(l.A.Group,{children:[(0,r.jsxs)(l.A.Label,{htmlFor:o,className:d,children:[a,(0,r.jsx)("span",{className:"text-danger ".concat("none"===A?"d-".concat(A):""),children:"*"})]}),(0,r.jsx)(l.A.Control,{name:s,id:n,type:i,placeholder:t,value:m,onChange:c,onBlur:g,disabled:p,className:x,lg:h,md:u,xxl:j,xl:f,sm:v,ref:N,accept:null!==y&&void 0!==y?y:""}),b]})}},31567:(e,a,s)=>{s.r(a),s.d(a,{default:()=>A});var l=s(867),r=s(65043),n=s(53519),i=s(24522),t=s(61072),o=s(78602),d=s(73216),m=s(3825),c=s(11961),g=s(4207),p=s(13256),x=s(97355),h=s(63401),u=s(45680),j=s(32479),f=s(24796),v=s(93779),b=s(70579);const A=()=>{const[e,a]=(0,r.useState)(""),[s,A]=(0,r.useState)(""),[N,y]=(0,r.useState)(""),[S,C]=(0,r.useState)(""),[w,q]=(0,r.useState)(""),[F,I]=(0,r.useState)(null),[T,B]=(0,r.useState)(null),[z,D]=(0,r.useState)(null),[Y,M]=(0,r.useState)(null),[k,R]=(0,r.useState)(null),[E,L]=(0,r.useState)(""),[V,_]=(0,r.useState)(""),[G,O]=(0,r.useState)(""),[P,U]=(0,r.useState)(""),[X,Z]=(0,r.useState)(""),H=(0,j.L)(),[J,{isLoading:K}]=(0,u._1)({role:H}),Q=(0,d.Zp)(),W=()=>{Q("/admin/rental")},$=async()=>{try{const n=new FormData;n.append("amountFor6Months",e),n.append("brand",s),n.append("model",N),n.append("processor",S),n.append("image1",F),n.append("image2",T),n.append("image3",z),n.append("image4",Y),n.append("image5",k),n.append("screenSize",X),n.append("storage",E),n.append("color",G),n.append("operatingSystem",P),n.append("ram",w),n.append("description",V);const i=await J({data:n,role:H});var l,r;if(null!==i&&void 0!==i&&i.data)h.oR.success(null===i||void 0===i||null===(l=i.data)||void 0===l?void 0:l.message,{autoClose:1e3}),setTimeout((()=>Q("/admin/rental")),3e3),a(""),A(""),y(""),C(""),q(""),I([]),B([]),D([]),M([]),R([]),Z(""),L(""),O(""),U(""),_("");else h.oR.error(null===i||void 0===i||null===(r=i.error)||void 0===r?void 0:r.data.error,{autoClose:1e3})}catch(n){console.error(n)}};return(0,b.jsx)("div",{children:(0,b.jsx)(n.A,{fluid:!0,className:"",children:(0,b.jsx)(l.l1,{initialValues:{brand:"",model:"",processor:"",ram:"",image1:"",image2:"",image3:"",image4:"",image5:"",screenSize:"",storage:"",color:"",operatingSystem:"",description:"",addInCarousel:""},validationSchema:c.m,onSubmit:$,children:e=>{let{values:l,errors:r,touched:n,handleChange:d,handleBlur:c,handleSubmit:h,isSubmitting:u,setFieldValue:j}=e;return(0,b.jsx)(b.Fragment,{children:(0,b.jsxs)(i.A,{children:[(0,b.jsxs)(t.A,{className:"d-flex flex-row justify-content-between align-items-center",children:[(0,b.jsxs)(o.A,{className:"d-flex justify-content-start mb-3 mt-3",children:[(0,b.jsx)("h4",{onClick:W,className:"mx-2",children:(0,b.jsx)(m.nXt,{})}),(0,b.jsx)("h4",{children:"Add Rental"})]}),(0,b.jsxs)(o.A,{className:"d-sm-none d-none d-md-none d-lg-flex d-xxl-flex d-xl-flex flex-row justify-content-end align-items-center",children:[(0,b.jsx)(g.A,{className:"m-1",variant:"secondary",onClick:W,label:"Cancel"}),(0,b.jsx)(g.A,{className:"m-1",label:"Save",type:"submit",isLoading:K,loaderVariant:"info",disabled:u,onClick:""===s||""===N||""===S||""===w||""===E||""===G||""===P||""===V||""===F||""===T||""===z||""===Y||""===k||n.brand&&r.brand||n.model&&r.model||n.processor&&r.processor||n.ram&&r.ram||n.storage&&r.storage||n.color&&r.color||n.operatingSystem&&r.operatingSystem||n.description&&r.description||n.image1&&r.image1||n.image2&&r.image2||n.image3&&r.image3||n.image4&&r.image4||n.image5&&r.image5?h:$})]})]}),(0,b.jsxs)(t.A,{className:"d-flex flex-wrap flex-lg-row flex-xxl-row flex-xl-row flex-column flex-md-column flex-sm-column  mt-4",children:[(0,b.jsxs)(o.A,{className:"m-1 p-4 d-flex flex-wrap flex-column shadow rounded bg-white",children:[(0,b.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,b.jsx)(p.A,{label:"Amount For 6 Months",type:"",name:"amountFor6Months",placeholder:"Enter the amount here",star:"none",className:"form-control ".concat(n.amountFor6Months&&r.amountFor6Months?"is-invalid":""),onChange:e=>{a(e.target.value),d(e)},onBlur:c,validation:n.amountFor6Months&&r.amountFor6Months?(0,b.jsx)("p",{className:"text-danger",children:r.amountFor6Months}):""})}),(0,b.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,b.jsx)(p.A,{label:"Brand",type:"",name:"brand",placeholder:"Enter the brand here",className:"form-control ".concat(n.brand&&r.brand?"is-invalid":""),onChange:e=>{A(e.target.value),d(e)},onBlur:c,validation:n.brand&&r.brand?(0,b.jsx)("p",{className:"text-danger",children:r.brand}):""})}),(0,b.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,b.jsx)(p.A,{label:"Model",type:"",name:"model",placeholder:"Enter the model here",className:"form-control ".concat(n.model&&r.model?"is-invalid":""),onChange:e=>{y(e.target.value),d(e)},onBlur:c,validation:n.model&&r.model?(0,b.jsx)("p",{className:"text-danger",children:r.model}):""})}),(0,b.jsxs)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:[(0,b.jsx)(v.A,{labelText:"Image1",nameText:"image1",accepts:{"image/*":[".png",".jpeg",".jpg",".svg",".webp",".gif"]},touched:n,errors:r,setFieldValue:j,handleFileChange:e=>{(e=>{I(e)})(e)}}),(0,b.jsx)(f.A,{image:F,valueImage:l.image1}),(0,b.jsx)("div",{children:(0,b.jsx)("small",{className:"text-muted",children:"Accepted file types: .jpg, .jpeg, .png, .svg, .webp, .gif"})}),(0,b.jsx)("div",{children:(0,b.jsx)("small",{className:"",children:"Dimensions should be 1:1 "})})]}),(0,b.jsxs)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:[(0,b.jsx)(v.A,{labelText:"Image2",nameText:"image2",accepts:{"image/*":[".png",".jpeg",".jpg",".svg",".webp",".gif"]},touched:n,errors:r,setFieldValue:j,handleFileChange:e=>{(e=>{B(e)})(e)}}),(0,b.jsx)(f.A,{image:T,valueImage:l.image2}),(0,b.jsx)("div",{children:(0,b.jsx)("small",{className:"text-muted",children:"Accepted file types: .jpg, .jpeg, .png, .svg, .webp, .gif"})}),(0,b.jsx)("div",{children:(0,b.jsx)("small",{className:"",children:"Dimensions should be 1:1 "})})]}),(0,b.jsxs)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:[(0,b.jsx)(v.A,{labelText:"Image3",nameText:"image3",accepts:{"image/*":[".png",".jpeg",".jpg",".svg",".webp",".gif"]},touched:n,errors:r,setFieldValue:j,handleFileChange:e=>{(e=>{D(e)})(e)}}),(0,b.jsx)(f.A,{image:z,valueImage:l.image3}),(0,b.jsx)("div",{children:(0,b.jsx)("small",{className:"text-muted",children:"Accepted file types: .jpg, .jpeg, .png, .svg, .webp, .gif"})}),(0,b.jsx)("div",{children:(0,b.jsx)("small",{className:"",children:"Dimensions should be 1:1 "})})]}),(0,b.jsxs)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:[(0,b.jsx)(v.A,{labelText:"Image4",nameText:"image4",accepts:{"image/*":[".png",".jpeg",".jpg",".svg",".webp",".gif"]},touched:n,errors:r,setFieldValue:j,handleFileChange:e=>{(e=>{M(e)})(e)}}),(0,b.jsx)(f.A,{image:Y,valueImage:l.image4}),(0,b.jsx)("div",{children:(0,b.jsx)("small",{className:"text-muted",children:"Accepted file types: .jpg, .jpeg, .png, .svg, .webp, .gif"})}),(0,b.jsx)("div",{children:(0,b.jsx)("small",{className:"",children:"Dimensions should be 1:1 "})})]}),(0,b.jsxs)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:[(0,b.jsx)(v.A,{labelText:"Image5",nameText:"image5",accepts:{"image/*":[".png",".jpeg",".jpg",".svg",".webp",".gif"]},touched:n,errors:r,setFieldValue:j,handleFileChange:e=>{(e=>{R(e)})(e)}}),(0,b.jsx)(f.A,{image:k,valueImage:l.image5}),(0,b.jsx)("div",{children:(0,b.jsx)("small",{className:"text-muted",children:"Accepted file types: .jpg, .jpeg, .png, .svg, .webp, .gif"})}),(0,b.jsx)("div",{children:(0,b.jsx)("small",{className:"",children:"Dimensions should be 1:1 "})})]})]}),(0,b.jsxs)(o.A,{className:"m-1 p-4 d-flex flex-wrap flex-column shadow rounded bg-white",children:[(0,b.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,b.jsx)(p.A,{label:"storage",type:"",name:"storage",placeholder:"Enter the storage here",className:"form-control ".concat(n.storage&&r.storage?"is-invalid":""),onChange:e=>{L(e.target.value),d(e)},onBlur:c,validation:n.storage&&r.storage?(0,b.jsx)("p",{className:"text-danger",children:r.storage}):""})}),(0,b.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,b.jsx)(p.A,{label:"Color",type:"",name:"color",placeholder:"Enter the color here",className:"form-control ".concat(n.color&&r.color?"is-invalid":""),onChange:e=>{O(e.target.value),d(e)},onBlur:c,validation:n.color&&r.color?(0,b.jsx)("p",{className:"text-danger",children:r.color}):""})}),(0,b.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,b.jsx)(p.A,{label:"processor",type:"",name:"processor",placeholder:"Enter the processor here",className:"form-control ".concat(n.processor&&r.processor?"is-invalid":""),onChange:e=>{C(e.target.value),d(e)},onBlur:c,validation:n.processor&&r.processor?(0,b.jsx)("p",{className:"text-danger",children:r.processor}):""})}),(0,b.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,b.jsx)(p.A,{label:"Ram",type:"",name:"ram",placeholder:"Enter the ram here",className:"form-control ".concat(n.ram&&r.ram?"is-invalid":""),onChange:e=>{q(e.target.value),d(e)},onBlur:c,validation:n.ram&&r.ram?(0,b.jsx)("p",{className:"text-danger",children:r.ram}):""})}),(0,b.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,b.jsx)(p.A,{label:"Screen Size",type:"",name:"screenSize",placeholder:"Enter the screen size here",className:"form-control ".concat(n.screenSize&&r.screenSize?"is-invalid":""),onChange:e=>{Z(e.target.value),d(e)},onBlur:c,validation:n.screenSize&&r.screenSize?(0,b.jsx)("p",{className:"text-danger",children:r.screenSize}):""})}),(0,b.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,b.jsx)(p.A,{label:"operatingSystem",type:"",name:"operatingSystem",placeholder:"Enter the operating system here",className:"form-control ".concat(n.operatingSystem&&r.operatingSystem?"is-invalid":""),onChange:e=>{U(e.target.value),d(e)},onBlur:c,validation:n.operatingSystem&&r.operatingSystem?(0,b.jsx)("p",{className:"text-danger",children:r.operatingSystem}):""})}),(0,b.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,b.jsx)(x.A,{label:"Description",type:"textarea",name:"description",placeholder:"Enter the description here",className:"form-control ".concat(n.description&&r.description?"is-invalid":""),onChange:e=>{_(e.target.value),d(e)},onBlur:c,validation:n.description&&r.description?(0,b.jsx)("p",{className:"text-danger",children:r.description}):""})})]})]}),(0,b.jsxs)(t.A,{className:"d-sm-flex d-flex d-md-flex d-lg-none d-xxl-none d-xl-none flex-row justify-content-between align-items-center",children:[(0,b.jsx)(o.A,{className:"d-flex justify-content-start align-items-center",children:(0,b.jsx)(g.A,{className:"m-1",variant:"secondary",onClick:W,label:"Cancel"})}),(0,b.jsx)(o.A,{className:"d-flex justify-content-end align-items-center",children:(0,b.jsx)(g.A,{className:"m-1",label:"Save",type:"submit",isLoading:K,loaderVariant:"info",disabled:u,onClick:""===s||""===N||""===S||""===w||""===E||""===G||""===P||""===V||""===F||""===T||""===z||""===Y||""===k||n.brand&&r.brand||n.model&&r.model||n.processor&&r.processor||n.ram&&r.ram||n.storage&&r.storage||n.color&&r.color||n.operatingSystem&&r.operatingSystem||n.description&&r.description||n.image1&&r.image1||n.image2&&r.image2||n.image3&&r.image3||n.image4&&r.image4||n.image5&&r.image5?h:$})})]})]})})}})})})}},11961:(e,a,s)=>{s.d(a,{m:()=>r});var l=s(80899);const r=l.Ik().shape({amountFor6Months:l.Yj().required("Amount For 6 Months is required"),brand:l.Yj().required("Brand is required"),model:l.Yj().required("Model is required"),processor:l.Yj().required("Processor is required"),image1:l.gl().required("Image1 is required").test("fileType","Invalid file format",(e=>e&&["image/jpeg","image/png"].includes(e.type))),image2:l.gl().required("Image2 is required").test("fileType","Invalid file format",(e=>e&&["image/jpeg","image/png"].includes(e.type))),image3:l.gl().required("Image3 is required").test("fileType","Invalid file format",(e=>e&&["image/jpeg","image/png"].includes(e.type))),image4:l.gl().required("Image4 is required").test("fileType","Invalid file format",(e=>e&&["image/jpeg","image/png"].includes(e.type))),image5:l.gl().required("Image5 is required").test("fileType","Invalid file format",(e=>e&&["image/jpeg","image/png"].includes(e.type))),ram:l.Yj().required("RAM is required"),screenSize:l.Yj().required("Screen Size is required"),storage:l.Yj().required("Storage is required"),color:l.Yj().required("Color is required"),operatingSystem:l.Yj().required("Operating System is required"),additionalinfo:l.Yj().required("Additional Info is required"),offer:l.Yj().required("Offer is required"),addInCarousel:l.Yj().required("Add In Carousel is required"),description:l.Yj().required("Description is required")})}}]);
//# sourceMappingURL=1567.407a089c.chunk.js.map