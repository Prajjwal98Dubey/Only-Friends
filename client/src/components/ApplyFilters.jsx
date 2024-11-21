import Backdrop from "./Backdrop";
import FilterComp from "./FilterComp";

/* eslint-disable react/prop-types */
const ApplyFilters = ({ setIsFilterOpen }) => {
  return (
    <>
      <div>
        <div onClick={() => setIsFilterOpen(false)}>
          <Backdrop />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <FilterComp setIsFilterOpen={setIsFilterOpen} />
        </div>
      </div>
    </>
  );
};

export default ApplyFilters;
