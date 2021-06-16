class Boid{
  constructor(){
    this.direction = p5.Vector.random2D().normalize();
    this.position = createVector(random(width),random(height));
    this.scale = random(8,13);
    this.speed = (2*(14-this.scale)/5);
    this.trimColor = color(0,0,0);
    this.baseColor = color(255,255,255);
  }
  
  draw(){
    let heading = this.direction.heading() - HALF_PI;
    
    let tip = createVector(0,0.5*this.scale);
    
    let right = createVector(0.5*this.scale, -0.5*this.scale);
    
    let left = createVector(-0.5*this.scale, -0.5*this.scale);
    
    push();
    
    translate(this.position.x, this.position.y);
    rotate(heading);
    fill(this.baseColor);
    stroke(this.baseColor);
    triangle(tip.x, tip.y, right.x, right.y, left.x, left.y);
    
    pop();
  }
  
  moveForward(){
    this.position.add(p5.Vector.mult(this.direction, this.speed*deltaTime/50 ));
    
    if(this.position.x > width | this.position.x < 0){
      this.position.x = max(min(this.position.x, width), 0);
      this.direction.x = -this.direction.x;
    }
    
    if(this.position.y > height | this.position.y < 0){
      this.position.y = max(min(this.position.y, height), 0);
      this.direction.y = -this.direction.y;
    }
  }
  
  getDir(){
    return this.direction;
  }
  
  setDir(dir){
    this.direction = p5.Vector.normalize(dir);
  }
  
  getPos(){
    return this.position;
  } 
  
  setPos(pos){
    this.position = pos;
  }
  
  setColor(trim, base){
    this.trimColor = trim;
    this.baseColor = base;
  }
}