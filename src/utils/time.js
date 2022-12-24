import { DATE_FORMAT, DEFAULT_PLACEHOLDER } from '/@/utils/constants';
import moment from 'moment';
// 时间字符串 或者 Unix 时间戳（毫秒数）
export function formatDateTime(time, format = DATE_FORMAT) {
    return time ? moment(time, format) : DEFAULT_PLACEHOLDER;
}
// Unix 时间戳 (秒)
export function formatUnixTime(time, format = DATE_FORMAT) {
    return time ? moment.unix(time).format(format) : DEFAULT_PLACEHOLDER;
}
//# sourceMappingURL=time.js.map