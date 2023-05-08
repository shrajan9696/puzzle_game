// document.getElementById("submit").addEventListener('click',function(event){
//     event.preventDefault;
   
// })


function playMusic() {
    if(document.getElementById('c').checked===true){
        console.log("yes");
        var audio = new Audio('./audio/success.mp3');
    audio.play();
   
    }
    else {
        var audio = new Audio('./audio/failure.mp3');
    audio.play();
    }
    console.log("reached");
    document.getElementById('quiz1form').submit();
}

function playMusic2() {
    if(document.getElementById('c').checked===true){
        console.log("yes");
        var audio = new Audio('./audio/success.mp3');
    audio.play();
   
    }
    else {
        var audio = new Audio('./audio/failure.mp3');
    audio.play();
    }
    console.log("reached");
    document.getElementById('quiz1form').submit();
}


function playMusic3() {
    if(document.getElementById('b').checked===true){
        console.log("yes");
        var audio = new Audio('./audio/success.mp3');
    audio.play();
   
    }
    else {
        var audio = new Audio('./audio/failure.mp3');
    audio.play();
    }
    console.log("reached");
    document.getElementById('quiz1form').submit();
}

function playMusic4() {
    if(document.getElementById('d').checked===true){
        console.log("yes");
        var audio = new Audio('./audio/success.mp3');
    audio.play();
   
    }
    else {
        var audio = new Audio('./audio/failure.mp3');
    audio.play();
    }
    console.log("reached");
    document.getElementById('quiz1form').submit();
}