import { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Work',     href: '#work'     },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Contact',  href: '#contact'  },
];

export const Navbar = () => {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ['work', 'projects', 'skills', 'education', 'contact'];
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActiveLink(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpen]);

  const goto = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href) as HTMLElement | null;
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <a className="navbar-logo" href="#hero"
           onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          Mansi<span>.</span>
        </a>

        <nav className="navbar-links" aria-label="Primary navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href}
               className={`navbar-link ${activeLink === href.slice(1) ? 'active' : ''}`}
               href={href}
               onClick={e => { e.preventDefault(); goto(href); }}>
              {label}
            </a>
          ))}
          <a className="navbar-resume-btn" href="/Mansi_Patel_Resume.pdf"
             target="_blank" rel="noopener noreferrer">
            Resume ↗
          </a>
        </nav>

        <button className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Toggle navigation"
                aria-expanded={menuOpen}>
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="navbar-mobile-menu" ref={menuRef}>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} className="navbar-mobile-link" href={href}
               onClick={e => { e.preventDefault(); goto(href); }}>
              {label}
            </a>
          ))}
          <a className="navbar-mobile-resume" href="/Mansi_Patel_Resume.pdf"
             target="_blank" rel="noopener noreferrer">
            Download Resume ↗
          </a>
        </div>
      )}
    </header>
  );
};
