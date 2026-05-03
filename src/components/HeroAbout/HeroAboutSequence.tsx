import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import mansiIdImg from '../../assets/mansi-id.png';
import './HeroAboutSequence.css';

gsap.registerPlugin(ScrollTrigger);

export const HeroAboutSequence = () => {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const aboutTextRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !badgeRef.current || !aboutTextRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      // Desktop Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%", // User scrolls 1.2x viewport height to complete
          scrub: 1,
          pin: true,
        }
      });

      tl.to(badgeRef.current, {
        x: '-25vw', // Move to the left
        scale: 0.85, // Shrink slightly
        ease: "power2.inOut"
      }, 0);

      tl.to(aboutTextRef.current, {
        opacity: 1,
        x: 0,
        pointerEvents: "auto",
        ease: "power2.inOut"
      }, 0);
    });

    mm.add("(max-width: 768px)", () => {
      // Mobile Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        }
      });

      tl.to(badgeRef.current, {
        y: '-15vh', // Move up
        scale: 0.85,
        ease: "power2.inOut"
      }, 0);

      tl.to(aboutTextRef.current, {
        opacity: 1,
        y: 0, // In CSS it's initially transformed 20px down
        pointerEvents: "auto",
        ease: "power2.inOut"
      }, 0);
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="hero-about-sequence" ref={containerRef}>
      <section id="hero">
        
        {/* About Me Content (initially hidden, right side) */}
        <div className="about-content" ref={aboutTextRef}>
          <h2>About Me</h2>
          <p>
            I build things that think — RAG pipelines, agentic apps, n8n automations, 
            and fullstack web apps that actually ship.
          </p>
          <p>
            Not just tutorials. Actual production work. I'm currently an AI fullstack 
            intern in my final year of college, open to fulltime + freelance from May 2026.
          </p>
        </div>

        {/* Hero Badge (initially centered) */}
        <div className="hero-badge-wrapper" ref={badgeRef}>
          <div className="hero-badge-float">
            <img
              src={mansiIdImg}
              alt="Mansi Patel ID Badge"
              className="hero-id"
            />
          </div>
        </div>

      </section>
    </div>
  );
};
