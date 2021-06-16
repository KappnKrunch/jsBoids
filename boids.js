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
    let gridSize = 10;
    let key;
    let pos;

    for(let i = 0; i < this.count; i++){
      pos = p5.Vector.mult(this.boids[i].getPos(), createVector(gridSize/width,gridSize/height));
      pos.x = round(pos.x);
      pos.y = round(pos.y);
      pos = p5.Vector.mult(pos, createVector(width/gridSize,height/gridSize));

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
      pos = p5.Vector.mult(pos, createVector(width/gridSize,height/gridSize));

      key = "" + round(pos.x) + "," + round(pos.y);

      let dir = this.boids[i].getDir();
      let avoidDir = createVector(0,0);
      let avoidCount = 0;
      dir.add(p5.Vector.mult(this.grid.get(key).getDir(),0.05));

      for(let x =-3; x <= 3; x++){
        for(let y = -3; y <= 3; y++){
          key = "" + round((pos.x + x*width)/gridSize)*gridSize +"," + round((pos.y + y*height)/gridSize)*gridSize;
          if(this.grid.has(key)){
            let strength = (18 - x*x + y*y)/10*18;
            dir.add(p5.Vector.mult(this.grid.get(key).getDir(), strength));
            //avoidDir.add(p5.Vector.mult(p5.Vector.sub(this.boids[i].getPos(), this.grid.get(key).getAvoid()), strength));
          }
        }
      }

      dir.add(p5.Vector.mult(avoidDir.normalize(),0));
      dir.add(p5.Vector.random2D().normalize().mult(0.05));

      this.boids[i].setDir(dir);
      this.boids[i].moveForward();
      this.boids[i].draw();
    }
  }
  
  setColorRange(a,b){
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
}