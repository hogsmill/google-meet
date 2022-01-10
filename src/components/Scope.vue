<template>
  <div>
    <div @click="setTab('setup')">
      Set Up
    </div>
    <div @click="setTab('meeting')">
      Meeting
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    setTab(tab) {
      console.log('setting tab to', tab)
      this.$store.dispatch('setTab', tab)
    }
  }
}
</script>
