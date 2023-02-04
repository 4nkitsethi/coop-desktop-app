<template>
  <div id="" class="CF-tab-content Customer-Facing-Tab-Content"> 
    <!--Middle Part-->
    <div class="SplitPnl SplitPnl-Middle Text--Center"> 
     
      <!--Middle Top Part-->
      <div class="TopDigitalPnl Customer-Facing-Top pt--1 pb--1">
        <div class="TopPnlLft"> <a href="javascript:void(0);" class="logo py-4"><img src="../../assets/img/logo.png" alt=""> </a>
          <div class="account_info" v-if="!isEmpty(activeCustomer)">
            <h4>Hello</h4>
            <h5>{{  activeCustomer.name }} </h5>
          </div>
        </div>
        <div class="Digital-Box Digital--font-color Text--Left">
          <h5>Item Name</h5>
          <div class="itemName">
            <h4>{{ scaleWeight }}</h4>
            <small>KG</small> 
          </div>
          <h6>&#8377; 0000.00</h6>
          <!--<h6>Rs.000 per kg</h6>--> 
        </div>
        <div class="TopPnlRgt">
          <div class="lanDiv">
            <div class="mb--18 mb--0">
              <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal Lang-Btn" :class="{'Active':($i18n.locale=='en')}" @click.prevent="updateLocale('ka')" v-if="$i18n.locale == 'en'"><span>EN</span> / KA </a> 
              <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal Lang-Btn" :class="{'Active':($i18n.locale=='ka')}"  @click.prevent="updateLocale('en')" v-else>EN / <span>KA</span></a>
            </div>
          </div>
          <router-link to="/" class="Btn-Normal DropShadow--Normal logoutBtn">{{ 'Back' }}</router-link>
        </div>
      </div>
      <!--Middle Middle Part-->
      <div class="MiddleGridPnl">
        <div class="LftCustPnl"></div>
        <div class="RhtCustPnl">
          <div class="Top-Breadcrumb pl--24 pr--24 pt--half pb--half"> <span class="pr--3">Your Cart</span>
            <div> <a href="javascript:void(0);" id="" class="Btn-Normal DropShadow--Normal pl--24 pr--24 Text--Uppercase mr--1 Clear-Pending-Amt-Btn">{{ $t('clear')}}</a> <span class="Pending Text--Red"><strong>{{ $t('PendingAmount')}} Rs. 1000.00</strong></span> </div>
          </div>
          <div class="MiddleGridPnlInner">
            <div class="MiddleGridPnlInnerlft">
              <table class="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Supply Rate</th>
                    <th>Qty</th>
                    <th class="w--24">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cart in cartItems">
                    <td>{{ cart.itemName }}</td>
                    <td>{{ currency(cart.price) }}</td>
                    <td>{{ ((['',null].includes(cart.quantity)) ? 0 : cart.quantity) +' '+ cart.unit}}</td>
                    <td class="w--24"><p>{{ currency(cart.total)}}</p></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3"><strong>Total</strong></td>
                    <td class="w--24"><strong>{{ currency(sumBy(cartItems,'total')) }}</strong></td>
                  </tr>
                  <tr class="Pending-Amt-Row">
                    <td colspan="3" class="Text--Red"><strong>{{ $t('PendingAmount') }}</strong></td>
                    <td class="Text--Red w--20"><strong>&#8377; 1000.00</strong><a href="javascript:void(0);" class="action-Btn-Normal Del-Pending-Amt-Row ml--1"><img src="../../assets/img/delete.svg" class="Icon" alt=""></a></td>
                  </tr>
                  <tr>
                    <td colspan="3"><strong>Total</strong></td>
                    <td class="w--24"><strong>&#8377; 5024.80</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!--Middle Bottom Part--> 
      
    </div>
    <!--Right Part-->
    <div class="SplitPnl SplitPnl-Right">
      <div class="ClickDiv"></div>
      <div class="SplitPnl-RightTop pt--2 pb--2 pl--24 pr--24">
        <h3>Past Purchase History</h3>
        <div class="searchboxDiv pt--1">
          <form class="search-box">
            <input class="use-keyboard-input" type="search" name="focus" placeholder="Search here" value="">
            <button class="Scrbtn"></button>
          </form>
        </div>
      </div>
      <div class="accordion-table">
        <table class="fold-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Paid Amt</th>
              <th>Amt</th>
            </tr>
          </thead>
          <tbody>
            <tr class="view">
              <td>12-10-2022</td>
              <td class="">&#8377; 1500.50</td>
              <td class=""><span class="tag mr--half">Pending</span> &#8377; 500.50</td>
            </tr>
            <tr class="fold">
              <td colspan="4"><div class="fold-content">
                  <table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Rate</th>
                        <th>Qty</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Broiler With Skin</td>
                        <td>&#8377; 100.00/kg</td>
                        <td>5.00 kg</td>
                        <td>&#8377; 500.00</td>
                      </tr>
                      <tr>
                        <td>Broiler With Skin</td>
                        <td>&#8377; 100.00/kg</td>
                        <td>5.00 kg</td>
                        <td>&#8377; 500.00</td>
                      </tr>
                      <tr>
                        <td>Broiler With Skin</td>
                        <td>&#8377; 100.00/kg</td>
                        <td>5.00 kg</td>
                        <td>&#8377; 500.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div></td>
            </tr>
            <tr class="view">
              <td>12-10-2022</td>
              <td class="">&#8377; 1500.50</td>
              <td class=""><span class="tag Green--Tag mr--half">Discount</span> &#8377; 500.50</td>
            </tr>
            <tr class="fold">
              <td colspan="4"><div class="fold-content">
                  <table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Rate</th>
                        <th>Qty</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Broiler With Skin</td>
                        <td>&#8377; 100.00/kg</td>
                        <td>5.00 kg</td>
                        <td>&#8377; 500.00</td>
                      </tr>
                      <tr>
                        <td>Broiler With Skin</td>
                        <td>&#8377; 100.00/kg</td>
                        <td>5.00 kg</td>
                        <td>&#8377; 500.00</td>
                      </tr>
                      <tr>
                        <td>Broiler With Skin</td>
                        <td>&#8377; 100.00/kg</td>
                        <td>5.00 kg</td>
                        <td>&#8377; 500.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div></td>
            </tr>
            <tr class="view">
              <td>12-10-2022</td>
              <td class="">&#8377; 1500.50</td>
              <td class=""><span class="tag Yellow--Tag mr--half">Round Off</span> &#8377; 500.50</td>
            </tr>
            <tr class="fold">
              <td colspan="4"><div class="fold-content">
                  <table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Rate</th>
                        <th>Qty</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Broiler With Skin</td>
                        <td>&#8377; 100.00/kg</td>
                        <td>5.00 kg</td>
                        <td>&#8377; 500.00</td>
                      </tr>
                      <tr>
                        <td>Broiler With Skin</td>
                        <td>&#8377; 100.00/kg</td>
                        <td>5.00 kg</td>
                        <td>&#8377; 500.00</td>
                      </tr>
                      <tr>
                        <td>Broiler With Skin</td>
                        <td>&#8377; 100.00/kg</td>
                        <td>5.00 kg</td>
                        <td>&#8377; 500.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--SplitPnl-Right Part--> 
    
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { isEmpty,sumBy } from 'lodash'
import { currency } from '../../utils/currency';
import { App } from "../../models"

 export default {
                  props:['customerView'],
                  data(){
                          return {
                                    currency,
                                    isEmpty,
                                    sumBy
                          }
                  },
                  methods:{
                            updateLocale(lang){
                                this.$i18n.locale = lang
                                App.commit((state) => { state.locale = lang   })
                            }
                  },
                  computed:{
                    ...mapState('coop_local_base/apps', {                                      
                                                      cartItems : (state) => state.cartItems,
                                                      scaleWeight : (state) => state.scaleWeight,
                                                      activeCustomer: (state) => state.activeCustomer,
                                                      loggedUser : (state) => state.loggedUser,
                                                      shop : (state) => state.shop,                       
                    }),
                  }
 }
</script>