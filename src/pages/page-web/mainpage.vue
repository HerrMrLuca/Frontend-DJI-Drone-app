<template>
  <a-layout class="width-100 flex-display" style="height: 100vh">
    <MyTopbar />
    <router-view>

    </router-view>
    <div class="bottom-bar">
      <BottomBar />
    </div>
  </a-layout>
</template>

<script lang="ts" setup>
import BottomBar from '/@/components/common/bottombar.vue'
import MyTopbar from '/@/components/common/my-topbar.vue'

// region ---------------------------- workspace copy code ----------------------------
import { getRoot } from '/@/root'
import { useMyStore } from '/@/store'
import { EBizCode } from '/@/types'
import { useConnectWebSocket } from '/@/hooks/use-connect-websocket'

const root = getRoot()
const store = useMyStore()

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
    case EBizCode.DroneFormat:
    {
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

</script>

<style lang="scss" scoped>
//@import '/@/styles/index.scss';
@import '/@/styles/variables.scss';
.fontBold {
  font-weight: 500;
  font-size: 18px;
}

router-view{
  height: auto;
}

.bottom-bar {
  background-color: $bambi-white;
  display: block;
  position: fixed;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
</style>
