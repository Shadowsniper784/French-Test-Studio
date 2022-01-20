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


@app.route("/api/tasks", methods=['GET', 'PUT', 'POST'])
def get_tasks():
    target = request.headers.get("Target")
    user = request.headers.get("Authorization")
    if request.method == 'GET':
        return jsonify(tasks[target])
    elif request.method == 'POST':


        today = date.today()
        d = today.strftime("%B %d, %Y")
        data = request.get_json()
        if target in tasks:
            None
        else:
            tasks[target] = []
        tasks[target].append({
            "SetBy": user,
            "Questions": data["Questions"],
            "SetOn": d,
            "Book": data["Book"],
            "Module": data["Module"],
            "Section": data["Section"],
            "FrenchToEnglish": data["FrenchToEnglish"],
            "DueDate": data["DueDate"],
            "Id": uuid.uuid4().hex,
            "Status": "Not Started",
            "Questions Left": data["Questions"],
            "Username": target
        })
        with open(route, "w") as outfile:
            outfile.write(json.dumps(tasks))
            outfile.close()
        return jsonify({"status": "success"})
    elif request.method == "PUT":
        data = request.get_json()
        for task in tasks[target]:
            if task["Id"] == data["Id"]:
                if data["Option"] == "Change Status":
                    task["Status"] = data["Status"]
                elif data["Option"] == "Change Questions":
                    task["Questions Left"] = data["Questions Left"]
                return jsonify({"status": "success"})
        return jsonify({"status": "failure"})
        

@app.route("/api/login", methods=["POST"])
def login_api():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    if username == "admin" and password == "admin":
        return jsonify({"success": True})
    elif username == "mum" and password == "mum":
        return jsonify({"success": True})
    elif username == "joel" and password == "joely":
        return jsonify({"success": True})
    else:
        return jsonify({"error": "incorrect username and password"}), 401


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


