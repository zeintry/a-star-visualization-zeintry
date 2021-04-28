/* Generously donated by: https://www.w3schools.com/howto/howto_js_rangeslider.asp 
*/

//----------------------------------------------------------------------
// Name: Alan Poblette
// File: slider.js
// Date: Spring 2021
// Desc: Implements a value slider input for A* project. Took inspiration from 
//   linked source.
//----------------------------------------------------------------------

var algoSpeed = null;

/* Get speed from slider on page */
var slider = document.getElementById('myRange');
var sliderOutput = document.getElementById('sliderOutput');

// display default slider value
sliderOutput.innerHTML = 'value: ' + slider.value;
algoSpeed = slider.value;

/* oninput handler function for my slider */
slider.oninput = function() {
    algoSpeed = this.value;
    sliderOutput.innerHTML = 'value: ' + algoSpeed;
}
