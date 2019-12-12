<template>
    <div class="q-pa-xl, row" dark>
        <div class="col-xs-12 col-md-6"> <apexchart  type="bar" :options="weeklyOptions" :series="weeklySeries"></apexchart></div>        
        <div class="col-xs-12 col-md-6"><apexchart  type="bar" :options="yearlyOptions" :series="yearlySeries"></apexchart></div>
        <div class="col-xs-12 col-md-6"><apexchart  type="donut" :options="donutOptions" :series="donutSeries"></apexchart></div>  
    </div>
</template>
<script>
var moment = require('moment');
export default {
    
    data(){
        return{
            daten:[{krank:false},{krank:true}],
            weeklyOptions:{
                
                colors:'#009688',
               
                xaxis:{
                    colors:'white',
                    categories:['Montag','Dienstag','Mittwoch','Donenrstag','Freitag'],
                    labels:{
                          style:{
                            colors:'white'
                        }
                    }
                },
                yaxis:{
                    labels:{
                          style:{
                            color:'white'
                        }
                    },
                    title:{
                        text:'Stunden',
                        style:{
                            color:'white',
                            fontSize:'16px'
                        }
                    }
                },
                title:{
                    text:'Arbeitsdauer in Stunden',
                    align:'center',
                    margin:30,                    
                    style:{
                        fontSize:'20px',
                        color:'white'
                    }
                },
                subtitle:{
                    text:'aktuelle Woche',
                    align:'center',
                    margin:25,
                    
                    style:{
                        fontSize:'16px',
                        color:'white'
                    }
                },
                tooltip:{
                    theme:'dark',                    
                },
                fill: {
                    opacity: 1
                },                              
            },
            weeklySeries:[{
                name:'Dauer',
                data:[]
            }],


            donutOptions:{
                title:{
                    text:'Tage krank',
                    align:'center',
                    margin:10,                    
                    style:{
                        fontSize:'20px',
                        color:'white'
                    }
                },
                 subtitle:{
                    text:'aktuelles Jahr',
                    align:'center',
                    margin:0,
                    
                    style:{
                        fontSize:'14x',
                        color:'white'
                    }
                },
                labels:['Anwesend','Krank'],
                colors:['#1A237E','#EF6C00']},
            donutSeries:[],
            yearlyOptions:{
                xaxis:{
                    colors:'white',
                    categories:['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
                    labels:{
                          style:{
                            colors:'white'
                        }
                        }
                    },                
                    tooltip:{
                            theme:'dark',                    
                        },
                    yaxis:{
                    labels:{
                          style:{
                            color:'white'
                        }
                    },
                    title:{
                        text:'Stunden',
                        style:{
                            color:'white',
                            fontSize:'16px'
                        }
                    }
                },title:{
                    text:'Arbeitsdauer in Stunden',
                    align:'center',
                    margin:30,                    
                    style:{
                        fontSize:'20px',
                        color:'white'
                    }
                },
                subtitle:{
                    text:'aktuelles Jahr',
                    align:'center',
                    margin:25,
                    
                    style:{
                        fontSize:'16px',
                        color:'white'
                    }
                },
                },
            yearlySeries:[{data:[45,46,47,48,49,50,51,52,53,53,55,56]}]
            
        }
    },
    created(){
        //this.constructData(this.data)        
        this.$store.dispatch('ACTION_QUERY_ITEMS')            
        
    },
    computed:{
        data(){
            return this.$store.getters.get_items
        }
    },
    watch:{
        data(val){
            this.constructTagekrank()
            this.constructData()
        }
    },   
    methods:{
        constructData(){
            moment.locale('de');
            // Datums der Woche ermitteln Mo-Freitag
            var datums = []            
            for(var i = 0;i<5;i++){
                datums.push(moment().weekday(i).format('DD.MM.YYYY')) 
            }
          
            var dauer = []
            //über die Datums iterieren
            datums.forEach(datum =>{
            //jeweiliges Datum ermitteln
                var array = this.data.filter(f=>f.datum === datum)
            //in Form bringen                
                var cache = []                
                    array.forEach(d=>{
                        d.daten.forEach(r => cache.push(r))})                                       
            //Sortieren, falls mehrere Einträge pro Datum
                    cache.sort(function(a,b){return a.beginn.slice(0,2) -b.beginn.slice(0,2)})
            //dauer berechnen und ins Array pushen        
                    if(cache.length === 0){
                       dauer.push(0) 
                    }
                    else if(cache.length ===1){                        
                        let start = moment(cache[0].beginn, "HH:mm")
                        let ende = moment(cache[0].ende, "HH:mm") 
                        let dif = moment.duration(ende.diff(start))
                        let minuten = dif.asMinutes()-cache[0].pause
                        let stunden = (minuten/60).toFixed(2)
                        if(isNaN(stunden)){
                            dauer.push(0)
                        }else{
                            dauer.push(stunden)
                        }                  
                    }else if(cache.length>1){
                        let anzahl = cache.length
                        let start = moment(cache[0].beginn, "HH:mm")
                        let ende = moment(cache[anzahl-1].ende, "HH:mm")
                        let pause = cache.reduce((sum,order)=>sum*1 +  order.pause*1,0) 
                        
                        let dif = moment.duration(ende.diff(start))
                        let minuten = dif.asMinutes()-pause
                        let stunden = (minuten/60).toFixed(2)
                        dauer.push(stunden)
                    }
                    this.weeklySeries= [{data:dauer}]
                                      
            }) 
                       
             
        },
        async constructTagekrank(){
            var AnzahlTage = this.data.length
            console.log('triggered')
            var tageKrank = this.data.filter(tag=>tag.krank === true)
            var tageGesund = this.data.filter(tag=>tag.krank === false)
            this.donutSeries= [tageGesund.length,tageKrank.length]
            
            }
        }
}
</script>