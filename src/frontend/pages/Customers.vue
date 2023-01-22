<template>
      <!--tab3 start-(Customers Tab)-->
      <div id="tab3" class="tab-content Customers-Tab-Content flex--wrap align--start Left--Grey-Border">
        <div class="Tab-Wrapper Text--Center d--flex align--center justify--center" id="Customer-Open-Screen" v-if="selectedCustomer == null">
          <div class="Login-Box div--Shadow Active--BG d--inline-block no--border p--45">
            <form action="" method="post">
              <h6 class="Text--Left mb--1">{{ $t('CustomerMobileNumber')}} </h6>
              <ul class="">
                <li class="">   
                  <input type="text"  class="inputStyle mb--1 keyboard-phone" @input="loadCustomer"  placeholder="Customer Mobile Number ..." data-pattern="number" data-phone="true"/>             
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div class="Tab-Wrapper" id="Customer-Order-List" v-else>
          <div class="CustomerTopPnl d--flex justify--space-between align--center pt--2 pb--2 pl--24 pr--24">
            <div class="Top-Box">
              <h3>{{ $t('CustomerLabel',2)}}</h3>
            </div>
            <div class="Top-Box">
              <h6>{{ $t('CustomerInfo')}}</h6>
              <form action="" method="get">
                <ul class="d--flex align--top">
                  <li> 
                    <input type="text"  class="inputStyle mb--1 keyboard-phone" @input="loadCustomer"  placeholder="Customer Mobile Number ..." data-pattern="number" data-phone="true" :value="selectedCustomer.phone"/>             
                  </li>
                  <li>
                    <input class="inputStyle" name="" type="text" :value="selectedCustomer.name" disabled style="cursor: not-allowed;">
                  </li>
                </ul>
              </form>
            </div>
            <div class="Top-Box Sub-Topbox"> <a href="javascript:void(0);" id="Current-List-Btn" class="Btn-Normal DropShadow--Normal Edit-Customer-Info-Btn Text--Dark-Green pl--2 pr--2" @click.prevent="editCustomerDetail=true; this.onscreenKeyboard()">{{ $t('Edit')}}</a> </div>
            <div class="Top-Box">
              <div class="Pending-Ammount d--flex justify--space-between mb--18">
                <div>
                  <h6>{{ $t('TotalPendingAmount')}}</h6>
                  <h3>{{ currency(selectedCustomer.due_amount) }}</h3>
                </div>
                <div> <a href="javascript:void(0)" class="Btn-Normal DropShadow--Normal pl--24 pr--24" v-if="selectedCustomer.due_amount > 0" @click.prevent="payOnline">{{  $t('PayNow') }}</a> </div>
              </div>
            </div>
          </div>
          <div class="CustomerBtmPnl">
            <table class="Cmn-table Customer-table accordion" id="accordionExample">
              <thead>
                <tr class="d--block">
                  <th class="pt--1 pr--24 pb--1 pl--24 Text--Yellow Text--Left Width--6">#</th>
                  <th class="pt--1 pr--24 pb--1 pl--24 Text--Yellow Text--Left Width--10">{{ $t("Date")}}</th>
                  <th class="pt--1 pr--24 pb--1 pl--24 Text--Yellow Text--Left Width--15">{{ $t('Name')}}</th>
                  <th class="pt--1 pr--24 pb--1 pl--24 Text--Yellow Text--Left Width--10">{{$t('PhoneNo')}}</th>
                  <th class="pt--1 pr--24 pb--1 pl--24 Text--Yellow Text--Left Width--13">{{  $t('LastPurchaseAmt') }}</th>
                  <th class="pt--1 pr--24 pb--1 pl--24 Text--Yellow Text--Left Width--13">{{ $t('TotalAmt') }}</th>
                  <th class="pt--1 pr--24 pb--1 pl--24 Text--Yellow Text--Left Width--16">{{  $t('PendingAmt') }}</th>                  
                </tr>
              </thead>
              <tbody class="d--block"> 
                <div class="accordion-item" v-for="(detail,index) in selectedCustomer.purchased_history" :key="detail.id">
                  <tr class="d--block accordion-header" id="headingOne">
                    <td class="pt--1 pr--24 pb--1 pl--24 Width--6">{{ '#'+detail.id }}</td>
                    <td class="pt--1 pr--24 pb--1 pl--24 Width--10" ><a class="DateField Show-Dtls-Table d--inline-block Text--Yellow  accordion-button  collapsed no-arrow accordion-for-customer-detail" href="javascript:void(0);" data-bs-toggle="collapse" :data-bs-target="'#collapseOne'+index" aria-expanded="true" :aria-controls="'collapseOne'+index">{{ detail.date }}</a></td>
                    <td class="pt--1 pr--24 pb--1 pl--24 Width--15">{{ selectedCustomer.name }}</td>
                    <td class="pt--1 pr--24 pb--1 pl--24 Width--10">{{ selectedCustomer.phone }}</td>
                    <td class="pt--1 pr--24 pb--1 pl--24 Width--13">{{ currency(detail.receive)}}</td>
                    <td class="pt--1 pr--24 pb--1 pl--24 Width--13">{{ currency(detail.total)}}</td>
                    <td class="pt--1 pr--24 pb--1 pl--24 Width--16">{{ currency(selectedCustomer.due_amount)}} <span :class="{'Yellow--Tag':(detail.payment_type == 'Round Off'),'Green--Tag':(detail.payment_type == 'Discount')}" class="tag  mr--half" v-show="!isEmpty(detail.payment_type)">{{ detail.payment_type }}</span></td>
                  </tr>
                  <tr class="d--block SubTableWrapper accordion-collapse collapse" :id="'collapseOne'+index"  :aria-labelledby="'headingOne'+index" data-bs-parent="#accordionExample">
                    <td class="Width--100 accordion-body" colspan="7">
                      <table id="" class="Cmn-table SubTable no--border">
                        <thead>
                          <tr class="d--block">
                            <th class="pt--half pr--24 pb--half pl--24 Text--Left Width--10">{{ $t('Item')}}</th>
                            <th class="pt--half pr--24 pb--half pl--24 Text--Left Width--10">{{ $t('Quantity',2)}}</th>
                            <th class="pt--half pr--24 pb--half pl--24 Text--Left Width--10">{{ $t('Rate')}}</th>                            
                            <th class="pt--half pr--24 pb--half pl--24 Text--Left Width--10">{{ $t('Total')}}</th>
                          </tr>
                        </thead>
                        <tbody class="d--block">
                          <tr class="d--block" v-for="sale in detail.sales" :key="sale.id">
                            <td class="pt--half pr--24 pb--half pl--24 Text--Left no--border Width--10">{{ sale.product.product_name }}</td>
                            <td class="pt--half pr--24 pb--half pl--24 Text--Left no--border Width--10">{{ scale(sale.quantity,2) +' '+ sale.product.weight_unit }}</td>
                            <td class="pt--half pr--24 pb--half pl--24 Text--Left no--border Width--10">{{ currency(sale.rate )}}</td>                            
                            <td class="pt--half pr--24 pb--half pl--24 Text--Left no--border Width--10">{{ currency(sale.total )}}</td>                            
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>  
                </div>                            
              </tbody>
            </table>
          </div>
          <div class="Pagination-Pnl Text--Center p--24">
            <ul>
              <li class="d--inline-block"><a href="#" class="Text--Yellow Text--Uppercase mr--1"> PREV</a></li>
              <li class="d--inline-block"><a href="#" class="Btn-Normal DropShadow--Normal DropShadow--Active">1</a></li>
              <li class="d--inline-block"><a href="#" class="Text--Yellow Text--Uppercase ml--1">NEXT ></a></li>
            </ul>
          </div>

            <!--===========Edit Customer Info Modal Start===============-->
            <div id="Edit-Customer-Info-Modal" class="modal Cmn-Modal Cust-Info-Modal" v-if="editCustomerDetail">
              <div class="Mainmodal">
                <div class="modal-content">
                  <div class="modal-header p--2">
                    <h3>{{ $t('EditCustomersInfo') }}</h3>
                    <span class="Modal-Close-Btn Btn-Normal DropShadow--Normal" @click="editCustomerDetail=false">&times;</span> </div>
                  <div class="modal-body p--2">
                    <h6 class="mb--1">{{ $t('CustomerInfo') }}</h6>
                    <form action="" method="get">
                      <ul class="mb--3">
                        <li class="mb--18">
                          <input class="inputStyle" v-model="selectedCustomer.phone" disabled readonly style="cursor:not-allowed">
                        </li>
                        <li class="mb--18">
                          <input v-model="selectedCustomerName" :placeholder="'Customer Name ...'" class="inputStyle keyboard-alpha" />                          
                        </li>
                      </ul>
                    </form>
                    <div class="d--flex justify--space-between">
                      <div>
                        <h6 class="pb--half">{{  $t('ActualPayment') }}</h6>
                        <h3>{{ currency(selectedCustomer.due_amount) }}</h3>
                      </div>
                      <div> <a href="javascript:void(0)" class="Btn-Normal DropShadow--Normal pl--24 pr--24 Text--Uppercase" @click="updateCustomer">{{ $t('Save')}}</a> </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--===========Edit Customer Info Modal End===============--> 
        </div>
      </div>
      <!--tab3 end-(Customers Tab)--> 
</template>


<script lang="js">
import { currency,scale } from "../../utils/currency"
import { isEmpty , head, find, isNil, sumBy, forEach, assignIn} from "lodash"
import { Customer } from "../../models"
import moment from "moment"
import { mapState } from "vuex"


export default {
  data() {
    return {
      head,
      sumBy,
      isEmpty,
      currency,
      scale,
      editCustomerDetail:false,
      receiptNo : `coop-cps-${Math.round(new Date().getTime() / 1000)}` ,    
      selectedCustomer:null,
      selectedCustomerName:null
    }
  },
  methods:{ 
    updateCustomer(){
      const customer = Customer.query().where('phone', Number(this.selectedCustomer.phone)).first()
      console.log(this.selectedCustomerName);
      customer.name = this.selectedCustomerName
      customer.data_sync = false
      customer.$save();      

      Object.assign(this.selectedCustomer,{ name : this.selectedCustomerName })
      this.editCustomerDetail = false;
      this.$toast.success("Customer detail Updated !")  
    }, 
    payOnline(e){
        let  paymentOption = JSON.parse(JSON.stringify(this.razorPayOption));
        let notes = { "payment" : "Due Amount Customer #"+this.selectedCustomer.id+"  is " + currency(this.selectedCustomer.due_amount)};
        //
        Object.assign(paymentOption,{
                                          "receipt" : `coop-cps-${Math.round(new Date().getTime() / 1000)}`, 
                                          "amount": this.selectedCustomer.due_amount * 100,
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
        //        
    },      
    loadCustomer(e) {      
      //
      if(!isEmpty(e.target.value) && e.target.value.length == 10){       
          if(!isEmpty(this.selectedCustomer)){
            if(this.selectedCustomer.phone == e.target.value)
              return false 
          }
          // 
          const customer = Customer.query().where('phone', Number(e.target.value)).first()        
          if(isEmpty(customer)){            
            this.$toast.warning("Customer not found !")   
          }else{          
            let url = '/customer/'+customer.phone+'/full';
            this.axios
              .get(url)
              .then( res => {
                              this.selectedCustomer = res.data.customer
                              this.selectedCustomerName = this.selectedCustomer.name
                              this.onscreenKeyboard();   
                              this.$toast.success("Customer detail loaded !")
              })
              .catch( err => {              
                this.$toast.error(err.message)
              })                
          }       
      }else{
        this.$toast.info("Enter a valid mobile number ")
      }      
    },
    savePayment(razorpayPaymentId){ 
      const customer = Customer.query().where('phone', Number(this.selectedCustomer.phone)).first()
      customer.payment_id = razorpayPaymentId
      customer.due_amount = 0
      customer.paid_amount = this.selectedCustomer.due_amount
      customer.data_sync = false
      customer.$save();
      Object.assign(this.selectedCustomer,{ due_amount : 0 })
    }
  },
  computed:{    
    ...mapState('coop_local_base/apps', {                                                 
                                      loggedUser : (state) => state.loggedUser,
                                      shop : (state) => state.shop,
                                      razorPayOption: (state) => state.razorPayOption
    }),
  }
}
</script>