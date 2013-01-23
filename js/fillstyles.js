'use strict';

/**
 * Contains various fill style constants.
 */
var FillStyles = {};

/**
* The fill style to use for unlit LEDs.
* @const
* @type {string}
*/
FillStyles.UNLIT = "#AAAAAA";

/**
* The fill style to use for lit LEDs in the currently-selected frame.
* @const
* @type {string}
*/     
FillStyles.CURRENT_FRAME = "#F39814";

/**
* The fill style to use for lit LEDs in the previous frame.
* @const
* @type {string}
*/
FillStyles.PREV_FRAME = "rgba(0, 255, 255, 0.45)";

/**
* The fill style, without alpha transparency, to use for 
* lit LEDs in the previous frame.
* @const
* @type {string}
*/
FillStyles.PREV_FRAME_NOALPHA = "rgb(0, 255, 255)";

/**
* The fill style to use for lit LEDs in the next frame.
* @const
* @type {string}
*/
FillStyles.NEXT_FRAME = "rgba(255, 0, 255, 0.45)";

/**
* The fill style, without alpha transparency, to use for 
* lit LEDs in the next frame.
* @const
* @type {string}
*/
FillStyles.NEXT_FRAME_NOALPHA = "rgb(255, 0, 255)";

/**
* The fill style to use for lit LEDs in the frame being previewed by a mouseover.
* @const
* @type {string}
*/     
FillStyles.MOUSEOVER_FRAME = "rgba(0, 255, 0, 0.7)";

/**
* The fill style, without alpha transparency, to use for 
* lit LEDs in the frame being previewed by a mouseover.
* @const
* @type {string}
*/     
FillStyles.MOUSEOVER_FRAME_NOALPHA = "rgba(0, 255, 0)";
