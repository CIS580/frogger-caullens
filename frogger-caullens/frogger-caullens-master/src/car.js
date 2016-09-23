"use strict";

const MS_PER_FRAME = 1000/8;

/**
 * @module exports the Car class
 */
module.exports = exports = Car;

/**
 * @constructor Car
 * Creates a new car object
 * @param {Postition} position object specifying an x and y
 * @param speed, how fast it travels
 * @param bool, whether it goes up or down
 */
function Car(position, speed, dir) {
  this.x = position.x;
  this.y = position.y;
  this.dir = dir;
  this.speed = speed;
  this.width  = 64;
  this.height = 96;
  this.carColor = Math.floor(Math.random()*5);
  this.spritesheet  = new Image();
  if(this.dir) {
    this.spritesheet.src = encodeURI('assets/cars_mini.svg');
  }
  else {
    this.spritesheet.src = encodeURI('assets/cars_mini-1.png');
  }
}

/**
 * @function updates the car object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Car.prototype.update = function(time) {
    if(this.dir) {
      if(this.y + this.height < 0) {
          this.y = 480;
      }
      else this.y -= this.speed;
    }
    else {
      if(this.y > 480) {
        this.y = 0 - this.height;
      }
      else this.y += this.speed;
    }
  }

/**
 * @function renders the car into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Car.prototype.render = function(time, ctx) {
    ctx.drawImage(
        this.spritesheet,
        this.carColor*236 + this.carColor*10,0,236,339,
        this.x,this.y,this.width,this.height
    );
  }