// Config and Initialize Firebase
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

// create a message table in db for myMessage page
function createMessageTable() {
    var checkMessage = firebase.database().ref('messages');
    checkMessage.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            console.log("messages table exists");
        } else {
            let username = sessionStorage.getItem('login_status');
            firebase.database().ref('messages/' + username + '/msg0').set({
                    sender: "",
                    message: "",
                    reply: 'false'
                }).then(function () {
                    console.log("messages table created");
                })
                .catch(function (error) {
                    console.log("fail to create messages table");
                });
        }
    });
}
createMessageTable()


// create a bottle table in db for sendBottle page
function createBottleTable() {
    var checkFriend = firebase.database().ref('bottles');
    checkFriend.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            console.log("bottles table exists");
        } else {
            let username = sessionStorage.getItem('login_status');
            firebase.database().ref('bottles/' + 'bottle0').set({
                    from: username,
                    message: 'initial singularity',
                    reply: 'false'
                }).then(function () {
                    console.log("bottles created")
                })
                .catch(function (error) {
                    console.log("bottles failed to be created")
                });
        }
    });
}
createBottleTable()

// create a friends table in db for friendList page
function createFriendTable() {
    let username = sessionStorage.getItem('login_status');
    var checkBottle = firebase.database().ref('friends/');
    checkBottle.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            console.log("friend table exists");
        } else {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            firebase.database().ref('friends/' + username + '/ll').set({
                    date: today
                }).then(function () {
                    console.log("friends created")
                })
                .catch(function (error) {
                    console.log("friends failed to be created")
                });
        }
    });
}
createFriendTable()