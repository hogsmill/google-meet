import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    thisGame: 'Socket Test',
    connections: 0,
    connectionError: null,
    localStorageStatus: true,
    tab: '',
    meetingId: '',
    meeting: {},
  },
  getters: {
    thisGame: (state) => {
      return state.thisGame
    },
    getConnections: (state) => {
      return state.connections
    },
    getConnectionError: (state) => {
      return state.connectionError
    },
    getLocalStorageStatus: (state) => {
      return state.localStorageStatus
    },
    getTab: (state) => {
      return state.tab
    },
    getMeetingId: (state) => {
      return state.meetingId
    },
    getMeeting: (state) => {
      return state.meeting
    },
    getAttendees: (state) => {
      return state.attendees
    }
  },
  mutations: {
    updateConnections: (state, payload) => {
      state.connections = payload
    },
    updateConnectionError: (state, payload) => {
      state.connectionError = payload
    },
    localStorageStatus: (state, payload) => {
      state.localStorageStatus = payload
    },
    updateTab: (state, payload) => {
      state.tab = payload
    },
    updateMeetingId: (state, payload) => {
      state.meetingId = payload
    },
    updateMeeting: (state, payload) => {
      state.meeting = payload
    },
    updateAttendees: (state, payload) => {
      state.attendees = payload
    }
  },
  actions: {
    updateConnections: ({ commit }, payload) => {
      commit('updateConnections', payload)
    },
    updateConnectionError: ({ commit }, payload) => {
      commit('updateConnectionError', payload)
    },
    localStorageStatus: ({ commit }, payload) => {
      commit('localStorageStatus', payload)
    },
    setTab: ({ commit }, payload) => {
      commit('updateTab', payload)
    },
    updateMeetingId: ({ commit }, payload) => {
      commit('updateMeeting', payload)
    },
    updateMeeting: ({ commit }, payload) => {
      commit('updateMeeting', payload)
    },
    updateAttendees: ({ commit }, payload) => {
      commit('updateAttendees', payload)
    }
  }
})
