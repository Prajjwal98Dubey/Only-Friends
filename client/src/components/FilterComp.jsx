import { useContext, useState } from "react";
import { FilterContext } from "../contexts/FilterContext";

/* eslint-disable react/prop-types */
const FilterComp = ({ setIsFilterOpen }) => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const { isFilter, setIsFilter, setInGender, setInAge } =
    useContext(FilterContext);
  const handleApplyFilters = () => {
    setIsFilterOpen(false);
    setIsFilter(!isFilter);
    setInGender(gender);
    setInAge(age);
  };
  return (
    <>
      <div className="w-[550px] h-[210px] bg-[#313131] border border-gray-400 rounded-md shadow-sm shadow-gray-500 ">
        <div className="flex justify-center text-xl font-extrabold text-white font-mono">
          Filters
        </div>
        <div className="flex justify-center font-bold text-white m-2">
          <div className="flex justify-evenly w-[300px]">
            <div>Interested in :</div>
            <div className="flex">
              <span>male</span>
              <input
                type="radio"
                name="gender"
                className="mt-[3px] ml-[2px]"
                value="M"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="flex">
              <span>female</span>
              <input
                type="radio"
                name="gender"
                className="mt-[3px] ml-[2px]"
                value="F"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center p-1 text-white font-extrabold m-1">
          <p>Show people under age of: </p>
        </div>
        <div className="flex justify-center m-1 ">
          <input
            type="text"
            className="w-[40px] h-[30px] bg-[#313131] outline-none border border-red-400 p-1 text-white font-bold"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="flex justify-center m-2">
          <button
            className="bg-blue-600 text-white font-bold hover:bg-blue-500 cursor-pointer p-1 w-[80px] h-[35px] rounded-md"
            onClick={handleApplyFilters}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterComp;
