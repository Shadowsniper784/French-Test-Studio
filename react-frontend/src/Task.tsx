import axios from "axios";
import React, { useState, useEffect } from "react";
import { FrenchWords, Task as TaskHandler, SimpleTask } from "./Handler";

interface TaskProps {
  frenchHandler: FrenchWords;
  task: TaskHandler | SimpleTask;
}

export default function Task({ frenchHandler, task }: TaskProps) {
  const getWord = (sect?: string) => {
    return task.pickWord();
  };
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [input, setInput] = useState("");
  const [word, setWord] = useState(getWord());
  const [finished, setFinished] = useState(false);
  const next = () => {
    if (submitted === true) {
      setSubmitted(false);
      setWord(getWord());
      setInput("");
    } else {
      setSubmitted(true);
      if (task.isCorrect(input)) {
        setCorrect(true);
      } else {
        setCorrect(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/*@ts-expect-error*/}
      {task.questionsLeft !== null && task.questionsLeft > 0 ? (
        /*@ts-expect-error*/
        <p>{task.questionsLeft} questions to go</p>
      ) : task.finished ? (
        <p>Finished</p>
      ) : (
        <></>
      )}
      {submitted ? (
        <p>{correct ? "Correct" : 'Incorrect it was "' + word[1] + '"'}</p>
      ) : (
        <div className="flex flex-col items-center">
          <h1>What does {word} mean?</h1>
          <input
            type="text"
            placeholder="Meaning..."
            value={input}
            className="
            w-full
            bg-bg-secondary text-text-secondary dark:text-dark-text-secondary dark:bg-dark-bg-secondary"
            onChange={(evt) => setInput(evt.target.value)}
          />
        </div>
      )}
      <button
        className="text-center 
        bg-bg-secondary
        dark:bg-dark-bg-secondary
        hover:bg-bg-hover 
        w-3/6
        rounded-lg
        dark:hover:bg-dark-bg-hover
        phone:w-full
        "
        onClick={() => next()}
      >
        Next
      </button>
    </div>
  );
}
