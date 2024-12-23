"use client"; // Ensures this is a client-side component

import { useEffect } from 'react';
import './cursor.css'; // Import CSS for the custom cursor

const CustomCursorPage = () => {
  useEffect(() => {
    // Prevent right-click menu
    const preventContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', preventContextMenu);

    // Prevent common keyboard shortcuts
    const preventShortcuts = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        ['u', 's', 'i', 'c', 'U', 'S', 'I', 'C'].includes(e.key)
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', preventShortcuts);

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
      document.body.style.cursor = 'none';
      cursor.classList.add('dragging');
    };

    const handleDragEnd = () => {
      document.body.style.cursor = '';
      cursor.classList.remove('dragging');
    };

    // Add event listeners for links and draggable items
    const links = Array.from(document.querySelectorAll('a'));
    const draggableElements = Array.from(
      document.querySelectorAll('[draggable="true"]')
    );

    links.forEach((link) => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });

    draggableElements.forEach((el) => {
      el.addEventListener('dragstart', handleDragStart);
      el.addEventListener('dragend', handleDragEnd);
    });

    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup function
    return () => {
      // Remove global listeners
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('keydown', preventShortcuts);
      document.removeEventListener('mousemove', handleMouseMove);

      // Remove element-specific listeners
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });

      draggableElements.forEach((el) => {
        el.removeEventListener('dragstart', handleDragStart);
        el.removeEventListener('dragend', handleDragEnd);
      });

      // Safely remove the cursor element
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, []);

  return null; // No visible render needed for the cursor.
};

export default CustomCursorPage;
