<template>
    <!--tab3 start-(Customers Tab)-->
    <div id="tab3" class="tab-content Customers-Tab-Content flex--wrap align--start Left--Grey-Border">
      <div class="Tab-Wrapper Text--Center d--flex align--center justify--center" id="Customer-Open-Screen">
        <div class="Login-Box div--Shadow Active--BG d--inline-block no--border p--45">
            <form class="LoginPnlInner" @submit.prevent="saveCustomer">
                <h3 class="text-start">{{ $t('CustomerInfo') }}</h3>
                <div class="form-group">
                    <input type="text"  class="inputStyle mb--1" v-maska  data-maska="##########"  @maska="loadCustomer"  placeholder="Customer Mobile Number ..." maxlength="10"/>
                </div>
                <div class="form-group">
                    <input type="text" v-model="form.customer.name" class="inputStyle mb--1"  placeholder="Customer Name ..."/>
                    <input type="submit" :value="$t('Go')" class="Submit-Btn-Normal DropShadow--Normal " id="Submitbtn">
                </div>
            </form>
        </div>
      </div>
    </div>
    <!--tab3 end-(Customers Tab)--> 
</template>


<script lang="js">
import { isEmpty } from "lodash"
import { Customer, App } from "../../models"
import { mapState } from "vuex"


export default {
data() {
  return {
    form:{
              customer:{
                          phone:null,
                          name:null,
                          shop_id:null
              }
    }
  }
},
methods:{ 
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
          this.$router.push("/billing")
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
      this.$router.push("/billing")
      this.$toast.success("Customer Saved !")
    }
},
computed:{    
  ...mapState('coop_local_base/apps', {                                                 
                                    loggedUser : (state) => state.loggedUser,
                                    shop : (state) => state.shop,
                                    razorPayOption: (state) => state.razorPayOption
  }),
},
setup() {}
}
</script>