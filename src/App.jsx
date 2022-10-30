import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./UI/Navbar";
import { ChatEngine } from 'react-chat-engine';
import Home from "./pages/Home/Home";
import HomePage from "./pages/HomePage/Home";
import Projects from "./pages/Projects/Projects";
import Messages from "./pages/Messages/Messages";
import Notes from "./pages/Notes/Notes";
import MainView from "./pages/Projects/Task/MainView";
import CreateProject from "./pages/Projects/CreateProject";
import SignUp from "./pages/Sign-Up/Sign-Up";
import Login from "./pages/Login/Login";
import UserProfile from "./pages/UserProfile/UserProfile";
import Logout from "./pages/Logout/Logout";
import AdminHome from "./pages/Admin/Home/Home";
import AdminNew from "./pages/Admin/New/New";
import AdminSingle from "./pages/Admin/Single/Single";
import AdminLogin from "./pages/Admin/Login/Login";
import AdminList from "./pages/Admin/List/List";
import SectionArena from "./pages/Projects/Task/SectionArena";
import AboutUS from "./pages/AboutUs/AboutUs";
import Contact from './pages/ContactUs/Contact';

const App = () => {
  // const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("userID")));

  // useEffect(() => {

  //   fetch('http://localhost:8000/userList/' + userId)
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       // console.log(data);
  //       localStorage.setItem('user', JSON.stringify(data));

  //     });
  // }, []);
  // console.log(localStorage.getItem('user'));



  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            {/* <Route path="/messages" element={<Messages />} /> */}
            <Route path="/messages" element={<ChatEngine height = "100vh"  projectID="5451affd-20e6-4d49-a60b-c93bb9fcba13" userName="dersabce" userSecret="D@123456"  />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/createproject" element={<CreateProject />} />
            {/* <Route path="/task" element={<MainView />} /> */}
            <Route exact path="/task" element={<MainView board />} />
            <Route path="/createproject" element={<CreateProject />} />
            <Route
              exact
              path="/task/overview"
              element={<MainView overview />}
            />
            <Route exact path="/task/charts" element={<MainView charts />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profile" element={<UserProfile />} />

            <Route exact path='/aboutUs' element={<AboutUS />} />
            <Route exact path='/contactUs' element={<Contact />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/admin/home" element={<AdminHome />} />
            <Route exact path="/admin/login" element={<AdminLogin />} />
            <Route exact path="/admin/user/list" element={<AdminList />} />
            <Route exact path="/admin/user/list/:id" element={<AdminSingle />} />
            <Route exact path="/admin/user/new" element={<AdminNew />} />
            <Route exact path="/admin/project/list" element={<AdminList />} />
            <Route exact path="/admin/project/list/:id" element={<AdminSingle />} />
            <Route exact path="/admin/project/new" element={<AdminNew />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
