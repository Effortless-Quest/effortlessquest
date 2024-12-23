"use client";

import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Core components
import CustomCursor from '../../000000/0-0-cursor/page';
import QuestNavigation from '../../000000/0-1-QuestHome/navigation';
import Footer from '../../000000/0-0-footer/footer';

// MyQuest-specific components
import dynamic from 'next/dynamic';

const StickyNotes = dynamic(() => import('../../000003/StickyNotes/StickyNotes'), { ssr: false });
const AiCompanion = dynamic(() => import('../../000003/aicompanion/companion'), { ssr: false });


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
