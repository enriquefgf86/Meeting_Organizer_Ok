<template>
  <v-container>
    <v-container>
      <v-container style='margin-left:20px'>
            <v-layout row wrap align-center justify-center>
              <v-flex xs6 align-center class="mr-12 d-flex justify-center">
                <h2>Creating Meeting</h2>
              </v-flex>
            </v-layout>

            <v-layout row wrap align-center justify-center>
              <v-flex xs12 sm12 md6 lg6 xl6 align-center class="mr-12 d-flex justify-center">
                <v-form @submit.prevent="creatingMeets">
                  <v-layout row wrap>
                    <v-layout column>
                      <v-layout row>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                          <v-text-field
                            name="title"
                            label="title"
                            id="title"
                            v-model="title"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                          <v-text-field
                            name="location"
                            label="location"
                            id="location"
                            v-model="location"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                          <v-btn @click="selectFile" class="primary">UpLoad Image (optional)</v-btn>
                          <input
                            style="display:none"
                            type="file"
                            ref="fileInput"
                            accept="image/*"
                            @change="filePicked"
                          />
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                          <v-container>
                            <img :src="image_url" height="100" />
                          </v-container>
                        </v-flex>
                      </v-layout>

                      <!-- <v-layout row>
                    <v-flex xs10 sm10 md11 lg12 xl12>
                      <v-text-field
                        name="video url"
                        label="video url (optional)"
                        id="video url"
                        v-model="video_url"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs10 sm10 md11 lg12 xl12>
                      <v-container>
                        <video :src="video_url" autoplay="autoplay" loop height="100" />
                      </v-container>
                    </v-flex>
                      </v-layout>-->

                      <v-layout row>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                          <v-text-field
                            name="description"
                            label="description"
                            id="description"
                            v-model="description"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-layout>
                    <v-layout column>
                      <div class="re">
                        <v-layout id="reloj" row width="100">
                          <v-flex xs12 sm12 md12 lg12 xl12 offset-sm6>
                            <div class="time">
                              <v-date-picker
                                id="raketa"
                                v-model="datePicker"
                               
                                class="mb-3"
                              ></v-date-picker>
                              <span>{{ datePicker }}</span>
                            </div>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="re1">
                        <v-layout row id="reloj1" width="100">
                          <v-flex xs12 sm12 md12 lg12 xl12 offset-sm6>
                            <div class="time1">
                              <v-time-picker v-model="timePicker" ></v-time-picker>
                              <span>{{ timePicker }}</span>
                            </div>
                          </v-flex>
                        </v-layout>
                      </div>
                    </v-layout>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12 md12 sm6>
                      <v-btn type="submit" class="primary" :disabled="!validator">Create MeetUp</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-flex>
            </v-layout>
      </v-container>
    </v-container>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
// import { mapGetters } from "vuex";
// import { mapState } from "vuex";
export default {
  name: "createMeetPage",
  data() {
    return {
      title: "",
      description: "",
      location: "",
      image_url: "",
      // video_url: "",
      datePicker: "",
      timePicker: "",
      image: null
    };
  },
  computed: {
    validator() {
      return (
        this.title !== "" &&
        this.description !== "" &&
        this.location !== "" &&
        this.datePicker !== "" &&
        this.timePicker !== ""
      );
    }
  },
  methods: {
    ...mapActions(["createMeet"]),
    creatingMeets() {
      if (!this.validator) {
        return;
      }
      if (!this.image) {
        return;
      }
      const createMeetUp = {
        title: this.title,
        description: this.description,
        location: this.location,
        // video_url: this.video_url,
        // image_url: this.image_url,//we are up;loading the image no needed of string url
        image: this.image,
        date: this.datePicker + " starting at " + "" + this.timePicker
      };
      this.$store.dispatch("createMeet", createMeetUp);
      this.$router.push("/Meet");
    },
    selectFile() {
      this.$refs.fileInput.click(); //haciendo referencia al input que selecciona la imagen
    },

    filePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("wrong file please charge a proper one ");
      } ///se establece condicion con last index para saber si es una imagen o ono
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.image_url = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>
<style>
/* .dtContainer{
  display:flex;
  flex-direction:row;
  width:700px;
  justify-content:space-around; 
  align-content: space-between;
} 
.timeContainer{
  display: flex;
  align-content: center;
  width:900px;
  margin-left:-920px */
/* } */
/* @media screen and  (min-device-width: 100px) {
 .re{
  position:absolute;
  margin-top: -690px;
  margin-left:300px;
  width:400px;
}
.re1{
  position:absolute;
  margin-top: -690px;
  margin-left:350px;
} 
} */
</style>
