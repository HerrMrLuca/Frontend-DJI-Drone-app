import EventBus from '/@/event-bus/';
import { onMounted, onBeforeUnmount } from 'vue';
export function useDeviceLogUploadProgressEvent(onDeviceLogUploadWs) {
    function handleDeviceLogUploadProgress(payload) {
        onDeviceLogUploadWs(payload.data);
        // eslint-disable-next-line no-unused-expressions
        // console.log('payload', payload.data)
    }
    onMounted(() => {
        EventBus.on('deviceLogUploadProgress', handleDeviceLogUploadProgress);
    });
    onBeforeUnmount(() => {
        EventBus.off('deviceLogUploadProgress', handleDeviceLogUploadProgress);
    });
}
//# sourceMappingURL=use-device-log-upload-progress-event.js.map