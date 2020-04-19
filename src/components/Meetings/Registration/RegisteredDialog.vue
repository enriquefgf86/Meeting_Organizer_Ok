<template>
  <v-container >
    <v-btn class='primary' accent @click.stop="registerDialog = true">
      {{ userIsRegistered ? "Unregister" : "Register" }}
    </v-btn>

    <v-dialog v-model="registerDialog" absolute width='500px'>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title v-if="userIsRegistered">
                Unregister of this Meet
              </v-card-title>
              <v-card-title v-else>
                Register on this Meet
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <v-text-field name="You can always change your decision in this meet" 
                label="You can always change your decision in this meet">
                </v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn text class="primary ml-5" @click="registerDialog = false"
                >Cancel
              </v-btn>
              <v-btn text class="primary ml-5" @click="onAgree">Confirm </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data(){
       return{
          registerDialog:false 
       }
  },  
  props: ["meetupId"],
  computed: {
    ...mapGetters([
      "suggestedLoadedMeets",
      "loadedAvailableMeets",
      "loadedOneSelectedMeet",
      "getUser",
      "getLoader"
    ]),
    userIsRegistered() {
      return this.$store.getters.getUser.registeredMeetsIds.findIndex(meetupId => {
          return meetupId === this.meetupId;
        }) >= 0
    }
  },
  methods:{...mapActions(['registerUserforMeet','unRegisterUserforMeet']),
      onAgree(){
            if(this.userIsRegistered){
                this.$store.dispatch('unRegisterUserforMeet',this.meetupId)
            }
            else{
                this.$store.dispatch('registerUserforMeet',this.meetupId)
            }
      }
  }
};
</script>
