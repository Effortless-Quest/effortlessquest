"use client"; // Add this directive to make this a client component

import CustomCursor from "../../000000/0-0-cursor/page";
import QuestNavigation from "../../000000/0-1-QuestHome/navigation";
import Footer from "../../000000/0-0-footer/footer";
import ProtectedRoute from "../../000000/1-0-ProtectedRoute/ProtectedRoute"; // Make sure you import your ProtectedRoute component

// MyQuest-specific components
import StickyNotes from '../../000003/StickyNotes/StickyNotes'; // Import StickyNotes component
import AiCompanion from '../../000003/aicompanion/companion';

export default function MyQuestPage() {
  const toggleDropdown = () => {
    document.body.classList.toggle("openDropdown"); // Simply toggle the class without needing the state
  };

  return (
    <div>
      {/* Use ProtectedRoute to protect the page */}
      <ProtectedRoute>
      <CustomCursor />
      <QuestNavigation toggleDropdown={toggleDropdown} />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <StickyNotes />
        </div>
        <div style={{ flex: 1 }}>
          <AiCompanion />
        </div>
      </div>
      <Footer />
      </ProtectedRoute>
    </div>
  );
};
