<template>
  <v-container  >
    <v-btn fab accent @click.stop="editDialog = true">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    
    <v-dialog v-model="editDialog" absolute width="350px">
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title>
                Edit Meetup Details
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                  name="title"
                  v-model="editedTitle"
                  label="title"
                  id="title"
                  required
                ></v-text-field>
                <v-text-field
                  name="location"
                  label="location"
                  id="location"
                  v-model="editedLocation"
                  required
                ></v-text-field>
                <v-text-field
                  name="description"
                  label="description"
                  id="description"
                  v-model="editedDescription"
                  required
                ></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn text class="primary ml-5" @click="editDialog = false"
                >Close
              </v-btn>
              <v-btn text class="primary ml-5" @click="onSave">Save </v-btn>
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
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editedLocation: this.meetup.location,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
      editDialogDate: false,
      editDate:null

    };
  },
  methods: {
    ...mapActions(["updateMeetDetails"]),
    onSave() {
      if (
        this.editedLocation.trim() === "" ||
        this.editedTitle.trim() === "" ||
        this.editedDescription.trim() === ""
      ) {
        return alert("fill all form to submit changes ");
      }
      this.editDialog = false;
      this.$store.dispatch("updateMeetDetails", {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription,
        location: this.editedLocation
      });
    },
    // onSaveDate(){
    //       const newDate=new Date(this.meetup.date)
    //       const newDay=new Date(this.editDate).getUTCDate()
    //       const newMonth=new Date(this.editDate).getUTCMonth()
    //       const newYear=new Date(this.editDate).getUTCFullYear()

    //       newDate.setUTCDate(newDay)
    //       newDate.setUTCMonth(newMonth)
    //       newDate.setFullYear(newYear)
    //        this.editDialogDate = false;
    //       this.$store.dispatch("updateMeetDetails", {
    //         id: this.meetup.id,
    //         date: newDate,
    //       });
          
    // }
  },
  computed: {
    ...mapGetters([
      "suggestedLoadedMeets",
      "loadedAvailableMeets",
      "loadedOneSelectedMeet",
      "getUser",
      "getLoader"
    ]),
    loading() {
      return this.$store.getters.getLoader;
    }
  },
//   created(){
//       this.editDate=new Date(this.meetup.date)
//   }
};
</script>
