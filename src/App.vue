<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <toolbar/>
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

<style>
</style>
