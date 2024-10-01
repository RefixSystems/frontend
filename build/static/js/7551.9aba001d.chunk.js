"use strict";(self.webpackChunklaptop_rental_web_app=self.webpackChunklaptop_rental_web_app||[]).push([[7551],{18066:(e,t,s)=>{s.d(t,{A:()=>c});s(65043);var a=s(94281),n=s(24522),l=s(75200),o=s(36653),r=s(63401),i=s(70579);const c=e=>{let{setFieldValue:t=(()=>{}),touched:s={},errors:c={},labelText:d="Upload File",nameText:u="file",accepts:m={"image/*":[".png",".jpeg",".jpg",".svg",".webp",".gif"],"video/*":[".mp4",".avi",".mov",".mkv"]},handleFileChange:p=null,disabled:h=!1}=e;const{getRootProps:x,getInputProps:g,isDragActive:v}=(0,a.VB)({accept:m||"",onDrop:e=>{const s=e[0],a=s.name.split(".").pop().toLowerCase();[...m["image/*"],...m["video/*"]].map((e=>e.replace(".","").toLowerCase().trim())).includes(a)?(t(u,s),p&&p(s)):r.oR.warning("This file type is not accepted",{autoClose:2e3,position:"bottom-center"})},onDropRejected:e=>{r.oR.warning("This file type is not accepted",{autoClose:2e3,position:"bottom-center"})},disabled:h}),{color:j}=(0,o.D)();return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)(n.A.Group,{children:[(0,i.jsxs)(n.A.Label,{children:[d," ",(0,i.jsx)("span",{className:"text-danger"})]}),(0,i.jsxs)("div",{...x(),className:"form-control dropzone ".concat(v?"active":""," ").concat(s[u]&&c[u]?"is-invalid":""),style:{border:"2px dashed #ced4da",padding:"20px",textAlign:"center",borderRadius:"5px",cursor:h?"not-allowed":"pointer",background:v?"#f8f9fa":"transparent"},children:[(0,i.jsx)("input",{...g(),disabled:h}),v?(0,i.jsx)("p",{children:"Drop the files here..."}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(l.YoE,{size:50,color:j}),(0,i.jsx)("p",{children:"Drag & drop an image or video here, or click to select one"})]})]}),s[u]&&c[u]&&(0,i.jsx)("p",{className:"text-danger",children:c[u]})]})})}},21120:(e,t,s)=>{s.d(t,{A:()=>n});s(65043);var a=s(70579);const n=e=>{let{image:t,valueImage:s}=e;const n=t&&(!Array.isArray(t)||t.length>0),l=s!==t?t:t instanceof File?URL.createObjectURL(t):t,o=t instanceof File&&["video/mp4","video/avi","video/mov","video/mkv"].includes(t.type);return(0,a.jsx)(a.Fragment,{children:n?o?(0,a.jsxs)("video",{width:100,height:70,controls:!0,className:"mt-3",style:{objectFit:"contain"},children:[(0,a.jsx)("source",{src:l,type:t.type}),"Your browser does not support the video tag."]}):(0,a.jsx)("img",{src:l,width:100,height:70,alt:"image",className:"mt-3",style:{objectFit:"contain"}}):(0,a.jsx)(a.Fragment,{})})}},98954:(e,t,s)=>{s.d(t,{A:()=>j});var a=s(65043),n=s(71094),l=s(53519),o=s(61072),r=s(64196),i=s(78602),c=s(14282),d=s(49804),u=s(60184),m=s(3825),p=s(92157),h=s.n(p),x=s(13441),g=(s(39585),s(36653)),v=s(70579);const j=e=>{const{color:t}=(0,g.D)(),s=(0,a.useMemo)((()=>e.COLUMNS),[e.COLUMNS]),p=(0,a.useMemo)((()=>e.MOCK_DATA||[]),[e.MOCK_DATA]),{getTableProps:j,getTableBodyProps:f,headerGroups:y,prepareRow:C,page:A}=(0,n.useTable)({columns:s,data:p,autoResetWidth:!1},n.useGlobalFilter,n.useSortBy,n.usePagination);return(0,v.jsx)("div",{children:(0,v.jsx)(l.A,{fluid:!0,className:"ml-xxl-n4 ml-xl-n4 ml-lg-n4",children:(0,v.jsxs)(o.A,{children:[(0,v.jsxs)(r.A,{className:"justify-content-center align-items-center",striped:!0,hover:!0,...j(),responsive:!0,style:{width:"100%",marginLeft:"25px"},children:[(0,v.jsx)("thead",{children:y.map(((e,t)=>(0,a.createElement)("tr",{...e.getHeaderGroupProps(),key:t},e.headers.map(((e,t)=>(0,a.createElement)("th",{...e.getHeaderProps(),key:t,className:"text-center text-dark",style:{width:"".concat(e.width,"px"),whiteSpace:"nowrap",justifyContent:"center",alignItems:"center"},onClick:t=>{t.target.classList.contains("fa-sort")||"ACTIONS"===e.render("Header")||e.toggleSortBy(!e.isSortedDesc)}},"ACTIONS"===e.render("Header")?(0,v.jsx)(v.Fragment,{children:e.render("Header")}):(0,v.jsxs)("div",{children:[e.render("Header"),(0,v.jsx)(u.MjW,{className:"mx-2"})]})))))))}),(0,v.jsx)("tbody",{...f(),children:A.length>0?A.map(((t,s)=>(C(t),(0,a.createElement)("tr",{...t.getRowProps(),key:s},t.cells.map(((t,n)=>{const l="action"===t.column.id||"localShop"===t.column.id||"serviceCenter"===t.column.id||"ourServices"===t.column.id||"addInCarousel"===t.column.id;return(0,a.createElement)("td",{...t.getCellProps(),key:n,className:"text-secondary text-start",style:{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",maxWidth:"20ch",backgroundColor:s<=e.count-1?"#cfd1d1":""}},l||t.value?t.render("Cell"):"-")})))))):(0,v.jsx)("tr",{children:(0,v.jsx)("td",{colSpan:s.length,className:"text-center text-dark",children:"No Data Found"})})})]}),(0,v.jsxs)(i.A,{className:"".concat(A.length>0?"d-flex":"d-none"," flex-row justify-content-center align-items-center"),children:[(0,v.jsx)(i.A,{className:"d-flex justify-content-start align-items-center flex-wrap",children:(0,v.jsxs)("span",{className:"m-1",children:["Showing","",(0,v.jsxs)("strong",{className:"m-2",children:[e.startIndex," to ",e.endIndex," of"," ",(0,v.jsxs)("strong",{className:"m-2",children:[" ",e.totalItems," entries"]})]})]})}),(0,v.jsx)(i.A,{className:" mt-3 d-none d-sm-none d-md-none d-xxl-flex d-xl-flex d-lg-flex justify-content-end align-items-center",children:(0,v.jsx)(h(),{breakLabel:"...",onPageChange:t=>e.setCurrentPage(t.selected+1),pageRangeDisplayed:5,pageCount:e.totalPages,renderOnZeroPageCount:null,activeClassName:"active",pageClassName:"page-item",pageLinkClassName:"page-link",previousClassName:"page-item",previousLinkClassName:"page-link",nextClassName:"page-item",nextLinkClassName:"page-link",containerClassName:"pagination",previousLabel:(0,v.jsx)(x.Vx.Provider,{value:{color:t,size:"28px"},children:(0,v.jsx)(m.dnY,{})}),nextLabel:(0,v.jsx)(x.Vx.Provider,{value:{color:t,size:"28px"},children:(0,v.jsx)(m.m2f,{})})})}),(0,v.jsxs)(i.A,{className:"d-flex d-sm-flex d-md-flex d-xxl-none d-xl-none d-lg-none justify-content-end align-items-center",children:[(0,v.jsx)(c.A,{style:{backgroundColor:t,border:"none"},onClick:()=>e.setCurrentPage(e.currentPage-1),disabled:1===e.currentPage,className:"m-2",children:(0,v.jsx)(d.o_z,{size:14})}),(0,v.jsx)(c.A,{style:{backgroundColor:t,border:"none"},onClick:()=>{e.setCurrentPage(e.currentPage+1)},disabled:e.currentPage===e.totalPages,children:(0,v.jsx)(d.hdn,{size:14})})]})]})]})})})}},67551:(e,t,s)=>{s.r(t),s.d(t,{default:()=>L});var a=s(65043),n=s(14282),l=s(53519),o=s(61072),r=s(78602),i=s(27417),c=s(25284),d=s(24522),u=s(47994),m=s(98954),p=s(46107),h=s(31462),x=s(63401),g=s(60184),v=s(36017),j=s(6720),f=s(73216),y=s(8104),C=s(32479),A=s(39110),w=s(2519),b=s(17962),N=s(36653),S=s(31121),k=s(18066),I=s(21120),P=s(85959),R=s(33056),_=s(70579);const L=()=>{const{color:e}=(0,N.D)(),[t,s]=(0,a.useState)([]),[L,F]=(0,a.useState)(1),[T,E]=(0,a.useState)(1),[M,G]=(0,a.useState)(1),[V,H]=(0,a.useState)(1),[D,z]=(0,a.useState)(),[O,W]=(0,a.useState)(""),[B,U]=(0,a.useState)(""),[Y,K]=(0,a.useState)(!1),{id:q}=(0,f.g)(),[J,Z]=(0,a.useState)(null),[X,Q]=(0,a.useState)(!1),[$,ee]=(0,a.useState)(""),[te,se]=(0,a.useState)(""),[ae,ne]=(0,a.useState)(!1),[le,oe]=(0,a.useState)(!1),[re,ie]=(0,a.useState)(""),ce=e=>(0,S.GP)(new Date(e),"dd-MMM-yyyy h:mm a"),de=(0,C.L)(),ue=(0,R.O)(),{data:me,isLoading:pe,isError:he,error:xe,refetch:ge}=(0,p.N7)({page:L,search:O,id:q,role:de,phoneNumber:ue}),[ve]=(0,p.sE)(),[je]=(0,p.Rv)(),[fe]=(0,p.yE)(),[ye,Ce]=(0,a.useState)(!1),[Ae,we]=(0,a.useState)(""),[be,Ne]=(0,a.useState)(""),[Se,ke]=(0,a.useState)(""),[Ie,Pe]=(0,a.useState)(""),[Re,_e]=(0,a.useState)(""),[Le,Fe]=(0,a.useState)(0),[Te,Ee]=(0,a.useState)(""),[Me,Ge]=(0,a.useState)({}),[Ve,He]=(0,a.useState)(!1),[De,ze]=(0,a.useState)(!1),[Oe,We]=(0,a.useState)(!1),[Be,Ue]=(0,a.useState)(0),[Ye,Ke]=(0,a.useState)(!1);(0,a.useEffect)((()=>{me&&me.data&&(s(me.data),E(me.pagination.startIndex),F(L),z(me.pagination.totalItems),G(me.pagination.endIndex),H(me.pagination.totalPages),We(me.moduleAccess.fullAccess),He(me.moduleAccess.write),ze(me.moduleAccess.read),Ue(me.generalReviewCount)),he&&500===(null===xe||void 0===xe?void 0:xe.status)?oe(!0):oe(!1)}),[me,L,de,xe,he]);const qe=()=>{K(!0),W(B),ge({page:L,search:B}).then((()=>{K(!1)}))},Je=()=>{Q(!1),Z(null),ee(""),se("")},Ze=()=>{Ce(!1),we(""),Ne(""),Fe(""),Ee("")},Xe=[{Header:"ID",accessor:"s_no"},{Header:"Profile Image",accessor:"profileImage",Cell:e=>{const t=e.value;return t?(0,_.jsx)("img",{src:t,alt:"Profile",style:{width:"50px",height:"50px",borderRadius:"100%"}}):(0,_.jsx)(b.qnL,{size:50})}},{Header:"Media",accessor:"images",Cell:e=>{const t=e.value;return(0,_.jsx)("div",{style:{display:"flex",alignItems:"center",overflowX:"auto"},children:Array.isArray(t)&&t.length>0?t.map(((e,t)=>e.endsWith(".mp4")||e.endsWith(".avi")||e.endsWith(".mov")||e.endsWith(".mkv")?(0,_.jsxs)("video",{width:50,height:50,controls:!0,style:{marginRight:"5px",objectFit:"cover"},children:[(0,_.jsx)("source",{src:e,type:"video/mp4"}),"Your browser does not support the video tag."]},t):(0,_.jsx)("img",{src:e,alt:"Media ".concat(t),style:{width:"50px",height:"50px",marginRight:"5px",objectFit:"cover"}},t))):(0,_.jsx)(j.lJy,{size:50})})}},{Header:"User Name",accessor:"userName"},{Header:"Phone Number",accessor:"phoneNumber"},{Header:"Rating",accessor:"rating"},{Header:"Review",accessor:"review"},{Header:"Show In HomePage",accessor:"showInHomePage"},{Header:"Status",accessor:"status"},{Header:"Created At",accessor:"createdAt",Cell:e=>{let{value:t}=e;return ce(t)}},{Header:"Updated At",accessor:"updatedAt",Cell:e=>{let{value:t}=e;return ce(t)}}];return Oe&&Xe.push({Header:"ACTIONS",accessor:"action",Cell:e=>{const s=e.row.original._id;return(0,_.jsxs)("div",{className:"d-flex align-items-center justify-content-center flex-row",children:[(0,_.jsx)(n.A,{variant:"warning",onClick:()=>(e=>{const s=t.find((t=>t._id===e));s&&(Z(e),ee(s.status),se(s.showInHomePage),Q(!0))})(s),children:(0,_.jsx)(g.uO9,{})}),(0,_.jsx)(n.A,{variant:"danger",className:"ms-2",onClick:()=>(e=>{ie(e),ne(!0)})(s),children:(0,_.jsx)(j.b6i,{})})]})}}),(0,_.jsxs)("div",{children:[pe?(0,_.jsx)(A.A,{}):(0,_.jsx)(_.Fragment,{children:le?(0,_.jsx)(P.A,{}):De?(0,_.jsxs)(l.A,{fluid:!0,className:"mt-3 ",children:[(0,_.jsx)(o.A,{className:"boxShadow p-4 mb-4 mt-4",children:(0,_.jsxs)(r.A,{className:"d-flex flex-row justify-content-between mt-1",children:[(0,_.jsx)("h4",{className:"fw-bold",children:"General Reviews"}),Ve?(0,_.jsx)("div",{children:(0,_.jsxs)(n.A,{style:{backgroundColor:e,border:"none"},className:"p-2 m-1",onClick:()=>{Ce(!0)},children:[(0,_.jsx)(g.OiG,{size:20}),(0,_.jsx)("span",{className:"d-none d-md-inline",children:" Add Review"})]})}):(0,_.jsx)(_.Fragment,{})]})}),(0,_.jsxs)(o.A,{className:"boxShadow p-3 mb-4  d-flex  flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row",children:[(0,_.jsx)(r.A,{className:"my-4 mx-2",xxl:3,xl:3,lg:3,sm:6,md:6,children:(0,_.jsxs)("div",{className:"input-group",children:[(0,_.jsx)("span",{className:"input-group-text",children:(0,_.jsx)(h.YQq,{})}),(0,_.jsx)("input",{type:"text",placeholder:"Search Reviews...",className:"form-control",value:B,onChange:e=>U(e.target.value),onKeyPress:e=>{"Enter"===e.key&&qe()}}),B&&(0,_.jsx)("span",{className:"input-group-text",onClick:()=>{U(""),W("")},children:(0,_.jsx)(h.IeJ,{})})]})}),(0,_.jsx)(r.A,{className:"d-flex flex-column text-center my-4",xxl:2,xl:2,lg:2,sm:3,md:3,children:(0,_.jsx)(n.A,{style:{backgroundColor:e,border:"none"},onClick:qe,disabled:Y||""===B,children:Y?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(i.A,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true",className:"me-2"}),"Searching..."]}):"Search"})})]}),(0,_.jsx)(o.A,{className:"boxShadow p-4 mb-4",children:(0,_.jsx)(m.A,{COLUMNS:Xe,MOCK_DATA:t,currentPage:L,startIndex:T,endIndex:M,setCurrentPage:F,totalItems:D,totalPages:V,count:Be})}),(0,_.jsx)(v.A,{YES:async()=>{try{const s=await je({id:re,role:de});var e,t;if(null!==s&&void 0!==s&&s.data)ne(!1),ie(""),ge(),x.oR.success(null===s||void 0===s||null===(e=s.data)||void 0===e?void 0:e.message,{autoClose:1e3});else x.oR.error(null===s||void 0===s||null===(t=s.error)||void 0===t?void 0:t.data.error,{autoClose:1e3})}catch(xe){console.error(xe)}},DELETESTATE:ae,ONCLICK:()=>{ne(!1)},DESCRIPTION:"Are you sure you want to delete this Review",DELETETITLE:"Review"})]}):(0,_.jsx)(w.A,{})}),(0,_.jsxs)(c.A,{show:X,onHide:Je,centered:!0,children:[(0,_.jsx)(c.A.Header,{closeButton:!0,children:(0,_.jsx)(c.A.Title,{children:"Edit Review"})}),(0,_.jsx)(c.A.Body,{children:(0,_.jsxs)(d.A,{children:[(0,_.jsxs)(d.A.Group,{controlId:"exampleForm.ControlSelect1",children:[(0,_.jsx)(d.A.Label,{children:"Status "}),(0,_.jsxs)(d.A.Select,{value:$,onChange:e=>{ee(e.target.value)},placeholder:"Enter the status here",children:[(0,_.jsx)("option",{value:"Pending",children:"Pending"}),(0,_.jsx)("option",{value:"Approved",children:"Approved"}),(0,_.jsx)("option",{value:"Rejected",children:"Rejected"})]})]}),(0,_.jsxs)(d.A.Group,{controlId:"exampleForm.ControlSelect1",className:"mt-3",children:[(0,_.jsx)(d.A.Label,{children:" ShowIn Home Page "}),(0,_.jsxs)(d.A.Select,{value:te,onChange:e=>{se(e.target.value)},placeholder:"Enter the showInHomePage here",children:[(0,_.jsx)("option",{value:"",children:"Select a option"}),(0,_.jsx)("option",{value:"yes",children:"Yes"}),(0,_.jsx)("option",{value:"no",children:"No"})]})]})]})}),(0,_.jsxs)(c.A.Footer,{children:[(0,_.jsx)(n.A,{variant:"secondary",onClick:Je,children:"Cancel"}),(0,_.jsx)(n.A,{style:{backgroundColor:e,border:"none"},onClick:async()=>{if($&&te){Ke(!0);try{const s=await ve({id:J,role:de,data:{status:$,showInHomePage:te}});var e,t;if(null!==s&&void 0!==s&&s.data)x.oR.success(null===s||void 0===s||null===(e=s.data)||void 0===e?void 0:e.message,{autoClose:1e3}),Je(),ge();else x.oR.error(null===s||void 0===s||null===(t=s.error)||void 0===t?void 0:t.data.error,{autoClose:1e3})}catch(xe){console.error(xe)}finally{Ke(!1)}}else x.oR.error("Please fill  the fields",{autoClose:1e3})},disabled:Ye,children:Ye?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(i.A,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true",className:"me-2"}),"Updating..."]}):"Update"})]})]}),(0,_.jsxs)(c.A,{show:ye,onHide:Ze,centered:!0,dialogClassName:"review-modal",children:[(0,_.jsx)(c.A.Header,{closeButton:!0,children:(0,_.jsx)(c.A.Title,{children:"Add Review"})}),(0,_.jsx)(c.A.Body,{children:(0,_.jsxs)(d.A,{children:[(0,_.jsxs)(d.A.Group,{className:"mb-3",children:[(0,_.jsxs)(d.A.Label,{children:["User Name ",(0,_.jsx)("span",{className:"text-danger",children:"*"})]}),(0,_.jsx)(d.A.Control,{type:"text",placeholder:"Enter the user name here",name:"userName",value:Ae,onChange:e=>we(e.target.value),isInvalid:!!Me.userName})]}),(0,_.jsxs)(d.A.Group,{className:"mb-3",children:[(0,_.jsxs)(d.A.Label,{children:["Phone Number ",(0,_.jsx)("span",{className:"text-danger",children:"*"})]}),(0,_.jsxs)(u.A,{children:[(0,_.jsx)(u.A.Text,{children:"+91"}),(0,_.jsx)(d.A.Control,{type:"text",placeholder:"Enter the phone number here",name:"phoneNumber",value:be,onChange:e=>{const t=e.target.value.replace(/[^0-9]/g,"").slice(0,10);Ne(t)},isInvalid:!!Me.phoneNumber})]})]}),(0,_.jsxs)(d.A.Group,{className:"mb-3",children:[(0,_.jsx)(d.A.Label,{children:"Rating"}),(0,_.jsx)(y.G,{ratingValue:Le,onClick:e=>{Fe(e)},size:30,stars:5})]}),(0,_.jsxs)(d.A.Group,{className:"mb-3",children:[(0,_.jsxs)(d.A.Label,{children:["Review ",(0,_.jsx)("span",{className:"text-danger",children:"*"})]}),(0,_.jsx)(d.A.Control,{as:"textarea",rows:3,name:"review",placeholder:"Enter the review here",value:Te,onChange:e=>Ee(e.target.value),isInvalid:!!Me.review})]}),(0,_.jsx)(k.A,{labelText:"Image1",accepts:{"image/*":[".png",".jpeg",".jpg",".svg",".webp"],"video/*":[".mp4",".avi",".mov",".mkv"]},handleFileChange:e=>{(e=>{ke(e)})(e)}}),(0,_.jsx)("div",{children:(0,_.jsx)("small",{className:"text-muted",children:"Accepted file types: .jpg , .jpeg, .png, .svg, .webp, .mp4, .avi, .mov, .mkv"})}),(0,_.jsx)("div",{children:(0,_.jsx)("small",{className:"",children:"Dimensions should be 1:1 "})}),(0,_.jsx)(I.A,{image:Se,valueImage:Se}),(0,_.jsx)(k.A,{labelText:"Image2",accepts:{"image/*":[".png",".jpeg",".jpg",".svg",".webp"],"video/*":[".mp4",".avi",".mov",".mkv"]},handleFileChange:e=>{(e=>{Pe(e)})(e)}}),(0,_.jsx)("div",{children:(0,_.jsx)("small",{className:"text-muted",children:"Accepted file types: .jpg , .jpeg, .png, .svg, .webp, .mp4, .avi, .mov, .mkv"})}),(0,_.jsx)("div",{children:(0,_.jsx)("small",{className:"",children:"Dimensions should be 1:1 "})}),(0,_.jsx)(I.A,{image:Ie,valueImage:Ie}),(0,_.jsx)(k.A,{labelText:"Image3",accepts:{"image/*":[".png",".jpeg",".jpg",".svg",".webp"],"video/*":[".mp4",".avi",".mov",".mkv"]},handleFileChange:e=>{(e=>{_e(e)})(e)}}),(0,_.jsx)("div",{children:(0,_.jsx)("small",{className:"text-muted",children:"Accepted file types: .jpg , .jpeg, .png, .svg, .webp, .mp4, .avi, .mov, .mkv"})}),(0,_.jsx)("div",{children:(0,_.jsx)("small",{className:"",children:"Dimensions should be 1:1 "})}),(0,_.jsx)(I.A,{image:Re,valueImage:Re})]})}),(0,_.jsxs)(c.A.Footer,{children:[(0,_.jsx)(n.A,{variant:"secondary",onClick:Ze,children:"Close"}),(0,_.jsx)(n.A,{variant:"primary",onClick:async()=>{if(Ae&&be&&Le&&Te)if(10===be.length)if(Te.length<100)x.oR.error("Review must be at least 100 characters",{autoClose:1e3});else{Ke(!0);try{const s=new FormData;s.append("userName",Ae),s.append("phoneNumber",be),s.append("rating",Le),s.append("review",Te),s.append("images",Se),s.append("images",Ie),s.append("images",Re);const a=await fe({role:de,data:s});var e,t;if(null!==a&&void 0!==a&&a.data)x.oR.success(null===a||void 0===a||null===(e=a.data)||void 0===e?void 0:e.message,{autoClose:1e3}),Ze(),ge(),we(""),Ne(""),Fe(""),Ee(""),ke(""),Pe(""),_e("");else x.oR.error(null===a||void 0===a||null===(t=a.error)||void 0===t?void 0:t.data.error,{autoClose:1e3}),we(""),Ne(""),Fe(""),Ee(""),ke(""),Pe(""),_e("")}catch(xe){console.error(xe)}finally{Ke(!1)}}else x.oR.error("Phone number must be exactly 10 digits",{autoClose:1e3});else x.oR.error("Please fill all the fields",{autoClose:1e3})},style:{backgroundColor:e,border:"none"},disabled:Ye,children:Ye?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(i.A,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true",className:"me-2"}),"Add Review..."]}):"Add Review"})]})]})]})}},8104:(e,t,s)=>{var a=s(70579),n=s(65043),l=function(){return l=Object.assign||function(e){for(var t,s=1,a=arguments.length;s<a;s++)for(var n in t=arguments[s])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},l.apply(this,arguments)};function o(e,t,s){if(s||2===arguments.length)for(var a,n=0,l=t.length;n<l;n++)!a&&n in t||(a||(a=Array.prototype.slice.call(t,0,n)),a[n]=t[n]);return e.concat(a||Array.prototype.slice.call(t))}function r(e){var t=e.size,s=void 0===t?25:t,n=e.SVGstrokeColor,o=void 0===n?"currentColor":n,r=e.SVGstorkeWidth,i=void 0===r?0:r,c=e.SVGclassName,d=void 0===c?"star-svg":c,u=e.SVGstyle;return a.jsx("svg",l({className:d,style:u,stroke:o,fill:"currentColor",strokeWidth:i,viewBox:"0 0 24 24",width:s,height:s,xmlns:"http://www.w3.org/2000/svg"},{children:a.jsx("path",{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"})}))}function i(e,t){switch(t.type){case"PointerMove":return l(l({},e),{hoverValue:t.payload,hoverIndex:t.index});case"PointerLeave":return l(l({},e),{ratingValue:e.ratingValue,hoverIndex:0,hoverValue:null});case"MouseClick":return l(l({},e),{valueIndex:e.hoverIndex,ratingValue:t.payload});default:return e}}function c(){return"undefined"!=typeof window&&window.matchMedia("(pointer: coarse)").matches||"ontouchstart"in window||"undefined"!=typeof navigator&&navigator.maxTouchPoints>0}!function(e,t){void 0===t&&(t={});var s=t.insertAt;if(e&&"undefined"!=typeof document){var a=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css","top"===s&&a.firstChild?a.insertBefore(n,a.firstChild):a.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}(".style-module_starRatingWrap__q-lJC{display:inline-block;touch-action:none}.style-module_simpleStarRating__nWUxf{display:inline-block;overflow:hidden;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle;white-space:nowrap}.style-module_fillIcons__6---A{display:inline-block;overflow:hidden;position:absolute;top:0;white-space:nowrap}.style-module_emptyIcons__Bg-FZ{display:inline-block}.style-module_tooltip__tKc3i{background-color:#333;border-radius:5px;color:#fff;display:inline-block;padding:5px 15px;vertical-align:middle}"),t.G=function(e){var t,s,d=e.onClick,u=e.onPointerMove,m=e.onPointerEnter,p=e.onPointerLeave,h=e.initialValue,x=void 0===h?0:h,g=e.iconsCount,v=void 0===g?5:g,j=e.size,f=void 0===j?40:j,y=e.readonly,C=void 0!==y&&y,A=e.rtl,w=void 0!==A&&A,b=e.customIcons,N=void 0===b?[]:b,S=e.allowFraction,k=void 0!==S&&S,I=e.style,P=e.className,R=void 0===P?"react-simple-star-rating":P,_=e.transition,L=void 0!==_&&_,F=e.allowHover,T=void 0===F||F,E=e.disableFillHover,M=void 0!==E&&E,G=e.fillIcon,V=void 0===G?null:G,H=e.fillColor,D=void 0===H?"#ffbc0b":H,z=e.fillColorArray,O=void 0===z?[]:z,W=e.fillStyle,B=e.fillClassName,U=void 0===B?"filled-icons":B,Y=e.emptyIcon,K=void 0===Y?null:Y,q=e.emptyColor,J=void 0===q?"#cccccc":q,Z=e.emptyStyle,X=e.emptyClassName,Q=void 0===X?"empty-icons":X,$=e.allowTitleTag,ee=void 0===$||$,te=e.showTooltip,se=void 0!==te&&te,ae=e.tooltipDefaultText,ne=void 0===ae?"Your Rate":ae,le=e.tooltipArray,oe=void 0===le?[]:le,re=e.tooltipStyle,ie=e.tooltipClassName,ce=void 0===ie?"react-simple-star-rating-tooltip":ie,de=e.SVGclassName,ue=void 0===de?"star-svg":de,me=e.titleSeparator,pe=void 0===me?"out of":me,he=e.SVGstyle,xe=e.SVGstorkeWidth,ge=void 0===xe?0:xe,ve=e.SVGstrokeColor,je=void 0===ve?"currentColor":ve,fe=n.useReducer(i,{hoverIndex:0,valueIndex:0,ratingValue:x,hoverValue:null}),ye=fe[0],Ce=ye.ratingValue,Ae=ye.hoverValue,we=ye.hoverIndex,be=ye.valueIndex,Ne=fe[1];n.useEffect((function(){x&&Ne({type:"MouseClick",payload:0})}),[x]);var Se=n.useMemo((function(){return k?2*v:v}),[k,v]),ke=n.useMemo((function(){return x>Se?0:k||Math.floor(x)===x?Math.round(x/v*100):2*Math.ceil(x)*10}),[k,x,v,Se]),Ie=n.useMemo((function(){return(k?2*x-1:x-1)||0}),[k,x]),Pe=n.useCallback((function(e){return v%2!=0?e/2/10:e*v/100}),[v]),Re=function(e){for(var t=e.clientX,s=e.currentTarget.children[0].getBoundingClientRect(),a=s.left,n=s.right,l=s.width,o=w?n-t:t-a,r=Se,i=Math.round(l/Se),c=0;c<=Se;c+=1)if(o<=i*c){r=0===c&&o<i?0:c;break}var d=r-1;r>0&&(Ne({type:"PointerMove",payload:100*r/Se,index:d}),u&&Ae&&u(Pe(Ae),d,e))},_e=function(e){Ae&&(Ne({type:"MouseClick",payload:Ae}),d&&d(Pe(Ae),we,e))},Le=n.useMemo((function(){if(T){if(M){var e=Ce&&Ce||ke;return Ae&&Ae>e?Ae:e}return Ae&&Ae||Ce&&Ce||ke}return Ce&&Ce||ke}),[T,M,Ae,Ce,ke]);n.useEffect((function(){oe.length>Se&&console.error("tooltipArray Array length is bigger then Icons Count length.")}),[oe.length,Se]);var Fe=n.useCallback((function(e){return Ae&&e[we]||Ce&&e[be]||x&&e[Ie]}),[Ae,we,Ce,be,x,Ie]),Te=n.useMemo((function(){return Ae&&Pe(Ae)||Ce&&Pe(Ce)||x&&Pe(ke)}),[Ae,Pe,Ce,x,ke]);return a.jsxs("span",l({className:"style-module_starRatingWrap__q-lJC",style:{direction:"".concat(w?"rtl":"ltr")}},{children:[a.jsxs("span",l({className:"".concat("style-module_simpleStarRating__nWUxf"," ").concat(R),style:l({cursor:C?"":"pointer"},I),onPointerMove:C?void 0:Re,onPointerEnter:C?void 0:function(e){m&&m(e),c()&&Re(e)},onPointerLeave:C?void 0:function(e){c()&&_e(),Ne({type:"PointerLeave"}),p&&p(e)},onClick:C?void 0:_e,"aria-hidden":"true"},{children:[a.jsx("span",l({className:"".concat("style-module_emptyIcons__Bg-FZ"," ").concat(Q),style:l({color:J},Z)},{children:o([],Array(v),!0).map((function(e,t){var s;return a.jsx(n.Fragment,{children:(null===(s=N[t])||void 0===s?void 0:s.icon)||K||a.jsx(r,{SVGclassName:ue,SVGstyle:he,SVGstorkeWidth:ge,SVGstrokeColor:je,size:f})},t)}))})),a.jsx("span",l({className:"".concat("style-module_fillIcons__6---A"," ").concat(U),style:l((t={},t[w?"right":"left"]=0,t.color=Fe(O)||D,t.transition=L?"width .2s ease, color .2s ease":"",t.width="".concat(Le,"%"),t),W),title:ee?"".concat(Te," ").concat(pe," ").concat(v):void 0},{children:o([],Array(v),!0).map((function(e,t){var s;return a.jsx(n.Fragment,{children:(null===(s=N[t])||void 0===s?void 0:s.icon)||V||a.jsx(r,{SVGclassName:ue,SVGstyle:he,SVGstorkeWidth:ge,SVGstrokeColor:je,size:f})},t)}))}))]})),se&&a.jsx("span",l({className:"".concat("style-module_tooltip__tKc3i"," ").concat(ce),style:l((s={},s[w?"marginRight":"marginLeft"]=20,s),re)},{children:(oe.length>0?Fe(oe):Te)||ne}))]}))}},39585:()=>{}}]);
//# sourceMappingURL=7551.9aba001d.chunk.js.map