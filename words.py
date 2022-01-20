import os
import json
#import http
#import http.client
# import urllib.parse

modules = {
  "1": {},
  "2": {}  
}

def DoModule(filePath,book):
    mod = open(os.path.dirname(os.path.realpath(__file__)) + filePath, "r", encoding="utf-8")
   
    newSection = False
    latest=""
    module = ""
    for line in mod:
        line = line.replace("\u2019", "'")
        line = line.replace("\n", "")
        #if line includes Module
        if line.find("Module") != -1:
            newSection = True
            
            module = line.split("– ")[1]
            
            modules[book][module] = {}
        line = line.split("	")
        #if line is not 2 words long, skip
        if len(line) != 2:
            continue
        if(line[0] == ""):
            newSection = True
            continue
        if newSection:
            modules[book][module][line[1]] = {}
            newSection = False
            latest = line[1]
        else:
            modules[book][module][latest][line[0]] = line[1]
            #http get https://api.dictionaryapi.dev/api/v2/entries/fr/<word>
            #url encode word
            
            #http.client.HTTPConnection("api.dictionaryapi.dev").request("GET", "/api/v2/entries/fr/" + urllib.parse.quote_plus(line[0]))
            # response = http.client.HTTPConnection("api.dictionaryapi.dev").getresponse()
            # data = response.read()
            # data = data.decode("utf-8")
            # data = json.loads(data)
            # data.meaning = line[1]
            # modules[book][module][latest][line[0]] = data
    mod.close()

def DoBook(book):
    #for each file in ./words/book1 do
    files=os.listdir(os.path.dirname(os.path.realpath(__file__)) + "/words/book"+book)
    for file in files:
        #read file
        DoModule("/words/book" + book + "/" + file, book)

def WriteJson():
    with open(os.path.dirname(os.path.realpath(__file__)) + "/words.json", "w") as outfile:
        json.dump(modules, outfile, indent=4, sort_keys=False, ensure_ascii=True)
    outfile.close()

