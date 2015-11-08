
//
// GLOBALS
//
var sourceImage = document.getElementById('glitch-image');
var originalCanvas = document.getElementById('glitch-canvas-1');
var canvas2 = document.getElementById('glitch-canvas-2');
var canvas3 = document.getElementById('glitch-canvas-3');
var canvas4 = document.getElementById('glitch-canvas-4');


function glitchClicked() {
 		tryGlitch(10);
}


function tryGlitch(repetitions) {
	var originalCanvas = document.getElementById('glitch-canvas-1');
	var canvas2 = document.getElementById('glitch-canvas-2');
	setOriginalImage(originalCanvas);

	var parameters = getRandomParameters();
	displayParameters(parameters);

	var buffer = doGlitch(originalCanvas, parameters);
  var diff = compare(originalCanvas, canvas2);
	document.getElementById('differenceValue').innerHTML = diff;
	var diff2 = compare(canvas3, canvas2);
	console.log(diff);
	console.log(diff2);
}

function displayParameters(parameters)
{
		document.getElementById('amountValue').innerHTML = parameters['amount'];
		document.getElementById('seedValue').innerHTML = parameters['seed'];
		document.getElementById('iterationsValue').innerHTML = parameters['iterations'];
		document.getElementById('qualityValue').innerHTML = parameters['quality'];
}

function getRandomParameters(){
	var amountValue = Math.floor((Math.random() * 100) + 1);
	var seedValue = Math.floor((Math.random() * 100) + 1);
	var iterationsValue = Math.floor((Math.random() * 100) + 1);
	var qualityValue = Math.floor((Math.random() * 100) + 1);

	return {
		amount: amountValue,
		seed: seedValue,
		iterations: iterationsValue,
		quality: qualityValue };
}


function drawImage(image, canvas) {
	var context = canvas.getContext('2d');
	context.drawImage(image, 0, 0);
}


function doGlitch(canvas, parameters) {
	console.log("do glitch:", parameters)
	var context = canvas.getContext('2d');
	var imageData;
	imageData = context.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);

	function drawGlitchedImageData(image_data) {
  		context.putImageData(image_data, 0, 0);
	}

	glitch(imageData, parameters, drawGlitchedImageData);
}

function doBufferedGlitch(source, width, height, parameters) {
	console.log("do glitch:", parameters)

	var buffer = document.createElement('canvas');
	buffer.width = width;
	buffer.height = height;

	var bufferContext = buffer.getContext('2d');
	var sourceContext = buffer.getContext('2d');

	bufferContext.drawImage(source, 0, 0);
	var imageData = bufferContext.getImageData(0, 0, width, height);

	function drawGlitchedImageData(image_data) {
  		bufferContext.putImageData(image_data, 0, 0);
	}

	glitch(imageData, parameters, drawGlitchedImageData);

	return buffer;
}



function setOriginalImage(canvas) {
	var ctx = canvas.getContext('2d');
	ctx.drawImage(sourceImage, 0, 0);
}


function copyCanvas(originalCanvas, targetCanvas){
	var context = targetCanvas.getContext('2d');
	context.drawImage(originalCanvas, 0, 0);
}


// main init function for Image glitching
function initImageGlitching() {
	// Get elements
	var glitchButton = document.getElementById('glitch-button');
	var parameters1 = getRandomParameters();
	setOriginalImage(originalCanvas);
	setOriginalImage(canvas2);
	setOriginalImage(canvas3);
	//doGlitch(originalCanvas);
	doGlitch(canvas2, parameters1);
	glitchButton.addEventListener('click', glitchClicked);
};


////////////////////////////
//
// MAIN
//
window.addEventListener("load", initImageGlitching, false);
