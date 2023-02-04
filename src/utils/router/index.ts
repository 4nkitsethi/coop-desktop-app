import { createWebHashHistory, createWebHistory, createRouter } from "vue-router";
import BillingSystem from "../../frontend/pages/BillingSystem.vue"
import BillingStock from "../../frontend/pages/BillingStock.vue"
import BillingSales from "../../frontend/pages/BillingSales.vue"
import BillingCustomers from "../../frontend/pages/Customers.vue"
import CustomerView from "../../frontend/layouts/CustomerView.vue"

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { 
    path: '', 
    component: BillingSystem
  },
  { path: '/', component: BillingSystem , meta : { customerView : false } },
  { path: '/billing', component: BillingSystem , meta : { customerView : false } },
  { path: '/stocks', component: BillingStock , name : "Stocks" , meta : { customerView : false }},
  { path: '/sales', component: BillingSales , meta : { customerView : false } }, 
  { path : '/customers', component : BillingCustomers , meta : { customerView : false }}  ,
  { path : '/customer-view', component : CustomerView , meta : { customerView : true }}  ,  
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const Router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})


export default Router

