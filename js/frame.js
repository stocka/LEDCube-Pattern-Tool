'use strict';

/**
 * Creates a new frame instance.
 *
 * @constructor
 * @this {Frame}
 * @param {number} width The cube width.
 * @param {number} height The cube height.
 * @param {number} depth The cube depth.
 */
function Frame(width, height, depth){
  // Store width, height, depth.
  // TODO: figure out if we can store this in a better way,
  // currently we're storing it for each frame (which isn't great)
  this.width = width;
  this.height = height;
  this.depth = depth;
  
  // Initialize a duration (in ms)
  this.duration = Math.ceil(90.0 / 27.0) * width * height * depth;
  
  // Initialize the cells in the frame...
  this.cells = [];
  this.cells.length = width * height * depth;
  
  // ...and clear all of them
  var i;
  for (i = 0; i < width * height * depth; i += 1) {
    this.cells[i] = 0;
  }
}

/**
 * Returns the minimum time that can be spent on a single LED
 * (derived from 90ms minimum for 27, aka 3x3x3, LEDs).
 * @returns {number}
 */
Frame.prototype.getTimePerLed = function () {
  // TODO: tweak as necessary
  return Math.ceil(90.0 / 27.0);
};

/*
 * Returns the minimum duration value, given the dimensions
 * of this frame.
 * @returns {number}
 */
Frame.prototype.getMinDuration = function () {
  return Math.ceil(this.getTimePerLed() * this.cells.length);
}

/**
 * Returns the one-dimensional index for a 3-dimensional array.
 * @this {Frame}
 * @param {number} x The x-coordinate of the cell (0 is leftmost).
 * @param {number} y The y-coordinate of the cell (0 is topmost).
 * @param {number} z The z-coordinate of the cell (0 is in front).
 */
Frame.prototype.getIndex = function(x, y, z){
  // Least significant part of this coord is x (because it goes left to right first)
  // Next least significant part of this coord is y (because it goes top to bottom next)
  // Most significant part of this coord is z (because it goes front to back last)
  return x + (y * this.width) + (z * this.width * this.height);
};

/**
 * Sets a value at a particular cell.
 * @this {Frame}
 * @param {number} x The x-coordinate of the cell (0 is leftmost).
 * @param {number} y The y-coordinate of the cell (0 is topmost).
 * @param {number} z The z-coordinate of the cell (0 is in front).
 * @param {number} value Whether the cell is "lit" or not (either 1 or 0).
 */
Frame.prototype.setCell = function(x, y, z, value){
  this.cells[this.getIndex(x, y, z)] = value;
};

/**
 * Converts the given frame to a set of table items suitable for use
 * in an LED cube's firmware.
 * @param {boolean} depthBeforeHeight True if depth is less significant than height for code generation, false if height is less significant than depth (width is always least significant).
 * @returns {string} The code representation of the frame.
 */
Frame.prototype.toCode = function(depthBeforeHeight){
  var str = "";
  var i; // X-position
  var j; // Y-position
  var k; // Z-position
  // Add leading curly brace
  str = str + " { ";
  
  if (depthBeforeHeight === true) {
    // Height is most significant element
    for (j = 0; j < this.height; j += 1) {
      for (k = 0; k < this.depth; k += 1) {
        // TODO: figure out how formatting works for anything other than a width of 3,
        // for now we're just iterating through each row and printing 1 or 0 (which could be OK)
        // Add binary prefix
        str = str + "0b";
        
        for (i = 0; i < this.width; i += 1) {
          // Write 1 or 0 for this cell
          str = str + this.cells[this.getIndex(i, j, k)].toString();
        }
        
        // Add comma and space at the end (even for the last index because
        // we still need to write duration)
        str = str + ", ";
      }
    }
  }
  else {
    // Depth is most significant element
    for (k = 0; k < this.depth; k += 1) {
      for (j = 0; j < this.height; j += 1) {
        // TODO: figure out how formatting works for anything other than a width of 3,
        // for now we're just iterating through each row and printing 1 or 0 (which could be OK)
        // Add binary prefix
        str = str + "0b";
        
        for (i = 0; i < this.width; i += 1) {
          // Write 1 or 0 for this cell
          str = str + this.cells[this.getIndex(i, j, k)].toString();
        }
        
        // Add comma and space at the end (even for the last index because
        // we still need to write duration)
        str = str + ", ";
      }
    }
  }
  
  // Add duration, ending curly brace, comma, and newline.
  // Comma is okay even for the last frame because there'll
  // need to be a dummy item at the end
  str = str + (this.duration * 10).toString() + " }, \n";
  
  return str;
};
