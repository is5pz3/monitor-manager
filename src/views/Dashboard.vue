<template>
  <v-container class="my-5">
    <v-layout column fill-height align-center justify-start>
      <v-flex>
        <v-text-field v-model="searchHostname" label="Hostnames" placeholder="Search by host name" outline></v-text-field>
      </v-flex>
      <v-flex v-for="(item, index) in filteredSensors" :key="index" xs12 md6 lg12>
        <SimpleSensor :sensor="item"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

import SimpleSensor from "@/components/sensors/SimpleSensor.vue";

export default {
  components: {
    SimpleSensor
  },
  data() {
    return {
      loading: true,
      searchHostname: "",
      timer: ""
    };
  },
  computed: {
    ...mapGetters({
      getMeasurements: "getMeasurements"
    }),

    filteredSensors() {
      return this.getMeasurements.filter(item => {
        return item.host_name.match(this.searchHostname)
      })
    }
  },
  methods: {
    fetchMeasurementsData() {
      this.getMeasurements.forEach(element => {
        this.$store.dispatch("fetchMeasurementsData", element);
      });
    }
  },
  created() {
    this.$store.dispatch("fetchMeasurements").then(response => {
      this.loading = false;
    });
    setTimeout(this.fetchMeasurementsData, 500);
    this.timer = setInterval(this.fetchMeasurementsData, 5000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style>
</style>
