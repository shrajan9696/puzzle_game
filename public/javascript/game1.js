
let hint1 = document.getElementById("hint1");
let hint2 = document.getElementById("hint2");
let hint3 = document.getElementById("hint3");


const startTime = new Date().getTime();



window.addEventListener("click", (event) => {
   
document.getElementById("start").style.display = "none";
document.getElementById("main").style.visibility = "visible";
console.log("came");
document.getElementById("my_audio").volume = 0.5;
document.getElementById("my_audio").play();
  });



const hintClickHandler1 = (event)=>{
   
    console.log(document.getElementById("hint1").innerText)
    document.getElementById("hint1").innerText = "oops try next one";
    var audio = new Audio('./audio/hint.mp3');
    audio.play();

}
const hintClickHandler2 = (event)=>{
    
    console.log(document.getElementById("hint2").innerText)
    document.getElementById("hint2").innerText = "OOPs try next one";
    var audio = new Audio('./audio/hint.mp3');
    audio.play();
}
const hintClickHandler3 = (event)=>{
    console.log(document.getElementById("hint2").innerText);
    document.getElementById("hint3").innerText = "Combine First letter of each object";
    var audio = new Audio('./audio/hint.mp3');
    audio.play();
    
}

const submitHandler = ()=>{
   let ans=  document.getElementsByTagName("input")[0].value
   let finalAns = ans.toLowerCase();
   console.log(finalAns);
   if(finalAns === "india"){
    console.log("succees");
    const html = `<div>
    <form action="/game2" method="get">
 <button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" type="submit">
Proceed to next level
</button>
</form>
</div>`

    document.getElementById("hint").innerHTML = html;
    // window.location.replace('./game2.html');

    var audio = new Audio('./audio/success.mp3');
    audio.play();
   }
   else {
    document.getElementsByTagName("input")[0].style.backgroundColor =" #e57474c7";
    var audio = new Audio('./audio/failure.mp3');
    audio.play();
    
  
   }
}

