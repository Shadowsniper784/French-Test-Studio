//fetch /api/books
let lang = "english"
function display() {
    //get /api/data
fetch('/api/data')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        displayBooks(data, true);
    })
    .catch(function (err) {
        console.log(err);
    });

}

// function getBooks() {
//     $.ajax({
//         url: '/api/books',
//         method: 'GET',
//         success: function (data) {
//             console.log(data);
//             displayBooks(data);
//         },
//         error: function (err) {
//             console.log(err);
//         }
//     });
// }
// //fetch /api/modules?book=book

// function getModules(book) {
//     $.ajax({
//         url: '/api/modules?book=' + book,
//         method: 'GET',
//         success: function (data) {
//             console.log(data);
//             displayModules(data);
//         },
//         error: function (err) {
//             console.log(err);
//         }
//     });
// }

// //fetch /api/sections?module=module&book=book
// function getSections(module, book) {
//     $.ajax({
//         url: '/api/sections?module=' + module + '&book=' + book,
//         method: 'GET',
//         success: function (data) {
//             console.log(data);
//             displaySections(data);
//         },
//         error: function (err) {
//             console.log(err);
//         }
//     });
// }
// //fetch /api/words?section=section&module=module&book=book
// function getWord(section, module, book) {
//     $.ajax({
//         url: '/api/words?section=' + section + '&module=' + module + '&book=' + book,
//         method: 'GET',
//         success: function (data) {
//             console.log(data);
//             displayWord(data);
//         },
//         error: function (err) {
//             console.log(err);
//         }
//     });
// }



function getBooks() {
    console.log("getBooks");
}

function getModules() {
    console.log("getModules");
}

function getSections() {
    console.log("getSections");
}

function getWord() {
    console.log("getWord");
}



function displayBooks(books, newMethod = false) {
    // large = width of the screen >= 400px
    var bookDiv = document.querySelector('.options');

    let large = window.matchMedia("(min-width: 400px)");
    if (large.matches) {
        large = "large";
    } else {
        large = "";
    }
    getData(books, newMethod, "book").forEach(function (book, i) {
        //create a div with option and book class
        //add button and img to div
        //create element for img
        //<button class='option book' id='" + (i+1)+ "'>" + "</button>
        let btn = document.createElement("button");
        btn.className = "option book " + large;
        btn.id = i + 1;
        //"<img alt='Studio " + book + " book cover' class='bookimg' id='" + i + "' src='/images/book" + (i + 1) + (large) + ".png'/>"
        let img = document.createElement("img");
        img.alt = "Studio " + book + " book cover";
        img.className = "bookimg " + large;
        img.id = i + 1
        img.src = "/images/book" + (i + 1) + (large) + ".png";

        btn.append(img);
        bookDiv.append(btn);
        btn.onclick = function (e) {
            var book = e.target.id;
            books.book = book;
            newMethod ? displayModules(books, newMethod) : getModules(book);
        }
    });

}

function displayModules(res, newMethod = false) {
    var moduleDiv = document.querySelector('.options');
    //clear the div
    moduleDiv.innerHTML = "";
    document.getElementById("title").innerText = "Select a module";

    getData(res, newMethod, "module").forEach(function (module) {
        let btn = document.createElement("button"); //'<button class="option module">' + module + '</button>'
        btn.className = "option module";
        btn.innerText = module;

        moduleDiv.append(btn);
        btn.onclick = function (e) {
            var module = e.target.innerText;
            res.module = module;
            newMethod ? displaySections(res, newMethod) : getModules(module);
        }
    });

    
}

function displaySections(res, newMethod = false) {
    var sectionDiv = document.querySelector('.options');
    //clear the children of the div
    sectionDiv.innerHTML = "";
    document.getElementById("title").innerText = "Select a section";
    getData(res, newMethod, "sections").forEach(function (section) {
        let btn = document.createElement("button"); //'<button class="option section" id="section">' + section + '</button>'
        btn.className = "option section";
        btn.id = "section";
        btn.innerText = section;

        sectionDiv.append(btn);
        btn.onclick = function (e) {
            var section = e.target.innerText;
            res.section = section
            newMethod ? displayWord(res, newMethod) : getWord(section, res.module, res.book);
        };
    });

}

function displayWord(data, newMethod = false) {
    let word = data
    var wordDiv = document.querySelector('.options');
    //clear the div

   
    if (newMethod) {
        word = getData(word, newMethod, "word");
    }
    document.getElementById("title").innerText = ("What does " + word.french + " mean?");
    let input = document.createElement("input");
    input.type = "text";
    input.id = "answer";
    input.placeholder = "Answer"
    //"<button class='option' id='check'>Check</button>"
    let btn = document.createElement("button");
    btn.className = "option";
    btn.id = "check";
    btn.innerText = "Check";
    wordDiv.innerHTML = "";
    wordDiv.append(input);
    wordDiv.append(btn);
    document.getElementById("check").onclick = (function () {
        checkAnswer(word, data, newMethod);
    });
}

//POST /api/check
function checkAnswer(word, data, newMethod = false) {
    var answer = document.getElementById("answer").value;
    if (newMethod) {
        
        if(answer === word.english){
            displayResult({correct: true, answer: answer[lang], section: word.section, module: word.module, book: word.book}, data, newMethod);
        } else {
            displayResult({correct: false, answer: answer[lang], section: word.section, module: word.module, book: word.book}, data, newMethod);
        }

    }
    else {
        fetch({
            url: '/api/check',
            method: 'POST',
            data: {
                answer: answer,
                word: word.french,
                book: word.book,
                module: word.module,
                section: word.section
            },
            success: function (data) {
                console.log(data);
                displayResult(data);
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
}

function displayResult(result, data={}, newMethod = false) {
    var wordDiv = document.querySelector('.options');
    //clear the div
    
    if (result.correct) {
        document.getElementById("title").innerText = "Correct!"
    } else {

        document.getElementById("title").innerText = ("Incorrect!\r\nThe correct answer is " + result.answer);
    }
    //create a element "<button class='option' id='next'>Next</button>"
    let btn = document.createElement("button");
    btn.className = "option";
    btn.id = "next";
    btn.innerText = "Next";
    wordDiv.innerHTML = "";

    wordDiv.append(btn);
    document.getElementById("next").onclick = (function () {
        newMethod ? displayWord(data, newMethod) : getWord(result.section, result.module, result.book);
    });
}


function getData(res, newMethod, type) {
    if (newMethod) {
        switch (type) {
            case "answer":
                return res
            case "word":
                let words = Object.entries(res[res.book][res.module][res.section])
                let word = words[Math.floor(Math.random() * words.length)]
               
                return {
                    french: word[0],
                    english: word[1],
                    
                }
            case "sections":
                return Object.keys(res[res.book][res.module]);
            case "module":
                return Object.keys(res[res.book])
            case "book":
                return Object.keys(res);
        }
    } else {
        return res[type][0];
    }
}


display()