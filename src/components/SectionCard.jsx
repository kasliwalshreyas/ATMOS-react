import TaskCard from "./TaskCard";

const SectionCard = (props) => {
    
    return ( 
        <div className = "section section-0">           
            <div className="section-head">
                <input className="section-name" placeholder="Section Name"></input>
                <h3 className="add-task">+</h3>
                <sup><h3 className="more-options">...</h3></sup>    
            </div>
            <div className="task-arena">
                {error && <p>{error}</p>}
                {taskList && taskList.map((task) => (
                    <TaskCard task={task} expandModal={expandModal} />                        
                ))}
            </div>
        </div>
     );
}
 
export default SectionCard;