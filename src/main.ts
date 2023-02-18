import { createApp } from 'vue'
import  Layout from './frontend/layouts/MainLayout.vue'
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
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { App } from './models'
import { head } from "lodash"

//console.log(App.state.baseURL)

axios.defaults.baseURL = "http://localhost:8000/api/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
import $ from 'jquery';
window.$ = $;
import './keyboard/jquery-ui.min.css'
import './keyboard/keyboard.css'
import './keyboard/js/jquery-ui-custom.min'
import './keyboard/js/jquery.keyboard'
import './keyboard/js/jquery.keyboard.extension-typing'
// 
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";

createApp({
    extends: Layout,
    beforeCreate() {}
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
  .component('CircleProgress',CircleProgress)
  .mixin({        
        methods:{
            initializePie(){},
            onscreenKeyboard(){
              setTimeout(() => {
                let self = this;
                $('.keyboard-numpad').keyboard({
                  layout: 'custom',
                  display: {
                    'bksp'   : '\u2190',
                    'enter'  : 'return',
                    'normal' : 'ABC',
                    'meta1'  : '.?123',
                    'meta2'  : '#+=',
                    'accept' : '✔',
                    'cancel' : '✖',
                    'clear'  : '&nbsp;&nbsp;&nbsp;&nbsp;Clear&nbsp;&nbsp;&nbsp;&nbsp;'
                  },
                  customLayout: {
                    'normal': [
                      '1 2 3 4',
                      '5 6 7 8',
                      '9 0 {dec} {bksp}',			  
                      '{clear} {accept} {cancel}'
                    ]
                  },
                  restrictInput : true, // Prevent keys not in the displayed keyboard from being typed in
                  preventPaste : true,  // prevent ctrl-v and right click
                  autoAccept : true,
                  change: function(e, keyboard, el) {
                    if (typeof e.target.dataset.pattern !== 'undefined') {
                      let val = null
                      if(e.target.dataset.pattern == 'number' && e.target.dataset.phone == 'true')
                        val = keyboard.$preview.val().match(new RegExp(/(\d{0,10})?/));
                      else if(e.target.dataset.pattern == 'decimal')
                        val = keyboard.$preview.val().match(new RegExp(/(\d+)(\.\d{0,2})?/));
                      else if(e.target.dataset.pattern == 'number')
                        val = keyboard.$preview.val().match(new RegExp(/(\d+)?/));
                      
                      if (val) {
                        keyboard.$preview.val(val.slice(1).join(''));
                        $.keyboard.caret(keyboard.$preview, keyboard.last.start, keyboard.last.end);                
                      }
                    }            
                  },
                  validate: function(keyboard, value, isClosing){                 
                    if(typeof keyboard.$el[0].dataset.phone !== 'undefined')
                        return (value.length == 10) ? true : false
                                   
                    if (typeof keyboard.$el[0].dataset.max !== 'undefined') {
                      let min = parseFloat(keyboard.$el[0].dataset.min)
                      let max = parseFloat(keyboard.$el[0].dataset.max)
                      return (value > min && value<=max) ? true : false; 
                    }else{
                      return true
                    }                   
                  },
                  accepted: function(e, keyboard, el) {            
                    el.value = keyboard.getValue();            
                    el.dispatchEvent(new Event('input'));
                  }
                });


                $('.keyboard-phone').keyboard({
                  layout: 'custom',
                  display: {
                    'bksp'   : '\u2190',
                    'enter'  : 'return',
                    'normal' : 'ABC',
                    'meta1'  : '.?123',
                    'meta2'  : '#+=',
                    'accept' : '✔',
                    'cancel' : '✖',
                  },
                  customLayout: {
                    'normal': [
                      '1 2 3 4',
                      '5 6 7 8',
                      '9 0 {bksp} {clear}',			  
                      '{accept} {cancel}'
                    ]
                  },
                  maxLength : 10,
                  restrictInput : true, // Prevent keys not in the displayed keyboard from being typed in
                  preventPaste : true,  // prevent ctrl-v and right click
                  autoAccept : true,
                  acceptValid: true,
                  validate: function(keyboard, value, isClosing){                 
                    return value.length === 10;                   
                  },
                  accepted: function(e, keyboard, el) {            
                    el.value = keyboard.getValue();            
                    el.dispatchEvent(new Event('input'));
                  }
                });
              
              
                $('.keyboard-alpha').keyboard({
                  layout: 'custom',
                  display: {
                    'bksp'   : '\u2190',
                    'enter'  : 'return',
                    'normal' : 'ABC',
                    'meta1'  : '123',
                    'meta2'  : '#+=',
                    'accept' : '✔',
                    'cancel' : '✖'
                  },   
                  customLayout: {
                    'normal': [
                      'q w e r t y u i o p {bksp}',
                      '{s} a s d f g h j k l -',
                      'z x c v b n m @ . {left} {right}',
                      '{clear} .com {meta1} {space} {cancel} {accept}'
                    ],
                    'shift': [
                      'Q W E R T Y U I O P {bksp}',
                      '{s} A S D F G H J K L -',
                      'Z X C V B N M @ . {left} {right}',
                      '.com {meta1} {space} {cancel} {accept}'
                    ],
                    'meta1': [
                      '1 2 3 4 5 6 7 8 9 0 {bksp}',
                      '` | { } % ^ * / \' ! ?',
                      '{normal} $ & ~ # = + . {cancel} {accept}',
                      ' {space} '
                    ]
                  },
                  restrictInput : true, // Prevent keys not in the displayed keyboard from being typed in
                  preventPaste : true,  // prevent ctrl-v and right click
                  autoAccept : true,
                  accepted: function(e, keyboard, el) {            
                    el.value = keyboard.getValue();            
                    el.dispatchEvent(new Event('input'));
                  }
                })
                .addTyping();
              }, 500); 
            }
        },
        beforeMount() {
          this.onscreenKeyboard()
        }
  })
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

    const { SerialPort } = require('serialport')
    const { ReadlineParser } = require('@serialport/parser-readline')
    const { autoDetect } = require('@serialport/bindings-cpp')
    const Binding = autoDetect();
    const $toast = useToast();
    Binding.list().then( ports => {
        if(ports.length > 0 ) {
            let serialPort = head(ports)  
            let port = new SerialPort({ path : serialPort.path , baudRate : 9600})
            let parsar =  port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
            parsar.on('data', data => {
              App.commit( (state) => {
                state.scaleWeight = Number(parseFloat(data)).toFixed(3)
              })
            })                 
            $toast.open({ message : "Serial Port Attached !" , type : 'info', duration : 2000 })            
        }else{
            $toast.open({ message : "No serial port found" , type : 'info', duration : 2000 })            
        }   
    })




