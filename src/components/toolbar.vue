<template>
  <div>
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          icon="add_circle"
          flat          
          round
          size="xl"
          class="absolute-center"
          @click.native="Set_dialog()"
        />         
        <q-toolbar-title>
          Bechtle
        </q-toolbar-title>
        <q-btn
          icon="timeline"
          flat          
          round
          size="lg"          
          :to="'/timeline'"
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
  data(){
    return{
      
    }
  },
  computed:{
    dialog(){
          return this.$store.getters.dialog_NEUER
        }
  },
  methods:{
    Set_dialog(){
      this.$store.commit('SET_dialog_NEUER',true)
    }
  }
  
}
</script>
