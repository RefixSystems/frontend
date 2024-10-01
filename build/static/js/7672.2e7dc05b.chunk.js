"use strict";(self.webpackChunklaptop_rental_web_app=self.webpackChunklaptop_rental_web_app||[]).push([[7672],{39110:(e,s,a)=>{a.d(s,{A:()=>t});a(65043);var l=a(53519),r=(a(36386),a(79340)),d=a(70579);const t=()=>(0,d.jsxs)(l.A,{className:"vh-100 d-flex flex-column justify-content-center align-items-center",children:[(0,d.jsx)("img",{src:r,alt:"Loading...",style:{width:"150px",height:"150px"}}),(0,d.jsx)("div",{className:"text mt-3",children:"Loading ..."})]})},8962:(e,s,a)=>{a.d(s,{A:()=>o});var l=a(65043),r=a(71094),d=a(53519),t=a(61072),c=a(64196),n=a(60184),i=(a(39585),a(70579));const o=e=>{const s=(0,l.useMemo)((()=>e.COLUMNS),[e.COLUMNS]),a=(0,l.useMemo)((()=>e.MOCK_DATA||[]),[e.MOCK_DATA]),{getTableProps:o,getTableBodyProps:m,headerGroups:x,prepareRow:h,page:j}=(0,r.useTable)({columns:s,data:a,autoResetWidth:!1},r.useGlobalFilter,r.useSortBy,r.usePagination);return(0,i.jsx)("div",{children:(0,i.jsx)(d.A,{fluid:!0,className:"ml-xxl-n4 ml-xl-n4 ml-lg-n4",children:(0,i.jsx)(t.A,{className:"d-flex  flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row",children:(0,i.jsxs)(c.A,{className:"justify-content-center align-items-center",striped:!0,bordered:!0,hover:!0,...o(),responsive:!0,style:{width:"100%",marginLeft:"25px"},children:[(0,i.jsx)("thead",{children:x.map(((e,s)=>(0,l.createElement)("tr",{...e.getHeaderGroupProps(),key:s},e.headers.map(((e,s)=>(0,l.createElement)("th",{...e.getHeaderProps(),key:s,className:"text-center text-dark",style:{width:"".concat(e.width,"px"),whiteSpace:"nowrap",justifyContent:"center",alignItems:"center"},onClick:s=>{s.target.classList.contains("fa-sort")||"ACTIONS"===e.render("Header")||e.toggleSortBy(!e.isSortedDesc)}},"ACTIONS"===e.render("Header")?(0,i.jsx)(i.Fragment,{children:e.render("Header")}):(0,i.jsxs)("div",{children:[e.render("Header"),(0,i.jsx)(n.MjW,{className:"mx-2"})]})))))))}),(0,i.jsx)("tbody",{...m(),children:j.length>0?j.map(((e,s)=>(h(e),(0,l.createElement)("tr",{...e.getRowProps(),key:s},e.cells.map(((e,s)=>{const a="action"===e.column.id;return(0,l.createElement)("td",{...e.getCellProps(),key:s,className:"text-secondary text-start",style:{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",maxWidth:"20ch"}},a||e.value?e.render("Cell"):"-")})))))):(0,i.jsx)("tr",{children:(0,i.jsx)("td",{colSpan:s.length,className:"text-center text-dark",children:"No Data Found"})})})]})})})})}},7672:(e,s,a)=>{a.r(s),a.d(s,{default:()=>g});var l=a(65043),r=a(53519),d=a(61072),t=a(78602),c=a(24522),n=a(12400),i=a(8962),o=a(35475),m=a(17962),x=a(31462),h=a(60184),j=a(32479),p=a(2519),N=a(36653),f=a(31121),b=a(39110),u=a(6058),v=a(461),w=a(70579);v.t1.register(v.Bs,v.E8,v.m_,v.s$,v.PP,v.ZT,v.kc,v.FN,v.No);const g=()=>{const{color:e}=(0,N.D)(),s=(0,j.L)(),[a,v]=(0,l.useState)(!0),[g,A]=(0,l.useState)("dayWise"),{data:C,error:y,isLoading:S}=(0,n.Ud)(),{data:k}=(0,n.DQ)({filter:g}),[H,U]=(0,l.useState)({labels:[],datasets:[]}),R=e=>(0,f.GP)(new Date(e),"dd-MMM-yyyy h:mm a");(0,l.useEffect)((()=>{if(k){const e=k.data.map((e=>e.date)),s=k.data.map((e=>e.pending)),a=k.data.map((e=>e.inProcess)),l=k.data.map((e=>e.completed)),r=k.data.map((e=>e.inTransit)),d=k.data.map((e=>e.cancelled)),t=k.data.map((e=>e.total));U({labels:e,datasets:[{label:"Total",type:"line",data:t,backgroundColor:"#4BC0C0",borderColor:"#4BC0C0",borderWidth:2,fill:!1,tension:.1},{label:"Pending",data:s,backgroundColor:"#F18030",borderColor:"#F18030",borderWidth:1},{label:"In Process",data:a,backgroundColor:"#FFCC00",borderColor:"#FFCC00",borderWidth:1},{label:"In Transit",data:r,backgroundColor:"#6159f7",borderColor:"#6159f7",borderWidth:1},{label:"Cancelled",data:d,backgroundColor:"#f71143",borderColor:"#f71143",borderWidth:1},{label:"Completed",data:l,backgroundColor:"#01AD23",borderColor:"#01AD23",borderWidth:1}]}),v(!1)}}),[g,k]);if(S)return(0,w.jsx)(b.A,{});if(y)return(0,w.jsx)("div",{children:(0,w.jsx)(p.A,{})});if(!C)return(0,w.jsx)("div",{children:"No data available"});const{totalUsers:D,unClosedQuotationRequests:P,reviews:T,rentalLaptopsInHand:W,users:I=[],transaction:L=[]}=C.data,M=[{Header:"ID",accessor:(e,s)=>s+1,minWidth:10},{Header:"Profile Image",accessor:"profileImage",Cell:e=>{const s=e.value;return s?(0,w.jsx)("img",{src:s,alt:"Profile",style:{width:"50px",height:"50px",borderRadius:"100%"}}):(0,w.jsx)(m.qnL,{size:50})}},{Header:"User Name",accessor:"userName"},{Header:"Phone Number",accessor:"phoneNumber"},{Header:"Email",accessor:"email"},{Header:"Address",accessor:"address",Cell:e=>{let{value:s}=e;return s&&s.length>0?s[0].address:""}},{Header:"Created At",accessor:"createdAt",Cell:e=>{let{value:s}=e;return R(s)}},{Header:"Updated At",accessor:"updatedAt",Cell:e=>{let{value:s}=e;return R(s)}}],_=[{Header:"ID",accessor:(e,s)=>s+1,minWidth:10},{Header:"Phone Number",accessor:"phoneNumber"},{Header:"Amount",accessor:"amount"},{Header:"Transaction Id",accessor:"transactionId"},{Header:"Created At",accessor:"createdAt",Cell:e=>{let{value:s}=e;return R(s)}},{Header:"Updated At",accessor:"updatedAt",Cell:e=>{let{value:s}=e;return R(s)}}];return a?(0,w.jsx)("div",{children:"Loading..."}):(0,w.jsxs)(r.A,{fluid:!0,children:[(0,w.jsx)(d.A,{className:"mt-4 mx-2",children:(0,w.jsx)(t.A,{className:"boxShadow p-4",children:(0,w.jsx)("h4",{className:"fs-4 fw-bolder",children:"Dashboard"})})}),(0,w.jsxs)(d.A,{className:"mt-5",children:[(0,w.jsx)(t.A,{xs:12,sm:6,lg:4,className:"mb-3",style:{textDecoration:"none",color:"inherit"},children:"Admin"===s?(0,w.jsx)(o.N_,{to:"/admin/user-list",className:"link-unstyled",children:(0,w.jsx)("p",{className:"p-3 boxShadow",children:(0,w.jsxs)("div",{className:"d-flex align-items-center",children:[(0,w.jsx)(h.x$1,{size:45,style:{color:e}}),(0,w.jsxs)("div",{className:"ms-3",children:[(0,w.jsx)("div",{className:"fs-7 fw-bolder",children:"Users Count"}),(0,w.jsx)("h3",{className:"fs-8 fw-bolder",children:D}),(0,w.jsx)("div",{className:"fs-17",children:"Total Number of Users"})]})]})})}):(0,w.jsx)("p",{className:"p-3 boxShadow",children:(0,w.jsxs)("div",{className:"d-flex align-items-center",children:[(0,w.jsx)(h.x$1,{size:45,style:{color:e}}),(0,w.jsxs)("div",{className:"ms-3",children:[(0,w.jsx)("div",{className:"fs-7 fw-bolder",children:"Users Count"}),(0,w.jsx)("h3",{className:"fs-8 fw-bolder",children:D}),(0,w.jsx)("div",{className:"fs-17",children:"Total Number of Users"})]})]})})}),(0,w.jsx)(t.A,{xs:12,sm:6,lg:4,className:"mb-3",children:"Admin"===s?(0,w.jsx)(o.N_,{to:"/admin/quotes",className:"link-unstyled",children:(0,w.jsx)("p",{className:"p-3 boxShadow",children:(0,w.jsxs)("div",{className:"d-flex align-items-center",children:[(0,w.jsx)(x.bgI,{size:45,style:{color:e}}),(0,w.jsxs)("div",{className:"ms-3",children:[(0,w.jsx)("div",{className:"fs-7 fw-bolder",children:"UnClosed Rental"}),(0,w.jsx)("h3",{className:"fs-8 fw-bolder",children:P}),(0,w.jsx)("div",{className:"fs-14",children:"Unclosed Requests"})]})]})})}):(0,w.jsx)("p",{className:"p-3 boxShadow",children:(0,w.jsxs)("div",{className:"d-flex align-items-center",children:[(0,w.jsx)(x.bgI,{size:45,style:{color:e}}),(0,w.jsxs)("div",{className:"ms-3",children:[(0,w.jsx)("div",{className:"fs-7 fw-bolder",children:"UnClosed Rental"}),(0,w.jsx)("h3",{className:"fs-8 fw-bolder",children:P}),(0,w.jsx)("div",{className:"fs-14",children:"Unclosed Requests"})]})]})})}),(0,w.jsx)(t.A,{xs:12,sm:6,lg:4,className:"mb-3",children:"Admin"===s?(0,w.jsx)(o.N_,{to:"/admin/review",className:"link-unstyled",children:(0,w.jsx)("p",{className:"p-3 boxShadow",children:(0,w.jsxs)("div",{className:"d-flex align-items-center",children:[(0,w.jsx)(h.gt3,{size:45,style:{color:e}}),(0,w.jsxs)("div",{className:"ms-3",children:[(0,w.jsx)("div",{className:"fs-7 fw-bolder",children:"Reviews"}),(0,w.jsx)("h3",{className:"fs-8 fw-bolder",children:T}),(0,w.jsx)("div",{className:"fs-14",children:"Unverified Reviews"})]})]})})}):(0,w.jsx)("p",{className:"p-3 boxShadow",children:(0,w.jsxs)("div",{className:"d-flex align-items-center",children:[(0,w.jsx)(h.gt3,{size:45,style:{color:e}}),(0,w.jsxs)("div",{className:"ms-3",children:[(0,w.jsx)("div",{className:"fs-7 fw-bolder",children:"Reviews"}),(0,w.jsx)("h3",{className:"fs-8 fw-bolder",children:T}),(0,w.jsx)("div",{className:"fs-14",children:"Unverified Reviews"})]})]})})}),(0,w.jsx)(t.A,{xs:12,sm:6,lg:4,className:"mb-3",children:"Admin"===s?(0,w.jsx)(o.N_,{to:"/admin/rental",className:"link-unstyled",children:(0,w.jsx)("p",{className:"p-3 boxShadow",children:(0,w.jsxs)("div",{className:"d-flex align-items-center",children:[(0,w.jsx)(x.eRo,{size:45,style:{color:e}}),(0,w.jsxs)("div",{className:"ms-3",children:[(0,w.jsx)("div",{className:"fs-7 fw-bolder",children:"Rental Laptops"}),(0,w.jsx)("h3",{className:"fs-8 fw-bolder",children:W}),(0,w.jsx)("div",{className:"fs-14",children:"Active Rental laptops in Hand"})]})]})})}):(0,w.jsx)("p",{className:"p-3 boxShadow",children:(0,w.jsxs)("div",{className:"d-flex align-items-center",children:[(0,w.jsx)(x.eRo,{size:45,style:{color:e}}),(0,w.jsxs)("div",{className:"ms-3",children:[(0,w.jsx)("div",{className:"fs-7 fw-bolder",children:"Rental Laptops"}),(0,w.jsx)("h3",{className:"fs-8 fw-bolder",children:W}),(0,w.jsx)("div",{className:"fs-14",children:"Active Rental laptops in Hand"})]})]})})})]}),(0,w.jsx)(d.A,{className:"mt-3",children:(0,w.jsx)(t.A,{xs:12,md:12,lg:12,className:"mb-3",children:(0,w.jsxs)("p",{className:"p-4 boxShadow",children:[(0,w.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[(0,w.jsx)("h4",{className:"fs-4 mb-4 fw-bolder text-start",children:"Orders Overview"}),(0,w.jsx)(c.A,{children:(0,w.jsx)(c.A.Group,{controlId:"filterDropdown",className:"mt-3",children:(0,w.jsxs)(c.A.Select,{value:g,placeholder:"Enter the status here",onChange:e=>{A(e.target.value)},children:[(0,w.jsx)("option",{value:"",disabled:!0,selected:!0,children:"Select an option"}),(0,w.jsx)("option",{value:"dayWise",children:"Day Wise"}),(0,w.jsx)("option",{value:"monthWise",children:"Month Wise"}),(0,w.jsx)("option",{value:"yearWise",children:"Year Wise"})]})})})]}),(0,w.jsx)("div",{className:"chart-scroll-container",children:(0,w.jsx)("div",{className:"chart-container",children:(0,w.jsx)(u.yP,{data:H,options:{responsive:!0,plugins:{legend:{position:"top"},tooltip:{callbacks:{label:function(e){return"".concat(e.dataset.label,": ").concat(e.raw)}}}},scales:{x:{stacked:!0,title:{display:!0,text:"Date"},ticks:{autoSkip:!1},grid:{display:!1}},y:{stacked:!0,title:{display:!0,text:"Total Orders"}}}}})})})]})})}),(0,w.jsxs)(d.A,{className:"mt-3",children:[(0,w.jsx)(t.A,{xs:12,md:6,lg:12,className:"mb-3",children:(0,w.jsxs)("p",{className:"p-4 boxShadow",children:[(0,w.jsx)("h4",{className:"fs-4 mb-4 fw-bolder text-start",children:"New Users"}),(0,w.jsx)(i.A,{COLUMNS:M,MOCK_DATA:I})]})}),"Admin"===s&&(0,w.jsx)(t.A,{xs:12,md:6,lg:12,className:"mb-3",children:(0,w.jsxs)("p",{className:"p-4 boxShadow",children:[(0,w.jsx)("h4",{className:"fs-4 mb-4 fw-bolder text-start",children:"New Transactions"}),(0,w.jsx)(i.A,{COLUMNS:_,MOCK_DATA:L})]})})]})]})}},39585:()=>{}}]);
//# sourceMappingURL=7672.2e7dc05b.chunk.js.map