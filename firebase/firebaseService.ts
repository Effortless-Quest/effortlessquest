import { db, auth } from './firebaseConfig';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, Timestamp } from 'firebase/firestore';

// Define the StickyNote interface with a title
interface StickyNote {
  id: string;
  title: string;
  text: string;
  createdAt: Timestamp;
}

// Function to add a new sticky note for the currently logged-in user
export const addStickyNoteToFirebase = async (title: string, text: string) => {
  const userId = auth.currentUser?.uid; // Get current user ID

  if (userId) {
    try {
      // Reference to the stickyNotes subcollection of the current user
      const stickyNotesRef = collection(db, 'users', userId, 'stickyNotes');
      
      // Add the new sticky note to Firestore
      await addDoc(stickyNotesRef, {
        title: title, // Sticky note title
        text: text, // Sticky note text
        createdAt: Timestamp.fromDate(new Date()), // Timestamp for when the note was created
      });

      console.log('Sticky note added successfully!');
    } catch (error) {
      console.error('Error adding sticky note:', error);
    }
  } else {
    console.error('No user is logged in');
  }
};

// Function to get all sticky notes for the currently logged-in user
export const getStickyNotes = async (): Promise<StickyNote[]> => {
  const userId = auth.currentUser?.uid;

  if (userId) {
    try {
      // Reference to the stickyNotes subcollection for the current user
      const stickyNotesRef = collection(db, 'users', userId, 'stickyNotes');
      
      // Get sticky notes from Firestore
      const querySnapshot = await getDocs(stickyNotesRef);
      
      // Process and return the sticky notes
      const notes: StickyNote[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || '', // Ensure that a title is always available
          text: data.text || '',   // Ensure text is always available
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt : Timestamp.now(),
        };
      });
      
      return notes;
    } catch (error) {
      console.error('Error getting sticky notes:', error);
      return [];
    }
  } else {
    console.error('No user is logged in');
    return [];
  }
};

// Function to delete a sticky note from Firestore
export const deleteStickyNoteFromFirebase = async (id: string) => {
  const userId = auth.currentUser?.uid;

  if (userId) {
    try {
      // Reference to the specific sticky note document
      const stickyNoteRef = doc(db, 'users', userId, 'stickyNotes', id);
      
      // Delete the sticky note document
      await deleteDoc(stickyNoteRef);

      console.log('Sticky note deleted successfully!');
    } catch (error) {
      console.error('Error deleting sticky note:', error);
    }
  } else {
    console.error('No user is logged in');
  }
};

// Function to update a sticky note's title and text in Firestore
export const updateStickyNoteInFirebase = async (id: string, newTitle: string, newText: string) => {
  const userId = auth.currentUser?.uid;

  if (userId) {
    try {
      // Reference to the specific sticky note document in Firestore
      const stickyNoteRef = doc(db, 'users', userId, 'stickyNotes', id);
      
      // Update the sticky note document with both title and text
      await updateDoc(stickyNoteRef, {
        title: newTitle,
        text: newText,
        updatedAt: Timestamp.now() // You may want to track when the note was last updated
      });

      console.log('Sticky note updated successfully!');
    } catch (error) {
      console.error('Error updating sticky note:', error);
    }
  } else {
    console.error('No user is logged in');
  }
};

