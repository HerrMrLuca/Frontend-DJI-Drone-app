const layerTreeTypes = ['layer', 'resource'] as const
type LayerTreeType = (typeof layerTreeTypes)[number]
const Spliter = '__'

export function getLayerTreeKey (type: LayerTreeType, id: number | string) {
  return `${type}${Spliter}${id}`
}
