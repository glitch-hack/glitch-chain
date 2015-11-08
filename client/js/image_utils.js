//
// GLOBALS
//
var sourceImage = document.getElementById('glitch-image');
var canvas1 = document.getElementById('glitch-canvas-1');
var canvas2 = document.getElementById('glitch-canvas-2');
var canvas3 = document.getElementById('glitch-canvas-3');
var canvas4 = document.getElementById('glitch-canvas-4');
var parameters = getRandomParameters();
var parametersList;

function glitchClicked()
{

	setOriginalImage(canvas1);

	// Apply all previous glitches in order
	function nextParameters(index, max){
		if(index <= max)
			setTimeout(function(){
				var parameters = parametersList[index];
				doGlitch(canvas1, parameters);
				nextParameters(index + 1, max);
			},50);
	}
	nextParameters(0, parametersList.length - 1);

	setTimeout(function(){
		var newParams = getRandomParameters();
		doGlitch(canvas1, newParams);
		displayParameters(newParams);
	}, 300);
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
    var amountValue = Math.floor((Math.random() * 10) + 1);
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
		parametersList = getDummyParams(4);

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
	var max = canvasList.length - 1;
	if(glitchParamList.length < canvasList.length)
		max = glitchParamList.length;

		function nextCanvas(canvasIndex){
			if (canvasIndex > 0)	{
				setTimeout(function(){
					var canvas = canvasList[canvasIndex];
					setOriginalImage(canvas);

					// Apply all previous glitches in order
					function nextParameters(index, max){
						if(index <= max)
							setTimeout(function(){
								var parameters = glitchParamList[index];
								console.log("Glitching canvas", canvasIndex);
								console.log("Glitch index: " + index);
								doGlitch(canvas, parameters);
								nextParameters(index + 1, max);
							},50);
					}
					nextParameters(0, canvasIndex-1);
					nextCanvas(canvasIndex-1);
				}, 300);
			}
		}

		nextCanvas(max);

		setOriginalImage(canvasList[0]);
	}

window.addEventListener("load", initImageGlitching, false);
