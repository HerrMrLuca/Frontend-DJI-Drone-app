import { ELocalStorageKey } from '/@/types/enums';
import { CURRENT_CONFIG } from '/@/api/http/config';
export function getWebsocketUrl() {
    const token = localStorage.getItem(ELocalStorageKey.Token) || '';
    const url = CURRENT_CONFIG.websocketURL + '?x-auth-token=' + encodeURI(token);
    return url;
}
//# sourceMappingURL=config.js.map