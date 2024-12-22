import { db, auth } from './firebaseConfig';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';

// Define the StickyNote interface
interface StickyNote {
  id: string;
  text: string;
  createdAt: Timestamp;
}

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
export const getStickyNotes = async (): Promise<StickyNote[]> => {
  const userId = auth.currentUser?.uid;

  if (userId) {
    // Reference to the stickyNotes subcollection for the current user
    const stickyNotesRef = collection(db, 'users', userId, 'stickyNotes');
    
    // Get sticky notes from Firestore
    const querySnapshot = await getDocs(stickyNotesRef);
    
    // Process and return the sticky notes
    const notes: StickyNote[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        text: data.text,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt : Timestamp.now(),
      };
    });
    
    return notes;
  } else {
    console.error('No user is logged in');
    return [];
  }
};
