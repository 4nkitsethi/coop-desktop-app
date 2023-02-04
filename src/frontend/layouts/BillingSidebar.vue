<template>
    <!--Left Part start-->
    <div class="SplitPnl SplitPnl-Left Text--Center">
      <div class="Top-Logo-Part" style="position:relative">
        <a class="SiteLogo" href="#"><img src="../../assets/img/logo.png" alt=""/></a>    
        <kbd style="font-size: 11px;position: absolute; bottom: 33px; right: 20px;">v {{  version  }}</kbd>    
      </div>
      <div class="LeftNav" id="tabs-nav">        
        <div class="Child-Item mb--18"><router-link to="/billing" class="Btn-Normal DropShadow--Normal ">{{ $t('Billing') }}</router-link></div>
        <div class="Child-Item mb--18"><router-link to="/stocks" class="Btn-Normal DropShadow--Normal">{{ $t('Stock',2) }}</router-link><Icon icon="carbon:notification-filled" class="Stock-Notification" v-if="isStockNotify > 0"/></div>
        <div class="Child-Item mb--18"><router-link to="/customers" class="Btn-Normal DropShadow--Normal">{{ $t('CustomerLabel',2) }}</router-link></div>
        <div class="Child-Item mb--18"><a href="#tab4" class="Btn-Normal DropShadow--Normal">{{ $t('Expense',2) }}</a></div>
        <div class="Child-Item mb--18"><router-link to="/sales" class="Btn-Normal DropShadow--Normal">{{ $t('Sale',2) }}</router-link></div>
        <div class="mb--18 mb--18"><a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal Text--Red Lock-Btn" @click.prevent="lockApplication">{{ $t('Lock') }}</a></div>
        <div class="mb--18 mb--0">
          <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal Lang-Btn" :class="{'Active':($i18n.locale=='en')}" @click.prevent="updateLocale('ka')" v-if="$i18n.locale == 'en'"><span>EN</span> / KA </a> 
          <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal Lang-Btn" :class="{'Active':($i18n.locale=='ka')}"  @click.prevent="updateLocale('en')" v-else>EN / <span>KA</span></a>
        </div>
      </div>
      <!--LeftBottom Part-->
      <div class="LeftBottomPnl pa--1"> 
        <!--<div class="indicator">Online</div>--> 
        <img class="Working-Btn Online-Btn" src="../../assets/img/OnlineIcon.png" alt="" v-if="navigator"/> 
        <img class="Working-Btn Offline-Btn" src="../../assets/img/OfflineIcon.png" alt="" v-else/> 
        <kbd style="font-size: 10px; position: absolute; bottom: 2px;" id="downloadStatus">10 / 100</kbd>
      </div>
      <!--LeftBottom Part--> 
    </div>
    <!--Left Part end--> 
</template>

<script lang="ts">
     import { mapState  , mapActions} from 'vuex';
     import { App,StockRequests } from "../../models"
     export default {
          data(){
                  return {
                            version : __APP_VERSION__
                  }
          },
          computed:{
              ...mapState('coop_local_base/apps', {
                                            locale: (state) => state.locale,
                                            navigator: (state) => state.navigator
              }),
              isStockNotify(){
                return StockRequests.query().where("notify",true).count()
              }
          },
          methods:{
            lockApplication(){
              App.commit((state) => { state.lockApplication = true   })
            },
            updateLocale(lang){
              this.$i18n.locale = lang
              App.commit((state) => { state.locale = lang   })
            }
          }
     }
</script>