"use strict";(self.webpackChunklaptop_rental_web_app=self.webpackChunklaptop_rental_web_app||[]).push([[6306],{39110:(e,s,a)=>{a.d(s,{A:()=>l});a(65043);var t=a(53519),n=(a(36386),a(79340)),r=a(70579);const l=()=>(0,r.jsxs)(t.A,{className:"vh-100 d-flex flex-column justify-content-center align-items-center",children:[(0,r.jsx)("img",{src:n,alt:"Loading...",style:{width:"150px",height:"150px"}}),(0,r.jsx)("div",{className:"text mt-3",children:"Loading ..."})]})},98954:(e,s,a)=>{a.d(s,{A:()=>A});var t=a(65043),n=a(71094),r=a(53519),l=a(61072),o=a(64196),i=a(78602),d=a(14282),c=a(49804),x=a(60184),u=a(3825),m=a(92157),p=a.n(m),h=a(13441),g=(a(39585),a(36653)),j=a(70579);const A=e=>{const{color:s}=(0,g.D)(),a=(0,t.useMemo)((()=>e.COLUMNS),[e.COLUMNS]),m=(0,t.useMemo)((()=>e.MOCK_DATA||[]),[e.MOCK_DATA]),{getTableProps:A,getTableBodyProps:C,headerGroups:v,prepareRow:S,page:f}=(0,n.useTable)({columns:a,data:m,autoResetWidth:!1},n.useGlobalFilter,n.useSortBy,n.usePagination);return(0,j.jsx)("div",{children:(0,j.jsx)(r.A,{fluid:!0,className:"ml-xxl-n4 ml-xl-n4 ml-lg-n4",children:(0,j.jsxs)(l.A,{children:[(0,j.jsxs)(o.A,{className:"justify-content-center align-items-center",striped:!0,hover:!0,...A(),responsive:!0,style:{width:"100%",marginLeft:"25px"},children:[(0,j.jsx)("thead",{children:v.map(((e,s)=>(0,t.createElement)("tr",{...e.getHeaderGroupProps(),key:s},e.headers.map(((e,s)=>(0,t.createElement)("th",{...e.getHeaderProps(),key:s,className:"text-center text-dark",style:{width:"".concat(e.width,"px"),whiteSpace:"nowrap",justifyContent:"center",alignItems:"center"},onClick:s=>{s.target.classList.contains("fa-sort")||"ACTIONS"===e.render("Header")||e.toggleSortBy(!e.isSortedDesc)}},"ACTIONS"===e.render("Header")?(0,j.jsx)(j.Fragment,{children:e.render("Header")}):(0,j.jsxs)("div",{children:[e.render("Header"),(0,j.jsx)(x.MjW,{className:"mx-2"})]})))))))}),(0,j.jsx)("tbody",{...C(),children:f.length>0?f.map(((s,a)=>(S(s),(0,t.createElement)("tr",{...s.getRowProps(),key:a},s.cells.map(((s,n)=>{const r="action"===s.column.id||"localShop"===s.column.id||"serviceCenter"===s.column.id||"ourServices"===s.column.id||"addInCarousel"===s.column.id;return(0,t.createElement)("td",{...s.getCellProps(),key:n,className:"text-secondary text-start",style:{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",maxWidth:"20ch",backgroundColor:a<=e.count-1?"#cfd1d1":""}},r||s.value?s.render("Cell"):"-")})))))):(0,j.jsx)("tr",{children:(0,j.jsx)("td",{colSpan:a.length,className:"text-center text-dark",children:"No Data Found"})})})]}),(0,j.jsxs)(i.A,{className:"".concat(f.length>0?"d-flex":"d-none"," flex-row justify-content-center align-items-center"),children:[(0,j.jsx)(i.A,{className:"d-flex justify-content-start align-items-center flex-wrap",children:(0,j.jsxs)("span",{className:"m-1",children:["Showing","",(0,j.jsxs)("strong",{className:"m-2",children:[e.startIndex," to ",e.endIndex," of"," ",(0,j.jsxs)("strong",{className:"m-2",children:[" ",e.totalItems," entries"]})]})]})}),(0,j.jsx)(i.A,{className:" mt-3 d-none d-sm-none d-md-none d-xxl-flex d-xl-flex d-lg-flex justify-content-end align-items-center",children:(0,j.jsx)(p(),{breakLabel:"...",onPageChange:s=>e.setCurrentPage(s.selected+1),pageRangeDisplayed:5,pageCount:e.totalPages,renderOnZeroPageCount:null,activeClassName:"active",pageClassName:"page-item",pageLinkClassName:"page-link",previousClassName:"page-item",previousLinkClassName:"page-link",nextClassName:"page-item",nextLinkClassName:"page-link",containerClassName:"pagination",previousLabel:(0,j.jsx)(h.Vx.Provider,{value:{color:s,size:"28px"},children:(0,j.jsx)(u.dnY,{})}),nextLabel:(0,j.jsx)(h.Vx.Provider,{value:{color:s,size:"28px"},children:(0,j.jsx)(u.m2f,{})})})}),(0,j.jsxs)(i.A,{className:"d-flex d-sm-flex d-md-flex d-xxl-none d-xl-none d-lg-none justify-content-end align-items-center",children:[(0,j.jsx)(d.A,{style:{backgroundColor:s,border:"none"},onClick:()=>e.setCurrentPage(e.currentPage-1),disabled:1===e.currentPage,className:"m-2",children:(0,j.jsx)(c.o_z,{size:14})}),(0,j.jsx)(d.A,{style:{backgroundColor:s,border:"none"},onClick:()=>{e.setCurrentPage(e.currentPage+1)},disabled:e.currentPage===e.totalPages,children:(0,j.jsx)(c.hdn,{size:14})})]})]})]})})})}},16306:(e,s,a)=>{a.r(s),a.d(s,{default:()=>w});var t=a(65043),n=a(14282),r=a(53519),l=a(61072),o=a(78602),i=a(27417),d=a(25284),c=a(24522),x=a(98954),u=a(31462),m=a(3538),p=a(63401),h=a(60184),g=a(36017),j=a(6720),A=a(73216),C=a(23162),v=a(32479),S=a(39110),f=a(2519),y=a(36653),N=a(31121),b=a(70579);const w=()=>{const{color:e}=(0,y.D)(),[s,a]=(0,t.useState)([]),[w,k]=(0,t.useState)(1),[I,P]=(0,t.useState)(1),[L,F]=(0,t.useState)(1),[R,T]=(0,t.useState)(1),[D,E]=(0,t.useState)(0),[H,O]=(0,t.useState)(""),[M,_]=(0,t.useState)(""),[B,z]=(0,t.useState)(!1),{id:G}=(0,A.g)(),[U,K]=(0,t.useState)(null),[q,V]=(0,t.useState)(!1),[W,Y]=(0,t.useState)(""),[J,Q]=(0,t.useState)(null),[Z,X]=(0,t.useState)(!1),[$,ee]=(0,t.useState)(""),[se,ae]=(0,t.useState)(!1),[te,ne]=(0,t.useState)(""),[re,le]=(0,t.useState)(""),[oe,ie]=(0,t.useState)(null),[de,ce]=(0,t.useState)(!1),[xe,ue]=(0,t.useState)(!1),[me,pe]=(0,t.useState)(!1),[he,ge]=(0,t.useState)({}),[je,Ae]=(0,t.useState)(!1),Ce=(0,v.L)(),ve=e=>(0,N.GP)(new Date(e),"dd-MMM-yyyy h:mm a"),{data:Se,refetch:fe,isLoading:ye}=(0,C.Sm)({page:w,search:H,id:G,role:Ce}),[Ne]=(0,C.VD)(),[be]=(0,C.Sy)(),[we]=(0,C._0)();(0,t.useEffect)((()=>{Se&&Se.data&&(a(Se.data),P(Se.pagination.startIndex),k(w),E(Se.pagination.totalItems),F(Se.pagination.endIndex),T(Se.pagination.totalPages),pe(Se.moduleAccess.fullAccess),ce(Se.moduleAccess.write),ue(Se.moduleAccess.read))}),[Se,w,Ce]);const ke=()=>{z(!0),O(M),fe({page:w,search:M}).then((()=>{z(!1)}))},Ie=()=>{V(!1),K(null),Y(""),Q(null),le("")},Pe=()=>{ae(!1),ne(""),ie(null),le("")},Le=[{Header:"ID",accessor:"s_no"},{Header:"Image",accessor:"image",Cell:e=>{const s=e.value;return s?(0,b.jsx)("img",{src:s,alt:"Profile",style:{width:"50px",height:"50px",borderRadius:"100%"}}):(0,b.jsx)(m.jNg,{size:50})}},{Header:"Issue",accessor:"issue"},{Header:"Most Booked Service",accessor:"mostBookedService"},{Header:"Created At",accessor:"createdAt",Cell:e=>{let{value:s}=e;return ve(s)}},{Header:"Updated At",accessor:"updatedAt",Cell:e=>{let{value:s}=e;return ve(s)}}];return me&&Le.push({Header:"ACTIONS",accessor:"action",Cell:e=>{const a=e.row.original._id;return(0,b.jsxs)("div",{className:"d-flex align-items-center justify-content-center flex-row",children:[(0,b.jsx)(n.A,{variant:"warning",onClick:()=>(e=>{const a=s.find((s=>s._id===e));a&&(K(e),Y(a.issue),le(a.mostBookedService),V(!0))})(a),children:(0,b.jsx)(h.uO9,{})}),(0,b.jsx)(n.A,{variant:"danger",className:"ms-2",onClick:()=>(e=>{ee(e),X(!0)})(a),children:(0,b.jsx)(j.b6i,{})})]})}}),(0,b.jsxs)("div",{children:[ye?(0,b.jsx)(S.A,{}):(0,b.jsx)(b.Fragment,{children:xe?(0,b.jsxs)(r.A,{fluid:!0,className:"mt-3 ",children:[(0,b.jsx)(l.A,{className:"boxShadow p-4 mb-4 mt-4",children:(0,b.jsxs)(o.A,{className:"d-flex flex-row justify-content-between mt-1",children:[(0,b.jsx)("h4",{className:"fw-bold",children:"Repair & Service"}),de?(0,b.jsx)("div",{children:(0,b.jsxs)(n.A,{style:{backgroundColor:e,border:"none"},className:"p-2 m-1",onClick:()=>{ae(!0)},children:[(0,b.jsx)(h.OiG,{size:20}),(0,b.jsx)("span",{className:"d-none d-md-inline",children:" Add Issue"})]})}):(0,b.jsx)(b.Fragment,{})]})}),(0,b.jsxs)(l.A,{className:"boxShadow p-3 mb-4 d-flex flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row",children:[(0,b.jsx)(o.A,{className:"my-4 mx-2",xxl:3,xl:3,lg:3,sm:6,md:6,children:(0,b.jsxs)("div",{className:"input-group",children:[(0,b.jsx)("span",{className:"input-group-text",children:(0,b.jsx)(u.YQq,{})}),(0,b.jsx)("input",{type:"text",placeholder:"Search RepairService...",className:"form-control",value:M,onChange:e=>_(e.target.value),onKeyPress:e=>{"Enter"===e.key&&ke()}}),M&&(0,b.jsx)("span",{className:"input-group-text",onClick:()=>{_(""),O("")},children:(0,b.jsx)(u.IeJ,{})})]})}),(0,b.jsx)(o.A,{className:"d-flex flex-column text-center my-4",xxl:2,xl:2,lg:2,sm:3,md:3,children:(0,b.jsx)(n.A,{style:{backgroundColor:e,border:"none"},onClick:ke,disabled:B,children:B?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(i.A,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true",className:"me-2"}),"Searching..."]}):"Search"})})]}),(0,b.jsx)(l.A,{className:"boxShadow p-4 mb-4",children:(0,b.jsx)(x.A,{COLUMNS:Le,MOCK_DATA:s,currentPage:w,startIndex:I,endIndex:L,setCurrentPage:k,totalItems:D,totalPages:R})}),(0,b.jsx)(g.A,{YES:async()=>{try{const a=await be({id:$,role:Ce});var e,s;if(X(!1),ee(""),null!==a&&void 0!==a&&a.data)p.oR.success(null===a||void 0===a||null===(e=a.data)||void 0===e?void 0:e.message,{autoClose:1e3});else p.oR.error(null===a||void 0===a||null===(s=a.error)||void 0===s?void 0:s.data.error,{autoClose:1e3})}catch(a){console.error(a)}},DELETESTATE:Z,ONCLICK:()=>{X(!1)},DESCRIPTION:"Are you sure want to delete this RepairService",DELETETITLE:"RepairService"})]}):(0,b.jsx)(f.A,{})}),(0,b.jsxs)(d.A,{show:q,onHide:Ie,centered:!0,children:[(0,b.jsx)(d.A.Header,{closeButton:!0,children:(0,b.jsx)(d.A.Title,{children:"Edit RepairService"})}),(0,b.jsx)(d.A.Body,{children:(0,b.jsxs)(c.A,{children:[(0,b.jsxs)(c.A.Group,{controlId:"mostBookedServiceDropdown",className:"mt-3",children:[(0,b.jsx)(c.A.Label,{children:"Most Booked Service:"}),(0,b.jsxs)(c.A.Select,{value:re,onChange:e=>{le(e.target.value)},children:[(0,b.jsx)("option",{value:"",disabled:!0,selected:!0,children:"Select an option"}),(0,b.jsx)("option",{value:"Active",children:"Active"}),(0,b.jsx)("option",{value:"Inactive",children:"InActive"})]})]}),(0,b.jsxs)(c.A.Group,{controlId:"deviceNameInput",children:[(0,b.jsx)(c.A.Label,{children:"RepairService Name"}),(0,b.jsx)(c.A.Control,{type:"text",value:W,onChange:e=>{Y(e.target.value)}})]}),(0,b.jsxs)(c.A.Group,{controlId:"fileUpload",className:"mt-3",children:[(0,b.jsx)(c.A.Label,{children:"Upload File"}),(0,b.jsx)(c.A.Control,{type:"file",accept:".jpg,.jpeg,.png,.svg,.webp",onChange:e=>{Q(e.target.files[0])}})]})]})}),(0,b.jsxs)(d.A.Footer,{children:[(0,b.jsx)(n.A,{variant:"secondary",onClick:Ie,children:"Cancel"}),(0,b.jsx)(n.A,{style:{backgroundColor:e,border:"none"},onClick:async()=>{Ae(!0);try{const e=new FormData;e.append("issue",W),e.append("image",J),e.append("mostBookedService",re);const s=await Ne({id:U,role:Ce,data:e});s.data?(p.oR.success(s.data.message,{autoClose:1e3}),V(!1),fe()):p.oR.error(s.error.data.error,{autoClose:1e3})}catch(e){console.error(e)}finally{Ae(!1)}},disabled:je,children:je?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(i.A,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true",className:"me-2"}),"Updating..."]}):"Update"})]})]}),(0,b.jsxs)(d.A,{show:se,onHide:Pe,centered:!0,children:[(0,b.jsx)(d.A.Header,{closeButton:!0,children:(0,b.jsx)(d.A.Title,{children:"Add RepairService"})}),(0,b.jsx)(d.A.Body,{children:(0,b.jsxs)(c.A,{children:[(0,b.jsxs)(c.A.Group,{controlId:"issueInput",children:[(0,b.jsxs)(c.A.Label,{children:["RepairService Name ",(0,b.jsx)("span",{className:"text-danger",children:"*"})]}),(0,b.jsx)(c.A.Control,{type:"text",value:te,onChange:e=>{ne(e.target.value)},isInvalid:!!he.newissue}),(0,b.jsx)(c.A.Control.Feedback,{type:"invalid",children:he.newissue})]}),(0,b.jsxs)(c.A.Group,{controlId:"newFileUpload",className:"mt-3",children:[(0,b.jsxs)(c.A.Label,{children:["Upload File ",(0,b.jsx)("span",{className:"text-danger",children:"*"})]}),(0,b.jsx)(c.A.Control,{type:"file",accept:".jpg,.jpeg,.png,.svg,.webp",onChange:e=>{ie(e.target.files[0])},isInvalid:!!he.newFile}),(0,b.jsx)(c.A.Control.Feedback,{type:"invalid",children:he.newFile})]})]})}),(0,b.jsxs)(d.A.Footer,{children:[(0,b.jsx)(n.A,{variant:"secondary",onClick:Pe,children:"Cancel"}),(0,b.jsx)(n.A,{style:{backgroundColor:e,border:"none"},onClick:async()=>{if((()=>{const e={};return te||(e.newissue="Category name is required"),oe||(e.newFile="Image is required"),ge(e),0===Object.keys(e).length})()){Ae(!0);try{const e=new FormData;e.append("issue",te),e.append("image",oe);const s=await we({role:Ce,data:e});s.data?(p.oR.success(s.data.message,{autoClose:1e3}),ae(!1),fe()):p.oR.error(s.error.data.error,{autoClose:1e3})}catch(e){console.error(e)}finally{Ae(!1)}}},disabled:je,children:je?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(i.A,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true",className:"me-2"}),"Add..."]}):"Add"})]})]})]})}},39585:()=>{}}]);
//# sourceMappingURL=6306.bfc688b6.chunk.js.map