import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';


// Map Embedding and address search stuff
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const addMarker = useRef(null);
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

  addMarker.current = (coordinates) => {
    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
  }

  return (
    <div>
        <div ref={mapContainer} className="map-container" />
    </div>
  )
};

export default Map;