import { ELocalStorageKey } from '/@/types/enums'
import { CURRENT_CONFIG } from '/@/api/http/config'

export function getWebsocketUrl () {
  const token: string = localStorage.getItem(ELocalStorageKey.Token) || '' as string
  return CURRENT_CONFIG.websocketURL + '?x-auth-token=' + encodeURI(token)
}
