import { Model } from '@vuex-orm/core'
import Product from './Product'
import StockRequests from './StockRequests'
import Customer from "./Customer"

class Shop extends Model {
    static entity = 'shops'
  
    static primaryKey = 'id'
  
    static fields () {
      return {
                    id : this.attr(null),
                    shop_name : this.string(null),
                    shop_id : this.number(null),
                    address : this.string(null),
                    distance_from_cps : this.number(null),  
                    shop_dimentions : this.string(null),  
                    stock_capacity_per_day : this.number(null),  
                    max_sale_estimate_per_day : this.number(null),  
                    estimated_start_date : this.string(null),  
                    status : this.string(null),  
                    supplier_id : this.number(null),           
                    phone : this.number(null),
                    created_at : this.string(null),           
                    updated_at : this.string(null),
                    customers:this.hasMany(Customer,'shop_id','id'),
                    stock_requests: this.hasMany(StockRequests,'shop_id','id'),
                    products:this.hasMany(Product,'shop_id','id')                 
      }
    }
}

export default Shop