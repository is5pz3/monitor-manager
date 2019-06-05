<template>
  <v-container class="my-5">
    <v-card>
      <v-layout row wrap justify-center align-center>
        <v-flex md10 class="pa-3">
          <v-select v-model="selectedSensor" :items="getAllSensors" label="Select Sensor"></v-select>
        </v-flex>
        <v-flex md2 class="pa-3">
          <v-text-field label="Data count" outline mask="#####" v-model="data_count"></v-text-field>
        </v-flex>

        <v-container md12 class="pa-3">
          <v-layout>
            <v-flex>
              <v-menu
                ref="menu0"
                v-model="menu[0]"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="fromDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="fromDate"
                    label="From date"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="fromDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu[0] = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu0.save(fromDate)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex>
              <v-menu
                ref="menu1"
                v-model="menu[1]"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="fromTime"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="fromTime"
                    label="From  time"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu[1]"
                  v-model="fromTime"
                  full-width
                  @click:minute="$refs.menu1.save(fromTime)"
                ></v-time-picker>
              </v-menu>
            </v-flex>

            <v-spacer></v-spacer>

            <v-flex>
              <v-menu
                ref="menu2"
                v-model="menu[2]"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="toDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="toDate"
                    label="To date"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="toDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu[2] = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu2.save(toDate)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex>
              <v-menu
                ref="menu3"
                v-model="menu[3]"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="toTime"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="toTime"
                    label="To  time"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu[3]"
                  v-model="toTime"
                  full-width
                  @click:minute="$refs.menu3.save(toTime)"
                ></v-time-picker>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-container>
        <v-layout row>
          <v-flex md1>
            <v-btn @click="getNewHistoryMeasurements()" flat color="primary">Search</v-btn>
          </v-flex>
          <v-flex md1 :class="{ errorTime: isError, acceptTime: !isError }">
            <br>
            {{msg}}
          </v-flex>
        </v-layout>
      </v-layout>
    </v-card>
    <br>
    <v-layout column align-center justify-center>
      <v-flex md12 v-if="getHistoryMeasure.sensor_id">
        <HistorySensor :sensor="getHistoryMeasure"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import HistorySensor from "@/components/sensors/HistorySensor.vue";

export default {
  components: {
    HistorySensor
  },
  data() {
    return {
      menu: [false, false, false, false],
      fromDate: null,
      fromTime: null,
      toDate: null,
      toTime: null,
      selectedSensor: null,
      data_count: 20,
      isError: false,
      msg: ""
    };
  },
  computed: {
    ...mapGetters({
      getAllSensors: "getAllSensors",
      getHistoryMeasure: "getHistoryMeasure"
    })
  },

  methods: {
    parseDateTimeToTimestamp(part) {
      var date = null;
      var time = null;

      if (part == "from") {
        date = this.fromDate;
        time = this.fromTime;
      }
      if (part == "to") {
        date = this.toDate;
        time = this.toTime;
      }

      var dateParts = date.split("-");
      var timeParts = time.split(":");

      date = new Date(
        dateParts[0],
        parseInt(dateParts[1], 10) - 1,
        dateParts[2],
        timeParts[0],
        timeParts[1]
      );
      var timestamp = date.getTime() / 1000;
      return timestamp;
    },

    getNewHistoryMeasurements() {
      var from = this.parseDateTimeToTimestamp("from");
      var to = this.parseDateTimeToTimestamp("to");
      if (to - from > 0) {
        this.msg = "Ok";
        this.isError = false;

        var payload = {
          sensor_id: this.selectedSensor,
          data_count: this.data_count,
          since: from,
          to: to
        };
        this.$store.dispatch("fetchHistoryMeasurements", payload);
      } else {
        this.msg = "Bad time window";
        this.isError = true;
      }
    },
  },
  created() {
    this.$store.dispatch("fetchMeasurements");
  }
};
</script>

<style>
.errorTime {
  color: red;
}
.acceptTime {
  color: green;
}
</style>
