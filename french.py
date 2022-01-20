import math
from random import choice
from words import *
debug=True
DoBook("1")
DoBook("2")
WriteJson()
#arrow key selection
# Import the necessary packages
from cursesmenu import SelectionMenu

def PickWord(book, module, section):
    #pick a random word from the module
    #pick a random word from the section
    #return the word
    b = book
    m = module
    sec = section
    if book == "all":
        b = choice(list(modules.keys()))
    if book == "all" or module == "all":
        m = choice(list(modules[b].keys()))
    if book == "all" or module == "all" or section == "all":
        sec = choice(list(modules[b][m].keys()))
    
    meaning, word = choice(list(modules[b][m][sec].items()))
    return meaning, word

def CheckWord(book, module, section, word, answer):
    answer = answer.lower()
    answer=answer.replace("'", "").replace(" ", "")
    meaning = modules[book][module][section][word]
   
    return [meaning.lower().replace("'", "").replace(" ", "") == answer, meaning]

def GetSelection(list, title):
 
    menu = SelectionMenu(list, title=title)
    menu.show()
    menu.join()
    #return menu.selected_option tostring
    return list[menu.selected_option]


def PlayGame():
    book = list(modules.keys())
    book.append("all")
    book = GetSelection(book, "Select a book")
    module = ""
    if book != "all":
        module = list(modules[book].keys())
        module.append("all")
        module = GetSelection(module, "Select a module")
    section = ""
    if book != "all" and module != "all":
        section = list(modules[book][module].keys())
        section.append("all")
        section = GetSelection(section, "Select a section")


    while True:
        meaning, word = PickWord(book, module, section)

        answer = input("What does it mean? ")
        #convert to lowercase
        if CheckWord(book, module, section, word, answer):
            print("Correct!")
            #clear console
            os.system('cls' if os.name == 'nt' else 'clear')
        else:
            print("Incorrect it was: " + meaning)
