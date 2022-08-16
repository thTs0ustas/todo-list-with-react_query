import React from "react";

type Props = {
  setType: (type: string) => void;
  item: string;
};

function Link({ setType, item }: Props) {
  return (
    <button
      type="button"
      className="link-buttons"
      onClick={() => setType(item.toLowerCase())}
    >
      {item}
    </button>
  );
}

export default Link;
