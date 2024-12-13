"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './navigation.css';

const Navigation = () => {
  const pathname = usePathname();

  return (
    <header className={`header ${pathname === '/3' ? 'highlight' : ''}`}>

      <Link href="/" className="logo-link">
        <Image src="/elif-logo/elifcakmaklogo.svg" alt="Elif Çakmak Logo" width={100} height={100} className="logo" />
      </Link>
      <nav className="nav">
        <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link href="/2/about" className={`nav-link ${pathname === '/2/about' ? 'active' : ''}`}>About</Link>
        <Link href="/2/videos" className={`nav-link ${pathname === '/2/videos' ? 'active' : ''}`}>Videos</Link>
        <Link href="/2/podcast" className={`nav-link ${pathname === '/2/podcast' ? 'active' : ''}`}>Podcast</Link>
        <Link href="/2/apps" className={`nav-link ${pathname === '/2/apps' ? 'active' : ''}`}>Apps</Link>
        <Link href="/2/books" className={`nav-link ${pathname === '/2/books' ? 'active' : ''}`}>Books</Link>
        <Link href="/3" className={`nav-link ${pathname === '/3' ? 'active' : ''}`}>Road Map</Link>
        <Link href="/2/newsletter" className={`newsletter-button ${pathname === '/2/newsletter' ? 'active' : ''}`}>Newsletter</Link>
      </nav>
    </header>
  );
};

export default Navigation;
