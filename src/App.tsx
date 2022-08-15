import React from "react";

import { map, filter, reduce } from "lodash/fp";
import "./App.css";
import { useQuery } from "react-query";
import { keys, take } from "lodash";
import Line from "./Line";

export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export const useApp = () => {
  const [todo, setTodo] = React.useState<ToDo[]>([]);
  const { isSuccess } = useQuery("todos", async () =>
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => res.json())
      .then((data) => {
        if (data.isError) {
          throw new Error(data.error);
        }
        return reduce(
          (acc: ToDo[], item: ToDo) => ({
            ...acc,
            [item.id]: { ...item, completed: false },
          }),
          {} as ToDo[]
        )(take(data, 20));
      })
      .then((data) => {
        setTodo(data);
      })

      .catch((err) => {
        throw new Error(err);
      })
  );

  return { todo, setTodo, isSuccess };
};

function App() {
  const [type, setType] = React.useState("all");
  const [input, setInput] = React.useState("");

  const { todo, setTodo, isSuccess } = useApp();

  const handleClick = (id: number) => {
    setTodo((prevState: ToDo[]) => ({
      ...prevState,
      [id]: { ...prevState[id], completed: !prevState[id].completed },
    }));
  };

  const addTodo = () => {
    setTodo((prevState: ToDo[]) => ({
      ...prevState,
      [keys(todo).length + 1]: {
        id: keys(todo).length + 1,
        title: input,
        completed: false,
        userId: 1,
      },
    }));
    setInput("");
  };

  const completedTodo = React.useMemo(
    () => filter((item: ToDo) => item.completed)(todo as ToDo[]),
    [todo]
  );

  const uncompletedTodo = React.useMemo(
    () => filter((item: ToDo) => !item.completed)(todo as ToDo[]),
    [todo]
  );

  const typeOfList = () => {
    switch (type) {
      case "all":
        return todo;
      case "completed":
        return completedTodo;
      case "pending":
        return uncompletedTodo;
      default:
        return todo;
    }
  };

  return (
    <div className="App">
      <header>
        <nav>
          <ul className="App-header">
            <li>
              <button
                type="button"
                className="link-buttons"
                onClick={() => setType("all")}
              >
                All
              </button>
            </li>
            <li>
              <button
                type="button"
                className="link-buttons"
                onClick={() => setType("completed")}
              >
                Completed
              </button>
            </li>
            <li>
              <button
                type="button"
                className="link-buttons"
                onClick={() => setType("pending")}
              >
                Pending
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="add-todo">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="button" onClick={addTodo}>
            Add
          </button>
        </div>
        <div className="todo-list">
          {isSuccess &&
            map((item: ToDo) => (
              <Line key={item.id} item={item} onClick={handleClick} />
            ))(typeOfList())}
        </div>
      </main>
    </div>
  );
}

export default App;
