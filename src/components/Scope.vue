<template>
  <div class="scope">
    <div class="tab" @click="setTab('setup')">
      Set Up
    </div>
    <div class="tab" @click="setTab('meeting')">
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

<style lang="scss">
  .scope {

    .tab {
      width: 200px;
      text-align: center;
      border: 1px solid;
      display: inline-block;
      margin: 6px;
    }
  }
</style>
