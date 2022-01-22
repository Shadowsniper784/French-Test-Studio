import axios from "axios";
import { RecieveTask } from "./TaskTypes";

/*
Urls used by this:
/api/tasks/word/:taskId
{
    PUT /api/tasks/:taskId
    headers: {
        "Authorization": token
    }
    body: {
        status?: "Not Started" | "In Progress" | "Completed"
        questionsLeft?: number
    }
}


{
    GET /api/tasks
    headers: {
        "Authorization": token
    }
}

{
    GET /api/data
}

{
    POST /api/login
    body: {
        username: string
        password: string
    }

}




*/

const clean = (txt) => {
  txt = txt
    .toLowerCase()
    .replace(/i'm/g, "i am")
    .replace(/i'd/g, "i would")
    .replace(/i've/g, "i have")
    .replace(/i'll/g, "i will")
    .replace(/ /g, "")
    .replace(/\./g, "")
    .replace(/onto/g, "on to");

  return txt;
};

export class SimpleTask {
  answer: string;
  finished: boolean = false;
  constructor(
    public book: string,
    public module: string,
    public section: string,
    public data: any
  ) {}
  pickWord() {
    let word = this.getWordOffline();
    this.answer = word[1];
    return word[0];
  }
  getWordOffline() {
    const words = this.data.words;
    const word = words[Math.floor(Math.random() * words.length)];
    return word;
  }
  checkAnswer(answer: string) {
    if (clean(answer) === clean(this.answer)) {
      return true;
    } else {
      return false;
    }
  }
  isCorrect(answer: string) {
    return this.checkAnswer(answer);
  }
}

export class Task extends SimpleTask {
  id: string;
  status: "Not Started" | "In Progress" | "Completed";
  questions: number;
  setBy: string;
  dueDate: Date;
  questionsLeft: number;
  constructor(
    task: RecieveTask,
    public user: User,
    public data: any,
    public url: string
  ) {
    super(task.Book, task.Module, task.Section, data);
    this.id = task.Id;
    this.status = task.Status;
    this.questions = task.Questions;
    this.setBy = task.SetBy;
    this.questionsLeft = task.QuestionsLeft;
    this.book = task.Book;
    this.module = task.Module;
    this.section = task.Section;
    this.dueDate = new Date(task.DueDate);
  }
  public pickWord() {
    let word = navigator.onLine ? this.getWord() : this.getWordOffline();
    this.answer = word[1];
    return word[0];
  }
  private getWord() {
    if (this.status === "Not Started") this.updateStatus("In Progress");
    axios
      .get(`${this.url}/api/tasks/word/${this.id}`)
      .then((response) => {
        return response.data.word;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public updateStatus(status: "Not Started" | "In Progress" | "Completed") {
    this.status = status;
    axios
      .put(
        `${this.url}/api/tasks/${this.id}`,
        {
          status: this.status,
        },
        {
          headers: {
            Authorization: this.user.token,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  isCorrect(answer: string) {
    if (this.checkAnswer(answer)) {
      if (this.questionsLeft !== -1) this.questionsLeft--;
      if (this.questionsLeft === 0) {
        this.finished = true;
        this.updateStatus("Completed");
      }
      return true;
    } else {
      if (this.questionsLeft !== -1) this.questionsLeft++;
      if (navigator.onLine) this.updateWordCount(this.id);
      return false;
    }
  }
  updateWordCount(id: string) {
    axios
      .put(
        `${this.url}/api/tasks/${id}`,
        {
          questionsLeft: this.questionsLeft,
        },
        {
          headers: {
            Authorization: this.user.token,
          },
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }
}

interface ApiUser {
  username: string;
  token: string;
  perms: "teacher" | "student" | "admin";
}

export class User {
  tasks: RecieveTask[];
  perms: "teacher" | "student" | "admin" = "student";
  token: string;
  username: string;
  constructor(user: ApiUser, public data: any, public url: string) {
    this.tasks = [];
    this.perms = user.perms || "student";
    this.token = user.token;
    this.username = user.username;
  }
  fetchTasks() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.url}/api/tasks`, {
          headers: {
            Authorization: this.token,
          },
        })
        .then((response) => {
          this.tasks = response.data.map((task) => {
            new Task(task, this, this.data, this.url);
          });
          resolve({ error: false });
        })
        .catch((err) => {
          reject({
            error: true,
            message: err.message,
          });
        });
    });
  }
  createSimpleTask(book: string, module: string, section: string) {
    return new SimpleTask(book, module, section, this.data);
  }
}

export class FrenchWords {
  data: any;
  user: User;
  constructor(public url: string) {
    this.fetchData();
    let username = localStorage.getItem("username");
    if (username) this.user = new User(JSON.parse(username), this.data, url);
  }
  fetchData() {
    axios
      .get(this.url + "/api/data")
      .then((res) => {
        this.data = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  login(username: string, password: string) {
    return new Promise((res, rej) =>
      axios
        .post(this.url + "/api/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          this.user = new User(response.data.user, this.data, this.url);
          localStorage.setItem("username", JSON.stringify(response.data.user));
          res(response);
        })
        .catch((err) => {
          console.log(err);
          rej(err);
        })
    );
  }
}
