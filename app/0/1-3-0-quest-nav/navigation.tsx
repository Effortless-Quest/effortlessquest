"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './navigation.css';

const Navigation = () => {
  const pathname = usePathname(); 

  return (
    <header className="header">
      <Link href="/" className="logo-link2">
        <Image src="/nav-titles/quest-nav.svg" alt="Elif Çakmak Logo" width={200} height={200}  />
      </Link>
      <nav className="nav">
        <Link href="/" className={`newsletter-button ${pathname === '/' ? 'active' : ''}`}onClick={(e) => { e.preventDefault();window.location.href = "/";}}>Quest ⚔️</Link>
        <Link href="/000005/about" className={`nav-link ${pathname === '/000005/about' ? 'active' : ''}`}>About</Link>
        <Link href="/000005/howtoplay" className={`nav-link ${pathname === '/000005/howtoplay' ? 'active' : ''}`}>How To Play</Link>
        <Link href="/000005/roadmap" className={`nav-link ${pathname === '/000005/roadmap' ? 'active' : ''}`}>Road Map</Link>
      </nav>
    </header>
  );
};

export default Navigation;
