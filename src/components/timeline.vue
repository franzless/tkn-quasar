<template>
<div class="q-px-xl" >
    <q-timeline layout="loose">           
        <q-timeline-entry  v-for="(item,index) in items" :key="index" :subtitle="item.datum" :side="index % 2 == 0 ? 'left' : 'right'">                         
                  <q-list bordered>
                      <q-item v-for="(d,index) in item.daten" :key="index" >                          
                          <q-item-section no-wrap side>
                              <q-icon size="xs" color="orange" name="schedule"></q-icon>                              
                          </q-item-section> 
                          <q-item-section side>
                              <div>{{d.beginn}} -   {{d.ende}}Uhr</div>
                              </q-item-section>                        
                          <q-item-section class="text-weight-bolder">
                              {{d.kommentar}}
                          </q-item-section>                         
                        </q-item>                        
                  </q-list>
        </q-timeline-entry>
        
         
             <!-- <v-card class="title" color="primary">                    
                    <v-card-text class="white">
                        <v-list dense>
                            <v-list-item v-for="(d,index) in item.daten" :key="index">
                                <v-list-item-icon class="text-left" >
                                    <v-icon color="orange">mdi-clock</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title class="subtitle-1">
                                    {{d.beginn}} -   {{d.ende}}Uhr
                                </v-list-item-title>
                                
                                <v-list-item-subtitle class="text-right">
                                {{ d.kommentar}}
                                </v-list-item-subtitle>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card> -->
       
    
    </q-timeline>
</div>

</template>
<script>
export default {
    data(){
        return{
            AMG:'../assets/AMGlogo.jpg'
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
        }
    }
    
}
</script>
    
