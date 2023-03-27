import "./userlist.scss"
import Navbar from "../Components/Navbar/Navbar"
import Datatable from "../Components/Datatable/Datatable"
import { useEffect, useState } from "react";


const UserList = () => {
    const [user, setUser] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        async function getUser() {
            const adminId = localStorage.getItem("adminId");
            const res = await fetch(`http://localhost:4000/admin/users/${adminId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            setUser(data.user);
            const pres = await fetch("http://localhost:4000/admin/users", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });
            const pdata = await pres.json();
            setUsers(pdata.users);
        }
        getUser();
    }, [user, users]);

  return (
    <div className="list">
      {/* <Sidebar/> */}
      <div className="listContainer">
        {user && <Navbar activeLink={"/admin-portal/users"} user={user} />}
        {users && <Datatable alldata={users} type="users" />}
      </div>
    </div>
  )
}

export default UserList