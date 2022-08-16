import React from "react";

type Props = {
  setType: (type: string) => void;
  item: string;
  type: string;
};

function Link({ setType, item, type }: Props) {
  return (
    <button
      type="button"
      className={`link-buttons ${type === item.toLowerCase() ? "active" : ""}`}
      onClick={() => setType(item.toLowerCase())}
    >
      {item}
    </button>
  );
}

export default Link;
