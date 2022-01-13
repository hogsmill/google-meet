<template>
  <div class="content">
    <h1>
      Meeting
    </h1>
    <div class="controls">
      <i v-if="!running" class="fas fa-play-circle" title="start meeting" @click="start()" />
      <i v-if="running" class="fas fa-stop-circle" title="stop meeting" @click="stop()" />
    </div>
    <div>
      Meeting: {{ meeting.name }} ({{ meeting.day }}/{{ meeting.month }}/{{ meeting.year }}<span v-if="meeting.hour"> {{ meeting.hour }}:{{ meeting.minute }}{{ meeting.ampm }}</span>)
    </div>
    <div>
      <div v-for="(attendee, index) in meeting.attendees" :key="index" class="attendee">
        <i class="fas fa-user-circle" @click="startTalking(attendee)" :class="{'talking': attendee.name == talking.name}" />
        <br>
        <span :class="{'talking': attendee.name == talking.name}">{{ attendee.name }}: {{ attendee.interaction }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  data() {
    return {
      running: false,
      elapsed: 0,
      talking: ''
    }
  },
  computed: {
    meeting() {
      return this.$store.getters.getMeeting
    }
  },
  methods: {
    start() {
      this.running = true
      this.elapsed = 0
      this.recordTalking()
    },
    stop() {
      this.running = false
      this.elapsed = 0
      this.stopTalking()
    },
    startTalking(attendee) {
      if (this.running) {
        this.talking = attendee
      }
    },
    stopTalking() {
      this.talking = ''
    },
    recordTalking() {
      const self = this
      if (this.talking) {
        const attendees = []
        for (let i = 0; i < this.meeting.attendees.length; i++) {
          const attendee = this.meeting.attendees[i]
          if (attendee.name == this.talking.name) {
            attendee.interaction = attendee.interaction + 1
          }
          attendees.push(attendee)
        }
        const meeting = this.meeting
        meeting.attendees = attendees
        bus.$emit('sendUpdateMeeting', meeting)
      }
      setTimeout(function() {
        self.recordTalking()
      }, 1000)
    }
  }
}
</script>

<style lang="scss">

  .controls {
    .fas {
      font-size: xxx-large;
      color: #888;
    }
  }

  .attendee {
    float: left;
    margin: 12px;

    .talking {
      font-weight: bold;
    }

    .fas {
      font-size: 500%;
      color: #888;

      &.talking {
        color: green;
      }
    }
  }
</style>
