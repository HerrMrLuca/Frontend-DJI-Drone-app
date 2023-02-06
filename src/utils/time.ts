import { DATE_FORMAT, DEFAULT_PLACEHOLDER } from '/@/utils/constants'
import moment from 'moment'

export function formatUnixTime (time: number, format = DATE_FORMAT): string {
  return time ? moment.unix(time).format(format) : DEFAULT_PLACEHOLDER
}
