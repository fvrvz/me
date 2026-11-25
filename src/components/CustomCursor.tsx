import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    if (!isFine) return;

    document.body.classList.add('has-custom-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    const pill = pillRef.current;
    if (!dot || !ring || !pill) return;

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.24, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.24, ease: 'power3.out' });
    const xPill = gsap.quickTo(pill, 'x', { duration: 0.16, ease: 'power3.out' });
    const yPill = gsap.quickTo(pill, 'y', { duration: 0.16, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      setVisible(true);
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      xPill(e.clientX);
      yPill(e.clientY);

      const target = (e.target as HTMLElement | null)?.closest('[data-cursor]');
      setLabel(target?.getAttribute('data-cursor') || '');
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${pressed ? 'is-pressed' : ''}`}
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={pillRef}
        className={`cursor-label-pill ${visible && label ? 'is-visible' : ''}`}
      >
        {label}
      </div>
    </>
  );
}
