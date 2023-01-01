import { createApp } from 'vue'
import  Layout from './frontend/layouts/CustomerLayout.vue'
// import Stores from "./utils/store"
import Store from "./utils/store"
import Router from "./utils/router"
import I18n from "./utils/u18n"
import axios from 'axios'
import { vMaska } from "maska"
import VueAxios from 'vue-axios'
import updateStore from "./utils/updateStore"
import "./style.css"
import { Icon } from '@iconify/vue';
import 'bootstrap';
import './razor.checkout';

import VueApexCharts from "vue3-apexcharts";
import { vue3Debounce } from 'vue-debounce'

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { App } from './models'


//console.log(App.state.baseURL)

axios.defaults.baseURL = "https://coop-chicken.in/api/";
axios.defaults.headers.post['Content-Type'] = 'application/json';

createApp({
    extends: Layout,
    beforeCreate() {
                    console.log(window.screen.width)
                    if(window.screen.width == 1476){
                      this.$router.push("/customer-view")
                    }
    }
  })
  .use(Store)
  .use(Router)
  .use(I18n)
  .use(ToastPlugin)  
  .directive("maska", vMaska)
  .directive('debounce', vue3Debounce({ lock: true }))
  .use(VueAxios, axios)
  .component('Icon',Icon)
  .component('apexchart', VueApexCharts)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })


setInterval(() => {
  if(Store.state.coop_local_base.apps.isAuthenticated && Store.state.coop_local_base.apps.navigator){
    updateStore.updateProductAndRate()      
  }  
}, 10000)

setInterval(() => {
  App.commit((state) => {
    state.navigator = window.navigator.onLine
  })
},2000)


setInterval(() => {
  if(Store.state.coop_local_base.apps.isAuthenticated && Store.state.coop_local_base.apps.navigator){    
    updateStore.syncCustomers()
    updateStore.syncSales()
    updateStore.syncStockRequests();  
  }  
}, 12000)




