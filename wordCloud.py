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
		word = word.lower()
		word = word.strip(" .,!?;:'_-\/")
		word = word.strip('"')
		if word!= "mr" and word!= "ms" and word!= "here" and word!= "one" and word!= "said" and word!= "is" and word!= "was" and word!= "across" and word!= "who" and word!= "those" and word!= "were" and word!= "the" and word!= "are" and word!= "been" and word!= "has" and word != "and" and word!= "that" and word!= "be" and word!= "to" and word!= "of" and word!= "or" and word!= "a" and word!= "in" and word!= "have" and word!= "I" and word!= "it" and word!= "for" and word!=  "not" and word!= "on" and word!= "he" and word!= "with" and word!= "as" and word!= "do" and word!= "you" and word!= "that" and word!= "at" and word!= "this" and word!= "but" and word!= "his" and word!= "by" and word!= "from" and word!= "they" and word!= "we" and word!= "she" and word!= "her" and word!= "or" and word!= "an" and word!= "my" and word!= "would" and word!= "there" and word!= "their" and word!= "what" and word!= "so" and word!= "if" and word!= "about" and word!= "get" and word!= "which" and word!= "go" and word!= "me" and word!= "when" and word!= "make" and word!= "can" and word!= "like" and word!= "no" and word!= "just" and word!= "him" and word!= "take" and word!= "into" and word!= "your" and word!= "some" and word!= "could" and word!= "them" and word!= "other" and word!= "than" and word!= "then" and word!= "only" and word!= "come" and word!= "its" and word!= "also" and word!= "how" and word!= "our" and word!= "well" and word!= "way" and word!= "because" and word!= "any" and word!= "these" and word!= "us" and word!= "and" and word!= "up" and word!= "over" and word!= "after" and word!= "beneath" and word!= "under" and word!= "above" and word!= "will":
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

	s = json.dumps(d)
	return render_template('output.html', s=s)

if __name__ == '__main__':
	app.run(debug=True)

