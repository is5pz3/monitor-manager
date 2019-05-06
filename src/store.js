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
            timestamp: 'Unix Timestamp',
            data: [
              {value: 10.0, timestamp: 1557124450},
              {value: 20.0, timestamp: 1557124451},
              {value: 25.0, timestamp: 1557124452},
              {value: 45.0, timestamp: 1557124453},
              {value: 20.0, timestamp: 1557124454},
              {value: 34.0, timestamp: 1557124455},
              {value: 67.0, timestamp: 1557124456},
              {value: 71.0, timestamp: 1557124457},
              {value: 72.0, timestamp: 1557124458},
              {value: 73.0, timestamp: 1557124459},
              {value: 64.0, timestamp: 1557124460},
            ]
          },
          {
            metric: 'Ram usage',
            unit: '%',
            timestamp: 'Unix Timestamp',
            data: [
              {value: 10.0, timestamp: 1557124450},
              {value: 20.0, timestamp: 1557124451},
              {value: 25.0, timestamp: 1557124452},
              {value: 45.0, timestamp: 1557124453},
              {value: 20.0, timestamp: 1557124454},
              {value: 34.0, timestamp: 1557124455},
              {value: 67.0, timestamp: 1557124456},
              {value: 71.0, timestamp: 1557124457},
              {value: 72.0, timestamp: 1557124458},
              {value: 73.0, timestamp: 1557124459},
              {value: 64.0, timestamp: 1557124460},
            ]
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
            timestamp: 'Unix Timestamp',
            data: [
              {value: 10.0, timestamp: 1557124450},
              {value: 20.0, timestamp: 1557124451},
              {value: 25.0, timestamp: 1557124452},
              {value: 45.0, timestamp: 1557124453},
              {value: 20.0, timestamp: 1557124454},
              {value: 34.0, timestamp: 1557124455},
              {value: 67.0, timestamp: 1557124456},
              {value: 71.0, timestamp: 1557124457},
              {value: 72.0, timestamp: 1557124458},
              {value: 73.0, timestamp: 1557124459},
              {value: 64.0, timestamp: 1557124460},
            ]
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
            timestamp: 'Unix Timestamp',
            data: [
              {value: 10.0, timestamp: 1557124450},
              {value: 20.0, timestamp: 1557124451},
              {value: 25.0, timestamp: 1557124452},
              {value: 45.0, timestamp: 1557124453},
              {value: 20.0, timestamp: 1557124454},
              {value: 34.0, timestamp: 1557124455},
              {value: 67.0, timestamp: 1557124456},
              {value: 71.0, timestamp: 1557124457},
              {value: 72.0, timestamp: 1557124458},
              {value: 73.0, timestamp: 1557124459},
              {value: 64.0, timestamp: 1557124460},
            ]
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
