<template>
  <div class="home-view">
    <div class="content">

      <div class="north content-warning">
        <div class="content-container">
          <div class="icon-container north">
            <img :src="compass" alt="icon of compass" class="home-icon compass">
          </div>
          <p v-if="check">--°</p>
          <p v-else class="num">359°</p> <!--todo 5 add nordung-->
        </div>
        <h5>Nordung</h5>
      </div>

      <div class="gps">
        <div>
          <p v-if="check">--</p>
          <p v-else class="num">20
            <!--
            {{ deviceInfo[onlineDevices.data[0].sn].rkt_state.gps_number }} ||
            {{ deviceInfo[onlineDevices.data[0].sn].position_state.gps_number }}
            -->
            <span class="unit">Satelliten</span>
          </p>
        </div>
        <h5>RKT State</h5>
      </div>

      <div class="battery content-alert">
        <div class="content-container">
          <div class="icon-container">
            <img :src="battery" class="home-icon" alt="icon of battery">
          </div>
          <p v-if="check">--%</p>
          <p v-else class="num">100
            <!--          {{ deviceInfo[onlineDevices.data[0].sn].battery.capacity_percent }}-->
            <span class="unit">%</span>
          </p>
        </div>
        <h5>Batterie</h5>
      </div>

      <div class="storage">
        <div class="content-container">
          <div class="icon-container">
            <img :src="storage" class="home-icon" alt="icon of storage">
          </div>
          <p v-if="check">--%</p>
          <p v-else class="num">100 <!--  {{ storage_percent }}  todo 5 calc storage_percent with every update-->
            <span class="unit">%</span>
          </p>
        </div>
        <h5>Storage</h5>
      </div>

      <div class="height">
        <div>
          <h6>height</h6>
          <p v-if="check">0,0</p>
          <p v-else class="num">200 <!--todo 5 fill-->
            <span class="unit">m</span>
          </p>
        </div>

        <div>
          <h6>elevation</h6>
          <p v-if="check">0,0</p>
          <p v-else class="num">150 <!--todo 5 fill-->
            <span class="unit">m</span>
          </p>
        </div>
        <h5>Höhen</h5>
      </div>

      <div class="coordinates">
        <div class="latitude">
          <h6>latitude</h6>
          <p v-if="check">0,0</p>
          <p v-else class="num">-23,423239</p>
        </div>

        <div class="longitude">
          <h6>longitude</h6>
          <p v-if="check">0,0</p>
          <p v-else class="num">-11,111118</p>
        </div>
        <h5>Coordinates</h5>
      </div>

      <div class="wind">
        <div class="wind-dir"> <!--todo check with icon and rotation
          {"1":"North","2":"Northeast","3":"East","4":"Southeast","5":"South","6":"Southwest","7":"West","8":"Northwest"} -->
          <h6>Direction</h6>
          <p v-if="check">--</p>
          <p v-else class="num">

          </p>
        </div>
        <div class="wind-speed">
          <h6>Speed</h6>
          <p v-if="check">--</p>
          <p v-else class="num">20 <!--todo 5 fill-->
            <span class="unit">km/h</span>
          </p>
        </div>
        <h5>Wind</h5>
      </div>

      <div class="drone-speed">
        <div class="speed-horizontal">
          <h6>horizontal</h6>
          <p v-if="check">--</p>
          <p v-else class="num">10 <!--todo 5 fill-->
            <span class="unit">km/h</span>
          </p>
        </div>
        <div class="speed-vertical">
          <h6>vertical</h6>
          <p v-if="check">--</p>
          <p v-else class="num">30  <!--todo 5 fill-->
            <span class="unit">km/h</span></p>
        </div>
        <h5>Drone Speed</h5>
      </div>

      <div class="flight-time">
        <div class="since-start">
          <p v-if="check">--:--</p>
          <p v-else class="num">00:30</p>
          <h6>since start</h6>
        </div>
        <div class="remaining-flight-time">
          <p v-if="check">--:--</p>
          <p v-else class="num">20:30</p>
          <h6>remaining (battery)</h6>
        </div>
        <h5>Flight Time</h5>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import battery from '/@/assets/icons/icons_homeview/battery.png'
import compass from '/@/assets/icons/icons_homeview/compass 1.png'
import storage from '/@/assets/icons/icons_homeview/micro-sd-karte.png'

// region ---------------------------- tsa copy code ----------------------------
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useMyStore } from '/@/store'
import { getDeviceTopo, getUnreadDeviceHms } from '/@/api/manage'
import { EModeCode, OSDVisible } from '/@/types/device'
import { EDeviceTypeName, ELocalStorageKey } from '/@/types'

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

// endregion

const storage_percent = ref(0)
const check = ref(false)

// todo 2 add little animation for warning and alert
// TODO 5 review grid -> row-gap and col-gap and space it to 6
</script>

<style lang="scss" scoped>
@import "/@/styles/variables.scss";

$num-font-size: 1.1rem;

p,
h5,
h6 {
  margin: 0; //reset
  color: black;
  font-family: 'Open Sans', sans-serif;
  //font-family: 'Fredoka', sans-serif;
}

h6 {
  font-size: 12px;
}

h5 {
  font-size: 14px;
  font-weight: 300;
  text-align: center;
}

img {
  width: 100%;
  height: auto;
}

.num {
  font-feature-settings: "tnum";
  font-size: $num-font-size;
}

.unit {
  color: $bambi-shade-darker-1;
  font-size: 10px;
}

.home-view {
  width: 100%;
  height: calc(100% - (2 * $bottom-bar-height));
  border: $bambi-white 3px solid;
  background-color: $bambi-white;

  padding: 2vw;

  overflow-y: scroll;

  .content {
    width: 100%;
    height: auto;
    display: grid;
    max-width: 500px;
    row-gap: min(2vw, 2.5em);
    column-gap: min(2vw, 2.5em);
    grid-template-columns: repeat(8, 1fr);
    grid-auto-rows: 1fr;

    //region grid layout
    .north,
    .battery{
      grid-column: 1/3;
    }

    .gps,
    .storage{
      grid-column: 3/5;
    }

    .height {
      grid-column: 1/5;
    }

    .coordinates {
      grid-column: 5/9;
    }

    .wind {
      grid-column: 1/5;
    }

    .drone-speed {
      grid-column: 5/9;
    }

    .flight-time {
      grid-column: 1/9;
    }

    //endregion

    > div { //divs with content
      background-color: white;
      text-align: center;

      width: 100%;
      height: 100%;

      border-radius: 10px;
      border-color: $bambi-stroke-light;

      //region box shadow
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px; //#36
      //box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px; //76
      //box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px; //35
      //box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; //0
      //box-shadow: 1px 1px 5px $bambi-shade-darker-4;
      //note -> for examples https://getcssscan.com/css-box-shadow-examples
      //endregion

      padding: 0.4rem 0.5rem;

      //children
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      h5 {
        width: 100%; //grow all h5 element
        align-self: flex-start;
        order: -1;
      }

      .content-container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        gap: 0.5em;

        p{
          flex-shrink: 0;
        }

        .icon-container.north { //change size for pfeil

        }
      }
    }

    .content-warning{
      background-color: $bambi-warning-color;

      // TODO maybe also change styles
    }
    .content-alert{
      background-color: $bambi-alert-color;
      .unit,
      h5,
      .num{
        color: white;
      }
      img{
        filter: invert(100%);
      }
    }

    .north,
    .gps,
    .battery,
    .storage {
      div {
        width: 100%;
      }
    }

    .coordinates,
    .wind,
    .drone-speed,
    .flight-time,
    .height {
      justify-content: space-evenly;
      h5{
        text-align: left;
      }
    }

    .latitude, .longitude {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}

.warning {
  border-color: $bambi-warning-color;
  $shadow: inset 0 0 30px $bambi-warning-color;

  -webkit-box-shadow: $shadow;
  -moz-box-shadow: $shadow;
  box-shadow: $shadow;

  //todo 2 add little animation for warning and alert
}

.alert {
  border-color: $bambi-alert-color;
}

</style>
