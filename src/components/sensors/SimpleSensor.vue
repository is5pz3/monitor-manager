<template>
  <v-layout>
    <v-card class="ma-1 text-md-center align-center" min-width="800px">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>{{sensorDisplay.sensor_id}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="changeVisiblity()" icon>
          <v-icon v-if="visible">expand_less</v-icon>
          <v-icon v-else>expand_more</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container v-if="visible">
        <v-layout row class="pa-2">
          <v-flex>
            <div class="caption grey--text">Platform</div>
            <div>{{sensorDisplay.platform}}</div>
          </v-flex>
          <v-flex>
            <div class="caption grey--text">Host Name</div>
            <div>{{sensorDisplay.host_name}}</div>
          </v-flex>
        </v-layout>

        <v-expansion-panel flat>
          <v-expansion-panel-content class="pa-2">
            <template v-slot:header>
              <v-flex>
                <div class="caption grey--text">Metric</div>
                <div>{{sensorDisplay.metric}}</div>
              </v-flex>

              <v-flex>
                <div class="caption grey--text">Unit</div>
                <div>{{sensorDisplay.unit}}</div>
              </v-flex>
            </template>
            <v-card class="text-md-center align-center">
              <v-divider></v-divider>
              <v-subheader>
                <v-flex lg6>Value</v-flex>
                <v-spacer></v-spacer>
                <v-flex lg4>Time</v-flex>
              </v-subheader>
              <v-layout v-for="(measure) in sensorDisplay.data.measurements" :key="measure.timestamp">
                <v-flex lg6>{{measure.value}}</v-flex>
                <v-spacer></v-spacer>
                <v-flex lg4>{{measure.timestamp | moment("HH:mm:ss DD-MM-YYYY")}}</v-flex>
              </v-layout>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <simple-line-chart :chart-data="{datasets: prepareDataForChart(sensorDisplay)}"></simple-line-chart>
      </v-container>
    </v-card>
  </v-layout>
</template>

<script>
import Vue from "vue";
Vue.use(require("vue-moment"));

import SimpleLineChart from "@/components/charts/SimpleLineChart.vue";
import { mapGetters } from "vuex";

export default {
  components: { SimpleLineChart },
  props: {
    sensor: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      visible: false
    };
  },

  computed: {
    ...mapGetters({
      getBorderColorByMetricName: "getBorderColorByMetricName",
      getBackgroundColorByMetricName: "getBackgroundColorByMetricName"
    }),
    sensorDisplay() {
      return this.sensor;
    }
  },

  methods: {
    changeVisiblity() {
      this.visible = !this.visible;
    },

    prepareDataForChart(sensorData) {
      var datasets = [];

      var data = [];
      sensorData.data.measurements.forEach(meassure => {
        data.push({
          y: meassure.value,
          t: meassure.timestamp * 1000
        });
      });

      datasets.push({
        label: sensorData.metric,
        data: data,
        borderColor: this.getBorderColorByMetricName(sensorData.metric),
        backgroundColor: this.getBackgroundColorByMetricName(sensorData.metric)
      });

      return datasets;
    }
  }
};
</script>

<style>
</style>
