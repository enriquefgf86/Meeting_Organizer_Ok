<template>
  <v-container>
    <v-container>
      <v-layout>
        <v-flex class="d-flex justify-center">
          <v-card style="width:300px ;height:300px;margin-top:90px">
            <v-card-text>
              <v-container>
                <form @submit.prevent="signingIn">
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        name="name"
                        label="name"
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
                        label="password"
                        id="password"
                        v-model="password"
                        type="password"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn type="submit" class="primary">Sign In</v-btn>
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
  name: "signInPage",
  data() {
    return {
      email: "",
      password: "",
      name: ""
    };
  },
  methods: {
    ...mapActions(["signUserIn"]),
    signingIn() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      });
    }
  },
  computed: {
    ...mapGetters(["getUser"]),
    afterUserSigned() {
      return this.$store.getters.getUser;
    }
  },
  watch: {
    afterUserSigned(value) {
      if (value !== null && value !== undefined) {
        return this.$router.push("/");
      }
    }
  }
};
</script>
