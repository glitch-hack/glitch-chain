var tolerance = { // between 0 and 255
		red: 16,
		green: 16,
		blue: 16,
		alpha: 16,
		minBrightness: 16,
		maxBrightness: 240
	};
	function isColorSimilar(a, b, color){

		var absDiff = Math.abs(a - b);

		if(typeof a === 'undefined'){
			return false;
		}
		if(typeof b === 'undefined'){
			return false;
		}

		if(a === b){
			return true;
		} else if ( absDiff < tolerance[color] ) {
			return true;
		} else {
			return false;
		}
	}
	function abs(d1, d2){
		return Math.abs(d1-d2)
	}
	function square(d1, d2){
		return Math.square(d1-d2)
	}

	function loop(x, y, callback){
		var i,j;

		for (i=0;i<x;i++){
			for (j=0;j<y;j++){
				callback(i, j);
			}
		}
	}

	function getPixelInfo(data, offset, cacheSet){
		var r;
		var g;
		var b;
		var d;
		var a;

		r = data[offset];

		if(typeof r !== 'undefined'){
			g = data[offset+1];
			b = data[offset+2];
			a = data[offset+3];
			d = {
				r: r,
				g: g,
				b: b,
				a: a
			};

			return d;
		} else {
			return null;
		}
	}
	function analyseImages(img1, img2){

		var data1 = img1.data;
		var data2 = img2.data;
		var mismatchCount = 0;
		var red = 0;
		var green = 0;
		var blue = 0;
		loop(img1.height, img1.width, function(verticalPos, horizontalPos){


			var offset = (verticalPos*img1.width + horizontalPos) * 4;
			var pixel1 = getPixelInfo(data1, offset, 1);
			var pixel2 = getPixelInfo(data2, offset, 2);

			if(pixel1 === null || pixel2 === null){
				return;
			}

			red +=  abs(pixel1.r, pixel2.r)
			green +=  abs(pixel1.g, pixel2.g)
			blue +=  abs(pixel1.b, pixel2.b)
		});

		return red+green+blue
	}

	function compare(cv1, cv2){
		var ctx1 = cv1.getContext('2d')
		var img1 = ctx1.getImageData(0, 0, cv1.width, cv1.height)
		var img2 = cv2.getContext('2d').getImageData(0, 0, cv2.width, cv2.height)
		return analyseImages(img1,img2);
	}
