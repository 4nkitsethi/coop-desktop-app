<template>
    <div class="WrapperPnl">
  <div class="LoginWrap Text--Center">
    <div class="Login-Header pt--2 pb--2"><a class="SiteLogo" href="#"><img src="../../assets/img/logo.png" alt=""/></a></div>
    <div class="Login-Body pt--4 pb--2">
      <div class="Login-Box div--Shadow Active--BG d--inline-block no--border p--45">
        <form @submit.prevent="authenticate()" method="post">
          <ul class="">
            <li class="mb--2">
              <h6 class="Text--Left mb--1">User Name</h6>
              <input class="inputStyle" v-model="credentials.email" type="email" placeholder="Enter user name ...">
            </li>
            <li class="mb--2">
              <h6 class="Text--Left mb--1">Password</h6>
              <input  class="inputStyle" v-model="credentials.password" type="password" placeholder="Enter password ... ">
            </li>
            <li class="">
              <input class="Submit-Btn-Normal DropShadow--Normal" type="submit" value="Login">
            </li>
          </ul>
        </form>
      </div>
    </div>
  </div>
</div>

<div class="Not-Supported-Div Text--Center d--flex justify--center align--center">
  <div class="mb--2"><img src="../../assets/img/logo.png" alt=""/></div>
  <h3>Your screen size is not supported.</h3>
</div>
</template>

<script lang="js">
import { omit, isEmpty } from 'lodash'
import { Product, User, Shop, App, Rate, Association } from "../../models"

export default {
  name:"Login",
  data(){
    return {
              credentials: {
                                email:null,
                                password:null,
              }
    }
  },
  methods:{    
    authenticate(){              
        this.axios.post('login',this.credentials).then(response => {
          
          if(response.data.success){                                  
            User.insert({  data: response.data.data.user  })
            let token = "Bearer "+ response.data.data.token
            let user = User.query().first().$toJson();
            let shop = Shop.query().first().$toJson();

            console.log(user)
            console.log(shop)
            console.log(token)

            // 
            App.commit((state) => {
                      state.isAuthenticated = true                
                      state.token = token
                      state.locale = "en"
                      state.loggedUser  = user
                      state.shop      = shop
                      state.assetUrl = "https://dev.coop-chicken.in"
                      state.baseUrl = "https://dev.coop-chicken.in/api/"
                      state.razorPayOption = {                                                    
                                                    "key": "rzp_test_RHigXN4roHTXEx",                                                    
                                                    "name": shop.shop_name,
                                                    "description": "Checkout",
                                                    "prefill": {
                                                        "name": shop.shop_name,
                                                        "email": shop.phone+'@coop-chicken.in',
                                                        "contact": shop.phone
                                                    }
                                                }

            })
            this.axios.defaults.headers.common['Authorization'] = token  
            this.$toast.success("Atuthenticate Successfully.")         
          }else{
            this.$toast.error("Login failed ! Please try again .")         
          } 
        }).catch( err => {
           this.$toast.error("Login failed ! Please try again .")         
        })
    }
  }
}
</script>