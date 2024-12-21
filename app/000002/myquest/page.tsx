"use client"; // Add this directive to make this a client component

import { useState } from "react";
import CustomCursor from "../../000000/0-0-cursor/page";
import QuestNavigation from "../../000000/0-1-QuestHome/navigation";
import Footer from "../../000000/0-0-footer/footer";
import UnderConstruction from "../../000000/0-0-UnderConstruction/UnderConstruction"; // Import the new component
import ProtectedRoute from "../../000000/1-0-ProtectedRoute/ProtectedRoute"; // Make sure you import your ProtectedRoute component

export default function MyQyestPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => {
      const newState = !prevState;
      document.body.classList.toggle("openDropdown", newState); // Toggle class based on the new state
      return newState;
    });
  };

  return (
    <div>
      {/* Use ProtectedRoute to protect the page */}
      <ProtectedRoute>
        {/* Import Cursor */}
        <CustomCursor />

        {/* Navigation */}
        <QuestNavigation toggleDropdown={toggleDropdown} />

        {/* UnderConstruction */}
        <UnderConstruction />

        {/* Footer */}
        <Footer />
      </ProtectedRoute>
    </div>
  );
}
