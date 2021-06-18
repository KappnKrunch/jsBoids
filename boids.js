class Boids{
  constructor(count){
    this.boids = [];
    this.count = count;
    this.grid = new Map();
    this.colorA;
    this.colorB;

    for(let i = 0; i < count; i++){
      this.boids.push(new Boid());
    }
  }
  
  draw(){
    this.grid.clear();
    let gridSize = 15;
    let key;
    let pos;

    for(let i = 0; i < this.count; i++){
      pos = p5.Vector.mult(this.boids[i].getPos(), createVector(gridSize/width,gridSize/height));
      pos.x = round(pos.x);
      pos.y = round(pos.y);

      key = "" + round(pos.x) + "," + round(pos.y);

      if(!this.grid.has(key)){
        this.grid.set(key, new GridContainer());
      }

      this.grid.get(key).addBoid(this.boids[i]);
    }

    for(let i = 0; i < this.count; i++){

      pos = p5.Vector.mult(this.boids[i].getPos(), createVector(gridSize/width, gridSize/height));
      pos.x = round(pos.x);
      pos.y = round(pos.y);

      key = "" + round(pos.x) + "," + round(pos.y);
      
      

      let avgDir = this.boids[i].getDir();
      let avoidDir = createVector(0,0);
      let convDir = createVector(0,0);
      let radius = 2;

      for(let x =-radius; x <= radius; x++){
        for(let y = -radius; y <= radius; y++){
          key = "" + round((pos.x + x*width/gridSize)) +"," + round((pos.y + y*height/gridSize));
          if(this.grid.has(key)){
            let strength = (2*radius*radius - x*x + y*y)/10*2*radius*radius;
            avgDir.add(p5.Vector.mult(this.grid.get(key).getDir(), strength));
            avoidDir.add(p5.Vector.mult(this.grid.get(key).getAvoid(this.boids[i].getPos()), strength));
            convDir.add(p5.Vector.mult(this.grid.get(key).getConvergenceDir(this.boids[i].getPos()), strength));
          }
        }
      }

      let dir = p5.Vector.mult(this.boids[i].getDir(), 5);
      dir.add(p5.Vector.mult(avgDir, 4));
      dir.add(p5.Vector.mult(convDir, 0.05));
      dir.add(p5.Vector.mult(avoidDir,2));
      dir.add(p5.Vector.random2D().normalize().mult(0.05));

      this.boids[i].setDir(dir);
      this.boids[i].moveForward();
      this.boids[i].draw();
    }
  }
  
  setColorRange(a, b){
    this.colorA = a;
    this.colorB = b;
    let trimColor;
    let baseColor;
    for(let i = 0; i < this.count; i++){
      trimColor = lerpColor(this.colorA,this.colorB,random(1));
      baseColor = color(red(trimColor)*4, green(trimColor)*4, blue(trimColor)*4);
      this.boids[i].setColor(trimColor, baseColor);
    }
  }
  
  addBoid(x,y){
    this.boids.push(new Boid());
    this.boids[this.count].setPos(createVector(x, y));
    
    let trimColor = lerpColor(this.colorA,this.colorB,random(1));
    let baseColor = color(red(trimColor)*4, green(trimColor)*4, blue(trimColor)*4);
    this.boids[this.count].setColor(trimColor, baseColor);
    
    this.count++;
  }
  
  add
}