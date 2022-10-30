import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./UI/Navbar";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Messages from "./pages/Messages/Messages";
import Notes from "./pages/Notes/Notes";
import MainView from "./pages/Projects/Task/MainView";
import CreateProject from "./pages/Projects/CreateProject";
import SignUp from "./pages/Sign-Up/Sign-Up";
import Login from "./pages/Login/Login";
import UserProfile from "./pages/UserProfile/UserProfile";
import Logout from "./pages/Logout/Logout";
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
            <Route exact path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/messages" element={<Messages />} />
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
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
