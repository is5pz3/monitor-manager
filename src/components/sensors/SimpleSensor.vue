<template>
  <v-layout>
    <v-card class="ma-1 text-md-center align-center" min-width="700px">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>{{sensorDisplay.sensor_id}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="changeVisiblity()" icon>
          <v-icon v-if="visible">expand_less</v-icon>
          <v-icon v-else>expand_more</v-icon>
        </v-btn>
      </v-toolbar>
      <v-conatiner v-if="visible">
        <v-layout row class="pa-2">
          <v-flex lg12>
            <div class="caption grey--text">Platform</div>
            <div>{{sensorDisplay.platform}}</div>
          </v-flex>
        </v-layout>
        <v-layout v-for="(item , index) in sensorDisplay.metrics" :key="index" class="pa-2">
          <v-flex lg6>
            <div class="caption grey--text">Metric</div>
            <div>{{item.metric}}</div>
          </v-flex>

          <v-flex lg2>
            <div class="caption grey--text">Unit</div>
            <div>{{item.unit}}</div>
          </v-flex>

          <v-flex lg4>
            <div class="caption grey--text">Timestamp</div>
            <div>{{item.timestamp}}</div>
          </v-flex>
        </v-layout>
      </v-conatiner>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  props: {
    sensor: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visible: false
    };
  },

  computed: {
    sensorDisplay() {
      return this.sensor;
    }
  },

  methods: {
    changeVisiblity() {
      this.visible = !this.visible;
    }
  }
};
</script>

<style>
</style>
