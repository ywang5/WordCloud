function dd3(s) {
	//Create a svg
	var width = 800;
	var height = 400;
	var svg = d3.select("body")
				.append("svg")
				.attr("width", width)
				.attr("height", height);

	//Put information from the object into an array
	var data = [];
	for(var k in s) {
		data.push({
			"key": k,
			"value": s[k],
		});
	}

	//Create nodes that group circles and texts together
	var nodes = svg.selectAll("g")
					.data(data)
					.enter()
					.append("g")
					.attr("class", "nodes")

	var circles = nodes.append("circle");

	var texts = nodes.append("text")

	//Create a list of random numbers to position the circles and texts
	randomx = [];
	randomy = [];

	for (var i=0; i<data.length; i++) {
		randomx[i] = Math.random()*width;
		randomy[i] = Math.random()*height;
	}


	//Create a scale to scale the font sizes
	var textScale = d3.scale.linear()
						.domain([getMin(s), getMax(s)])
						.range([100, 600]);
	//Scale for radius
	var circleScale = d3.scale.linear()
						.domain([getMin(s), getMax(s)])
						.range([1, 200]);

	//Set attributes to circles
	circles.attr("cx", function(d, i){
				return randomx[i]; //Need to take care of collisions
			})								//The circle may fall off the svg
			.attr("cy", function(d, i){
				return randomy[i]; //Need to take care of collisions
			})
			.attr("r", function(d){
				return circleScale(d.value);
			})
			.style("fill", "transparent")
			.style("stroke", "blue")
	
	//Set attributes to texts
	texts.attr("text-anchor", "middle")
			.text(function(d) {
				return d.key;
			})
			.attr("x", function(d, i) {
				return randomx[i];
			})
			.attr("y", function(d, i) {
				return randomy[i];
			})
			.attr("font-size", function(d) {
				return textScale(d.value)+"%";
			})

	//maybe I should use rectangles instead of circles. Circles have too much empty space for each word
}


function getMax(s) {
	var x;
	var max = 1;
	for (x in s) {
		if (s[x] > max) {
			max = s[x];
		}
	}
	return max;
}

function getMin(s) {
	var x;
	var min = Number.POSITIVE_INFINITY;
	for (x in s) {
		if (s[x] < min) {
			min = s[x];
		}
	}
	return min;
}



function FirstFunction(s) {
    var max = getMax(s);
    var min = getMin(s);
    var x;
    var font;
    var multiplier = 550/(max - min)
    
    var i = 0;
    for (x in s) {
    	i++;
    	//Create a seperate element div for each word, and assign it id
    	var newElement = document.createElement('div');
    	newElement.id = x;

    	if (i%2 == 0) {
    		newElement.className = "content1";
    	} else {
    		newElement.className = "content2";
    	}
    	//Append the word to the element
    	var textnode=document.createTextNode(x);
    	newElement.appendChild(textnode);
    	//Output to HTML
    	var word_div = document.getElementById("cloud_words");
    	word_div.appendChild(newElement);
    	//Set the font size
    	var size = s[x];
    	document.getElementById(x).style.fontSize = 100+(size - min)*multiplier+"%";
    }
    aesthetics(s);
}

function summary(s) {
    var max = getMax(s);
    var min = getMin(s);
    document.getElementById("cloud_stat").innerHTML ="Summary: " + "<br><br>" + "Maximum number of occurence: " + max + "<br>" + "Minimim number of occurence: " + min;
}

function aesthetics(s) {
	var colorArray = ["black", "blue", "gold", "green", "red"];
	for (x in s) {
		var number = Math.floor(colorArray.length*Math.random());
		if (number >= colorArray.length) {number = number-1;}
		document.getElementById(x).style.color = colorArray[number];
	}
}

//When hover or click, something happens
//Algorithm in the python code
