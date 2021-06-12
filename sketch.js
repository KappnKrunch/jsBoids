let boids = [];
let count = 500;
let grid = new Map();

function setup() {
  createCanvas(windowWidth, windowHeight);
  
 for(let i = 0; i < count; i++){
    boids.push(new Boid());
 }
}

function draw() {
  background(220);
  
  grid.clear();
  let gridSize = 10;
  let key;
  
  for(let i = 0; i < count; i++){
    let pos = p5.Vector.mult(boids[i].getPos(), gridSize/width);
    pos.x = floor(pos.x);
    pos.y = floor(pos.y);
    pos = p5.Vector.mult(pos, width/gridSize);
    
    key = "" + floor(pos.x) + "," + floor(pos.y);
    
    if(!grid.has(key)){
      grid.set(key, new GridContainer());
    }
    
    grid.get(key).addDir(boids[i].getDir());
    grid.get(key).addPos(boids[i].getPos());
  }
  
  for(let i = 0; i < count; i++){
    
    let pos = p5.Vector.mult(boids[i].getPos(), gridSize/width);
    pos.x = floor(pos.x);
    pos.y = floor(pos.y);
    pos = p5.Vector.mult(pos, width/gridSize);
    
    key = "" + floor(pos.x) + "," + floor(pos.y);
    
    let dir = boids[i].getDir();
    dir.add(p5.Vector.mult(grid.get(key).getDir(),0.05));
    //print(grid.get(key).getAvoidDir(boids[i].getPos()));
    //dir.add(p5.Vector.div(grid.get(key).getAvoidDir(boids[i].getPos())), 0.1);
    
    for(let x =-3; x <= 3; x++){
      for(let y = -3; y <= 3; y++){
        key = "" + floor(pos.x) + x*width/gridSize +"," + floor(pos.y) + y*width/gridSize;
        if(grid.has(key))
          dir.add(p5.Vector.mult(grid.get(key).getDir(), (sqrt(18) - sqrt(x*x + y*y))/10*sqrt(18) ));
      }
    }
    
    dir.add(p5.Vector.random2D().normalize().mult(0.05));
    
    boids[i].setDir(dir);
    boids[i].moveForward();
    boids[i].draw();
  }
}