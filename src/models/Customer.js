import { Model } from '@vuex-orm/core'
import moment from "moment"

class Customer extends Model {
    static entity = 'customers'
  
    static primaryKey = 'id'
  
    static fields () {
      return {
                    id : this.attr(null),
                    name : this.string(null),        
                    email : this.string(null),                   
                    due_amount : this.number(null),                      
                    location : this.string(null),                                                                                            
                    phone : this.number(null),                    
                    created_at : this.attr(moment().format("YYYY-MM-DD hh:mm")),          
                    updated_at : this.attr(moment().format("YYYY-MM-DD hh:mm")), 
                    data_sync: this.boolean(0),
                    data_sync_at: this.attr(''),
                    batch:this.attr(null),
                    shop_id:this.attr(null),
                    payment_id:this.attr(null),
                    paid_amount: this.attr(null)  
      }
    }
}


export default Customer