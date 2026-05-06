import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import mansiIdImg from '../../assets/mansi-id.png';
import StarBorder from '../ui/StarBorder/StarBorder';
import './HeroAboutSequence.css';

gsap.registerPlugin(ScrollTrigger);

export const HeroAboutSequence = () => {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !badgeRef.current) return;

    // Mouse follow tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 20; 
      const yPos = (clientY / innerHeight - 0.5) * -20;

      gsap.to(badgeRef.current, {
        rotateY: xPos,
        rotateX: yPos,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Match Media for responsive flight path
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)"
    }, (context) => {
      const { isDesktop } = context.conditions as any;

      // Ensure the social section is ready to be revealed behind the hero
      gsap.set("#profile", { 
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "100%", 
        opacity: 0, 
        zIndex: 5,
        pointerEvents: "none"
      });

      // Scroll Animation: Twist and send to profile icon
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Longer scroll for the reveal
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            // As we finish, we want the social section to become interactive and relative again
            if (self.progress > 0.95) {
              gsap.set("#profile", { position: "relative", pointerEvents: "auto", zIndex: 1 });
              gsap.set(containerRef.current, { visibility: "hidden" });
            } else {
              gsap.set("#profile", { position: "absolute", pointerEvents: "none", zIndex: 5 });
              gsap.set(containerRef.current, { visibility: "visible" });
            }
          }
        }
      });

      // 1. Reveal Social Section in place
      tl.to("#profile", {
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut"
      }, 0);

      // 2. Animate the card: Twist, scale down, and move to top-left (avatar position)
      tl.to(badgeRef.current, {
        scale: isDesktop ? 0.11 : 0.15,
        rotateY: 1440,
        rotateX: 360,
        x: isDesktop ? "-308px" : "0", 
        y: isDesktop ? "-30vh" : "-35vh",
        ease: "power2.inOut"
      }, 0);

      // 3. Optional: add a tiny "pop" at the end of the flight
      tl.to(badgeRef.current, {
        scale: isDesktop ? 0.13 : 0.18,
        duration: 0.1,
        ease: "back.out(2)"
      }).to(badgeRef.current, {
        scale: isDesktop ? 0.11 : 0.15,
        opacity: 0,
        duration: 0.1
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      mm.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="hero-about-sequence" ref={containerRef}>
      <section id="hero">
        {/* Hero Badge (initially centered) */}
        <div className="hero-badge-wrapper" ref={badgeRef}>
          <div className="hero-badge-float">
            <StarBorder
              as="div"
              className="hero-id-star-border"
              color="#a855f7"
              speed="5s"
              thickness={2}
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
            </StarBorder>
          </div>
        </div>
      </section>
    </div>
  );
};
