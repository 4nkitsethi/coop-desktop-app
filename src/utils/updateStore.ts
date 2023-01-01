import axios from "axios"
import store from "./store"
import { forEach, omit, isEmpty, map, update } from "lodash"
import { Product, Rate, Customer, PurchaseHistory, Sale, StockRequests} from "../models"
import moment from "moment"

// 
axios.defaults.headers.common['Authorization'] = "Bearer "+ store.state.coop_local_base.apps.token  
// 
function updateProductAndRate(){
    axios.get('products')
            .then( response => {
                // 
                let products = response.data 
                forEach(products , product =>{                                  
                    let storeProduct = Product.find(product.id)      
                    if(!moment(storeProduct.updated_at).isSame(product.updated_at)){
                        Product.update({
                            where: product.id,
                            data: omit(product,['rate','association'])
                        })
                    }

                    if(!isEmpty(product.rate)){
                        let storeProductRate = Rate.find(product.rate.id)
                        if(isEmpty(storeProductRate)){
                            Rate.query().where('product_id', product.id).delete()
                            Rate.insert({ data : product.rate })
                        }
                    }
                })               
            })
            .catch( err => {
                console.log(err)
            })
}


function syncCustomers(){    
    const customersNeedsToBeSync = Customer.query().where('data_sync',false).limit(100).get();
    
    if(customersNeedsToBeSync.length > 0){        
        console.log(customersNeedsToBeSync)
        axios.post("sync/customers",{ customers : customersNeedsToBeSync }).then( response => {   
            customersNeedsToBeSync.forEach( cus => cus.$delete())        
            Customer.insertOrUpdate({ data:response.data})            
        })
    }    
}


function syncSales(){      
    const histories = PurchaseHistory.query().with("sales").where('data_sync',false).limit(100).get(); 
    
    if(histories.length > 0){        
        axios.post("sync/sales",{sales : histories }).then( response => {            
            histories.forEach( history =>{ 
                history.sales.forEach( sale => sale.$delete()) 
                history.$delete() 
            })
            PurchaseHistory.insert({ data: response.data  }) 
        })
    }    
}


function syncStockRequests(){
    let checkAnyPendingRequest = StockRequests.query().with('requested_products').where('data_sync',0).orWhere('data_sync',false).where('status', 'Requested').all();  
    //
    if(!isEmpty(checkAnyPendingRequest)){              
        axios
            .post('sync/stock/requests',{ stockRequests : checkAnyPendingRequest})
            .then( response => {
                console.log(checkAnyPendingRequest);
                forEach(checkAnyPendingRequest, sr =>{        
                    sr.requested_products.forEach(rp => rp.$delete());
                    sr.$delete();
                });
                // 
                console.log(response.data);
                forEach(response.data.allSyncRequests , data =>{ 
                    StockRequests.insertOrUpdate({ data : data })
                })
            })
    }
    let stockRequestClient = StockRequests.query().with('requested_products').where('data_sync',true).where("server_sync",false).get()
    axios
            .post('/fetch/updated/stock/requests',{ stockRequestClient : stockRequestClient })
            .then( response => {
                console.log(moment().format('s'))
                if(stockRequestClient.length > 0){
                    console.log("hello");
                    stockRequestClient.forEach( sr =>{  
                        console.log(sr);                        
                        StockRequests.update({ 
                                                where:sr.id,
                                                data: {
                                                            server_sync : true
                                                }
                        })
                    })
                }



                forEach(response.data.stockRequestServer , data =>{                    
                    if(data.status == 'Completed'){
                        data.server_sync = false;
                        data.completed = true;
                        data.client_sync = true;
                    }                                
                    StockRequests.insertOrUpdate({ data : data })
                })                
            })   
}


export default { 
                    updateProductAndRate : updateProductAndRate,
                    syncCustomers:syncCustomers,
                    syncSales:syncSales,
                    syncStockRequests:syncStockRequests
}