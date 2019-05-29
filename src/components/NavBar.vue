<template>
  <nav>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Monitor </span>
        <span> Manager</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="isLoggedIn" @click="logout" flat>Logout</v-btn>
      <v-btn v-else to="/login" flat>Sign in</v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="primary text-uppercase">
      <v-list>
        <v-list-tile v-for="button in buttons" :key="button.title" router :to="button.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ button.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ button.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      logged: false,
      buttons: [
        { title: "Dashboard", icon: "dashboard", route: "/" },
        { title: "Search", icon: "search", route: "/search" },
        { title: "Charts", icon: "insert_chart_outlined", route: "/charts" },
        { title: "Composite Measure", icon: "create", route: "/composite" },
        { title: "History", icon: "history", route: "/history" },
      ]
    };
  },
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
  methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
};
</script>

<style>
</style>