// onclick of the make friend button
function makeFriend() {
    let user = sessionStorage.getItem("login_status");
    var friend = firebase.database().ref('bottles/' + user);
    friend.once('value').then((snapshot) => {
        var friend = this.displayName;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        if (snapshot.exists()) {
            console.log("user exists in the friends table");
            var updates = {};
            updates['/friends/' + user + "/friend"] = friend;
            updates['/friends/' + user + "/date"] = today;
            firebase.database().ref().update(updates);
            document.getElementById("replyStatus").innerHTML = "You are friends now!";
            document.getElementById("replyStatus").setAttribute("class","text-dark");
        } 
        else {
            console.log("adding new the user:", user)
            var updates = {};
            updates['/friends/' + user + "/friend"] = friend;
            updates['/friends/' + user + "/date"] = today;
            firebase.database().ref().update(updates);
            document.getElementById("replyStatus").innerHTML = "You are friends now!";
            document.getElementById("replyStatus").setAttribute("class","text-dark");
        }
    });
}

function sendMessage(msg) {
    var checkText = document.getElementById("replyMessage").value;
    if (checkText.replace(/\s/g, "") != "") {
        console.log(msg);
        var username = sessionStorage.getItem("login_status");
        var receiver = msg['sender'];
        var text = this.text;
        console.log("sending from:" + username);
        console.log("updating" + receiver);
        var messages = firebase.database().ref('messages/');
        messages.once('value').then((snapshot) => {
            if (snapshot.exists()) {
                var messages = snapshot.val();
                // console.log(messages)
                if (receiver in messages) {
                    console.log("updating current receiver")
                    // count number of msgs
                    var msgs = messages[receiver]
                    console.log(msgs)
                    var keys = Object.keys(msgs)
                    var count_msg = keys.length
                    console.log(keys, count_msg)

                    //update data with new bottle name
                    var updates = {};
                    var msg_name = "msg" + count_msg
                    updates['/messages/' + receiver + "/" + msg_name + "/message"] =
                        text;
                    updates['/messages/' + receiver + "/" + msg_name + "/sender"] =
                        username;
                    firebase.database().ref().update(updates);
                    document.getElementById("sendStatus").innerHTML =
                        "Your reply sent successfully!";
                    document.getElementById("sendStatus").setAttribute("class",
                        "text-dark");
                    document.getElementById("sendStatus").style.textAlign = "center";

                } else {
                    console.log("adding new the receiver:", receiver)
                    var updates = {};
                    updates['/messages/' + receiver + "/" + msg_name + "/message"] =
                        text;
                    updates['/messages/' + receiver + "/" + msg_name + "/sender"] =
                        username;
                    firebase.database().ref().update(updates);
                    document.getElementById("sendStatus").innerHTML =
                        "Your reply sent successfully!";
                    document.getElementById("sendStatus").setAttribute("class",
                        "text-dark");
                    document.getElementById("sendStatus").style.textAlign = "center";
                }
                this.text = '';
            }

        })
