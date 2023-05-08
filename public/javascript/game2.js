
window.addEventListener("click", (event) => {
   
    document.getElementById("start").style.display = "none";
    document.getElementById("main").style.visibility = "visible";
    console.log("came");
    document.getElementById("my_audio").volume = 0.5;
    document.getElementById("my_audio").play();
      });

let html = `<a href="https://instagram.com/virat.kohli?igshid=YmMyMTA2M2Y=" target="_blank" class="insta" id="insta3">Follow The Link</a>`;

document.getElementById('card3').addEventListener('click',()=>{
    console.log("clicked");
    document.getElementById('card3').style.transform = "rotateY(180deg)";
    document.getElementById('card3').innerHTML = html;
    document.getElementById('insta3').style.transform = "rotateY(180deg)";

});

document.getElementById('card4').addEventListener('click',()=>{
    document.getElementById('rocket').src = './assets/dice4.jpg'
})