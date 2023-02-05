<!--<template>-->
<!--  <div id="livestream">-->
<!--    <div id="player" :class="{fullscreen: fullscreen}">-->
<!--      <button id="playerButton" @click="manageFullscreen"><img :src="expand"></button>-->
<!--    </div>-->
<!--    <a-button large type="primary" @click="onStart">Play</a-button>-->
<!--    <a-button class="ml20" large type="primary" @click="onStop">Stop</a-button>-->
<!--  </div>-->
<!--</template>-->

<template>
  <div id="livestream">
    <div id="player" :class="{fullscreen: fullscreen}">
      <button id="playerButton" @click="manageFullscreen"><img :src="expand"></button>
    </div>
    <div class="flex-row">
      <a-select
        placeholder="Select Drone"
        style="width:150px"
        @select="onDroneSelect"
      >
        <a-select-option
          v-for="item in dronePara.droneList"
          :key="item.value"
          :value="item.value"
        >{{ item.label }}
        </a-select-option>
      </a-select>
      <a-select
        class="ml10"
        placeholder="Select Camera"
        style="width:150px"
        @select="onCameraSelect"
      >
        <a-select-option
          v-for="item in dronePara.cameraList"
          :key="item.value"
          :value="item.value"
        >{{ item.label }}
        </a-select-option>
      </a-select>
    </div>
    <div>
      <button large type="primary" @click="onStart">Play</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import AgoraRTC, { IAgoraRTCClient, IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng'
import { message } from 'ant-design-vue'

import { CURRENT_CONFIG as config } from '/@/api/http/config'
import { getLiveCapacity, startLivestream, stopLivestream } from '/@/api/manage'
import { getRoot } from '/@/root'
import expand from '/@/assets/icons/expand.png'

const root = getRoot()
const fullscreen = ref(false)

let agoraClient = {} as IAgoraRTCClient
const agoraPara = reactive({
  appid: config.agoraAPPID,
  token: config.agoraToken,
  channel: config.agoraChannel,
  uid: 123456,
  stream: {}
})
const dronePara = reactive({
  livestreamSource: [],
  droneList: [] as any[],
  cameraList: [] as any[],
  videoList: [] as any[],
  droneSelected: '',
  cameraSelected: '',
  videoSelected: '',
  claritySelected: 0
})
const livePara = reactive({
  url: '',
  webrtc: {} as any,
  videoId: '',
  liveState: false
})

const onRefresh = async () => {
  dronePara.droneList = []
  dronePara.cameraList = []
  dronePara.videoList = []
  dronePara.droneSelected = ''
  dronePara.cameraSelected = ''
  dronePara.videoSelected = ''
  await getLiveCapacity({})
    .then(res => {
      if (res.code === 0) {
        if (res.data === null) {
          console.warn('warning: get live capacity is null!')
          return
        }
        dronePara.livestreamSource = res.data
        dronePara.droneList = []

        console.log('live_capacity:', dronePara.livestreamSource)

        if (dronePara.livestreamSource) {
          dronePara.livestreamSource.forEach((ele: any) => {
            dronePara.droneList.push({
              label: `${ele.name}-${ele.sn}`,
              value: ele.sn
            })
            dronePara.droneSelected = ele.sn
            dronePara.cameraSelected = '53-0-0'
            dronePara.videoSelected = 'zoom-0'
          })
        }
      }
    })
    .catch(error => {
      console.error(error)
    })
}

onMounted(() => {
  getAgoraToken()
  onRefresh()
  agoraClient = AgoraRTC.createClient({
    mode: 'live',
    codec: 'vp8'
  })
  // Subscribe when a remote user publishes a stream
  agoraClient.on('user-joined', async (user: IAgoraRTCRemoteUser) => {
    message.info('user[' + user.uid + '] join')
  })
  agoraClient.on('user-published', async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
    await agoraClient.subscribe(user, mediaType)
    if (mediaType === 'video') {
      console.log('subscribe success')
      // Get `RemoteVideoTrack` in the `user` object.
      const remoteVideoTrack = user.videoTrack!
      // Dynamically create a container in the form of a DIV element for playing the remote video track.
      const remotePlayerContainer: any = document.getElementById('player')
      // remotePlayerContainer.id = agoraPara.uid
      remoteVideoTrack.play(remotePlayerContainer)
    }
  })
  agoraClient.on('user-unpublished', async (user: any) => {
    console.log('unpublish live:', user)
    message.info('unpublish live')
  })
  onStart()
  console.log(dronePara)
})

onBeforeUnmount(() => {
  onStop()
  // Subscribe when a remote user publishes a stream
  agoraClient.on('user-left', async (user: IAgoraRTCRemoteUser) => {
    message.info('user[' + user.uid + '] join')
  })
  agoraClient.on('user-left', async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
    await agoraClient.unsubscribe(user, mediaType)
    if (mediaType === 'video') {
      console.log('subscribe success')
      // Get `RemoteVideoTrack` in the `user` object.
      const remoteVideoTrack = user.videoTrack!
      // remotePlayerContainer.id = agoraPara.uid
      remoteVideoTrack.stop()
    }
  })
})

const onStart = async () => {
  console.log(
    'drone parameter：',
    dronePara.droneSelected,
    dronePara.cameraSelected,
    dronePara.videoSelected,
    dronePara.claritySelected
  )
  if (
    dronePara.droneSelected == null ||
    dronePara.cameraSelected == null ||
    dronePara.videoSelected == null ||
    dronePara.claritySelected == null
  ) {
    message.warn('waring: not select live para!!!')
    return
  }
  await agoraClient.setClientRole('audience', { level: 1 })
  if (agoraClient.connectionState === 'DISCONNECTED') {
    await agoraClient.join(agoraPara.appid, agoraPara.channel, agoraPara.token)
  }
  livePara.videoId = `${dronePara.droneSelected}/${dronePara.cameraSelected}/${dronePara.videoSelected}`
  console.log(agoraPara)
  agoraPara.token = encodeURIComponent(agoraPara.token)

  livePara.url = `channel=${agoraPara.channel}&sn=${dronePara.droneSelected}&token=${agoraPara.token}&uid=${agoraPara.uid}`

  startLivestream({
    url: livePara.url,
    video_id: livePara.videoId,
    url_type: 0,
    video_quality: dronePara.claritySelected
  })
    .then(() => {
      livePara.liveState = true
    })
    .catch(err => {
      console.error(err)
    })
}
const onStop = async () => {
  livePara.videoId = `${dronePara.droneSelected}/${dronePara.cameraSelected}/${dronePara.videoSelected}`
  stopLivestream({
    video_id: livePara.videoId
  }).then(res => {
    if (res.code === 0) {
      message.success(res.message)
    }
    livePara.liveState = false
    console.log('stop play livestream')
  })
}
const onDroneSelect = (val: any) => {
  dronePara.droneSelected = val
  if (dronePara.droneSelected) {
    const droneTemp = dronePara.livestreamSource
    dronePara.cameraList = []

    droneTemp.forEach((ele: any) => {
      const drone = ele
      if (drone.cameras_list && drone.sn === dronePara.droneSelected) {
        const cameraListTemp = drone.cameras_list
        cameraListTemp.forEach((ele: any) => {
          dronePara.cameraList.push({
            label: ele.name,
            value: ele.index
          })
        })
      }
    })
  }
}
const onCameraSelect = (val: any) => {
  dronePara.cameraSelected = val

  if (dronePara.cameraSelected) {
    const droneTemp = dronePara.livestreamSource
    droneTemp.forEach((ele: any) => {
      const drone = ele
      if (drone.sn === dronePara.droneSelected) {
        const cameraListTemp = drone.cameras_list
        cameraListTemp.forEach((ele: any) => {
          const camera = ele
          if (camera.index === dronePara.cameraSelected) {
            const videoListTemp = camera.videos_list
            dronePara.videoList = []
            videoListTemp.forEach((ele: any) => {
              dronePara.videoList.push({
                label: ele.type,
                value: ele.index
              })
            })
            dronePara.videoSelected = dronePara.videoList[0]?.value
          }
        })
      }
    })
  }
}

async function getAgoraToken () {
  // fetch('https://agora-token-service-production-154d.up.railway.app/rtc/bambidrone/1/uid/123456', {
  fetch(`https://agora-token-service-production-154d.up.railway.app/rtc/${agoraPara.channel}/2/uid/${agoraPara.uid}`)
    .then(response => response.json())
    .then(json => {
      console.log(json.rtcToken)
      // agoraPara.token = json.rtcToken
    })
}

function manageFullscreen () {
  fullscreen.value = !fullscreen.value
}
</script>

<style lang="scss" scoped>
@import '/@/styles/index.scss';
@import '/@/styles/variables.scss';

$width-player: 90vw;
$height-player: calc(90vh - (var(--bar-height)));

img {
  display: block;
  height: 20px;
  width: 20px;
}

button {
  position: absolute;
  bottom: 3px;
  right: 3px;
  background-color: transparent;
  border: none;
  padding: 0;
}

#livestream {
  height: 100%;
  display: flex;
  justify-content: center;
}

#player:nth-child(1n+1) {
  display: none;
}

#player {
  position: relative;
  align-self: center;
  margin: 0 auto;
  //width: 720px;
  width: $width-player;
  //height: 420px;
  height: calc(($width-player / 16) * 9); // 16:9
  border: 1px solid;
}

#player.fullscreen {
  margin: 0;
  //position: fixed;
  //top: 0 - var(--bar-height);

  width: 100vw;
  height: calc((100vw / 16) * 9); // 16:9
}

@media screen and (orientation: landscape) {
  #player {
    width: calc(($height-player / 9) * 16);
    height: $height-player;
  }
  #player.fullscreen {
    height: 100vh;
    width: calc((100vh / 9) * 16);
  }
}

</style>
