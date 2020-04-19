import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib';
import * as firebase from 'firebase'
import Alerts from './components/sharedTags/Alert.vue'
import EditMeetUps from './components/Meetings/Edit/EditMeetDetails.vue'
import EditMeetUpsDate from './components/Meetings/Edit/EditMeetsDetailsDate.vue'
import EditMeetDetailsTime from './components/Meetings/Edit/EditMeetDetailsTime.vue'
import RegisteredUsersMeet from './components/Meetings/Registration/RegisteredDialog.vue'
// import DateFilter from './filters/date'


Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.component('alert-tag',Alerts)
Vue.component('edit-meet-detail',EditMeetUps)
Vue.component('edit-date-meets',EditMeetUpsDate)
Vue.component('registered-user',RegisteredUsersMeet)
Vue.component('edit-time-meets',EditMeetDetailsTime)

// Vue.filter('dateFilter',DateFilter)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: "AIzaSyBFqGzqVYCzebBHFj7KoszVIUhyUWXTLMw",
    authDomain: "meeting-scheduler-9cee1.firebaseapp.com",
    databaseURL: "https://meeting-scheduler-9cee1.firebaseio.com",
    projectId: "meeting-scheduler-9cee1",
    storageBucket: 'gs://meeting-scheduler-9cee1.appspot.com'//meeting-scheduler-9cee1.appspot.com,
    })
    this.$store.dispatch("loadAllMeetUps")
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.$store.dispatch( 'keepUserSigned',user)
        this.$store.dispatch('keepUserSignedData')
      }
    })
    this.$store.dispatch("loadAllMeetUps" )
  }
}).$mount('#app')


    