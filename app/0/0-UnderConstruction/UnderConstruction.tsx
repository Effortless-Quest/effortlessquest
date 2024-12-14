import React, { useEffect } from 'react';
import './UnderConstruction.css';
import Image from 'next/image';

const UnderConstruction: React.FC = () => {
  const getRandomDuration = () => `${Math.random() * 2 + 2}s`; // Random duration between 2 and 4 seconds
  const getRandomRotation = () => (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 10 + 5); // Random rotation from -15deg to 15deg

  const foregroundGrassBlades = Array.from({ length: 200 }, (_, index) => (
    <div
      className="grass"
      key={`foreground-${index}`}
      style={{
        animationDuration: getRandomDuration(),
        animationName: 'sway',
        transform: `rotate(${getRandomRotation()}deg)`,
      }}
    ></div>
  ));

  const backgroundGrassBlades = Array.from({ length: 200 }, (_, index) => (
    <div
      className="grass-background"
      key={`background-${index}`}
      style={{
        animationDuration: getRandomDuration(),
        animationName: 'swayBackground',
        transform: `rotate(${getRandomRotation()}deg)`,
      }}
    ></div>
  ));

  useEffect(() => {
    const swords = document.querySelectorAll('.sword');
    const resetAnimations = () => {
      swords.forEach((sword) => {
        // Cast sword as HTMLElement to access offsetWidth
        const swordElement = sword as HTMLElement;
        swordElement.classList.remove('sword'); // Remove class to reset animation
        void swordElement.offsetWidth; // Trigger reflow
        swordElement.classList.add('sword'); // Add the class back to restart the animation
      });
    };

    // Set interval to reset animations after a complete cycle (20s for the 4 swords)
    const intervalId = setInterval(resetAnimations, 20 * 1000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="floating-card">
       <p className="message">This page is being built right now. Check back soon!</p>
      <div className="construction-container">
        <div className="grass-background-container">
          {backgroundGrassBlades}
        </div>
        <div className="grass-container">
          {foregroundGrassBlades}
        </div>
        <div className="swords-container">
          <Image className="sword sword1" src="/swords/sword1.svg" alt="Sword 1" width={100} height={100} />
          <Image className="sword sword2" src="/swords/sword2.svg" alt="Sword 2" width={100} height={100} />
          <Image className="sword sword3" src="/swords/sword3.svg" alt="Sword 3" width={100} height={100} />
          <Image className="sword sword4" src="/swords/sword4.svg" alt="Sword 4" width={100} height={100} />
        </div>
        <div className="grass-base"></div> {/* Dark green base at the bottom */}
      </div>
    </div>
  );
};

export default UnderConstruction;
