import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

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
    <div className="dashboard">
      <div className="toolbar">
        <h2>My Notes</h2>
        <button onClick={() => navigate("/dashboard")} className="logout-btn">
          ← Back to Tasks
        </button>
      </div>
      <form onSubmit={addNote} className="note-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something..."
          rows={3}
        />
        <button type="submit">Add Note</button>
      </form>
      <div className="note-grid">
        {notes.map((n) => (
          <div key={n._id} className="note-card">
            <div className="note-card-header">
              <strong>{n.title}</strong>
              <button
                onClick={() => deleteNote(n._id)}
                className="delete-btn small"
              >
                ✕
              </button>
            </div>
            <p>{n.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
