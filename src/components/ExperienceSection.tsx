import { useState } from 'react';
import { Plus, Minus, Award } from 'lucide-react';
import { EXPERIENCES, HONORS } from '../data/profile';

export function ExperienceSection() {
  const [openId, setOpenId] = useState<string>('nexturn');

  return (
    <section id="experience" className="editorial-section">
      <div className="section-tag">04 // CAREER TIMELINE &amp; HONORS</div>
      <h2 className="section-heading">
        PRODUCTION <span style={{ color: 'var(--accent-red)' }}>HISTORY</span>
      </h2>

      <div style={{ marginTop: '2.5rem' }}>
        {EXPERIENCES.map((exp) => {
          const isOpen = openId === exp.id;
          return (
            <div key={exp.id} className="exp-row">
              <button
                type="button"
                className="exp-header"
                onClick={() => setOpenId(isOpen ? '' : exp.id)}
                data-cursor={isOpen ? 'CLOSE' : 'EXPAND'}
                aria-expanded={isOpen}
              >
                <span
                  className="exp-period"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--ink-muted)',
                  }}
                >
                  {exp.period}
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(1.35rem, 2.5vw, 2rem)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {exp.company}
                </span>

                <span
                  className="exp-role-col"
                  style={{
                    fontSize: '0.98rem',
                    color: 'var(--ink-muted)',
                  }}
                >
                  {exp.role}
                </span>

                <span
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '999px',
                    border: '1px solid var(--ink)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isOpen ? 'var(--accent-lime)' : 'transparent',
                    color: isOpen ? '#0D0D10' : 'var(--ink)',
                    justifySelf: 'end',
                  }}
                >
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              {isOpen && (
                <div
                  style={{
                    marginTop: '1.5rem',
                    paddingLeft: 'min(190px, 0px)',
                    display: 'grid',
                    gap: '1rem',
                    maxWidth: '840px',
                  }}
                >
                  <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.55 }}>
                    {exp.overview}
                  </p>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: '1.2rem',
                      display: 'grid',
                      gap: '0.5rem',
                      color: 'var(--ink-muted)',
                      lineHeight: 1.55,
                    }}
                  >
                    {exp.achievements.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.4rem' }}>
                    {exp.tags.map((tag) => (
                      <span key={tag} className="tech-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Honors Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
          marginTop: '4rem',
        }}
      >
        {HONORS.map((h) => (
          <div key={h.title} className="honor-glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Award size={18} style={{ color: 'var(--accent-red)' }} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--ink-muted)',
                }}
              >
                {h.org} • {h.year}
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.2rem',
                margin: 0,
              }}
            >
              {h.title}
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.5 }}>
              {h.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
