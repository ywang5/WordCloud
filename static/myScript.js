/* This function gets the maximum of counts of all the words */
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

/* This function gets the minimum of counts of all the words */
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

/* This is the main Javascript function.
   It creates all the div elements and place the words.
   It sets the fonts to be proportional to the square roots of the frequencies
   Calls helper functions
*/
function FirstFunction(s) {
    var max = getMax(s);
    var min = getMin(s);
    var x;
    
    var i = 0;
    for (x in s) {
    	i++;
    	//Create a seperate element div for each word, and assign it id
    	var newElement = document.createElement('div');
    	newElement.id = x; //The id is the word itself

    	//Half of the words float left, and half float right, so the created word cloud will be more balanced
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
    	var fontScale = d3.scale.pow().exponent(.5)
    					.domain([min, max])
    					.range([100,550])
    	document.getElementById(x).style.fontSize = fontScale(size) + "%";
    }
    aesthetics(s); //Call the helper function to visualize data
}

/* Print out a summary for the data in the word cloud created
*/
function summary(s) {
    var max = getMax(s);
    var min = getMin(s);
    document.getElementById("cloud_stat").innerHTML ="Summary: " + "<br><br><br>" + "Maximum number of occurence: " + max + "<br>" + "Minimim number of occurence: " + min;
}

/* Visualization:
   Color the words randomly
   Shrink their margins accordingly so that the words are tighter together
   Set the wrapping div to be proportionally sized to the number of words in the dataset
*/
function aesthetics(s) {
	var colorArray = ["black", "blue", "gold", "green", "red"];
	
	var marginTopScale = d3.scale.pow().exponent(.5)
						.domain([getMin(s), getMax(s)])
						.range([0, -15]);

	for (x in s) {
		var number = Math.floor(colorArray.length*Math.random());
		if (number >= colorArray.length) {number = number-1;}
		document.getElementById(x).style.color = colorArray[number]; //Set the color
		document.getElementById(x).style.marginTop = marginTopScale(s[x]) + "px"; //Set the top margin
		//If a word is an abbreviation of something, usually it needs to be uppercase. eg. U.S., G.D.P., etc.
		if (x.indexOf('.') > -1) {
			document.getElementById(x).style.textTransform = "uppercase";
		}
	}

	//If there are only a few words and the size of the wrapping div is really big,
	//then the words will be really spread out. That's why we decrease the width accordingly.
	//The height adjusts automatically to the content.
	var wrapper = document.getElementById("cloud_words");
	var size = Object.keys(s).length;
	var wrapperScale = d3.scale.pow().exponent(1)
						.domain([0, 50])
						.range([0, 800]);
	wrapper.style.width = wrapperScale(size) + "px";
}

/*
!!!The following function dd3 is not being used!!!
It's an attempt to visualize data using d3 library, but I decided not
to use it later.
It's kept for future reference and nostalgic purposes
*/
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

