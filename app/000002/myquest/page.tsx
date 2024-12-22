"use client";

import CustomCursor from "../../000000/0-0-cursor/page";
import QuestNavigation from "../../000000/0-1-QuestHome/navigation";
import Footer from "../../000000/0-0-footer/footer";
import UnderConstruction from "../../000000/0-0-UnderConstruction/UnderConstruction";
import ProtectedRoute from "../../000000/1-0-ProtectedRoute/ProtectedRoute";
import React, { useEffect, useState } from 'react';
import { getStickyNotes, addStickyNoteToFirebase } from '../../../firebase/firebaseService'; // Import the functions
import './myquest.css';

export default function MyQuestPage() {
  const [stickyNotes, setStickyNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState<string>(''); // State to handle new sticky note input

  const toggleDropdown = () => {
    document.body.classList.toggle("openDropdown");
  };

  useEffect(() => {
    const fetchStickyNotes = async () => {
      const notes = await getStickyNotes(); // Fetch sticky notes for the current user
      setStickyNotes(notes);
    };

    fetchStickyNotes();
  }, []);

  const handleAddStickyNote = async () => {
    if (newNote.trim()) {
      // Add sticky note to Firebase
      await addStickyNoteToFirebase(newNote);

      // Refresh the sticky notes after adding a new one
      const notes = await getStickyNotes();
      setStickyNotes(notes);

      // Clear the input field
      setNewNote('');
    }
  };

  return (
    <div>
      <ProtectedRoute>
        <CustomCursor />
        <QuestNavigation toggleDropdown={toggleDropdown} />

        {/* Sticky Notes Container */}
        <div className="sticky-notes-container">
          <h2>Your Sticky Notes</h2>
          
          {/* Add Sticky Note Section inside Sticky Notes Container */}
          <div className="add-sticky-note-container">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write your sticky note here..."
              className="sticky-note-input"
            />
            <button onClick={handleAddStickyNote} className="add-sticky-note-btn">Add Sticky Note</button>
          </div>

          {/* Render Sticky Notes */}
          {stickyNotes.length > 0 ? (
            stickyNotes.map((note, index) => (
              <div key={note.id} className="sticky-note">
                <p>{note.text}</p>
                <small>{note.createdAt?.toDate().toString()}</small>
              </div>
            ))
          ) : (
            <p>No sticky notes available</p>
          )}
        </div>

        <UnderConstruction />
        <Footer />
      </ProtectedRoute>
    </div>
  );
}
