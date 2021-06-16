class GridContainer{
  constructor(){
    this.boids = [];
    this.savedDir = false;
    this.dir;
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
    let dir = createVector(1,0);
    let diff;
    
    for(let i in this.boids){
      diff = p5.Vector.sub(pos, this.boids[i].getPos());
      
      if(diff.mag() < 10){
        dir.add(diff);
      }
    }
    
    return dir.normalize();
  }
}