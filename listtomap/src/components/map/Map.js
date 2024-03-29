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
  const [zoom, setZoom] = useState(12.5);

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
      addresses.addresses[1].forEach( (address) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?type=address&access_token=${mapboxgl.accessToken}`)
        .then( (res) => {
          console.log(res)
        })
        console.log('address', address)
        new mapboxgl.Marker()
          .setLngLat([-74.004344,40.750015])
          .addTo(map.current);
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