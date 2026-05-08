import { useState, useEffect } from 'react';
import { 
  Moon, 
  Sun, 
  MessageSquare, 
  FileText, 
  Home,
  MoreHorizontal
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',    href: '#hero',    icon: Home },
  { label: 'Contact', href: '#contact', icon: MessageSquare },
];

export const Navbar = ({ onOpenContact }: { onOpenContact: () => void }) => {
  const { theme, toggleTheme } = useTheme();
  const [activeLink, setActiveLink] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      const ids = ['hero', 'profile'];
      let current = 'hero';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActiveLink(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goto = (href: string) => {
    if (href === '#contact') {
      onOpenContact();
      return;
    }
    const el = document.querySelector(href) as HTMLElement | null;
    if (el) {
      const offset = href === '#hero' ? 0 : el.offsetTop - 64;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="sidebar" aria-label="Main navigation">
        <div className="sidebar-logo-container">
          <a className="sidebar-logo" href="#hero"
             onClick={e => { e.preventDefault(); goto('#hero'); }}>
            <span className="logo-m">M</span>
            <span className="logo-ansi">ansi.</span>
          </a>
        </div>

        <div className="sidebar-links">
          {NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <a key={href}
               className={`sidebar-link ${activeLink === href.slice(1) ? 'active' : ''}`}
               href={href}
               onClick={e => { e.preventDefault(); goto(href); }}>
              <Icon size={24} />
              <span className="link-label">{label}</span>
            </a>
          ))}
          <a className="sidebar-link" href="/Mansi_Patel_Resume.pdf"
             target="_blank" rel="noopener noreferrer">
            <FileText size={24} />
            <span className="link-label">Resume</span>
          </a>
        </div>

        <div className="sidebar-footer">
          <button className="sidebar-link theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            <span className="link-label">Switch Appearance</span>
          </button>
          
          <div className="sidebar-link more-btn">
            <MoreHorizontal size={24} />
            <span className="link-label">More</span>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <nav className="mobile-nav">
        {NAV_LINKS.map(({ href, icon: Icon }) => (
          <a key={href}
             className={`mobile-nav-link ${activeLink === href.slice(1) ? 'active' : ''}`}
             href={href}
             onClick={e => { e.preventDefault(); goto(href); }}>
            <Icon size={24} />
          </a>
        ))}
        <button className="mobile-nav-link" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </nav>
    </>
  );
};
