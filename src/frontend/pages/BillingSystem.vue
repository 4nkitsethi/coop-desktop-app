<template>
  <div id="tab1" class="tab-content Billing-Tab-Content" >
    <div class="SplitPnl SplitPnl-Middle Text--Center" >
      <div class="SplitPnl SplitPnl-Middle Text--Center overlay" v-if="isEmpty(this.activeCustomer)"></div>      
      <div class="TopDigitalPnl pt--1 pb--1">
        <div class="Digital-Box Digital--font-color Text--Left">
          <h5>{{  $t('ItemName') }}</h5>
          <div class="itemName">
            <h4>{{ scaleWeight }}</h4>
            <small>KG</small> 
          </div>
          <h6>{{ currency(calculatedPrice) }}</h6>
        </div>
      </div>
      <!--Middle Pannel start-->
      <div class="MiddleGridPnl">
        <div class="Top-Breadcrumb pl--24 pr--24 pt--half pb--half">
          <span class="pr--3">{{ $t('ChooseItem', 2) }}</span>
          <span class="Item-Name Text--Yellow">{{ isEmpty(activeProduct) ? '' : activeProduct.product_name }}</span>
        </div>
        <div class="Bottom-ProductPnl">
          <div class="MainProductPnl" id="MainProductPnl">
            <div class="Product-Item DropShadow--Normal Overflow--hidden ma--15" :class="{'DropShadow--Active':(activeProductId == product.id)}" v-for="product in products" :key="product.id" @click.prevent="activeProductId = product.id">
              <div class="Product-Type Product-Type-Top pa--1" style="position:relative">                
                <div class="Type-Left" id="MainProduct">                  
                  <img :src="product.raw_image" class="logo mb--1">
                  <h4> {{ product.product_name }}</h4>
                </div>
                <div class="Flip-Box-shadow Main-Flip-Box" :ref="'product-panel-'+product.id" @click="this.$refs['product-panel-'+product.id][0].classList.toggle('Active')">
                  <div class="Main-chart" >
                    <span :class="'current-stock-chart-'+product.id" :data-percent="(product.association.stock/product.association.totalQtyPerDay) * 100"  style="display: flex;justify-content: center;align-items: center;" > 
                      <span class="Info-Text">{{ $t('Stock') }}</span> 
                      <span class="percent" >{{ scale(product.association.stock,product.digits) }} <small>{{ product.weight_unit  }}</small> </span> 
                    </span>
                  </div>
                  <div class="Flip-chart" >
                    <span :class="'current-sale-chart-'+product.id" :data-percent="(product.association.totalQtySaleToday/product.association.totalQtyPerDay) * 100" style="display: flex;justify-content: center;align-items: center;" > 
                      <span class="Info-Text">{{ $t('Sale') }}</span> 
                      <span class="percent" >{{ currency(product.association.todaySales) }}</span> 
                    </span>
                  </div>
                </div>
              </div>
              <div class="Product-Type Product-Dtls Box--inline-shadow pa--1" id="MainProduct">                
                <template v-if="!isEmpty(product.rate)">                    
                  <template v-if="(JSON.parse(product.rate.wholesale_rate).length > 0)">
                    <div class="Btm-Dtls-txt">                  
                      <p class="Text--Yellow Text--Uppercase">{{ $t('Wholesale') }}</p>
                      <p>{{ currency(head(JSON.parse(product.rate.wholesale_rate)).rate) }}</p>
                    </div>
                  </template>
                </template>
                <!--  -->
                <div class="Btm-Dtls-txt">
                  <p class="Text--Yellow Text--Uppercase">{{ $t('Retail') }}</p>
                  <template v-if="isEmpty(product.rate)">
                    <p>{{ currency(0) }}</p>
                  </template>
                  <template v-else>
                      <p>{{ currency(product.rate.retail_rate) }}</p>                                    
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Middle Pannel end-->
      <!--Bottom Pannel start-->
      <div class="BottomBtnPnl Text--Left pt--1 pb--1 pl--24 pr--24" v-if="this.activeCustomer != null">
        <a id="Select-Product-Btn" href="javascript:void(0);"  class="Btn-Normal DropShadow--Normal DropShadow--Active Active--BG mr--2 Text--Green" v-if="!isEmpty(activeProduct)" @click.prevent="addToCart">{{ $t('Ok') }}</a>
        <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal Text--Red BackBtn" id="Back-To-Main-Product" @click.prevent="generateBillFLag = false" v-show="generateBillFLag"><img src="../../assets/img/red_arrow.png" alt="" class="backIcon"> {{ $t('Back') }}</a> 
        <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal Text--Red BackBtn" id="Back-To-Main-Product" @click.prevent="reset" v-show="!generateBillFLag"><img src="../../assets/img/red_arrow.png" alt="" class="backIcon"> {{ $t('New') }}</a>
      </div>
      <!--Bottom Pannel end-->
    </div>
    <!--Left Section end-->

    <!--Right Section start-->
    <div class="SplitPnl SplitPnl-Right">
      <div class="LoginPnl pt--1 pb--1 pl--24 pr--24" id="LoginPnl" v-if="isEmpty(activeCustomer)">
        <form class="LoginPnlInner" @submit.prevent="saveCustomer">
          <h3>{{ $t('CustomerInfo') }}</h3>
          <div class="form-group">
            <input type="text"  class="inputStyle mb--1 w--73" v-maska  data-maska="##########"  @maska="loadCustomer"  placeholder="Customer Mobile Number ..."/>
          </div>
          <div class="form-group display-flex justify-content">
            <input type="text" v-model="form.customer.name" class="inputStyle mb--1 w--73"  placeholder="Customer Name ..."/>
            <input type="submit" :value="$t('Go')" class="Submit-Btn-Normal DropShadow--Normal " id="Submitbtn">
          </div>
        </form>
        <!--LoginPnlInner Part-->
      </div>
      <div class="TabPnl" id="TabPnl" v-else>
        <div class="Bill-tabs">
          <div class="Cmn-Tabs-Nav pt--1 pb--1 pl--24 pr--24" id="bill-tabs-nav"> 
            <a href="javascript:void(0)" class="Tab-Btn-Normal DropShadow--Normal mr--2" :class="{'DropShadow--Active Active--BG':billingTab}" @click.prevent="billingTab=true;holdOrderTab=false">{{ $t('BillingDetail') }}</a> 
            <a href="javascript:void(0)" class="Tab-Btn-Normal DropShadow--Normal" :class="{'DropShadow--Active Active--BG':holdOrderTab}" @click.prevent="billingTab=false;holdOrderTab=true">{{ $t('HoldOrderHistory')}}</a> 
          </div>
          <div class="Bill-Tabs-box" id="bill-tabs-content">
            <div id="bill-tab1" class="bill-tab-content" v-if="billingTab">
              <!--NameAmount-->
              <div class="NameAmount pt--09 pb--09 pl--24 pr--24">
                <div class="NameAmountLft">
                  <p>{{ $t('BillNumber') }}: {{  billNumber  }}</p>
                  <p>{{ $t('Name') }}:
                    <input class="Person-Name" :class="{'inputStyle':editCustomerNameFlag}" v-model="activeCustomerName" type="text" :disabled="!editCustomerNameFlag">
                    <a class="Save-Name-Btn" href="javascript:void(0);" v-if="editCustomerNameFlag" @click="updateCustomer">{{ $t('Save') }}</a>
                    <a class="Save-Name-Btn" href="javascript:void(0);" v-if="editCustomerNameFlag" @click="editCustomerNameFlag = false">{{ $t('Cancel') }}</a>
                    <a class="Edit-Name-Btn" href="javascript:void(0);" v-else @click="editCustomerNameFlag = true">{{ $t('Edit') }}</a>                     
                  </p>
                  <small>{{  this.activeCustomer.phone }}</small>
                </div>
                <div class="NameAmountRgt Text--Red">
                  <div style="display: flex;    align-items: center;">                    
                    <p style="text-align:left"> {{ $t('PendingAmount') }} <br /> <b>{{ currency(this.activeCustomer.due_amount) }}</b></p>                    
                    <template v-if="this.activeCustomer.due_amount > 0">
                      <a href="javascript:void(0);" class="clear-dues DropShadow--Normal pl--24 pr--24 Text--Uppercase mr--1 Clear-Pending-Amt-Btn" v-if="(generateBillFLag && !clearDues )" @click="calculateGrandTotal(true)">{{ $t('Clear') }}</a>
                      <a href="javascript:void(0);" class="action-Btn-Normal Del-Tbl-Data DropShadow--Normal" @click="calculateGrandTotal(false)" v-if="clearDues == true"><img src="../../assets/img/delete.svg" class="Icon" alt=""></a>
                    </template>
                  </div>
                </div>
              </div>
              <!--NameAmount-->

              <div class="billingpanel" id="billingFirst" v-if="!generateBillFLag">

                <!--TablePnl-->
                <div class="TablePnl">
                  <table class="table">
                    <thead>
                      <tr class="red">
                        <th>{{ $t('Item') }}</th>
                        <th>{{ $t('Quantity',2) }}</th>
                        <th>{{ $t('Price') }}</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="cart in cartItems" :key="cart.cartId">
                        <td>{{ cart.itemName }} <input type="text" :data-cart="cart.cartId" v-debounce:1s="updateCart" v-maska  :data-maska="cart.mask" data-maska-tokens="*:[0-9]:multiple" placeholder="Choose Qty" class="ChooseQty DropShadow--Normal" v-if="!['kg','KG'].includes(cart.unit)"   :value="cart.quantity"/></td>
                        <td>{{ cart.quantity +' '+ cart.unit}}</td>
                        <td>{{ currency(cart.total) }}</td>
                        <td>
                          <a href="javascript:void(0);" class="action-Btn-Normal Del-Tbl-Data DropShadow--Normal" @click="removeFromCart(cart)">
                            <img src="../../assets/img/delete.svg" class="Icon" alt="">
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--TablePnl-->
                <!--ListDiv-->
                <div class="ListDiv ">
                  <ul>
                    <li class="pl--24 pr--24 pt--23 pb--23">
                      <label>{{ $t('TotalAmount') }}</label>
                      {{ currency(sumBy(cartItems,'total')) }}
                    </li>
                  </ul>
                </div>
                <!--ListDiv-->
              </div>
              <div class="billingpanelNew" id="billingsce" v-if="generateBillFLag">
                <div class="billingpanel">
                  <!--ListDiv-->
                  <div class="ListDiv ">
                    <ul>
                      <li class="pl--24 pr--24 pt--23 pb--23">
                        <label>{{ $t('TotalAmount') }}</label>
                        {{ currency(sumBy(cartItems,'total')) }}
                      </li>
                      <li class="pl--24 pr--24 pt--23 pb--23">
                        <label>{{ $t('ReceivingAmount') }}</label>
                        <input type="text"  class="Btn-Normal DropShadow--Normal DropShadow--Active Active--BG AmountBox " v-model="receiveAmount"/>
                      </li>
                      <li id="Round-Off-Ammount" class="pl--24 pr--24 pt--23 pb--23 Dynamic-Row" v-if="paymentType != null">
                        <label>{{ paymentType }} {{ $t('Amount') }}</label>
                        <span class="tag" :class="{'Yellow--Tag':(paymentType == 'Round Off'),'Green--Tag':(paymentType == 'Discount')}">{{ currency(getRemainingAmount) }}</span>
                      </li>                      
                      <li class="pl--24 pr--24 pt--23 pb--23">
                        <label>{{ $t('GrandAmount') }}</label>
                        {{ currency(getGrandTotal) }}
                      </li>
                    </ul>
                  </div>
                  <!--ListDiv-->
                </div>
                <div class="tableBtnArea pt--1 pb--1 pl--24 pr--24"> 
                  <a href="javascript:void(0);" id="Round-Off-Btn" class="tableBtnArea-Btn-Normal DropShadow--Normal" :class="{'DropShadow--Active' : (paymentType == 'Round Off')}" @click="paymentType = 'Round Off'" >{{ $t('RoundOff') }}</a> 
                  <a href="javascript:void(0);" id="Discount-Btn" class="tableBtnArea-Btn-Normal DropShadow--Normal" :class="{'DropShadow--Active' : (paymentType == 'Discount')}" @click="paymentType = 'Discount'">{{ $t('Discount') }}</a> 
                  <a href="javascript:void(0);" id="Pending-Btn"  class="tableBtnArea-Btn-Normal DropShadow--Normal" :class="{'DropShadow--Active' : (paymentType == 'Pending')}" @click="paymentType = 'Pending'">{{ $t('Pending') }}</a> 
                </div>
              </div>
              <div class="BottomBtnArea pt--1 pb--1 pl--24 pr--24 display-flex" v-if="generateBillFLag"> 
                <a href="javascript:void(0);"  class="Btn-Normal DropShadow--Normal Text--Red mr--2 " @click.prevent="savePayment(null)"><img src="../../assets/img/HandSign.png" alt="" class="handIcon" > {{ $t('PayOffline') }} </a> 
                <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal Text--Green" @click.prevent="payOnline">{{ $t('PayOnline') }}</a> 
              </div>
              <div class="BottomBtnArea pt--1 pb--1 pl--24 pr--24 display-flex" v-else> 
                <a href="javascript:void(0);"  class="Btn-Normal DropShadow--Normal Text--Red mr--2 width9" id="myBtn" v-if="!isEmpty(cartItems)" @click="holdOrder"><img src="../../assets/img/HandSign.png" alt="" class="handIcon"> {{ $t('Hold') }}</a> 
                <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal Text--Green" id="NextBtn" @click.prevent="generateBillFLag = true;receiveAmount = getReceiveAmount" v-if="!isEmpty(cartItems)">{{ $t('Next') }}</a> 
              </div>
            </div>
            <div id="bill-tab2" class="bill-tab-content" v-if="holdOrderTab">

              <!--NameAmount-->
              <div class="searchboxDiv pt--09 pb--09 pl--24 pr--24">
                <form class="search-box">
                  <input type="search" name="focus" placeholder="Search" value="">
                  <span class="Scrbtn"></span>
                </form>
              </div>
              <!--NameAmount-->

              <div class="TablePnl">
                <table class="table">
                  <thead>
                    <tr class="red">
                      <th>Info</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(order,index) in holdOrders" :key="index">
                      <td>
                        <p>Number: {{ order.customer.phone }}</p>
                        <p>Name: {{ order.customer.name }}</p>
                      </td>
                      <td><strong>{{  currency(sumBy(order.cartItems , 'total')) }}</strong></td>
                      <td>
                          <a href="javascript:void(0)" class="td-Btn-Normal DropShadow--Normal mr--1" @click="releaseOrder(index,order)">Release</a>
                          <a href="javascript:void(0)"  class="td-Btn-Normal DropShadow--Normal Text--Red" @click="delectHoldOrder(index,order)">Delete</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- <div class="BottomBtnArea pt--1 pb--1 pl--24 pr--24 display-flex"> 
                <a href="#" class="Btn-Normal DropShadow--Normal Text--Red mr--2 width9" id="myBtn"> <img src="../../assets/img/HandSign.png" alt="" class="handIcon"> Hold </a> 
                <a href="#" class="Btn-Normal DropShadow--Normal Text--Green">Next</a> 
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <!--TabPnl Part-->

    </div>
    <!--Right Section end-->
  </div>
  <!--tab1 end-(Billing Tab)-->
</template>

<script lang="js">
import { currency, scale } from "../../utils/currency"
import { isEmpty , head, find, isNil, sumBy, forEach, assignIn} from "lodash"
import { mapActions, mapState } from "vuex";

import { Product, Customer, App, Sale, PurchaseHistory, Association } from "../../models"
import moment from "moment"
import EasyPieChart from "easy-pie-chart"
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'




export default {
  data() {
    return {
      head,
      sumBy,
      isEmpty,
      currency,
      scale,
      billingTab:true,
      holdOrderTab:false,
      activeProductId:null,
      appliedRate:0,
      generateBillFLag:false,
      receiveAmount:0,
      paymentType:null, 
      clearDues:false,    
      receiptNo : `coop-cps-${moment().format("YYYYMMDDhhmmss")}`, 
      billNumber : moment().format("YYYYMMDDhhmmss"),
      editCustomerNameFlag:false,
      activeCustomerName:null,
      form:{
              customer:{
                          phone:null,
                          name:null,
                          shop_id:null
              }
      },
      easyPieChartOption:{
                            barColor:'#bf8a00',
                            scaleColor:false
                }

    }
  },
  methods:{
    releaseOrder(index,order){
        if(isEmpty(this.cartItems)){
          App.commit((state) => {      
            state.holdOrders.splice(index,1)
            state.cartItems = [...order.cartItems];
            state.activeCustomer = Customer.query().where('phone',order.customer.phone).first().$toJson();          
          });
          this.$router.go()
        }else{
          this.$toast.info("Cart is not empty . Please empty your cart to release order")
        }      
    },
    delectHoldOrder(index,order){
      if(confirm('Please confirm before proceed !')){
        order.cartItems.forEach( item => {
          let association = Association.query().where("product_id",item.id).first();        
          if(['kg','KG'].includes(item.unit))
            association.stock = parseFloat(association.stock) + parseFloat(item.quantity);
          else
            association.stock = parseFloat(association.stock) + parseFloat((isEmpty(item.quantity)) ? 0 : item.quantity);
          // 
          association.$save();
          this.updateEasyPieChart(".current-stock-chart-"+association.product_id,(association.stock/association.totalQtyPerDay) * 100);         
       }) 
       
       App.commit((state) => {      
          state.holdOrders.splice(index,1)         
        })
      }       
    },    
    holdOrder(){
       let order = { 
                      orderNumber:this.holdOrders.length + 1,
                      cartItems : this.cartItems,
                      customer  : this.activeCustomer,

       }
       //
        App.commit((state) => {      
          state.holdOrders.push(order)
          state.cartItems = [];
          state.activeCustomer = null;          
        })       
    },
    calculateGrandTotal(flag){
        this.clearDues = flag
        if(flag){
          this.receiveAmount = parseFloat(sumBy(this.cartItems,'total')) + parseFloat(this.getDueAmount)
        }else{
          this.receiveAmount = parseFloat(sumBy(this.cartItems,'total'))
        }        
    },
    updateEasyPieChart(target,value){
      let ele = document.querySelector(target);
      ele.querySelector("canvas").remove();
      new EasyPieChart(ele, this.easyPieChartOption).update(value);
    },
    payOnline(e){ 
        let  paymentOption = JSON.parse(JSON.stringify(this.razorPayOption));
        let notes = {};
        forEach(this.cartItems, function(item) {
            let value = item.itemName + ' => ₹ ' + item.price +' - '+ item.quantity +' '+ item.unit;
            let obj = { 'Item' : value };
            assignIn(notes,obj);
        });
        //
        Object.assign(paymentOption,{
                                          "receipt" : `coop-cps-${Math.round(new Date().getTime() / 1000)}`, 
                                          "amount": this.receiveAmount * 100,
                                          "notes": notes,
                                          "handler": response => {
                                              this.savePayment(response.razorpay_payment_id)
                                              this.$toast.success("Payment done successfully.")
                                          },
                                          "modal": {
                                                      "ondismiss": () => {
                                                          this.$toast.warning("Payment not done please try again or pay offline.");
                                                      }
                                          }
                                      });
        var rzp1 = new Razorpay(paymentOption);
        rzp1.open();
    },
    reset(){
      this.form.customer.name = this.form.customer.phone = this.activeProductId = null
      App.commit((state) => {   state.activeCustomer = null    })
      
    },   
    addToCart(){
      if(this.calculatedPrice <= 0 && ['kg','KG'].includes(this.activeProduct.weight_unit)){
        this.$toast.info("product not added to cart due to  total is 0.")
        return false
      }
      console.log(this.activeProduct)
      // 
      let cart = {
                    cartId : this.cartItems.length + 1,
                    id: this.activeProduct.id,
                    product_id:this.activeProduct.id,
                    itemName:this.activeProduct.product_name,
                    unit:this.activeProduct.weight_unit,
                    price: (['kg','KG'].includes(this.activeProduct.weight_unit)) ? this.appliedRate : 0,
                    quantity:(['kg','KG'].includes(this.activeProduct.weight_unit)) ? parseFloat(this.scaleWeight) : 0 ,
                    total : (['kg','KG'].includes(this.activeProduct.weight_unit)) ? parseFloat(this.calculatedPrice) : 0 , 
                    mask:this.activeProduct.mask
      }
      //       
      App.commit((state) => {
            state.cartItems.push(cart)
      })
      if(['kg','KG'].includes(this.activeProduct.weight_unit)){        
        let association = Association.query().where("product_id",this.activeProduct.id).first();
        association.stock = parseFloat(association.stock) - parseFloat(cart.quantity);
        association.$save();
        //     
        this.updateEasyPieChart(".current-stock-chart-"+association.product_id,(association.stock/association.totalQtyPerDay) * 100);
      }      
      //
      this.$toast.success("Product is added to cart !")
    }, 
    removeFromCart(item){
        //
        let association = Association.query().where("product_id",item.id).first();        
        if(['kg','KG'].includes(item.unit))
          association.stock = parseFloat(association.stock) + parseFloat(item.quantity);
        else
          association.stock = parseFloat(association.stock) + parseFloat((isEmpty(item.quantity)) ? 0 : item.quantity);
        // 
        association.$save();
        this.updateEasyPieChart(".current-stock-chart-"+association.product_id,(association.stock/association.totalQtyPerDay) * 100);
        //
        App.commit( (state) => {
          var index = state.cartItems.findIndex(c => c.id == item.id);
          state.cartItems.splice(index, 1);
        })
    },  
    updateCart(value,event){            
      let item = this.cartItems.find( cart => cart.cartId == event.target.dataset.cart)
      let product = find(this.products , p => { return p.id == item.id })   
      let association = Association.query().where("product_id",item.id).first();  

      if((value - item.quantity) > association.stock){
        this.$toast.error("Quantity out of stock ! Please raise new stock request")
        return false
      }
      //       
      if(!isEmpty(product.rate)){
          let wholesaleInstace = JSON.parse(product.rate.wholesale_rate),
              wholesale = null,
              rate  = 0,
              total  = 0,
              quantity  = (isEmpty(value)) ? 0 : value;
          if(!isEmpty(wholesaleInstace)){
            wholesale = find(wholesaleInstace, (w) => { return w.from <= quantity && quantity <= w.to })
          }  
          //
          rate = (isEmpty(wholesale) || isNil(wholesale)) ? parseFloat(product.rate.retail_rate) : parseFloat(wholesale.rate);          
          total =  Number(parseFloat(rate) * parseFloat(quantity)).toFixed(2)
                    
          let cart = {
                        cartId : item.cartId,
                        id: item.id,
                        itemName:item.itemName,
                        unit:item.unit,
                        price: rate,
                        quantity:(isEmpty(value)) ? '' : quantity,
                        total : parseFloat(total), 
                        mask: item.mask
          }

          App.commit((state) => {
            var index = state.cartItems.findIndex(c => c.cartId == cart.cartId);            
            state.cartItems[index] = cart
          })

          if(isEmpty(value)){
            if(!isEmpty(item.quantity)){
                          
              association.stock = parseFloat(association.stock) + parseFloat(item.quantity);
              association.$save();
              this.updateEasyPieChart(".current-stock-chart-"+association.product_id,(association.stock/association.totalQtyPerDay) * 100);        
              this.$toast.success("Cart item is updated !")
            }
          }else{               
            if(!isEmpty(item.quantity)){         
              association.stock = parseFloat(association.stock) + parseFloat(item.quantity);            
              association.$save();
            }
            // 
            association.stock = parseFloat(association.stock) - parseFloat(cart.quantity);
            association.$save();            
            this.updateEasyPieChart(".current-stock-chart-"+association.product_id,(association.stock/association.totalQtyPerDay) * 100);        
            this.$toast.success("Cart item is updated !")
          }
          
          
      }   
    },
    updateCustomer(){
      const customer = Customer.query().where('phone', Number(this.activeCustomer.phone)).first()
      customer.name = this.activeCustomerName
      customer.data_sync = false
      customer.$save();
      this.editCustomerNameFlag = false
      App.commit((state) => {
        state.activeCustomer = customer.$toJson()
      })
      this.$toast.success("Customer detail Updated !")  
    },
    loadCustomer(event) {     
      if(event.detail.completed){   
        this.form.customer.phone =  event.target.value;    
        const customer = Customer.query().where('phone', Number(event.target.value)).first()        
        if(isEmpty(customer)){
          this.$toast.success("New Customer !")      
        }else{ 
          this.activeCustomerName = customer.name         
          App.commit((state) => {
            state.activeCustomer = customer.$toJson()
          })
          this.$toast.success("Customer detail loaded !")      
        }       
      }
    },
    saveCustomer() {      
      // 
      this.form.customer.shop_id = this.shop.id  
      Customer.insert({ data: this.form.customer })
      const customer = Customer.query().where('phone', Number(this.form.customer.phone)).first()
      // 
      this.activeCustomerName = customer.name      
      App.commit((state) => {
        state.activeCustomer = customer.$toJson()
      })
      this.$toast.success("Customer Saved !")
    },
    savePayment(razorpayPaymentId){ 
      if(isEmpty(razorpayPaymentId)){
        if(!window.confirm("Please Confirm the amount "+ currency(this.receiveAmount))){
          return false;
        }
      }

      let sales = [];
      this.cartItems.filter( item => {
                                        sales.push({ 
                                                        date : moment().format("YYYY-MM-DD"),
                                                        total : item.total,  
                                                        receive : item.total,  
                                                        quantity : item.quantity,    
                                                        rate : item.price,  
                                                        sold_by : this.loggedUser.id,  
                                                        cart : JSON.stringify(item),    
                                                        shop_id : this.shop.id,  
                                                        product_id : item.id,
                                                        created_at : moment().format("YYYY-MM-DD hh:mm"),          
                                                        updated_at : moment().format("YYYY-MM-DD hh:mm"),  
                                                        customer_id : (isEmpty(this.activeCustomer)) ? 0 : this.activeCustomer.phone
                                        });
      })
      //
      PurchaseHistory.insert({
        data: {
                              date : moment().format("YYYY-MM-DD"),             
                              total : this.getGrandTotal,          
                              receive : this.receiveAmount,          
                              quantity : this.cartItems.length,          
                              sold_by :  this.loggedUser.id,          
                              shop_id : this.shop.id,  
                              batch : moment().format("YYYYMMDDhhmmss"),                  
                              created_at : moment().format("YYYY-MM-DD hh:mm"),          
                              updated_at : moment().format("YYYY-MM-DD hh:mm"),          
                              cart : JSON.stringify(this.cartItems),            
                              payment_type : this.paymentType,         
                              payment_method : (isEmpty(razorpayPaymentId))?'Offline':'Online',          
                              payment_id : (isEmpty(razorpayPaymentId)) ? null : razorpayPaymentId,          
                              rest_amount : parseFloat(this.getGrandTotal) - parseFloat(this.receiveAmount),          
                              past_due_amount : (isEmpty(this.activeCustomer)) ? 0 : this.activeCustomer.due_amount,          
                              customer_id : (isEmpty(this.activeCustomer)) ? 0 : this.activeCustomer.phone,
                              sales:sales,
                              clearDues:this.clearDues
              }
      }).then((history) => {        
          let ph = PurchaseHistory.query().where("id",head(history.purchase_histories).id).with('sales.product').first()
          if(this.clearDues){
             let customer = Customer.query().where('phone',this.activeCustomer.phone).first()
             customer.due_amount = parseFloat(this.getGrandTotal) - parseFloat(this.receiveAmount)
             customer.$save()
          }else{
              let customer = Customer.query().where('phone',this.activeCustomer.phone).first()
              customer.due_amount += parseFloat(this.getGrandTotal) - parseFloat(this.receiveAmount)
              customer.$save()
          }          
          // 
          App.commit((state) => {            
            state.printFlag = true;  
            state.history = ph.$toJson() 
          })
          setTimeout( () => {
            window.print()
          }, 1000)
          setTimeout( () => {    
            let associations = Association.all();
            associations.filter( assoc => {              
              let todaySales  = Sale.query().where("date" , (date) => date == moment().format("YYYY-MM-DD")).where("product_id",assoc.product_id).sum("total");
              let totalQtySaleToday = Sale.query().where("date" , (date) => date == moment().format("YYYY-MM-DD") ).where("product_id",assoc.product_id).sum("quantity");
              if(isEmpty(todaySales)){
                  assoc.todaySales = todaySales;
              }
              if(isEmpty(totalQtySaleToday)){
                assoc.totalQtySaleToday = totalQtySaleToday;
              }

              console.log(todaySales)
              console.log(totalQtySaleToday)
              assoc.$save();
            })

            App.commit((state) => {
              state.printFlag = false;
              state.history = null        
              state.cartItems = [];
              state.activeCustomer = null;
            })
          }, 2000)
      })  
    }
  },
  computed:{
    getDueAmount(){
        let dueAmt =  (isEmpty(this.activeCustomer)) ? parseFloat(0) : parseFloat(this.activeCustomer.due_amount)
        return Number(dueAmt).toFixed(2)
    },
    getReceiveAmount(){
                let receiveAmount = parseFloat(sumBy(this.cartItems,'total')) 
                return Number(receiveAmount).toFixed(2)
    },
    getGrandTotal(){
        let grandTotal  = 0
        if(this.clearDues){
          grandTotal = parseFloat(sumBy(this.cartItems,'total')) + parseFloat(this.getDueAmount)
        }else{
          grandTotal = parseFloat(sumBy(this.cartItems,'total')) 
        }        
        return Number(grandTotal).toFixed(2)
    },
    getRemainingAmount(){
      let remainingAmt = this.getGrandTotal - this.receiveAmount
      return Number(remainingAmt).toFixed(2)
    },
    ...mapState('coop_local_base/apps', {                                      
                                      cartItems : (state) => state.cartItems,
                                      scaleWeight : (state) => state.scaleWeight,
                                      activeCustomer: (state) => state.activeCustomer,
                                      loggedUser : (state) => state.loggedUser,
                                      shop : (state) => state.shop,
                                      razorPayOption : (state) => state.razorPayOption,
                                      holdOrders: (state) => state.holdOrders,
                                      scaleConfig : (state) => state.scale
    }),

    // 
    calculatedPrice(){
      if(!isEmpty(this.activeProduct)){        
        if(!isEmpty(this.activeProduct.rate) && ['kg','KG'].includes(this.activeProduct.weight_unit)){
          let wholesaleInstace = JSON.parse(this.activeProduct.rate.wholesale_rate),
              wholesale = null,
              rate = 0;
          if(!isEmpty(wholesaleInstace)){
            wholesale = find(wholesaleInstace, (w) => { return w.from <= this.scaleWeight && this.scaleWeight <= w.to })
          }  
          //
          rate = (isEmpty(wholesale) || isNil(wholesale)) ? parseFloat(this.activeProduct.rate.retail_rate) : parseFloat(wholesale.rate)
          this.appliedRate = rate
          return Number(parseFloat(rate) * parseFloat(this.scaleWeight)).toFixed(2)
        }
      }      
      return Number(0).toFixed(2)
    },
    activeProduct(){
      return find(this.products, (p) => { return p.id == this.activeProductId })    
    },      
    products () {
      let products =  Product.query().with(['rate','association']).get()
      return products
    }

  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations () {
    return {
      firstName: { required },
      lastName: { required }, 
    }
  },
  mounted(){
    
    if(!isEmpty(this.activeCustomer))         
      this.activeCustomerName = this.activeCustomer.name
   
      
      
      this.receiveAmount = this.getReceiveAmount
      //
      this.products.filter( item => {      
        let elementStock = document.querySelector(".current-stock-chart-"+item.id);
        new EasyPieChart(elementStock, this.easyPieChartOption)

        let elementSale = document.querySelector(".current-sale-chart-"+item.id);
        new EasyPieChart(elementSale, this.easyPieChartOption)            
      })
  }

  
}
</script>