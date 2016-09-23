(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict;"

/* Classes */
const Game = require('./game.js');
const Player = require('./player.js');
const Car = require('./car.js');
const Log = require('./log.js');

/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);
var bg = new Image();
bg.src = encodeURI('assets/bg.png');
var level = 1;
var lives = 3;
var player = new Player({x: 0, y: 240});
var car1 = new Car({x: 132, y: 480}, level, true);
var car2 = new Car({x: 132, y: 288}, level, true);
var car3 = new Car({x: 132, y: 96}, level, true);
var car4 = new Car({x: 259, y: 400}, level, true);
var car5 = new Car({x: 259, y: 216}, level, true);
var car6 = new Car({x: 259, y: 24}, level, true);
var car7 = new Car({x: 323, y: 416}, level, false);
var car8 = new Car({x: 323, y: 224}, level, false);
var car9 = new Car({x: 323, y: 32}, level, false);
var log1 = new Log({x: 516, y: 450}, level, true);
var log2 = new Log({x: 516, y: 258}, level, true);
var log3 = new Log({x: 580, y: 256}, level, false);
var log4 = new Log({x: 580, y: 128}, level, false);
var log5 = new Log({x: 642, y: 340}, level, true);
var log6 = new Log({x: 642, y: 148}, level, true);

/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function(timestamp) {
  game.loop(timestamp);
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
  car1.update(elapsedTime);
  car2.update(elapsedTime);
  car3.update(elapsedTime);
  car4.update(elapsedTime);
  car5.update(elapsedTime);
  car6.update(elapsedTime);
  car7.update(elapsedTime);
  car8.update(elapsedTime);
  car9.update(elapsedTime);
  log1.update(elapsedTime);
  log2.update(elapsedTime);
  log3.update(elapsedTime);
  log4.update(elapsedTime);
  log5.update(elapsedTime);
  log6.update(elapsedTime);
  if(player.update(elapsedTime)) {
    console.log("Poop");
    advanceLevel();
  }
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function render(elapsedTime, ctx) {
  ctx.drawImage(bg,0,0,760,480);
  log1.render(elapsedTime, ctx);
  log2.render(elapsedTime, ctx);
  log3.render(elapsedTime, ctx);
  log4.render(elapsedTime, ctx);
  log5.render(elapsedTime, ctx);
  log6.render(elapsedTime, ctx);
  player.render(elapsedTime, ctx);
  car1.render(elapsedTime, ctx);
  car2.render(elapsedTime, ctx);
  car3.render(elapsedTime, ctx);
  car4.render(elapsedTime, ctx);
  car5.render(elapsedTime, ctx);
  car6.render(elapsedTime, ctx);
  car7.render(elapsedTime, ctx);
  car8.render(elapsedTime, ctx);
  car9.render(elapsedTime, ctx);
  ctx.fillStyle = "black";
  ctx.font = "20px Segoe UI";
  ctx.fillText("Level: " + level, 16, 464);
  ctx.fillText("Lives: " + lives, 684, 464);
}

function advanceLevel() {
  level++;
  reset();
}

function reset() {
  player = new Player({x: 0, y: 240});
  car1 = new Car({x: 132, y: 480}, level, true);
  car2 = new Car({x: 132, y: 288}, level, true);
  car3 = new Car({x: 132, y: 96}, level, true);
  car4 = new Car({x: 259, y: 400}, level, true);
  car5 = new Car({x: 259, y: 216}, level, true);
  car6 = new Car({x: 259, y: 24}, level, true);
  car7 = new Car({x: 323, y: 416}, level, false);
  car8 = new Car({x: 323, y: 224}, level, false);
  car9 = new Car({x: 323, y: 32}, level, false);
  log1 = new Log({x: 516, y: 450}, level, true);
  log2 = new Log({x: 516, y: 258}, level, true);
  log3 = new Log({x: 580, y: 256}, level, false);
  log4 = new Log({x: 580, y: 128}, level, false);
  log5 = new Log({x: 642, y: 340}, level, true);
  log6 = new Log({x: 642, y: 148}, level, true);
}

},{"./car.js":2,"./game.js":3,"./log.js":4,"./player.js":5}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
"use strict";

/**
 * @module exports the Game class
 */
module.exports = exports = Game;

/**
 * @constructor Game
 * Creates a new game object
 * @param {canvasDOMElement} screen canvas object to draw into
 * @param {function} updateFunction function to update the game
 * @param {function} renderFunction function to render the game
 */
function Game(screen, updateFunction, renderFunction) {
  this.update = updateFunction;
  this.render = renderFunction;

  // Set up buffers
  this.frontBuffer = screen;
  this.frontCtx = screen.getContext('2d');
  this.backBuffer = document.createElement('canvas');
  this.backBuffer.width = screen.width;
  this.backBuffer.height = screen.height;
  this.backCtx = this.backBuffer.getContext('2d');

  // Start the game loop
  this.oldTime = performance.now();
  this.paused = false;
}

/**
 * @function pause
 * Pause or unpause the game
 * @param {bool} pause true to pause, false to start
 */
Game.prototype.pause = function(flag) {
  this.paused = (flag == true);
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
Game.prototype.loop = function(newTime) {
  var game = this;
  var elapsedTime = newTime - this.oldTime;
  this.oldTime = newTime;

  if(!this.paused) this.update(elapsedTime);
  this.render(elapsedTime, this.frontCtx);

  // Flip the back buffer
  this.frontCtx.drawImage(this.backBuffer, 0, 0);
}

},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
"use strict";

const MS_PER_FRAME = 1000/8;

/**
 * @module exports the Player class
 */
module.exports = exports = Player;

var win = false;

/**
 * @constructor Player
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
function Player(position) {
  this.state = "idle";
  this.x = position.x;
  this.y = position.y;
  this.width  = 64;
  this.height = 64;
  this.spritesheet  = new Image();
  this.spritesheet.src = encodeURI('assets/PlayerSprite2.png');
  this.spritesheetleft = new Image();
  this.spritesheetleft.src = encodeURI('assets/PlayerSprite2-1.png');
  this.timer = 0;
  this.frame = 0;
  this.hops = 0;

  var context = this;
  window.onkeydown = function(event) {
  if(context.state != "idle") return;
  //UP
  switch(event.keyCode) {
		case 38:
		case 87:
			context.state = "hopUp";
			break;
		//LEFT
		case 37:
		case 65:
			context.state = "hopLeft";
			break;
		//DOWN
		case 40:
		case 83:
			context.state = "hopDown";
			break;
		//RIGHT
		case 39:
		case 68:
			context.state = "hopRight";
			break;
    }
  }
}

/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Player.prototype.update = function(time) {
  switch(this.state) {
    case "idle":
    this.hops = 0;
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        if(this.frame > 3) this.frame = 0;
      }
      break;
    case "hopUp":
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        this.y -= 16;
        this.hops++;
        if(this.frame > 3) {
          this.frame = 0;
        }
        if(this.hops >= 4) this.state = "idle";
      }
      break;
    case "hopLeft":
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        this.x -= 16;
        this.hops++;
        if(this.frame > 3) {
          this.frame = 0;
        }
        if(this.hops >= 4) this.state = "idle";
      }
      break;
    case "hopDown":
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        this.y += 16;
        this.hops++;
        if(this.frame > 3) {
          this.frame = 0;
        }
        if(this.hops >= 4) this.state = "idle";
      }
      break;
    case "hopRight":
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        this.x += 16;
        this.hops++;
        if(this.frame > 3) {
          this.frame = 0;
        }
        if(this.hops >= 4) this.state = "idle";
      }
      break;
  }
  if(this.x < 0) {
    this.x = 0;
  }
  if(this.y < 0) {
    this.y = 0;
  }
  if(this.y + this.height > 480) {
    this.y = 480 - this.height;
  }
  if(this.x >= 696) {
    return true;
  }
}

/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Player.prototype.render = function(time, ctx) {
  switch(this.state) {
    case "idle":
      ctx.drawImage(
        // image
        this.spritesheet,
        // source rectangle
        this.frame * 64, 64, this.width, this.height,
        // destination rectangle
        this.x, this.y, this.width, this.height
      );
      break;
    case "hopUp":
    case "hopDown":
    case "hopRight":
      ctx.drawImage(
        // image
        this.spritesheet,
        // source rectangle
        this.frame * 64, 0, this.width, this.height,
        // destination rectangle
        this.x, this.y, this.width, this.height
      );
      break;
    case "hopLeft":
      ctx.drawImage(
        // image
        this.spritesheetleft,
        // source rectangle
        this.frame * 64, 0, this.width, this.height,
        // destination rectangle
        this.x, this.y, this.width, this.height
      );
      break;
    // TODO: Implement your player's rendering according to state
  }
}

},{}]},{},[1]);
