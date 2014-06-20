function FirstFunction(s) {
    var x;
    var txt = "";
    for (x in s) {
    	txt += x + ": " + s[x] + "<br>";
    }
    document.getElementById("words").innerHTML = txt;
}
