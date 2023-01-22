<template>
  <!--tab2 start-(Stocks Tab)-->
  <div id="tab2" class="tab-content Stocks-Tab-Content"> 
    <!--Left Section start-->
    <div class="SplitPnl SplitPnl-Middle Text--Center"> 
      <!--Top Pannel start-->
      <div class="TitelHr pt--2 pb--2 pl--2 pr--2">
        <h3>{{ $t('Stock') }}</h3>
        <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal Text--Dark-Green pl--2 pr--2 ml--18" id="NewRequest" @click.prevent="currentStockTab=false;newStockTab=true;">{{ $t('NewStockRequest') }}</a> 
        <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal Text--Red BackBtn pl--2 pr--2" id="NewRequestBack" @click.prevent="currentStockTab=true;newStockTab=false" v-if="newStockTab"><img src="../../assets/img/red_arrow.png" alt="" class="backIcon">{{ $t('ReturnBack') }}</a> 
      </div>
      <!--Top Pannel end--> 
      <!--Middle Pannel start-->
      <div class="MiddleGridPnl" id="RequestProductPnl" v-show="currentStockTab">
        <div class="Top-Breadcrumb pl--24 pr--24 pt--half pb--half"> <span class="pr--3">{{$t('CurrentStock')}}</span></div>
        <div class="Bottom-ProductPnl">
          <div class="MainProductPnl">                
            <!--Product Item-->
            <div class="Product-Item-Stock DropShadow--Normal Overflow--hidden ma--15" v-for="product in products" :key="product.id">
              <div class="Product-Type Product-Type-Top pa--1" >
                <div class="Type-Left " id="MainProduct"> <img :src="product.raw_image" class="logo mb--1">
                  <h4>{{ product.product_name }}</h4>
                </div>
                <div class="Flip-Box-shadow Main-Flip-Box" :ref="'product-panel-'+product.id" @click="this.$refs['product-panel-'+product.id][0].classList.toggle('Active')">
                  <div class="Main-chart" >
                    <CircleProgress
                      :percent="(product.association.stock/product.association.totalQtyPerDay) * 100"
                      :size="89"
                      :viewport="true"
                      :transition="2000"    
                      :fill-color="'#bf8a00'"
                      :border-width="3"
                      :border-bg-width="0"
                    />
                    <span class="percent">{{ scale(product.association.stock,product.digits) }} <small>{{ product.weight_unit  }}</small></span> 
                    <span class="Info-Text p--1">{{ $t('Stock') }}</span> 
                  </div>
                  <div class="Flip-chart" >
                    <CircleProgress
                      :percent="(product.association.totalQtySaleToday/product.association.totalQtyPerDay) * 100"
                      :size="89"
                      :viewport="true"
                      :transition="2000"    
                      :fill-color="'#bf8a00'"
                      :border-width="3"
                      :border-bg-width="0"
                    />
                    <span class="Info-Text p--1">{{ $t('Sale') }}</span> 
                    <span class="percent" >{{ currency(product.association.todaySales) }}</span> 
                  </div>
                </div>
            </div>
            <div class="Product-Type Product-Dtls Box--inline-shadow pa--1" id="MainProduct">                
              <template v-if="!isEmpty(product.rate)">                    
                <template v-if="(JSON.parse(product.rate.wholesale_rate).length > 0)">
                  <div class="Btm-Dtls-txt">                  
                    <p class="Text--Yellow Text--Uppercase">{{ $t('Wholesale') }}</p>
                    <p>{{ currency(head(JSON.parse(product.rate.wholesale_rate)).rate) }}</p>
                  </div>
                </template>
              </template>
              <!--  -->
              <div class="Btm-Dtls-txt">
                <p class="Text--Yellow Text--Uppercase">{{ $t('Retail') }}</p>
                <template v-if="isEmpty(product.rate)">
                    <p>{{ currency(0) }}</p>
                </template>
                <template v-else>
                    <p>{{ currency(product.rate.retail_rate) }}</p>                                    
                </template>
              </div>
            </div>
          </div>                
        </div>
        <!--PMainProductPnl--> 
      </div>
    </div>
    <div class="MiddleGridPnl" id="newStockPnl" v-show="newStockTab">
      <div class="Top-Breadcrumb pl--24 pr--24 pt--half pb--half"> <span class="pr--3">{{$t('NewStockRequest') }}</span> </div>
      <div class="Bottom-ProductPnl">
        <div class="MainProductPnl"  >                 
          <!--Product Item-->
          <div class="Product-Item-Stock DropShadow--Normal Overflow--hidden ma--15"  v-for="product in newStockRequest" :key="product.id">
            <div class="Product-Type Product-Type-Top pa--1" >
              <div class="Type-Left" id="MainProduct"> <img :src="product.raw_image" class="logo mb--1">
                <h4>{{ product.product_name }}</h4>
              </div>
              <div class="Flip-Box-shadow Main-Flip-Box" :ref="'new-product-panel-'+product.id" @click="this.$refs['new-product-panel-'+product.id][0].classList.toggle('Active')">
                <div class="Main-chart">
                  <CircleProgress
                      :percent="(product.association.stock/product.association.totalQtyPerDay) * 100"
                      :size="89"
                      :viewport="true"
                      :transition="2000"    
                      :fill-color="'#bf8a00'"
                      :border-width="3"
                      :border-bg-width="0"
                    />
                  <span class="percent">{{ scale(product.association.stock,product.digits) }} <small>{{ product.weight_unit  }}</small></span> 
                  <span class="Info-Text p--1">{{ $t('Stock') }}</span> 
                </div>
                <div class="Flip-chart">
                  <CircleProgress
                      :percent="(product.association.totalQtySaleToday/product.association.totalQtyPerDay) * 100"
                      :size="89"
                      :viewport="true"
                      :transition="2000"    
                      :fill-color="'#bf8a00'"
                      :border-width="3"
                      :border-bg-width="0"
                    />
                  <span class="Info-Text p--1">{{ $t('Sale') }}</span> 
                  <span class="percent" >{{ currency(product.association.todaySales) }}</span> 
                </div>
              </div>
            </div>
            <div class="Product-Type Product-Dtls Box--inline-shadow pa--1" >
              <div class="Inputflex">
                <input v-model="product.requested_stock" class="inputStyle Stock-Req-Field keyboard-numpad" :data-pattern="(product.mask == '#*')  ? 'number' : 'decimal'" placeholder="0" />
                <span class="currency">{{ product.weight_unit }}</span> </div>
            </div>
          </div>         
        </div>
        <!--newStock--> 
      </div>
    </div>
    <!--Middle Pannel end--> 
  
    <!--Bottom Pannel start-->
    <div class="BottomBtnPnl Text--Left pt--1 pb--1 pl--24 pr--24">
      <a href="javascript:void(0)" class="Btn-Normal DropShadow--Normal Stock-Request pl--2 pr--2" id="Stock-Request-Btn" v-if="newStockTab" @click.prevent="sendStockRequest">{{ $t('SendRequest') }}</a> 
    </div>
    <!--Bottom Pannel end--> 
  </div>
  <!--Left Section end--> 

  <!--Right Section start-->
  <div class="SplitPnl SplitPnl-Right">
    <div class="TabPnlNew">
      <div class="Bill-tabs">
        <div class="Cmn-Tabs-Nav pt--1 pb--1 pl--24 pr--24 height7 border--bottom" id="stock-tabs-nav"> 
          <a href="#bill-tab4" class="Tab-Btn-Normal DropShadow--Normal  mr--2" :class="{'DropShadow--Active Active--BG' : pendingStockTab }" @click.prevent="pendingStockTab=true;completedStockTab=false"> {{ $t('PendingStockRequest') }}</a> 
          <a href="#bill-tab5" class="Tab-Btn-Normal DropShadow--Normal " :class="{'DropShadow--Active Active--BG' : completedStockTab }"  @click.prevent="pendingStockTab=false;completedStockTab=true">{{ $t('CompletedStockRequest') }}</a> 
        </div>
        <div class="Bill-Tabs-box" id="stock-tabs-content">
          <div id="bill-tab4" class="stock-tab-content" v-if="pendingStockTab">
            <div class="Top-Breadcrumb pl--24 pr--24 pt--half pb--half border-top height32"> <span class="pr--3 Item-Name Text--Yellow">{{ $t('RequestOn') }}</span> </div>
            <div class="accordion" id="accordionExample">
              <div class="accordion-item"  v-for="(sr,index) in stockRequests" :key="sr.id">
                <h6 class="accordion-header" :id="'headingOne'+index" style="position: relative;">
                  <div class="accordion-button  collapsed"  data-bs-toggle="collapse" :data-bs-target="'#collapseOne'+index" aria-expanded="true" :aria-controls="'collapseOne'+index">
                    {{ parseDate(sr.date,'YYYY-MM-DD')}}
                  </div>
                  <button class="Btn-Normal DropShadow--Normal pl--24 pr--24  ReceivedStockBtn" v-if="sr.status == 'Sent'" @click="confirmReceiveStockRequest(sr)"><img src="../../assets/img/tick_w.png" alt=""> {{ $t('ReceivedStock') }}</button>
                </h6>
                <div :id="'collapseOne'+index" class="accordion-collapse collapse" :aria-labelledby="'headingOne'+index" data-bs-parent="#accordionExample">
                  <div class="accordion-body content pb--1">
                    <table class="table">
                      <thead>
                        <tr>
                          <th width="100">{{ $t('Item') }}</th>
                          <th  width="100">{{ $t('Quantity',2) }}</th>
                          <th width="130">{{ $t('SupplyRate') }}</th>
                          <th>{{ $t('Status') }}</th>
                          <th>&nbsp;</th>
                          <th width="100">{{ $t('Total') }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(rp,index) in sr.requested_products" :key="rp.id">
                          <td>{{ rp.product.product_name }} </td>
                          <td style="padding:0" v-if="['Requested','Approved'].includes(sr.status)">
                            <div class="Inputflex">
                              <template v-if="sr.editMode && rp.status != 'Cancelled'">
                                <input v-model="rp.stock_request"  @input="rp.total = parseFloat(rp.supply_rate) * parseFloat(rp.stock_request); rp.$save()"  class="inputStyle Edit-Qty Act  keyboard-numpad" :data-pattern="(rp.product.mask == '#*')  ? 'number' : 'decimal'" placeholder="0"  />
                                <span class="currency">{{ rp.product.weight_unit }}</span> 
                              </template>
                              <template v-else>
                                <span class="">{{ rp.stock_request +' '+ rp.product.weight_unit }}</span>
                              </template>                            
                            </div>
                          </td>
                          <td v-else>
                              {{  ((sr.type == 'Direct') ? rp.stock_sent : rp.stock_request) +' '+ rp.product.weight_unit }}
                          </td>
                          <!--<td><input class="Edit-Expense-Price inputStyle" name="" type="text" value="150" disabled="disabled"></td>-->
                          <td v-if="sr.status == 'Requested'">{{ $t('Awaiting') }}</td>
                          <td v-else>{{ currency(rp.supply_rate) }} / {{ rp.product.weight_unit }}</td>
                          <td>{{ rp.status }}</td>
                          <td><a href="javascript:void(0);" class="action-Btn-Normal Del-Tbl-Row DropShadow--Normal" v-if="rp.status == 'Requested'" @click="cancelledRequestItem(sr,rp)"><img src="../../assets/img/delete.svg" class="Icon" alt=""></a></td>
                          <td style="padding:0">{{ currency(rp.total) }}</td>
                        </tr>                            
                      </tbody>
                    </table>
                    
                    <div class="tableBtnGrp" v-if="sr.status == 'Requested'"> 
                      <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal pl--24 pr--24 Tex̣ṁt--Uppercase mr--1 Edit-Stock-Qty-Btn" v-if="!sr.editMode" @click="sr.editMode = true;sr.$save(); this.onscreenKeyboard()"> {{ $t('Edit') }}</a> 
                      <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal pl--24 pr--24 Text--Uppercase mr--1 Save-Stock-Qty-Btn" v-else @click="saveEditedStockRequest(sr);sr.$save();">{{ $t('Save') }}</a>                     
                      <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal pl--24 pr--24 Text--Red Text--Uppercase Cancel-Qty-Btn" v-if="sr.editMode"  @click="sr.editMode=false;sr.$save();">{{ $t('CANCEL') }}</a> 
                    </div>
                    <div  v-else-if="sr.status == 'Approved'" > 
                      <div class="tableBtnGrp2" style="justify-content: end !important;">   
                        <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal pl--24 pr--24 Text--Uppercase mr--1 Edit-Stock-Qty-Btn" v-if="!sr.editMode" @click="sr.editMode = true;sr.$save();" style="padding: 0px 4em;"> {{ $t('Edit') }}</a>                    
                        <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal pl--24 pr--24 Text--Uppercase mr--1 Save-Stock-Qty-Btn" v-else @click="saveEditedStockRequest(sr);sr.$save();"   style="padding: 0px 4em;">{{ $t('Save') }}</a>                     
                        <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal pl--24 pr--24 Text--Red Text--Uppercase Cancel-Qty-Btn" v-if="sr.editMode"  @click="sr.editMode=false;sr.$save();"  style="padding: 0px 4em;">{{ $t('CANCEL') }}</a> 
                      </div>
                      <div class="tableBtnGrp2"  v-if="!sr.editMode">                      
                        <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal pl--24 pr--24 Text--Dark-Green Text--Uppercase" @click.prevent="sr.payment_method = 'Pay When Stock Received'; updateStockRequestPayment(sr)">{{ $t('PayWhenStockReceived') }} </a> 
                        <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal pl--24 pr--24 Text--Red Text--Uppercase" @click.prevent="sr.payment_method = 'Pay After Sales Completed'; updateStockRequestPayment(sr)">{{ $t('PayAfterSalesCompleted') }}</a> 
                        <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal pl--24 pr--24 Text--Dark-Green Text--Uppercase payNow" @click.prevent="payOnline($event,sr)" >{{ $t('PayNow') }}</a>                        
                      </div>                                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="bill-tab5" class="stock-tab-content" v-if="completedStockTab">
            <div class="Top-Breadcrumb pl--24 pr--24 pt--half pb--half border-top height32"> <span class="pr--3 Item-Name Text--Yellow">{{ $t('Completed') }}</span> </div>
            <div class="accordion" id="accordionExample">
              <div class="accordion-item"  v-for="(request,index) in completedStockRequests" :key="request.id">
                <h6 class="accordion-header" :id="'headingOne'+index" style="position: relative;">
                  <div class="accordion-button  collapsed"  data-bs-toggle="collapse" :data-bs-target="'#collapseOne'+index" aria-expanded="true" :aria-controls="'collapseOne'+index">
                    {{ parseDate(request.date,'YYYY-MM-DD')}}
                  </div>
                  <button class="Btn-Normal DropShadow--Normal pl--24 pr--24  ReceivedStockBtn" v-if="request.status == 'Sent'" @click="confirmReceiveStockRequest(request)"><img src="../../assets/img/tick_w.png" alt=""> {{ $t('ReceivedStock') }}</button>
                </h6>
                <div :id="'collapseOne'+index" class="accordion-collapse collapse" :aria-labelledby="'headingOne'+index" data-bs-parent="#accordionExample">
                  <div class="accordion-body content pb--1">
                    <table class="table">
                      <thead>
                        <tr>
                          <th width="100">{{ $t('Item') }}</th>
                          <th  width="100">{{ $t('Quantity') }}</th>
                          <th width="130">{{ $t('SupplyRate') }}</th>
                          <th>{{ $t('Status') }}</th>
                          <th>&nbsp;</th>
                          <th width="100">{{ $t('Total') }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(product,index) in request.requested_products">
                          <td>{{ product.product.product_name }} </td>                        
                          <td >
                              {{ product.stock_request +' '+ product.product.weight_unit }}
                          </td>
                          <!--<td><input class="Edit-Expense-Price inputStyle" name="" type="text" value="150" disabled="disabled"></td>-->
                          <td v-if="request.status == 'Requested'">{{ $t('Awaiting') }}</td>
                          <td v-else>{{ currency(product.supply_rate) }} / {{ product.product.weight_unit }}</td>
                          <td>{{ request.status }}</td>
                          <td><a href="javascript:void(0);" class="action-Btn-Normal Del-Tbl-Row DropShadow--Normal" v-if="request.status == 'Requested'"><img src="../../assets/img/delete.svg" class="Icon" alt=""></a></td>
                          <td style="padding:0">{{ currency(product.total) }}</td>
                        </tr>                            
                      </tbody>
                    </table>                  
                    <div class="tableBtnGrp2" v-if="isEmpty(request.payment_id)" >                     
                      <a href="javascript:void(0);" class="Btn-Normal DropShadow--Normal pl--24 pr--24 Text--Dark-Green Text--Uppercase payNow" @click.prevent="payOnline($event,request)" >{{ $t('PAY Now') }}</a> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--TabPnl Part-->   
  </div>
  <!--Right Section end-->   
</div>
<!--tab2 end-(Stocks Tab)--> 

<!--===========Stock Modal Start===============-->
<div id="Stock-Modal" class="modal Cmn-Modal Stock-Info-Modal" v-if="receiveStockRequestFlag">
  <div class="Mainmodal">
    <div class="modal-content">
      <div class="modal-header" style="padding: 1em">
        <h4>{{ $t('ConfirmAndModifyStockDetail') }}  <br />
          <small style="color:green" v-if="!isEmpty(receiveStockRequest.payment_id)">( {{ $t('PAID') }} )</small>
          <small style="color:greenyellow" v-else>{{receiveStockRequest.payment_method }}</small>
        </h4>
        <span class="Modal-Close-Btn Btn-Normal DropShadow--Normal" @click="receiveStockRequestFlag = false">&times;</span> </div>
      <div class="modal-body p--2 pt--0" >
        <div class="CustomerBtmPnl">
          <table class="Cmn-table Customer-table Expense-Table">
            <thead>
              <tr class="d--block">
                <th class="pt--1 pr--24 pb--1 pl--24 Text--Yellow Width--6">#</th>
                <th class="pt--1 pr--24 pb--1 pl--24 Text--Yellow Width--19">{{ $t('Product') }}</th>
                <th class="pt--1 pr--24 pb--1 pl--24 Text--Yellow Width--15">{{ $t('Quantity') }}<br>
                  <span>({{ $t('RequestedStock') }})</span></th>
                <th class="pt--1 pr--24 pb--1 pl--24 Text--Yellow Width--15">{{ $t('SupplyRate') }}</th>
                <th class="pt--1 pr--24 pb--1 pl--24 Text--Yellow Width--15">{{ $t('Quantity') }}<br>
                  <span>({{ $t('StockLoaded') }})</span></th>
                <th class="pt--1 pr--24 pb--1 pl--24 Text--Yellow Width--15">{{ $t('Quantity') }}<br>
                  <span>({{ $t('StockUnloaded') }})</span></th>
                <th class="pt--1 pr--24 pb--1 pl--24 Text--Yellow Width--15">{{ $t('Total') }}</th>
              </tr>
            </thead>
            <tbody class="d--block">
              <tr class="d--block" v-for="req in receiveStockRequest.requested_products" :key="req.id">
                <td class="pt--1 pr--24 pb--1 pl--24 Width--6">{{ req.id }}</td>
                <td class="pt--1 pr--24 pb--1 pl--24 Width--19"><div class="DateField d--inline-block Text--Yellow no--border"><img src="../../assets/img/heen.png" alt=""> {{ req.product.product_name }}</div></td>
                <td class="pt--1 pr--24 pb--1 pl--24 Width--15">{{ req.stock_request +' '+ req.product.weight_unit }}</td>
                <td class="pt--1 pr--24 pb--1 pl--24 Width--15">{{ currency(req.supply_rate) +'/'+ req.product.weight_unit }}</td>
                <td class="pt--1 pr--24 pb--1 pl--24 Width--15">{{ req.stock_sent +' '+ req.product.weight_unit }}</td>
                <td class="pt--1 pr--24 pb--1 pl--24 Width--15">
                  <div class="Inputflex">
                    <input v-model="req.stock_received" :data-pattern="(req.product.mask == '#*')  ? 'number' : 'decimal'" class="inputStyle number-input-text keyboard-numpad" placeholder="0" />                    
                    <span class="currency">{{ req.product.weight_unit }}</span> 
                  </div>
                </td>
                <td class="pt--1 pr--24 pb--1 pl--24 Width--15">{{ currency(req.total) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d--flex justify--space-between">
          <div>
            <h6 class="pb--half">{{ $t('ActualPayment') }}</h6>
            <h3>{{ currency(receiveStockRequest.actual_payment) }}</h3>
          </div>
          <div> <a href="javascript:void(0)" class="Btn-Normal DropShadow--Normal pl--24 pr--24 Text--Uppercase widthAuto" @click.prevent="submitConfirmReceiveStockRequest">{{ $t('Yes,IconfirmReceiveStock') }}</a> </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!--===========Stock Modal End===============-->
</template>

<script lang="js">
import { currency, scale } from "../../utils/currency"
import { isEmpty , head, find, isNil, sumBy, forEach, assignIn, pick,omit} from "lodash"
import { mapActions, mapState } from "vuex";
import { Product, Customer, App, Sale, PurchaseHistory,StockRequests, StockRequestedProducts, Association } from "../../models"
import moment from "moment"


export default {
  data() {
    return {
        head,
        sumBy,
        isEmpty,
        currency,
        scale, 
        moment, 
        receiveStockRequestFlag:false,
        receiveStockRequest:null,              
        currentStockTab:true,
        newStockTab:false,
        pendingStockTab:true,
        completedStockTab:false,
        newStockRequest:[],        
    }
  },
  methods:{       
          cancelledRequestItem(sr,rp){
              if(!confirm("Please confirm before proceed !"))
                return false;
              rp.status = 'Cancelled';
              rp.$save();  
              //
              
              let checkAllItemCancelled = true;
              sr.requested_products.filter(item => {
                  if(['Requested','Approved','Processing','Sent','Received','Completed'].includes(item.status)){
                    checkAllItemCancelled = false;
                  }
              })

              if(checkAllItemCancelled){
                sr.status = 'Cancelled';
                sr.$save();
              }
              this.$toast.success('Stock Request Cancelled !')
          },  
          saveEditedStockRequest(sr){  
              sr.server_sync = false;  
              sr.client_sync = true;
              StockRequests.insertOrUpdate({ data : sr });
              sr.editMode=false;
              this.$toast.success('Stock Request Updated !')
          },
          confirmReceiveStockRequest(request){              
              this.receiveStockRequestFlag = true;
              this.receiveStockRequest = request;
              this.onscreenKeyboard()
          },
          submitConfirmReceiveStockRequest(){
              this.receiveStockRequest.requested_products.forEach( rp =>{                  
                  StockRequestedProducts.update({
                                                    where:rp.id,
                                                    data: {
                                                              "status" : "Received",
                                                              "stock_received" : parseFloat(rp.stock_received), 
                                                              "stock_wastage" : parseFloat(rp.stock_sent) - parseFloat(rp.stock_received)     
                                                    }
                  })
                  //
                  let assoc = Association.query().where("product_id",rp.product_id).first();
                  assoc.stock = parseFloat(assoc.stock) + parseFloat(rp.stock_received);
                  assoc.totalQtyPerDay = parseFloat(assoc.stock);
                  assoc.$save();
              })
              //
              StockRequests.update({
                                      where:this.receiveStockRequest.id,
                                      data:{
                                              "status":"Received", 
                                              "client_sync":true,
                                              "server_sync": false,
                                              "total_stock_sent" : sumBy(this.receiveStockRequest.requested_products, item => Number(item.stock_sent)),
                                              "total_stock_received" : sumBy(this.receiveStockRequest.requested_products, item => Number(item.stock_received)),
                                              "total_stock_wastage" : sumBy(this.receiveStockRequest.requested_products, item => Number(item.stock_wastage))
                                      }
              })

              
              
              this.$toast.success("Current Stock is updated successfully !");
              this.receiveStockRequestFlag = false; 
              this.$router.go()
          },
          payOnline(e,request){
              let notes = { "Stock Request" : this.shop.shop_name +" - #"+request.id };
              //
              Object.assign(this.razorPayOption,{
                                              "amount": request.actual_payment * 100,
                                              "notes": notes,
                                              "receipt":`coop-cps-${Math.round(new Date().getTime() / 1000)}`,
                                              "handler": response => {                      
                                                    request.payment_id = response.razorpay_payment_id
                                                    this.updateStockRequestPayment(request)
                                              }
                                          });
              console.log(this.razorPayOption)
              var rzp1 = new Razorpay(this.razorPayOption);
              rzp1.open();
          },
          updateStockRequestPayment(request){              
              if(isEmpty(request.payment_id)){
                if(!confirm("Please confirm before proceed !"))
                  return false;                
              }
              //
              request.status = "Processing"
              request.updated_at =  moment().format('YYYY-MM-DD HH:mm:ss');  
              request.client_sync=true;
              request.server_sync=false;
              request.$save();             
              request.requested_products.forEach(rp =>{ rp.status = request.status; rp.$save(); });
          },
          parseDate(date,format = 'YYYY-MM-DD'){
              return moment(date).format(format)
          },
          sendStockRequest(){
                        let newRequest = {  
                                          batch:moment().format('YYYYMMDDHmmss'),                
                                          date : moment().format("YYYY-MM-DD"),
                                          shop_id  : this.shop.id,                                               
                                          stock_requested_by : this.loggedUser.id,  
                                          status : "Requested",     
                                          data_sync : false,               
                                          type : "Request",   
                                          request_direction:"Client",                                                   
                                          requested_products:this.newStockRequest
                                                                  .map( nsr => { 
                                                                                  return { 
                                                                                            date : moment().format("YYYY-MM-DD"),        
                                                                                            product_id : nsr.id,                                                  
                                                                                            stock_request : nsr.requested_stock,  
                                                                                            current_stock : nsr.association.stock,  
                                                                                            status : "Requested"     
                                                                                  };
                                                                  })
                        }
                        StockRequests.insertOrUpdate({ data : newRequest })
                        // 
                        this.newStockRequest.filter( item => item.requested_stock = 0 );
                        this.currentStockTab = true 
                        this.newStockTab = false
                        this.$toast.success("Stock Request Sent");
          }
  },
  computed:{
              ...mapState('coop_local_base/apps', {             
                              loggedUser : (state) => state.loggedUser,
                              shop : (state) => state.shop,
                              razorPayOption: (state) => state.razorPayOption
              }),
              // 
              products () {
                            let products =  Product.query().with(['rate','association']).get()
                            return products
              },
              stockRequests(){
                    let stockRequests = StockRequests.query().where('status', (value) => value != 'Completed').with('requested_products.product').get()                    
                    return stockRequests;
              },
              completedStockRequests(){
                    let stockRequests = StockRequests.query().where('status', (value) => value == 'Completed').with('requested_products.product').get()
                    return stockRequests;
              }
  },
  mounted(){                           
            this.products.filter( item => {
                                              item.requested_stock = null;
                                              this.newStockRequest.push(pick(item,['id','weight_unit','wholesale_weight_range','stock','status','supplier_id','requested_stock','product_name','image','mask','association','digits']))
            })

            // 

            let stockRequestsMap = StockRequests.query().where('status', (value) => value != 'Completed').with('requested_products.product').get()
            stockRequestsMap.forEach( sr => { sr.notify = false; sr.$save(); })         
  }
}
</script>