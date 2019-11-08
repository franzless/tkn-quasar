<template>
     <div>
       <q-dialog v-model="dialog" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="min-width: 450px">
        <q-card-section class="text-h6">
          <q-icon size="md" :name="icon" color="primary"/>
          {{title}}
        </q-card-section>
        <q-card-section>    
        <q-form
          ref="myForm"
          @submit="onSubmit"
          @reset="onReset" 
          greedy                 
          class="q-gutter-md"
    >
    <q-input filled v-model="DateFormatted" label="Datum" :rules="[
          val => val !== null && val !== '' || 'Bitte Datum eintragen']">
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
          val => val >= 0 && val < 100 || 'Ungültiger Wert'
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
        <q-btn :label="button" type="submit" color="primary"/>
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
  props:['dialog','title','button','icon'],
  data () {
    return {
      beginn:'',
      ende:'',
      pause:'',      
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
             this.onReset()
        },       
        onSubmit () {
          var unix = moment(this.datum, "YYYY/MM/DD").unix()
          this.$refs.myForm.validate().then(success => {
            if (success) {                            
            this.$store.dispatch('SET_NEUER_EINTRAG',{datum:this.DateFormatted,unix:unix,UID:'u66WmdRu57bAdn4nTWg9bvCPdcZ2',daten:{pause:this.pause,kommentar:this.comment,beginn:this.beginn,ende:this.ende}})
              this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Submitted'
              })}
            else {
               this.$q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: 'You need to accept the license and terms first'
        })}
        })},

        onReset () {
          this.datum = ''
          this.beginn = ''
          this.pause = null
          this.ende = '',
          this.comment=''
        }  
          
}}
</script>