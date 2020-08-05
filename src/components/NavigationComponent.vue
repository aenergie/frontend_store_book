<template>
  <div id="nav">
    <router-link to="/books">Books</router-link>
    <div>Welcome <span v-if="user"> {{user.name}}</span> | <b-link @click="signOut()">Logout</b-link> </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
export default {
  name: "NavigationComponent",
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      signOutAction: 'auth/signOut'
    }),
    signOut(){
      this.signOutAction().then(() => {
        this.$router.replace({
          name:'Login'
        })
      })
    }
  }
};
</script>