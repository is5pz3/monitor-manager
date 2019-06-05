<template>
  <v-container>
    <v-card>
      <v-card-title class="headline font-weight-regular blue-grey white--text">Sing Up</v-card-title>
      <v-form class="mx-5" lazy-validation @submit.prevent="register">
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
        <v-text-field
          class="mx-5"
          v-model="confirmPassword"
          label="Confirm password"
          type="password"
          :error-messages="passwordMatchError"
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
          <v-btn color="primary" flat :disabled="passwordMatchErrorFlag" @click="register()">Sign Up</v-btn>
          <v-btn to="/login" flat>Cancel</v-btn>
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
      confirmPassword: "",
      rules: {
        loginRules: v => !!v || "Login is required",
        passwordRules: v => !!v || "Password is required"
      }
    };
  },
  computed: {
    ...mapState(["errorMessage"]),
    passwordMatchError() {
      return this.password === this.confirmPassword
        ? ""
        : "Passwords must match";
    },
    passwordMatchErrorFlag() {
      return this.password !== this.confirmPassword ||
        this.confirmPassword === null
        ? true
        : false;
    },
    passwordRequired() {
      return this.password != "" ? "" : "Passwords must match";
    }
  },
  methods: {
    ...mapActions(["doRegister"]),
    register() {
      this.doRegister({
        login: this.login,
        password: this.password
      });
    }
  }
};
</script>