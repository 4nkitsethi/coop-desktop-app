import { Model } from '@vuex-orm/core'
import Shop from "./Shop"


class User extends Model {
    static entity = 'users'
  
    static primaryKey = 'id'
  
    static fields () {
      return {
                    id : this.attr(null),
                    name : this.string(null),        
                    email : this.string(null),                   
                    email_verified_at : this.string(null),  
                    password : this.string(null),                                                      
                    phone : this.number(null),  
                    api_token : this.string(null),                                                     
                    remember_token : this.string(null),           
                    created_at : this.string(null),          
                    updated_at : this.string(null),                
                    shop_id : this.number(null),
                    decrypt: this.attr(null),
                    shop: this.hasOne(Shop, 'id', 'shop_id')                    
      }
    }
}


export default User