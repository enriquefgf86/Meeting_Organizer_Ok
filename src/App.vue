<template>
  <v-app>
    <!-- <video autoplay muted loop id="myVideo">
  <source src="./assets/Meeting.mp4" type="video/mp4">
</video> -->
   
    <v-app-bar  style="height:-200px;" src='./assets/leaves.jpg' id='toolbar'  app  >
      <v-app-bar-nav-icon class='hidden-lg-and-up white--text'
        v-on:click="sideSlipper = !sideSlipper"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class='gh'
        ><router-link to="/" tag="span" style="cursor:pointer"
          >Meeting Organizer</router-link
        ></v-toolbar-title
      >

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <div  v-for="items in itemsOfMenu" v-bind:key="items.title">
          <v-list id='bot' class="hidden-md-and-down  pl-6">
            <v-btn rounded  class="blue darken white--text" router :to="items.link">
              <v-icon class="blue darken-1 white--text">{{ items.icon }}</v-icon>
              {{ items.title }}
            </v-btn>
          </v-list>
        </div>
        <div v-if='userIsRegistered'>
          <v-list  id ='bot' class="hidden-md-and-down pl-6">
            <v-btn rounded class="blue darken-1 white--text" @click='getUserOut' >
              <v-icon class="blue darken-1 white--text" mdi-exit-run>mdi-exit-run</v-icon>
              Log out
            </v-btn>
          </v-list>
        </div>
      </v-toolbar-items> 
      
      </v-app-bar>
      
    <v-navigation-drawer v-model="sideSlipper" absolute temporary height='300'>
      <v-list>
        <v-list
          class="hidden-md-and-up"
          v-for="items in itemsOfMenu"
          v-bind:key="items.title"
        >
          <div>
            <v-icon>{{ items.icon }}</v-icon>
            <v-btn text router :to="items.link"> {{ items.title }}</v-btn>
          </div>
        </v-list>
      </v-list>
      <v-list v-if='userIsRegistered' >
        <v-list>
          <div>
            <v-icon mdi-exit-run>mdi-exit-run</v-icon>
            <v-btn text  @click='getUserOut' > Log out</v-btn>
          </div>
        </v-list>
      </v-list>
    </v-navigation-drawer>
    <main><router-view></router-view></main>
  </v-app>
</template>

<script>
import  {mapGetters,mapActions} from "vuex";
export default {
  data() {
    return {
      sideSlipper: false,
    };
  },
  methods:{...mapActions(['signOutUser']),
        getUserOut(){
               return this.$store.dispatch('getUserOut')
        }
  },
  computed:{ ...mapGetters(["getUser"]),
    itemsOfMenu(){
      let permissions=[
            { icon: "mdi-account-arrow-left-outline", title: "Sign Up", link: "/signUp" },
        { icon: "mdi-account-plus-outline", title: "Sign In", link: "/signIn" }
      ]
      if(this.userIsRegistered){
        permissions=[
           { icon: "mdi-eye-outline", title: "View MeetUps", link: "/Meet" },
           { icon: "mdi-calendar-plus", title: "Organize  MeetUps", link: "/creatMeet/new" },
        ]
      }
      return permissions
    },
    userIsRegistered(){
      return this.$store.getters.getUser !==null&&  this.$store.getters.getUser!==undefined

    }
  },
};
</script>
<style scoped>
#myVideo{
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  /* z-index: -2; */
}
/* #toolbar{
  height:-20px;
} */
#bot{
  background-color:transparent;
  
;
}
.gh{
  color: white;
  font-size: 1.5rem;
}


</style>
