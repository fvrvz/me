import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  cursorLabel?: string;
}

export function MagneticButton({
  children,
  className = '',
  href,
  target,
  rel,
  onClick,
  cursorLabel = 'OPEN',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: dx * 0.28,
      y: dy * 0.28,
      duration: 0.35,
      ease: 'power3.out',
    });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.55,
      ease: 'elastic.out(1, 0.45)',
    });
  };

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        data-cursor={cursorLabel}
        className={`magnetic-btn ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor={cursorLabel}
      className={`magnetic-btn ${className}`}
    >
      {children}
    </button>
  );
}
