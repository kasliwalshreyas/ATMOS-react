import React from "react";
import { useEffect } from "react";
import styles from "./Search.module.css";
const Search = (user)=>{
    const [userName, setUserName] = React.useState("");
    const [searchUser, setSearchUser] = React.useState(null);
    const [err, setErr] = React.useState("");
    const [cid, setCid] = React.useState(null);
    
    useEffect(() => {
        async function getUser() {
            const res = await fetch("http://localhost:8000/userList/");
            const data = await res.json();
            data.filter((item)=>{
                if(item.userName === userName){
                    console.log(item);
                    setSearchUser(item);
                    setErr("");
                }
            })
        console.log(data);
        console.log(user.user.user.id)
        }
    getUser();
    }, [userName]);
    const handleSearch = (e)=>{
        // e.preventDefault();
        if(userName === ""){
            setErr("Please enter a username");
        }
        else{
            setErr("");
        }
    }
    const handleKey = e=>{
        e.code==="Enter" && handleSearch();
    }

    const handleSelect = async ()=>{
        const currentUser = user.user.user.id.toString();
        const selectedUser = searchUser.id.toString();
        const combinedId = currentUser > selectedUser ? currentUser + selectedUser : selectedUser + currentUser;      
        console.log(combinedId);  
        const res = await fetch("http://localhost:8000/conversationList/" + combinedId);
        const data = await res.json();
        console.log(data);
        const c = {
            id: "",
            userInfo: {
                id : "",
                userName: "",
                date: "",
            }
        }
        if(Object.keys(res).length === 0){
            console.log("conversation already exists");
            const res = await fetch("http://localhost:8000/conversationList",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: combinedId, messages: []})
            })
            const data = await res.json();
            const res1 = await fetch("http://localhost:8000/userChat/" + currentUser,{
                method: "GET",
                headers: {"Content-Type": "application/json"},
                })
            const data1 = await res1.json();
            // console.log("data11",data1);
            setCid(data1)
            c.id = combinedId;
            c.userInfo.id = searchUser.id;
            c.userInfo.userName = searchUser.userName;
            c.userInfo.date = new Date().toTimeString().slice(0,5);
            let u = JSON.parse(JSON.stringify(data1));
            u.cid.push(c);
            // console.log("data12",data1);
            // console.log("u1",u);

            const res2 = await fetch(`http://localhost:8000/userChat/${user.user.user.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({cid: u.cid})
                })
            const data2 = await res2.json();
            const res4 = await fetch("http://localhost:8000/userChat/" + selectedUser,{
                method: "GET",
                headers: {"Content-Type": "application/json"},
                })
            const data4 = await res4.json();
            // console.log("data41",data4);
            setCid(data4)
            c.id = combinedId;
            c.userInfo.id = user.user.user.id;
            c.userInfo.userName = user.user.user.userName;
            c.userInfo.date = new Date().toTimeString().slice(0,5);
            u = JSON.parse(JSON.stringify(data4));
            u.cid.push(c);
            // console.log("data42",data4);
            // console.log("u2",u);

            const res3 = await fetch(`http://localhost:8000/userChat/${searchUser.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({cid: u.cid})
                })
            const data3 = await res3.json();
            // console.log("If",data);
        }
        setSearchUser(null);
        setUserName("");

    }

    return(
        <div className={styles.search}>
            <div className={styles.searchForm}>
                <input type="text" placeholder="Find a Project" onKeyDown={handleKey} onChange={e=>setUserName(e.target.value)} value={userName}/>
            </div>
            {err && <p>{err}</p>}
            {searchUser && <div className={styles.userChat} onClick={handleSelect}>
                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="" />
                <div className={styles.userChatInfo}>
                    <span>{searchUser.userName}</span>
                    <p>Hello</p>
                </div>

            </div>
        }
        </div>
    )
}

export default Search