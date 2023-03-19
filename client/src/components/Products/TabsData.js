import React, { useState } from "react";

const TabsData = ({filterProductTabs,List}) => {
  return (
    <div>
      <div className="tabsmenu">
      {List.map((cat) => {
          return (
            <button key={cat} className="btn-group__item" onClick={() => filterProductTabs(cat)}>
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabsData;