import React from "react";
import { map } from "lodash/fp";
import "./App.css";
import Line from "../line/Line";
import useApp from "../../hooks/useApp";
import Link from "../link/Link";

export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

function App() {
  const {
    isSuccess,
    input,
    setType,
    setInput,
    addTodo,
    handleClick,
    typeOfList,
  } = useApp();

  return (
    <div className="App">
      <header>
        <nav>
          <ul className="App-header">
            {map(
              (item: string) => (
                <Link item={item} setType={setType} />
              ),
              ["All", "Pending", "Completed"]
            )}
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
