"use client";

import CustomCursor from "../../000000/0-0-cursor/page";
import QuestNavigation from "../../000000/0-1-QuestHome/navigation";
import Footer from "../../000000/0-0-footer/footer";
import ProtectedRoute from "../../000000/1-0-ProtectedRoute/ProtectedRoute";
import React, { useEffect, useState } from 'react';
import { getStickyNotes, addStickyNoteToFirebase } from '../../../firebase/firebaseService'; // Import the functions
import './myquest.css';
import { Timestamp } from "firebase/firestore"; // Import Timestamp from Firestore

// Define the StickyNote interface
interface StickyNote {
  id: string;
  text: string;
  createdAt: Timestamp;
}

export default function MyQuestPage() {
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]); // Use StickyNote type
  const [newNote, setNewNote] = useState<string>(''); // State to handle new sticky note input
  const [loading, setLoading] = useState<boolean>(false); // Loading state for async actions

  const toggleDropdown = () => {
    document.body.classList.toggle("openDropdown");
  };

  useEffect(() => {
    const fetchStickyNotes = async () => {
      setLoading(true);
      try {
        const notes = await getStickyNotes(); // Fetch sticky notes for the current user

        // Map the fetched notes to match the StickyNote type
        const formattedNotes = notes.map((note: any) => ({
          id: note.id,
          text: note.text, // Ensure `text` exists in the note
          createdAt: note.createdAt || Timestamp.now(), // Handle createdAt field
        }));

        setStickyNotes(formattedNotes); // Set the formatted notes to state
      } catch (error) {
        console.error("Error fetching sticky notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStickyNotes();
  }, []);

  const handleAddStickyNote = async () => {
    if (newNote.trim()) {
      setLoading(true);
      try {
        // Add sticky note to Firebase
        await addStickyNoteToFirebase(newNote);

        // Refresh the sticky notes after adding a new one
        const notes = await getStickyNotes();

        // Map the fetched notes to match the StickyNote type
        const formattedNotes = notes.map((note: any) => ({
          id: note.id,
          text: note.text,
          createdAt: note.createdAt || Timestamp.now(),
        }));

        setStickyNotes(formattedNotes);

        // Clear the input field
        setNewNote('');
      } catch (error) {
        console.error("Error adding sticky note:", error);
      } finally {
        setLoading(false);
      }
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
            <button 
              onClick={handleAddStickyNote} 
              className="add-sticky-note-btn" 
              disabled={loading || !newNote.trim()}
            >
              {loading ? "Adding..." : "Add Sticky Note"}
            </button>
          </div>

          {/* Render Sticky Notes */}
          {loading ? (
            <p>Loading sticky notes...</p>
          ) : stickyNotes.length > 0 ? (
            stickyNotes.map((note) => (
              <div key={note.id} className="sticky-note">
                <p>{note.text}</p>
                <small>{note.createdAt?.toDate().toString()}</small>
              </div>
            ))
          ) : (
            <p>No sticky notes available</p>
          )}
        </div>
        <Footer />
      </ProtectedRoute>
    </div>
  );
}
