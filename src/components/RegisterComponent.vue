
<template>
  <b-container fluid="md">
    <b-row>
      <b-col md="8" offset="2">
        <b-card  border-variant="primary"
        header="Sign Up"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center">
          <b-form @submit.prevent="register(user)">
            <b-form-group label-cols="4" label-cols-lg="2" label="Name" label-align="left" label-for="name">
              <b-form-input id="name" size="lg" v-model="user.name" placeholder="Enter name" ></b-form-input>
              <b-alert v-if="errors.name" :show="errors.name ? true: false" variant="danger" >{{errors.name[0]}}</b-alert>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="2" label="Email" label-align="left" label-for="email">
              <b-form-input type="email" id="email" size="lg" v-model="user.email" placeholder="Enter email"></b-form-input>
              <b-alert v-if="errors.email" :show="errors.email ? true: false" variant="danger" >{{errors.email[0]}}</b-alert>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="2" label="Password" label-align="left" label-for="password" >
              <b-form-input type="password" id="password" size="lg" v-model="user.password" placeholder="Enter password" ></b-form-input>
            <b-alert v-if="errors.password" :show="errors.password ? true: false" variant="danger" >{{errors.password[0]}}</b-alert>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="2" label="Password confirmation" label-align="left" label-for="password_confirmation" >
              <b-form-input type="password" id="password_confirmation" size="lg" v-model="user.password_confirmation" placeholder="Confirm password"></b-form-input>
            </b-form-group>
            <div>
              <b-button type="submit" block variant="outline-primary">Sign Up</b-button>
              <b-button block variant="outline-secondary"  @click="$router.push('login')">Sign In</b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
/*eslint-disable */

export default {
  name: "Register",
  props: {
    msg: String
  },
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null
      },
      errors: {
        name: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    register(user){
      this.$http.post(this.API.register, user).then((res) => {
          if(res.success) {
            this.$router.replace({
              name: "Login"
            })
          }
        })
        .catch(err => {       
          this.errors.name = err.errors.name || null;
          this.errors.email = err.errors.email || null;
          this.errors.password = err.errors.password || null;
        });
    }
  }
};
</script>
