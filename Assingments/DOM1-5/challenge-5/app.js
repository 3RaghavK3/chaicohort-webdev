const caption = document.getElementById("caption");
const prev = document.getElementById("prevButton");
const next = document.getElementById("nextButton");
const track = document.getElementById("carouselTrack");
const indicatorcontainer=document.getElementById("carouselNav");
const autoplaybutton=document.getElementById("autoPlayButton");
const timerDisplay=document.getElementById("timerDisplay");

const images = [
  {
    url: 'https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Beautiful Mountain Landscape',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Ocean Sunset View',
  },
  {
    url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Autumn Forest Path',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Urban City Skyline',
  },
];


function changecaption(index){
  caption.innerText=images[index].caption;
}


// First, add all the slides in the track
for (let i = 0; i < images.length; i++) {
  let slide = document.createElement("div");
  slide.classList.add("carousel-slide");
  slide.style.backgroundImage = `url('${images[i].url}')`;
  track.appendChild(slide);
}

let currindex=0;
let n=images.length;

//adding indicator buttons

for (let i = 0; i < images.length; i++) {
  let indi = document.createElement("div");
  indi.classList.add("carousel-indicator");
  indicatorcontainer.appendChild(indi);

}

indicators=document.querySelectorAll(".carousel-indicator")
function changeindicator(index){
  indicators.forEach(indicator=>{
    indicator.classList.remove("active");
  })
  indicators[index].classList.toggle("active");
}

changecaption(currindex);
changeindicator(currindex);

//autoplay button functions

function autoplayfunction(time){
  autoplaybutton.innerText="Stop Auto Play"
  autoplay=setInterval(()=>{
    currindex++;
    currindex%=n;
    moveslide(currindex);
  },time*1000);

  let timeleft=time;
  countdown=setInterval(()=>{
    if(timeleft===1) timeleft=time+1;
    timerDisplay.innerText=`Time left is ${--timeleft}s`
  },1000)
}


function disableautoplay(){
clearInterval(autoplay)
clearInterval(countdown)
timerDisplay.innerText=""
autoplaybutton.innerText="Start Auto Play"
}

autoplaybutton.addEventListener("click", () => {
autoplaybutton.classList.toggle("on");
if (autoplaybutton.classList.contains("on")) {
  autoplayfunction(5);
} else {
  disableautoplay();
}
});

//move  slide
function moveslide(index){
  track.style.transform = `translateX(${index * -100}%)`;
  changecaption(index);
  changeindicator(index);
}

next.addEventListener("click", () => {
    disableautoplay();
    currindex++;
    currindex%=n;
    moveslide(currindex);
  });


prev.addEventListener("click", () => {
    disableautoplay();
    currindex--;
    currindex=((currindex%n)+n)%n;
    moveslide(currindex);
  });


//code to move that specific page indicator.
indicators.forEach((indicator,index)=>{
  indicator.addEventListener("click",()=>{
        disableautoplay();
        moveslide(index);
  })
})

moveslide(currindex);