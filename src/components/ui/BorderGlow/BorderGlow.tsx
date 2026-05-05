import { useRef, useCallback, useState, useEffect, type ReactNode } from 'react';

interface BorderGlowProps {
  children?: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
}

function parseHSL(hslStr: string): { h: number; s: number; l: number } {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildBoxShadow(glowColor: string, intensity: number): string {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const layers: [number, number, number, number, number, boolean][] = [
    [0, 0, 0, 1, 100, true], [0, 0, 2, 0, 80, true], [0, 0, 6, 0, 70, true],
    [0, 0, 12, 0, 60, true], [0, 0, 30, 0, 50, true], [0, 0, 50, 4, 40, true],
    [0, 0, 100, 4, 30, true],
    [0, 0, 2, 0, 80, false], [0, 0, 6, 0, 70, false], [0, 0, 12, 0, 60, false],
    [0, 0, 30, 0, 50, false], [0, 0, 50, 4, 40, false], [0, 0, 100, 4, 30, false],
  ];
  return layers.map(([x, y, blur, spread, alpha, inset]) => {
    const a = Math.min(alpha * intensity, 100);
    return `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
  }).join(', ');
}

function easeOutCubic(x: number) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x: number) { return x * x * x; }

interface AnimateOpts {
  start?: number; end?: number; duration?: number; delay?: number;
  ease?: (t: number) => number; onUpdate: (v: number) => void; onEnd?: () => void;
}

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }: AnimateOpts) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  setTimeout(() => requestAnimationFrame(tick), delay);
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildMeshGradients(colors: string[]): string[] {
  const gradients: string[] = [];
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    gradients.push(`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`);
  }
  gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
  return gradients;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  fillOpacity = 0.5,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [edgeProximity, setEdgeProximity] = useState(0);
  const [sweepActive, setSweepActive] = useState(false);
  
  // Use a ref for the angle and proximity to update CSS variables directly for performance
  const angleRef = useRef(45);
  const proximityRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const updateCSSVars = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--cursor-angle', `${angleRef.current.toFixed(3)}deg`);
    cardRef.current.style.setProperty('--edge-proximity', `${proximityRef.current.toFixed(3)}`);
    
    // Update state only when visibility changes to trigger opacity transitions
    // but keep high-frequency movement in CSS variables
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    
    // Proximity calculation
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    const prox = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    
    // Angle calculation
    let angle = 0;
    if (dx !== 0 || dy !== 0) {
      angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;
    }

    proximityRef.current = prox;
    angleRef.current = angle;
    setEdgeProximity(prox); // Still needed for opacity logic

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        updateCSSVars();
        rafRef.current = null;
      });
    }
  }, [updateCSSVars]);

  useEffect(() => {
    if (!animated) return;
    const angleStart = 110;
    const angleEnd = 465;
    setSweepActive(true);
    
    animateValue({ duration: 500, onUpdate: v => {
      proximityRef.current = v / 100;
      setEdgeProximity(v / 100);
      updateCSSVars();
    }});
    
    animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: v => {
      angleRef.current = (angleEnd - angleStart) * (v / 100) + angleStart;
      updateCSSVars();
    }});
    
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: v => {
      angleRef.current = (angleEnd - angleStart) * (v / 100) + angleStart;
      updateCSSVars();
    }});
    
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => {
        proximityRef.current = v / 100;
        setEdgeProximity(v / 100);
        updateCSSVars();
      },
      onEnd: () => setSweepActive(false),
    });
  }, [animated, updateCSSVars]);

  const isVisible = isHovered || sweepActive;
  const borderOpacity = isVisible
    ? Math.min(1, (edgeProximity * 100 - (edgeSensitivity - 10)) / (100 - edgeSensitivity))
    : 0;
  const glowOpacity = isVisible
    ? Math.min(1, (edgeProximity * 100 - (edgeSensitivity - 20)) / (100 - edgeSensitivity))
    : 0;

  const meshGradients = buildMeshGradients(colors);
  const borderBg = meshGradients.map(g => `${g} border-box`);
  const fillBg = meshGradients.map(g => `${g} padding-box`);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={className}
      style={{
        position: 'relative',
        display: 'grid',
        isolation: 'isolate',
        background: backgroundColor,
        borderRadius: `${borderRadius}px`,
        transform: 'translate3d(0, 0, 0.01px)',
        boxShadow: 'rgba(0,0,0,0.1) 0 1px 2px, rgba(0,0,0,0.1) 0 2px 4px, rgba(0,0,0,0.1) 0 4px 8px, rgba(0,0,0,0.1) 0 8px 16px, rgba(0,0,0,0.1) 0 16px 32px, rgba(0,0,0,0.1) 0 32px 64px',
        '--cursor-angle': '45deg',
        '--edge-proximity': '0',
      } as any}
    >
      {/* mesh gradient border */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          zIndex: -1,
          border: '1px solid transparent',
          background: [
            `linear-gradient(${backgroundColor} 0 100%) padding-box`,
            'linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box',
            ...borderBg,
          ].join(', '),
          opacity: borderOpacity,
          maskImage: `conic-gradient(from var(--cursor-angle) at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
          WebkitMaskImage: `conic-gradient(from var(--cursor-angle) at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
          transition: isVisible ? 'opacity 0.25s ease-out' : 'opacity 0.75s ease-in-out',
          willChange: 'mask-image, -webkit-mask-image',
          transform: 'translateZ(0)',
        }}
      />

      {/* mesh gradient fill near edges */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          zIndex: -1,
          border: '1px solid transparent',
          background: fillBg.join(', '),
          maskImage: [
            'linear-gradient(to bottom, black, black)',
            'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
            'radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)',
            `conic-gradient(from var(--cursor-angle) at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
          ].join(', '),
          WebkitMaskImage: [
            'linear-gradient(to bottom, black, black)',
            'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
            'radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)',
            `conic-gradient(from var(--cursor-angle) at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
          ].join(', '),
          maskComposite: 'subtract, add, add, add, add, add',
          WebkitMaskComposite: 'source-out, source-over, source-over, source-over, source-over, source-over',
          opacity: borderOpacity * fillOpacity,
          mixBlendMode: 'screen',
          transition: isVisible ? 'opacity 0.25s ease-out' : 'opacity 0.75s ease-in-out',
          willChange: 'mask-image, -webkit-mask-image',
          transform: 'translateZ(0)',
        } as React.CSSProperties}
      />

      {/* outer glow */}
      <span
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          zIndex: 1,
          borderRadius: 'inherit',
          inset: `${-glowRadius}px`,
          maskImage: `conic-gradient(from var(--cursor-angle) at center, black 10%, transparent 25%, transparent 75%, black 90%)`,
          WebkitMaskImage: `conic-gradient(from var(--cursor-angle) at center, black 10%, transparent 25%, transparent 75%, black 90%)`,
          opacity: glowOpacity,
          mixBlendMode: 'plus-lighter',
          transition: isVisible ? 'opacity 0.25s ease-out' : 'opacity 0.75s ease-in-out',
          willChange: 'mask-image, -webkit-mask-image',
          transform: 'translateZ(0)',
        } as React.CSSProperties}
      >
        <span
          style={{
            position: 'absolute',
            borderRadius: 'inherit',
            inset: `${glowRadius}px`,
            boxShadow: buildBoxShadow(glowColor, glowIntensity),
          }}
        />
        {/* Secondary punch layer */}
        <span
          style={{
            position: 'absolute',
            borderRadius: 'inherit',
            inset: `${glowRadius}px`,
            boxShadow: buildBoxShadow(glowColor, glowIntensity * 0.5),
            filter: 'blur(10px)',
          }}
        />
      </span>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', zIndex: 1, overflow: 'visible' }}>
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
