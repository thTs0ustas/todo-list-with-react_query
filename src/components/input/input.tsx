import React from 'react';

type Props = {
  input: string;
  setInput: (input: string) => void;
  addTodo: () => void;
}

function Input({input, setInput, addTodo}: Props) {
  return <div className="add-todo">
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && addTodo()}
  />
  <button type="button" onClick={addTodo}>
    Add
  </button>
</div>
}

export default Input;