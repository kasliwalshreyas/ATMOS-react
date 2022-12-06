// import styles from "./Notes.module.css";
import "./Notes.css";
import React, { useEffect, useState } from "react";
import NoteContainer from "./NoteContainer/NoteContainer";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./../../UI/Navbar";

const Notes = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes-app")) || []
  );

  const addNote = (color) => {
    const tempNotes = [...notes];

    tempNotes.push({
      id: Date.now() + "" + Math.floor(Math.random() * 78),
      text: "",
      time: Date.now(),
      color,
    });
    setNotes(tempNotes);
  };

  const deleteNote = (id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempNotes.splice(index, 1);
    setNotes(tempNotes);
  };

  const updateText = (text, id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempNotes[index].text = text;
    setNotes(tempNotes);
  };

  useEffect(() => {
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);

  return (
    <>
      <Navbar />
      <div className="notes">
        <Sidebar addNote={addNote} />
        <NoteContainer
          notes={notes}
          deleteNote={deleteNote}
          updateText={updateText}
        />
      </div>
    </>
  );
};

export default Notes;
