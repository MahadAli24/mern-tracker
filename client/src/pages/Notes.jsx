import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const { data } = await API.get("/notes");
    setNotes(data);
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (e) => {
    e.preventDefault();
    await API.post("/notes", { title, content });
    setTitle("");
    setContent("");
    fetchNotes();
  };
  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="notes">
      <h2> MY NOTES </h2>
      <form onSubmit={addNote} className="add-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Note"
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="content of note"
        />
        <button type="submit">Add</button>
      </form>
      <ul className="task-list">
        {notes.map((n) => (
          <li key={n._id} className="task-item">
            <div>
              <strong>{n.title}</strong>
              <p>{n.content}</p>
            </div>
            <button onClick={() => deleteNote(n._id)} className="delete-btn">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
