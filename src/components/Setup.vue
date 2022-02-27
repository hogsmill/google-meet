<template>
  <div class="content set-up">
    <h1>
      Meeting Set Up
    </h1>
    <h2>
      Meeting
    </h2>
    <table>
      <tr>
        <td rowspan="2">
          Meeting Name
        </td>
        <td>
          Enter
        </td>
        <td>
          <input id="set-name" :value="meeting.name ? meeting.name : localMeeting.name" @keyup="setMeetingField('name')">
        </td>
      </tr>
      <tr>
        <td>
          Select
        </td>
        <td>
          <select id="set-name-select" @change="setMeetingField('name', select)">
            <option selected="!meeting">
              -- Select --
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <td rowspan="2">
          Date and Time
        </td>
        <td>
          Date
        </td>
        <td>
          <select id="set-day" :value="meeting.day ? meeting.day : localMeeting.day" @change="setMeetingField('day')">
            <option value="">
              Day
            </option>
            <option v-for="d in 31" :key="d" :value="d">
              {{ d }}
            </option>
          </select>
          <select id="set-month" :value="meeting.month ? meeting.month : localMeeting.month" @change="setMeetingField('month')">
            <option value="">
              Month
            </option>
            <option v-for="m in 12" :key="m" :value="m">
              {{ months[m] }}
            </option>
          </select>
          <select id="set-year" :value="meeting.year ? meeting.year : localMeeting.year" @change="setMeetingField('year')">
            <option value="">
              Year
            </option>
            <option v-for="y in 5" :key="y" :value="y + 2021">
              {{ y + 2021 }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <td>
          Time
        </td>
        <td>
          <select :value="meeting.hour" @change="setMeetingField('hour')">
            <option v-for="h in 12" :key="h" :value="h - 1">
              {{ formatTimeField(h - 1) }}
            </option>
          </select>
          <select :value="meeting.minute" @change="setMeetingField('minute')">
            <option v-for="m in 4" :key="m" :value="(m - 1) * 15">
              {{ formatTimeField((m - 1) * 15) }}
            </option>
          </select>
          <select :value="meeting.ampm" @change="setMeetingField('ampm')">
            <option value="am">
              AM
            </option>
            <option value="pm">
              PM
            </option>
          </select> (<i>Optional</i>)
        </td>
      </tr>
      <tr>
        <td>
          Facilitator
        </td>
        <td>
          Enter
        </td>
        <td>
          <input id="set-facilitator" :value="meeting.facilitator ? meeting.facilitator : localMeeting.facilitator" @keyup="setMeetingField('facilitator')">
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <button @click="createMeeting()">
            Create
          </button>
        </td>
      </tr>
    </table>
    <h2>
      Attendees
    </h2>
    <table>
      <tr>
        <td colspan="2" class="center">
          <input>
          <button>
            Add New
          </button>
        </td>
      </tr>
      <tr v-for="(attendee, index) in meeting.attendees" :key="index">
        <td>
          {{ attendee.name }} ({{ attendee.interaction }})
        </td>
        <td>
          Actions
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

import bus from '../socket.js'

export default {
  data() {
    return {
      localMeeting: {
        id: '',
        name: '',
        day: 0,
        month: 0,
        year: 0,
        hour: 0,
        minute: 0,
        ampm: 'AM',
        attendees: [],
        facilitator: ''
      },
      months: {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
      }
    }
  },
  computed: {
    meeting() {
      return this.$store.getters.getMeeting
    }
  },
  created() {
    this.setDate()
  },
  methods: {
    formatTimeField(n) {
      return n < 10 ? '0' + n : n
    },
    setDate() {
      const d = new Date()
      if (!this.localMeeting.day) {
        this.localMeeting.day = d.getDate()
      }
      if (!this.localMeeting.month) {
        this.localMeeting.month = d.getMonth() + 1
      }
      if (!this.localMeeting.year) {
        this.localMeeting.year = d.getFullYear()
      }
    },
    setMeetingField(scope, select) {
      const elem = select ? 'set-' + scope + '-select' : 'set-' + scope
      this.localMeeting[scope] = document.getElementById(elem).value
    },
    createMeeting() {
      this.localMeeting.attendees = [
        {name: 'Steve', interaction: 0},
        {name: 'Fred', interaction: 0},
        {name: 'Eric', interaction: 0}
      ]
      if (!this.localMeeting.id) {
        const id = uuidv4()
        this.localMeeting.id = id
        this.$store.dispatch('updateMeetingId', id)
      }
      localStorage.setItem('google-meet', this.localMeeting.id)
      bus.emit('sendUpdateMeeting', this.localMeeting)
    }
  }
}
</script>

<style lang="scss">

  .set-up {

    h2 {
      margin-top: 24px;
    }

    table {
      width: 100%;

      td {
        border: 1px solid #888;
        text-align: left;
        padding: 3px 6px;

        &.center {
          text-align: center;
        }

        select {
          margin: 0 2px;
        }
      }
    }
  }
</style>
