"use client"; // Ensures this is a client-side component

import { useEffect } from 'react';
import './cursor.css'; // Import CSS for the custom cursor

const CustomCursorPage = () => {
  useEffect(() => {
    // Prevent right-click menu from appearing
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    // Prevent common keyboard shortcuts for viewing source and inspecting
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'i' || e.key === 'I' || e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
      }
    });

    // Custom cursor logic
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
  
    const smiley = document.createElement('span');
    smiley.classList.add('smiley');
    smiley.textContent = '😊';
    cursor.appendChild(smiley);
  
    document.body.appendChild(cursor);
  
    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    };
  
    const handleMouseEnter = () => {
      cursor.classList.add('hover');
    };
  
    const handleMouseLeave = () => {
      cursor.classList.remove('hover');
    };
  
    const handleDragStart = () => {
      // Hide the default drag cursor
      document.body.style.cursor = 'none';
      cursor.classList.add('dragging');
    };
  
    const handleDragEnd = () => {
      // Restore the default cursor
      document.body.style.cursor = '';
      cursor.classList.remove('dragging');
    };
  
    // Add event listeners for links and draggable items
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });
  
    // Attach the drag events to all draggable elements
    const draggableElements = document.querySelectorAll('[draggable="true"]');
    draggableElements.forEach(el => {
      el.addEventListener('dragstart', handleDragStart);
      el.addEventListener('dragend', handleDragEnd);
    });
  
    document.addEventListener('mousemove', handleMouseMove);
  
    // Cleanup function to remove event listeners and the cursor
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });
      draggableElements.forEach(el => {
        el.removeEventListener('dragstart', handleDragStart);
        el.removeEventListener('dragend', handleDragEnd);
      });
      document.body.removeChild(cursor);
    };
  }, []);
  

  return null; // This component does not need to render anything visible.
};

export default CustomCursorPage;
