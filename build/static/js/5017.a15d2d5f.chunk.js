"use strict";(self.webpackChunklaptop_rental_web_app=self.webpackChunklaptop_rental_web_app||[]).push([[5017],{39110:(e,s,r)=>{r.d(s,{A:()=>n});r(65043);var a=r(53519),l=(r(36386),r(79340)),t=r(70579);const n=()=>(0,t.jsxs)(a.A,{className:"vh-100 d-flex flex-column justify-content-center align-items-center",children:[(0,t.jsx)("img",{src:l,alt:"Loading...",style:{width:"150px",height:"150px"}}),(0,t.jsx)("div",{className:"text mt-3",children:"Loading ..."})]})},98954:(e,s,r)=>{r.d(s,{A:()=>v});var a=r(65043),l=r(71094),t=r(53519),n=r(61072),o=r(64196),c=r(78602),i=r(14282),d=r(49804),u=r(60184),x=r(3825),h=r(92157),m=r.n(h),j=r(13441),p=(r(39585),r(36653)),g=r(70579);const v=e=>{const{color:s}=(0,p.D)(),r=(0,a.useMemo)((()=>e.COLUMNS),[e.COLUMNS]),h=(0,a.useMemo)((()=>e.MOCK_DATA||[]),[e.MOCK_DATA]),{getTableProps:v,getTableBodyProps:C,headerGroups:A,prepareRow:S,page:f}=(0,l.useTable)({columns:r,data:h,autoResetWidth:!1},l.useGlobalFilter,l.useSortBy,l.usePagination);return(0,g.jsx)("div",{children:(0,g.jsx)(t.A,{fluid:!0,className:"ml-xxl-n4 ml-xl-n4 ml-lg-n4",children:(0,g.jsxs)(n.A,{children:[(0,g.jsxs)(o.A,{className:"justify-content-center align-items-center",striped:!0,hover:!0,...v(),responsive:!0,style:{width:"100%",marginLeft:"25px"},children:[(0,g.jsx)("thead",{children:A.map(((e,s)=>(0,a.createElement)("tr",{...e.getHeaderGroupProps(),key:s},e.headers.map(((e,s)=>(0,a.createElement)("th",{...e.getHeaderProps(),key:s,className:"text-center text-dark",style:{width:"".concat(e.width,"px"),whiteSpace:"nowrap",justifyContent:"center",alignItems:"center"},onClick:s=>{s.target.classList.contains("fa-sort")||"ACTIONS"===e.render("Header")||e.toggleSortBy(!e.isSortedDesc)}},"ACTIONS"===e.render("Header")?(0,g.jsx)(g.Fragment,{children:e.render("Header")}):(0,g.jsxs)("div",{children:[e.render("Header"),(0,g.jsx)(u.MjW,{className:"mx-2"})]})))))))}),(0,g.jsx)("tbody",{...C(),children:f.length>0?f.map(((s,r)=>(S(s),(0,a.createElement)("tr",{...s.getRowProps(),key:r},s.cells.map(((s,l)=>{const t="action"===s.column.id||"localShop"===s.column.id||"serviceCenter"===s.column.id||"ourServices"===s.column.id||"addInCarousel"===s.column.id;return(0,a.createElement)("td",{...s.getCellProps(),key:l,className:"text-secondary text-start",style:{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",maxWidth:"20ch",backgroundColor:r<=e.count-1?"#cfd1d1":""}},t||s.value?s.render("Cell"):"-")})))))):(0,g.jsx)("tr",{children:(0,g.jsx)("td",{colSpan:r.length,className:"text-center text-dark",children:"No Data Found"})})})]}),(0,g.jsxs)(c.A,{className:"".concat(f.length>0?"d-flex":"d-none"," flex-row justify-content-center align-items-center"),children:[(0,g.jsx)(c.A,{className:"d-flex justify-content-start align-items-center flex-wrap",children:(0,g.jsxs)("span",{className:"m-1",children:["Showing","",(0,g.jsxs)("strong",{className:"m-2",children:[e.startIndex," to ",e.endIndex," of"," ",(0,g.jsxs)("strong",{className:"m-2",children:[" ",e.totalItems," entries"]})]})]})}),(0,g.jsx)(c.A,{className:" mt-3 d-none d-sm-none d-md-none d-xxl-flex d-xl-flex d-lg-flex justify-content-end align-items-center",children:(0,g.jsx)(m(),{breakLabel:"...",onPageChange:s=>e.setCurrentPage(s.selected+1),pageRangeDisplayed:5,pageCount:e.totalPages,renderOnZeroPageCount:null,activeClassName:"active",pageClassName:"page-item",pageLinkClassName:"page-link",previousClassName:"page-item",previousLinkClassName:"page-link",nextClassName:"page-item",nextLinkClassName:"page-link",containerClassName:"pagination",previousLabel:(0,g.jsx)(j.Vx.Provider,{value:{color:s,size:"28px"},children:(0,g.jsx)(x.dnY,{})}),nextLabel:(0,g.jsx)(j.Vx.Provider,{value:{color:s,size:"28px"},children:(0,g.jsx)(x.m2f,{})})})}),(0,g.jsxs)(c.A,{className:"d-flex d-sm-flex d-md-flex d-xxl-none d-xl-none d-lg-none justify-content-end align-items-center",children:[(0,g.jsx)(i.A,{style:{backgroundColor:s,border:"none"},onClick:()=>e.setCurrentPage(e.currentPage-1),disabled:1===e.currentPage,className:"m-2",children:(0,g.jsx)(d.o_z,{size:14})}),(0,g.jsx)(i.A,{style:{backgroundColor:s,border:"none"},onClick:()=>{e.setCurrentPage(e.currentPage+1)},disabled:e.currentPage===e.totalPages,children:(0,g.jsx)(d.hdn,{size:14})})]})]})]})})})}},15017:(e,s,r)=>{r.r(s),r.d(s,{default:()=>w});var a=r(65043),l=r(14282),t=r(53519),n=r(61072),o=r(78602),c=r(27417),i=r(25284),d=r(24522),u=r(98954),x=r(31462),h=r(63401),m=r(60184),j=r(36017),p=r(6720),g=r(73216),v=r(29461),C=r(32479),A=r(39110),S=r(2519),f=r(36653),N=r(31121),b=r(2661),y=r(70579);const w=()=>{const{color:e}=(0,f.D)(),[s,r]=(0,a.useState)([]),[w,k]=(0,a.useState)(1),[P,I]=(0,a.useState)(1),[L,O]=(0,a.useState)(1),[H,E]=(0,a.useState)(1),[F,T]=(0,a.useState)(0),[D,M]=(0,a.useState)(""),[G,R]=(0,a.useState)(""),[_,z]=(0,a.useState)(!1),{id:Y}=(0,g.g)(),[B,U]=(0,a.useState)(null),[K,Z]=(0,a.useState)(!1),[W,V]=(0,a.useState)(""),[q,J]=(0,a.useState)(null),[Q,X]=(0,a.useState)(!1),[$,ee]=(0,a.useState)(""),[se,re]=(0,a.useState)(!1),[ae,le]=(0,a.useState)(!1),[te,ne]=(0,a.useState)(!1),[oe,ce]=(0,a.useState)(!1),[ie,de]=(0,a.useState)(!1),ue=(0,C.L)(),[xe,he]=(0,a.useState)(""),[me,je]=(0,a.useState)(""),[pe,ge]=(0,a.useState)(""),[ve,Ce]=(0,a.useState)(""),[Ae,Se]=(0,a.useState)(""),[fe,Ne]=(0,a.useState)(""),[be,ye]=(0,a.useState)(""),[we,ke]=(0,a.useState)(""),{data:Pe,refetch:Ie,isLoading:Le}=(0,v.i)({page:w,search:D,id:Y,role:ue}),[Oe]=(0,v.DI)(),[He]=(0,v.wc)(),[Ee]=(0,v.gc)(),Fe=e=>(0,N.GP)(new Date(e),"dd-MMM-yyyy h:mm a");(0,a.useEffect)((()=>{Pe&&Pe.data&&(r(Pe.data),I(Pe.pagination.startIndex),k(w),T(Pe.pagination.totalItems),O(Pe.pagination.endIndex),E(Pe.pagination.totalPages),ce(Pe.moduleAccess.fullAccess),le(Pe.moduleAccess.write),ne(Pe.moduleAccess.read))}),[Pe,w,ue]);const Te=()=>{z(!0),M(G),Ie({page:w,search:G}).then((()=>{z(!1)}))},De=()=>{Z(!1),U(null),V(""),J(null)},Me=()=>{re(!1),he(""),je(""),ge(""),Ce("")},Ge=[{Header:"ID",accessor:"s_no"},{Header:"Name Of Feature",accessor:"nameOfFeature"},{Header:"Service Center",accessor:"serviceCenter",Cell:e=>{let{cell:s}=e;return s.row.original.serviceCenter?(0,y.jsx)(m.CMH,{style:{color:"green"}}):(0,y.jsx)(b.jZb,{style:{color:"red"}})}},{Header:"Local Shop",accessor:"localShop",Cell:e=>{let{cell:s}=e;return!0===s.row.original.localShop?(0,y.jsx)(m.CMH,{color:"green"}):(0,y.jsx)(b.jZb,{color:"red"})}},{Header:"Our Services",accessor:"ourServices",Cell:e=>{let{cell:s}=e;return!0===s.row.original.ourServices?(0,y.jsx)(m.CMH,{style:{color:"green"}}):(0,y.jsx)(b.jZb,{style:{color:"red"}})}},{Header:"Created At",accessor:"createdAt",Cell:e=>{let{value:s}=e;return Fe(s)}},{Header:"Updated At",accessor:"updatedAt",Cell:e=>{let{value:s}=e;return Fe(s)}}];return oe&&Ge.push({Header:"ACTIONS",accessor:"action",Cell:e=>{const r=e.row.original._id;return(0,y.jsxs)("div",{className:"d-flex align-items-center justify-content-center flex-row",children:[(0,y.jsx)(l.A,{variant:"warning",onClick:()=>(e=>{const r=s.find((s=>s._id===e));r&&(U(e),Se(r.nameOfFeature),Ne(r.serviceCenter),ye(r.localShop),ke(r.ourServices),Z(!0))})(r),children:(0,y.jsx)(m.uO9,{})}),(0,y.jsx)(l.A,{variant:"danger",className:"ms-2",onClick:()=>(e=>{ee(e),X(!0)})(r),children:(0,y.jsx)(p.b6i,{})})]})}}),(0,y.jsxs)("div",{children:[Le?(0,y.jsx)(A.A,{}):(0,y.jsx)(y.Fragment,{children:te?(0,y.jsxs)(t.A,{fluid:!0,className:"mt-3 ",children:[(0,y.jsx)(n.A,{className:"boxShadow p-4 mb-4 mt-4",children:(0,y.jsxs)(o.A,{className:"d-flex flex-row justify-content-between mt-1",children:[(0,y.jsx)("h4",{className:"fw-bold",children:"Price Comparison"}),ae?(0,y.jsx)("div",{children:(0,y.jsxs)(l.A,{style:{backgroundColor:e,border:"none"},className:"p-2 m-1",onClick:()=>{re(!0)},children:[(0,y.jsx)(m.OiG,{size:20}),(0,y.jsxs)("span",{className:"d-none d-md-inline",children:[" ","Add Price Comparison"]})]})}):(0,y.jsx)(y.Fragment,{})]})}),(0,y.jsxs)(n.A,{className:"boxShadow p-3 mb-4 d-flex flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row",children:[(0,y.jsx)(o.A,{className:"my-4 mx-2",xxl:3,xl:3,lg:3,sm:6,md:6,children:(0,y.jsxs)("div",{className:"input-group",children:[(0,y.jsx)("span",{className:"input-group-text",children:(0,y.jsx)(x.YQq,{})}),(0,y.jsx)("input",{type:"text",placeholder:"Search Price Comparison...",className:"form-control",value:G,onChange:e=>R(e.target.value),onKeyPress:e=>{"Enter"===e.key&&Te()}}),G&&(0,y.jsx)("span",{className:"input-group-text",onClick:()=>{R(""),M("")},children:(0,y.jsx)(x.IeJ,{})})]})}),(0,y.jsx)(o.A,{className:"d-flex flex-column text-center my-4",xxl:2,xl:2,lg:2,sm:3,md:3,children:(0,y.jsx)(l.A,{style:{backgroundColor:e,border:"none"},onClick:Te,disabled:_||""===G,children:_?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(c.A,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true",className:"me-2"}),"Searching..."]}):"Search"})})]}),(0,y.jsx)(n.A,{className:"boxShadow p-4 mb-4",children:(0,y.jsx)(u.A,{COLUMNS:Ge,MOCK_DATA:s,currentPage:w,startIndex:P,endIndex:L,setCurrentPage:k,totalItems:F,totalPages:H})}),(0,y.jsx)(j.A,{YES:async()=>{try{const r=await He({id:$,role:ue});var e,s;if(X(!1),ee(""),null!==r&&void 0!==r&&r.data)h.oR.success(null===r||void 0===r||null===(e=r.data)||void 0===e?void 0:e.message,{autoClose:1e3});else h.oR.error(null===r||void 0===r||null===(s=r.error)||void 0===s?void 0:s.data.error,{autoClose:1e3})}catch(r){console.error(r)}},DELETESTATE:Q,ONCLICK:()=>{X(!1)},DESCRIPTION:"Are you sure want to delete this PriceComparison",DELETETITLE:"PriceComparison"})]}):(0,y.jsx)(S.A,{})}),(0,y.jsxs)(i.A,{show:K,onHide:De,centered:!0,children:[(0,y.jsx)(i.A.Header,{closeButton:!0,children:(0,y.jsx)(i.A.Title,{children:"Edit Price Comparison"})}),(0,y.jsx)(i.A.Body,{children:(0,y.jsxs)(d.A,{children:[(0,y.jsxs)(d.A.Group,{controlId:"nameOfFeatureInput",children:[(0,y.jsxs)(d.A.Label,{children:["Name Of Feature ",(0,y.jsx)("span",{className:"text-danger",children:"*"})]}),(0,y.jsx)(d.A.Control,{type:"text",value:Ae,onChange:e=>Se(e.target.value),placeholder:"Enter the feature name here"})]}),(0,y.jsxs)(d.A.Group,{controlId:"serviceCenterDropdown",children:[(0,y.jsxs)(d.A.Label,{children:["Service Center ",(0,y.jsx)("span",{className:"text-danger",children:"*"})]}),(0,y.jsxs)(d.A.Select,{value:fe,onChange:e=>{return s=e.target.value,void Ne(""===s?"":"true"===s);var s},children:[(0,y.jsx)("option",{value:"",disabled:!0,selected:!0,children:"Select an option"}),(0,y.jsx)("option",{value:"true",children:"Yes"}),(0,y.jsx)("option",{value:"false",children:"No"})]})]}),(0,y.jsxs)(d.A.Group,{controlId:"localShopDropdown",children:[(0,y.jsxs)(d.A.Label,{children:["Local Shop ",(0,y.jsx)("span",{className:"text-danger",children:"*"})]}),(0,y.jsxs)(d.A.Select,{value:be,onChange:e=>{return s=e.target.value,void ye(""===s?"":"true"===s);var s},children:[(0,y.jsx)("option",{value:"",disabled:!0,selected:!0,children:"Select an option"}),(0,y.jsx)("option",{value:"true",children:"Yes"}),(0,y.jsx)("option",{value:"false",children:"No"})]})]}),(0,y.jsxs)(d.A.Group,{controlId:"ourServicesDropdown",children:[(0,y.jsxs)(d.A.Label,{children:["Our Services ",(0,y.jsx)("span",{className:"text-danger",children:"*"})]}),(0,y.jsxs)(d.A.Select,{value:we,onChange:e=>{return s=e.target.value,void ke(""===s?"":"true"===s);var s},children:[(0,y.jsx)("option",{value:"",disabled:!0,selected:!0,children:"Select an option"}),(0,y.jsx)("option",{value:"true",children:"Yes"}),(0,y.jsx)("option",{value:"false",children:"No"})]})]})]})}),(0,y.jsxs)(i.A.Footer,{children:[(0,y.jsx)(l.A,{variant:"secondary",onClick:De,children:"Cancel"}),(0,y.jsx)(l.A,{style:{backgroundColor:e,border:"none"},onClick:async()=>{if(Ae&&null!==fe&&null!==be&&null!==we){de(!0);try{const e={nameOfFeature:Ae,serviceCenter:fe,localShop:be,ourServices:we},s=await Oe({id:B,role:ue,data:e});s.data?(h.oR.success(s.data.message,{autoClose:1e3}),Z(!1),Ie()):h.oR.error(s.error.data.error,{autoClose:1e3})}catch(e){console.error(e)}finally{de(!1)}}else h.oR.error("Please fill all the fields",{autoClose:1e3})},disabled:ie,children:ie?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(c.A,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true",className:"me-2"}),"Updating..."]}):"Update"})]})]}),(0,y.jsxs)(i.A,{show:se,onHide:Me,centered:!0,children:[(0,y.jsx)(i.A.Header,{closeButton:!0,children:(0,y.jsx)(i.A.Title,{children:"Add Price Comparison"})}),(0,y.jsx)(i.A.Body,{children:(0,y.jsxs)(d.A,{children:[(0,y.jsxs)(d.A.Group,{controlId:"featureName",children:[(0,y.jsxs)(d.A.Label,{children:["Name Of Feature ",(0,y.jsx)("span",{className:"text-danger",children:"*"})]}),(0,y.jsx)(d.A.Control,{type:"text",placeholder:"Enter the feature name here",value:xe,onChange:e=>he(e.target.value)})]}),(0,y.jsxs)(d.A.Group,{controlId:"serviceCenter",children:[(0,y.jsxs)(d.A.Label,{children:["Service Center ",(0,y.jsx)("span",{className:"text-danger",children:"*"})]}),(0,y.jsxs)(d.A.Select,{value:me,onChange:e=>{return s=e.target.value,void je(""===s?"":"true"===s);var s},children:[(0,y.jsx)("option",{value:"",children:"Select"}),(0,y.jsx)("option",{value:"true",children:"Yes"}),(0,y.jsx)("option",{value:"false",children:"No"})]})]}),(0,y.jsxs)(d.A.Group,{controlId:"localShop",children:[(0,y.jsxs)(d.A.Label,{children:["Local Shop ",(0,y.jsx)("span",{className:"text-danger",children:"*"})]}),(0,y.jsxs)(d.A.Select,{value:pe,onChange:e=>{return s=e.target.value,void ge(""===s?"":"true"===s);var s},children:[(0,y.jsx)("option",{value:"",children:"Select"}),(0,y.jsx)("option",{value:"true",children:"Yes"}),(0,y.jsx)("option",{value:"false",children:"No"})]})]}),(0,y.jsxs)(d.A.Group,{controlId:"ourServices",children:[(0,y.jsxs)(d.A.Label,{children:["Our Services ",(0,y.jsx)("span",{className:"text-danger",children:"*"})]}),(0,y.jsxs)(d.A.Select,{value:ve,onChange:e=>{return s=e.target.value,void Ce(""===s?"":"true"===s);var s},children:[(0,y.jsx)("option",{value:"",children:"Select"}),(0,y.jsx)("option",{value:"true",children:"Yes"}),(0,y.jsx)("option",{value:"false",children:"No"})]})]})]})}),(0,y.jsxs)(i.A.Footer,{children:[(0,y.jsx)(l.A,{variant:"secondary",onClick:Me,children:"Cancel"}),(0,y.jsx)(l.A,{style:{backgroundColor:e,border:"none"},onClick:async()=>{if(xe&&void 0!==me&&void 0!==pe&&void 0!==ve){de(!0);try{const e={nameOfFeature:xe,serviceCenter:me,localShop:pe,ourServices:ve},s=await Ee({role:ue,data:e});s.data?(h.oR.success(s.data.message,{autoClose:1e3}),re(!1),Ie(),he(""),je(""),ge(""),Ce("")):(h.oR.error(s.error.data.error,{autoClose:1e3}),he(""),je(""),ge(""),Ce(""))}catch(e){console.error(e)}finally{de(!1)}}else h.oR.error("Please fill all the fields",{autoClose:1e3})},disabled:ie,children:ie?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(c.A,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true",className:"me-2"}),"Add..."]}):"Add"})]})]})]})}},39585:()=>{}}]);
//# sourceMappingURL=5017.a15d2d5f.chunk.js.map