import { map } from "lodash/fp";
import React from "react";
import useApp from "../../hooks/useApp";
import Input from "../input/input";
import Line from "../line/Line";
import Link from "../link/Link";
import "./App.css";

export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const {
    isSuccess,
    input,
    type,
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
                <Link key={item} item={item} setType={setType} type={type} />
              ),
              ["All", "Pending", "Completed"]
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Input addTodo={addTodo} input={input} setInput={setInput}/>
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
