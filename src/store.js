import Vue from 'vue';
import Vuex from 'vuex';
import AxiosModule from "@/AxiosModule.js"
import axios from 'axios'
import router from './router'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    limit: 20,
    status: '',
    token: localStorage.getItem('token') || '',
    login: {},
    errorMessage: null,
    complexMeasurements: null,
    colors: [
      {
        metricName: "CpuUsage",
        borderColor: "rgba(35, 129, 18, 0.8)",
        backgroundColor: "rgba(35, 129, 18, 0.1)"
      },

      {
        metricName: "RamUsage",
        borderColor: "rgba(255, 99, 132, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.1)"
      },
    ],
    measurements: [

      {
        id: "402881626a9891a1016a9891c2e30000",
        platform: "Windows 10",
        metric: "RamUsage",
        unit: "%",
        sensor_id: "test",
        host_name: "DESKTOP-Krak",
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
      }
    ],

    historyMeasurement: {
      id: null,
      platform: null,
      metric: null,
      unit: null,
      sensor_id: null,
      host_name: null,
      measurements: null,
      complex_measurements: null
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getToken: state => state.token,
    getMeasurements: (state) => {
      return state.measurements
    },

    getBorderColorByMetricName: (state) => {
      return (payload) => state.colors.find(item => item.metricName === payload).borderColor
    },

    getBackgroundColorByMetricName: (state) => {
      return (payload) => state.colors.find(item => item.metricName === payload).backgroundColor
    },

    getAllSensors: (state) => {
      const uniqeSensors = [...new Set(state.measurements.map(m => m.sensor_id))];
      return uniqeSensors
    },

    getHistoryMeasure: (state) => {
      return state.historyMeasurement
    }
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, login) {
      state.status = 'success'
      state.token = token
      state.login = login
    },
    auth_error(state, errorMessage) {
      state.status = 'error',
        state.errorMessage = errorMessage
    },
    composite_measure_error(state,errorMessage){
      state.status = 'error',
      state.errorMessage = errorMessage
    },
    logout(state){
      state.status = ''
      state.token = ''
    },

    setLimit: (state, payload) => {
      if (payload.limit > 0) {
        state.limit = payload.limit
      } else {
        state.limit = 20
      }
    },

    setMeasurments: (state, payload) => {
      state.measurements = payload
    },
    setMeasurmentsData: (state, payload) => {
      const sensorIndex = state.measurements.findIndex(item => item.sensor_id === payload.sensor_id)
      if (sensorIndex > -1) {
        Vue.set(state.measurements[sensorIndex], 'data', payload.response)
      }
    },

    setHistoryMeasurementInfo: (state, payload) => {
      state.historyMeasurement.id = payload.id,
        state.historyMeasurement.platform = payload.platform,
        state.historyMeasurement.metric = payload.metric,
        state.historyMeasurement.unit = payload.unit,
        state.historyMeasurement.sensor_id = payload.sensor_id,
        state.historyMeasurement.host_name = payload.host_name
    },

    setHistoryMeasurementValues: (state, payload) => {
      state.historyMeasurement.measurements = payload.measurements,
        state.historyMeasurement.complex_measurements = payload.complex_measurements
    },

    setCompositeMeasure: (state, payload) => {
      state.complexMeasurements = payload

    },
  },
  actions: {
    doLogin({ commit }, loginData) {
      axios.post('https://auth-prodd.herokuapp.com/users/login/', {
        ...loginData
      })
        .then((response) => {
          const token = response.data.token
          const login = response.data.login
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, login)
          router.push('/');
          //resolve(response)
          console.log(response.data.token)
        })
        .catch(error => {
          const errorMessage = error.response.data.message
          commit('auth_error', errorMessage)
          localStorage.removeItem('token')
        })
    },
    doRegister({ commit }, registerData) {
      axios.post('https://auth-prodd.herokuapp.com/users/register', {
        ...registerData
      })
        .then((response) => {
          const token = response.data.token
          const login = response.data.login
          const status = response.data.status
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, login)
          console.log(login)
          router.push('/login');
        })
        .catch((error) => {
          const errorMessage = error.response.data.message
          commit('auth_error', errorMessage)
          localStorage.removeItem('token')
        })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve();
      })
    },
    fetchMeasurements: (context, payload) => {
      const url = "/measurements"
      AxiosModule.get(url)
        .then(response => {
          context.commit("setMeasurments", response);
        })
        .catch(error => {
          console.log(error)
        })
    },

    fetchMeasurementsData: (context, payload) => {
      const url = "/measurements/" + payload.sensor_id + "?limit=" + context.state.limit
      AxiosModule.get(url)
        .then(response => {
          var responseData = {
            sensor_id: payload.sensor_id,
            response: response
          }
          context.commit("setMeasurmentsData", responseData);
          console.log(responseData)
        })
        .catch(error => {
          console.log(error)
        })
    },

    /*saveNewCompositeMeasure: (context, payload) => {
      const url = "/measurements"
      AxiosModule.post(url,payload)
      .then(response => {
          var responseData = {
            complex_measurement_id: payload.complex_measurement_id,
            response: response
          }
          context.commit("setCompositeMeasure", responseData);
          console.log(responseData)
        })
        .catch(error => {
          console.log(error)
        })
    },*/
    saveNewCompositeMeasure: (context, payload) => {
      const url = "/measurements?sensorId=" + payload.sensor_id + "&timeWindow=" + payload.time_window + "&calculationFrequency=" + payload.calculation_frequency + "&token=" + payload.token
      AxiosModule.post(url, payload)
        .then(response => {
          var responseData = {
            complex_measurement_id: response.complex_measurement_id,
            response: response
          }
          context.commit("setCompositeMeasure", responseData);
          console.log(responseData)
        })
        .catch(error => {
          const errorMessage = error.response.data.message
          context.commit('composite_measure_error', errorMessage)
          console.log(error)
        })
    },
    //https://monitor-prodd.herokuapp.com/measurements?sensorId=test&timeWindow=5&calculationFrequency=1&token=eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTk3NTU5NjcsInN1YiI6IkFuaWEiLCJpc3MiOiJwejUiLCJleHAiOjE1NTk3NTY1Njd9.DlEslSc-InMXmG6kTatBv6Mkok15jITBftRISzVU794
    // + payload.sensor_id + "?limit=" + context.state.limit
    fetchHistoryMeasurements: (context, payload) => {
      const url = "/measurements/" + payload.sensor_id
        + "?data_count=" + payload.data_count
        + "&since=" + payload.since
        + "&to=" + payload.to

      AxiosModule.get("/measurements")
        .then(response => {
          context.commit("setHistoryMeasurementInfo", response.find(s => s.sensor_id == payload.sensor_id))
        })
        .catch(error => {
          console.log(error)
        })

      AxiosModule.get(url)
        .then(response => {
          context.commit("setHistoryMeasurementValues", response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
});
