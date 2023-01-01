import { Model } from '@vuex-orm/core'
import moment from "moment"
import StockRequestedProducts from "./StockRequestedProducts"

class StockRequests extends Model {
    static entity = 'stock_requests'
  
    static primaryKey = 'id'
  
    static fields () {
      return {
                  id : this.attr(null),
                  batch:this.number(null),
                  date : this.attr(null),
                  shop_id  : this.attr(null), 
                  payment_method : this.attr(null),  
                  payment_period : this.attr(null),  
                  stock_requested_by : this.attr(null),  
                  status : this.attr(null),     
                  data_sync : this.attr(null),  
                  data_sync_at : this.attr(null),           
                  created_at : this.attr(null),           
                  updated_at : this.attr(null),   
                  type : this.attr(null),     
                  payment_id : this.attr(null),  
                  total_stock_sent : this.attr(null),  
                  total_stock_received : this.attr(null),  
                  total_stock_wastage : this.attr(null),  
                  actual_payment : this.attr(null),  
                  payment_received : this.attr(null), 
                  editMode:this.boolean(false),
                  notify: this.attr(false),
                  server_sync:this.boolean(false),
                  client_sync:this.boolean(false),
                  request_direction:this.attr(null),
                  completed:this.boolean(false),
                  requested_products:this.hasMany(StockRequestedProducts, 'stock_request_id', 'id'),
      }
    }


    // static beforeSelect (model) {
    //   // Do something.
    //   console.log(model);
    //   //model.requested_products = [];
      
    // }
}

export default StockRequests


