<template>
    <div class="WrapperPnl">
        <BillingLayout v-if="isAuthenticated"/>
        <Login  v-else/>
    </div>

    <div class="Not-Supported-Div Text--Center d--flex justify--center align--center" v-show="!printFlag">
        <div class="mb--2"><img src="../../assets/img/logo.png" alt=""/></div>
        <h3>Your screen size is not supported.</h3>
    </div>
</template>

<script>
    import Login from "../auth/Login.vue"
    import { mapState } from 'vuex'
    import BillingLayout from "./BillingLayout.vue"
    
    export default {
        name:'Layout',
        components:{
            Login,
            BillingLayout
        },
        computed: {        
            ...mapState('coop_local_base/apps', {
                                            isAuthenticated: (state) => state.isAuthenticated,
                                            printFlag:(state) => state.printFlag
            })
        }
    }
</script>