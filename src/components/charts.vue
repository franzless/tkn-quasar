<template>
    <div class="q-pa-xl">
       <apexchart width="700" type="bar" :options="chartOptions" :series="series"></apexchart> 
    </div>
</template>
<script>
export default {
    data(){
        return{
            chartOptions:{
                xaxis:{
                    categories:[]
                }
            },
            series:[{
                name:'Dauer',
                data:[]
            }]
        }
    },
    async mounted(){
        await this.$store.dispatch('QUERY_ITEMS')
        this.constructData(this.data)
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
                      
             
        }
    }
}
</script>