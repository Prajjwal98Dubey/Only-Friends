/* eslint-disable react/prop-types */
import { useState } from "react";
import { FilterContext } from "./FilterContext";

function FilterContextProvider({ children }) {
  const [isFilter, setIsFilter] = useState(false);
  const [inGender, setInGender] = useState("");
  const [inAge, setInAge] = useState("");
  return (
    <FilterContext.Provider
      value={{ isFilter, setIsFilter, inGender, setInGender, inAge, setInAge }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export default FilterContextProvider;
