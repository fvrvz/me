import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROFILE } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pixelContainerRef = useRef<HTMLDivElement>(null);

  const words = PROFILE.manifesto.split(' ');
  const portrait = PROFILE.portraits[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-scrubbed word highlight
      gsap.to('.manifesto-word', {
        opacity: 1,
        stagger: 0.04,
        ease: 'none',
        scrollTrigger: {
          trigger: '.manifesto-text',
          start: 'top 78%',
          end: 'bottom 45%',
          scrub: true,
        },
      });

      // Pixel-grid curtain reveal over portrait
      gsap.to('.pixel-cell', {
        opacity: 0,
        scale: 0.6,
        duration: 0.4,
        stagger: {
          amount: 0.75,
          from: 'random',
        },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: pixelContainerRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="editorial-section">
      <div className="section-tag">
        <span>01 // ABOUT ME</span>
      </div>

      <div className="about-grid">
        <div>
          <h2 className="section-heading">
            SYSTEMS MIND.
            <br />
            <span style={{ color: 'var(--accent-red)' }}>CRAFTED</span> HANDS.
          </h2>

          <p className="manifesto-text">
            {words.map((word, idx) => (
              <span key={idx} className="manifesto-word">
                {word}
              </span>
            ))}
          </p>

          <div className="stats-strip">
            <div className="stat-cell">
              <div className="stat-val">{PROFILE.yearsExp}</div>
              <div className="stat-lbl">Years Production</div>
            </div>
            <div className="stat-cell">
              <div className="stat-val">{PROFILE.systemsBuilt}</div>
              <div className="stat-lbl">Flagship Systems</div>
            </div>
            <div className="stat-cell">
              <div className="stat-val">{PROFILE.mfeReduction}</div>
              <div className="stat-lbl">MFE Code Saved</div>
            </div>
          </div>
        </div>

        <div>
          <div ref={pixelContainerRef} className="portrait-stage">
            <img
              src={portrait.src}
              alt="Faraaz Khan"
              className="portrait-img"
            />
            <div className="portrait-glass-badge">
              <span>FARAAZ KHAN // @FVRVZ</span>
              <span>BLR, INDIA</span>
            </div>
            <div className="pixel-grid-mask" aria-hidden="true">
              {Array.from({ length: 80 }).map((_, i) => (
                <div key={i} className="pixel-cell" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
