import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
import { useSelector } from 'react-redux';


// Map Embedding and address search stuff
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const addresses = useSelector( (state) => state.files.addresses)
  const [lng, setLng] = useState(-73.9611);
  const [lat, setLat] = useState(40.7359);
  const [zoom, setZoom] = useState(11.9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
    
  });

  useEffect(() => {
    if (addresses) {
      addresses.forEach( (address) => {
        if (address.length > 0) {
          address.forEach( (place) => {
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place[0]}%20NY.json?poi_category=art_gallery&country=US&region=NY&&proximity=${lng},${lat}&access_token=${mapboxgl.accessToken}`)
            .then( (res) => res.json())
            .then( (data) => {
              if (data.features && data.features.length > 0) {
                const firstResult = data.features[0];
                const longitude = firstResult.geometry.coordinates[0];
                const latitude = firstResult.geometry.coordinates[1];
                let marker = new mapboxgl.Marker()
                  .setLngLat([longitude, latitude])
                  .addTo(map.current);
                
                let popup = new mapboxgl.Popup({
                  offset:25
                })
                  .setHTML(`<div style='justify-content: center'><h3>${place[1]}</h3><p>${place[0]}</p></div>`);
                marker.setPopup(popup)
              }
            })
          })
        }
      })
    }
  },)
  
  return (
    <div>
        <div ref={mapContainer} className="map-container" />
    </div>
  )
};

export default Map;