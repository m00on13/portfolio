import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import mansiIdImg from '../../assets/mansi-id.png';
import TextType from '../ui/TextType';
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
          onUpdate: (self) => {
            if (self.progress > 0.15 && !startedTypingRef.current) {
              startedTypingRef.current = true;
              setStartTyping(true);
            }
          }
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
          onUpdate: (self) => {
            if (self.progress > 0.15 && !startedTypingRef.current) {
              startedTypingRef.current = true;
              setStartTyping(true);
            }
          }
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
