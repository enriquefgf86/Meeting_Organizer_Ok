<template>
  <v-container>
    <v-container>
      <v-layout row v-if="userError">
        <v-flex xs12 sm6>
          <alert-tag @dismissedAlert="closer" :text="userError.message"></alert-tag>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex class="d-flex justify-center">
          <v-card style="width:300px ;height:350px;margin-top:90px">
            <v-card-text>
              <v-container>
                <form @submit.prevent="signingUp">
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        name="name"
                        label="Name"
                        id="name"
                        v-model="name"
                        type="name"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        name="email"
                        label="email"
                        id="email"
                        v-model="email"
                        type="email"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        name="password"
                        label="Password"
                        id="password"
                        v-model="password"
                        type="password"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        name=" Confirm password"
                        label="Confirm Password"
                        id="Confirmpassword"
                        v-bind:rules="[passwordValidator]"
                        v-model="confirmpassword"
                        type="password"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn v-bind:disabled="signUpDisabler" type="submit" class="primary">
                        Sign up
                        <!-- <v-progress-circular indeterminate  v-if="!loading"  color="primary" >
                        </v-progress-circular></span>-->
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "signUpPage",
  data() {
    return {
      email: "",
      password: "",
      confirmpassword: "",
      name: "",
      disabled: false
      // disab:false
    };
  },
  methods: {
    ...mapActions(["createSignedUpUser", "clearError"]),
    signingUp() {
      this.$store.dispatch("createSignedUpUser", {
        email: this.email,
        password: this.password
      });
    },
    closer() {
      this.$store.dispatch("clearError");
    }
  },
  computed: {
    ...mapGetters(["getUser", "getAuthUserError", "getLoader"]),
    passwordValidator() {
      if (this.password !== this.confirmpassword) {
        return "Passwords dont match, please insert it correctly";
      } else {
        return "";
      }
    },
    signUpDisabler() {
      return this.confirmpassword !== this.password;
    },
    // otherCond(){
    //       return this.confirmpassword!==null
    // },
    afterUserSigned() {
      return this.$store.getters.getUser;
    },

    userError() {
      return this.$store.getters.getAuthUserError;
    }
    // loading(){
    //     return this.$store.getters.getLoader
    // }
  },
  watch: {
    afterUserSigned(value) {
      if (value !== null && value !== undefined) {
        return this.$router.push("/");
      }
    },
    signUpDisabler(value) {
      if (!value) {
        return this.disabled == false;
      }
    }
    // otherCond(value){
    //     if(value){
    //         return this.disabled==false
    //     }
    // }
  }
};
</script>