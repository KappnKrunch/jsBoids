class GridContainer{
  constructor(){
    this.dirs = createVector(0,0);
    this.positions = createVector(0,0);
    this.positionCounts = 0;
  }
  
  addDir(dir){
    this.dirs.add(dir);
  }
  
  addPos(pos){
    this.positions.add(pos);
    this.positionsCount++;
  }
  
  getDir(){
    return this.dirs.normalize();
  }
  
  getRAWDir(){
    return this.dirs;
  }
  
  getAvoidDir(pos){
    print(p5.Vector.mult(this.positions, this.positionsCount));
    let dir = p5.Vector.sub(p5.Vector.div(this.positions, this.positionsCount), pos);
    
    
    
    if(dir.mag() <= 1){
      return dir;
    }
    else{
      return dir.normalize();
    }
  }
}