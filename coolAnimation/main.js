// Get the canvas element by id
const canvas = document.getElementById("canvas");

// Set the canvas width and height to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get the canvas context for drawing
const ctx = canvas.getContext("2d");

// Create an array of colors to use
const colors = ["#FF4136", "#FF851B", "#FFDC00", "#2ECC40", "#0074D9", "#B10DC9"];

// Create a function to draw a random shape at a random location with a random color
function drawShape() {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 100 + 50;
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fill();
}

// Call the drawShape function every 100 milliseconds
setInterval(drawShape, 100);