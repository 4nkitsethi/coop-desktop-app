<template>

  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="card card-body w-25 text-center my-5">
          <h1>{{  scaleWeight }}</h1>
        </div>


        <table class="table table-striped w-25 text-center">
          <thead>
            <tr class="red">
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cart in getCartItems" :key="cart.cartId">
              <td>{{ cart.itemName }} </td>
              <td>{{ cart.quantity +' '+ cart.unit}}</td>
              <td>{{ "₹ " + Number(cart.total).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-4">
          <h6>Customer Detail </h6>
          <hr />
      </div>
    </div>
  </div>  
</template>

<script>
  import { currency } from "../../utils/currency"  
  export default {
    data(){
      return {
                currency,
                getCartItems:[],
                scaleWeight:null,
                customer : null
      }
    },
    created() {      
    //   setInterval(() => {        
    //                     let items = JSON.parse(window.localStorage.vuex)
    //                     this.scaleWeight = items.coop_local_base.apps.scaleWeight
    //                     this.customer = items.coop_local_base.apps.activeCustomer
    //                     this.getCartItems = [...items.coop_local_base.apps.cartItems]                       
    //  }, 1)
    }
  }
</script>