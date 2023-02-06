import { BYTE_SIZES, DEFAULT_PLACEHOLDER, SIZES as byteSizes } from './constants'

/**
 * 转换字节数为单位B，KB，GB...
 * 保留一位小数
 * @param bytes 字节数
 * @param holder 0字节占位符，默认 --
 * @returns
 */
export function bytesToSize (bytes: number, holder = DEFAULT_PLACEHOLDER, fix = 1, unit = false): string {
  if (isNaN(bytes) || bytes === 0) {
    return holder
  }
  // 兼容负数
  let prefix = ''
  if (bytes < 0) {
    bytes = 0 - bytes
    prefix = '-'
  }
  const k = 1024
  const sizes = unit ? BYTE_SIZES : byteSizes// ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return prefix + (bytes / Math.pow(k, i)).toFixed(fix) + '' + sizes[i]
}

//  获取转化后数据及单位
export function getBytesObject (bytes: number, holder = DEFAULT_PLACEHOLDER, fix = 1): {
  value: string,
  size: string
  index: number
} {
  if (isNaN(bytes) || bytes === 0) {
    return {
      value: holder,
      size: '',
      index: -1,
    }
  }
  // 兼容负数
  let prefix = ''
  if (bytes < 0) {
    bytes = 0 - bytes
    prefix = '-'
  }
  const k = 1024
  const sizes = byteSizes// ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return {
    value: prefix + (bytes / Math.pow(k, i)).toFixed(fix),
    size: sizes[i],
    index: i,
  }
}
