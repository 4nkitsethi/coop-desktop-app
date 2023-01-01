import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import { User, Shop, Product, Rate, App, Customer, PurchaseHistory, Sale, StockRequests, StockRequestedProducts, Association } from "../../models"
import VuexPersistence from 'vuex-persist'


// Create new instance of Database.
const database = new VuexORM.Database()

// Register Models.
database.register(User)
database.register(Shop)
database.register(Product)
database.register(Association)
database.register(Rate)
database.register(App)
database.register(Customer)
database.register(PurchaseHistory)
database.register(Sale)
database.register(StockRequests)
database.register(StockRequestedProducts)



  
const store = new Vuex.Store({
    plugins: [
        VuexORM.install(database, { namespace: 'coop_local_base' }),
        new VuexPersistence().plugin
    ],
    strict:true
})

export default store