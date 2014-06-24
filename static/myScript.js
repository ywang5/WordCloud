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