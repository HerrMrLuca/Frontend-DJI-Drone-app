import { EComponentName, EPhotoType } from '../types'
import { CURRENT_CONFIG } from './http/config'
import { EVideoPublishType } from '../types/live-stream'

export const components = new Map()

export interface ThingParam {
  host: string,
  username: string,
  password: string,
  connectCallback: string
}

export interface LiveshareParam {
  videoPublishType: string, // video-on-demand、video-by-manual、video-demand-aux-manual
  statusCallback: string
}

export interface MapParam {
  userName: string,
  elementPreName: string
}

export interface WsParam {
  host: string,
  token: string,
  connectCallback: string
}

export interface ApiParam {
  host: string,
  token: string
}

export interface MediaParam {
  autoUploadPhoto: boolean, // 是否自动上传图片, 非必需
  autoUploadPhotoType: number, // 自动上传的照片类型，0：原图， 1：缩略图， 非必需
  autoUploadVideo: boolean // 是否自动上传视频， 非必需
}

export default {
  init (): Map<EComponentName, any> {
    const thingParam: ThingParam = {
      host: '',
      connectCallback: '',
      username: '',
      password: ''
    }
    components.set(EComponentName.Thing, thingParam)
    const liveshareParam: LiveshareParam = {
      videoPublishType: EVideoPublishType.VideoDemandAuxManual,
      statusCallback: 'liveStatusCallback'
    }
    components.set(EComponentName.Liveshare, liveshareParam)
    const mapParam: MapParam = {
      userName: '',
      elementPreName: 'PILOT'
    }
    components.set(EComponentName.Map, mapParam)
    const wsParam: WsParam = {
      host: CURRENT_CONFIG.websocketURL,
      token: '',
      connectCallback: 'wsConnectCallback'
    }
    components.set(EComponentName.Ws, wsParam)
    const apiParam: ApiParam = {
      host: '',
      token: ''
    }
    components.set(EComponentName.Api, apiParam)
    components.set(EComponentName.Tsa, {})
    const mediaParam: MediaParam = {
      autoUploadPhoto: true,
      autoUploadPhotoType: EPhotoType.Preview,
      autoUploadVideo: true
    }
    components.set(EComponentName.Media, mediaParam)
    components.set(EComponentName.Mission, {})

    return components
  },
}
