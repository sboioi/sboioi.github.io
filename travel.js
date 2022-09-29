//collapse deszination menu for mobile display
var coll = document.getElementsByClassName("collapse");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var subnav = this.nextElementSibling;
    if (subnav.style.display === "flex") {
      subnav.style.display = "none";
    } else {
      subnav.style.display = "flex";
    }
  });
}

//create map section
let canvas = document.getElementById('map');
let canvasMobile = document.getElementById('mapMobile');
let cx = canvas.getContext('2d');
let ctx = canvasMobile.getContext('2d');



//add map image to canvas
let img = new Image();    
img.src = 'photos/worldMap.jpg';

//canvas width and height
const Width = 1000;
const Height = 400;

//list of Destination with x and y coordinate
class Des{
    constructor(place,xCo,yCo,imgSrc){
    this.place = place;
    this.xCo = xCo;
    this.yCo = yCo;
    this.imgSrc = imgSrc;
  }

  //can add different funciton here and pass the above values to it
  //e.g.:

  clone(){
    return new Des(this.place, this.cCo, this.yCo, this.imgSrc);
  }
}

let destination = [
  new Des('Hong Kong', 380, 273, "photos/hongkong.jpg"),  
  new Des('South Korea', 393,250.5,"photos/seoul_southKorea.JPG"),
  new Des('Japan', 415.5,251.5,"photos/tokyo_skytree_japan.JPG"),
  new Des('Malaysia', 346,319.5, "photos/petronas_twin_towers_maylasia.JPG"),
  new Des('Thailand', 343,293.5, "photos/bangkok_thailand.jpg"),
  new Des('India', 300,296.5, "photos/kochi_india.JPG"),
  new Des('Tibet', 326,255.5, "photos/tibet.JPG"),
  new Des('Dubai', 260,271, "photos/dubai_UAE.jpg"),
  new Des('Israel', 225,253, "photos/dead_sea_israel.jpg"),
  new Des('Tasmania',431,410.5, "photos/murdunna_TAS.JPG"),
  new Des('Perth', 373,390.5, "photos/rottnest_island_perth_australia.JPG"),
  new Des('Germany', 187,201, "photos/berlin_germany.JPG"),
  new Des('Spain', 156,232, "photos/acueducto_de_segovia_spain.JPG"),
  new Des('Netherland', 174,201, "photos/netherlands.JPG"),
  new Des('France', 168,208.5, "photos/eiffel_tower_france.JPG"),
  new Des('USA',744,223, "photos/WTC_us.JPG"),
  new Des('USA', 671, 237,"photos/lower_antelope_canyon_us.JPG"),
  new Des('Canada', 664,171, "photos/yellowknife_canada.JPG"),  
  new Des('Chile',752,366,"photos/valparaiso_chile.JPG"),
  new Des('Bolivia',758,341, "photos/salar_de_uyuni_bolivia.JPG"),
  new Des('Argentina', 781, 348, "photos/devils_throat_argentina.jpg")
];

//draw dots on map
function drawMapDots(){
  cx.clearRect(0,0,1000,500);
  cx.drawImage(img,0,50,Width,Height); 
  ctx.drawImage(img,0,50,Width,Height); 
  for(let i = 0; i<destination.length; i++){
    //desktop display
    cx.fillStyle= 'goldenrod';
    let x = destination[i].xCo;
    let y = destination[i].yCo;
    cx.beginPath();
    cx.arc(x,y,5,0,2 * Math.PI);
    cx.fill();
    //mobile display
    ctx.fillStyle= 'goldenrod';
    ctx.beginPath();
    ctx.arc(x,y,5,0,2 * Math.PI);
    ctx.fill();
  }
}



//create "top" button
let mybutton = document.getElementById('myBtn');

// When scrolls down 20px from the top, show the button
function btnTop(){

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
};

// When clicked, scroll to the top
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}



//show img on map while mouse move
function checkMap(event){ 
  let mouseX = event.offsetX;
  let mouseY = event.offsetY;
 
    for(let i = 0; i<destination.length;i++){
      let lowX = +destination[i].xCo - 5;
      let hiX = +destination[i].xCo + 5;
      let lowY = +destination[i].yCo - 5;
      let hiY = +destination[i].yCo + 5;
      if(mouseX>lowX && mouseX<hiX && mouseY>lowY && mouseY<hiY){
        drawMapDots();
        cx.fillStyle = 'rgba(248, 248, 248, 0.5)';
        cx.fillRect(destination[i].xCo+2,destination[i].yCo+2,102,102);
        let img = new Image();
        img.src = destination[i].imgSrc;
        cx.drawImage(img,destination[i].xCo,destination[i].yCo,100,100);
        cx.font = '900 small-caps 40px Montserrat';
        cx.fillStyle = 'rgba(218, 165, 32, 0.445)';
        cx.fillText(destination[i].place,destination[i].xCo-8,destination[i].yCo-8);
        cx.fillStyle = 'rgba(248, 248, 248, 0.8)';
        cx.fillText(destination[i].place,destination[i].xCo-10,destination[i].yCo-10);
        cx.font = '900 small-caps 40px Montserrat';
      }
  }
  
}

// Detect request animation frame
var scroll = window.requestAnimationFrame ||
             // IE Fallback
             function(callback){ window.setTimeout(callback, 1000/60)};
var elementsToShow = document.querySelectorAll('.fade'); 

function loop() {

  elementsToShow.forEach(function (element) {
    if (isElementInViewport(element)) {
      element.classList.add('is-visible');
    } else {
      element.classList.remove('is-visible');
    }
  });

  scroll(loop);
}


// Helper function from: http://stackoverflow.com/a/7557433/274826
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}


img.onload = drawMapDots;
canvas.onmousemove = checkMap;
canvas.onmouseout = drawMapDots;
onscroll = btnTop;
loop();
