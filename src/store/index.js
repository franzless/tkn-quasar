import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/db/firebaseinit'

Vue.use(Vuex)
const docRef = db.collection("TKN")

export default new Vuex.Store({
  state: {
    dialog_neuer:false,
    data:[],
    loading:false,    
    items:[],
    frame:{},
    neu:{krank:false,beginn:'',ende:'',pause:'',datum:'',kommentar:''},
    funktion:''
  },
  mutations: {
    SET_dialog_NEUER:(state,payload)=>{
      state.dialog_neuer = payload
    },
    SET_DATA:(state,payload)=>{
      state.data = payload      
    },
    SET_LOADING:(state,payload)=>{
      state.loading = payload
    },    
    SET_ITEMS:(state,payload)=>{            
      state.items = payload        
      },
    SET_frame:(state,payload)=>{
    state.frame = payload
   },
   SET_neu:(state,payload)=>{
     state.neu = payload
   },
   SET_funktion:(state,payload)=>{
     state.funktion = payload
   }
  },
  getters:{
    dialog_NEUER:state=>{
      return state.dialog_neuer
    },
    get_loading:state=>{
      return state.loading
    },   
    get_items:state=>{
      return state.items
    },
    frame:state=>{
      return state.frame
    },
    neu:state=>{
      return state.neu
    },
    funktion:state=>{
      return state.funktion
    }
  },
  actions: {      
    ACTION_EINTRAG:async(context,payload)=>{

      var funktion = context.getters.funktion
      if(funktion === 'add'){
        funktion = docRef.add(payload)
      }
      else if(funktion ==='del'){
        funktion = docRef.doc(payload.id).delete()
      }
      else{
         funktion= docRef.doc(payload.id).update(payload)
        }


      return new Promise((resolve,reject)=>{      
        context.commit('SET_LOADING',true)
          funktion.then(response=>{
                             
                resolve()
                context.commit('SET_dialog_NEUER',false)
                context.commit('SET_LOADING',false)
             
          }) 
          .catch(err=>{
            reject(err)        
          })
        setTimeout(()=>{
          context.commit('SET_LOADING',false)          
          reject('Datenbank nicht erreichbar => Timeout')
        },5000)
        }) 

    },
      
  /*      docRef.where("unix","==","1570744800").get().then(doc=>{
        if(doc.exists){          
          var daten_merge = []
          doc.data().forEach(x=>{daten_merge.push(x.daten)})
          daten_merge.push(payload.daten)
           var merge = {
            datum:payload.datum,unix:payload.unix,daten_merge
          }
          docRef.doc(doc.id).set(merge).then(response=>{
            console.log(response)        
           context.commit('SET_dialog_NEUER',false)
           context.commit('SET_LOADING',false)
           context.commit('SET_SNACK',{snackColor:'success',status:true,snackText:'Erfolg'})
          })
          .catch(err=>{
            context.commit('SET_SNACK',{Snackcolor:'error',status:true,snackText:err})
            console.log(err)})         
      
        }else{
          console.log('ex nicht')
          docRef.add(payload).then(response=>{
            console.log(response)        
           context.commit('SET_dialog_NEUER',false)
           context.commit('SET_LOADING',false)
           context.commit('SET_SNACK',{snackColor:'success',status:true,snackText:'Erfolg'})
          })
          .catch(err=>{
            context.commit('SET_SNACK',{Snackcolor:'error',status:true,snackText:err})
            console.log(err)})
        }
      })  */
        
     
    ACTION_QUERY_ITEMS:async(context)=>{
      
                        
        await docRef.where('UID','==','u66WmdRu57bAdn4nTWg9bvCPdcZ2').orderBy("unix","desc").onSnapshot(snap=>{
          var fetched = []
          var constructed= []  
        snap.forEach(doc=>{                   
           fetched.push({...doc.data(),id:doc.id})
        })
        //Alle vorhandenen Datums in ein array schreiben
        var dates = fetched.map(m=>m.datum).filter((value, index, self)=>{return self.indexOf(value) === index;})
      //über jedes Datum iterrieren     
      for(var x = 0;x<dates.length;x++){
        //alle Objekte mit dem entsprechenden Datum in Variable Cache schreiben
        var cache = []
        cache = fetched.filter(f => f.datum === dates[x])
        //benötigte Datenstruktur zusammenbauen => var daten
        var daten = []        
        cache.forEach(c=>daten.push(c.daten))
        //Sortieren, falls mehrere Einträge pro Datum
        daten.sort(function(a,b){return a.beginn.slice(0,2) -b.beginn.slice(0,2) })
        //fertiges Objekt pushen               
        var result = {datum:cache[0].datum,unix:cache[0].unix,UID:cache[0].UID,daten,id:cache[0].id,krank:cache[0].krank}        
        constructed.push(result)
    } context.commit('SET_ITEMS',constructed)})        
       
        
    },    
  },
  modules: {
  }
})
