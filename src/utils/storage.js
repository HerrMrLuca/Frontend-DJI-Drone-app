import { consoleWarn } from './logger';
function getStorageData(key, parse) {
    const value = window.localStorage.getItem(key);
    if (parse && value) {
        try {
            const result = JSON.parse(value);
            return result;
        }
        catch (e) {
            consoleWarn('appStorage.get failed, err:', e);
            return null;
        }
    }
    else {
        return value;
    }
}
function clearStorageData(key) {
    let keyList = [];
    if (Array.isArray(key)) {
        keyList = key;
    }
    else {
        keyList = [key];
    }
    keyList.forEach(item => {
        window.localStorage.removeItem(item);
    });
}
const appStorage = {
    save(key, value) {
        window.localStorage.setItem(key, value);
    },
    get: getStorageData,
    clear: clearStorageData,
};
export default appStorage;
//# sourceMappingURL=storage.js.map