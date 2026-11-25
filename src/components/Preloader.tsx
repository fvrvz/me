import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 1.0,
        ease: 'power2.inOut',
      }, 0);
    }

    tl.to(
      obj,
      {
        val: 100,
        duration: 1.15,
        ease: 'power3.inOut',
        onUpdate: () => setCount(Math.round(obj.val)),
      },
      0
    ).to(
      curtainRef.current,
      {
        yPercent: -100,
        duration: 0.75,
        ease: 'power4.inOut',
      },
      '+=0.15'
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={curtainRef} className="preloader-curtain" aria-hidden="true">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          letterSpacing: '0.1em',
        }}
      >
        <span>FARAAZ KHAN // PORTFOLIO_26</span>
        <span>INITIALIZING SYSTEMS</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg width="130" height="90" viewBox="0 0 130 90" fill="none">
          <path
            ref={pathRef}
            d="M18 75 V15 H56 M18 44 H48 M74 15 V75 M112 15 L76 45 L114 75"
            stroke="#CCFF00"
            strokeWidth="5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            opacity: 0.65,
          }}
        >
          GO • SCALA • SVELTE • REACT • WEBGL
        </span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(3rem, 9vw, 6.5rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            color: '#CCFF00',
          }}
        >
          {String(count).padStart(3, '0')}%
        </span>
      </div>
    </div>
  );
}
