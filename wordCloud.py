import os
from flask import Flask, render_template, request
from heapq import *
import json

app = Flask(__name__)

@app.route('/', methods=['POST','GET'])
def input():
	return render_template('page.html')

@app.route('/output', methods=['POST','GET'])
def output():
	rawdata = request.form['Input']
	rawdata = rawdata.split()
	dictionary = dict()
	d=dict()
	for word in rawdata:
		if word in dictionary:
			dictionary[word] = dictionary[word]-1
		else:
			dictionary[word] = -1

	if len(dictionary) <= 30:
		d = dictionary #d is a dictionary with keys being words, and values being negative counts
	
	else:
		pairs = zip(dictionary.values(),dictionary.keys())
		fullheap=[]
		for i in pairs:
			heappush(fullheap,i)
	
		dataheap=[]
		for i in range(0,30):
			heappush(dataheap,heappop(fullheap))

		for i in range(0,30):
			d[dataheap[i][1]] = 0-dataheap[i][0]

	return render_template('output.html', d=d)

if __name__ == '__main__':
	app.run(debug=True)
