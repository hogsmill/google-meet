
import { createStore } from 'vuex'

export const store = createStore({
  state: {
    thisGame: 'Socket Test',
    connections: 0,
    connectionError: null,
    localStorageStatus: true,
    modals: {
      'feedback': false
    },
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
    getModals: (state) => {
      return state.modals
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
    showModal: (state, payload) => {
      const modals = Object.keys(state.modals)
      for (let i = 0; i < modals.length; i++) {
        state.modals[modals[i]] = false
      }
      state.modals[payload] = true
    },
    hideModal: (state, payload) => {
      state.modals[payload] = false
    },
    updateTab: (state, payload) => {
      state.tab = payload
    },
    updateMeetingId: (state, payload) => {
      state.meetingId = payload
      console.log(state)
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
    showModal: ({ commit }, payload) => {
      commit('showModal', payload)
    },
    hideModal: ({ commit }, payload) => {
      commit('hideModal', payload)
    },
    setTab: ({ commit }, payload) => {
      commit('updateTab', payload)
    },
    updateMeetingId: ({ commit }, payload) => {
      commit('updateMeetingId', payload)
    },
    updateMeeting: ({ commit }, payload) => {
      commit('updateMeeting', payload)
    },
    updateAttendees: ({ commit }, payload) => {
      commit('updateAttendees', payload)
    }
  }
})
