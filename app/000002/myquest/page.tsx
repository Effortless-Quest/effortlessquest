"use client"

import React from 'react';
import CustomCursor from '../../000000/0-0-cursor/page';
import QuestNavigation from '../../000000/0-1-QuestHome/navigation';
import Footer from '../../000000/0-0-footer/footer';
import StickyNotes from '../../000003/StickyNotes/StickyNotes'; // Import StickyNotes component

const MyQuest = () => {
  const toggleDropdown = () => {
    document.body.classList.toggle("openDropdown");
  };

  const router = useRouter();

  useEffect(() => {
    // Router-dependent code here
  }, [router]);

  return (
    <div>
      <CustomCursor />
      <QuestNavigation toggleDropdown={toggleDropdown} />
        <div>
          
        <StickyNotes /> {/* Render the StickyNotes component */}
          
        </div>
      <Footer />
    </div>
  );
};

export default MyQuest;
