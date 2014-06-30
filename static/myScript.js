function FirstFunction(s) {
    var max = getMax(s);
    var min = getMin(s);
    document.getElementById("words").innerHTML = "max: " + max + "; min: " + min;
    var x;
    var font;
    var multiplier = 550/(max - min)
    for (x in s) {
    	//Create a seperate element div for each word, and assign it id
    	var newElement = document.createElement('div');
    	newElement.id = x;
    	newElement.className = "content";
    	//Append the word to the element
    	var textnode=document.createTextNode(x);
    	newElement.appendChild(textnode);
    	//Output to HTML
    	document.body.appendChild(newElement);
    	//Set the font size
    	var size = s[x];
    	document.getElementById(x).style.fontSize = 100+(size - min)*multiplier+"%";
    }
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

function dd3(s) {
	document.getElementById("words").innerHTML += "1";
	var width = 500;
	var height = 500;
	var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

	var data = [];
	// {"foo": 10, "bar": 30, ...}
	// [{"x_axis": 10, "y_axis": 40, ...}, ]
	//var dataKeys = keys(s);
	//var dataValues = values(s);
	var colorArray = ["red", "orange", "yellow", "green", "blue"];
	for(var k in s) {
		var word = k;
		var count = s[k];
		data.push({
			"zz_axis": "X Position",
			"y_axis": "Y Position",
			"radius": 10*count,
			"color": colorArray[Math.random()*colorArray.length]
		});
	}

	document.getElementById("words").innerHTML += "2";

	var circle = svg.selectAll("circle")
						.data(data)
						.enter()
						.append("circle");

	circle.attr("cx", Math.random()*450)
			.attr("cy", Math.random()*450)
			.attr("r", 50)
			.style("fill", colorArray[Math.random()*colorArray.length]);	

	document.getElementById("words").innerHTML += "3";
}