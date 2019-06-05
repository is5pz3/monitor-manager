<template>
  <v-container>
    <v-card>
      <v-card-title class="headline font-weight-regular blue-grey white--text">Log In</v-card-title>
      <v-form class="mx-5" lazy-validation @submit.prevent="loginSubmit">
        <v-text-field
          class="mx-5"
          v-model="login"
          :rules="[rules.loginRules]"
          label="Login"
          required
        ></v-text-field>
        <v-text-field
          class="mx-5"
          v-model="password"
          :rules="[rules.passwordRules]"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-alert
          class="mx-5"
          :value="errorMessage"
          color="error"
          icon="warning"
          outline
        >{{errorMessage}}</v-alert>
        <v-flex text-xs-right class="mx-5 pa-5">
          <v-btn flat color="primary" @click="loginSubmit()">Log In</v-btn>
          <v-btn flat to="/register">Sign up</v-btn>
        </v-flex>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      login: "",
      password: "",
      rules: {
        loginRules: v => !!v || "Login is required",
        passwordRules: v => !!v || "Password is required"
      }
    };
  },
  computed: {
    ...mapState(["errorMessage"])
  },
  methods: {
    ...mapActions(["doLogin"]),
    loginSubmit() {
      this.doLogin({
        login: this.login,
        password: this.password
      });
    }
  }
};
</script>
