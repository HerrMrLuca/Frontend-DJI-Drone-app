<template>
  <a-layout class="flex-display" style="height: 100vh; background-color: white;">
    <div class="height100 width100 flex-column flex-justify-start flex-align-start">
      <a-row align="middle" class="pt20 pl20" style="height: 45px; width: 100vw">
        <a-col :span="1">
          <span class="fz26" style="color: #1fa3f6"><SendOutlined rotate="90"/></span>
        </a-col>
        <a-col :span="20">
          <span class="fz20 pl5">{{ drone.data.model }}</span>
        </a-col>
        <a-col :span="3">
          <span v-if="drone.data.bound_status" class="fz16" style="color: #737373">Bound</span>
          <a-button v-else type="primary" @click="onBindDevice">Bind</a-button>
        </a-col>
      </a-row>
    </div>
  </a-layout>
</template>

<script lang="ts" setup>
import { SendOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { reactive } from 'vue'
import { BindBody, bindDevice } from '/@/api/manage'
import { getRoot } from '/@/root'
import { ELocalStorageKey } from '/@/types'
import { DeviceStatus } from '/@/types/device'

const root = getRoot()

interface DeviceStatusData {
  data: DeviceStatus
}

const drone = reactive<DeviceStatusData>({
  data: JSON.parse(localStorage.getItem(ELocalStorageKey.Device)!)
})

function onBindDevice () {
  const bindParam: BindBody = {
    device_sn: drone.data.sn,
    user_id: localStorage.getItem(ELocalStorageKey.UserId)!,
    workspace_id: localStorage.getItem(ELocalStorageKey.WorkspaceId)!
  }
  bindDevice(bindParam).then(bindRes => {
    if (bindRes.code !== 0) {
      message.error('bind failed:' + bindRes.message)
      console.error(bindRes.message)
      return
    }
    drone.data.bound_status = true
    localStorage.setItem(ELocalStorageKey.Device, JSON.stringify(drone.data))
  })
}
</script>
