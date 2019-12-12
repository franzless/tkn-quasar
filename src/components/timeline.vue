<template>
<div class="q-px-xl" >
    <q-timeline :layout="layout">                
        <q-timeline-entry v-for="(item,index) in items" icon="cloud_done" :key="index" class="text-subtitle1" :title="item.datum" :side="index % 2 == 0 ? 'left' : 'right'">
            <q-card>
                <q-card-section>
                    <q-list dense>
                      <q-item v-for="(d,index) in item.daten" :key="index" clickable  @click="edit({datum:item.datum,...d,id:item.id})">
                          
                            <q-item-section no-wrap side v-if="item.krank === false">
                                <q-icon size="sm" color="orange" name="schedule"></q-icon>                              
                            </q-item-section> 
                            <q-item-section side v-if="item.krank === false">
                                <div>{{d.beginn}} - {{d.ende}}Uhr</div>
                            </q-item-section>                        
                            <q-item-section class="text-grey" v-if="item.krank === false">
                                {{d.kommentar}}                              
                            </q-item-section> 
                          
                              <q-item-section no-wrap side v-if="item.krank === true">
                                  <q-icon size="sm" name="local_hotel" color="lime-10"></q-icon>
                              </q-item-section>
                               <q-item-section class="text-grey" v-if="item.krank === true">
                                {{d.kommentar}}                              
                               </q-item-section> 
                                                   
                                                               
                        </q-item>                        
                  </q-list>
                </q-card-section>
                </q-card>                         
                  
        </q-timeline-entry>        
    
    </q-timeline>
    <neuer :dialog="dialog"/>   
</div>

</template>
<script>
var moment = require('moment');
import neuer from '@/components/NeuerEintrag.vue'
export default {
    components:{neuer},
    data(){
        return{
            AMG:'../assets/AMGlogo.jpg',
            title:'Eintrag bearbeiten'
        }
    },
    created(){
        this.$store.dispatch('ACTION_QUERY_ITEMS')       
    },
    computed:{
        items(){
            return this.$store.getters.get_items
        },
        switchSide(side){
            if(side/2 == 0){
                return 'left'
            }else{
                return 'right'
            }
        },
        layout () {
           return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
        },
        dialog(){
          return this.$store.getters.dialog_NEUER
        },
        
    },
    methods:{
        edit(data){            
            this.$store.commit('SET_frame',{icon:'build',title:'Eintrag bearbeiten',button:'Update'})
            this.$store.commit('SET_dialog_NEUER',true)            
            this.$store.commit('SET_neu',{...data,datum:this.DateFormatted(data.datum)})
        },
        DateFormatted(date){ 
            return date ? moment(date,'DD.MM.YYYY').format('YYYY/MM/DD') : ''
        }, 
    }}
</script>
    
