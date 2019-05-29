import Vue from 'vue';
import Vuex from 'vuex';
import AxiosModule from "@/AxiosModule.js"
import axios from 'axios'
import router from './router'
Vue.use(Vuex);

const moduleMock = {
  namespaced: true,
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
}

export default new Vuex.Store({
  state: {
    limit: 20,
    status: '',
    token: localStorage.getItem('token') || '',
    login : {},
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
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getMeasurements: (state) => {
      return state.measurements
    },

    getBorderColorByMetricName: (state) => {
      return (payload) => state.colors.find(item => item.metricName === payload).borderColor
    },

    getBackgroundColorByMetricName: (state) => {
      return (payload) => state.colors.find(item => item.metricName === payload).backgroundColor
    },
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, login){
      state.status = 'success'
      state.token = token
      state.login = login
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },

    setLimit: (state, payload) => {
      state.limit = payload.limit
    },

    setMeasurments: (state, payload) => {
      state.measurements = payload
    },
    setMeasurmentsData: (state, payload) => {
      const sensorIndex = state.measurements.findIndex(item => item.sensor_id === payload.sensor_id)
      if (sensorIndex > -1) {
        Vue.set(state.measurements[sensorIndex], 'data', payload.response)
      }
    }

  },
  actions: {
    doLogin({ commit }, loginData) {
      axios.post('https://reqres.in/api/login', {
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
        console.log(response)
      })
      .catch(error => {
        commit('auth_error')
        localStorage.removeItem('token')
        console.log(error.status)
      })
    },
    doRegister({ commit }, loginData) {
      axios.post('https://reqres.in/api/register', {
        ...loginData
      })
      .then((response) => {
        const token = response.data.token
        const login = response.data.login
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = token
        commit('auth_success', token, login)
        console.log(login)
        router.push('/login');
        //resolve(response)
        console.log(response)
      })
      .catch(error => {
        commit('auth_error')
        localStorage.removeItem('token')
        console.log(error)
      })
    },
    //temp
    /*login: (context, payload) => {
      const url = "/users"
      AxiosModule.post(url)
        .then(response => {
          const token = response.data.token
          const login = response.data.login
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          context.commit('auth_success', token, login)
          console.log(response)
        })
        .catch(error => {
          context.commit('auth_error')
          localStorage.removeItem('token')
          console.log(error)
        })
    },
    register: (context, payload) => {
      const url = "https://reqres.in/api/register"
      AxiosModule.post(url)
        .then(response => {
          const token = resp.data.token
          const login = resp.data.login
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          context.commit('auth_success', token, login)
          console.log(response)
        })
        .catch(error => {
          context.commit('auth_error')
          localStorage.removeItem('token')
          console.log(error)
        })
    },*/
    logout({commit}){
      return new Promise((resolve, reject) => {
          commit('logout')
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
      })
    },
    fetchMeasurements: (context, payload) => {
      const url = "/measurements"
      AxiosModule.get(url)
        .then(response => {
          context.commit("setMeasurments", response);
          console.log(response)
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
        })
        .catch(error => {
          console.log(error)
        })
    }

  },
});
