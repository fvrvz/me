import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Copy, Check, Moon, Sun } from 'lucide-react';
import { PROFILE } from './data/profile';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { HeroCanvas3D } from './components/HeroCanvas3D';
import { MagneticButton } from './components/MagneticButton';
import { AboutSection } from './components/AboutSection';
import { StickerPlayground } from './components/StickerPlayground';
import { WorksSection } from './components/WorksSection';
import { ExperienceSection } from './components/ExperienceSection';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [loaded, setLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const lenisRef = useRef<Lenis | null>(null);
  const heroArrowRef = useRef<SVGPathElement>(null);

  // Live IST clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setTimeStr(`${formatted} IST`);
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  // Theme class sync
  useEffect(() => {
    document.documentElement.classList.toggle('theme-ink', isDark);
  }, [isDark]);

  // Lenis + GSAP ScrollTrigger sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Hero entrance choreography after preloader
  const handlePreloaderDone = useCallback(() => {
    setLoaded(true);
    gsap.from('.hero-line-inner', {
      yPercent: 115,
      duration: 0.95,
      stagger: 0.11,
      ease: 'power4.out',
    });

    if (heroArrowRef.current) {
      const len = heroArrowRef.current.getTotalLength();
      gsap.fromTo(
        heroArrowRef.current,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 1.1, delay: 0.45, ease: 'power2.inOut' }
      );
    }
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.querySelector(id) as HTMLElement | null;
    if (target && lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -56 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <>
      {!loaded && <Preloader onComplete={handlePreloaderDone} />}
      <CustomCursor />

      <div className="ambient-aurora" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <div className="swiss-grid-lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Floating Liquid-Glass Top Navigation */}
      <div className="top-bar-wrap">
        <header className="top-bar">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            lenisRef.current?.scrollTo(0);
          }}
          className="brand-pill"
          data-cursor="TOP"
        >
          <span className="pulse-badge" />
          <span>{PROFILE.name.toUpperCase()}</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('#about'); }}>
            About
          </a>
          <a href="#playground" onClick={(e) => { e.preventDefault(); scrollToSection('#playground'); }}>
            Stack
          </a>
          <a href="#works" onClick={(e) => { e.preventDefault(); scrollToSection('#works'); }}>
            Works
          </a>
          <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('#experience'); }}>
            Timeline
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}>
            Contact
          </a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--ink-muted)',
              display: 'none',
            }}
            className="clock-label"
          >
            {timeStr}
          </span>
          <button
            type="button"
            className="theme-btn"
            onClick={() => setIsDark((d) => !d)}
            data-cursor="THEME"
            aria-label="Toggle color theme"
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
            <span>{isDark ? 'PAPER' : 'INK'}</span>
          </button>
        </div>
        </header>
      </div>

      <main id="top">
        {/* HERO */}
        <div className="page-shell">
          <section className="hero-section">
            <HeroCanvas3D isDark={isDark} />

            <div className="hero-foreground">
              <div className="hero-kicker-row">
                <span className="glass-status-pill">{PROFILE.handle} // CREATIVE ENGINEER</span>
                <span>{timeStr || 'INDIA // REMOTE'}</span>
                <span className="glass-status-pill" style={{ color: 'var(--accent-red)' }}>
                  ● AVAILABLE FOR SELECT ROLES
                </span>
              </div>

              <h1 className="hero-display-title">
                <span className="hero-line-mask">
                  <span className="hero-line-inner">FARAAZ</span>
                </span>
                <span className="hero-line-mask">
                  <span className="hero-line-inner hero-outline-text">KHAN —</span>
                </span>
                <span className="hero-line-mask">
                  <span className="hero-line-inner">UI/UX &amp; SYSTEMS</span>
                </span>
              </h1>
            </div>

            <div className="hero-foreground hero-bottom-grid">
              <div>
                <div className="hero-lead-glass">
                  <p className="hero-lead">{PROFILE.tagline}</p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <MagneticButton
                    className="is-primary"
                    onClick={() => scrollToSection('#works')}
                    cursorLabel="SCROLL"
                  >
                    <span>EXPLORE WORKS</span>
                    <ArrowDown size={15} />
                  </MagneticButton>
                  <MagneticButton
                    href={PROFILE.github}
                    target="_blank"
                    rel="noreferrer"
                    cursorLabel="GITHUB"
                  >
                    <span>GITHUB</span>
                    <ArrowUpRight size={15} />
                  </MagneticButton>
                  <MagneticButton
                    onClick={copyEmail}
                    cursorLabel="COPY"
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    <span>{copied ? 'COPIED!' : PROFILE.email}</span>
                  </MagneticButton>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  gap: '1rem',
                }}
              >
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
                  <path
                    ref={heroArrowRef}
                    d="M14 14 C36 14, 48 28, 48 56 M36 44 L48 58 L60 44"
                    stroke="var(--accent-red)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    color: 'var(--ink-muted)',
                  }}
                >
                  SCROLL TO
                  <br />
                  DECODE
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* MARQUEE STRIP */}
        <div className="marquee-strip" aria-hidden="true">
          <div className="marquee-inner">
            {[0, 1].map((dup) => (
              <div
                key={dup}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2.5rem',
                  paddingRight: '2.5rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  letterSpacing: '0.02em',
                }}
              >
                <span>GO 1.24</span>
                <span>✦</span>
                <span>SCALA 3.5</span>
                <span>✦</span>
                <span>SVELTEKIT 2</span>
                <span>✦</span>
                <span>REACT 19</span>
                <span>✦</span>
                <span>ANGULAR 18+</span>
                <span>✦</span>
                <span>THREE.JS / WEBGL</span>
                <span>✦</span>
                <span>GSAP + LENIS</span>
                <span>✦</span>
                <span>PGVECTOR RAG</span>
                <span>✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT + PIXEL PORTRAIT */}
        <div className="page-shell">
          <AboutSection />
          <StickerPlayground />
        </div>

        {/* PINNED HORIZONTAL WORKS */}
        <WorksSection />

        {/* EXPERIENCE & HONORS */}
        <div className="page-shell">
          <ExperienceSection />

          {/* CONTACT & FOOTER */}
          <footer id="contact" className="editorial-section" style={{ borderBottom: 'none' }}>
            <div className="section-tag">05 // INITIATE CONTACT</div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2.6rem, 8.5vw, 7.6rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                margin: '0 0 2.5rem',
                textTransform: 'uppercase',
              }}
            >
              LET&apos;S BUILD
              <br />
              SOMETHING{' '}
              <span style={{ color: 'var(--accent-red)' }}>UNFORGETTABLE.</span>
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', marginBottom: '4rem' }}>
              <MagneticButton className="is-primary" onClick={copyEmail} cursorLabel="COPY">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{PROFILE.email}</span>
              </MagneticButton>
              <MagneticButton
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                cursorLabel="LINKEDIN"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight size={16} />
              </MagneticButton>
              <MagneticButton
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                cursorLabel="GITHUB"
              >
                <span>GITHUB</span>
                <ArrowUpRight size={16} />
              </MagneticButton>
              <MagneticButton
                href={PROFILE.twitter}
                target="_blank"
                rel="noreferrer"
                cursorLabel="X"
              >
                <span>X / TWITTER</span>
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--line)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--ink-muted)',
              }}
            >
              <span>© 2026 {PROFILE.name.toUpperCase()} // ALL SYSTEMS OPERATIONAL</span>
              <button
                type="button"
                className="theme-btn"
                onClick={() => lenisRef.current?.scrollTo(0)}
                data-cursor="TOP ↑"
              >
                BACK TO TOP ↑
              </button>
            </div>
          </footer>
        </div>
      </main>

      {copied && (
        <div className="copy-toast" role="status">
          COPIED TO CLIPBOARD: {PROFILE.email}
        </div>
      )}
    </>
  );
}

export default App;
