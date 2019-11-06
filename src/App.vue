<template>
  <q-layout view="hHh lpr lff">
    <toolbar/>
    <q-page-container>      
         
          <router-view />          
        
    </q-page-container>
  
  </q-layout>
</template>

<script>
import toolbar from './components/toolbar.vue'

export default {  

  components: {
    toolbar
  },
  
}
</script>

