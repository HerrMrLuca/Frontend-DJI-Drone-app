<template>
  <div class="home-view">
    <!--
        <div class="alert"></div>
        <h1>HomeView</h1>
    -->
    <div class="content">
      <div class="north">
        <p>Nordung</p>
        <p>0°</p> <!--todo 5 add nordung-->
      </div>
      <div class="gps">
        <p>RKT State</p>
        <p v-if="onlineDevices.data.length == 0">NO DEVICE</p>
        <p v-else class="num">{{ deviceInfo[onlineDevices.data[0].sn].rkt_state.gps_number }} ||
          {{ deviceInfo[onlineDevices.data[0].sn].position_state.gps_number }}</p>
        <p>Satelliten</p>
      </div>
      <div class="battery">
        <p>Batterie</p>
        <p v-if="onlineDevices.data.length == 0">NO DEVICE</p>
        <p v-else>{{ deviceInfo[onlineDevices.data[0].sn].battery.capacity_percent }}%</p>
      </div>
      <div class="storage">
        <p>Höhen</p>
        <p>100 </p>
        <p>50m Startpunkt</p>
      </div>
      <div class="height">
        <p>Höhen</p>
        <p>100 m Meeresspiegel</p>
        <p>50m Startpunkt</p>
      </div>
      <div class="coordinates">
        <p>Coordinates</p>
        <p>latitude</p>

        <p>longitude</p>
      </div>
      <div class="wind">
        <p>Wind</p>
        <p>Direction</p>
        <p>Speed</p>
      </div>
      <div class="drone-speed">
        <p>Drone Speed</p>
        <p>horizontal</p>
        <p>vertical</p>
      </div>
      <div class="flight-time">
        <p>Flight Time</p>
        <p>00:30 min</p>
        <p>vertical</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useMyStore } from '/@/store'
import { getDeviceTopo, getUnreadDeviceHms, updateDeviceHms } from '/@/api/manage'
import { EModeCode, OSDVisible } from '/@/types/device'
import { EDeviceTypeName, ELocalStorageKey } from '/@/types'
import { EHmsLevel } from '/@/types/enums'

const store = useMyStore()
const username = ref(localStorage.getItem(ELocalStorageKey.Username))
const workspaceId = ref(localStorage.getItem(ELocalStorageKey.WorkspaceId)!)
const osdVisible = ref({} as OSDVisible)
const hmsVisible = new Map<string, boolean>()

interface OnlineDevice {
  model: string,
  callsign: string,
  sn: string,
  mode: number,
  gateway: {
    model: string,
    callsign: string,
    sn: string,
    domain: string,
  },
  payload: {
    model: string
  }[]
}

const onlineDevices = reactive({
  data: [] as OnlineDevice[]
})
const onlineDocks = reactive({
  data: [] as OnlineDevice[]
})

const deviceInfo = computed(() => store.state.deviceState.deviceInfo)
const dockInfo = computed(() => store.state.deviceState.dockInfo)
const hmsInfo = computed({
  get: () => store.state.hmsInfo,
  set: (val) => {
    return val
  }
})

onMounted(() => {
  getOnlineTopo()
  setTimeout(() => {
    watch(() => store.state.deviceStatusEvent,
      data => {
        getOnlineTopo()
        if (data.deviceOnline.sn) {
          getUnreadHms(data.deviceOnline.sn)
        }
      },
      {
        deep: true
      }
    )
    getOnlineDeviceHms()
  }, 3000)
})

function getOnlineTopo () {
  getDeviceTopo(workspaceId.value).then((res) => {
    if (res.code !== 0) {
      return
    }
    onlineDevices.data = []
    onlineDocks.data = []
    res.data.forEach((val: any) => {
      const gateway = val.gateways_list.pop()
      const device: OnlineDevice = {
        model: val.device_name,
        callsign: val.nickname,
        sn: val.device_sn,
        mode: EModeCode.Disconnected,
        gateway: {
          model: gateway?.device_name,
          callsign: gateway?.nickname,
          sn: gateway?.device_sn,
          domain: gateway?.domain
        },
        payload: []
      }
      val.payloads_list.forEach((payload: any) => {
        device.payload.push({
          model: payload.payload_name
        })
      })
      if (gateway && EDeviceTypeName.Dock === gateway.domain) {
        hmsVisible.set(device.sn, false)
        hmsVisible.set(device.gateway.sn, false)
        onlineDocks.data.push(device)
      }
      if (val.status && EDeviceTypeName.Gateway === gateway.domain) {
        onlineDevices.data.push(device)
      }
    })
  })
}

function getUnreadHms (sn: string) {
  getUnreadDeviceHms(workspaceId.value, sn).then(res => {
    if (res.data.length !== 0) {
      hmsInfo.value[sn] = res.data
    }
  })
  console.info(hmsInfo.value)
}

function getOnlineDeviceHms () {
  const snList = Object.keys(dockInfo.value)
  if (snList.length === 0) {
    return
  }
  snList.forEach(sn => {
    getUnreadHms(sn)
  })
  const deviceSnList = Object.keys(deviceInfo.value)
  if (deviceSnList.length === 0) {
    return
  }
  deviceSnList.forEach(sn => {
    getUnreadHms(sn)
  })
}

// todo 2 add little animation for warning and alert
</script>

<style lang="scss" scoped>
@import "/@/styles/variables.scss";

p{
  margin: 0;
  color: black;
}

.home-view {
  width: 100%;
  height: calc(100% - (2 * $bottom-bar-height));
  border: $bambi-nat-ultralight 3px solid;
  background-color: $bambi-nat-ultralight;

  padding: 5%;

  overflow-y: scroll;

  .content {
    width: 100%;
    height: auto;
    display: grid;
    max-width: 500px;
    grid-template-columns: repeat(12, 8.333%);
    row-gap: 5vh;

    .north {
      grid-column: 1/4;
    }

    .gps{
      grid-column: 5/8;
    }

    .battery{
      grid-column: 1/4;
    }

    .storage{
      grid-column: 5/8;
    }

    .height{
      grid-column: 1/5;
    }

    .coordinates{
      grid-column: 6/13;
    }

    .wind{
      grid-column: 1/6;
    }

    .drone-speed{
      grid-column: 7/13;
    }

    .flight-time{
      grid-column: 1/13;
    }

    div {
      background-color: white;
      text-align: center;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      box-shadow: 1px 1px 5px rgba(175, 230, 173, 0.78);
    }

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}

.warning{
  border-color: orange;
  $shadow: inset 0 0 30px orange;

  -webkit-box-shadow: $shadow;
  -moz-box-shadow: $shadow;
  box-shadow: $shadow;

  //todo 2 add little animation for warning and alert
}

.alert{
  border-color: red;
}

</style>
