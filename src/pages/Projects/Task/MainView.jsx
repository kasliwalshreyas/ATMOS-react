import ProjectInfo from "./ProjectInfo";
import FilterFunc from "./FilterFunc";
import SectionArena from "./SectionArena";
import { useState } from "react";

const MainView = () => {
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  const handleClickOutside = (event) => {
    event.stopPropagation();
    setIsProfileClicked(false);
  };

  return (
    <div className="normal-div" onClick={handleClickOutside}>
      <ProjectInfo
        isProfileClicked={isProfileClicked}
        setIsProfileClicked={setIsProfileClicked}
      ></ProjectInfo>
      <FilterFunc></FilterFunc>
      <SectionArena></SectionArena>
    </div>
  );
};

export default MainView;
