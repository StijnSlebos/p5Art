/* P5 test, artwork - Stijn Slebos*/

var x, y, speedx, speedy, size; 
var time, sinetime;
let balls = [];
let box = [];



function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  //x = y = 50;
  time = sinetime = 0;
  y = 0;
  //size = 30;
  //speedx = speedy = 6;
  noStroke();


  for (let i = 0; i< 100; i++) {
    balls[i] = new Ball(random(10, 30), int(random(50, width-50)), int(random(50, height-50)));
  }
}


function draw() {
  time ++;
  sinetime ++;
  //color changer
  if (time > 10) {
    background('rgba(20, 20, 90,0.5)');
    time = 0;
    fill(0);
  } else {
    fill(255);
  }

  var c = sin(sinetime/50)*255/2 + 255/2;
  fill(c, 0, 124-c/4);
  for (let i = 0; i < balls.length; i++) {
    balls[i].bounce();
    balls[i].update();
    //fill(c, 0, 128-(y/2));
    balls[i].display();
    for ( let j = 0; j< box.length; j++) {
      balls[i].collide(box[j]);
    }
  }
  fill(88-c/3, 10, 50);
  for ( let i = 0; i< box.length; i++) {
    if (box[i].update()) {
      box[i].display();
    } //should be removed arraylist style
  }
  if (box.length > 50) {
    box = [];
  }
}

function mouseClicked() {
  let object = new Box(mouseX, mouseY);
  //print("hey");
  box.push(object);
  background(0);
}

function Box(x, y) {
  this.size = 100;
  this.position = createVector(x, y); // center of the box
  this.speed = createVector(random(-1, 1), random(-1, 1));
  this.col = color(int(random(0, 200)), 0, 20);
}

Box.prototype.update = function() {
  this.speed.x *= 1.005;
  //this.position.add(this.speed);
  if (this.position.x>width+this.size/2 || this.position.x < -this.size/2) {
    return false;
  } else if (this.position.y>height-this.size/2 || this.position.y < this.size/2) {
    this.speed.y *= -1;
    this.position.add(this.speed);
    return true;
  } else { 
    this.position.add(this.speed);
    return true;
  }
};

Box.prototype.display = function() {
  ellipse(this.position.x, this.position.y, this.size, this.size);
  //rect(this.position.x, this.position.y, this.size, this.size);
};


function Ball(s, x, y) {
  this.size = s;
  this.position = createVector(x, y);
  this.speed = createVector(int(random(-3, 3)), int(random(-3, 3)));
  if (this.speed.x == 0 && this.speed.y == 0) {
    this.speed.y = 1;
  }
}

Ball.prototype.collide = function(box) {
  var distSq = (this.position.x - box.position.x)*(this.position.x - box.position.x) + (this.position.y - box.position.y)*(this.position.y - box.position.y);
  var reqDistSq = (this.size/2 + box.size/2)*(this.size/2 + box.size/2);
  if (distSq<=reqDistSq) {
    var newSpeed = createVector(this.position.x - box.position.x, this.position.y - box.position.y);
    var speedMag = this.speed.mag();
    newSpeed.normalize();
    newSpeed.dot(this.speed);
    newSpeed.setMag(speedMag);

    this.speed.set(newSpeed);
  }
};

Ball.prototype.update = function() {  
  this.position.add(this.speed);
};

Ball.prototype.bounce = function() {
  if (this.position.x > width-this.size/2) {
    this.speed.x *= -1;
    this.position.x = width-this.size/2;
  } else if (this.position.x < this.size/2) {
    this.speed.x *= -1;
    this.position.x = this.size/2;
  } else if (this.position.y > height-this.size/2) {
    this.speed.y *= -1;
    this.position.y = height-this.size/2;
  } else if (this.position.y < this.size/2) {
    this.speed.y *= -1;
    this.position.y = this.size/2;
  }
};

Ball.prototype.display = function() {
  ellipse(this.position.x, this.position.y, this.size, this.size);
};


function Ball(s, x, y) {
  this.size = s;
  this.position = createVector(x, y);
  this.speed = createVector(random(-4, 3), random(-3, 4));
}

Ball.prototype.update = function() {  
  this.position.add(this.speed);
};

Ball.prototype.bounce = function() {
  if (this.position.x >= width-this.size/2) {
    this.speed.x *= -1;
    this.position.x = width-this.size/2;
  } else if (this.position.x <= this.size/2) {
    this.speed.x *= -1;
    this.position.x = this.size/2;
  } else if (this.position.y >= height-this.size/2) {
    this.speed.y *= -1;
    this.position.y = height-this.size/2;
  } else if (this.position.y <= this.size/2) {
    this.speed.y *= -1;
    this.position.y = this.size/2;
  }
};

Ball.prototype.display = function() {
  ellipse(this.position.x, this.position.y, this.size, this.size);
};



function windowResized() {
  var t = 0;
  while (t<100000) {
    t++;
  }
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
