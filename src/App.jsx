import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./UI/Navbar";
// import { ChatEngine } from 'react-chat-engine';
import Home from "./pages/Home/Home";
import HomePage from "./pages/HomePage/Home";
import Projects from "./pages/Projects/Projects";
import Chats from "./pages/Messages/Chats";
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
import AboutUS from "./pages/AboutUs/AboutUs";
import Contact from './pages/ContactUs/Contact';

const App = () => {

  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profile" element={<UserProfile />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/messages" element={<Chats />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/createproject" element={<CreateProject />} />
            <Route path="/createproject" element={<CreateProject />} />
            <Route exact path="/task" element={<MainView board />} />
            <Route exact path="/task/overview" element={<MainView overview />} />
            <Route exact path="/task/charts" element={<MainView charts />} />
            <Route exact path="/task/timeline" element={<MainView timeline />} />
            <Route exact path="/admin-portal" element={<AdminHome />} />
            <Route exact path="/admin-portal/login" element={<AdminLogin />} />
            <Route exact path="/admin-portal/user/list" element={<AdminList />} />
            <Route exact path="/admin-portal/user/list/:id" element={<AdminSingle />} />
            <Route exact path="/admin-portal/user/new" element={<AdminNew />} />
            <Route exact path="/admin-portal/project/new" element={<AdminNew />} />
            <Route exact path="/admin-portal/project/list" element={<AdminList />} />
            <Route exact path="/admin-portal/project/list/:id" element={<AdminSingle />} />
            <Route exact path='/aboutUs' element={<AboutUS />} />
            <Route exact path='/contactUs' element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
