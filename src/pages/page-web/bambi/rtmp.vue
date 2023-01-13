<template>
  <div>
    <video ref="video"></video>
  </div>
</template>

<script>
import MSE from 'mse.js';
import {CURRENT_CONFIG as config} from "/@/api/http/config";
export default {
  name: "rtmp",
  mounted() {
    this.player = new MSE.Player(this.$refs.video, config.rtmpURL + new Date().getTime().toString());
  },
  methods: {
    startPlayback() {
      this.player.play();
    },
  },
}
</script>

<style scoped>

</style>
