var mymap = L.map('map', {
    worldCopyJump: true,
    minZoom: 1.5,
    maxBounds: [
    //south west
    [-200, -200],
    //north east
    [200, 200]
    ], 
    maxBoundsViscosity: 1.0   
    }).setView([45, 10], 2);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,

    // this map option disables world wrapping. by default, it is false.
    continuousWorld: false,

    

    accessToken: 'pk.eyJ1Ijoid2FkMnByb2plY3QiLCJhIjoiY2t2Z3lyaXdvNHV3MTJwbXMxZ2R2eGw3NSJ9.Na27hF4TgK_PtBxdmSYMnw', //adam's token
}).addTo(mymap);



var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);