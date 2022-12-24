const layerTreeTypes = ['layer', 'resource'];
const Spliter = '__';
export function getLayerTreeKey(type, id) {
    return `${type}${Spliter}${id}`;
}
export function isLayerTreeKey(key, type) {
    if (type) {
        return key.startsWith(`${type}${Spliter}`);
    }
    else {
        return layerTreeTypes.some(t => key.startsWith(`${t}${Spliter}`));
    }
}
export function getIdFromLayerTreeKey(key) {
    return key.split(Spliter)[1];
}
//# sourceMappingURL=layer-tree.js.map