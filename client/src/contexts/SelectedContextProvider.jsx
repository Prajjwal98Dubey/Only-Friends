/* eslint-disable react/prop-types */
import { useState } from "react";
import { SelectedContext } from "./SelectedContext";

function SelectedContextProvider({ children }) {
  const [selected, setSelected] = useState("/chat");
  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
}

export default SelectedContextProvider;
