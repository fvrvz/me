import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { PROJECTS } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

export function WorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getScrollDist = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);

      gsap.to(track, {
        x: () => -getScrollDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.9,
          start: 'top top',
          end: () => `+=${getScrollDist()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              PROJECTS.length,
              Math.max(1, Math.round(self.progress * (PROJECTS.length - 1)) + 1)
            );
            setActiveIndex(idx);
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="works" className="works-pin-section">
      <div
        style={{
          padding: '4.5rem clamp(1rem, 3vw, 3rem) 1rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '1rem',
        }}
      >
        <div>
          <div className="section-tag">03 // SELECTED ARCHITECTURES</div>
          <h2 className="section-heading" style={{ marginBottom: 0 }}>
            SHIPPED <span style={{ color: 'var(--accent-red)' }}>SYSTEMS</span>
          </h2>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            letterSpacing: '0.08em',
          }}
        >
          SCROLL TO EXPLORE —{' '}
          <strong style={{ color: 'var(--accent-red)' }}>
            {String(activeIndex).padStart(2, '0')}
          </strong>{' '}
          / {String(PROJECTS.length).padStart(2, '0')}
        </div>
      </div>

      <div ref={trackRef} className="works-track">
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className="work-card"
            data-cursor="EXPLORE"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1.25rem',
                }}
              >
                <span className="work-num" style={{ color: project.accent === '#CCFF00' ? 'var(--ink)' : project.accent }}>
                  {project.num}
                </span>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="theme-btn"
                    data-cursor="CODE"
                    aria-label={`${project.title} GitHub`}
                  >
                    <Code2 size={14} />
                    <span>CODE</span>
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="theme-btn"
                      style={{
                        background: 'var(--accent-lime)',
                        color: '#0D0D10',
                        borderColor: '#0D0D10',
                      }}
                      data-cursor="LIVE ↗"
                    >
                      <span>LIVE</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--ink-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem',
                }}
              >
                {project.category} • {project.year}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.75rem, 3vw, 2.35rem)',
                  margin: '0 0 0.9rem',
                  letterSpacing: '-0.03em',
                }}
              >
                {project.title}
              </h3>

              <p
                style={{
                  fontSize: '0.98rem',
                  lineHeight: 1.5,
                  color: 'var(--ink-muted)',
                  margin: '0 0 1.25rem',
                }}
              >
                {project.summary}
              </p>

              <ul
                style={{
                  margin: 0,
                  paddingLeft: '1.1rem',
                  fontSize: '0.88rem',
                  lineHeight: 1.55,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}
              >
                {project.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.45rem',
                marginTop: '1.75rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--line)',
              }}
            >
              {project.stack.map((tech) => (
                <span key={tech} className="tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
