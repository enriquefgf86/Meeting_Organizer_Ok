<template><v-container style="margin-top:830px">
  <v-container style='margin-top:30px' >
    <v-layout v-if="loading" >
      <v-flex xs12 class='primary--text'>
        <v-progress-circular indeterminate  :width='7' :size='70' color="primary">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12 sm12 lg12 class="center m-25"  >
        <v-card style="margin-top:-800px">
          <v-card-title>
            <h3 class="primary--text">Meet: {{selectedMeet.title}}</h3>
            <template v-if='userIsCreator'>
              <v-spacer></v-spacer>
              <edit-meet-detail v-bind:meetup='selectedMeet'></edit-meet-detail> 
            </template>
          </v-card-title>
        </v-card>
        <v-card class="mt-2 mb-2 ml-2">
          <v-img :src="selectedMeet.image_url"> </v-img>
        </v-card>
        <v-card-text>
          <div id='details'>
            {{ selectedMeet.date }}
            <div>{{ selectedMeet.location }}</div>
          </div>
          <div id='details'><edit-date-meets v-bind:meetup='selectedMeet'  v-if='userIsCreator'></edit-date-meets>
          </div>
          <div id='details'>
            {{ selectedMeet.description }}
          </div>
        </v-card-text>
        <v-card-actions>
          <registered-user v-bind:meetupId='selectedMeet.id' v-if='userIsRegistered&&!userIsCreator'></registered-user>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-container>

</v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },

  props: ["id"],

  computed: {
    ...mapGetters(["loadedOneSelectedMeet",'getUser','getLoader']),

    selectedMeet() {
      return this.$store.getters.loadedOneSelectedMeet(this.id);
    },
    userIsRegistered(){
      return this.$store.getters.getUser !==null&&  this.$store.getters.getUser!==undefined

    },
    userIsCreator(){
      if(!this.userIsRegistered){
        return false
      }
      return this.$store.getters.getUser.id===this.selectedMeet.idCreator 
    },
    loading(){
      return this.$store.getters.getLoader
    }
  }
};
</script>
<style>
#details{
  font-weight:bold;
  background-color:rgba(255, 255, 255, 0.5)
}
</style>
