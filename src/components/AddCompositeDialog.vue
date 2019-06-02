<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn icon>
          <v-icon color="primary" @click="dialog=true">add_circle_outline</v-icon>
        </v-btn>
      </template>

      <v-card color="white" hide-overlay>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Add New Composite Measure</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-layout column class="pa-4">
          <v-flex>
            <v-select label="Select Host"></v-select>
          </v-flex>
          <v-flex>
            <v-select label="Select Sensor"></v-select>
          </v-flex>
          <v-flex>
            <v-select label="Select Metric"></v-select>
          </v-flex>

          <v-flex>
            <v-subheader class="pl-0">Last</v-subheader>
            <v-slider v-model="lastMinute" thumb-label="always"></v-slider>
          </v-flex>

          <v-flex>
            <v-subheader class="pl-0">Every</v-subheader>
            <v-slider v-model="everyMinute" thumb-label="always"></v-slider>
          </v-flex>

        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      lastMinute: 5,
      everyMinute: 1
    };
  }
};
</script>

<style>
</style>
