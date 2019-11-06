<template>
     <div>
       <q-dialog v-model="dialog" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="min-width: 450px">
        <q-card-section class="text-h6">
          <q-icon size="md" name="add_circle" color="primary"/>
          Neuer Eintrag
        </q-card-section>
        <q-card-section>    
        <q-form
      @submit="onSubmit"
      @reset="onReset" 
      greedy                 
      class="q-gutter-md"
    >
    <q-input filled v-model="DateFormatted" mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date today-btn v-model="datum" @input="() => $refs.qDateProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
      <template v-slot:before>
          <q-icon name="event" />
        </template>
    </q-input>

     <q-input filled v-model="beginn" mask="time" :rules="['time']" label="Beginn" now-btn>
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="beginn" />
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:before>
          <q-icon name="access_time" />
        </template>
      </q-input>

      <q-input filled v-model="ende" mask="time" :rules="['time']" label="Ende" now-btn>
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time
                v-model="ende"                
              />
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:before>
          <q-icon name="access_time" />
        </template>
      </q-input>

      <q-input filled v-model="pause" label="Pause" hint="in Minuten" :rules="[
          val => val !== null && val !== '' || 'Bitte Pause eintragen',
          val => val > 0 && val < 100 || 'Ungültiger Wert'
        ]">
        <template v-slot:before>
          <q-icon name="schedule" />
        </template>
        </q-input>

      <q-input
          v-model="comment"          
          filled
          autogrow
          label="Beschreibung/Kommentar"
        >
        <template v-slot:before>
          <q-icon name="subject" />
        </template>
      </q-input>
      
      

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Close"  color="primary" @click="close()" flat class="q-ml-sm" />
      </div>
    </q-form>
       </q-card-section>        
      </q-card>
    </q-dialog>    
         
            
   

  </div>
</template>
<script>
var moment = require('moment');
export default {
  props:['dialog'],
  data () {
    return {
      beginn:'',
      ende:'',
      pause:'',
      accept: false,
      datum:'',
      comment:'',
           
    }
  },  

  computed:{
        DateFormatted(){
            return this.datum ? moment(this.datum).format('DD.MM.YYYY') : ''
        },
        loading(){
            return this.$store.getters.get_loading
        },
        snack(){
        return this.$store.getters.get_snack    
        },
        
    },    
    methods:{
        close(){
             this.$store.commit('SET_dialog_NEUER',false)
        },       
        onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }  
          
}}
</script>