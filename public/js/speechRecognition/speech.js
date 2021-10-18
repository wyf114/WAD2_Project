
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
var ready = true;

var diagnosticPara = document.querySelector('#output');
var messageElement = document.querySelector('#exampleFormControlTextarea1');

var textElement = document.querySelector('#text').firstElementChild;

console.log(messageElement);

var speechBtn = document.querySelector('#speechbutton');

function testSpeech() {

    
    
  
    var grammar = '#JSGF V1.0;';
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    if (ready){
        ready = false;
        recognition.start();
    }
    else{
        recognition.start();
        recognition.stop();
        ready = true;
    }

  
    recognition.onresult = function(event) {

      var speechResult = event.results[0][0].transcript.toLowerCase();
      diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';
      messageElement.value += speechResult + " ";
      textElement.innerHTML = messageElement.value;
      
      console.log('Confidence: ' + event.results[0][0].confidence);
    }
  
    recognition.onspeechend = function() {
      recognition.stop();
      speechBtn.textContent = 'speech recognition';
      speechBtn.className = "btn btn-success"
      ready = true;
      diagnosticPara.textContent = '';
    }
  
    recognition.onerror = function(event) {
      speechBtn.textContent = 'speech recognition';
      speechBtn.className = "btn btn-success"
      diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
    }
    
    recognition.onaudiostart = function(event) {
        //Fired when the user agent has started to capture audio.
        console.log('SpeechRecognition.onaudiostart');
        speechBtn.textContent = 'listening';
        speechBtn.className = "btn btn-danger"
        diagnosticPara.textContent = 'listening...';

    }
    
    recognition.onaudioend = function(event) {
        //Fired when the user agent has finished capturing audio.

        console.log('SpeechRecognition.onaudioend');
    }
    
    recognition.onend = function(event) {
        //Fired when the speech recognition service has disconnected.

        console.log('SpeechRecognition.onend');
        
    }
    
    recognition.onnomatch = function(event) {
        //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
        console.log('SpeechRecognition.onnomatch');
    }
    
    recognition.onsoundstart = function(event) {
        //Fired when any sound — recognisable speech or not — has been detected.
        console.log('SpeechRecognition.onsoundstart');
    }
    
    recognition.onsoundend = function(event) {
        //Fired when any sound — recognisable speech or not — has stopped being detected.
        console.log('SpeechRecognition.onsoundend');

    }
    
    recognition.onspeechstart = function (event) {
        //Fired when sound that is recognised by the speech recognition service as speech has been detected.
        console.log('SpeechRecognition.onspeechstart');
    }
    recognition.onstart = function(event) {
        //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
        console.log('SpeechRecognition.onstart');
    }
  }
  
  speechBtn.addEventListener('click', testSpeech);

  console.log("speech.js loaded");