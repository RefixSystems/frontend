"use strict";(self.webpackChunklaptop_rental_web_app=self.webpackChunklaptop_rental_web_app||[]).push([[5533],{98954:(e,s,a)=>{a.d(s,{A:()=>f});var t=a(65043),r=a(71094),l=a(53519),n=a(61072),o=a(64196),d=a(78602),c=a(14282),i=a(49804),m=a(60184),x=a(3825),u=a(92157),p=a.n(u),h=a(13441),g=(a(39585),a(36653)),j=a(70579);const f=e=>{const{color:s}=(0,g.D)(),a=(0,t.useMemo)((()=>e.COLUMNS),[e.COLUMNS]),u=(0,t.useMemo)((()=>e.MOCK_DATA||[]),[e.MOCK_DATA]),{getTableProps:f,getTableBodyProps:C,headerGroups:N,prepareRow:y,page:A}=(0,r.useTable)({columns:a,data:u,autoResetWidth:!1},r.useGlobalFilter,r.useSortBy,r.usePagination);return(0,j.jsx)("div",{children:(0,j.jsx)(l.A,{fluid:!0,className:"ml-xxl-n4 ml-xl-n4 ml-lg-n4",children:(0,j.jsxs)(n.A,{children:[(0,j.jsxs)(o.A,{className:"justify-content-center align-items-center",striped:!0,hover:!0,...f(),responsive:!0,style:{width:"100%",marginLeft:"25px"},children:[(0,j.jsx)("thead",{children:N.map(((e,s)=>(0,t.createElement)("tr",{...e.getHeaderGroupProps(),key:s},e.headers.map(((e,s)=>(0,t.createElement)("th",{...e.getHeaderProps(),key:s,className:"text-center text-dark",style:{width:"".concat(e.width,"px"),whiteSpace:"nowrap",justifyContent:"center",alignItems:"center"},onClick:s=>{s.target.classList.contains("fa-sort")||"ACTIONS"===e.render("Header")||e.toggleSortBy(!e.isSortedDesc)}},"ACTIONS"===e.render("Header")?(0,j.jsx)(j.Fragment,{children:e.render("Header")}):(0,j.jsxs)("div",{children:[e.render("Header"),(0,j.jsx)(m.MjW,{className:"mx-2"})]})))))))}),(0,j.jsx)("tbody",{...C(),children:A.length>0?A.map(((s,a)=>(y(s),(0,t.createElement)("tr",{...s.getRowProps(),key:a},s.cells.map(((s,r)=>{const l="action"===s.column.id||"localShop"===s.column.id||"serviceCenter"===s.column.id||"ourServices"===s.column.id||"addInCarousel"===s.column.id;return(0,t.createElement)("td",{...s.getCellProps(),key:r,className:"text-secondary text-start",style:{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",maxWidth:"20ch",backgroundColor:a<=e.count-1?"#cfd1d1":""}},l||s.value?s.render("Cell"):"-")})))))):(0,j.jsx)("tr",{children:(0,j.jsx)("td",{colSpan:a.length,className:"text-center text-dark",children:"No Data Found"})})})]}),(0,j.jsxs)(d.A,{className:"".concat(A.length>0?"d-flex":"d-none"," flex-row justify-content-center align-items-center"),children:[(0,j.jsx)(d.A,{className:"d-flex justify-content-start align-items-center flex-wrap",children:(0,j.jsxs)("span",{className:"m-1",children:["Showing","",(0,j.jsxs)("strong",{className:"m-2",children:[e.startIndex," to ",e.endIndex," of"," ",(0,j.jsxs)("strong",{className:"m-2",children:[" ",e.totalItems," entries"]})]})]})}),(0,j.jsx)(d.A,{className:" mt-3 d-none d-sm-none d-md-none d-xxl-flex d-xl-flex d-lg-flex justify-content-end align-items-center",children:(0,j.jsx)(p(),{breakLabel:"...",onPageChange:s=>e.setCurrentPage(s.selected+1),pageRangeDisplayed:5,pageCount:e.totalPages,renderOnZeroPageCount:null,activeClassName:"active",pageClassName:"page-item",pageLinkClassName:"page-link",previousClassName:"page-item",previousLinkClassName:"page-link",nextClassName:"page-item",nextLinkClassName:"page-link",containerClassName:"pagination",previousLabel:(0,j.jsx)(h.Vx.Provider,{value:{color:s,size:"28px"},children:(0,j.jsx)(x.dnY,{})}),nextLabel:(0,j.jsx)(h.Vx.Provider,{value:{color:s,size:"28px"},children:(0,j.jsx)(x.m2f,{})})})}),(0,j.jsxs)(d.A,{className:"d-flex d-sm-flex d-md-flex d-xxl-none d-xl-none d-lg-none justify-content-end align-items-center",children:[(0,j.jsx)(c.A,{style:{backgroundColor:s,border:"none"},onClick:()=>e.setCurrentPage(e.currentPage-1),disabled:1===e.currentPage,className:"m-2",children:(0,j.jsx)(i.o_z,{size:14})}),(0,j.jsx)(c.A,{style:{backgroundColor:s,border:"none"},onClick:()=>{e.setCurrentPage(e.currentPage+1)},disabled:e.currentPage===e.totalPages,children:(0,j.jsx)(i.hdn,{size:14})})]})]})]})})})}},85533:(e,s,a)=>{a.r(s),a.d(s,{default:()=>P});var t=a(65043),r=a(14282),l=a(53519),n=a(61072),o=a(78602),d=a(27417),c=a(98954),i=a(91916),m=a(31462),x=a(3538),u=a(63401),p=a(60184),h=a(36017),g=a(6720),j=a(73216),f=a(35475),C=a(39110),N=a(2519),y=a(32479),A=a(36653),v=a(31121),b=a(23237),S=a(85959),w=a(70579);const P=()=>{const{color:e}=(0,A.D)(),[s,a]=(0,t.useState)([]),[P,k]=(0,t.useState)(1),[E,I]=(0,t.useState)(1),[O,H]=(0,t.useState)(1),[L,T]=(0,t.useState)(1),[D,_]=(0,t.useState)(0),[M,R]=(0,t.useState)(""),[z,F]=(0,t.useState)(""),[B,G]=(0,t.useState)(!1),{id:K}=(0,j.g)(),[U,Q]=(0,t.useState)(!1),[W,Y]=(0,t.useState)(""),[V,Z]=(0,t.useState)(!1),[q,J]=(0,t.useState)(!1),[X,$]=(0,t.useState)(!1),[ee,se]=(0,t.useState)(!1),ae=e=>(0,v.GP)(new Date(e),"dd-MMM-yyyy h:mm a"),te=(0,b.h)(),re=(0,y.L)(),{data:le,isLoading:ne,isError:oe,error:de,refetch:ce}=(0,i.Qi)({page:P,search:M,id:K,role:re,email:te}),[ie]=(0,i.QA)();(0,t.useEffect)((()=>{le&&le.data&&(a(Array.isArray(le.data)?le.data:[le.data]),I(le.pagination.startIndex),k(P),_(le.pagination.totalItems),H(le.pagination.endIndex),T(le.pagination.totalPages),Z(le.moduleAccess.write),J(le.moduleAccess.read),$(le.moduleAccess.fullAccess)),oe&&500===(null===de||void 0===de?void 0:de.status)?se(!0):se(!1)}),[le,P,re,de,oe]);const me=()=>{G(!0),R(z),ce({page:P,search:z}).then((()=>{G(!1)}))},xe=(0,j.Zp)(),ue=[{Header:"ID",accessor:"s_no"},{Header:"Photo",accessor:"image",Cell:e=>{const s=e.value;return s?(0,w.jsx)("img",{src:s,alt:"Profile",style:{width:"50px",height:"50px",borderRadius:"100%"}}):(0,w.jsx)(x.jNg,{size:50})}},{Header:"Id Proof",accessor:"idProof",Cell:e=>{const s=e.value;return s?(0,w.jsx)("img",{src:s,alt:"Profile",style:{width:"50px",height:"50px",borderRadius:"100%"}}):(0,w.jsx)(x.jNg,{size:50})}},{Header:"Employee Id",accessor:"employeeId"},{Header:"Name Of Employee",accessor:"nameOfEmployee"},{Header:"Role",accessor:"roleOfEmployee"},{Header:"Phone Number",accessor:"phoneNumber"},{Header:"Email",accessor:"email"},{Header:"Date Of Birth",accessor:"dateOfBirth"},{Header:"Created At",accessor:"createdAt",Cell:e=>{let{value:s}=e;return ae(s)}},{Header:"Updated At",accessor:"updatedAt",Cell:e=>{let{value:s}=e;return ae(s)}}];return X&&ue.push({Header:"ACTIONS",accessor:"action",Cell:e=>{const s=e.row.original._id;return(0,w.jsxs)("div",{className:"d-flex align-items-center justify-content-center flex-row",children:[(0,w.jsx)(f.N_,{to:"/admin/edit-employee/".concat(s),children:(0,w.jsx)(r.A,{variant:"warning",className:"ms-2",children:(0,w.jsx)(p.uO9,{})})}),(0,w.jsx)(r.A,{variant:"danger",className:"ms-2",onClick:()=>(e=>{Y(e),Q(!0)})(s),children:(0,w.jsx)(g.b6i,{})})]})}}),(0,w.jsx)("div",{children:ne?(0,w.jsx)(C.A,{}):(0,w.jsx)(w.Fragment,{children:ee?(0,w.jsx)(S.A,{}):q?(0,w.jsxs)(l.A,{fluid:!0,className:"mt-3 ",children:[(0,w.jsx)(n.A,{className:"boxShadow p-4 mb-4 mt-4",children:(0,w.jsxs)(o.A,{className:"d-flex flex-row justify-content-between mt-1",children:[(0,w.jsx)("h4",{className:"fw-bold",children:"Employee"}),V?(0,w.jsx)("div",{children:(0,w.jsxs)(r.A,{style:{backgroundColor:e,border:"none"},className:"p-2 m-1",onClick:()=>{xe("/admin/add-employee")},children:[(0,w.jsx)(p.OiG,{size:20}),(0,w.jsxs)("span",{className:"d-none d-md-inline",children:[" ","Add Employee"]})]})}):(0,w.jsx)(w.Fragment,{})]})}),(0,w.jsxs)(n.A,{className:"boxShadow p-3 mb-4 d-flex flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row",children:[(0,w.jsx)(o.A,{className:"my-4 mx-2",xxl:3,xl:3,lg:3,sm:6,md:6,children:(0,w.jsxs)("div",{className:"input-group",children:[(0,w.jsx)("span",{className:"input-group-text",children:(0,w.jsx)(m.YQq,{})}),(0,w.jsx)("input",{type:"text",placeholder:"Search Employee...",className:"form-control",value:z,onChange:e=>F(e.target.value),onKeyPress:e=>{"Enter"===e.key&&me()}}),z&&(0,w.jsx)("span",{className:"input-group-text",onClick:()=>{F(""),R("")},children:(0,w.jsx)(m.IeJ,{})})]})}),(0,w.jsx)(o.A,{className:"d-flex flex-column text-center my-4",xxl:2,xl:2,lg:2,sm:3,md:3,children:(0,w.jsx)(r.A,{style:{backgroundColor:e,border:"none"},onClick:me,disabled:B||""===z,children:B?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(d.A,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true",className:"me-2"}),"Searching..."]}):"Search"})})]}),(0,w.jsx)(n.A,{className:"boxShadow p-4 mb-4",children:(0,w.jsx)(c.A,{COLUMNS:ue,MOCK_DATA:s,currentPage:P,startIndex:E,endIndex:O,setCurrentPage:k,totalItems:D,totalPages:L})}),(0,w.jsx)(h.A,{YES:async()=>{try{const a=await ie({id:W,role:re});var e,s;if(Q(!1),Y(""),null!==a&&void 0!==a&&a.data)u.oR.success(null===a||void 0===a||null===(e=a.data)||void 0===e?void 0:e.message,{autoClose:1e3});else u.oR.error(null===a||void 0===a||null===(s=a.error)||void 0===s?void 0:s.data.error,{autoClose:1e3})}catch(de){console.error(de)}},DELETESTATE:U,ONCLICK:()=>{Q(!1)},DESCRIPTION:"Are you sure want to delete this Employee",DELETETITLE:"Employee"})]}):(0,w.jsx)(N.A,{})})})}},39585:()=>{}}]);
//# sourceMappingURL=5533.1b4ee0c3.chunk.js.map