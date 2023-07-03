import React from "react";

function IfListEmpty({ list, msgEnd }) {
  return (
    <>
      {list.length === 0 && (
        <h2 className="text-center">
          Još uvijek nemate {msgEnd && ` ${msgEnd}`}!
        </h2>
      )}
    </>
  );
}

export default IfListEmpty;
