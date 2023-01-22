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
                <input class="inputStyle" v-model="loggedUser.name" disabled readonly style="cursor:not-allowed">
              </li>
              <li class="mb--2">
                <h6 class="Text--Left mb--1">Password</h6>              
                <input v-model="credentials.password" class="inputStyle keyboard-alpha" type="password" placeholder="Enter password ... " />              
              </li>
              <li class="">
                <input class="Submit-Btn-Normal DropShadow--Normal" type="submit" value="Unlock">
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
import { App } from '../../models';
import { mapState } from 'vuex';
export default {
  name:"Lock",
  data(){
    return {
              credentials: {                                
                                password:null,
              }
    }
  },
  methods:{    
    authenticate(){       
       if(this.credentials.password == this.loggedUser.decrypt){
            App.commit((state) => {
                                      state.lockApplication = false
            })
            this.$router.go("/")
            this.$toast.success("Authenticated ")
       }else{
            this.$toast.error("Unauthorized User ")
       }

    }
  },
  computed:{
    ...mapState('coop_local_base/apps', {                                     
                                      loggedUser : (state) => state.loggedUser,
    })
  }
}
</script>