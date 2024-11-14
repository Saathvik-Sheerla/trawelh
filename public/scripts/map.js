mapboxgl.accessToken = mapToken;
console.log(mapToken);
console.log(coordinates);

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 11 // starting zoom
});

const marker = new mapboxgl.Marker({color: 'red'})
    .setLngLat(coordinates)
    .addTo(map);