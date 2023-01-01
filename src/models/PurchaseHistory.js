import { Model } from '@vuex-orm/core'
import Sale from './Sale.js'
import moment from "moment"
import Customer from './Customer.js'

class PurchaseHistory extends Model {
    static entity = 'purchase_histories'
  
    static primaryKey = 'id'
  
    static fields () {
      return {

                    id : this.attr(null), 
                    date : this.string(null),             
                    total : this.number(null),          
                    receive : this.number(null),          
                    quantity : this.number(null),          
                    sold_by : this.number(null),          
                    shop_id : this.number(null),          
                    created_at : this.string(null),          
                    updated_at : this.string(null),          
                    cart : this.string(null),            
                    payment_type : this.string(null),         
                    payment_method : this.string(null),          
                    payment_id : this.string(null),          
                    rest_amount : this.number(null),          
                    past_due_amount : this.number(null),          
                    customer_id : this.number(null),                     
                    data_sync: this.boolean(0),
                    data_sync_at: this.attr(null),
                    batch: this.attr(null),
                    sales : this.hasMany(Sale, 'purchase_history_id', 'id'),                    
                    clearDues:this.boolean(false)  
      }
    }
}


export default PurchaseHistory