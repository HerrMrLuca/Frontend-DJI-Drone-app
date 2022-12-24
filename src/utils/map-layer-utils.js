import { generatePoint, generateLine, generatePolygon } from '/@/utils/genjson'
import { MapDoodleColor, MapElementEnum } from '/@/constants/map'
function getPinPosition (pinAMapPosition) {
  return { height: 0, latitude: pinAMapPosition.lat, longitude: pinAMapPosition.lng }
}
export function generatePointContent (pinAMapPosition) {
  const position = getPinPosition(pinAMapPosition)
  return {
    type: MapElementEnum.PIN,
    content: generatePoint(position, {
      color: MapDoodleColor.PinColor,
      clampToGround: true,
    })
  }
}
function getLieOrPolyPosition (mapPosition) {
  const position = []
  mapPosition.forEach(item => {
    position.push({ height: 0, latitude: item.lat, longitude: item.lng })
  })
  return position
}
export function generateLineContent (mapPosition) {
  const position = getLieOrPolyPosition(mapPosition)
  return {
    type: MapElementEnum.LINE,
    content: generateLine(position, {
      color: MapDoodleColor.PolylineColor,
      directConnected: false,
    })
  }
}
export function generatePolyContent (mapPosition) {
  const position = getLieOrPolyPosition(mapPosition)
  return {
    type: MapElementEnum.POLY,
    content: generatePolygon(position, {
      color: MapDoodleColor.PolygonColor,
    })
  }
}
// # sourceMappingURL=map-layer-utils.js.map
