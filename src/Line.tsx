import React from "react";
import { ToDo } from "./App";

interface Props {
  item: ToDo;
  // eslint-disable-next-line no-unused-vars
  onClick: (id: number) => void;
}

function Line({ item, onClick }: Props) {
  const [checked, setChecked] = React.useState(false);
  return (
    <div className="line">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => {
          setChecked(!checked);
          onClick(item.id);
        }}
      />
      <div key={item.id}>
        <span>{item.title}</span>
        <span>{item.completed}</span>
      </div>
    </div>
  );
}

export default Line;
