var username = sessionStorage.getItem("login_status");
console.log(username);

if (username === null){
    window.location.replace("index.html")
}



var myComponent = Vue.extend({
    data: function () {
        return { messages: "..." , unseenfriends: "..."}
    },

    template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-dark" style="position: sticky;">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <!-- right navbar links -->
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a id="navbar" class="nav-link active" aria-current="page" href="catchbottle.html">Catch Bottle</a>
                    </li>
                    <li class="nav-item">
                        <a id="navbar" class="nav-link" href="sendBottle.html">Send Bottle</a>
                    </li>
                    <li class="nav-item">
                        <a id="navbar" class="nav-link" href="mapPage.html">Map</a>
                    </li>
                    <li class="nav-item">
                        <a id="navbar" class="nav-link" href="aboutUs.html">About Us</a>
                    </li>
                </ul>

                <!-- left navbar links -->
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a id="navbar" class="nav-link" href="profile.html">Profile</a>
                    </li>
                    <li class="nav-item" style="height: 40px">
                        <a id="navbar" class="nav-link" href="friendList.html">Friend List</a>
                        <span class="badge" id="notiFriend" style='position: relative; left: 120px;'>{{ unseenfriends }}</span>
                    </li>
                    <li class="nav-item" style="height: 40px">
                        <a id="navbar" class="nav-link" href="myMessage.html">Inbox</a>
                        <span class="badge" id="notiNum">{{ messages }}</span>
                    </li>
                    <li class="nav-item">
                        <a id="navbar" class="nav-link nav-logout" onclick="logout()">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
            `,
            methods: {
                updateInbox() {
                loggedUserMessagesInfo = firebase.database().ref(`messages/${username}`);
                loggedUserMessagesInfo.once('value').then((snapshot) => {
                    if (snapshot.exists()) {
                        // console.log(Object.keys(snapshot.val()).length);
                        var messages = snapshot.val()
                        var count = []
                        for (sender in messages) {
                            if (messages[sender]['reply'] != 'true') {
                                count.push(sender)
                            }
                        }
                        const number_of_messages = count.length;
                        this.messages = number_of_messages;
                        console.log("!!!!!!!!!");        
                        console.log(number_of_messages);        
                    }
                    else {
                        this.messages = 0;
                    }
                })
                },
                updateFriend() {
                    loggedUserMessagesInfo = firebase.database().ref(`friends/${username}`);
                    loggedUserMessagesInfo.once('value').then((snapshot) => {
                        if (snapshot.exists()) {
                            // console.log(Object.keys(snapshot.val()).length);
                            var friends = snapshot.val()
                            var count = []
                            for (friend in friends) {
                                if (friends[friend]['notify'] !== 'true') {
                                    count.push(friend)
                                }
                            }
                            const number_of_unseen = count.length;
                            this.unseenfriends = number_of_unseen;
                            console.log("Owo");        
                            console.log(number_of_unseen);        
                        }
                        else {
                            this.unseenfriends = 0;
                        }
                    })}
                },
                beforeMount(){
                    console.log("before mount");
                    this.updateInbox();
                    this.updateFriend();
                },
        })

Vue.component("nav-bar", myComponent);

navapp = new Vue({
    el: "#navapp",
    data: {
        messages: 2
    }
})




