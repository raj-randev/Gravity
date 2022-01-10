/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Select Canvas in HTML File
var canvas = document.querySelector('canvas'); //Be able to draw on canvas

var c = canvas.getContext('2d'); //Set initial canvas width and height to match the browser width and height

canvas.width = innerWidth;
canvas.height = innerHeight; //**Variables**//
//Array of colours to choose from

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']; //Gravity to a constant

var gravity = 1; //Friction set as a fraction: it is maultiplied by the speed each time to casue an eventual stop

var friction = 0.9; // Event Listeners
//Resizing the browser window

addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight; //reset balls on resize

  init();
}); //Click on screen

addEventListener("click", function () {
  //reset balls on click
  init();
}); //Utility Functions
//Produce a random number between the 2 numbers enetered

randomIntFromRange = function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}; //Returns a colour from the colour array selection


randomColor = function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}; // Objects
//Class Constructor that gives instruction on the build and position of ball


var Ball = function Ball(x, y, dx, dy, radius, color, strkColor) {
  var _this = this;

  _classCallCheck(this, Ball);

  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;
  this.strkColor = strkColor;

  this.update = function () {
    //Controls the up and down movement of the ball
    if (_this.y + _this.radius + _this.dy > canvas.height) {
      _this.dy = -_this.dy * friction; //instructs the ball's height and speed of ascent: Gets smaller with each bounce
    } else {
      _this.dy += gravity; // instructs the ball on descent
    } //Controls the side to side movement of the ball


    if (_this.x + _this.radius + _this.dx > canvas.width || _this.x - _this.radius <= 0) {
      _this.dx = -_this.dx * friction; //instructs the ball's travel length and speed: Gets smaller with each bounce
    } //x-asis(position + velocity)


    _this.x += _this.dx; //y-axis(position + velocity)

    _this.y += _this.dy; //draws the ball

    _this.draw();
  }; //istructions on building the ball


  this.draw = function () {
    c.beginPath();
    c.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
    c.fillStyle = _this.color;
    c.fill();
    c.stroke();
    c.strokeStyle = c.closePath();
  };
}; // Implementation
//Array for the balls to live in


var ballArray = [];

init = function init() {
  ballArray = []; //state an empty array at the start of the function to clear screen if the resize or click eventhandler are triggered
  //Indicates the number of ball wanted on the screen

  for (var i = 0; i < 100; i++) {
    var radius = randomIntFromRange(10, 40); //sizes are between

    var x = randomIntFromRange(radius, canvas.width - radius); //places the x-axis starting position between width of the window(includes padding == the radius of the smallest ball) 

    var y = randomIntFromRange(radius, canvas.height - radius); //places the y-axis starting position between height of the window(includes padding == the radius of the smallest ball) 

    var dx = randomIntFromRange(-5, 5); //sets the x-axis velocity between -5 and 5(left or right)

    var dy = randomIntFromRange(-5, 5); //sets the y-axis velocity between -5 and 5(down or up)

    var color = randomColor(colors); //puts the ball created in the Array

    ballArray.push(new Ball(x, y, dx, dy, radius, color, "red"));
  }
}; // Animation Loop


animate = function (_animate) {
  function animate() {
    return _animate.apply(this, arguments);
  }

  animate.toString = function () {
    return _animate.toString();
  };

  return animate;
}(function () {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
});

init();
animate();

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map