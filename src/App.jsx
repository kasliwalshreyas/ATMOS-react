import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./UI/Navbar";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Messages from "./pages/Messages/Messages";
import Notes from "./pages/Notes/Notes";
import MainView from "./pages/Projects/Task/MainView";
import CreateProject from "./pages/Projects/CreateProject";
import SectionArena from "./pages/Projects/Task/SectionArena";

const App = () => {
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
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
