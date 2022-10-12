import ProjectInfo from "./ProjectInfo";
import FilterFunc from "./FilterFunc";
import SectionArena from "./SectionArena";
import { useState } from "react";

const MainView = () => {

    const [isProfileClicked, setIsProfileClicked] = useState(false);

    const handleProfileCLickedOutside = (event) => {
        event.stopPropagation();
        setIsProfileClicked(false);
        
    };

    return ( 
        <div className ="normal-div"  onClick={handleProfileCLickedOutside}>
            <ProjectInfo 
            isProfileClicked={isProfileClicked} 
            setIsProfileClicked={setIsProfileClicked} 
            ></ProjectInfo>
            <FilterFunc></FilterFunc>
            <SectionArena></SectionArena>
        </div>
     );
}
 
export default MainView;