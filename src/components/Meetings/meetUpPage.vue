<template>
  <v-container>
    <v-container  id="containerMeets" >
      <v-layout row wrap v-for="getMeet in arrayMeets" :key="getMeet.id"  class="mb-3">
        <v-flex xs-12>
          <v-card  id="cardInfo" >
            <v-container fluid>
              <v-layout>
                <v-flex xs5 md3 sm4>
                  <v-card class="mt-2 mb-2 ml-2">
                    <v-img :src="getMeet.image_url"></v-img>
                  </v-card>
                </v-flex>
                <v-flex>
                  <v-card-title>
                    <div>
                      <h2 class="white--text mt-10">{{getMeet.title}}</h2>
                      <v-spacer></v-spacer>
                      <div class="white--text">{{getMeet.date }}</div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      rounded
                      class="blue darken-1 white--text"
                      :to="'/Meet/'+getMeet.id"
                      style="cursor:pointer"
                    >
                    
                      Detail of meet
                      <v-icon left light large class="ml-3 white--text">mdi-eye-outline</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "meetUpPage",
  computed: {
    ...mapGetters(["loadedAvailableMeets"]),
    arrayMeets() {
      return this.$store.getters.loadedAvailableMeets;
    }
  },
  created(){
    console.log(this.arrayMeets);
    
  }
};
</script>
<style>
#containerMeets{
overflow:scroll;
height:600px;
display:flex;
flex-direction:column;
margin-top:10rem;

}
#cardInfo{
  margin-bottom:1rem;
  background-color: rgba(0, 204, 255, 0.8);
}
</style>