import { Model } from '@vuex-orm/core'
import moment from "moment"
import { Product } from '.'

class StockRequestedProducts extends Model {
    static entity = 'stock_requested_products'
  
    static primaryKey = 'id'
  
    static fields () {
      return {
        id : this.attr(null),
        date : this.attr(null),        
        product_id : this.attr(null),  
        stock_request_id : this.attr(null),  
        stock_request : this.attr(null),  
        current_stock : this.attr(null),  
        status : this.attr(null),     
        supply_rate  : this.attr(null),          
        created_at : this.attr(null),           
        updated_at : this.attr(null),  
        stock_sent : this.attr(null),  
        stock_received : this.attr(null),  
        stock_wastage : this.attr(null),    
        total : this.attr(null),
        product:this.belongsTo(Product,'product_id') 
      }
    }
}

export default StockRequestedProducts


