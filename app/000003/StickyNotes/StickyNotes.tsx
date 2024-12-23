import React, { useState, useEffect } from 'react';
import { getStickyNotes, addStickyNoteToFirebase, updateStickyNoteInFirebase, deleteStickyNoteFromFirebase } from '../../../firebase/firebaseService';
import { format } from 'date-fns';
import './stickynotes.css'; // Optional: Custom styles
import { Timestamp } from 'firebase/firestore';

type StickyNote = {
  id: string;
  title: string;
  text: string;
  createdAt: Timestamp;
};

const StickyNotes = () => {
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);
  const [newNote, setNewNote] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedText, setEditedText] = useState<string>('');

  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null); // Track the expanded note

  useEffect(() => {
    // Fetch sticky notes from Firebase when the component mounts
    const fetchStickyNotes = async () => {
      setLoading(true);
      try {
        const notes = await getStickyNotes(); // Ensure this fetches notes from Firebase
        setStickyNotes(notes);
      } catch (error) {
        console.error("Error fetching sticky notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStickyNotes();
  }, []); // Empty dependency array means this runs only once when the component mounts

  const handleAddStickyNote = async () => {
    if (newNote.trim() && newTitle.trim()) {
      setLoading(true);
      try {
        await addStickyNoteToFirebase(newTitle, newNote);
        const notes = await getStickyNotes();
        setStickyNotes(notes);
        setNewTitle('');
        setNewNote('');
      } catch (error) {
        console.error("Error adding sticky note:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateStickyNote = async () => {
    if (editedTitle.trim() && editedText.trim() && editingNoteId) {
      setLoading(true);
      try {
        await updateStickyNoteInFirebase(editingNoteId, editedTitle, editedText);
        const notes = await getStickyNotes(); // Refresh list
        setStickyNotes(notes);
        setEditingNoteId(null); // Reset editing ID
        setExpandedNoteId(null); // Close editor
      } catch (error) {
        console.error("Error updating sticky note:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  

  const handleDeleteStickyNote = async (id: string) => {
    setLoading(true);
    try {
      await deleteStickyNoteFromFirebase(id);
      const notes = await getStickyNotes();
      setStickyNotes(notes);
      setExpandedNoteId(null); // Close the editor after deleting
    } catch (error) {
      console.error("Error deleting sticky note:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle opening the sticky note in a full-page editor
  const openStickyNoteEditor = (id: string) => {
    const note = stickyNotes.find((note) => note.id === id);
    if (note) {
      if (expandedNoteId !== id) { // Avoid resetting when switching between fields
        setEditedTitle(note.title);
        setEditedText(note.text);
      }
      setEditingNoteId(id); // Set the editing ID
      setExpandedNoteId(id); // Expand this note
    }
  };
  

  // Close the editor by resetting the expanded note
  const closeStickyNoteEditor = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent closing when clicking inside the editor
    setExpandedNoteId(null); // Close the editor view
    setEditingNoteId(null); // Stop editing
    // Preserve current states (`editedTitle` and `editedText`) until explicitly saved or discarded
  };

  return (
    <div className="sticky-notes-container">
      {/* Sticky Note Writing Section */}
      <div className="write-sticky-note-container">
        <h2>Create a Sticky Note</h2>
        <div className="add-sticky-note-container">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)} // Updating the state as the user types
            placeholder="Note Title"
            className="sticky-note-title-input"
          />
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)} // Updating the state as the user types
            placeholder="Write your sticky note here..."
            className="sticky-note-input"
          />
          <button
            onClick={handleAddStickyNote}
            className="add-sticky-note-btn"
            disabled={loading || !newNote.trim() || !newTitle.trim()}
          >
            {loading ? "Adding..." : "Add Sticky Note"}
          </button>
        </div>
      </div>

      {/* Sticky Notes List Section */}
      <div className="view-sticky-notes-container">
        <h2>Your Sticky Notes</h2>
        {loading ? (
          <p>Loading sticky notes...</p>
        ) : stickyNotes.length > 0 ? (
          stickyNotes.map((note) => (
            <div
              key={note.id}
              className="sticky-note"
              onClick={() => openStickyNoteEditor(note.id)} // Make the whole card clickable
            >
              {expandedNoteId === note.id ? (
                // Full-page editor for the expanded note
                <div className="sticky-note-expanded">
                  <div className="editor-container">
                    {/* Title input always at the top */}
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)} // Update the state as the user types
                      className="sticky-note-title-input"
                      placeholder="Edit title"
                    />
                    {/* Note content input below the title */}
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)} // Update note text as user types
                      className="sticky-note-input"
                      placeholder="Edit your sticky note..."
                    />
                    <div>
                      <button
                        onClick={handleUpdateStickyNote}
                        className="add-sticky-note-btn"
                        disabled={loading || !editedText.trim() || !editedTitle.trim()}
                      >
                        {loading ? "Updating..." : "Update Note"}
                      </button>
                      <button
                        onClick={() => handleDeleteStickyNote(note.id)}
                        className="delete-btn"
                        disabled={loading}
                      >
                        {loading ? "Deleting..." : "Delete Note"}
                      </button>
                      <button
                        onClick={closeStickyNoteEditor}
                        className="close-btn"
                      >
                        Close Editor
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3>{note.title}</h3>
                  <small>{format(note.createdAt.toDate(), 'MMMM dd, yyyy HH:mm')}</small>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No sticky notes available</p>
        )}
      </div>
    </div>
  );
};

export default StickyNotes;