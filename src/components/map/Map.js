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

  const [markers, setMarkers] = useState([]);
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

  const removeMarkers = () => {
    setMarkers([]);
  }

  useEffect(() => {
    if (addresses) {
          addresses.forEach( (place) => {
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}%20NY.json?poi_category=art_gallery&country=US&region=NY&&proximity=${lng},${lat}&access_token=${mapboxgl.accessToken}`)
            .then( (res) => res.json())
            .then( (data) => {
              if (data.features && data.features.length > 0) {
                const firstResult = data.features[0];
                const longitude = firstResult.geometry.coordinates[0];
                const latitude = firstResult.geometry.coordinates[1];

                const el = document.createElement('div');
                el.className = 'marker'

                let marker = new mapboxgl.Marker(el)
                  .setLngLat([longitude, latitude])
                  .addTo(map.current);


                // TODO: Function to remove all markers and add back only relevant files
                  
                let popup = new mapboxgl.Popup({
                  offset:20
                })
                //TODO: setup popup component
                  // Old Code to get Venue name and address for popup
                  // .setHTML(`<div style='justify-content: center'><h3>${place[1]}</h3><p>${place[0]}</p></div>`);
                  .setHTML(`<div><h3>${place}</h3><p>${place}</p></div>`);
                marker.setPopup(popup)
              }
            })
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