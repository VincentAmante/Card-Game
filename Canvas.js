// Gets the canvas and its context
var canvas = document.getElementById('cardGame');
var ctx = canvas.getContext("2d");

///// CODE IMPORTED FROM https://codepen.io/simon-wu/pen/ExgLEXQ TO RENDER ROUNDED RECTANGLE
// TODO: Turn this to my own
CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
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
}
// END OF IMPORTED CODE