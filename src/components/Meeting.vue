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
        <span :class="{'talking': attendee.name == talking.name}">{{ attendee.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      running: false,
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
    },
    stop() {
      this.running = false
      this.stopTalking()
    },
    startTalking(attendee) {
      if (this.running) {
        this.talking = attendee
      }
    },
    stopTalking() {
      this.talking = ''
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
