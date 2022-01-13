<template>
  <div class="scope">
    <div class="tab" @click="setTab('setup')">
      Set Up
    </div>
    <div class="tab" @click="setTab('meeting')">
      Meeting
    </div>
    <div class="tab" @click="setTab('graph')">
      Results
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    setTab(tab) {
      this.$store.dispatch('setTab', tab)
    }
  }
}
</script>

<style lang="scss">
  .scope {

    .tab {
      width: 100px;
      text-align: center;
      border: 1px solid;
      display: inline-block;
      margin: 6px;
    }
  }
</style>
