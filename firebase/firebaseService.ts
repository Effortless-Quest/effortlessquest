import { db, auth } from './firebaseConfig';
import { collection, addDoc, getDocs, doc, Timestamp } from 'firebase/firestore';

// Function to add a new sticky note for the currently logged-in user
export const addStickyNoteToFirebase = async (text: string) => {
  const userId = auth.currentUser?.uid; // Get current user ID

  if (userId) {
    // Reference to the stickyNotes subcollection of the current user
    const stickyNotesRef = collection(db, 'users', userId, 'stickyNotes');
    
    // Add the new sticky note to Firestore
    await addDoc(stickyNotesRef, {
      text: text, // Sticky note text
      createdAt: Timestamp.fromDate(new Date()), // Timestamp for when the note was created
    });

    console.log('Sticky note added successfully!');
  } else {
    console.error('No user is logged in');
  }
};

// Function to get all sticky notes for the currently logged-in user
export const getStickyNotes = async () => {
  const userId = auth.currentUser?.uid;

  if (userId) {
    // Reference to the stickyNotes subcollection for the current user
    const stickyNotesRef = collection(db, 'users', userId, 'stickyNotes');
    
    // Get sticky notes from Firestore
    const querySnapshot = await getDocs(stickyNotesRef);
    
    // Process and return the sticky notes
    const notes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(notes);
    
    return notes;
  } else {
    console.error('No user is logged in');
    return [];
  }
};
