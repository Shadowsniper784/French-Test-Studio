import React, { useState, useEffect } from "react";
import axios from "axios";
import { SendTask, RecieveTask } from "./TaskTypes";
import Dropdown from "./Dropdown";
import { FrenchWords, Task } from "./Handler";

interface SetTasksProps {
  setDoing: any;
  frenchHandler: FrenchWords
}

export default function SetTasks({ setDoing, frenchHandler }: SetTasksProps) {
  const [tasks, setTasks] = useState<RecieveTask[]>([]);

  useEffect(() => {
    frenchHandler.user.fetchTasks().then(()=>{
      setTasks(frenchHandler.user.tasks);
    })
    .catch(err=>{
      console.log(err);
    })
  }, []);
  console.log(
    `Tasks %o`,
    tasks.filter((t) => t.Status != "Completed")
  );
  return (
    <Dropdown name="Tasks">
      {tasks.filter((task: Task) => task.status !== "Completed") !==
      [] ? (
        tasks
          .filter((task: Task) => task.status != "Completed")
          .map((task: Task) => {
            return (
              <Dropdown key={task.id} name={task.section}>
                Set By: {task.setBy}
                <br />
                Questions: {task.questions}
                <br />
                Book: {task.book}
                <br />
                Module: {task.module}
                <br />
                Section: {task.section}
                <br />
                Due On {task.dueDate.toLocaleDateString()}
                {Date.now() > task.dueDate.getTime() && (
                  <div className="text-red">Overdue</div>
                )}
                <br />
                <button
                  onClick={() => setDoing(task)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Complete
                </button>
              </Dropdown>
            );
          })
      ) : (
        <p>No tasks yay</p>
      )}
    </Dropdown>
  );
}
