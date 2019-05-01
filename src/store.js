import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    getMeasurements: [
      {
        sensor_id: 'Sensor 01',
        platform: 'ubuntu 16.04 LTE',
        metrics: [
          {
            metric: 'Cpu usage',
            unit: '%',
            timestamp: 'Unix Timestamp'
          },
          {
            metric: 'Ram usage',
            unit: '%',
            timestamp: 'Unix Timestamp'
          }
        ]
      },
      {
        sensor_id: 'Sensor 02',
        platform: 'ubuntu 16.04 LTE',
        metrics: [
          {
            metric: 'Cpu usage',
            unit: '%',
            timestamp: 'Unix Timestamp'
          },
        ]
      },
      {
        sensor_id: 'Sensor 04',
        platform: 'ubuntu 16.04 LTE',
        metrics: [
          {
            metric: 'Ram usage',
            unit: '%',
            timestamp: 'Unix Timestamp'
          }
        ]
      },

    ]

  },
  getters: {
    getMeasurements: (state) => {
      return state.getMeasurements
    }
  },
  mutations: {

  },
  actions: {

  },
});
