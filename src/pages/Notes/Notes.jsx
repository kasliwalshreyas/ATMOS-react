import Navbar_v2 from "../../UI/Navbar_v2";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Button, Link } from "react-floating-action-button";
import { lightColors, darkColors } from "react-floating-action-button";
import { useNavigate } from "react-router-dom";
const Notes = () => {
  const [notes, setNotes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const notes = async () => {
      const res = await fetch("http://localhost:4000/note/getNoteList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        console.log(data.message);
        setNotes(data.notes);
      } else {
        console.log(data.message);
      }
    };
    notes();
  }, []);

  const insidenote = (note) => {
    navigate(`/noteeditor/${note._id}`);
  };

  return (
    <>
      <Navbar_v2 activeLink={"/projects"} />

      <div>
        {notes &&
          notes
            .map((note) => (
              <div className="note-real" key={note._id}>
                <div className="note-container">
                  <a
                    onClick={() => {
                      insidenote(note);
                    }}
                  ></a>
                </div>
              </div>
            ))
            .reverse()}
      </div>

      <Container>
        <Link
          icon="fas fa-plus"
          href="/noteeditor/new"
          tooltip="Create note"
          styles={{
            backgroundColor: darkColors.white,
            color: lightColors.black,
          }}
        />
        <Button
          icon="far fa-sticky-note"
          rotate={true}
          styles={{
            backgroundColor: darkColors.white,
            color: lightColors.black,
          }}
        />
      </Container>
    </>
  );
};

export default Notes;
