const redPoint = {
    type: 'FeatureCollection',
    name: 'red',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-0.09, 51.5]
            }
        }
    ]
}

const bluePoints = {
    type: 'FeatureCollection',
    name: 'blue',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-0.07, 51.52]
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-0.08, 51.54]
            }
        },
    ]
}

const line = {
    type: 'FeatureCollection',
    name: 'line',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates:[ [-0.07, 51.52], [-0.08, 51.54]]
            }
        },
    ]
}

export {
    redPoint, 
    bluePoints, 
    line
}