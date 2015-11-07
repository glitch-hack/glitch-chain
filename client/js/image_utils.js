		//
		// GLOBALS
		//
		sourceImage = document.getElementById('glitch-image');
		originalCanvas = document.getElementById('glitch-canvas-1');

		canvas2 = document.getElementById('glitch-canvas-2');
		canvas3 = document.getElementById('glitch-canvas-3');
		canvas4 = document.getElementById('glitch-canvas-4');



		function glitchClicked(){
	 			tryGlitch(10);
		}

		function tryGlitch(repetitions)
		{
			var arrayOut = [];
			var diff = null;
			var parameters = null;

			for(x = 0; x < repetitions; x++)
			{
				parameters = getRandomParameters();
				doGlitch(originalCanvas, parameters);
			  diff = compare(originalCanvas, canvas2);
				arrayOut.push(diff);
				alert(diff);
			}
			console.log(arrayOut);
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
			context.drawImage(source, 0, 0);
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

		function setOriginalImage(canvas) {			
			var ctx = canvas.getContext('2d');
			ctx.drawImage(sourceImage, 0, 0);
		}

		function copyCanvas(originalCanvas, targetCanvas){
			var context = targetCanvas.getContext('2d');
			targetCanvas.drawImage(originalCanvas, 0, 0);
		}




		// testing Image glitching
		window.addEventListener("load", function() {

			// Get elements 			
			var glitchButton = document.getElementById('glitch-button');
			var parameters1 = getRandomParameters();

			setOriginalImage(originalCanvas);
			setOriginalImage(canvas2);
			setOriginalImage(canvas3);

			//doGlitch(originalCanvas);

			doGlitch(canvas2, parameters1);

			 glitchButton.addEventListener('click', glitchClicked);
		});

