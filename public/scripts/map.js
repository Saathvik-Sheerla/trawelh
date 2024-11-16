mapboxgl.accessToken = mapToken;


let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 10 // starting zoom
});

let marker = new mapboxgl.Marker({color: 'red'})
    .setLngLat(coordinates)
    .addTo(map);