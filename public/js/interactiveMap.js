var username = sessionStorage.getItem("login_status");
console.log(username);

const firebaseConfig = {
    apiKey: "AIzaSyDLM5eiv5cOkBtM-os59uGPAhtFkdBCAhY",
    authDomain: "sademo2018-2-11ec2.firebaseapp.com",
    databaseURL: "https://sademo2018-2-11ec2.firebaseio.com",
    projectId: "sademo2018-2-11ec2",
    storageBucket: "sademo2018-2-11ec2.appspot.com",
    messagingSenderId: "431393859582",
    appId: "1:431393859582:web:ccc0434dd68846b15b82af"
};
firebase.initializeApp(firebaseConfig);





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



var BottleIcon = L.icon({
    iconUrl: 'img/bottle.png',
    shadowUrl: 'img/bottle_shadow.png',

    iconSize:     [70, 35], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [35, 18], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
});


function addMarker(coordinates, header, description){
    var marker = L.marker(coordinates, {icon: BottleIcon}).addTo(mymap);
    marker.bindPopup(`<b>${header}</b><br>${description}`).openPopup();
}

/** 
addMarker(USCOORDINATES, "Joe", "United States");
addMarker(TAIWANCOORDINATES, "周杰伦 Jay Chou", "Taiwan");
addMarker(JAPANCOORDINATES, "Piplup", "Japan")
addMarker(MALAYSIACOORDINATES, "Namewee", "Malaysia")
addMarker(SINGAPORECOORDINATES, "林俊杰 JJ Lin", "Singapore");
addMarker(CHINACOORDINATES, "WYF", "China");

*/

//interactedUsers = {"adam2":2, "wyf":1, "ll":3, "ailystee":5, "adam3":8}
/** 
 
function getCoordinates(user){
    userInfo = firebase.database().ref(`users/${user}`);
    userInfo.once('value').then((snapshot) => {
    if (snapshot.exists()) {
        //console.log(snapshot.val());
        console.log(snapshot.val().coordinates);
        var coordinates = snapshot.val().coordinates;
        return coordinates;

    }
})

}

*/




loggedUserInfo = firebase.database().ref(`users/${username}`);
loggedUserInfo.once('value').then((snapshot) => {
if (snapshot.exists()) {
    //console.log(snapshot.val().interacted_users);
    interacted_users = snapshot.val().interacted_users; //key: user, value: number of times
    for (const interacted_user in interacted_users){
        const number_of_times = interacted_users[interacted_user];
        //var coordinates = getCoordinates(interacted_user);
        console.log(interacted_user);

        userInfo = firebase.database().ref(`users/${interacted_user}`);
        userInfo.once('value').then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                console.log(snapshot.val().coordinates);
                var coordinates = snapshot.val().coordinates;
                if (coordinates === undefined){
                    console.log("user has no coordinates! -w-");
                    return;
                }
                else{
                    console.log(interacted_user);
                    addMarker(coordinates, interacted_user, "Number of times: " + number_of_times);
                    console.log("added marker!");
                }

                    


            }
        })



    }
}
})


//click coordinates
/**

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);
*/