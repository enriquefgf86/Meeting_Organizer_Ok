<template>
  <v-container>
    <v-btn text class="primary ml-10" accent @click.stop="editDialogDate = true">Edit Date</v-btn>
    <v-dialog v-model="editDialogDate" absolute width="350px">
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title>Edit Meetup Date</v-card-title>
            </v-flex>
          </v-layout>

          <v-layout column wrap>
            <v-flex xs12 sm12 md12 xl12 lg12>
              <v-date-picker
                v-model="editDate"
                style="margin-left:0px;width:700px"
                class="mb-3"
                actions
              ></v-date-picker>
              <v-time-picker
                v-model="editTime"
                style="margin-left:0px;width:700px"
                class="mb-3"
                actions
                format="24hr"
              ></v-time-picker>

              <v-btn text class="primary ml-5" @click.native="editDialogDate = false">Close</v-btn>
              <v-btn text class="primary ml-5" @click.native="onSaveDate">Save</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
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
      editDialogDate: false,
      editDate: null,
      editTime: null
    };
  },
  methods: {
    ...mapActions(["updateMeetDetails"]),
    onSaveDate() {
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.editDate);
      const newTime = this.editTime;

      newDate.setDate(newDay);
      newDate.setUTCHours(newTime);

      this.editDialogDate = false;
      this.$store.dispatch("updateMeetDetails", {
        id: this.meetup.id,
        date: newDay.toDateString()+ " starting at " + "" + newTime
       
      });
    }
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
  }
};
</script>
