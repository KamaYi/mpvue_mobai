<template>
  <div>
    <img src="/static/images/bluetooth.jpg">
  </div>
</template>

<script>

export default {
  data: {
  },
  methods: {
   
  },
  created () {

  },
  mounted() {
    wx.setNavigationBarTitle({
      title: '蓝牙体验极速开锁'
    })
  },
}
</script>

<style scoped>
img{
  width: 100%;
  min-height: 1600px;
}
</style>
