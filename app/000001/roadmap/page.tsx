"use client"; // Add this directive to make this a client component

import CustomCursor from '../../000000/0-0-cursor/page';
import Navigation from '../../000000/0-0-navigation/navigation';
import Footer from '../../000000/0-0-footer/footer'
import UnderConstruction from '../../000000/0-0-UnderConstruction/UnderConstruction'; // Import the new component

export default function Home() {

  return (
    <div className="home-container">
      {/* Import Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* UnderConstruction */}
      <UnderConstruction />

      {/* Footer */}
      <Footer />
    </div>
  );
}