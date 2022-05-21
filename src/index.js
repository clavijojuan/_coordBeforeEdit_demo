import './styles.css';
import '@geoman-io/leaflet-geoman-free';  
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { redPoint, bluePoints, line } from './assets/data';

const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.pm.addControls({  
    position: 'topleft',  
    drawCircle: false,
    drawMarker: false,
    drawPolyline: false,
    drawRectangle: false,
    drawPolygon: false,
    drawControls:false,
    drawCircleMarker: false,
    rotateMode:false,
    cutPolygon:false
});  

const geoJsonOptions = (name) => {
    return {
        snapIgnore: false,
        pmIgnore: false,
        pointToLayer: (geoJsonPoint, latlng) => {
            return L.circleMarker(latlng, {
                radius:5, 
                weight:3, 
                fillOpacity: 1
            })
        },
        style: (geoJsonFeature) => {
            const color = (name === 'red')  ? '#FF0000' :
                          (name === 'blue') ? '#0059FF' : '#00FF00'
            return {
                color
            }
        },
        onEachFeature: (feature, layer) => {
            layer.pm._shape = name;
            layer.pm.setOptions({
                snapDistance: 10,
                continueDrawing: false,
                allowSelfIntersection: false,
                snappable: (['line'].includes(name)) ? true : false,
                requireSnapToFinish: (['line'].includes(name)) ? true : false,
                snapSegment: false,
                hideMiddleMarkers: true,
                draggable: (['line'].includes(name)) ? false : true,
                allowEditing: (['line'].includes(name)) ? true : false,
            });

            if(name === 'line') {
                layer.on('pm:edit', (ed) => {
                    const nodes = ed.target.pm.markerCache
                    const invalidNodes = nodes.filter((node) => {
                      if(node._snapped === false) return true;
                      else return false;
                    })
      
                    if(invalidNodes.length > 0) {
                      invalidNodes.forEach((invalidNode) => {
                        const lastVertex = invalidNode._snapInfo.snapLatLng
                        invalidNode.setLatLng(lastVertex)
                      })
                      map.pm.disableGlobalEditMode();
                    }
      
                    nodes.forEach((node, index) => {
                        console.log(node)
                      if(node._snapped){
                        const interacWith = node._snapInfo.layerInteractedWith.pm._shape;
                        const lastVertex = node._snapInfo.layer.pm._coordsBeforeEdit[index]
                        if(index === 0){
                          if(['red', node._snapInfo.shape].includes(interacWith)){
                            node.setLatLng(lastVertex);
                            map.setView(lastVertex, map.getMaxZoom())
                            map.pm.disableGlobalEditMode();
                          }
                        }
                        else if(index === 1){
                          if(['red'].includes(interacWith)){
                            node.setLatLng(lastVertex);
                            map.setView(lastVertex, map.getMaxZoom())
                            map.pm.disableGlobalEditMode();
                          }
                        }
                      }
                    })
      
                    layer.pm.setOptions({
                        snapDistance: 10,
                        continueDrawing: false,
                        allowSelfIntersection: false,
                        snappable: (['line'].includes(name)) ? true : false,
                        requireSnapToFinish: (['line'].includes(name)) ? true : false,
                        snapSegment: false,
                        hideMiddleMarkers: true,
                        draggable: (['line'].includes(name)) ? false : true,
                        allowEditing: (['line'].includes(name)) ? true : false,
                    })
                  })
            }
        }
    }
}

const createGeojson = (geojson) => {
    L.geoJSON(geojson, geoJsonOptions(geojson.name)).addTo(map);
}

createGeojson(redPoint);
createGeojson(bluePoints);
createGeojson(line);
