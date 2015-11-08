//
// GLOBALS
//
var sourceImage = document.getElementById('glitch-image');
var canvas1 = document.getElementById('glitch-canvas-1');
var canvas2 = document.getElementById('glitch-canvas-2');
var canvas3 = document.getElementById('glitch-canvas-3');
var canvas4 = document.getElementById('glitch-canvas-4');
var parameters = getRandomParameters();

function glitchClicked() {
        tryGlitch(10);
}


function tryGlitch(repetitions) {
    var arrayOut = [];
    var diff = null;
    parameters = getRandomParameters();
		setOriginalImage(canvas1);
    doGlitch(canvas1, parameters);

    diff = compare(canvas1, canvas2);
		displayParameters(parameters);
    printDifference(diff);
}

function printDifference(value){
	document.getElementById('differenceValue').innerHTML = value;
}


function getRandomParameters(){
    var amountValue = Math.floor((Math.random() * 3) + 1);
    var seedValue = Math.floor((Math.random() * 100) + 1);
    var iterationsValue = Math.floor((Math.random() * 3) + 1);
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
    console.log("do glitch:", parameters);
    
    var context = canvas.getContext('2d');
    var imageData;
    imageData = context.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);

    function drawGlitchedImageData(image_data) {
         context.putImageData(image_data, 0, 0);
    }
    glitch(imageData, parameters, drawGlitchedImageData);
}


function setOriginalImage(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.drawImage(sourceImage, 0, 0);
}


function copyCanvas(canvas1, targetCanvas){
    var context = targetCanvas.getContext('2d');
    targetCanvas.drawImage(canvas1, 0, 0);
}


// main init function for Image glitching
function initImageGlitching() {
    // Get elements
    var glitchButton = document.getElementById('glitch-button');

		/*
    var parameters1 = getRandomParameters();
    setOriginalImage(canvas1);
    setOriginalImage(canvas2);
    setOriginalImage(canvas3);
    //doGlitch(canvas1);
    doGlitch(canvas2, parameters1);
		*/
		
    glitchButton.addEventListener('click', glitchClicked);

		var canvasList = getCanvasList();
		var parametersList = getDummyParams();

		loadGlitches(parametersList, canvasList);
};

function getCanvasList(){
	var canvas1 = document.getElementById('glitch-canvas-1');
	var canvas2 = document.getElementById('glitch-canvas-2');
	var canvas3 = document.getElementById('glitch-canvas-3');
	var canvas4 = document.getElementById('glitch-canvas-4');
	return [canvas4, canvas3, canvas2, canvas1];
}

function getDummyParams(count){
	var dummyParamsList = [];
	for(x = 0; x < count; x++){
		dummyParamsList.push(getRandomParameters());
	}

	return dummyParamsList;
}

function displayParameters(parameters)
{
		document.getElementById('amountValue').innerHTML = parameters['amount'];
		document.getElementById('seedValue').innerHTML = parameters['seed'];
		document.getElementById('iterationsValue').innerHTML = parameters['iterations'];
		document.getElementById('qualityValue').innerHTML = parameters['quality'];
}

function loadGlitches(glitchParamList, canvasList){
	// If there's less glitches in the chain than canveses then don't start at canvas with index 0
	var start = 0;
	if(glitchParamList.length < canvasList.length)
		start = canvasList.length - glitchParamList.length;

	for(x = start; x < canvasList.length; x++){
		var canvas = canvasList[x];
		setOriginalImage(canvas);

		// Apply all previous glitches in order
		for(y = 0; y <= x; y++){
			var parameters = glitchParamList[x];
			doGlitch(canvas, parameters);
		}
	}
}

window.addEventListener("load", initImageGlitching, false);
