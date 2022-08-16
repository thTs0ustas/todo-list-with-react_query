import React from "react";
import { flow, reduce, take } from "lodash/fp";
import { assign, omit } from "lodash";
import axios from "axios";
import { ToDo } from "../components/app/App";

const fetchTodo = (setTodo: React.Dispatch<React.SetStateAction<ToDo[]>>) =>
  axios
    .get(`https://jsonplaceholder.typicode.com/posts`)
    .then(({ data }) => {
      if (data.isError) {
        throw new Error(data.error);
      }
      return flow(
        reduce(
          (acc: ToDo[], item: ToDo) => ({
            ...acc,
            [item.id]: assign({}, omit(item, "userId"), { completed: false }),
          }),
          {} as ToDo[]
        )
      )(take(20)(data));
    })
    .then((data) => {
      setTodo(data);
    })
    .catch((err) => {
      throw new Error(err);
    });

export default fetchTodo;
