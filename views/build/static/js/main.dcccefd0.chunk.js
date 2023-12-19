(this.webpackJsonprgb_frontend=this.webpackJsonprgb_frontend||[]).push([[0],{79:function(e,t,a){},80:function(e,t,a){},91:function(e,t,a){"use strict";a.r(t);var n=a(10),c=a.n(n),r=a(28),s=(a(79),a(12)),i=a(0),o=(a(80),a(2));var l=()=>{Object(s.g)();return Object(o.jsxs)("nav",{className:"navbar navbar-expand-md navbar-dark fixed-top bg-dark",children:[Object(o.jsx)("button",{type:"button",className:"navbar-toggler","data-toggle":"collapse","data-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(o.jsx)("span",{className:"navbar-toggler-icon"})}),Object(o.jsx)("div",{className:"collapse navbar-collapse justify-content-between",id:"navbarCollapse",children:Object(o.jsx)("div",{className:"d-flex flex-row",children:Object(o.jsxs)("ul",{className:"navbar-nav mr-auto",children:[Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(r.b,{className:"nav-link",to:"/",children:"Trang Ch\u1ee7"})}),Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(r.b,{className:"nav-link",to:"/customers",children:"Danh S\xe1ch Kh\xe1ch H\xe0ng"})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(r.b,{className:"nav-link",to:"/products",children:"S\u1ea3n Ph\u1ea9m C\u1ee7a T\xf4i"})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(r.b,{className:"nav-link",to:"/orders",children:"\u0110\u01a1n H\xe0ng \u0110\xe3 B\xe1n"})})]})]})})})]})};var d=e=>Object(o.jsxs)(i.Fragment,{children:[Object(o.jsx)(l,{}),Object(o.jsx)("main",{children:Object(o.jsx)("div",{className:"container",children:e.children})})]});var j=()=>Object(o.jsxs)("section",{children:[Object(o.jsx)("h1",{children:"Welcome to Manage App!"}),Object(o.jsxs)("div",{className:"body-content",children:[Object(o.jsx)("p",{children:"Manage App is your all-in-one solution for efficient customer, order, and product management. Whether you're handling customer relationships, processing orders, or managing your product inventory, our application simplifies the process, providing you with the tools needed to streamline your business operations."}),Object(o.jsx)("p",{children:"With an intuitive interface and robust functionalities, our app empowers you to create, update, and track customer profiles, orders, and products effortlessly. Dive into detailed analytics, stay on top of inventory, and gain valuable insights to drive business growth."}),Object(o.jsx)("p",{children:"Get started today and experience the convenience of unified customer, order, and product management at your fingertips with Manage App."})]})]});var h=()=>Object(o.jsx)(j,{});var b=e=>{let t=[];for(var a of Object.keys(e))t.push(e[a]);return Object(o.jsx)("div",{className:"mt-3",children:t.map((e=>Object(o.jsx)("p",{className:"alert alert-danger",children:e})))})},m=a(124),u=a(127),O=a(129),x=a(130),p=a(131),g=a(132),v=a(133),f=a(134),y=a(135),C=a(144);const w=Object(m.a)({tableContainer:{marginTop:20},tableHeaderCell:{fontWeight:"bold"}});var N=e=>{let{customers:t,onEditCustomer:a,onDeleteCustomer:n,onCreateOrder:c,onGetCustomerHistory:r}=e;const s=w();return Object(o.jsx)(u.a,{className:s.tableContainer,children:Object(o.jsxs)(O.a,{children:[Object(o.jsx)(x.a,{children:Object(o.jsxs)(p.a,{children:[Object(o.jsx)(g.a,{sortDirection:!0,className:s.tableHeaderCell,children:"ID"}),Object(o.jsx)(g.a,{sortDirection:!0,className:s.tableHeaderCell,children:"Name"}),Object(o.jsx)(g.a,{className:s.tableHeaderCell,children:"Gender"}),Object(o.jsx)(g.a,{className:s.tableHeaderCell,children:"Phone"}),Object(o.jsx)(g.a,{className:s.tableHeaderCell,children:"Action"}),Object(o.jsx)(g.a,{className:s.tableHeaderCell,children:"Orders"})]})}),Object(o.jsx)(v.a,{children:t.map((e=>Object(o.jsxs)(p.a,{children:[Object(o.jsx)(g.a,{children:e.id}),Object(o.jsx)(g.a,{children:e.name}),Object(o.jsx)(g.a,{children:e.gender}),Object(o.jsx)(g.a,{children:e.number_phone}),Object(o.jsxs)(g.a,{children:[Object(o.jsx)(f.a,{variant:"outlined",color:"primary",onClick:()=>a(e.id),children:"Ch\u1ec9nh S\u1eeda"}),Object(o.jsx)(f.a,{variant:"outlined",color:"secondary",onClick:()=>n(e.id),children:"X\xf3a"})]}),Object(o.jsxs)(g.a,{children:[Object(o.jsx)(f.a,{variant:"contained",color:"primary",onClick:()=>c(e.id),children:"T\u1ea1o \u0110\u01a1n H\xe0ng M\u1edbi"}),Object(o.jsx)(f.a,{variant:"outlined",color:"primary",onClick:()=>r(e.id),children:"L\u1ecbch S\u1eed Mua H\xe0ng"})]})]},e.id)))}),Object(o.jsx)(y.a,{className:s.tableFooterRow,children:Object(o.jsx)(C.a,{})})]})})},k=a(146),S=a(138),T=a(139),E=a(150),_=a(140),H=a(151),D=a(143),I=a(148),W=a(141);const B=Object(m.a)((e=>({form:{display:"flex",flexDirection:"column",gap:e.spacing(2),width:"300px"}})));var G=e=>{let{onClose:t,onAddCustomer:a}=e;const n=B(),[c,r]=Object(i.useState)({name:"",gender:"",number_phone:""}),s=e=>{const{name:t,value:a}=e.target;r((e=>({...e,[t]:a})))};return Object(o.jsxs)(k.a,{open:!0,onClose:t,children:[Object(o.jsx)(S.a,{children:"Th\xeam Kh\xe1ch H\xe0ng M\u1edbi"}),Object(o.jsxs)("form",{onSubmit:e=>{e.preventDefault(),a(c),r({name:"",gender:"",number_phone:""}),t()},children:[Object(o.jsx)(T.a,{children:Object(o.jsxs)("div",{className:n.form,children:[Object(o.jsx)(E.a,{label:"Name",type:"text",name:"name",value:c.name,onChange:s,variant:"outlined",fullWidth:!0}),Object(o.jsxs)(_.a,{variant:"outlined",fullWidth:!0,children:[Object(o.jsx)(H.a,{id:"gender-label",children:"Gi\u1edbi T\xednh"}),Object(o.jsxs)(D.a,{labelId:"gender-label",id:"gender",value:c.gender,onChange:s,label:"Gender",name:"gender",children:[Object(o.jsx)(I.a,{value:"male",children:"Nam"}),Object(o.jsx)(I.a,{value:"female",children:"N\u1eef"})]})]}),Object(o.jsx)(E.a,{label:"S\u1ed1 \u0110i\u1ec7n Tho\u1ea1i",type:"text",name:"number_phone",value:c.number_phone,onChange:s,variant:"outlined",fullWidth:!0})]})}),Object(o.jsxs)(W.a,{children:[Object(o.jsx)(f.a,{onClick:t,color:"secondary",children:"Cancel"}),Object(o.jsx)(f.a,{type:"submit",variant:"contained",color:"primary",children:"Add Customer"})]})]})]})};const M=Object(m.a)((e=>({form:{display:"flex",flexDirection:"column",gap:e.spacing(2),width:"300px"}})));var F=e=>{let{onClose:t,customer:a,onEditCustomer:n}=e;const c=M(),[r,s]=Object(i.useState)({name:"",gender:"",number_phone:""});Object(i.useEffect)((()=>{a&&s({name:a.name||"",gender:a.gender||"",number_phone:a.number_phone||""})}),[a]);const l=e=>{const{name:t,value:a}=e.target;s((e=>({...e,[t]:a})))};return Object(o.jsxs)(k.a,{open:Boolean(a),onClose:t,children:[Object(o.jsx)(S.a,{children:"Ch\u1ec9nh S\u1eeda Th\xf4ng Tin Kh\xe1ch H\xe0ng"}),Object(o.jsxs)("form",{onSubmit:e=>{e.preventDefault(),n({...r,id:a.id}),s({name:"",gender:"",number_phone:""}),t()},children:[Object(o.jsx)(T.a,{children:Object(o.jsxs)("div",{className:c.form,children:[Object(o.jsx)(E.a,{label:"H\u1ecd v\xe0 T\xean",type:"text",name:"name",value:r.name,onChange:l,variant:"outlined",fullWidth:!0}),Object(o.jsxs)(_.a,{variant:"outlined",fullWidth:!0,children:[Object(o.jsx)(H.a,{id:"gender-label",children:"Gi\u1edbi T\xednh"}),Object(o.jsxs)(D.a,{labelId:"gender-label",id:"gender",value:r.gender,onChange:l,label:"Gender",name:"gender",children:[Object(o.jsx)(I.a,{value:"male",children:"Nam"}),Object(o.jsx)(I.a,{value:"female",children:"N\u1eef"})]})]}),Object(o.jsx)(E.a,{label:"S\u1ed1 \u0110i\u1ec7n Tho\u1ea1i",type:"text",name:"number_phone",value:r.number_phone,onChange:l,variant:"outlined",fullWidth:!0})]})}),Object(o.jsxs)(W.a,{children:[Object(o.jsx)(f.a,{onClick:t,color:"secondary",children:"Cancel"}),Object(o.jsx)(f.a,{type:"submit",variant:"contained",color:"primary",children:"Update Customer"})]})]})]})};const q=Object(m.a)((e=>({form:{display:"flex",flexDirection:"column",gap:e.spacing(2),width:"400px",padding:e.spacing(2)},selectField:{marginBottom:e.spacing(2)},quantityField:{marginBottom:e.spacing(2)},addItemButton:{marginBottom:e.spacing(2)},submitButton:{marginTop:e.spacing(2)}})));var A=e=>{let{onClose:t,customer:a,onCreateOrder:n}=e;const c=q(),[r,s]=Object(i.useState)({customer_id:0,items:[{product_id:0,quantity:0}]}),[l,d]=Object(i.useState)([]),[j,h]=Object(i.useState)(1);Object(i.useEffect)((()=>{(async()=>{try{const e=await fetch("/api/products"),t=await e.json();if(!e.ok)throw new Error("Fetching products failed.");d(t.data)}catch(e){console.error("Error fetching products:",e)}})()}),[]);const b=(e,t,a)=>{const n=[...r.items];n[e][t]="quantity"===t?isNaN(parseInt(a))?a:parseInt(a):a,s((e=>({...e,items:n})))};return Object(o.jsxs)(k.a,{open:!0,onClose:t,children:[Object(o.jsx)(S.a,{children:"T\u1ea1o \u0110\u01a1n H\xe0ng M\u1edbi"}),Object(o.jsxs)("form",{onSubmit:e=>{e.preventDefault(),r.customer_id=a.id,n(r),s({customer_id:0,items:[{product_id:"",quantity:0}]}),t()},children:[Object(o.jsx)(T.a,{children:Object(o.jsxs)("div",{className:c.form,children:[[...Array(j)].map(((e,t)=>Object(o.jsxs)("div",{children:[Object(o.jsxs)(_.a,{variant:"outlined",fullWidth:!0,className:c.selectField,children:[Object(o.jsx)(H.a,{id:"product-label-".concat(t),children:"Ch\u1ecdn s\u1ea3n ph\u1ea9m"}),Object(o.jsx)(D.a,{labelId:"product-label-".concat(t),value:r.items[t].product_id,onChange:e=>b(t,"product_id",e.target.value),label:"Product",children:l.map((e=>Object(o.jsx)(I.a,{value:e.id,children:e.name},e.id)))})]}),Object(o.jsx)(E.a,{label:"S\u1ed1 l\u01b0\u1ee3ng",type:"number",value:r.items[t].quantity,onChange:e=>b(t,"quantity",e.target.value),variant:"outlined",fullWidth:!0,className:c.quantityField})]},t))),Object(o.jsx)(f.a,{variant:"contained",color:"primary",onClick:()=>{h((e=>e+1)),s((e=>({...e,items:[...e.items,{product_id:"",quantity:""}]})))},className:c.addItemButton,children:"Th\xeam s\u1ea3n ph\u1ea9m"})]})}),Object(o.jsxs)(W.a,{children:[Object(o.jsx)(f.a,{onClick:t,color:"secondary",children:"Cancel"}),Object(o.jsx)(f.a,{type:"submit",variant:"contained",color:"primary",className:c.submitButton,children:"T\u1ea1o \u0110\u01a1n H\xe0ng"})]})]})]})};var P=()=>{const[e,t]=Object(i.useState)([]),[a,n]=Object(i.useState)({}),[c,r]=Object(i.useState)(!1),[s,l]=Object(i.useState)(!1),[d,j]=Object(i.useState)(!1),[h,m]=Object(i.useState)(null),u=Object(i.useCallback)((async()=>{n({});try{const e=await fetch("/api/customers/"),a=await e.json();if(e.ok)t(a.data);else{let e="Fetching customers failed.";if(!a.hasOwnProperty("error"))throw new Error(e);"string"===typeof a.error?n({unknown:a.error}):n(a.error)}}catch(e){n({error:e.message})}}),[]);Object(i.useEffect)((()=>{u();const e=setTimeout((()=>{console.log("Executing after 5 seconds")}),5e3);return()=>clearTimeout(e)}),[u]);const O=0===e.length?Object(o.jsx)("p",{children:"Ch\u01b0a c\xf3 kh\xe1ch h\xe0ng n\xe0o!!!"}):Object(o.jsx)(N,{customers:e,onEditCustomer:t=>{const a=e.find((e=>e.id===t));m(a),l(!0)},onDeleteCustomer:async e=>{const a={method:"DELETE",heades:{"Content-Type":"application/json"}};try{if(!(await fetch("/api/customers/${customerId}",a)).ok)throw new Error("Network response was not ok")}catch(c){n(c)}t((t=>t.filter((t=>t.ID!==e))))},onCreateOrder:t=>{const a=e.find((e=>e.id===t));m(a),j(!0)},onGetCustomerHistory:e=>{t((t=>t.filter((t=>t.ID!==e))))}}),x=0===Object.keys(a).length?null:b(a);return Object(o.jsxs)("section",{children:[Object(o.jsx)("h1",{className:"pb-4",children:"Danh S\xe1ch Kh\xe1ch H\xe0ng"}),Object(o.jsx)("button",{onClick:()=>r(!0),children:"Th\xeam Kh\xe1ch H\xe0ng M\u1edbi"}),x,O,c&&Object(o.jsx)(G,{onClose:()=>r(!1),onAddCustomer:async e=>{const a={name:e.name,gender:e.gender,number_phone:e.number_phone},c={method:"POST",heades:{"Content-Type":"application/json"},body:JSON.stringify(a)};try{const t=await fetch("/api/customers/",c);if(!t.ok)throw new Error("Network response was not ok");e.id=t.data.id}catch(s){n(s)}t((t=>[...t,e])),r(!1)}}),s&&h&&Object(o.jsx)(F,{onClose:()=>{l(!1),m(null)},customer:h,onEditCustomer:e=>{t((t=>t.map((t=>t.ID===e.ID?e:t)))),l(!1)}}),d&&h&&Object(o.jsx)(A,{onClose:()=>{j(!1),m(null)},customer:h,onCreateOrder:async e=>{const t={customer_id:e.customer_id,items:e.items},a={method:"POST",heades:{"Content-Type":"application/json"},body:JSON.stringify(t)};try{const e=await fetch("/api/orders/",a),t=await e.json();if(!e.ok)throw new Error("Network response was not ok");console.log("succcessfully created order",t.data)}catch(c){n(c)}}})]})};var K=()=>Object(o.jsx)(P,{}),J=a(142);const L=Object(m.a)((e=>({search:{marginBottom:e.spacing(2)}})));var R=()=>{const e=L(),[t,a]=Object(i.useState)(""),[n,c]=Object(i.useState)([]);return Object(o.jsxs)("div",{children:[Object(o.jsx)(E.a,{className:e.search,label:"Search by Name or Phone",variant:"outlined",value:t,onChange:e=>{a(e.target.value)}}),Object(o.jsx)(f.a,{variant:"contained",color:"primary",onClick:()=>{(async()=>{try{const e=await fetch("/api/orders?search=".concat(t));if(!e.ok)throw new Error("Network response was not ok");const a=await e.json();c(a)}catch(e){console.error("Error fetching data:",e)}})()},children:"T\xecm Ki\u1ebfm"}),Object(o.jsx)(J.a,{component:u.a,children:Object(o.jsxs)(O.a,{children:[Object(o.jsx)(x.a,{children:Object(o.jsxs)(p.a,{children:[Object(o.jsx)(g.a,{children:"S\u1ed1 TT"}),Object(o.jsx)(g.a,{children:"Danh S\xe1ch \u0110\u01a1n H\xe0ng"}),Object(o.jsx)(g.a,{children:"Th\u1eddi Gian Mua"})]})}),Object(o.jsx)(v.a,{children:n.map((e=>Object(o.jsxs)(p.a,{children:[Object(o.jsx)(g.a,{children:e.id}),Object(o.jsx)(g.a,{children:e.items}),Object(o.jsx)(g.a,{children:e.created_at})]},e.id)))})]})})]})};var U=()=>Object(o.jsx)(R,{});const X=Object(m.a)((e=>({search:{marginBottom:e.spacing(2)}})));var $=()=>{const e=X(),[t,a]=Object(i.useState)(""),[n,c]=Object(i.useState)([]),[r,s]=Object(i.useState)(!1),[l,d]=Object(i.useState)(null);Object(i.useEffect)((()=>{(async()=>{try{const e=await fetch("/api/products");if(!e.ok)throw new Error("Network response was not ok");const t=await e.json();c(t.data)}catch(e){console.error("Error fetching data:",e)}})()}),[]);const j=()=>{s(!1),d(null)};return Object(o.jsxs)("div",{children:[Object(o.jsx)(E.a,{className:e.search,label:"T\xecm ki\u1ebfm s\u1ea3n ph\u1ea9m",variant:"outlined",value:t,onChange:e=>{a(e.target.value)}}),Object(o.jsx)(f.a,{variant:"contained",color:"primary",onClick:()=>{(async()=>{try{const e=await fetch("/api/products/?search=".concat(t));if(!e.ok)throw new Error("Network response was not ok");const a=await e.json();c(a.data)}catch(e){console.error("Error fetching data:",e)}})()},children:"T\xecm Ki\u1ebfm"}),Object(o.jsx)(J.a,{component:u.a,children:Object(o.jsxs)(O.a,{children:[Object(o.jsx)(x.a,{children:Object(o.jsxs)(p.a,{children:[Object(o.jsx)(g.a,{children:"S\u1ed1 TT"}),Object(o.jsx)(g.a,{children:"T\xean S\u1ea3n Ph\u1ea9m "}),Object(o.jsx)(g.a,{children:"Gi\xe1 (vn\u0111)"}),Object(o.jsx)(g.a,{children:"L\u1ecbch S\u1eed Mua H\xe0ng"})]})}),Object(o.jsx)(v.a,{children:n.map((e=>Object(o.jsxs)(p.a,{children:[Object(o.jsx)(g.a,{children:e.id}),Object(o.jsx)(g.a,{children:e.name}),Object(o.jsx)(g.a,{children:e.price}),Object(o.jsx)(g.a,{children:Object(o.jsx)(f.a,{variant:"outlined",color:"primary",onClick:()=>(async e=>{try{const t=await fetch("/api/products/?name=".concat(e));if(!t.ok)throw new Error("Network response was not ok");await t.json(),d(e),s(!0)}catch(t){console.error("Error fetching data:",t)}})(e.name),children:"Danh S\xe1ch \u0110\u01a1n H\xe0ng"})})]},e.id)))})]})}),Object(o.jsxs)(k.a,{open:r,onClose:j,"aria-labelledby":"order-dialog-title",fullWidth:!0,maxWidth:"md",children:[Object(o.jsx)(S.a,{id:"order-dialog-title",children:'Danh S\xe1ch \u0110\u01a1n H\xe0ng cho s\u1ea3n ph\u1ea9m "'.concat(l,'"')}),Object(o.jsx)(T.a,{children:Object(o.jsx)(J.a,{component:u.a,children:Object(o.jsxs)(O.a,{children:[Object(o.jsx)(x.a,{children:Object(o.jsxs)(p.a,{children:[Object(o.jsx)(g.a,{children:"\u0110\u01a1n h\xe0ng "}),Object(o.jsx)(g.a,{children:"Gi\xe1 Tr\u1ecb"}),Object(o.jsx)(g.a,{children:"Th\u1eddi gian"})]})}),Object(o.jsx)(v.a,{children:n.map((e=>Object(o.jsxs)(p.a,{children:[Object(o.jsx)(g.a,{children:e.id}),Object(o.jsx)(g.a,{children:e.money}),Object(o.jsx)(g.a,{children:e.created_at})]},e.id)))})]})})}),Object(o.jsx)(W.a,{children:Object(o.jsx)(f.a,{onClick:j,color:"secondary",children:"Close"})})]})]})};var z=()=>Object(o.jsx)($,{});var Q=function(){return Object(o.jsx)(d,{children:Object(o.jsxs)(s.d,{children:[Object(o.jsx)(s.b,{path:"/",exact:!0,children:Object(o.jsx)(h,{})}),Object(o.jsx)(s.b,{path:"/customers",children:Object(o.jsx)(K,{})}),Object(o.jsx)(s.b,{path:"/orders",children:Object(o.jsx)(U,{})}),Object(o.jsx)(s.b,{path:"/products",children:Object(o.jsx)(z,{})}),Object(o.jsx)(s.b,{path:"*",children:Object(o.jsx)(s.a,{to:"/"})})]})})};c.a.render(Object(o.jsx)(r.a,{children:Object(o.jsx)(Q,{})}),document.getElementById("root"))}},[[91,1,2]]]);
//# sourceMappingURL=main.dcccefd0.chunk.js.map