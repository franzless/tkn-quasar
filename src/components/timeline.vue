<template>
<div class="q-px-xl" >
    <q-timeline :layout="layout">           
        <q-timeline-entry  v-for="(item,index) in items" :key="index" :subtitle="item.datum" :side="index % 2 == 0 ? 'left' : 'right'">
            <q-card>
                <q-card-section>
                    <q-list dense>
                      <q-item v-for="(d,index) in item.daten" :key="index" clickable  @click="edit({datum:item.datum,...d})">                          
                          <q-item-section no-wrap side>
                              <q-icon size="sm" color="orange" name="schedule"></q-icon>                              
                          </q-item-section> 
                          <q-item-section side>
                              <div>{{d.beginn}} -   {{d.ende}}Uhr</div>
                              </q-item-section>                        
                          <q-item-section>
                              {{d.kommentar}}
                              
                          </q-item-section>                                                 
                        </q-item>                        
                  </q-list>
                </q-card-section>
                </q-card>                         
                  
        </q-timeline-entry>        
    
    </q-timeline>
    <neuer :dialog="dialog" title="Eintrag bearbeiten" icon="build" button="update"/>   
</div>

</template>
<script>
import neuer from '@/components/NeuerEintrag.vue'
export default {
    components:{neuer},
    data(){
        return{
            AMG:'../assets/AMGlogo.jpg',
            
        }
    },
    created(){
        this.$store.dispatch('QUERY_ITEMS')
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
        }
    },
    methods:{
        edit(data){
            this.$store.commit('SET_dialog_NEUER',true)
            console.log(data)
        }
    }}
</script>
    
