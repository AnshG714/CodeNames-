import React from "react";
import "./App.css";

const ItemCell = ({
  itemName,
  secretColor,
  spyMaster,
  callback,
  clickable,
  clicked,
}) => {
  const divStyle = {
    backgroundColor: clicked || spyMaster ? secretColor : "#d1d1d1",
    color: clicked ? "white" : "black",
  };

  return (
    <div
      className="item"
      style={divStyle}
      onClick={() => {
        if (!clicked && clickable) {
          callback(secretColor, itemName);
        }
      }}
    >
      <p className="cell">{itemName}</p>
    </div>
  );
};

export default ItemCell;
