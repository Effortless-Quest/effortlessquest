"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './termsnav.css';

const TermsNav = () => {
  const pathname = usePathname(); 

  return (
    <header className="header">
      <Link href="/" className="logo-link">
        <Image src="/elif-logo/elifcakmaklogowhite.svg" alt="Elif Çakmak Logo" width={100} height={100} className="logo" />
      </Link>
      <nav className="nav">
        <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link href="/4/privacy" className={`nav-link ${pathname === '/4/privacy' ? 'active' : ''}`}>Privacy</Link>
        <Link href="/4/terms" className={`nav-link ${pathname === '/4/terms' ? 'active' : ''}`}>Terms</Link>
        <Link href="/4/return" className={`nav-link ${pathname === '/4/return' ? 'active' : ''}`}>Returns</Link>
        <Link href="/4/cookies" className={`nav-link ${pathname === '/4/cookies' ? 'active' : ''}`}>Cookies</Link>
        <Link href="/4/disclaimer" className={`nav-link ${pathname === '/4/disclaimer' ? 'active' : ''}`}>Disclaimer</Link>
      </nav>
    </header>
  );
};

export default TermsNav;
