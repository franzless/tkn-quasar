<template>
    <div class="q-pa-xl, row" dark>
        <!-- <div class="col-xs-12 col-md-6"> <apexchart  type="bar" :options="chartOptions" :series="series"></apexchart></div> -->
        <div class="col-xs-12 col-md-6"><apexchart  type=radialBar :options="radialOptions" :series="radialseries"></apexchart></div>
           
    </div>
</template>
<script>
export default {
    
    data(){
        return{
            daten:[{krank:false},{krank:true}],
            chartOptions:{
                xaxis:{
                    categories:[]
                }
            },
            series:[{
                name:'Dauer',
                data:[]
            }],
            radialOptions:{                
                 plotOptions: {
            radialBar: {
              hollow: {
                size: '70%',
              }
            },
          },
          labels:[]
            },
            radialseries:[]
        }
    },
    created(){
        this.constructData(this.data)        
        this.constructTagekrank()            
        
    },
    computed:{
        data(){
            return this.$store.getters.get_items
        }
    },
    watch:{
        data(val){
            this.constructData(val)
        }
                
    },
    methods:{
        constructData(raw){            
            var datums= raw.map(m=>m.datum).filter((value, index, self)=>{return self.indexOf(value) === index;})
            this.chartOptions = {xaxis:{
                categories:datums
            }}
            datums.forEach(d => this.chartOptions.xaxis.categories.push(d) )
            var dauer = []
            datums.forEach(datum =>{
                var data = raw.filter(f=>f.datum === datum)
                var cache = []
                    data.forEach(d=>cache.push(d.daten))                    
                    //Sortieren, falls mehrere Einträge pro Datum
                    cache.sort(function(a,b){return a.beginn.slice(0,2) -b.beginn.slice(0,2)})
                    var length = cache[0].length -1                    
                    var pause = cache[0].reduce((sum,order)=>sum*1 +  order.pause*1,0)                    
                    
                    //console.log(cache[0][length].ende.slice(0,2)-cache[0][0].beginn.slice(0,2))
                                                    
                    this.series[0].data.push((cache[0][length].ende.slice(0,2)-cache[0][0].beginn.slice(0,2))-pause/60)                    
            })
                      
             
        },
        async constructTagekrank(){
            
            await this.$store.dispatch('ACTION_QUERY_ITEMS')
            
            var AnzahlTage = this.data.length
            //console.log(this.data)
            var Tagekrank = this.data.filter(tag=>tag.krank === true)
            this.radialseries = []            
            this.radialseries.push(Tagekrank.length/AnzahlTage)
            this.radialOptions = {plotOptions: {
                                        radialBar: {
                                        hollow: {
                                            size: '70%',
                                        }
                                        },
                                    },
                                    labels:['Tage krank 2019: '+Tagekrank.length]}
                                    }
                                }
}
</script>