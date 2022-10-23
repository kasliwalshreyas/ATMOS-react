import ProjectInfo from "./ProjectInfo";
import FilterFunc from "./FilterFunc";
import SectionArena from "./SectionArena";
import { useState } from "react";
import OverView from "../Overview/OverView";
import Charts from "../Charts/Charts";
import React from "react";

const MainView = ({ overview, board, charts, from }) => {
  //   console.log(from);
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
      {overview && <OverView></OverView>}
      {board && <SectionArena></SectionArena>}
      {charts && <Charts></Charts>}
    </div>
  );
};

export default MainView;
