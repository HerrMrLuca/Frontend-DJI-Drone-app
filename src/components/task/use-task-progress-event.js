import EventBus from '/@/event-bus/';
import { onMounted, onBeforeUnmount } from 'vue';
export function useTaskProgressEvent(onTaskProgressWs) {
    function handleTaskProgress(payload) {
        onTaskProgressWs(payload.data);
        // eslint-disable-next-line no-unused-expressions
        // console.log('payload', payload.data)
    }
    onMounted(() => {
        EventBus.on('deviceTaskProgress', handleTaskProgress);
    });
    onBeforeUnmount(() => {
        EventBus.off('deviceTaskProgress', handleTaskProgress);
    });
}
//# sourceMappingURL=use-task-progress-event.js.map