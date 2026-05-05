import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import mansiIdImg from '../../assets/mansi-id.png';
import TextType from '../ui/TextType';
import BorderGlow from '../ui/BorderGlow/BorderGlow';
import './HeroAboutSequence.css';

gsap.registerPlugin(ScrollTrigger);

export const HeroAboutSequence = () => {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const aboutTextRef = useRef(null);
  const [typingComplete, setTypingComplete] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const startedTypingRef = useRef(false);

  useLayoutEffect(() => {
    if (!containerRef.current || !badgeRef.current || !aboutTextRef.current) return;

    // Mouse follow tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 20; // max 10deg tilt
      const yPos = (clientY / innerHeight - 0.5) * -20;

      gsap.to(badgeRef.current, {
        rotateY: xPos,
        rotateX: yPos,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      // Desktop Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Increased scroll distance
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            if (self.progress > 0.4 && !startedTypingRef.current) {
              startedTypingRef.current = true;
              setStartTyping(true);
            }
          }
        }
      });

      // Phase 1: Move to Top Center Avatar position
      tl.to(badgeRef.current, {
        y: '-35vh',
        scale: 0.3,
        ease: "power2.inOut"
      }, 0);

      // Phase 2: Reveal About Text
      tl.to(aboutTextRef.current, {
        opacity: 1,
        y: '10vh', // Move it down a bit to clear the avatar
        x: 0,
        pointerEvents: "auto",
        ease: "power2.inOut"
      }, 0.3);
    });

    mm.add("(max-width: 768px)", () => {
      // Mobile Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            if (self.progress > 0.4 && !startedTypingRef.current) {
              startedTypingRef.current = true;
              setStartTyping(true);
            }
          }
        }
      });

      tl.to(badgeRef.current, {
        y: '-38vh',
        scale: 0.25,
        ease: "power2.inOut"
      }, 0);

      tl.to(aboutTextRef.current, {
        opacity: 1,
        y: '5vh',
        pointerEvents: "auto",
        ease: "power2.inOut"
      }, 0.3);
    });

    return () => {
      mm.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="hero-about-sequence" ref={containerRef}>
      <section id="hero">

        {/* About Me Content (initially hidden, right side) */}
        <div className="about-content" ref={aboutTextRef}>
          <TextType 
            as="h2"
            text="Welcome to my playground"
            typingSpeed={75}
            loop={false}
            showCursor={true}
            onSentenceComplete={() => setTypingComplete(true)}
            startOnVisible={false}
            startTyping={startTyping}
            className="playground-heading"
            cursorClassName="playground-cursor"
          />
          <div className={`about-details ${typingComplete ? 'visible' : 'hidden'}`}>
            <p>
              Hi! I'm Mansi, an AI fullstack developer who builds across the stack — from RAG pipelines and agentic AI systems to frontend interfaces and automation workflows.
            </p>
            <p>
              I hold a BTech in Information Technology and have hands-on experience shipping production-grade AI features, building MCP integrations, and leading fullstack work across live client projects. My work tends to live at the intersection of data engineering, intelligent systems, and the interfaces that tie them together.
            </p>
          </div>
        </div>

        {/* Hero Badge (initially centered) */}
        <div className="hero-badge-wrapper" ref={badgeRef}>
          <div className="hero-badge-float">
            <BorderGlow
              className="hero-id-border-glow"
              glowColor="280 90 85"
              backgroundColor="#ffffff"
              borderRadius={24}
              glowRadius={80}
              glowIntensity={3.0}
              animated={true}
              edgeSensitivity={30}
              coneSpread={40}
              fillOpacity={0.4}
              colors={['#a855f7', '#e879f9', '#818cf8']}
            >
              <div className="hero-id-container">
                <img
                  src={mansiIdImg}
                  alt="Mansi Patel ID Badge"
                  className="hero-id"
                />
                <div className="holographic-overlay"></div>
                <div className="pulse-element pulse-name"></div>
                <div className="pulse-element pulse-qr"></div>
              </div>
            </BorderGlow>
          </div>
        </div>

      </section>
    </div>
  );
};
