

var x, y, speedx, speedy, size, time;
let balls = [];

function setup() {
  createCanvas(1230, 240);
  x = y = 50;
  time = 0;
  size = 30;
  speedx = speedy = 6;
  noStroke();

  for (let i = 0; i< 100; i++) {
    balls[i] = new Ball(random(5, 30), int(random(50, width-50)), int(random(50, height-50)));
  }
}


function draw() {
  time ++;
  //color changer
  if (time > 10) {
    background('rgba(20, 20, 90,0.5)');
    time = 0;
    fill(0);
  } else {
    fill(255);
  }
  //bounce function
  if (x>=width-size/2 || x< size/2) {
    speedx = -speedx;
  }
  if ( y < size/2 || y> height-size/2) {
    speedy = -speedy;
  }
  x += speedx;
  y += speedy;
  //draw
  //ellipse(x, y, size, size);

  for (let i = 0; i < balls.length; i++) {
    balls[i].bounce();
    balls[i].update();
    balls[i].display(y);
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
  fill(180-y_/4, 0, 255-y_);
  ellipse(this.position.x, this.position.y, this.size, this.size);
};
