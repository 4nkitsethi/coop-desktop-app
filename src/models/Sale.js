import { Model } from '@vuex-orm/core'
import moment from "moment"
import Product from "./Product"

class Sale extends Model {
    static entity = 'sales'
  
    static primaryKey = 'id'
  
    static fields () {
      return {
                id : this.attr(null),
                date : this.string(null),
                total : this.number(null),  
                receive : this.number(null),  
                quantity : this.number(null),    
                rate : this.number(null),  
                sold_by : this.number(null),  
                cart : this.string(null),    
                shop_id : this.number(null),  
                product_id : this.number(null),  
                created_at : this.string(null),  
                updated_at : this.string(null),  
                customer_id : this.number(null),  
                purchase_history_id : this.string(null),
                product:this.hasOne(Product,'id','product_id')             
      }
    }
}

export default Sale


