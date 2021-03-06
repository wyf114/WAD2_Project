var sendButton = document.getElementById("telegramSendButton");
sendButton.addEventListener("click", sendMessage);

var BOTTOKEN = "2001239054:AAFHa2YyUb-8Y_T0NXt3J-_aRBDBrdgQrxI"

var sendCooldown = false;

function helperCount(timeLeft, sendString, i) {
    setTimeout(function(){
        document.getElementById("telegramStatus").innerHTML = "sent: " + sendString + "<br> Cooldown left in seconds: " + timeLeft;
        console.log(timeLeft);
    }, i*100);

}

function countDown5second(sendString){
    

    var timeLeft = 5.1;

    for (i=0; i<=50; i++){
        
        timeLeft = timeLeft - 0.1;
        timeLeft = timeLeft.toFixed(1);

        helperCount(timeLeft, sendString, i);

        
    }
}

function setCooldown(){
    setTimeout(function(){sendCooldown = false;}, 5000);
}

function sendMessage(){

    if (sendCooldown) {
        console.log("cooldown la");
        return;
    }
    else {
        sendCooldown = true;
    }


    var telegramMessageElement = document.getElementById("telegramMessage");
    var sendString = telegramMessageElement.value;
    var chatIDElement = document.getElementById("telegramChatId");
    var chatID = chatIDElement.value;

    
    var sendURL = "https://api.telegram.org/bot" + BOTTOKEN + "/sendMessage?chat_id=" + chatID + "&text=" + sendString;



    axios.get(sendURL, {
        params: {
            
        }
    })


    .then(response =>  {
        console.log(response.data);
        document.getElementById("telegramStatus").innerHTML = "sent: " + sendString;

        setCooldown();
        countDown5second(sendString);
        
    
    })
    .catch(error => {
        sendCooldown = false;
        //console.log(error);
        var errorMessage = ""

        if (sendString.length === 0){
            errorMessage = "Empty message"
        }
        else { errorMessage = "Invalid Chat ID<br>Please ensure you have started the bot and entered correct chat id." }

        document.getElementById("telegramStatus").innerHTML = "Error!"+"<br><br>"+errorMessage;
        


    });



    
    
}
