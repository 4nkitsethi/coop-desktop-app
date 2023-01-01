<template>
   
    <div class="print-riceipt" v-if="printFlag" style="text-align:center">
        <div class="ticket">
            <img src="../../assets/img/logo.png" alt="Logo" />
            <p>{{ activeCustomer.name }} <br> {{  activeCustomer.phone  }}  </p>
            <table>
                <thead>
                    <tr>
                        <th class="quantity">Q.</th>
                        <th class="description">Description</th>
                        <th class="price">₹</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in history.sales" :key="item.id">
                        <td class="quantity">{{ item.quantity }}</td>
                        <td class="description">{{ item.product.product_name }}</td>
                        <td class="price">{{ currency(item.total )}}</td>
                    </tr>
                    <tr>
                        <td class="quantity"></td>
                        <td class="description">TOTAL</td>
                        <td class="price">{{ currency(history.total) }}</td>
                    </tr>
                    <tr>
                        <td class="quantity"></td>
                        <td class="description">Receive</td>
                        <td class="price">{{ currency(history.receive) }}</td>
                    </tr>
                    <tr>
                        <td class="quantity"></td>
                        <td class="description">Pending</td>
                        <td class="price">{{ currency(history.rest_amount) }}</td>
                    </tr>
                </tbody>
            </table>
            <p class="centered">Thanks for your purchase ! <br />  Visit Again -:) </p>
        </div>
    </div>
    <div class="tabs" v-else> 
        <template v-if="lockApplication">
            <LockScreen />
        </template>
        <template v-else>           
            <!--Right Part start-->
            <div class="Tabs-box" id="tabs-content">
                <router-view></router-view>
            </div>
        </template>        
    </div>
</template>

<script lang="ts">
    import BillingSidebar from './BillingSidebar.vue';
    import LockScreen from "../auth/Lock.vue"
    import {mapState} from "vuex"
    import { currency } from '../../utils/currency';
    import { sumBy } from "lodash"

    export default {
        data(){
            return {
                currency,
                sumBy,
                customerView:false,
                displayType:"INTERNAL",
            }
        },
        components:{
            BillingSidebar,
            LockScreen
        },
        computed: {        
            ...mapState('coop_local_base/apps', {
                                            printFlag: (state) => state.printFlag,
                                            cartItems: (state) => state.cartItems,
                                            activeCustomer:(state) => state.activeCustomer, 
                                            lockApplication:(state) => state.lockApplication,
                                            history:(state) => state.history                                           
            })
        }
    }
</script>