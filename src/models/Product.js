import { Model } from '@vuex-orm/core'
import { Association, Rate } from "../models/index"

class Product extends Model {
    static entity = 'products'
  
    static primaryKey = 'id'
  
    static fields () {
      return {
              id : this.attr(null),
              product_name : this.string(null),
              status : this.string(null),
              supplier_id : this.number(null),
              created_at : this.string(null),
              updated_at : this.string(null),
              weight_unit : this.string(null),
              fields : this.string(null),
              wholesale_weight : this.number(null),
              image : this.string(null),
              raw_image:this.string(null),
              stock : this.boolean(null),
              digits:this.number(3),
              conversion_rate : this.number(null),
              mask : this.string(null),
              parent_product_id : this.number(null),
              wholesale_weight_range : this.boolean(null),
              default_wholesale_weight : this.number(null),
              rate: this.hasOne(Rate, 'product_id', 'id'),
              data_sync: this.boolean(0),
              association:this.hasOne(Association, 'product_id', 'id'),
              stockFlip:this.boolean(0)
      }
    }
}

export default Product