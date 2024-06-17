const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.5;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.width = 30;
    this.height = 30;
    this.color = "red";
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.speed = 5;
    this.jumpStrength = 10;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x; // Update horizontal position based on velocity
    this.position.y += this.velocity.y; // Update vertical position based on velocity

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }

  resetPosition() {
    this.position.x = 100;
    this.position.y = 100;
  }
}

class Platform {
  constructor(x, y, width, height) {
    this.position = {
      x,
      y,
    };
    this.width = width;
    this.height = height;
    this.color = "blue";
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.draw;
  }

  resetPosition() {
    this.position.x = 0;
  }
}

const player = new Player();
const platform = new Platform(0, canvas.height / 2, 500, 30);
const keys = {
  left: false,
  right: false,
  jump: false,
};

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  player.update(); // Call the update method
  platform.draw();

  if (keys.left && player.position.x >= 100) {
    player.velocity.x = -player.speed;
  } else if (keys.right && player.position.x < canvas.width / 2) {
    player.velocity.x = player.speed;
  } else {
    player.velocity.x = 0;

    if (keys.left) {
      platform.position.x -= player.speed;
    } else if (keys.right) {
      platform.position.x += player.speed;
    }
  }

  if (keys.jump && player.position.y + player.height === platform.position.y) {
    player.velocity.y = -player.jumpStrength;
    keys.jump = false;
  }

  // Check for collision between player and platform
  if (
    player.position.x < platform.position.x + platform.width &&
    player.position.x + player.width > platform.position.x &&
    player.position.y + player.height > platform.position.y &&
    player.position.y < platform.position.y + platform.height
  ) {
    // Collision detected
    // Handle collision logic here
    // For example, stop player from falling through platform
    player.position.y = platform.position.y - player.height;
    player.velocity.y = 0;
  }

  if (player.position.y + player.height === canvas.height) {
    player.resetPosition();
    platform.resetPosition();
  }
}

animate(); // Start the animation loop

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      keys.left = true;
      break;
    case "ArrowRight":
    case "d":
      keys.right = true;
      break;
    case " ":
      keys.jump = true;
      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowLeft":
    case "a":
    case "ArrowRight":
    case "d":
      keys.left = false;
      keys.right = false;
      break;
    case " ":
      keys.jump = false;
      break;
  }
});
