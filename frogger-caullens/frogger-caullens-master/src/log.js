"use strict";

const MS_PER_FRAME = 1000/8;

/**
 * @module exports the Log class
 */
module.exports = exports = Log;

/**
 * @constructor Log
 * Creates a new car object
 * @param {Postition} position object specifying an x and y
 * @param speed, how fast it travels
 * @param bool, whether it goes up or down
 */
function Log(position, speed, dir) {
  this.x = position.x;
  this.y = position.y;
  this.dir = dir;
  this.speed = speed;
  this.width  = 56;
  this.height = 76;
  this.spritesheet  = new Image();
  this.spritesheet.src = encodeURI('assets/log.png');
}

/**
 * @function updates the log object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Log.prototype.update = function(time) {
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
 * @function renders the log into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Log.prototype.render = function(time, ctx) {
    ctx.drawImage(this.spritesheet,this.x,this.y,this.width,this.height);
  }