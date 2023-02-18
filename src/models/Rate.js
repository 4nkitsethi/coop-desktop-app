import { Model } from '@vuex-orm/core'

class Rate extends Model {
    static entity = 'rates'
  
    static primaryKey = 'id'
  
    static fields () {
      return {
                id : this.attr(null),
                date : this.string(null),
                product_id : this.number(null),
                created_at : this.string(null),
                updated_at : this.string(null),
                supply_rate : this.number(null),
                whole_sale_rate : this.number(null),
                wholesale_rate : this.string(null),
                addons : this.string(null),
                retail_rate : this.number(null),
                other_rate : this.number(null),
                type : this.string(null),
                status : this.string(null),
                shop_id : this.number(null),
                data_sync: this.boolean(0)
            }
    }
}

export default Rate