"use strict";(self.webpackChunklaptop_rental_web_app=self.webpackChunklaptop_rental_web_app||[]).push([[3062],{93779:(e,a,s)=>{s.d(a,{A:()=>d});s(65043);var l=s(94281),r=s(24522),t=s(75200),n=s(36653),i=s(63401),o=s(70579);const d=e=>{let{setFieldValue:a=(()=>{}),touched:s={},errors:d={},labelText:c="Upload Image",nameText:m="image",accepts:g={"image/*":[".png",".jpeg",".jpg",".svg",".webp",".gif"]},handleFileChange:p=null,disabled:x=!1}=e;const{getRootProps:u,getInputProps:h,isDragActive:j}=(0,l.VB)({accept:g||"",onDrop:e=>{const s=e[0],l=s.name.split(".").pop().toLowerCase();g["image/*"].map((e=>e.replace(".","").toLowerCase().trim())).includes(l)?(a(m,s),p&&p(s)):i.oR.warning("This file type not accepted",{autoClose:2e3,position:"bottom-center"})},onDropRejected:e=>{i.oR.warning("This file type not accepted",{autoClose:2e3,position:"bottom-center"})},disabled:x}),{color:v}=(0,n.D)();return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(r.A.Group,{children:[(0,o.jsxs)(r.A.Label,{children:[c," ",(0,o.jsx)("span",{className:"text-danger"})]}),(0,o.jsxs)("div",{...u(),className:"form-control dropzone ".concat(j?"active":""," ").concat(s[m]&&d[m]?"is-invalid":""),style:{border:"2px dashed #ced4da",padding:"20px",textAlign:"center",borderRadius:"5px",cursor:x?"not-allowed":"pointer",background:j?"#f8f9fa":"transparent"},children:[(0,o.jsx)("input",{...h(),disabled:x}),j?(0,o.jsx)("p",{children:"Drop the files here..."}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.YoE,{size:50,color:v}),(0,o.jsx)("p",{children:"Drag & drop an image here, or click to select one"})]})]}),s[m]&&d[m]&&(0,o.jsx)("p",{className:"text-danger",children:d[m]})]})})}},24796:(e,a,s)=>{s.d(a,{A:()=>r});s(65043);var l=s(70579);const r=e=>{let{image:a,valueImage:s}=e;const r=a&&(!Array.isArray(a)||a.length>0),t=s!==a?a:a instanceof File?URL.createObjectURL(a):a;return(0,l.jsx)(l.Fragment,{children:r?(0,l.jsx)("img",{src:t,width:100,height:70,alt:"image",className:"mt-3",style:{objectFit:"contain"}}):(0,l.jsx)(l.Fragment,{})})}},97355:(e,a,s)=>{s.d(a,{A:()=>t});s(65043);var l=s(24522),r=s(70579);const t=e=>{const{label:a,rows:s,type:t,name:n,value:i,onChange:o,htmlFor:d,validation:c,className:m,lg:g,md:p,xxl:x,xl:u,sm:h,placeholder:j,star:v}=e;return(0,r.jsxs)(l.A.Group,{controlId:"formBasicTextArea",children:[(0,r.jsxs)(l.A.Label,{htmlFor:d,children:[a,(0,r.jsx)("span",{className:"text-danger ".concat("none"===v?"d-".concat(v):""),children:"*"})," "]}),(0,r.jsx)(l.A.Control,{as:"textarea",name:n,rows:s,value:i,type:t,placeholder:j,onChange:o,className:m,lg:g,md:p,xxl:x,xl:u,sm:h}),c]})}},13256:(e,a,s)=>{s.d(a,{A:()=>t});s(65043);var l=s(24522),r=s(70579);const t=e=>{const{label:a,name:s,id:t,type:n,placeholder:i,htmlFor:o,lableClassName:d,value:c,onChange:m,onBlur:g,disabled:p,className:x,lg:u,md:h,xxl:j,xl:v,sm:f,validation:A,star:b,ref:N,accept:y}=e;return(0,r.jsxs)(l.A.Group,{children:[(0,r.jsxs)(l.A.Label,{htmlFor:o,className:d,children:[a,(0,r.jsx)("span",{className:"text-danger ".concat("none"===b?"d-".concat(b):""),children:"*"})]}),(0,r.jsx)(l.A.Control,{name:s,id:t,type:n,placeholder:i,value:c,onChange:m,onBlur:g,disabled:p,className:x,lg:u,md:h,xxl:j,xl:v,sm:f,ref:N,accept:null!==y&&void 0!==y?y:""}),A]})}},3062:(e,a,s)=>{s.r(a),s.d(a,{default:()=>b});var l=s(65043),r=s(867),t=s(53519),n=s(24522),i=s(61072),o=s(78602),d=s(11961),c=s(73216),m=s(3825),g=s(4207),p=s(97355),x=s(13256),u=s(45680),h=s(63401),j=s(32479),v=s(24796),f=s(93779),A=s(70579);const b=()=>{const[e,a]=(0,l.useState)(""),[s,b]=(0,l.useState)(""),[N,y]=(0,l.useState)(""),[C,S]=(0,l.useState)(""),[I,w]=(0,l.useState)(""),[F,q]=(0,l.useState)(""),[T,B]=(0,l.useState)(""),[z,M]=(0,l.useState)(""),[k,Y]=(0,l.useState)(""),[D,E]=(0,l.useState)(""),[R,L]=(0,l.useState)(""),[V,_]=(0,l.useState)(""),[O,U]=(0,l.useState)(""),[G,P]=(0,l.useState)(""),[Z,W]=(0,l.useState)(""),[X,H]=(0,l.useState)(""),[J,K]=(0,l.useState)(""),Q=(0,j.L)(),{id:$}=(0,c.g)(),ee=$.startsWith(":")?$.slice(1):$,[ae,{isLoading:se}]=(0,u.Z2)(),{data:le}=(0,u.gI)({id:ee,role:Q}),re=(0,c.Zp)(),te=()=>{re("/admin/rental")};(0,l.useEffect)((()=>{le&&le.data&&(a(le.data.amountFor6Months),b(le.data.brand),y(le.data.model),S(le.data.processor),w(le.data.ram),q(le.data.screenSize),B(le.data.storage),M(le.data.color),Y(le.data.operatingSystem),L(le.data.addInCarousel),E(le.data.description),_(le.data.status),U(le.data.image),Array.isArray(le.data.images)&&(P(le.data.images[0]),W(le.data.images[1]),H(le.data.images[2]),K(le.data.images[3])))}),[le]);const ne=async()=>{try{const r=new FormData;r.append("amountFor6Months",e),r.append("brand",s),r.append("model",N),r.append("processor",C),r.append("ram",I),r.append("screenSize",F),r.append("storage",T),r.append("color",z),r.append("operatingSystem",k),r.append("description",D),r.append("status",V),r.append("image1",O),r.append("image2",G),r.append("image3",Z),r.append("image4",X),r.append("image5",J),r.append("addInCarousel",String(R));const t=await ae({id:ee,role:Q,data:r});var a,l;if(null!==t&&void 0!==t&&t.data)h.oR.success(t.data.message,{autoClose:1e3}),re("/admin/rental");else h.oR.error(null===(a=t.error)||void 0===a||null===(l=a.data)||void 0===l?void 0:l.error,{autoClose:1e3})}catch(r){console.error(r)}};return(0,A.jsx)("div",{children:(0,A.jsx)(t.A,{fluid:!0,className:"",children:(0,A.jsx)(r.l1,{initialValues:{amountFor6Months:"",brand:"",model:"",processor:"",ram:"",screenSize:"",storage:"",color:"",operatingSystem:"",description:"",status:"",image1:"",image2:"",image3:"",image4:"",image5:"",addInCarousel:""},validationSchema:d.m,onSubmit:ne,children:l=>{let{values:r,errors:t,touched:c,handleChange:u,handleBlur:j,handleSubmit:Q,isSubmitting:$,setFieldValue:ee}=l;return(0,A.jsx)(A.Fragment,{children:(0,A.jsxs)(n.A,{children:[(0,A.jsxs)(i.A,{className:"d-flex flex-row justify-content-between align-items-center mt-3",children:[(0,A.jsxs)(o.A,{className:"d-flex justify-content-start mb-3",children:[(0,A.jsx)("h4",{onClick:te,className:"mx-2",children:(0,A.jsx)(m.nXt,{})}),(0,A.jsx)("h4",{children:"Edit Rental"})]}),(0,A.jsxs)(o.A,{className:"d-sm-none d-none d-md-none d-lg-flex d-xxl-flex d-xl-flex flex-row justify-content-end align-items-center",children:[(0,A.jsx)(g.A,{className:"m-1",variant:"secondary",onClick:te,label:"Cancel"}),(0,A.jsx)(g.A,{className:"m-1",label:"Update",type:"button",isLoading:se,loaderVariant:"info",disabled:$,onClick:async()=>{try{const a=Object.keys(c);for(const l of a)await d.m.validateAt(l,{amountFor6Months:e,brand:s,model:N,processor:C,ram:I,screenSize:F,storage:T,color:z,operatingSystem:k,addInCarousel:R,description:D,status:V,image1:O,image2:G,image3:Z,image4:X,image5:J});ne()}catch(a){h.oR.error(a.message,{autoClose:1e3})}}})]})]}),(0,A.jsxs)(i.A,{className:"d-flex flex-wrap flex-lg-row flex-xxl-row flex-xl-row flex-column flex-md-column flex-sm-column  mt-4",children:[(0,A.jsxs)(o.A,{className:"m-1 p-4 d-flex flex-wrap flex-column shadow rounded bg-white",children:[(0,A.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,A.jsx)(x.A,{label:"Amount For 6 Months",type:"",name:"amountFor6Months",placeholder:"Enter the amount here",value:e,className:"form-control ".concat(c.amountFor6Months&&t.amountFor6Months?"is-invalid":""),onChange:e=>{a(e.target.value),u(e)},onBlur:j,validation:c.amountFor6Months&&t.amountFor6Months?(0,A.jsx)("p",{className:"text-danger",children:t.amountFor6Months}):""})}),(0,A.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,A.jsx)(x.A,{label:"Brand",type:"",name:"brand",placeholder:"Enter the brand here",value:s,className:"form-control ".concat(c.brand&&t.brand?"is-invalid":""),onChange:e=>{b(e.target.value),u(e)},onBlur:j,validation:c.brand&&t.brand?(0,A.jsx)("p",{className:"text-danger",children:t.brand}):""})}),(0,A.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,A.jsx)(x.A,{label:"Model",type:"",name:"model",placeholder:"Enter the model here",value:N,className:"form-control ".concat(c.model&&t.model?"is-invalid":""),onChange:e=>{y(e.target.value),u(e)},onBlur:j,validation:c.model&&t.model?(0,A.jsx)("p",{className:"text-danger",children:t.model}):""})}),(0,A.jsxs)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:[(0,A.jsx)(f.A,{labelText:"Image1",nameText:"image1",accepts:{"image/*":[".png",".jpeg",".jpg",".svg",".webp",".gif"]},touched:c,errors:t,setFieldValue:ee,handleFileChange:e=>{(e=>{U(e)})(e)}}),(0,A.jsx)("div",{children:(0,A.jsx)("small",{className:"text-muted",children:"Accepted file types: .jpg, .jpeg, .png, .svg, .webp, .gif"})}),(0,A.jsx)("div",{children:(0,A.jsx)("small",{className:"",children:"Dimensions should be 1:1 "})}),(0,A.jsx)(v.A,{image:O,valueImage:r.image1})]}),(0,A.jsxs)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:[(0,A.jsx)(f.A,{labelText:"Image2",nameText:"image2",accepts:{"image/*":[".png",".jpeg",".jpg",".svg",".webp",".gif"]},touched:c,errors:t,setFieldValue:ee,handleFileChange:e=>{(e=>{P(e)})(e)}}),(0,A.jsx)("div",{children:(0,A.jsx)("small",{className:"text-muted",children:"Accepted file types: .jpg, .jpeg, .png, .svg, .webp, .gif"})}),(0,A.jsx)("div",{children:(0,A.jsx)("small",{className:"",children:"Dimensions should be 1:1 "})}),(0,A.jsx)(v.A,{image:G,valueImage:r.image2})]}),(0,A.jsxs)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:[(0,A.jsx)(f.A,{labelText:"Image3",nameText:"image3",accepts:{"image/*":[".png",".jpeg",".jpg",".svg",".webp",".gif"]},touched:c,errors:t,setFieldValue:ee,handleFileChange:e=>{(e=>{W(e)})(e)}}),(0,A.jsx)("div",{children:(0,A.jsx)("small",{className:"text-muted",children:"Accepted file types: .jpg, .jpeg, .png, .svg, .webp, .gif"})}),(0,A.jsx)("div",{children:(0,A.jsx)("small",{className:"",children:"Dimensions should be 1:1 "})}),(0,A.jsx)(v.A,{image:Z,valueImage:r.image3})]}),(0,A.jsxs)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:[(0,A.jsx)(f.A,{labelText:"Image4",nameText:"image4",accepts:{"image/*":[".png",".jpeg",".jpg",".svg",".webp",".gif"]},touched:c,errors:t,setFieldValue:ee,handleFileChange:e=>{(e=>{H(e)})(e)}}),(0,A.jsx)("div",{children:(0,A.jsx)("small",{className:"text-muted",children:"Accepted file types: .jpg, .jpeg, .png, .svg, .webp, .gif"})}),(0,A.jsx)("div",{children:(0,A.jsx)("small",{className:"",children:"Dimensions should be 1:1 "})}),(0,A.jsx)(v.A,{image:X,valueImage:r.image4})]}),(0,A.jsxs)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:[(0,A.jsx)(f.A,{labelText:"Image5",nameText:"image5",accepts:{"image/*":[".png",".jpeg",".jpg",".svg",".webp",".gif"]},touched:c,errors:t,setFieldValue:ee,handleFileChange:e=>{(e=>{K(e)})(e)}}),(0,A.jsx)("div",{children:(0,A.jsx)("small",{className:"text-muted",children:"Accepted file types: .jpg, .jpeg, .png, .svg, .webp, .gif"})}),(0,A.jsx)("div",{children:(0,A.jsx)("small",{className:"",children:"Dimensions should be 1:1 "})}),(0,A.jsx)(v.A,{image:J,valueImage:r.image5})]}),(0,A.jsxs)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:[(0,A.jsx)("label",{htmlFor:"addInCarousel",className:"mb-2",children:"Add In Carousel"}),(0,A.jsxs)(n.A.Select,{name:"addInCarousel",id:"addInCarousel",value:R,className:"form-control ".concat(c.addInCarousel&&t.addInCarousel?"is-invalid":""," mt-2"),onChange:e=>{L(e.target.value),u(e)},onBlur:j,children:[(0,A.jsx)("option",{value:"",children:"Select an option"}),(0,A.jsx)("option",{value:"true",children:"Yes"}),(0,A.jsx)("option",{value:"false",children:"No"})]}),c.addInCarousel&&t.addInCarousel&&(0,A.jsx)("p",{className:"text-danger",children:t.addInCarousel})]})]}),(0,A.jsxs)(o.A,{className:"m-1 p-4 d-flex flex-wrap flex-column shadow rounded bg-white",children:[(0,A.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,A.jsx)(x.A,{label:"storage",type:"",name:"storage",placeholder:"Enter the storage here",value:T,className:"form-control ".concat(c.storage&&t.storage?"is-invalid":""),onChange:e=>{B(e.target.value),u(e)},onBlur:j,validation:c.storage&&t.storage?(0,A.jsx)("p",{className:"text-danger",children:t.storage}):""})}),(0,A.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,A.jsx)(x.A,{label:"Color",type:"",name:"color",placeholder:"Enter the color here",value:z,className:"form-control ".concat(c.color&&t.color?"is-invalid":""),onChange:e=>{M(e.target.value),u(e)},onBlur:j,validation:c.color&&t.color?(0,A.jsx)("p",{className:"text-danger",children:t.color}):""})}),(0,A.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,A.jsx)(x.A,{label:"processor",type:"",name:"processor",placeholder:"Enter the processor here",value:C,className:"form-control ".concat(c.processor&&t.processor?"is-invalid":""),onChange:e=>{S(e.target.value),u(e)},onBlur:j,validation:c.processor&&t.processor?(0,A.jsx)("p",{className:"text-danger",children:t.processor}):""})}),(0,A.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,A.jsx)(x.A,{label:"Ram",type:"",name:"ram",placeholder:"Enter the ram here",value:I,className:"form-control ".concat(c.ram&&t.ram?"is-invalid":""),onChange:e=>{w(e.target.value),u(e)},onBlur:j,validation:c.ram&&t.ram?(0,A.jsx)("p",{className:"text-danger",children:t.ram}):""})}),(0,A.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,A.jsx)(x.A,{label:"Screen Size",type:"",name:"screenSize",placeholder:"Enter the screen size here",value:F,className:"form-control ".concat(c.screenSize&&t.screenSize?"is-invalid":""),onChange:e=>{q(e.target.value),u(e)},onBlur:j,validation:c.screenSize&&t.screenSize?(0,A.jsx)("p",{className:"text-danger",children:t.screenSize}):""})}),(0,A.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,A.jsx)(x.A,{label:"operatingSystem",type:"",name:"operatingSystem",placeholder:"Enter the operating system here",value:k,className:"form-control ".concat(c.operatingSystem&&t.operatingSystem?"is-invalid":""),onChange:e=>{Y(e.target.value),u(e)},onBlur:j,validation:c.operatingSystem&&t.operatingSystem?(0,A.jsx)("p",{className:"text-danger",children:t.operatingSystem}):""})}),(0,A.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,A.jsxs)(n.A.Group,{controlId:"status",children:[(0,A.jsx)(n.A.Label,{children:"Status"}),(0,A.jsxs)(n.A.Select,{name:"status",value:V,placeholder:"Enter the status here",className:c.status&&t.status?"is-invalid":"",onChange:e=>{_(e.target.value),u(e)},onBlur:j,children:[(0,A.jsx)("option",{value:"",children:"Select Status"}),(0,A.jsx)("option",{value:"Active",children:"Active"}),(0,A.jsx)("option",{value:"Inactive",children:"InActive"})]}),c.status&&t.status?(0,A.jsx)(n.A.Control.Feedback,{type:"invalid",children:t.status}):null]})}),(0,A.jsx)(o.A,{className:"m-2",lg:"12",xxl:"12",xl:"12",md:"12",sm:"12",children:(0,A.jsx)(p.A,{label:"Description",type:"textarea",name:"description",placeholder:"Enter the description here",value:D,className:"form-control ".concat(c.description&&t.description?"is-invalid":""),onChange:e=>{E(e.target.value),u(e)},onBlur:j,validation:c.description&&t.description?(0,A.jsx)("p",{className:"text-danger",children:t.description}):""})})]})]}),(0,A.jsxs)(i.A,{className:" mt-3  d-sm-flex d-flex d-md-flex d-lg-none d-xxl-none d-xl-none flex-row justify-content-between align-items-center mt-3",children:[(0,A.jsx)(o.A,{className:"d-flex justify-content-start align-items-center",children:(0,A.jsx)(g.A,{className:"m-1",variant:"secondary",onClick:te,label:"Cancel"})}),(0,A.jsx)(o.A,{className:"d-flex justify-content-end align-items-center",children:(0,A.jsx)(g.A,{className:"m-1",label:"Update",type:"button",isLoading:se,loaderVariant:"info",disabled:$,onClick:async()=>{try{const a=Object.keys(c);for(const l of a)await d.m.validateAt(l,{amountFor6Months:e,brand:s,model:N,processor:C,ram:I,screenSize:F,storage:T,color:z,operatingSystem:k,addInCarousel:R,description:D,status:V,image1:O,image2:G,image3:Z,image4:X,image5:J});ne()}catch(a){h.oR.error(a.message,{autoClose:1e3})}}})})]})]})})}})})})}},11961:(e,a,s)=>{s.d(a,{m:()=>r});var l=s(80899);const r=l.Ik().shape({amountFor6Months:l.Yj().required("Amount For 6 Months is required"),brand:l.Yj().required("Brand is required"),model:l.Yj().required("Model is required"),processor:l.Yj().required("Processor is required"),image1:l.gl().required("Image1 is required").test("fileType","Invalid file format",(e=>e&&["image/jpeg","image/png"].includes(e.type))),image2:l.gl().required("Image2 is required").test("fileType","Invalid file format",(e=>e&&["image/jpeg","image/png"].includes(e.type))),image3:l.gl().required("Image3 is required").test("fileType","Invalid file format",(e=>e&&["image/jpeg","image/png"].includes(e.type))),image4:l.gl().required("Image4 is required").test("fileType","Invalid file format",(e=>e&&["image/jpeg","image/png"].includes(e.type))),image5:l.gl().required("Image5 is required").test("fileType","Invalid file format",(e=>e&&["image/jpeg","image/png"].includes(e.type))),ram:l.Yj().required("RAM is required"),screenSize:l.Yj().required("Screen Size is required"),storage:l.Yj().required("Storage is required"),color:l.Yj().required("Color is required"),operatingSystem:l.Yj().required("Operating System is required"),additionalinfo:l.Yj().required("Additional Info is required"),offer:l.Yj().required("Offer is required"),addInCarousel:l.Yj().required("Add In Carousel is required"),description:l.Yj().required("Description is required")})}}]);
//# sourceMappingURL=3062.c69e925f.chunk.js.map