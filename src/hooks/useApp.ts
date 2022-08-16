import React from "react";
import { useQuery } from "react-query";
import { filter } from "lodash/fp";
import { keys } from "lodash";
import { ToDo } from "../components/app/App";
import fetchTodo from "../helpers/fetchTodos";

export default () => {
  const [type, setType] = React.useState("all");
  const [input, setInput] = React.useState("");
  const [todo, setTodo] = React.useState<ToDo[]>([]);

  const { isSuccess } = useQuery("todos", () => fetchTodo(setTodo), {
    refetchOnWindowFocus: false,
  });

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

  const typeOfList = () =>
    ({ all: todo, pending: uncompletedTodo, completed: completedTodo }[type]);

  return {
    todo,
    type,
    input,
    isSuccess,
    completedTodo,
    uncompletedTodo,
    setTodo,
    addTodo,
    setType,
    setInput,
    typeOfList,
    handleClick,
  };
};
