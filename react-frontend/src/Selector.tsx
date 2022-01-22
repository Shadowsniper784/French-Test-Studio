import React, { useState } from "react";
import Task from "./Task";
import { FrenchWords } from "./Handler";

interface SelectorProps {
  frenchHandler: FrenchWords;
}

export default function Selector({ frenchHandler }: SelectorProps) {
  const [current, setCurrent] = useState("book");
  const [book, setBook] = useState();
  const [module, setModule] = useState();
  const [section, setSection] = useState();
  let data = frenchHandler.data

  const getData = () => {
    switch (current) {
      case "book":
        return Object.keys(data);
      case "module":
        return Object.keys(data[book]);
      case "section":
        return Object.keys(data[book][module]);

      default:
        return data;
    }
  };
  const getNext = () => {
    switch (current) {
      case "book":
        return "module";
      case "module":
        return "section";
      case "section":
        return "word";
      case "word":
        return "word";
      default:
        return "book";
    }
  };
  const setData = (key) => {
    switch (current) {
      case "book":
        setBook(key);
        break;
      case "module":
        setModule(key);
        break;
      case "section":
        setSection(key);

        break;

      default:
        setCurrent(key);
        break;
    }
  };

  // console.log("'"
  //   + (Object.entries(data["1"]).map(e => Object.keys(e[1]).join("' | '")).join("' | '"))
  //   + "'"
  //   + " | '"
  //   + (Object.entries(data["2"]).map(e => Object.keys(e[1]).join("' | '") + "'").join("' | '")));
  if (current !== "word") {
    return (
      <div>
        <h1 className="text-text-secondary dark:text-dark-text-secondary">
          Select a {current}
        </h1>
        <div
          className={`grid grid-rows-6 grid-flow-col justify-center gap-5 align-top flex-row phone:flex-col `}
        >
          {getData().map((key) => {
            return (
              <button
                onClick={() => {
                  setData(key);
                  setCurrent(getNext());
                }}
                key={key}
                className="text-text-primary dark:text-dark-text-primary max-w-sm p-2  bg-bg-primary dark:bg-dark-bg-primary rounded-lg hover:shadow-sm hover:bg-bg-hover dark:hover:bg-dark-bg-hover shadow-lg"
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <Task
        frenchHandler={frenchHandler}
        task={frenchHandler.user.createSimpleTask(book, module, section)}
      />
    );
  }
}
