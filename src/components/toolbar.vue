<template>
  <div>
    <q-header elevated class="glossy">
      <q-toolbar class="bg-white glossy shadow-9">
        <q-btn
          icon="add_circle"
          color="primary"          
          round
          size="xl"
          class="absolute-center"
          @click="Set_dialog()"
        />         
        <q-toolbar-title class="text-primary">
          Bechtle
        </q-toolbar-title>
        <q-btn
          icon="timeline"
          color="primary"
          flat          
          round
          size="lg"          
          :to="'/timeline'"
        />
         <q-btn
          icon="bar_chart"
          color="primary"
          flat          
          round
          size="lg"          
          :to="'/charts'"
        />
      </q-toolbar>
    </q-header>
    <neuer :dialog="dialog"/>    
          
 </div>
</template>

<script>
import neuer from '@/components/NeuerEintrag.vue'
export default {
  components:{neuer},
  computed:{
    dialog(){
          return this.$store.getters.dialog_NEUER
        },    
  },
  methods:{
    Set_dialog(){
      this.$store.commit('SET_dialog_NEUER',true)
      this.$store.commit('SET_frame',{icon:'add_circle',title:'Neuer Eintrag',button:'Submit'})
    }
  }
  
}
</script>
