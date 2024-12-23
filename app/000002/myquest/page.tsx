"use client";

import React from 'react';

// Core components
import CustomCursor from '../../000000/0-0-cursor/page';
import QuestNavigation from '../../000000/0-1-QuestHome/navigation';
import Footer from '../../000000/0-0-footer/footer';

// MyQuest-specific components
import StickyNotes from '../../000003/StickyNotes/StickyNotes'; // Import StickyNotes component
import AiCompanion from '../../000003/aicompanion/companion';

const MyQuest = () => {
  const toggleDropdown = () => {
    document.body.classList.toggle("openDropdown");
  };

  return (
    <div>
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
    </div>
  );
};

export default MyQuest;