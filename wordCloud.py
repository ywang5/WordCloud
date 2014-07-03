# coding: utf-8
import sys
reload(sys)
sys.setdefaultencoding("UTF-8")

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
	dictionary = dict() #Uses dictionary to process data
	d=dict() #Return d to html
	words_to_ignore = ["okay", "like", "10", "beneath", "way", "come", "just", "said", "ms", "mr", "did", "yes", #Manually added ignorable words
	 "a", "about", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "both", "bottom", "but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "do", "done", "down", "due", "during", "each", "eg", "either", "else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fill", "find", "first", "for", "former", "formerly", "found", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "no", "nobody", "none", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the", #default English stop words (edited)
	 "ain't", "aren't", "c'mon", "can't", "couldn't", "didn't", "don't", "doesn't", "hadn't", "hasn't", "haven't", "he's", "here's", "i'd", "i'll", "i'm", "i've", "isn't", "it'd", "it'll", "it's", "let's", "shouldn't", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "we've", "weren't", "what's", "where's", "who's", "won't", "wouldn't", "you'd", "you'll", "you're", "you've", "ain’t", "aren’t", "c’mon", "can’t", "couldn’t", "didn’t", "don’t", "doesn’t", "hadn’t", "hasn’t", "haven’t", "he’s", "here’s", "i’d", "i’ll", "i’m", "i’ve", "isn’t", "it’d", "it’ll", "it’s", "let’s", "shouldn’t", "that’s", "there’s", "they’d", "they’ll", "they’re", "they’ve", "wasn’t", "we’d", "we’ll", "we’re", "we’ve", "weren’t", "what’s", "where’s", "who’s", "won’t", "wouldn’t", "you’d", "you’ll", "you’re", "you’ve"] #abbreviations
	#Clean up the words
	for word in rawdata:
		word = word.lower()
		word = word.strip(" .,!?;:'_-\/“”’")
		word = word.strip('"')
		word = word.replace("'s", "")
		word = word.replace("’s", "")
		#The counts are negative because priority queue (heapq) dequeues the lowest numbers first
		if len(word)>1 and word not in words_to_ignore:
			if word in dictionary:
				dictionary[word] = dictionary[word]-1
			else:
				dictionary[word] = -1

	if len(dictionary) <= 50:
		d = dictionary #d is a dictionary with keys being words, and values being negative counts
		for word in d:
			d[word] = 0 - d[word] #Before we pass d into html, change the counts to positive

	else: #If there are more than 50 different words, we get the most frequent 50, using priority queue
		pairs = zip(dictionary.values(),dictionary.keys()) #Switch keys and values
		fullheap=[]
		for i in pairs:
			heappush(fullheap,i) #Push all the data into fullheap
	
		dataheap=[]
		for i in range(0,50):
			heappush(dataheap,heappop(fullheap)) #Push the top 50 words into dataheap

		for i in range(0,50):
			d[dataheap[i][1]] = 0-dataheap[i][0] #Pass the information in the queue into d

	s = json.dumps(d)
	return render_template('output.html', s=s)

if __name__ == '__main__':
	app.run(debug=True)

