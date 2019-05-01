<template>
  <v-container class="my-5">
    <v-layout column fill-height align-center justify-start>
      <v-flex v-for="(item, index) in getMeasurements" :key="index" xs12 md6 lg12>
          <SimpleSensor :sensor="item" />
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
    return {};
  },
  computed: {
    ...mapGetters({
      getMeasurements: "getMeasurements"
    })
  }
};
</script>

<style>
</style>
