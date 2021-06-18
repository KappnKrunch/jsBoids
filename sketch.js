let boidsGroup1;
let boidsGroup2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  boidsGroup1 = new Boids(200);
  boidsGroup1.setColorRange(color(20,80,0), color(20,0,136));
  
  boidsGroup2 = new Boids(300);
  boidsGroup2.setColorRange(color(150,40,0), color(150,0,0));
}

function draw() {
  background(220);
  
  boidsGroup1.draw();
  //boidsGroup2.draw();
}

function mouseClicked() {
  boidsGroup1.addBoid(mouseX, mouseY);
  print("clk");
}