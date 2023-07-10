mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
});

const markerIcon = document.querySelector('#marker');
 
// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({ color: 'red', rotation: 10, element: markerIcon })
.setLngLat(campground.geometry.coordinates)
.addTo(map);