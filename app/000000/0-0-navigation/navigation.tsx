"use client"; // Mark this file as a client component

import React from 'react';  // Add this import for React
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './navigation.css';

const Navigation = () => {
  const pathname = usePathname(); 

  return (
    <header className="header">
      <Link href="/" className="logo-link2">
        <Image src="/nav-titles/quest-nav.svg" alt="Elif Çakmak Logo" width={200} height={200} />
      </Link>
      <nav className="nav">
        <Link href="/" className={`newsletter-button ${pathname === '/' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); window.location.href = "/"; }}>Quest ⚔️</Link>
        <Link href="/000001/about" className={`nav-link ${pathname === '/000001/about' ? 'active' : ''}`}>About</Link>
        <Link href="/000001/howtoplay" className={`nav-link ${pathname === '/000001/howtoplay' ? 'active' : ''}`}>How To Play</Link>
        <Link href="/000001/roadmap" className={`nav-link ${pathname === '/000001/roadmap' ? 'active' : ''}`}>Road Map</Link>
        <Link href="/000001/login" className={`newsletter-button ${pathname === '/000001/login' ? 'active' : ''}`}>Login</Link>
      </nav>
    </header>
  );
};

export default Navigation;
