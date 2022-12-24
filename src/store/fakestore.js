import { createStore, useStore } from 'vuex';
import { EDeviceTypeName } from '../types';
import { getLayers } from '/@/api/layer';
import { LayerType } from '/@/types/mapLayer';
const initStateFunc = () => ({
    Layers: [
        {
            name: 'default',
            id: '',
            is_distributed: true,
            elements: [],
            is_check: false,
            is_select: false,
            type: 1
        },
        {
            name: 'share',
            id: '',
            is_distributed: true,
            elements: [],
            is_check: false,
            is_select: false,
            type: 2
        }
    ],
    layerBaseInfo: {},
    drawVisible: false,
    coverList: [],
    wsEvent: {
        mapElementCreat: {},
        mapElementUpdate: {},
        mapElementDelete: {}
    },
    deviceStatusEvent: {
        deviceOnline: {},
        deviceOffline: {}
    },
    markerInfo: {
        coverMap: {},
        pathMap: {}
    },
    deviceState: {
        // remote controller, dock
        gatewayInfo: {},
        // drone
        deviceInfo: {},
        dockInfo: {},
        currentSn: '',
        currentType: ''
    },
    osdVisible: {
        sn: '',
        callsign: '',
        model: '',
        visible: false,
        gateway_sn: '',
        is_dock: false,
    },
    waylineInfo: {},
    dockInfo: {},
    hmsInfo: {},
    // 机场指令执行状态信息
    devicesCmdExecuteInfo: {}
});
const getters = {};
const mutations = {
    SET_LAYER_INFO(state, info) {
        state.Layers = info;
    },
    SET_DEVICE_INFO(state, info) {
        state.deviceState.deviceInfo[info.sn] = info.host;
        state.deviceState.currentSn = info.sn;
        state.deviceState.currentType = EDeviceTypeName.Aircraft;
    },
    SET_GATEWAY_INFO(state, info) {
        state.deviceState.gatewayInfo[info.sn] = info.host;
        state.deviceState.currentSn = info.sn;
        state.deviceState.currentType = EDeviceTypeName.Gateway;
    },
    SET_DOCK_INFO(state, info) {
        if (Object.keys(info.host).length === 0) {
            return;
        }
        if (!state.deviceState.dockInfo[info.sn]) {
            state.deviceState.dockInfo[info.sn] = info.host;
            return;
        }
        state.deviceState.currentSn = info.sn;
        state.deviceState.currentType = EDeviceTypeName.Dock;
        const dock = state.deviceState.dockInfo[info.sn];
        if (info.host.sdr) {
            dock.sdr = info.host.sdr;
            dock.media_file_detail = info.host.media_file_detail;
            return;
        }
        if (info.host.job_number !== undefined) {
            if (info.host.drone_battery_maintenance_info) {
                dock.drone_battery_maintenance_info = info.host.drone_battery_maintenance_info;
            }
            return;
        }
        const sdr = dock.sdr;
        const mediaFileDetail = dock.media_file_detail;
        state.deviceState.dockInfo[info.sn] = info.host;
        state.deviceState.dockInfo[info.sn].sdr = sdr;
        state.deviceState.dockInfo[info.sn].media_file_detail = mediaFileDetail;
    },
    SET_DRAW_VISIBLE_INFO(state, bool) {
        state.drawVisible = bool;
    },
    SET_MAP_ELEMENT_CREATE(state, info) {
        state.wsEvent.mapElementCreat = info;
    },
    SET_MAP_ELEMENT_UPDATE(state, info) {
        state.wsEvent.mapElementUpdate = info;
    },
    SET_MAP_ELEMENT_DELETE(state, info) {
        state.wsEvent.mapElementDelete = info;
    },
    SET_DEVICE_ONLINE(state, info) {
        state.deviceStatusEvent.deviceOnline = info;
    },
    SET_DEVICE_OFFLINE(state, info) {
        state.deviceStatusEvent.deviceOffline = info;
        delete state.deviceState.gatewayInfo[info.sn];
        delete state.deviceState.deviceInfo[info.sn];
        delete state.deviceState.dockInfo[info.sn];
        delete state.hmsInfo[info.sn];
        // delete state.markerInfo.coverMap[info.sn]
        // delete state.markerInfo.pathMap[info.sn]
    },
    SET_OSD_VISIBLE_INFO(state, info) {
        state.osdVisible = info;
    },
    SET_SELECT_WAYLINE_INFO(state, info) {
        state.waylineInfo = info;
    },
    SET_SELECT_DOCK_INFO(state, info) {
        state.dockInfo = info;
    },
    SET_DEVICE_HMS_INFO(state, info) {
        const hmsList = state.hmsInfo[info.sn];
        state.hmsInfo[info.sn] = info.host.concat(hmsList ?? []);
    },
    SET_DEVICES_CMD_EXECUTE_INFO(state, info) {
        if (!info.sn) {
            return;
        }
        if (state.devicesCmdExecuteInfo[info.sn]) {
            const index = state.devicesCmdExecuteInfo[info.sn].findIndex(cmdExecuteInfo => cmdExecuteInfo.biz_code === info.biz_code);
            if (index >= 0) {
                // 丢弃前面的消息
                if (state.devicesCmdExecuteInfo[info.sn][index].timestamp > info.timestamp) {
                    return;
                }
                state.devicesCmdExecuteInfo[info.sn][index] = info;
            }
            else {
                state.devicesCmdExecuteInfo[info.sn].push(info);
            }
        }
        else {
            state.devicesCmdExecuteInfo[info.sn] = [info];
        }
    }
};
const actions = {
    async getAllElement({ commit }) {
        const result = await getLayers({
            groupId: '',
            isDistributed: true
        });
        commit('SET_LAYER_INFO', result.data?.list);
        console.log(result);
    },
    updateElement({ state }, content) {
        const key = content.id.replaceAll('resource__', '');
        const type = content.type;
        const layers = state.Layers;
        const layer = layers.find(item => item.id === key);
        if (layer) {
            layer[type] = content.bool;
        }
    },
    setLayerInfo({ state }, layers) {
        // const layers = state.Layers
        const obj = {};
        layers.forEach(layer => {
            if (layer.type === LayerType.Default) {
                obj.default = layer.id;
            }
            else {
                if (layer.type === LayerType.Share) {
                    obj.share = layer.id;
                }
            }
        });
        state.layerBaseInfo = obj;
        console.log('state.layerBaseInfo', state.layerBaseInfo);
    },
    getLayerInfo({ state }, id) {
        return state.layerBaseInfo[id];
    }
};
const storeOptions = {
    state: initStateFunc,
    getters,
    mutations,
    actions
};
const rootStore = createStore(storeOptions);
export default rootStore;
export const storeKey = Symbol('');
export function useMyFakeStore() {
    return useStore(storeKey);
}
//# sourceMappingURL=fakestore.js.map