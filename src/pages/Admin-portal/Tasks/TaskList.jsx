import Navbar from "../Components/Navbar/Navbar"
import Datatable from "../Components/Datatable/Datatable"
import { useEffect, useState } from "react";


const TaskList = () => {
    const [user, setUser] = useState();
    const [tasks, setTasks] = useState();

    useEffect(() => {
        async function getUser() {
            const adminId = localStorage.getItem("adminId");
            const res = await fetch(`http://localhost:4000/admin/users/${adminId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            setUser(data.user);
            const pres = await fetch("http://localhost:4000/admin/tasks", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });
            const pdata = await pres.json();
            setTasks(pdata.tasks);
        }
        getUser();
    }, [user, tasks]);

  return (
    <div className="list">
      {/* <Sidebar/> */}
      <div className="listContainer">
        {user && <Navbar activeLink={"/admin-portal/tasks"} user={user} />}
        {tasks && <Datatable alldata={tasks} type="tasks" />}
      </div>
    </div>
  )
}

export default TaskList