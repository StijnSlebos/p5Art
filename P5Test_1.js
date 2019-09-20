

var x, y, speedx, speedy, size; 
var time, sinetime;
let balls = [];
let box = []; // dit wordt dus een object waar de balletjes niet doorheen kunnen.

function setup() {
  createCanvas(480, 900);
  //x = y = 50;
  time = sinetime = 0;
  //size = 30;
  //speedx = speedy = 6;
  noStroke();

  for (let i = 0; i< 100; i++) {
    balls[i] = new Ball(random(5, 30), int(random(50, width-50)), int(random(50, height-50)));
  }
}


function draw() {
  time ++;
  sinetime ++;
  //color changer
  if (time > 10) {
    background('rgba(20, 20, 90,0.05)');
    time = 0;
    fill(0);
  } else {
    fill(255);
  }
  //bounce function
  //if (x>=width-size/2 || x< size/2) {
  //  speedx = -speedx;
  //}
  //if ( y < size/2 || y> height-size/2) {
  //  speedy = -speedy;
  //}
  //x += speedx;
  //y += speedy;
  //draw
  //ellipse(x, y, size, size);

  var c = sin(sinetime/50)*255/2 + 255/2;
  for (let i = 0; i < balls.length; i++) {
    balls[i].bounce();
    balls[i].update();
    balls[i].display(c);
  }
}

function Ball(s, x, y) {
  this.size = s;
  this.position = createVector(x, y);
  this.speed = createVector(int(random(-4, 3)), int(random(-3, 4)));
}

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

Ball.prototype.display = function(y_) {
  if (this.speed.x == 0 && this.speed.y == 0) {
    this.speed.y = 1;
  } else {
    fill(y_, 0, y_/4);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }
};
