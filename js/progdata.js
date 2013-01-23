'use strict';

/**
 * Creates an instance of ProgData, which stores
 * all information about an animation.
 * @constructor
 * @struct
 * @this {ProgData}
 * @param {number} width The cube width.
 * @param {number} height The cube height.
 * @param {number} depth The cube depth.
 * @param {number} canvasWidth The width of the preview canvas element.
 * @param {number} canvasHeight The height of the preview canvas element.
 */
function ProgData(width, height, depth, canvasWidth, canvasHeight) {

    /**
     * The width of the current animation.
     * @type {number}
     */
    this.cubeWidth = width;

    /**
     * The height of the current animation.
     * @type {number}
     */
    this.cubeHeight = height;

    /**
     * The depth of the current animation.
     * @type {number}
     */
    this.cubeDepth = depth;

    /**
     * The frames in this animation.
     * @type {Array.<Frame>}
     */
    this.frameCollection = [];

    // Store some extra canvas rendering calculations.
    /**
     * The height of the canvas.
     * @type {number}
     */
    this.canvasHeight = canvasHeight;

    /**
     * The width of the canvas.
     * @type {number}
     */
    this.canvasWidth = canvasWidth;

    /**
     * The radius for a full circle (2 radians)
     * @type {number}
     */
    this.canvasFullCircleRad = 2 * Math.PI;

    // TODO: modify separation values below based on dimensions 

    /**
     * The vertical separation between canvas grids.
     * @type {number}
     */
    this.canvasGridVertSep = 20;

    /**
     * The horizontal separation between canvas grids.
     * @type {number}
     */
    this.canvasGridHorizSep = 30;

    /**
     * The vertical separation between rows in a canvas grid.
     * @type {number}
     */
    this.canvasRowSep = 10;

    /**
     * The horizontal separation between columns in a canvas grid.
     * @type {number}
     */
    this.canvasColSep = 15;

    // Calculate initial offsets by determining the dimensions of the cube to render,
    // subtracting them from the available space, and dividing by 2

    /**
     * The initial horizontal rendering offset for the canvas.
     * The cell at (0,0,0) will be drawn at this position.
     * @type {number}
     */
    this.canvasStartX = (this.canvasWidth - (this.canvasGridHorizSep * (depth - 1)) - (this.canvasColSep * width)) / 2;

    /**
     * The initial vertical rendering offset for the canvas.
     * The cell at (0,0,0) will be drawn at this position.
     * @type {number}
     */
    this.canvasStartY = (this.canvasHeight - (this.canvasGridVertSep * (depth - 1)) - (this.canvasRowSep * height)) / 2;
}
