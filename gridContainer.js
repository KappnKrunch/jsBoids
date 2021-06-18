class GridContainer{
  constructor(){
    this.boids = [];
    this.savedDir = false;
    this.dir;
    this.avgPos;
    this.savedPos = false;
  }
  
  addBoid(boid){
    this.boids.push(boid);
  }
  
  getRAWDir(){
    if(!this.savedDir){
      let dir = createVector(0,0);
    
      for(let i in this.boids){
        dir.add(this.boids[i].getDir());
      }
      
      this.saved = true;
      this.dir = dir;
    }
    
    return this.dir;
  }
  
  getDir(){
    return this.getRAWDir().normalize();
  }
  
  getAvoid(pos){
    let dir = createVector(0,0);
    let diff;
    
    for(let i in this.boids){
      diff = p5.Vector.sub(pos, this.boids[i].getPos());
      
      dir.add(diff);
    }
    
    return dir.normalize();
  }
  
  getAvgPos(){
    if(!this.savedPos){
      let pos = createVector(0,0);
    
      for(let i in this.boids){
        pos.add(this.boids[i].getPos());

      }

      this.avgPos = pos.div(this.boids.length);

      this.savedPos = true;
    }
    
    return this.avgPos;
  }
  
  getConvergenceDir(pos){
    return p5.Vector.sub(this.getAvgPos(),pos).normalize();
  }
}