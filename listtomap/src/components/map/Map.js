import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector } from 'react-redux';


// Map Embedding and address search stuff
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const addresses = useSelector( (state) => state.addresses)
  const [lng, setLng] = useState(-73.9911);
  const [lat, setLat] = useState(40.7359);
  const [zoom, setZoom] = useState(12);

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
    if (addresses.addresses) {
      addresses.addresses.forEach( (address) => {
        if (address.length > 0) {
          address.forEach( (place) => {
            console.log(place, 'place')
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?poi_category=art_gallery&country=US&region=NY&&proximity=${lng},${lat}&access_token=${mapboxgl.accessToken}`)
            .then( (res) => res.json())
            .then( (data) => {
              console.log(data)
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
                  .setHTML(`${place}`);
                marker.setPopup(popup)
              }
            })
          })
        }
      })
    }
  })

  
  // Do I need to create a redux store to be able to get the results from the image reader? And from there pass that data
// into this addMarkers function to add markers to the map

  // addMarkers.current = (coordinates) => {
  //   coordinates.forEach( (coords) => new mapboxgl.Marker().setLngLat(coords).addTo(map));

  // }
  return (
    <div>
        <div ref={mapContainer} className="map-container" />
    </div>
  )
};

export default Map;