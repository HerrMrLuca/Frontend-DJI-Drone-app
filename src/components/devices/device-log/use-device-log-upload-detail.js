import { bytesToSize } from '/@/utils/bytes';
import { formatUnixTime } from '/@/utils/time';
import { DATE_FORMAT_MINUTE } from '/@/utils/constants';
export function useDeviceLogUploadDetail() {
    function getLogTime(deviceLog) {
        const startTime = formatUnixTime(deviceLog.start_time, DATE_FORMAT_MINUTE);
        const endTime = formatUnixTime(deviceLog.end_time, DATE_FORMAT_MINUTE);
        return `${startTime} — ${endTime}`;
    }
    function getLogSize(size) {
        return bytesToSize(size);
    }
    return {
        getLogTime,
        getLogSize
    };
}
//# sourceMappingURL=use-device-log-upload-detail.js.map