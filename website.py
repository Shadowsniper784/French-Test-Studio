# create a web server which can be accessed by http://localhost:8000/ and serves ./index.html and ./style.css ./script.js

# import the necessary modules
import atexit
from datetime import date
from urllib import response
import uuid

from flask import Flask, flash, jsonify, redirect, request, send_file, url_for
from flask_cors import CORS

from french import *
from images import *

# create the application object
app = Flask(__name__)

CORS(app)
route = os.path.dirname(os.path.realpath(__file__)) + "/tasks.json"


# define config
config = {
    'DEBUG': True,
    'SECRET_KEY': 'secret_key'
}




# configure the application
app.config.from_object(config)

# import the modules

# set tasks variable to the parsed json from ./tasks.json
with open(os.path.dirname(os.path.realpath(__file__)) + "/tasks.json", "r") as infile:
    tasks = json.load(infile)
    infile.close()




@app.route('/')
def home():
    return send_file('react-frontend/build/index.html')




@app.route('/api/data', methods=['GET'])
def get_data():
    response = jsonify(modules)
    return response


@app.route("/favicon.ico")
def favicon():
    return jsonify({
        "error": "No favicon"
    })


@app.route('/images/<image_name>')
def get_image(image_name):
    return send_file('images/' + image_name + '.webp')


@app.route('/static/js/<path:path>')
def send_file_pathjs(path):
    return send_file("react-frontend/build/static/js/" +path)


@app.route('/static/css/<path:path>')
def send_file_pathcss(path):
    return send_file("react-frontend/build/static/css/" +path)


@app.route("/<path:path>")
def send_file_path_index(path):
    return send_file("react-frontend/build" + path)

# start the server with the 'run()' method
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3001, debug=True)


