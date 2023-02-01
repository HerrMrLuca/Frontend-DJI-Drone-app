<template>
  <div class="mt20" id="livestream" >
    <div id="player" :class="{fullscreen: fullscreen}">
      <button @click="manageFullscreen"><img></button>
    </div>
    <div class="mt20 flex-row flex-justify-center flex-align-center" style="margin-top: 5px !important;">
      <!--
      <a-button type="primary" large @click="onStart">Play</a-button>
      <a-button class="ml20" type="primary" large @click="onStop">Stop</a-button>
      -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import AgoraRTC, { IAgoraRTCClient, IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng'
import { message } from 'ant-design-vue'

import { CURRENT_CONFIG as config } from '/@/api/http/config'
import { getLiveCapacity, setLivestreamQuality, startLivestream, stopLivestream } from '/@/api/manage'
import { getRoot } from '/@/root'
import request from '/@/api/http/request'

const root = getRoot()
const fullscreen = ref(false)

const clarityList = [
  {
    value: 0,
    label: 'Adaptive'
  },
  {
    value: 1,
    label: 'Smooth'
  },
  {
    value: 2,
    label: 'Standard'
  },
  {
    value: 3,
    label: 'HD'
  },
  {
    value: 4,
    label: 'Super Clear'
  }
]

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
          console.warn('warning: get live capacity is null!!!')
          return
        }
        dronePara.livestreamSource = res.data
        dronePara.droneList = []

        console.log('live_capacity:', dronePara.livestreamSource)

        if (dronePara.livestreamSource) {
          dronePara.livestreamSource.forEach((ele: any) => {
            dronePara.droneList.push({
              label: ele.name + '-' + ele.sn,
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
})
/*
// TODO 1 check if correct
onUnmounted(() => {
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
*/
const handleError = (err: any) => {
  console.error(err)
}
const handleJoinChannel = (uid: any) => {
  agoraPara.uid = uid
}

const onStart = async () => {
  const that = this
  console.log(
    'drone parameter：',
    dronePara.droneSelected,
    dronePara.cameraSelected,
    dronePara.videoSelected,
    dronePara.claritySelected
  )
  const timestamp = new Date().getTime().toString()
  const liveTimestamp = timestamp
  if (
    dronePara.droneSelected == null ||
      dronePara.cameraSelected == null ||
      dronePara.videoSelected == null ||
      dronePara.claritySelected == null
  ) {
    message.warn('waring: not select live para!!!')
    return
  }
  agoraClient.setClientRole('audience', { level: 1 })
  if (agoraClient.connectionState === 'DISCONNECTED') {
    agoraClient
      .join(agoraPara.appid, agoraPara.channel, agoraPara.token)
  }
  livePara.videoId =
      dronePara.droneSelected +
      '/' +
      dronePara.cameraSelected +
      '/' +
      dronePara.videoSelected
  console.log(agoraPara)
  agoraPara.token = encodeURIComponent(agoraPara.token)

  livePara.url =
      'channel=' +
      agoraPara.channel +
      '&sn=' +
      dronePara.droneSelected +
      '&token=' +
      agoraPara.token +
      '&uid=' +
      agoraPara.uid

  startLivestream({
    url: livePara.url,
    video_id: livePara.videoId,
    url_type: 0,
    video_quality: dronePara.claritySelected
  })
    .then(res => {
      livePara.liveState = true
    })
    .catch(err => {
      console.error(err)
    })
}
const onStop = async () => {
  livePara.videoId =
      dronePara.droneSelected +
      '/' +
      dronePara.cameraSelected +
      '/' +
      dronePara.videoSelected
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
const onVideoSelect = (val: any) => {
  dronePara.videoSelected = val
}
const onClaritySelect = (val: any) => {
  dronePara.claritySelected = val
}
const onUpdateQuality = () => {
  if (!livePara.liveState) {
    message.info('Please turn on the livestream first.')
    return
  }
  setLivestreamQuality({
    video_id: livePara.videoId,
    video_quality: dronePara.claritySelected
  }).then(res => {
    if (res.code === 0) {
      message.success('Set the clarity to ' + clarityList[dronePara.claritySelected].label)
    }
  })
}

async function getAgoraToken () {
  fetch('https://agora-token-service-production-154d.up.railway.app/rtc/bambidrone/1/uid/123456', {
    method: 'GET'
  }).then(function (response) {
    return response.json()
  }).then(function (json) {
    console.log(json.rtcToken)
    // agoraPara.token = json.rtcToken
  })
}

function manageFullscreen () {
  if (fullscreen.value) {
    // todo switch to not smaller size
    fullscreen.value = false
  } else if (!fullscreen.value) {
    // todo switch to fullscreen
    fullscreen.value = true
  }
}
</script>

<style lang="scss" scoped>
@import '/@/styles/index.scss';
@import '/@/styles/variables.scss';

$width-player: 90vw;
$height-player: calc(90vh - (var(--bar-height)));

#player:nth-child(1n+2){
  display: none;
}

#player {
  margin: 0 auto;
  //width: 720px;
  width: $width-player;
  //height: 420px;
  height: calc(($width-player / 16) * 9); // 16:9
  border: 1px solid;
}

#player.fullscreen {
  position: fixed;
  top: 0 - var(--bar-height);

  width: 100vw;
  height: calc((100vw / 16) * 9); // 16:9
}

@media screen and (orientation: landscape) {
  #player {
    width: calc(($height-player / 9) * 16);
    height: $height-player;
  }
  #player.fullscreen {
    width: calc((100vh / 9) * 16);
    height: 100vh;
  }
}

</style>
