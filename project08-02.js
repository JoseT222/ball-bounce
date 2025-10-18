/*
  Name: [Your Name]
  Date: [Today's Date]
  File: project08-02.js
*/

// ====== Constant Values ======
const BOX_WIDTH = 400;
const BOX_HEIGHT = 300;
const BALL_RADIUS = 40;

// ====== Object Code ======
const box = {
  width: BOX_WIDTH,
  height: BOX_HEIGHT,
  xPos: 0,
  yPos: 0
};

// ====== Constructor Function for Ball ======
function Ball(size) {
  this.radius = size;
  this.xPos = null;
  this.yPos = null;
  this.xVelocity = null;
  this.yVelocity = null;
}

// ====== Method: moveWithin(container) ======
Ball.prototype.moveWithin = function(container) {
  const ballTop = this.yPos;
  const ballLeft = this.xPos;
  const ballBottom = this.yPos + this.radius;
  const ballRight = this.xPos + this.radius;

  // Bounce vertically
  if (ballTop < 0 || ballBottom > container.height) {
    container.yPos += this.yVelocity;
    this.yVelocity = -this.yVelocity;
  }

  // Bounce horizontally
  if (ballLeft < 0 || ballRight > container.width) {
    container.xPos += this.xVelocity;
    this.xVelocity = -this.xVelocity;
  }

  // Move ball
  this.yPos += this.yVelocity;
  this.xPos += this.xVelocity;
};

// ====== Utility Function ======
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ====== Interface Code ======
const addBallButton = document.getElementById("addBall");
const boxImage = document.getElementById("box");

addBallButton.onclick = function() {
  // Create new ball
  const newBall = new Ball(BALL_RADIUS);

  // Center the ball
  newBall.yPos = (BOX_HEIGHT - BALL_RADIUS) / 2;
  newBall.xPos = (BOX_WIDTH - BALL_RADIUS) / 2;

  // Random velocity
  newBall.yVelocity = rand(-10, 10);
  newBall.xVelocity = rand(-10, 10);

  // Create ball element
  const ballImage = document.createElement("div");
  ballImage.className = "ball";
  ballImage.style.top = newBall.yPos + "px";
  ballImage.style.left = newBall.xPos + "px";
  boxImage.appendChild(ballImage);

  // Animate motion
  window.setInterval(function() {
    newBall.moveWithin(box);

    ballImage.style.top = newBall.yPos + "px";
    ballImage.style.left = newBall.xPos + "px";

    // Shake container
    boxImage.style.top = box.yPos + "px";
    boxImage.style.left = box.xPos + "px";
  }, 25);
};
