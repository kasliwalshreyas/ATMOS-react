import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Navbar_v2 from "../../UI/Navbar_v2";
import { useState } from "react";
import { Button } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";

let content = "";

const NoteEditor = () => {
  const params = useParams();
  console.log("checking paramssssssss in NoteEditor", params)
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  const handleSave = async () => {
    console.log(editor.getHTML(), "content from NoteEditor");

    const res = await fetch(`http://localhost:4000/note/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        description: content,
      }),
    });

    const data = await res.json();
    if (data.success) {
      console.log(data.message);
      editor.commands.setContent("");
      navigate("/notes");
    } else {
      console.log(data.message);
    }
  };

  return (
    <>
      <Navbar_v2 activeLink={"/projects"} />
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
      <Button
        onClick={handleSave}
        variant="default"
        gradient={{ from: "indigo", to: "cyan" }}
      >
        Save
      </Button>
    </>
  );
};

export default NoteEditor;
