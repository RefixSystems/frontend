"use strict";(self.webpackChunklaptop_rental_web_app=self.webpackChunklaptop_rental_web_app||[]).push([[6072],{98954:(e,s,a)=>{a.d(s,{A:()=>C});var t=a(65043),r=a(71094),l=a(53519),n=a(61072),o=a(64196),d=a(78602),c=a(14282),i=a(49804),x=a(60184),u=a(3825),m=a(92157),h=a.n(m),p=a(13441),g=(a(39585),a(36653)),j=a(70579);const C=e=>{const{color:s}=(0,g.D)(),a=(0,t.useMemo)((()=>e.COLUMNS),[e.COLUMNS]),m=(0,t.useMemo)((()=>e.MOCK_DATA||[]),[e.MOCK_DATA]),{getTableProps:C,getTableBodyProps:f,headerGroups:N,prepareRow:A,page:v}=(0,r.useTable)({columns:a,data:m,autoResetWidth:!1},r.useGlobalFilter,r.useSortBy,r.usePagination);return(0,j.jsx)("div",{children:(0,j.jsx)(l.A,{fluid:!0,className:"ml-xxl-n4 ml-xl-n4 ml-lg-n4",children:(0,j.jsxs)(n.A,{children:[(0,j.jsxs)(o.A,{className:"justify-content-center align-items-center",striped:!0,hover:!0,...C(),responsive:!0,style:{width:"100%",marginLeft:"25px"},children:[(0,j.jsx)("thead",{children:N.map(((e,s)=>(0,t.createElement)("tr",{...e.getHeaderGroupProps(),key:s},e.headers.map(((e,s)=>(0,t.createElement)("th",{...e.getHeaderProps(),key:s,className:"text-center text-dark",style:{width:"".concat(e.width,"px"),whiteSpace:"nowrap",justifyContent:"center",alignItems:"center"},onClick:s=>{s.target.classList.contains("fa-sort")||"ACTIONS"===e.render("Header")||e.toggleSortBy(!e.isSortedDesc)}},"ACTIONS"===e.render("Header")?(0,j.jsx)(j.Fragment,{children:e.render("Header")}):(0,j.jsxs)("div",{children:[e.render("Header"),(0,j.jsx)(x.MjW,{className:"mx-2"})]})))))))}),(0,j.jsx)("tbody",{...f(),children:v.length>0?v.map(((s,a)=>(A(s),(0,t.createElement)("tr",{...s.getRowProps(),key:a},s.cells.map(((s,r)=>{const l="action"===s.column.id||"localShop"===s.column.id||"serviceCenter"===s.column.id||"ourServices"===s.column.id||"addInCarousel"===s.column.id;return(0,t.createElement)("td",{...s.getCellProps(),key:r,className:"text-secondary text-start",style:{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",maxWidth:"20ch",backgroundColor:a<=e.count-1?"#cfd1d1":""}},l||s.value?s.render("Cell"):"-")})))))):(0,j.jsx)("tr",{children:(0,j.jsx)("td",{colSpan:a.length,className:"text-center text-dark",children:"No Data Found"})})})]}),(0,j.jsxs)(d.A,{className:"".concat(v.length>0?"d-flex":"d-none"," flex-row justify-content-center align-items-center"),children:[(0,j.jsx)(d.A,{className:"d-flex justify-content-start align-items-center flex-wrap",children:(0,j.jsxs)("span",{className:"m-1",children:["Showing","",(0,j.jsxs)("strong",{className:"m-2",children:[e.startIndex," to ",e.endIndex," of"," ",(0,j.jsxs)("strong",{className:"m-2",children:[" ",e.totalItems," entries"]})]})]})}),(0,j.jsx)(d.A,{className:" mt-3 d-none d-sm-none d-md-none d-xxl-flex d-xl-flex d-lg-flex justify-content-end align-items-center",children:(0,j.jsx)(h(),{breakLabel:"...",onPageChange:s=>e.setCurrentPage(s.selected+1),pageRangeDisplayed:5,pageCount:e.totalPages,renderOnZeroPageCount:null,activeClassName:"active",pageClassName:"page-item",pageLinkClassName:"page-link",previousClassName:"page-item",previousLinkClassName:"page-link",nextClassName:"page-item",nextLinkClassName:"page-link",containerClassName:"pagination",previousLabel:(0,j.jsx)(p.Vx.Provider,{value:{color:s,size:"28px"},children:(0,j.jsx)(u.dnY,{})}),nextLabel:(0,j.jsx)(p.Vx.Provider,{value:{color:s,size:"28px"},children:(0,j.jsx)(u.m2f,{})})})}),(0,j.jsxs)(d.A,{className:"d-flex d-sm-flex d-md-flex d-xxl-none d-xl-none d-lg-none justify-content-end align-items-center",children:[(0,j.jsx)(c.A,{style:{backgroundColor:s,border:"none"},onClick:()=>e.setCurrentPage(e.currentPage-1),disabled:1===e.currentPage,className:"m-2",children:(0,j.jsx)(i.o_z,{size:14})}),(0,j.jsx)(c.A,{style:{backgroundColor:s,border:"none"},onClick:()=>{e.setCurrentPage(e.currentPage+1)},disabled:e.currentPage===e.totalPages,children:(0,j.jsx)(i.hdn,{size:14})})]})]})]})})})}},36072:(e,s,a)=>{a.r(s),a.d(s,{default:()=>b});var t=a(65043),r=a(53519),l=a(61072),n=a(78602),o=a(14282),d=a(27417),c=a(98954),i=a(82091),x=a(31462),u=a(17962),m=a(36017),h=a(32479),p=a(39110),g=a(2519),j=a(63401),C=a(36653),f=a(31121),N=a(85959),A=a(33056),v=a(70579);const b=()=>{const{color:e}=(0,C.D)(),[s,a]=(0,t.useState)([]),[b,y]=(0,t.useState)(1),[S,w]=(0,t.useState)(1),[P,k]=(0,t.useState)(1),[I,L]=(0,t.useState)(1),[E,H]=(0,t.useState)(),[T,D]=(0,t.useState)(""),[O,M]=(0,t.useState)(""),[_,R]=(0,t.useState)(!1),[U,z]=(0,t.useState)(""),[F,K]=(0,t.useState)(!1),[B,G]=(0,t.useState)(!1),[W,Y]=(0,t.useState)(0),[q,V]=(0,t.useState)(!1),J=e=>(0,f.GP)(new Date(e),"dd-MMM-yyyy h:mm a"),Q=(0,h.L)(),Z=(0,A.O)(),{data:X,isLoading:$,refetch:ee,isError:se,error:ae}=(0,i.pI)({page:b,search:T,role:Q,phoneNumber:Z}),[te]=(0,i.Nh)();(0,t.useEffect)((()=>{X&&X.data&&(a(X.data),w(X.pagination.startIndex),y(b),H(X.pagination.totalItems),k(X.pagination.endIndex),L(X.pagination.totalPages),V(X.moduleAccess.read),Y(X.userCount)),se&&500===(null===ae||void 0===ae?void 0:ae.status)?G(!0):G(!1)}),[X,b,Q,ae,se]);const re=()=>{K(!0),D(O),ee({page:b,search:O}).then((()=>{K(!1)}))},le=[{Header:"ID",accessor:"s_no"},{Header:"Profile Image",accessor:"profileImage",Cell:e=>{const s=e.value;return s?(0,v.jsx)("img",{src:s,alt:"Profile",style:{width:"50px",height:"50px",borderRadius:"100%"}}):(0,v.jsx)(u.qnL,{size:50})}},{Header:"User Name",accessor:"userName"},{Header:"Phone Number",accessor:"phoneNumber"},{Header:"Email",accessor:"email"},{Header:"Date Of Birth",accessor:"dob"},{Header:"Address",accessor:"address",Cell:e=>{let{value:s}=e;return s&&s.length>0?s[0].address:""}},{Header:"Created At",accessor:"createdAt",Cell:e=>{let{value:s}=e;return J(s)}},{Header:"Updated At",accessor:"updatedAt",Cell:e=>{let{value:s}=e;return J(s)}}];return(0,v.jsxs)("div",{children:[$?(0,v.jsx)(p.A,{}):(0,v.jsx)(v.Fragment,{children:B?(0,v.jsx)(N.A,{}):q?(0,v.jsxs)(r.A,{fluid:!0,className:"mt-3 reduced-width-row ",children:[(0,v.jsx)(l.A,{className:"boxShadow p-4 mb-4 mt-4  ",children:(0,v.jsx)(n.A,{className:"d-flex flex-row justify-content-between mt-1",children:(0,v.jsx)("h4",{className:"fw-bold ",children:" User List"})})}),(0,v.jsxs)(l.A,{className:"  boxShadow p-4  mb-3 mt-3 d-flex  flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row",children:[(0,v.jsx)(n.A,{className:"my-2 mx-2 ",xxl:3,xl:3,lg:3,sm:6,md:6,children:(0,v.jsxs)("div",{className:"input-group",children:[(0,v.jsx)("span",{className:"input-group-text",children:(0,v.jsx)(x.YQq,{})}),(0,v.jsx)("input",{type:"text",placeholder:"Search UserList...",className:"form-control",value:O,onChange:e=>M(e.target.value),onKeyPress:e=>{"Enter"===e.key&&re()}}),O&&(0,v.jsx)("span",{className:"input-group-text",onClick:()=>{M(""),D("")},children:(0,v.jsx)(x.IeJ,{})})]})}),(0,v.jsx)(n.A,{className:"d-flex flex-column text-center my-2 ",xxl:2,xl:2,lg:2,sm:3,md:3,children:(0,v.jsx)(o.A,{style:{backgroundColor:e,border:"none"},onClick:re,disabled:F||""===O,children:F?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(d.A,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true",className:"me-2"}),"Searching..."]}):"Search"})})]}),(0,v.jsx)(l.A,{className:"boxShadow p-4 mb-4 ",children:(0,v.jsx)(c.A,{COLUMNS:le,MOCK_DATA:s,currentPage:b,startIndex:S,endIndex:P,setCurrentPage:y,totalItems:E,totalPages:I,count:W})})]}):(0,v.jsx)(g.A,{})}),(0,v.jsx)(m.A,{YES:async()=>{try{const a=await te({id:U,role:Q});var e,s;if(R(!1),z(""),null!==a&&void 0!==a&&a.data)j.oR.success(null===a||void 0===a||null===(e=a.data)||void 0===e?void 0:e.message,{autoClose:1e3});else j.oR.error(null===a||void 0===a||null===(s=a.error)||void 0===s?void 0:s.data.error,{autoClose:1e3})}catch(ae){console.error(ae)}},DELETESTATE:_,ONCLICK:()=>R(!1),DESCRIPTION:"Are you sure you want to delete this userlist",DELETETITLE:"UserList"})]})}},39585:()=>{}}]);
//# sourceMappingURL=6072.ab0886d9.chunk.js.map