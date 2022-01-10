//Select Canvas in HTML File
const canvas = document.querySelector('canvas')

//Be able to draw on canvas
const c = canvas.getContext('2d');

//Set initial canvas width and height to match the browser width and height
canvas.width = innerWidth;
canvas.height = innerHeight;

//**Variables**//

//Array of colours to choose from
let colors = [
  '#2185C5', 
  '#7ECEFD', 
  '#FFF6E5', 
  '#FF7F66'
]

//Gravity to a constant
let gravity = 1;

//Friction set as a fraction: it is maultiplied by the speed each time to casue an eventual stop
let friction = 0.9;

// Event Listeners

//Resizing the browser window
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  //reset balls on resize
  init();
});

//Click on screen
addEventListener("click", () => {
  //reset balls on click
  init();
})

//Utility Functions

//Produce a random number between the 2 numbers enetered
 randomIntFromRange = (min,max) => {
  return Math.floor(Math.random() * (max -min +1) + min);
}

//Returns a colour from the colour array selection
randomColor = (colors) => {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Objects

//Class Constructor that gives instruction on the build and position of ball
class Ball {
  constructor(x, y, dx, dy, radius, color, strkColor) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.strkColor = strkColor;

    this.update = () => {

      //Controls the up and down movement of the ball
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy * friction; //instructs the ball's height and speed of ascent: Gets smaller with each bounce
      } else {
        this.dy += gravity; // instructs the ball on descent
      }

      //Controls the side to side movement of the ball
      if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
        this.dx = -this.dx * friction; //instructs the ball's travel length and speed: Gets smaller with each bounce
      }

      //x-asis(position + velocity)
      this.x += this.dx;

      //y-axis(position + velocity)
      this.y += this.dy;

      //draws the ball
      this.draw();
    };

    //istructions on building the ball
    this.draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.stroke();
      c.strokeStyle =
        c.closePath();
    };
  }
}

// Implementation

//Array for the balls to live in
let ballArray = [];


init = () => {
  ballArray = [];//state an empty array at the start of the function to clear screen if the resize or click eventhandler are triggered
  
  //Indicates the number of ball wanted on the screen
  for (let i = 0; i < 100; i++) {
    let radius = randomIntFromRange(10, 40);//sizes are between
    let x = randomIntFromRange(radius, canvas.width - radius);//places the x-axis starting position between width of the window(includes padding == the radius of the smallest ball) 
    let y = randomIntFromRange(radius, canvas.height - radius);//places the y-axis starting position between height of the window(includes padding == the radius of the smallest ball) 
    let dx = randomIntFromRange(-5, 5);//sets the x-axis velocity between -5 and 5(left or right)
    let dy = randomIntFromRange(-5, 5);//sets the y-axis velocity between -5 and 5(down or up)
    let color = randomColor(colors);

    //puts the ball created in the Array
    ballArray.push(new Ball(x, y, dx, dy,  radius, color, "red"));
  }
}


// Animation Loop

animate = () => {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
  
}

init();
animate();
