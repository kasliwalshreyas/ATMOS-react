import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Projects from "./components/Projects"
import Messages from "./components/Messages"
import Notes from "./components/Notes"
import MainView from "./components/MainView";
import CreateProject from "./components/CreateProject"

const App = () => {
  return (
    <div>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/task" element={<MainView />} />
            <Route path="/createproject" element={<CreateProject />} />
          </Routes>
        </div>
        {/* <MainView className = "main-view"></MainView> */}
      </Router>
    </div>
  );
}

export default App;
