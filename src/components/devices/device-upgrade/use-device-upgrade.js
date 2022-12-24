import { ref } from 'vue';
import { postDeviceUpgrade } from '/@/api/device-upgrade';
export function useDeviceFirmwareUpgrade(workspaceId) {
    const deviceFirmwareUpgradeModalVisible = ref(false);
    const selectedDevice = ref(null);
    function setDeviceFirmwareUpgradeModalVisible(visible) {
        deviceFirmwareUpgradeModalVisible.value = visible;
    }
    function setSelectedDevice(device) {
        selectedDevice.value = device;
    }
    // 点击设备升级
    function onDeviceUpgrade(record) {
        if (!record) {
            return;
        }
        setSelectedDevice(record);
        setDeviceFirmwareUpgradeModalVisible(true);
    }
    // 确认设备升级
    async function onUpgradeDeviceOk(deviceUpgradeBody) {
        const { code } = await postDeviceUpgrade(workspaceId, deviceUpgradeBody);
        if (code === 0) {
            // setDeviceFirmwareUpgradeModalVisible(false)
        }
    }
    return {
        deviceFirmwareUpgradeModalVisible,
        setDeviceFirmwareUpgradeModalVisible,
        selectedDevice,
        setSelectedDevice,
        onDeviceUpgrade,
        onUpgradeDeviceOk,
    };
}
//# sourceMappingURL=use-device-upgrade.js.map