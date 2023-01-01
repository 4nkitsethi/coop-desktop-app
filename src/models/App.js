import { Model } from '@vuex-orm/core'

class App extends Model {
    static entity = 'apps'
  
    static primaryKey = 'id'

    static state ()  {
      return {
                isAuthenticated: false,                
                token:null,
                locale:"en",
                activeCustomer:null,
                navigator:window.navigator.onLine,
                cartItems:[],
                holdOrders:[],
                scaleWeight:6.892,
                printFlag:false,
                history:null,
                loggedUser:null,
                shop:null,
                scale:null,
                // assetUrl:"https://dev.coop-chicken.in",
                // baseUrl:"https://dev.coop-chicken.in/api/"
                assetUrl:"https://coop-chicken.in/",
                baseUrl:"https://coop-chicken.in/api/",
                razorPayOption:null,
                lockApplication:false
      }
    }
  
    static fields () {
      return {  
      }
    }
}


export default App