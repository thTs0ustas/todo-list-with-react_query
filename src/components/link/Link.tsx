import React from "react";

type Props = {
  setType: React.Dispatch<React.SetStateAction<string>>;
  item: string;
  type: string;
};

function Link({ setType, item, type }: Props) {
  return (
    <button
      type="button"
      className={`link-buttons ${type === item.toLowerCase() ? "active" : ""}`}
      onClick={() => setType(item)}
    >
      {item}
    </button>
  );
}

export default Link;
