import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    colors: [
      {
        metricName: "CPU Usage",
        borderColor: "rgba(35, 129, 18, 0.8)",
        backgroundColor: "rgba(35, 129, 18, 0.1)"
      },

      {
        metricName: "RAM Usage",
        borderColor: "rgba(255, 99, 132, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.1)"
      },
    ],
    getMeasurements: [
      {
        sensor_id: 'Sensor 01',
        platform: 'ubuntu 16.04 LTE',
        metrics: [
          {
            metric: 'CPU Usage',
            unit: '%',
            timestamp: 'Unix Timestamp',
            data: [
              { value: 10.0, timestamp: 1557124450 },
              { value: 20.0, timestamp: 1557124451 },
              { value: 25.0, timestamp: 1557124452 },
              { value: 45.0, timestamp: 1557124453 },
              { value: 20.0, timestamp: 1557124454 },
              { value: 34.0, timestamp: 1557124455 },
              { value: 67.0, timestamp: 1557124456 },
              { value: 71.0, timestamp: 1557124457 },
              { value: 72.0, timestamp: 1557124458 },
              { value: 73.0, timestamp: 1557124459 },
              { value: 63.0, timestamp: 1557124460 },
            ]
          },
          {
            metric: 'RAM Usage',
            unit: '%',
            timestamp: 'Unix Timestamp',
            data: [
              { value: 10.0, timestamp: 1557124450 },
              { value: 20.0, timestamp: 1557124451 },
              { value: 37.0, timestamp: 1557124452 },
              { value: 45.0, timestamp: 1557124453 },
              { value: 22.0, timestamp: 1557124454 },
              { value: 37.0, timestamp: 1557124455 },
              { value: 67.0, timestamp: 1557124456 },
              { value: 51.0, timestamp: 1557124457 },
              { value: 62.0, timestamp: 1557124458 },
              { value: 73.0, timestamp: 1557124459 },
              { value: 34.0, timestamp: 1557124460 },
            ]
          }
        ]
      },
      {
        sensor_id: 'Sensor 02',
        platform: 'ubuntu 16.04 LTE',
        metrics: [
          {
            metric: 'CPU Usage',
            unit: '%',
            timestamp: 'Unix Timestamp',
            data: [
              { value: 10.0, timestamp: 1557124450 },
              { value: 20.0, timestamp: 1557124451 },
              { value: 25.0, timestamp: 1557124452 },
              { value: 55.0, timestamp: 1557124453 },
              { value: 30.0, timestamp: 1557124454 },
              { value: 34.0, timestamp: 1557124455 },
              { value: 57.0, timestamp: 1557124456 },
              { value: 61.0, timestamp: 1557124457 },
              { value: 72.0, timestamp: 1557124458 },
              { value: 23.0, timestamp: 1557124459 },
              { value: 14.0, timestamp: 1557124460 },
            ]
          },
        ]
      },
      {
        sensor_id: 'Sensor 04',
        platform: 'ubuntu 16.04 LTE',
        metrics: [
          {
            metric: 'RAM Usage',
            unit: '%',
            timestamp: 'Unix Timestamp',
            data: [
              { value: 10.0, timestamp: 1557124450 },
              { value: 30.0, timestamp: 1557124451 },
              { value: 25.0, timestamp: 1557124452 },
              { value: 65.0, timestamp: 1557124453 },
              { value: 50.0, timestamp: 1557124454 },
              { value: 34.0, timestamp: 1557124455 },
              { value: 77.0, timestamp: 1557124456 },
              { value: 51.0, timestamp: 1557124457 },
              { value: 72.0, timestamp: 1557124458 },
              { value: 43.0, timestamp: 1557124459 },
              { value: 24.0, timestamp: 1557124460 },
            ]
          },

        ]

      },
    ],
  },
  getters: {
    getMeasurements: (state) => {
      return state.getMeasurements
    },

    getBorderColorByMetricName: (state) => {
      return (payload) => state.colors.find(item => item.metricName === payload).borderColor
    },

    getBackgroundColorByMetricName: (state) => {
      return (payload) => state.colors.find(item => item.metricName === payload).backgroundColor
    },
  },
  mutations: {

  },
  actions: {

  },
});
