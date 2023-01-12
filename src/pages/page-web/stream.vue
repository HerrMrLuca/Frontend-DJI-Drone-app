<template>
  <div class="stream">
    <div class="content">
      <livestream-agora/>
    </div>
    <br>
  </div>
</template>

<script lang="ts" setup>
import LivestreamAgora from '/@/components/livestream-agora.vue'
import { computed, reactive, ref } from 'vue'
import { ELocalStorageKey } from '/@/types'
import { getDeviceTopo, getLiveCapacity, getPlatformInfo, getUserInfo } from '/@/api/manage'

/* region testing get-functions and content */

const workspaceId = ref(localStorage.getItem(ELocalStorageKey.WorkspaceId)!)
const userId = ref(localStorage.getItem(ELocalStorageKey.UserId)!)
const device = ref(localStorage.getItem(ELocalStorageKey.Device)!)
const deviceInfo = reactive(() => store.state.deviceState.deviceInfo)

const state = reactive({
  currentType: '',
  coverIndex: 0
})

/* fuck i have to figure this shit out somehow

const deviceInfo = reactive({
  gateway: {
    capacity_percent: str,
    transmission_signal_quality: str,
  } as GatewayOsd,
  dock: {
    media_file_detail: {
      remain_upload: 0
    },
    sdr: {
      up_quality: str,
      down_quality: str,
      frequency_band: -1,
    },
    network_state: {
      type: 0,
      quality: 0,
      rate: 0,
    },
    drone_in_dock: 0,
    drone_charge_state: {
      state: 0,
      capacity_percent: str,
    },
    rainfall: str,
    wind_speed: str,
    environment_temperature: str,
    environment_humidity: str,
    temperature: str,
    humidity: str,
    job_number: 0,
    acc_time: 0,
    first_power_on: 0,
    positionState: {
      gps_number: str,
      is_fixed: 0,
      rtk_number: str,
      is_calibration: 0,
      quality: 0,
    },
    storage: {
      total: 0,
      used: 0,
    },
    electric_supply_voltage: 0,
    working_voltage: str,
    working_current: str,
    backup_battery_voltage: 0,
    mode_code: -1,
    cover_state: -1,
    supplement_light_state: -1,
    putter_state: -1,

  } as DockOsd,
  device: {
    gear: -1,
    mode_code: EModeCode.Disconnected,
    height: str,
    home_distance: str,
    horizontal_speed: str,
    vertical_speed: str,
    wind_speed: str,
    wind_direction: str,
    elevation: str,
    position_state: {
      gps_number: str,
      is_fixed: 0,
      rtk_number: str
    },
    battery: {
      capacity_percent: str,
      landing_power: str,
      remain_flight_time: 0,
      return_home_power: str,
    },
    latitude: 0,
    longitude: 0,
  } as DeviceOsd
})

 */

console.log('start workspaceId log')
console.log(workspaceId.value)
console.log('end workspaceId log')

console.log('start userId log')
console.log(userId.value)
console.log('end userId log')

console.log('start device log')
console.log(device.value)
console.log('end device log')

console.log('start getDeviceTopo')
const test1 = getDeviceTopo(workspaceId.value)
console.log(test1)
console.log('end getDeviceTopo')

console.log('start getLiveCapacity')
const test2 = getLiveCapacity(workspaceId.value)
console.log(test2)
console.log('end getLiveCapacity')

// console.log('start getAllUsersInfo')
// const test3 = getAllUsersInfo(workspaceId.value, )
// console.log(test3)
// console.log('end getAllUsersInfo')

console.log('start getPlatformInfo')
const test4 = getPlatformInfo()
console.log(test4)
console.log('end getPlatformInfo')

console.log('start getUserInfo')
const test5 = getUserInfo()
console.log(test5)
console.log('end getUserInfo')

/* endregion */
</script>

<style lang="scss" scoped>
@import "/@/styles/variables.scss";

.stream {
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    > div { //divs with content
      background-color: white;
      text-align: center;

      width: 100%;
      height: 100%;

      border-radius: 1em;
      border-color: $bambi-stroke-light;
      box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0, rgba(0, 0, 0, 0.06) 0 1px 2px 0; //#36
      padding: 1em;
    }

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
</style>
