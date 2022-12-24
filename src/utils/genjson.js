export function geographic2Coordinate (position) {
  const coordinates = [position.longitude, position.latitude]
  if (position.height !== undefined) { coordinates.push(position.height) }
  return coordinates
}
export function generateLine (coordinates, properties) {
  return {
    type: 'Feature',
    properties,
    geometry: {
      type: 'LineString',
      coordinates: coordinates.map(geographic2Coordinate),
    },
  }
}
export function generatePolygon (coordinates, properties) {
  return {
    type: 'Feature',
    properties,
    geometry: {
      type: 'Polygon',
      coordinates: [coordinates.map(geographic2Coordinate)],
    },
  }
}
export function generatePoint (position, properties) {
  return {
    type: 'Feature',
    properties,
    geometry: {
      type: 'Point',
      coordinates: geographic2Coordinate(position),
    },
  }
}
// # sourceMappingURL=genjson.js.map
