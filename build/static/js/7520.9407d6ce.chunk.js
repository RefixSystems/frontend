"use strict";(self.webpackChunklaptop_rental_web_app=self.webpackChunklaptop_rental_web_app||[]).push([[7520],{93779:(e,s,a)=>{a.d(s,{A:()=>d});a(65043);var t=a(94281),l=a(24522),n=a(75200),r=a(36653),o=a(63401),c=a(70579);const d=e=>{let{setFieldValue:s=(()=>{}),touched:a={},errors:d={},labelText:i="Upload Image",nameText:x="image",accepts:m={"image/*":[".png",".jpeg",".jpg",".svg",".webp",".gif"]},handleFileChange:u=null,disabled:p=!1}=e;const{getRootProps:g,getInputProps:h,isDragActive:j}=(0,t.VB)({accept:m||"",onDrop:e=>{const a=e[0],t=a.name.split(".").pop().toLowerCase();m["image/*"].map((e=>e.replace(".","").toLowerCase().trim())).includes(t)?(s(x,a),u&&u(a)):o.oR.warning("This file type not accepted",{autoClose:2e3,position:"bottom-center"})},onDropRejected:e=>{o.oR.warning("This file type not accepted",{autoClose:2e3,position:"bottom-center"})},disabled:p}),{color:A}=(0,r.D)();return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(l.A.Group,{children:[(0,c.jsxs)(l.A.Label,{children:[i," ",(0,c.jsx)("span",{className:"text-danger"})]}),(0,c.jsxs)("div",{...g(),className:"form-control dropzone ".concat(j?"active":""," ").concat(a[x]&&d[x]?"is-invalid":""),style:{border:"2px dashed #ced4da",padding:"20px",textAlign:"center",borderRadius:"5px",cursor:p?"not-allowed":"pointer",background:j?"#f8f9fa":"transparent"},children:[(0,c.jsx)("input",{...h(),disabled:p}),j?(0,c.jsx)("p",{children:"Drop the files here..."}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.YoE,{size:50,color:A}),(0,c.jsx)("p",{children:"Drag & drop an image here, or click to select one"})]})]}),a[x]&&d[x]&&(0,c.jsx)("p",{className:"text-danger",children:d[x]})]})})}},24796:(e,s,a)=>{a.d(s,{A:()=>l});a(65043);var t=a(70579);const l=e=>{let{image:s,valueImage:a}=e;const l=s&&(!Array.isArray(s)||s.length>0),n=a!==s?s:s instanceof File?URL.createObjectURL(s):s;return(0,t.jsx)(t.Fragment,{children:l?(0,t.jsx)("img",{src:n,width:100,height:70,alt:"image",className:"mt-3",style:{objectFit:"contain"}}):(0,t.jsx)(t.Fragment,{})})}},98954:(e,s,a)=>{a.d(s,{A:()=>A});var t=a(65043),l=a(71094),n=a(53519),r=a(61072),o=a(64196),c=a(78602),d=a(14282),i=a(49804),x=a(60184),m=a(3825),u=a(92157),p=a.n(u),g=a(13441),h=(a(39585),a(36653)),j=a(70579);const A=e=>{const{color:s}=(0,h.D)(),a=(0,t.useMemo)((()=>e.COLUMNS),[e.COLUMNS]),u=(0,t.useMemo)((()=>e.MOCK_DATA||[]),[e.MOCK_DATA]),{getTableProps:A,getTableBodyProps:C,headerGroups:v,prepareRow:f,page:N}=(0,l.useTable)({columns:a,data:u,autoResetWidth:!1},l.useGlobalFilter,l.useSortBy,l.usePagination);return(0,j.jsx)("div",{children:(0,j.jsx)(n.A,{fluid:!0,className:"ml-xxl-n4 ml-xl-n4 ml-lg-n4",children:(0,j.jsxs)(r.A,{children:[(0,j.jsxs)(o.A,{className:"justify-content-center align-items-center",striped:!0,hover:!0,...A(),responsive:!0,style:{width:"100%",marginLeft:"25px"},children:[(0,j.jsx)("thead",{children:v.map(((e,s)=>(0,t.createElement)("tr",{...e.getHeaderGroupProps(),key:s},e.headers.map(((e,s)=>(0,t.createElement)("th",{...e.getHeaderProps(),key:s,className:"text-center text-dark",style:{width:"".concat(e.width,"px"),whiteSpace:"nowrap",justifyContent:"center",alignItems:"center"},onClick:s=>{s.target.classList.contains("fa-sort")||"ACTIONS"===e.render("Header")||e.toggleSortBy(!e.isSortedDesc)}},"ACTIONS"===e.render("Header")?(0,j.jsx)(j.Fragment,{children:e.render("Header")}):(0,j.jsxs)("div",{children:[e.render("Header"),(0,j.jsx)(x.MjW,{className:"mx-2"})]})))))))}),(0,j.jsx)("tbody",{...C(),children:N.length>0?N.map(((s,a)=>(f(s),(0,t.createElement)("tr",{...s.getRowProps(),key:a},s.cells.map(((s,l)=>{const n="action"===s.column.id||"localShop"===s.column.id||"serviceCenter"===s.column.id||"ourServices"===s.column.id||"addInCarousel"===s.column.id;return(0,t.createElement)("td",{...s.getCellProps(),key:l,className:"text-secondary text-start",style:{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",maxWidth:"20ch",backgroundColor:a<=e.count-1?"#cfd1d1":""}},n||s.value?s.render("Cell"):"-")})))))):(0,j.jsx)("tr",{children:(0,j.jsx)("td",{colSpan:a.length,className:"text-center text-dark",children:"No Data Found"})})})]}),(0,j.jsxs)(c.A,{className:"".concat(N.length>0?"d-flex":"d-none"," flex-row justify-content-center align-items-center"),children:[(0,j.jsx)(c.A,{className:"d-flex justify-content-start align-items-center flex-wrap",children:(0,j.jsxs)("span",{className:"m-1",children:["Showing","",(0,j.jsxs)("strong",{className:"m-2",children:[e.startIndex," to ",e.endIndex," of"," ",(0,j.jsxs)("strong",{className:"m-2",children:[" ",e.totalItems," entries"]})]})]})}),(0,j.jsx)(c.A,{className:" mt-3 d-none d-sm-none d-md-none d-xxl-flex d-xl-flex d-lg-flex justify-content-end align-items-center",children:(0,j.jsx)(p(),{breakLabel:"...",onPageChange:s=>e.setCurrentPage(s.selected+1),pageRangeDisplayed:5,pageCount:e.totalPages,renderOnZeroPageCount:null,activeClassName:"active",pageClassName:"page-item",pageLinkClassName:"page-link",previousClassName:"page-item",previousLinkClassName:"page-link",nextClassName:"page-item",nextLinkClassName:"page-link",containerClassName:"pagination",previousLabel:(0,j.jsx)(g.Vx.Provider,{value:{color:s,size:"28px"},children:(0,j.jsx)(m.dnY,{})}),nextLabel:(0,j.jsx)(g.Vx.Provider,{value:{color:s,size:"28px"},children:(0,j.jsx)(m.m2f,{})})})}),(0,j.jsxs)(c.A,{className:"d-flex d-sm-flex d-md-flex d-xxl-none d-xl-none d-lg-none justify-content-end align-items-center",children:[(0,j.jsx)(d.A,{style:{backgroundColor:s,border:"none"},onClick:()=>e.setCurrentPage(e.currentPage-1),disabled:1===e.currentPage,className:"m-2",children:(0,j.jsx)(i.o_z,{size:14})}),(0,j.jsx)(d.A,{style:{backgroundColor:s,border:"none"},onClick:()=>{e.setCurrentPage(e.currentPage+1)},disabled:e.currentPage===e.totalPages,children:(0,j.jsx)(i.hdn,{size:14})})]})]})]})})})}},37520:(e,s,a)=>{a.r(s),a.d(s,{default:()=>P});var t=a(65043),l=a(14282),n=a(53519),r=a(61072),o=a(78602),c=a(27417),d=a(25284),i=a(24522),x=a(98954),m=a(31462),u=a(3538),p=a(63401),g=a(60184),h=a(36017),j=a(6720),A=a(73216),C=a(35475),v=a(37921),f=a(32479),N=a(39110),b=a(2519),y=a(36653),w=a(31121),S=a(24796),k=a(93779),D=a(85959),I=a(70579);const P=()=>{const{color:e}=(0,y.D)(),[s,a]=(0,t.useState)([]),[P,T]=(0,t.useState)(1),[L,E]=(0,t.useState)(1),[F,R]=(0,t.useState)(1),[H,O]=(0,t.useState)(1),[_,z]=(0,t.useState)(0),[M,U]=(0,t.useState)(""),[B,G]=(0,t.useState)(""),[K,V]=(0,t.useState)(!1),{id:Y}=(0,A.g)(),[W,q]=(0,t.useState)(null),[J,Q]=(0,t.useState)(!1),[Z,X]=(0,t.useState)(""),[$,ee]=(0,t.useState)(null),[se,ae]=(0,t.useState)(!1),[te,le]=(0,t.useState)(""),[ne,re]=(0,t.useState)(!1),[oe,ce]=(0,t.useState)(""),[de,ie]=(0,t.useState)(null),[xe,me]=(0,t.useState)(!1),[ue,pe]=(0,t.useState)(!1),[ge,he]=(0,t.useState)(!1),[je,Ae]=(0,t.useState)(!1),[Ce,ve]=(0,t.useState)(!1),fe=(0,f.L)(),{data:Ne,refetch:be,isLoading:ye,isError:we,error:Se}=(0,v.T9)({page:P,search:M,id:Y,role:fe}),[ke]=(0,v.sz)(),[De]=(0,v.pE)(),[Ie]=(0,v.f1)(),Pe=e=>(0,w.GP)(new Date(e),"dd-MMM-yyyy h:mm a");(0,t.useEffect)((()=>{Ne&&Ne.data&&(a(Ne.data),E(Ne.pagination.startIndex),T(P),z(Ne.pagination.totalItems),R(Ne.pagination.endIndex),O(Ne.pagination.totalPages),he(Ne.moduleAccess.fullAccess),me(Ne.moduleAccess.write),pe(Ne.moduleAccess.read)),we&&500===(null===Se||void 0===Se?void 0:Se.status)?ve(!0):ve(!1)}),[Ne,P,fe,Se,we]);const Te=()=>{V(!0),U(B),be({page:P,search:B}).then((()=>{V(!1)}))},Le=()=>{Q(!1),q(null),X(""),ee(null)},Ee=()=>{re(!1),ce(""),ie(null)},Fe=[{Header:"ID",accessor:"s_no"},{Header:"Image",accessor:"image",Cell:e=>{const s=e.value;return s?(0,I.jsx)("img",{src:s,alt:"Profile",style:{width:"50px",height:"50px"}}):(0,I.jsx)(u.jNg,{size:50})}},{Header:"Device Name",accessor:"deviceName",Cell:e=>{const s=e.value;return(0,I.jsx)(C.N_,{to:"/admin/issues/".concat(s),style:{color:"#245bad"},children:s})}},{Header:"Created At",accessor:"createdAt",Cell:e=>{let{value:s}=e;return Pe(s)}},{Header:"Updated At",accessor:"updatedAt",Cell:e=>{let{value:s}=e;return Pe(s)}}];return ge&&Fe.push({Header:"ACTIONS",accessor:"action",Cell:e=>{const a=e.row.original._id;return(0,I.jsxs)("div",{className:"d-flex align-items-center justify-content-center flex-row",children:[(0,I.jsx)(l.A,{variant:"warning",onClick:()=>(e=>{const a=s.find((s=>s._id===e));a&&(q(e),X(a.deviceName),ee(a.image),Q(!0))})(a),children:(0,I.jsx)(g.uO9,{})}),(0,I.jsx)(l.A,{variant:"danger",className:"ms-2",onClick:()=>(e=>{le(e),ae(!0)})(a),children:(0,I.jsx)(j.b6i,{})})]})}}),(0,I.jsxs)("div",{children:[ye?(0,I.jsx)(N.A,{}):(0,I.jsx)(I.Fragment,{children:Ce?(0,I.jsx)(D.A,{}):ue?(0,I.jsxs)(n.A,{fluid:!0,className:"mt-3 ",children:[(0,I.jsx)(r.A,{className:"boxShadow p-4 mb-4 mt-4",children:(0,I.jsxs)(o.A,{className:"d-flex flex-row justify-content-between mt-1",children:[(0,I.jsx)("h4",{className:"fw-bold",children:"Devices"}),xe?(0,I.jsx)("div",{children:(0,I.jsxs)(l.A,{style:{backgroundColor:e,border:"none"},className:"p-2 m-1",onClick:()=>{re(!0)},children:[(0,I.jsx)(g.OiG,{size:20}),(0,I.jsx)("span",{className:"d-none d-md-inline",children:" Add Devices"})]})}):(0,I.jsx)(I.Fragment,{})]})}),(0,I.jsxs)(r.A,{className:"boxShadow p-3 mb-4 d-flex flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row",children:[(0,I.jsx)(o.A,{className:"my-4 mx-2",xxl:3,xl:3,lg:3,sm:6,md:6,children:(0,I.jsxs)("div",{className:"input-group",children:[(0,I.jsx)("span",{className:"input-group-text",children:(0,I.jsx)(m.YQq,{})}),(0,I.jsx)("input",{type:"text",placeholder:"Search Devices...",className:"form-control",value:B,onChange:e=>G(e.target.value),onKeyPress:e=>{"Enter"===e.key&&Te()}}),B&&(0,I.jsx)("span",{className:"input-group-text",onClick:()=>{G(""),U("")},children:(0,I.jsx)(m.IeJ,{})})]})}),(0,I.jsx)(o.A,{className:"d-flex flex-column text-center my-4",xxl:2,xl:2,lg:2,sm:3,md:3,children:(0,I.jsx)(l.A,{style:{backgroundColor:e,border:"none"},onClick:Te,disabled:K||""===B,children:K?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(c.A,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true",className:"me-2"}),"Searching..."]}):"Search"})})]}),(0,I.jsx)(r.A,{className:"boxShadow p-4 mb-4",children:(0,I.jsx)(x.A,{COLUMNS:Fe,MOCK_DATA:s,currentPage:P,startIndex:L,endIndex:F,setCurrentPage:T,totalItems:_,totalPages:H})}),(0,I.jsx)(h.A,{YES:async()=>{try{const a=await De({id:te,role:fe});var e,s;if(ae(!1),le(""),null!==a&&void 0!==a&&a.data)p.oR.success(null===a||void 0===a||null===(e=a.data)||void 0===e?void 0:e.message,{autoClose:1e3});else p.oR.error(null===a||void 0===a||null===(s=a.error)||void 0===s?void 0:s.data.error,{autoClose:1e3})}catch(Se){console.error(Se)}},DELETESTATE:se,ONCLICK:()=>{ae(!1)},DESCRIPTION:"Are you sure want to delete this Devices",DELETETITLE:"Devices"})]}):(0,I.jsx)(b.A,{})}),(0,I.jsxs)(d.A,{show:J,onHide:Le,centered:!0,dialogClassName:"all-modal",children:[(0,I.jsx)(d.A.Header,{closeButton:!0,children:(0,I.jsx)(d.A.Title,{children:"Edit Device"})}),(0,I.jsx)(d.A.Body,{children:(0,I.jsxs)(i.A,{children:[(0,I.jsxs)(i.A.Group,{controlId:"deviceNameInput",className:"mb-3",children:[(0,I.jsxs)(i.A.Label,{children:["Devices Name ",(0,I.jsx)("span",{className:"text-danger",children:"*"})]}),(0,I.jsx)(i.A.Control,{type:"text",value:Z,onChange:e=>{X(e.target.value)},placeholder:"Enter the device name here"})]}),(0,I.jsx)(k.A,{labelText:"Upload Image",accepts:{"image/*":[".png",".jpeg",".jpg",".svg",".webp"]},handleFileChange:e=>{(e=>{ee(e)})(e)}}),(0,I.jsx)("div",{children:(0,I.jsxs)("small",{className:"text-muted",children:["Accepted file types: .jpg , .jpeg, .png, .svg, .webp"," "]})}),(0,I.jsx)(S.A,{image:$,valueImage:$})]})}),(0,I.jsxs)(d.A.Footer,{children:[(0,I.jsx)(l.A,{variant:"secondary",onClick:Le,children:"Cancel"}),(0,I.jsx)(l.A,{style:{backgroundColor:e,border:"none"},onClick:async()=>{if(Z&&$){Ae(!0);try{const e=new FormData;e.append("deviceName",Z),e.append("image",$);const s=await ke({id:W,role:fe,data:e});s.data?(p.oR.success(s.data.message,{autoClose:1e3}),Q(!1),be()):p.oR.error(s.error.data.error,{autoClose:1e3})}catch(Se){console.error(Se)}finally{Ae(!1)}}else p.oR.error("Please fill all the fields",{autoClose:1e3})},disabled:je,children:je?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(c.A,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true",className:"me-2"}),"Updating..."]}):"Update"})]})]}),(0,I.jsxs)(d.A,{show:ne,onHide:Ee,centered:!0,dialogClassName:"all-modal",children:[(0,I.jsx)(d.A.Header,{closeButton:!0,children:(0,I.jsx)(d.A.Title,{children:"Add Device"})}),(0,I.jsx)(d.A.Body,{children:(0,I.jsxs)(i.A,{children:[(0,I.jsxs)(i.A.Group,{controlId:"editDeviceInput",className:"mb-3",children:[(0,I.jsxs)(i.A.Label,{children:["Device Name ",(0,I.jsx)("span",{className:"text-danger",children:"*"})]}),(0,I.jsx)(i.A.Control,{type:"text",placeholder:"Enter the device name here",value:oe,onChange:e=>{ce(e.target.value)}})]}),(0,I.jsx)(k.A,{labelText:"Upload Image",accepts:{"image/*":[".png",".jpeg",".jpg",".svg",".webp"]},handleFileChange:e=>{(e=>{ie(e)})(e)}}),(0,I.jsx)("div",{children:(0,I.jsxs)("small",{className:"text-muted",children:["Accepted file types: .jpg , .jpeg, .png, .svg, .webp"," "]})}),(0,I.jsx)(S.A,{image:de,valueImage:de})]})}),(0,I.jsxs)(d.A.Footer,{children:[(0,I.jsx)(l.A,{variant:"secondary",onClick:Ee,children:"Cancel"}),(0,I.jsx)(l.A,{style:{backgroundColor:e,border:"none"},onClick:async()=>{if(oe&&de){Ae(!0);try{const e=new FormData;e.append("deviceName",oe),e.append("image",de);const s=await Ie({role:fe,data:e});s.data?(p.oR.success(s.data.message,{autoClose:1e3}),re(!1),be(),ce(""),ie("")):(p.oR.error(s.error.data.error,{autoClose:1e3}),ce(""),ie(""))}catch(Se){console.error(Se)}finally{Ae(!1)}}else p.oR.error("Please fill all the fields",{autoClose:1e3})},disabled:je,children:je?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(c.A,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true",className:"me-2"}),"Add..."]}):"Add"})]})]})]})}},39585:()=>{}}]);
//# sourceMappingURL=7520.9407d6ce.chunk.js.map