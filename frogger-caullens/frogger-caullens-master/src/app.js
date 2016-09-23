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
