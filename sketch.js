// I took inspiration from here https://editor.p5js.org/lingdong/sketches/RhTlacgWm
// but I completely rewrote the sketch, since the setup he used didn't use WEBGL and so it was difficult to rotate the sketch with device rotation.
// It was fun to study how to obtain the same thing in a completely different way. 


function preload() {
  bebasNeue = loadFont('BebasNeue-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES)

  explainerText = createP("Ever thought about 3D drawing?");
}


let Line = [];
let angle= 0;
let rotationXstart;
let rotationYstart;
let rotationZstart;
let notouch = true;
let explainerText;
let cover;
let myMessage = "draw something";

function draw() {
  background("white");
  noFill()
  stroke("black")
  strokeWeight(5)

  if(notouch == true) {
    angle = angle + 2;
  }

   if (mouseIsPressed) {
   
    angle = angle + 2;
     
    let x = (mouseX - width/2) * cos(angle); 
    let y = mouseY - height/2;
    let z = (mouseX - width/2) * sin(angle)
    
    Line.push([x,y,z])

    rotationXstart = rotationX
    rotationYstart = rotationY
    rotationZstart = rotationZ
   
  } else if(notouch == false) {

    angle+=0.5;

    rotateX(rotationX-rotationXstart);
    rotateY(rotationY-rotationYstart);
    rotateZ(rotationZ-rotationZstart);
  }

  

  if (angle == 360) {angle = 0};
  rotateY(angle);

  beginShape();

  for (let i=0; i< Line.length; i++) {
    let [x, y, z] = Line[i];
    vertex(x, y, z);
  }

  endShape(); 
  
  strokeWeight(1)
  line(width/2, 0, 0, -width/2, 0, 0);
  line(0, height/3, 0, 0, -height/3, 0);  

  fill("black")
  textFont(bebasNeue)
  textSize(32)
  textLeading(32)
  textAlign(CENTER)
  text(myMessage, 0, -height/2+100);

}

function mousePressed(){
  Line = [];
  notouch = false
}

// ask for permissions on iOS
function touchEnded(event) {
  myMessage = "tilt to take a look at your work"  
  
  // check that those functions exist
  // if they exist it means we are
  // on iOS and we can request the permissions
  if(DeviceOrientationEvent && DeviceOrientationEvent.requestPermission){
    DeviceOrientationEvent.requestPermission()
  }
}

