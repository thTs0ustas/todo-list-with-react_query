import { useQuery } from "@tanstack/react-query";
import { cond, constant, keys, matches, size } from "lodash";
import { filter } from "lodash/fp";
import React from "react";
import { ToDo } from "../components/app/App";
import fetchTodo from "../helpers/fetchTodos";

export default () => {
  const [type, setType] = React.useState("all");
  const [input, setInput] = React.useState("");
  const [todos, setTodos] = React.useState<ToDo[]>([]);

  const { data, isSuccess } = useQuery(["todos"], () => fetchTodo(setTodos), {
    refetchOnWindowFocus: false,
  });

  const handleClick = (id: number) => {
    setTodos((prevState: ToDo[]) => ({
      ...data,
      ...prevState,
      [id]: { ...prevState[id], completed: !prevState[id].completed },
    }));
  };

  const addTodo = () => {
    setTodos((prevState: ToDo[]) => ({
      ...prevState,
      [keys(todos).length]: {
        id: keys(todos).length,
        title: input,
        completed: false,
        userId: 1,
      },
    }));
    setInput("");
  };

  const completedTodos = React.useMemo(
    () => filter((item: ToDo) => item.completed)(todos),
    [todos]
  );

  const uncompletedTodos = React.useMemo(
    () => filter((item: ToDo) => !item.completed)(todos),
    [todos]
  );

  const typeOfList = () =>
    ({ all: todos, pending: uncompletedTodos, completed: completedTodos }[
      type
    ]);

  const count = cond<string, number>([
    [matches("all"), constant(size(todos))],
    [matches("pending"), constant(size(uncompletedTodos))],
    [matches("completed"), constant(size(completedTodos))],
  ]);

  return {
    data,
    todo: todos,
    type,
    input,
    isSuccess,
    completedTodo: completedTodos,
    uncompletedTodo: uncompletedTodos,
    setTodo: setTodos,
    addTodo,
    setType,
    setInput,
    typeOfList,
    handleClick,
    count,
  };
};
