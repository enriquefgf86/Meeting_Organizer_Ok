<template>
  <v-container>
    <v-container id="top" >
      <v-layout>
        <v-flex xs12 class="primary--text">
          <v-progress-circular indeterminate v-if="loading" :width="7" :size="70" color="primary"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout class="mb-6" row wrap>
        <v-flex
          6
          id="button1"
          xs12
          sm12
          md6
          lg
          xl6
          class="mb-2 d-flex justify-center text-xs-center text-sm-center"
        >
          <v-btn class="blue darken-1 white--text" large rounded router to="/Meet">Exploring MeetUps</v-btn>
        </v-flex>
        <v-flex
          xs12
          sm6
          id="button2"
          class="mb-2 d-flex justify-center text-xs-center text-sm-center"
        >
          <v-btn
            rounded
            :disabled="userIsRegistered"
            class="blue darken-1 white--text"
            large
            router
            to="/creatMeet/new"
          >Organize MeetUps</v-btn>
        </v-flex>
      </v-layout>

      <v-spacer></v-spacer>
      <v-layout row wrap class="mt-2" v-if="!loading">
        <v-flex xs12>
          <v-carousel cycle height="600" hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item
              fluid
              v-for="slide in meetUpsImages"
              v-bind:src="slide.image_url"
              :key="slide.id"
              @click="selectMeet(slide.id)"
            >
              <div class="imgTitles">{{ slide.title }}</div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>

      <v-layout class="mt-6" row wrap>
        <v-flex id="button1" xs12 class="text-xs-center text-sm-center">
          <h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
              voluptatem amet commodi sapiente eum earum dignissimos obcaecati
              animi, eius tenetur ipsa explicabo quaerat! Blanditiis rem omnis
              odio? Odio, aliquam omnis.
            </p>
          </h2>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "home",

  data() {
    return {
      disabled: false
    };
  },
  methods: {
    selectMeet(id) {
      this.$router.push("/Meet/" + id);
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

    meetUpsImages() {
      return this.$store.getters.suggestedLoadedMeets;
    },
    userIsRegistered() {
      return (
        this.$store.getters.getUser == null &&
        this.$store.getters.getUser == undefined
      );
    },
    afterUserSigned() {
      return this.$store.getters.getUser;
    },
    loading() {
      return this.$store.getters.getLoader;
    }
  },
  watch: {
    userIsRegistered(value) {
      if (value !== null && value !== undefined) {
        return !this.disabled;
      }
    }
  }
};
</script>
<style scoped>
.imgTitles {
  color: white;
  font-size: 60px;
  font-weight: bold;
  position: center;
  margin-left: 550px;
}
#top{
  margin-top:60px;
}
</style>
