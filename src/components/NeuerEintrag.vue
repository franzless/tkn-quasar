<template>
     <div>
       <q-dialog v-model="dialog" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="min-width: 450px">
        <q-card-section class="text-h6">
          <q-toolbar class="bg-primary">
            <q-icon size="sm" :name="frame.icon" color="secondary"/>
            <q-toolbar-title>
              {{frame.title}}
            </q-toolbar-title>
          </q-toolbar>          
          
        </q-card-section>
        <q-card-section>           
        <q-form          
          ref="myForm"
          @submit="onSubmit"
          @reset="onReset" 
          greedy                 
          class="q-gutter-md"
    >
    <q-toggle v-model="neu.krank" icon="airline_seat_flat" label="Krank" />
    <q-input filled v-model="DateFormatted" label="Datum" :rules="[
          val => val !== null && val !== '' || 'Bitte Datum eintragen']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date today-btn v-model="neu.datum" @input="() => $refs.qDateProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
      <template v-slot:before>
          <q-icon name="event" />
        </template>
    </q-input>
    <div v-if="neu.krank==false">    
    

     <q-input filled v-model="neu.beginn" mask="time" :rules="['time']" label="Beginn" now-btn>
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="neu.beginn" />
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:before>
          <q-icon name="access_time" />
        </template>
      </q-input>

      <q-input filled v-model="neu.ende" mask="time" :rules="['time']" label="Ende" now-btn>
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time
                v-model="neu.ende"                
              />
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:before>
          <q-icon name="access_time" />
        </template>
      </q-input>

      <q-input filled v-model="neu.pause" label="Pause" hint="in Minuten" :rules="[
          val => val !== null && val !== '' || 'Bitte Pause eintragen',
          val => val >= 0 && val < 100 || 'Ungültiger Wert'
        ]">
        <template v-slot:before>
          <q-icon name="schedule" />
        </template>
        </q-input>
    </div> 
      <q-input
          v-model="neu.kommentar"          
          filled
          autogrow
          label="Beschreibung/Kommentar"
        >
        <template v-slot:before>
          <q-icon name="subject" />
        </template>
      </q-input>
      
      

      <div>
        <q-btn :label="frame.button" type="submit" color="primary"/>
        <q-btn label="Close"  color="primary" @click="close()" flat class="q-ml-sm" />
        <q-btn v-if="frame.title == 'Eintrag bearbeiten'" label="Delete" color="red" class="q-ml-sm" @click="del()"/>        
      </div>
    </q-form>
       </q-card-section>        
      </q-card>
    </q-dialog>
    <q-dialog v-model="spinner" persistent class="fullscreen">
      <q-card>
        <q-spinner-gears          
          color="primary"
          size="20em"
        />          
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
      spinner:false,      
    }
  }, 
  computed:{
        DateFormatted(){
            return this.neu.datum ? moment(this.neu.datum).format('DD.MM.YYYY') : ''
        },
        neu:{
            set(data){              
              this.$store.commit('SET_neu',data)
        },
            get(){
              return this.$store.getters.neu
        }},
        frame(){
          return this.$store.getters.frame
        } 
        
    },    
    methods:{
        close(){
             this.$store.commit('SET_dialog_NEUER',false)
             this.onReset()
        },       
        onSubmit () {
          var action = ''
          var unix = moment(this.neu.datum, "YYYY/MM/DD").unix()
          this.spinner =true          
          this.$refs.myForm.validate().then(success => {
            if (success) {
              if(this.frame.title === 'Neuer Eintrag'){
                this.$store.commit('SET_funktion','add')                
                action = this.$store.dispatch('ACTION_EINTRAG',{datum:this.DateFormatted,krank:this.neu.krank,unix:unix,UID:'u66WmdRu57bAdn4nTWg9bvCPdcZ2',daten:{pause:this.neu.pause,kommentar:this.neu.kommentar,beginn:this.neu.beginn,ende:this.neu.ende}})
              }
              else if(this.frame.title  === 'Eintrag bearbeiten'){
                this.$store.commit('SET_funktion','edit')                
                action = this.$store.dispatch('ACTION_EINTRAG',{id:this.neu.id,krank:this.neu.krank,datum:this.DateFormatted,unix:unix,UID:'u66WmdRu57bAdn4nTWg9bvCPdcZ2',daten:{pause:this.neu.pause,kommentar:this.neu.kommentar,beginn:this.neu.beginn,ende:this.neu.ende}})
              }                            
            action.then(result=>{
                this.spinner = false
                this.$q.notify({
                color: 'green',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Übertragung erfolgreich'
              })}).catch(err=>{
                this.spinner = false
                this.$q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: err
              })})
              }
            else {
              this.spinner = false
               this.$q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: 'Alle Felder müssen ausgefüllt sein'
        })}
        })},

        onReset () {
          this.neu = {krank:false}
        },
        del(){          
          var unix = moment(this.neu.datum, "YYYY/MM/DD").unix()
          this.spinner =true 
          this.$store.commit('SET_funktion','del')
          this.$store.dispatch('ACTION_EINTRAG',{id:this.neu.id,krank:this.neu.krank,datum:this.DateFormatted,unix:unix,UID:'u66WmdRu57bAdn4nTWg9bvCPdcZ2',daten:{pause:this.neu.pause,kommentar:this.neu.kommentar,beginn:this.neu.beginn,ende:this.neu.ende}})
          .then(result=>{
                this.spinner = false
                this.$q.notify({
                color: 'green',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Übertragung erfolgreich'
              })}).catch(err=>{
                this.spinner = false
                this.$q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: err
              })})
             
        }  
          
}}
</script>