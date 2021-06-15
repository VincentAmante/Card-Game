/*
    === Canvas.js ===
    Purpose:
        - Handle base canvas details
        - Handle any canvas functions
*/

// Gets the canvas and its context
let canvas = document.getElementById("cardGame");
let ctx = canvas.getContext("2d");
canvas.height = 768;
canvas.width = 1024;

/**
 * This draws a rounded rectangle using whatever context was given to it
 *
 * @param {number} x - x coordinate of rectangle
 * @param {number} y  - y coordinate
 * @param {number} width  - intended width
 * @param {number} height - intended height
 * @param {number} radius - radius of the rounded corners that form the rectangle
 * @returns A rounded rectangle
 */
CanvasRenderingContext2D.prototype.roundRect = function (
  x,
  y,
  width,
  height,
  radius
) {
  // Prevents errors from excess radius
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;

  this.beginPath();
  this.moveTo(x + radius, y);
  this.arcTo(x + width, y, x + width, y + height, radius);
  this.arcTo(x + width, y + height, x, y + height, radius);
  this.arcTo(x, y + height, x, y, radius);
  this.arcTo(x, y, x + width, y, radius);
  this.closePath();
  return this;
};
