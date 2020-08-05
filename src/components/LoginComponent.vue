
<template>
  <b-container fluid="md">
    <b-row>
      <b-col md="8" offset="2">
      <b-card border-variant="primary"
        header="Login"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center">
        <b-form @submit.prevent="login(credentials)">
          <b-form-group label-cols="4" label-cols-lg="2" label="Email" label-align="left" label-for="email">
            <b-form-input type="email" id="email" size="lg" v-model="credentials.email" placeholder="Enter email"></b-form-input>
            <b-alert v-if="errors.email" :show="errors.email ? true: false" variant="danger" >{{errors.email[0]}}</b-alert>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Password" label-align="left" label-for="password" >
            <b-form-input type="password" id="password" size="lg" v-model="credentials.password" placeholder="Enter password" ></b-form-input>
            <b-alert v-if="errors.password" :show="errors.password ? true: false" variant="danger" >{{errors.password[0]}}</b-alert>
          </b-form-group>
          <div>
            <b-button type="submit" block variant="outline-primary">Log In</b-button>
            <b-button block variant="outline-secondary" @click="$router.push('register')">Sign Up</b-button>
            <b-alert v-if="errors.unauthorized" :show="errors.unauthorized ? true: false" variant="danger" >The credentials aren't corrects</b-alert>
          </div>
        </b-form>
      </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
/*eslint-disable */
import {mapActions, mapGetters} from "vuex";
export default {
  name: "LoginComponent",
  props: {
    msg: String
  },
  data() {
    return {
      credentials: {
        email: null,
        password: null,
      },
      errors: {
        email: null,
        password: null,
        unauthorized: false
      }
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }),
    login(){
       this.signIn(this.credentials).then(( res ) => {
        this.$router.replace({
          name: "Books"
        })
      }).catch( err => {
        this.errors.unauthorized = true;
        this.errors.email = err.data.email || null;
        this.errors.password = err.data.password || null;
      });
    }
  }
};
</script>
