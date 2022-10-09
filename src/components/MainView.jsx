import ProjectInfo from "./ProjectInfo";
import FilterFunc from "./FilterFunc";
import SectionArena from "./SectionArena";

const MainView = () => {
    return ( 
        <div className ="normal-div">
            <ProjectInfo></ProjectInfo>
            <FilterFunc></FilterFunc>
            <SectionArena></SectionArena>
        </div>
     );
}
 
export default MainView;