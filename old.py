# #create a URL route in our application for "/api/words" with query parameters "book", "module", "section"
# @app.route('/api/words', methods=['GET'])
# def get_words():
#     book = request.args.get('book')
#     module = request.args.get('module')
#     section = request.args.get('section')
#     word, meaning = PickWord(book, module, section)
#     return jsonify({
#         'french': word,
#         'english': meaning,
#         'book': book,
#         'module': module,
#         'section': section

#     })

# #create a URL route in our application for "/api/check" with query parameters "book", "module", "section", "word", "answer"
# @app.route('/api/check', methods=['POST'])
# def check_word():
#     book = request.form['book']
#     module = request.form['module']
#     section = request.form['section']
#     word = request.form['word']
#     answer = request.form['answer']
#     correct, real = CheckWord(book, module, section, word, answer)
#     return jsonify({
#         'correct': correct,
#         'answer': real,
#         'book': book,
#         'module': module,
#         'section': section,
# })

# #create a URL route in our application for "/api/books"
# @app.route('/api/books', methods=['GET'])
# def get_books():
#     return jsonify({
#         'books': list(modules.keys())
#     })

# #create a URL route in our application for "/api/modules" with query parameters "book"
# @app.route('/api/modules', methods=['GET'])
# def get_modules():
#     book = request.args.get('book')
#     return jsonify({
#         'modules': list(modules[book].keys()),
#         'book': book
#     })

# #create a URL route in our application for "/api/sections" with query parameters "book", "module"
# @app.route('/api/sections', methods=['GET'])
# def get_sections():
#     book = request.args.get('book')
#     module = request.args.get('module')
#     return jsonify({
#         'sections': list(modules[book][module].keys()),
#         'book': book,
#         'module': module
#     })


# @app.route("/login")
# def login():
#     if request.method == "GET":
#         return send_file("login.html")
#     else:
#         username = request.form["username"]
#         password = request.form["password"]
#         if username == "admin" and password == "admin":
#             return "", 200
#         else:
#             #send error message with code 401
#             return jsonify({"error":"incorrect username and password"}), 401









































#New old

# @app.route("/api/tasks", methods=['GET', 'PUT', 'POST'])
# def get_tasks():
#     target = request.headers.get("Target")
#     user = request.headers.get("Authorization")
#     if request.method == 'GET':
#         if target in tasks:
#             return jsonify(tasks[target])
#         return jsonify([])
#     elif request.method == 'POST':


#         today = date.today()
#         d = today.strftime("%B %d, %Y")
#         data = request.get_json()
#         if target in tasks:
#             None
#         else:
#             tasks[target] = []
#         tasks[target].append({
#             "SetBy": user,
#             "Questions": data["Questions"],
#             "SetOn": d,
#             "Book": data["Book"],
#             "Module": data["Module"],
#             "Section": data["Section"],
#             "FrenchToEnglish": data["FrenchToEnglish"],
#             "DueDate": data["DueDate"],
#             "Id": uuid.uuid4().hex,
#             "Status": "Not Started",
#             "Questions Left": data["Questions"],
#             "Username": target
#         })
#         with open(route, "w") as outfile:
#             outfile.write(json.dumps(tasks))
#             outfile.close()
#         return jsonify({"status": "success"})
#     elif request.method == "PUT":
#         data = request.get_json()
#         for task in tasks[target]:
#             if task["Id"] == data["Id"]:
#                 if data["Option"] == "Change Status":
#                     task["Status"] = data["Status"]
#                 elif data["Option"] == "Change Questions":
#                     task["Questions Left"] = data["Questions Left"]
#                 return jsonify({"status": "success"})
#         return jsonify({"status": "failure"})
        

# @app.route("/api/login", methods=["POST"])
# def login_api():
#     data = request.get_json()
#     username = data["username"]
#     password = data["password"]
#     if username == "admin" and password == "admin":
#         return jsonify({"success": True})
#     elif username == "mum" and password == "mum":
#         return jsonify({"success": True})
#     elif username == "joel" and password == "joely":
#         return jsonify({"success": True})
#     else:
#         return jsonify({"error": "Incorrect username and password", "success": False}), 200