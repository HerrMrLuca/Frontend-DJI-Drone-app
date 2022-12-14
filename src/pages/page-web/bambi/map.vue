<template>
  <div id="app">
    <HereMap  :center="center" />
  </div>
</template>
<script lang="ts">
import 'https://js.api.here.com/v3/3.1/mapsjs-core.js'
import 'https://js.api.here.com/v3/3.1/mapsjs-service.js'
import 'https://js.api.here.com/v3/3.1/mapsjs-mapevents.js'
import 'https://js.api.here.com/v3/3.1/mapsjs-ui.js'
import 'https://js.api.here.com/v3/3.1/mapsjs-clustering.js'
import 'https://js.api.here.com/v3/3.1/mapsjs-data.js'
import HereMap from '/@/components/common/hereMap.vue'
import { computed } from 'vue'
import { useMyStore } from '/@/store'

const store = useMyStore()
const deviceInfo = computed(() => store.state.deviceState.deviceInfo)

console.log(deviceInfo.value[0].latitude + ' + ' + deviceInfo.value[0].longitude)

export default {
  name: 'app',
  components: {
    HereMap
  },
  data () {
    return {
      // we are this as prop to the HereMap component
      center: {
        lat: deviceInfo.value[0].latitude,
        lng: deviceInfo.value[0].longitude
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '/@/styles/index.scss';
@import '/@/styles/bambi.scss';

.project-app-wrapper {
  display: flex;
  transition: width 0.2s ease;
  height: 100%;
  width: 100%;

  .left {
    display: flex;
    width: 335px;
    flex: 0 0 335px;
    background-color: #232323;

    .main-content {
      flex: 1;
      color: $text-white-basic;
    }
  }

  .right {
    flex-grow: 1;
    position: relative;

    .map-wrapper{
      width: 100%;
      height: 100%;
    }

    .media-wrapper,
    .task-wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: #f6f8fa;
    }
  }
  a-layout-header {
    background: #00ee8b !important;
  }
}
</style>
