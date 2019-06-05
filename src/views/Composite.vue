<template>
  <v-container class="my-5">
    <v-card>
      <v-layout justify-center align-center>
        <v-flex class="pa-3">Aggregation By Calculating the Moving Average</v-flex>

        <v-spacer></v-spacer>

        <v-flex md4 class="pa-3">
          <v-select
            @change="fetchComposite"
            v-model="selectedSensor"
            :items="getAllSensors"
            label="Select Sensor"
          ></v-select>
        </v-flex>
        <v-flex md1>
          <DeleteCompositeDialog/>
        </v-flex>
        <v-flex md1>
          <AddCompositeDialog/>
        </v-flex>
      </v-layout>
    </v-card>

    <br>

    <v-layout column align-center justify-center>
      <v-flex md12 v-if="getCompositeMeasure.sensor_id">
        <CompositeSensor :sensor="getCompositeMeasure"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AddCompositeDialog from "@/components/AddCompositeDialog.vue";
import DeleteCompositeDialog from "@/components/DeleteCompositeDialog.vue";
import CompositeSensor from "@/components/sensors/CompositeSensor.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    AddCompositeDialog,
    DeleteCompositeDialog,
    CompositeSensor
  },
  data() {
    return {
      selectedSensor: ""
    };
  },
  computed: {
    ...mapGetters({
      getAllSensors: "getAllSensors",
      getCompositeMeasure: "getCompositeMeasure"
    })
  },
  methods: {
    fetchComposite() {
      var payload = {
        sensor_id: this.selectedSensor
      };
      this.$store.dispatch("fetchCompositeMeasurments", payload)
    },
  },
  created() {
    this.$store.dispatch("fetchMeasurements");
  }
};
</script>

<style>
</style>
