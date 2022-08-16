import React from "react";
import { reduce } from "lodash/fp";
import { take } from "lodash";
import { ToDo } from "../components/app/App";

const fetchTodo = (setTodo: React.Dispatch<React.SetStateAction<ToDo[]>>) =>
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
    });

export default fetchTodo;
