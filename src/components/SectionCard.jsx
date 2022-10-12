import { useState } from "react";
import TaskCard from "./TaskCard";

const SectionCard = (props) => {
    // console.log(props)

    const createTask = props.createTask;
    const error = props.error;
    const taskList = props.taskList;
    const expandModal = props.expandModal;
    const sectionInfo = props.section;
    // const rerender = props.rerender;
    // const setRerendr = props.rerender;
    // console.log(taskList)
    // console.log(section.taskList.length)
    
    const filterTaskList = (task)=>{
        // console.log(task,sectionInfo.taskList)
        let flag = false;
        for(let i=0;i<sectionInfo.taskIDList.length;i++){
            if(task.id === sectionInfo.taskIDList[i]){
                flag = true;
            }
        }
        return flag;
    }
    const taskList2 = taskList.filter(filterTaskList);
    // console.log(taskList2);

    const [sectionName, setSectionName] = useState(sectionInfo.sectionName);
    


    
    return ( 
        <div className = "section section-0">           
                <div className="section-head">
                    <input className="section-name" placeholder="Section Name" value={sectionName} onChange={e=>{setSectionName(e.target.value)}}></input>
                    <img className="add-task" onClick={()=>{createTask(sectionInfo)}} src="https://img.icons8.com/sf-regular/48/000000/add.png"/>
                    {/* <sup><h3 className="more-options">...</h3></sup>     */}
                    <img className="more-options" src="https://img.icons8.com/material-outlined/24/000000/more.png"/>
                </div>
                <div className="task-arena">
                    {error && <p>{error}</p>}
                    {taskList2 && taskList2.map((task) => (
                        // <TaskNameContext.Provider value = {{selectedTask,setTaskName}}>
                            <TaskCard task={task} section={sectionInfo} expandModal={expandModal} rerender={props.rerender} setRerender={props.setRerender} key ={task.id} />                        
                        // </TaskNameContext.Provider>
                    ))}
                    <div className='add-task-div' onClick={()=>{createTask(sectionInfo)}} ><img className="add-task-img-2"src="https://img.icons8.com/sf-regular/48/000000/add.png"/><p>Add Task</p></div>
                </div>
            </div>
     );
}
 
export default SectionCard;