import os
from flask import Flask, render_template, request
from heapq import *

app = Flask(__name__)

@app.route('/', methods=['POST','GET'])
def input():
	return render_template('page.html')

@app.route('/output', methods=['POST','GET'])
def output():
	data = request.form['Input']
	data = data.split()
	dictionary = dict()
	for word in data:
		if word in dictionary:
			dictionary[word] = dictionary[word]-1
		else:
			dictionary[word] = -1

	pairs = zip(dictionary.values(),dictionary.keys())
	heap=[]
	info=[]
	for i in pairs:
		heappush(heap,i)

	if len(heap)<30:
		info = heap
	else:
		for i in range(0,30):
			heappush(info,heappop(heap))

	print info

    #if <30, add all into a PQ
    #otherwise, loop over and choose the most frequent 30 and add into PQ
    #feed in the PQ
    #Use PQ and JS to manipulate the font of the words
	return render_template('output.html', dictionary=dictionary)

if __name__ == '__main__':
	app.run(debug=True)
