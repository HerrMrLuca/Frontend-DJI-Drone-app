import { message } from 'ant-design-vue';
import { EComponentName, EPhotoType, ERouterName } from '../types';
import { CURRENT_CONFIG } from './http/config';
import { EVideoPublishType } from '../types/live-stream';
import { getRoot } from '/@/root';
const root = getRoot();
export const components = new Map();
function returnBool(response) {
    const res = JSON.parse(response);
    const isError = errorHint(res);
    if (JSON.stringify(res.data) !== '{}') {
        return isError && res.data;
    }
    return isError;
}
function returnString(response) {
    const res = JSON.parse(response);
    return errorHint(res) ? res.data : '';
}
function returnNumber(response) {
    const res = JSON.parse(response);
    return errorHint(res) ? res.data : -1;
}
function errorHint(response) {
    if (response.code !== 0) {
        message.error(response.message);
        console.error(response.message);
        return false;
    }
    return true;
}
export default {
    init() {
        const thingParam = {
            host: '',
            connectCallback: '',
            username: '',
            password: ''
        };
        components.set(EComponentName.Thing, thingParam);
        const liveshareParam = {
            videoPublishType: EVideoPublishType.VideoDemandAuxManual,
            statusCallback: 'liveStatusCallback'
        };
        components.set(EComponentName.Liveshare, liveshareParam);
        const mapParam = {
            userName: '',
            elementPreName: 'PILOT'
        };
        components.set(EComponentName.Map, mapParam);
        const wsParam = {
            host: CURRENT_CONFIG.websocketURL,
            token: '',
            connectCallback: 'wsConnectCallback'
        };
        components.set(EComponentName.Ws, wsParam);
        const apiParam = {
            host: '',
            token: ''
        };
        components.set(EComponentName.Api, apiParam);
        components.set(EComponentName.Tsa, {});
        const mediaParam = {
            autoUploadPhoto: true,
            autoUploadPhotoType: EPhotoType.Preview,
            autoUploadVideo: true
        };
        components.set(EComponentName.Media, mediaParam);
        components.set(EComponentName.Mission, {});
        return components;
    },
    getComponentParam(key) {
        return components.get(key);
    },
    setComponentParam(key, value) {
        components.set(key, value);
    },
    loadComponent(name, param) {
        return returnString(window.djiBridge.platformLoadComponent(name, JSON.stringify(param)));
    },
    unloadComponent(name) {
        return returnString(window.djiBridge.platformUnloadComponent(name));
    },
    isComponentLoaded(module) {
        return returnBool(window.djiBridge.platformIsComponentLoaded(module));
    },
    setWorkspaceId(uuid) {
        return returnString(window.djiBridge.platformSetWorkspaceId(uuid));
    },
    setPlatformMessage(platformName, title, desc) {
        return returnBool(window.djiBridge.platformSetInformation(platformName, title, desc));
    },
    getRemoteControllerSN() {
        return returnString(window.djiBridge.platformGetRemoteControllerSN());
    },
    getAircraftSN() {
        return returnString(window.djiBridge.platformGetAircraftSN());
    },
    stopwebview() {
        return returnString(window.djiBridge.platformStopSelf());
    },
    setLogEncryptKey(key) {
        return window.djiBridge.platformSetLogEncryptKey(key);
    },
    clearLogEncryptKey() {
        return window.djiBridge.platformClearLogEncryptKey();
    },
    getLogPath() {
        return returnString(window.djiBridge.platformGetLogPath());
    },
    platformVerifyLicense(appId, appKey, appLicense) {
        return returnBool(window.djiBridge.platformVerifyLicense(appId, appKey, appLicense));
    },
    isPlatformVerifySuccess() {
        return returnBool(window.djiBridge.platformIsVerified());
    },
    isAppInstalled(pkgName) {
        return returnBool(window.djiBridge.platformIsAppInstalled(pkgName));
    },
    getVersion() {
        return window.djiBridge.platformGetVersion();
    },
    // thing
    thingGetConnectState() {
        return returnBool(window.djiBridge.thingGetConnectState());
    },
    thingGetConfigs() {
        const thingParam = JSON.parse(window.djiBridge.thingGetConfigs());
        return thingParam.code === 0 ? JSON.parse(thingParam.data) : {};
    },
    // api
    getToken() {
        return returnString(window.djiBridge.apiGetToken());
    },
    setToken(token) {
        return returnString(window.djiBridge.apiSetToken(token));
    },
    getHost() {
        return returnString(window.djiBridge.apiGetHost());
    },
    // liveshare
    /**
     *
     * @param type
     * video-on-demand: 服务器点播，依赖于thing模块，具体的点播命令参见设备物模型的直播服务
     * video-by-manual：手动点播，配置好直播类型参数之后，在图传页面可修改直播参数，停止直播
     * video-demand-aux-manual: 混合模式，支持服务器点播，以及图传页面修改直播参数，停止直播
     */
    setVideoPublishType(type) {
        return returnBool(window.djiBridge.liveshareSetVideoPublishType(type));
    },
    /**
     *
     * @returns
     * type: liveshare type， 0：unknown, 1:agora, 2:rtmp, 3:rtsp, 4:gb28181
     */
    getLiveshareConfig() {
        return returnString(window.djiBridge.liveshareGetConfig());
    },
    setLiveshareConfig(type, params) {
        return window.djiBridge.liveshareSetConfig(type, params);
    },
    setLiveshareStatusCallback(callbackFunc) {
        return window.djiBridge.liveshareSetStatusCallback(callbackFunc);
    },
    getLiveshareStatus() {
        return JSON.parse(JSON.parse(window.djiBridge.liveshareGetStatus()).data);
    },
    startLiveshare() {
        return returnBool(window.djiBridge.liveshareStartLive());
    },
    stopLiveshare() {
        return returnBool(window.djiBridge.liveshareStopLive());
    },
    // WebSocket
    wsGetConnectState() {
        return returnBool(window.djiBridge.wsGetConnectState());
    },
    wsConnect(host, token, callback) {
        return window.djiBridge.wsConnect(host, token, callback);
    },
    wsDisconnect() {
        return window.djiBridge.wsConnect();
    },
    wsSend(message) {
        return window.djiBridge.wsSend(message);
    },
    // media
    setAutoUploadPhoto(auto) {
        return window.djiBridge.mediaSetAutoUploadPhoto(auto);
    },
    getAutoUploadPhoto() {
        return returnBool(window.djiBridge.mediaGetAutoUploadPhoto());
    },
    setUploadPhotoType(type) {
        return window.djiBridge.mediaSetUploadPhotoType(type);
    },
    getUploadPhotoType() {
        return returnNumber(window.djiBridge.mediaGetUploadPhotoType());
    },
    setAutoUploadVideo(auto) {
        return window.djiBridge.mediaSetAutoUploadVideo(auto);
    },
    getAutoUploadVideo() {
        return returnBool(window.djiBridge.mediaGetAutoUploadVideo());
    },
    setDownloadOwner(rcIndex) {
        return window.djiBridge.mediaSetDownloadOwner(rcIndex);
    },
    getDownloadOwner() {
        return returnNumber(window.djiBridge.mediaGetDownloadOwner());
    },
    onBackClickReg() {
        window.djiBridge.onBackClick = () => {
            if (root.$router.currentRoute.value.path === '/' + ERouterName.PILOT_HOME) {
                return false;
            }
            else {
                history.go(-1);
                return true;
            }
        };
    },
    onStopPlatform() {
        window.djiBridge.onStopPlatform = () => {
            localStorage.clear();
        };
    }
};
//# sourceMappingURL=pilot-bridge.js.map