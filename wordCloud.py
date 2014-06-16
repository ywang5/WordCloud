import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def default():
	return render_template('page.html')

if __name__ == '__name__':
	app.run(debug=True)
