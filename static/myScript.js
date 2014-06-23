function FirstFunction(s) {
    var max = getMax(s);
    var min = getMin(s);
    var x;
    var font;
    for (x in s) {
    	//Create a seperate element div for each word, and assign it id
    	var newElement = document.createElement('div');
    	newElement.id = x;
    	//Append the word to the element
    	var textnode=document.createTextNode(x);
    	newElement.appendChild(textnode);
    	//Output to HTML
    	document.body.appendChild(newElement);
    	//Set the font size
    	/*
    	NOW NEED TO CHANGE THE FONT DYNAMICALLY
    	*/
    	document.getElementById(x).style.fontSize = "200%";
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