import EventBus from '/@/event-bus/';
import { onMounted, onBeforeUnmount } from 'vue';
export function useDeviceUpgradeEvent(onDeviceUpgradeWs) {
    function handleDeviceUpgrade(payload) {
        onDeviceUpgradeWs(payload.data);
        // eslint-disable-next-line no-unused-expressions
        // console.log('payload', payload.data)
    }
    onMounted(() => {
        EventBus.on('deviceUpgrade', handleDeviceUpgrade);
    });
    onBeforeUnmount(() => {
        EventBus.off('deviceUpgrade', handleDeviceUpgrade);
    });
}
//# sourceMappingURL=use-device-upgrade-event.js.map