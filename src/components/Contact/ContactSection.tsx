import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import qrImg from '../../assets/qr.png';
import designImg from '../../assets/design.png';
import StarBorder from '../ui/StarBorder/StarBorder';
import './ContactSection.css';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mansipatel1301',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/m00on13',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/_.mansipatell',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.98a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    )
  }
];

export const ContactSection = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isForceClosed, setIsForceClosed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const runGlow = () => {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 5000);
    };
    setTimeout(runGlow, 2000);
    const interval = setInterval(runGlow, 15000);
    return () => clearInterval(interval);
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 60,
        rotationX: 15,
        duration: 1.2,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const hasInput = Object.values(formData).some(val => val.trim() !== '');
  const isFlipped = (isClicked || isHovered || hasInput || isFocused) && !isForceClosed;

  const handleCardClick = () => setIsClicked(!isClicked);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsForceClosed(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCloseArrow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsClicked(false);
    setIsFocused(false);
    setIsForceClosed(true);
    setTimeout(() => setSubmitStatus('idle'), 400); // Reset after flip animation
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsFocused(false);
    }
  };

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-container">

        <div className="contact-label">
          <span className="contact-label-line" />
          <span className="contact-label-text">// 06 — Contact</span>
        </div>

        <div
          className={`biz-card-scene ${isFlipped ? 'is-flipped' : ''}`}
          onClick={handleCardClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="biz-card-inner" ref={cardRef}>

            {/* Front Face */}
            <div className="biz-card-face biz-card-front">
              <div className={`biz-card-glow ${isGlowing ? 'active' : ''}`}>
                 {isGlowing && (
                    <>
                      <div className="star-border-bottom" style={{ background: 'radial-gradient(ellipse 250px 30px at 50% 50%, #a855f7, transparent)' }}></div>
                      <div className="star-border-top" style={{ background: 'radial-gradient(ellipse 250px 30px at 50% 50%, #a855f7, transparent)' }}></div>
                    </>
                 )}
              </div>
              <div className="biz-card-face-inner">
                <div className="card-bg-design" style={{ backgroundImage: `url(${designImg})` }}></div>
                <div className="card-front-top">
                  <div className="card-heading-group">
                    <h2 className="card-slogan">Got something<br />brewing?</h2>
                    <p className="card-subtext">Let's connect.</p>
                  </div>
                </div>
                <div className="card-front-bottom">
                  <div className="card-info">
                    <h3 className="card-name">Mansi Patel</h3>
                    <p className="card-role">Full stack Developer / AI Engineer</p>
                  </div>
                  <div className="card-links">
                    {SOCIAL_LINKS.map(link => (
                      <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="card-social" onClick={e => e.stopPropagation()} aria-label={link.name}>
                        {link.icon}
                      </a>
                    ))}
                    <a href="mailto:mansi.patel7279s@gmail.com" className="card-social" onClick={e => e.stopPropagation()} aria-label="Email">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="card-flip-hint">Click to flip ⟳</div>
                
                <div className="card-qr">
                  <img src={qrImg} alt="Contact QR Code" className="qr-image" />
                </div>
              </div>
            </div>

            {/* Back Face */}
            <div className="biz-card-face biz-card-back">
              <div className={`biz-card-glow ${isGlowing ? 'active' : ''}`}>
                 {isGlowing && (
                    <>
                      <div className="star-border-bottom" style={{ background: 'radial-gradient(ellipse 250px 30px at 50% 50%, #a855f7, transparent)' }}></div>
                      <div className="star-border-top" style={{ background: 'radial-gradient(ellipse 250px 30px at 50% 50%, #a855f7, transparent)' }}></div>
                    </>
                 )}
              </div>
              <div className="biz-card-face-inner">
                <div className="card-bg-design" style={{ backgroundImage: `url(${designImg})` }}></div>
                <div className="card-back-header">
                  <h3>{submitStatus === 'success' ? 'Message Sent!' : 'Send a message'}</h3>
                </div>
                {submitStatus === 'success' ? (
                  <div className="card-success-message" onClick={e => e.stopPropagation()}>
                    <div className="success-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <p>Thanks for reaching out! I'll get back to you soon.</p>
                    <button type="button" className="card-submit-btn success-close-btn" onClick={handleCloseArrow}>
                      Close
                    </button>
                  </div>
                ) : (
                  <form
                    className="card-form"
                    onClick={e => e.stopPropagation()}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onSubmit={async e => {
                      e.preventDefault();
                      setSubmitStatus('loading');
                      try {
                        const response = await fetch('https://api.web3forms.com/submit', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                          },
                          body: JSON.stringify({
                            access_key: import.meta.env.VITE_WEB3FORM_FORM_ACCESS_KEY,
                            ...formData
                          })
                        });
                        const result = await response.json();
                        if (result.success) {
                          setSubmitStatus('success');
                          setFormData({ name: '', email: '', subject: '', message: '' });
                        } else {
                          setSubmitStatus('error');
                          alert(result.message || 'Something went wrong. Please try again.');
                        }
                      } catch (error) {
                        setSubmitStatus('error');
                        alert('Something went wrong. Please try again.');
                      }
                    }}
                  >
                    <div className="form-row">
                      <input type="text" name="name" placeholder="Your name" required value={formData.name} onChange={handleChange} disabled={submitStatus === 'loading'} />
                      <input type="email" name="email" placeholder="you@email.com" required value={formData.email} onChange={handleChange} disabled={submitStatus === 'loading'} />
                    </div>
                    <input type="text" name="subject" placeholder="What's this about?" required value={formData.subject} onChange={handleChange} disabled={submitStatus === 'loading'} />
                    <textarea name="message" placeholder="Tell me what you're building..." required value={formData.message} onChange={handleChange} disabled={submitStatus === 'loading'}></textarea>

                    {submitStatus === 'error' && <div className="form-error-text" style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>Failed to send message. Please try again.</div>}

                    <div className="card-form-actions">
                      <button type="button" className="card-flip-back-btn" onClick={handleCloseArrow} aria-label="Flip back" disabled={submitStatus === 'loading'}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                      </button>
                      <button type="submit" className="card-submit-btn" disabled={submitStatus === 'loading'}>
                        {submitStatus === 'loading' ? 'Sending...' : 'Send \u2192'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      <footer className="contact-footer">
        <p>&copy; 2026 Mansi Patel &middot; Designed &amp; built from scratch</p>
      </footer>
    </section>
  );
};
