export function formatPhoneNum(phoneNum) {
    const str = String(phoneNum);
    return str.substring(0, 3) + '****' + str.slice(-4);
}
//# sourceMappingURL=data-process.js.map