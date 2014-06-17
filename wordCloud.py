import os
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['POST','GET'])
def input():
	return render_template('page.html')

@app.route('/output', methods=['POST','GET'])
def output():
	data = request.form['Input']
	data = data.split()
	print data
	return "Second page"

if __name__ == '__main__':
	app.run(debug=True)
