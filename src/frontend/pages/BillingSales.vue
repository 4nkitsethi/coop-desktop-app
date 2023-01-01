<template>

    <div id="tab5" class="tab-content Sales-Tab-Content">
        <div class="SalesPnl">
          <div class="TitelHr pt--2 pb--2 pl--2 pr--2">
            <h3>{{  'Ankit Sethi' }}</h3>
          </div>
          <div class="SalesInfoPnl pt--3 pb--2 pl--3 pr--3">
            <div class="SalesInfoBox DropShadow--Normal">
              <h5>{{  currency(isNaN(widgets.max) ? 0 : widgets.max)  }}</h5>
              <p>{{  $t('MaximumSalesPerDay') }}</p>
            </div>
            <div class="SalesInfoBox DropShadow--Normal">
              <h5>{{  currency(isNaN(widgets.avg) ? 0 : widgets.avg)  }}</h5>
              <p>{{  $t('AverageSalesPerDay') }}</p>
            </div>
            <div class="SalesInfoBox DropShadow--Normal">
              <h5>{{  currency(isNaN(widgets.total) ? 0 : widgets.total)  }}</h5>
              <p>{{  $t('TotalSalesPerDay') }}</p>
            </div>
          </div>
          <!--SalesInfoPnl-->
          
          <div class="SalesChatPnl" style=" min-height: 59vh;">
            <apexchart
                    height='100%'
                    type="bar"
                    :options="chartOptions"
                    :series="series"
                ></apexchart>
          </div>
          <!--SalesChatPnl--> 
          
        </div>
        <!--SalesPnl--> 
        
      </div>
</template>

<script>
import { currency } from '../../utils/currency';
import { head, isNaN } from "lodash"
    export default {
        data(){
            return {
                      isNaN,
                      currency,
                      widgets : {
                                  max:0,
                                  avg:0,
                                  total:0
                      },
                      series: [],
                      chartOptions: {
                                      plotOptions: {
                                                      bar: {
                                                              horizontal: false,
                                                              columnWidth: '55%',
                                                              endingShape: 'rounded'
                                                      },
                                      },
                                      dataLabels: {
                                                      enabled: false
                                      },
                                      stroke: {
                                                      show: true,
                                                      width: 2,
                                                      colors: ['transparent']
                                      },
                                      xaxis: {
                                                      categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec']
                                                      
                                      },
                                      yaxis: {
                                                      title: {
                                                                  text: '₹ (Ruppes)'
                                                      }
                                      },
                                      fill: {
                                                      opacity: 1
                                      },
                                      tooltip: {
                                                      y: {
                                                              formatter: function (val) {
                                                                                              return "₹ " + val
                                                              }
                                          }
                                      }
                                  },
            }
        },
        created(){
          this.axios
              .get("get/last12month/sale")
              .then( response =>{                
                let widget = head(response.data.widgets)                
                this.widgets.max = parseFloat(widget.max)
                this.widgets.avg = parseFloat(widget.avg)
                this.widgets.total = parseFloat(widget.total)

                console.log(widget)
                this.chartOptions = {
                                    ...this.chartOptions,
                                     ...{
                                          xaxis: {
                                                    categories: response.data.monthNames
                                            } 
                                        }
                };                
                this.series = [...response.data.dataset]                
              }).catch(err => {
                  this.$toast.error(err.message)
              })

        }
};
</script>