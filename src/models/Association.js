import { Model } from '@vuex-orm/core'
import { Rate } from "../models/index"

class Association extends Model {
    static entity = 'associations'
  
    static primaryKey = 'id'
  
    static fields () {
      return {
              id : this.attr(null),
              product_id:this.attr("null"),
              product_id:this.attr("null"),
              stock:this.attr(0),
              totalQtyPerDay:this.attr(0),
              todaySales:this.attr(0),
              totalQtySaleToday:this.attr(0),
              created_at : this.string(null),
              updated_at : this.string(null),
      }
    }
}

export default Association