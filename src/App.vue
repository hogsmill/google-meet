<template>
  <div id="app">
    <Header />
    <div v-if="connectionError" class="not-connected">
      WARNING: You are not connected to the server: {{ connectionError }}
    </div>
    <div v-if="localStorageStatus != 'ok'" class="not-connected">
      WARNING: {{ localStorageStatus }} - please enable cookies in browser settings
    </div>
    <div class="container-fluid text-center">
      <Scope />
      <div class="row">
        <Setup v-if="tab == 'setup'" />
        <Meeting v-if="tab == 'meeting'" />
        <Graph v-if="tab == 'graph'" />
      </div>
    </div>
    <Modals />
  </div>
</template>

<script>
import bus from './socket.js'

import ls from './lib/localStorage.js'

import Header from './components/Header.vue'
import Scope from './components/Scope.vue'
import Setup from './components/Setup.vue'
import Meeting from './components/Meeting.vue'
import Graph from './components/Graph.vue'
import Modals from './components/Modals.vue'

export default {
  name: 'App',
  components: {
    Header,
    Scope,
    Setup,
    Meeting,
    Graph,
    Modals
  },
  data() {
    return {
    }
  },
  computed: {
    connectionError() {
      return this.$store.getters.getConnectionError
    },
    localStorageStatus() {
      return this.$store.getters.getLocalStorageStatus
    },
    tab() {
      return this.$store.getters.getTab
    },
    meetingId() {
      return this.$store.getters.getMeetingId
    }
  },
  created() {
    this.$store.dispatch('localStorageStatus', ls.check())

    bus.on('connectionError', (data) => {
      this.$store.dispatch('updateConnectionError', data)
    })

    bus.on('updateConnections', (data) => {
      this.$store.dispatch('updateConnectionError', null)
      this.$store.dispatch('updateConnections', data)
    })

    bus.on('updateMeeting', (data) => {
      if (data.id == this.meetingId) {
        this.$store.dispatch('updateMeeting', data)
      }
    })
  }
}
</script>

<style lang="scss">

  h1 {
    margin-top: 24px;
  }

  .not-connected {
    background-color: red;
    color: #fff;
    font-weight: bold;
    margin: 6px;
  }

  .content {
    margin: 0 auto;
  }

</style>
