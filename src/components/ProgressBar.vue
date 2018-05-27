<template>
  <div :class="{show:show,error:error}" :style="{'width': `${percent}%`}" />
</template>

<script>
export default {
  data: () => ({
    percent: 0,
    show: false,
    error: false,
    _timer: null
  }),
  methods: {
    start () {
      this.show = true
      this.percent = 0
      this._timer = setInterval(() => {
        this.percent++
      }, 100)
    },
    finish () {
      this.show = false
      this.percent = 100
      clearInterval(this._timer)
      this._timer = null
    },
    fail () {
      this.error = true
      this.percent = 100
    }
  }
}
</script> 

<style>
.error {
  color: red;
}
.show {
  display: block;
}
</style>

