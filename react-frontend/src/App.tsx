import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import Selector from "./Selector";
import ErrorBoundary from "./ErrorBoundary";
import SetTasks from "./SetTasks";
import Task from "./Task";
import { FrenchWords, Task as TaskHandler } from "./Handler";
let url = "http://localhost:3001"
function App() {
  
  const [doing, setDoing] = useState<TaskHandler>()
  const [frenchHandler, setFrenchHandler]: [FrenchWords, any] = useState<FrenchWords>({})
  useEffect(() => {
    setFrenchHandler(new FrenchWords(url))
  }, []);
  if (frenchHandler?.data == null) {
    return <div>Loading...</div>;
  } else if (frenchHandler.user?.perms === "teacher") {
    return <Login frenchHandler={frenchHandler} />;
  } else if (!doing)
    return (
      <div className="bg-bg-primary dark:bg-dark-bg-primary text-text-primary dark:text-dark-text-primary text-center">
        <ErrorBoundary>
          <Login frenchHandler={frenchHandler} />
          <Selector frenchHandler={frenchHandler} />
          <SetTasks frenchHandler={frenchHandler} setDoing={setDoing} />
        </ErrorBoundary>
      </div>
    );
  else {
    return (
      <>
        <Login frenchHandler={frenchHandler} />
        <Task
          frenchHandler={frenchHandler}
          task={doing}
        />
      </>
    );
  }
}

export default App;