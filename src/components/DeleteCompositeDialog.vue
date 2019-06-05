<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
          <v-btn color="red" @click="dialog=true" dark>Delete
        <v-icon dark right>remove_circle</v-icon>
      </v-btn>
      </template>

      <v-card color="white" hide-overlay>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Delete Composite Measure</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-layout column class="pa-4">
          <v-flex>
            <v-select v-model="selectedSensor" :items="getAllSensors" label="Select Sensor"></v-select>
          </v-flex>
        </v-layout>
          <v-alert
          :value="errorMessageDeleteComposite"
          color="error"
          icon="warning"
          outline
        >{{errorMessageDeleteComposite}}</v-alert>
         <v-alert
          :value="deleteMessage"
          type="success"
          outline
        >Composite measure was deleted</v-alert>
        <v-divider></v-divider>
        <v-btn @click="deleteNewCompositeMeasure" flat color="primary">Delete</v-btn>
        <v-btn @click="dialog = false" flat>Cancel</v-btn>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters,mapState } from "vuex"

export default {
  data() {
    return {
      dialog: false,
      selectedSensor: ''
    };
  },
  computed: {
    ...mapGetters({
      getAllSensors: "getAllSensors",
      getToken: "getToken"
    }),
    ...mapState(["errorMessageDeleteComposite","deleteMessage"]),
  },

  methods: {
    deleteNewCompositeMeasure(){
      var payload = {
        sensor_id: this.selectedSensor,
        token: this.getToken
      }

      this.$store.dispatch("deleteCompositeMeasure", payload);
      //this.dialog = false;
    }
  }
};
</script>

<style>
</style>
