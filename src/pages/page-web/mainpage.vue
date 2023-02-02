<template>
  <div id="main-page" class="width-100" :class="{fullscreen: fullscreen}">
    <div class="top-bar">
      <MyTopbar/>
    </div>
    <div class="content">
      <router-view>

      </router-view>
    </div>
    <div class="bottom-bar">
      <BottomBar/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BottomBar from '/@/components/common/bottombar.vue'
import MyTopbar from '/@/components/common/topbar.vue'

// region ---------------------------- workspace copy code ----------------------------
import { getRoot } from '/@/root'
import { useMyStore } from '/@/store'
import { EBizCode } from '/@/types'
import { useConnectWebSocket } from '/@/hooks/use-connect-websocket'
import { onMounted, onUpdated, ref } from 'vue'

const root = getRoot()
const store = useMyStore()

const fullscreen = ref(false)
let buttonLivestream: any = null
let wrapperCheck: any = null // to determine if diff page was loaded

function checkButton () {
  wrapperCheck = document.getElementsByClassName('livestream-wrapper')
  console.log(wrapperCheck)
  if (wrapperCheck.length !== 0) {
    if (!buttonLivestream) { // not found yet
      buttonLivestream = document.getElementById('playerButton') // try get
      if (buttonLivestream) { // if not null
        buttonLivestream.addEventListener('click', () => {
          fullscreen.value = !fullscreen.value
          console.log('fullscreen.value =' + fullscreen.value)
        })
      }
    }
  } else {
    buttonLivestream = null
    fullscreen.value = false
  }
  console.log('end of function ' + fullscreen.value + '  ' + buttonLivestream)
}

const messageHandler = async (payload: any) => {
  if (!payload) {
    return
  }

  switch (payload.biz_code) {
    case EBizCode.GatewayOsd: {
      store.commit('SET_GATEWAY_INFO', payload.data)
      break
    }
    case EBizCode.DeviceOsd: {
      store.commit('SET_DEVICE_INFO', payload.data)
      break
    }
    case EBizCode.DockOsd: {
      store.commit('SET_DOCK_INFO', payload.data)
      break
    }
    case EBizCode.MapElementCreate: {
      store.commit('SET_MAP_ELEMENT_CREATE', payload.data)
      break
    }
    case EBizCode.MapElementUpdate: {
      store.commit('SET_MAP_ELEMENT_UPDATE', payload.data)
      break
    }
    case EBizCode.MapElementDelete: {
      store.commit('SET_MAP_ELEMENT_DELETE', payload.data)
      break
    }
    case EBizCode.DeviceOnline: {
      store.commit('SET_DEVICE_ONLINE', payload.data)
      break
    }
    case EBizCode.DeviceOffline: {
      store.commit('SET_DEVICE_OFFLINE', payload.data)
      break
    }
    case EBizCode.FlightTaskProgress: {
      store.commit('SET_FLIGHT_TASK_PROGRESS', payload.data)
      break
    }
    case EBizCode.DeviceHms: {
      store.commit('SET_DEVICE_HMS_INFO', payload.data)
      break
    }
    case EBizCode.DeviceReboot:
    case EBizCode.DroneOpen:
    case EBizCode.DroneClose:
    case EBizCode.CoverOpen:
    case EBizCode.CoverClose:
    case EBizCode.PutterOpen:
    case EBizCode.PutterClose:
    case EBizCode.ChargeOpen:
    case EBizCode.ChargeClose:
    case EBizCode.DeviceFormat:
    case EBizCode.DroneFormat: {
      store.commit('SET_DEVICES_CMD_EXECUTE_INFO', {
        biz_code: payload.biz_code,
        timestamp: payload.timestamp,
        ...payload.data,
      })
      break
    }
    default:
      break
  }
}

// Auf WebSocket-Nachrichten warten
useConnectWebSocket(messageHandler)
// endregion

onMounted(() => {
  checkButton()
})

onUpdated(() => {
  checkButton()
})

</script>

<style lang="scss" scoped>
//@import '/@/styles/index.scss';
@import '/@/styles/variables.scss';

@media screen and (orientation: landscape) and (min-width: 1500px) {
  $bottom-bar-height: 80px;
}

p {
  margin-bottom: 0;
}

#main-page {
  position: fixed;
  display: grid;
  height: 100%;
  grid-template-rows:var(--bar-height) calc(100% - (2 * var(--bar-height))) var(--bar-height);

  .top-bar,
  .bottom-bar {
    display: block;
  }
}

#main-page.fullscreen {
  grid-template-rows: 1fr;

  .top-bar,
  .bottom-bar {
    display: none;
  }

  .content {
    width: 100vw;
    height: 100vh;
  }
}

.fontBold {
  font-weight: 500;
  font-size: 18px;
}

.top-bar {
  height: var(--bar-height);
  z-index: 50;
  width: 100%;
  grid-row: 1/2;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
  clip-path: inset(-5px 0px -5px -5px);
}

.content {
  height: 100%;
  grid-row: 2/3;
  overflow-y: auto;
}

.bottom-bar {
  height: var(--bar-height);
  z-index: 100;
  grid-row: 3/4;
  background-color: $bambi-white;
  width: 100%;
  overflow: hidden;
}

@media screen and (orientation: landscape) {
  #main-page {
    grid-template-rows: var(--bar-height) calc(100% - var(--bar-height));
    grid-template-columns: 50% 50%;

    .bottom-bar {
      grid-row: 1/2;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
      clip-path: inset(-5px -5px -5px 0px);
    }
  }

  .content {
    grid-column: 1/3;
  }
}

</style>
