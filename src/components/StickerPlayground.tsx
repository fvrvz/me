import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { RotateCcw } from 'lucide-react';
import { STICKERS } from '../data/profile';

gsap.registerPlugin(Draggable);

export function StickerPlayground() {
  const boardRef = useRef<HTMLDivElement>(null);
  const draggablesRef = useRef<Draggable[]>([]);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.sticker-chip', board);
      draggablesRef.current = Draggable.create(items, {
        bounds: board,
        inertia: false,
        edgeResistance: 0.85,
        onPress() {
          gsap.to(this.target, { scale: 1.07, duration: 0.18, ease: 'power2.out' });
        },
        onRelease() {
          gsap.to(this.target, { scale: 1, duration: 0.25, ease: 'elastic.out(1, 0.5)' });
        },
      });
    }, board);

    return () => ctx.revert();
  }, []);

  const resetStickers = () => {
    const board = boardRef.current;
    if (!board) return;
    const items = gsap.utils.toArray<HTMLElement>('.sticker-chip', board);
    items.forEach((el, idx) => {
      gsap.to(el, {
        x: 0,
        y: 0,
        rotation: STICKERS[idx]?.rotate ?? 0,
        duration: 0.65,
        ease: 'elastic.out(1, 0.55)',
      });
    });
  };

  return (
    <section id="playground" className="editorial-section">
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <div className="section-tag">02 // TACTILE STACK PLAYGROUND</div>
          <h2 className="section-heading" style={{ marginBottom: 0 }}>
            PEEL, DRAG &amp; <span style={{ color: 'var(--accent-red)' }}>TOSS</span>
          </h2>
        </div>

        <button
          type="button"
          onClick={resetStickers}
          className="theme-btn"
          data-cursor="RESET"
        >
          <RotateCcw size={13} />
          <span>RESET STICKERS</span>
        </button>
      </div>

      <div ref={boardRef} className="sticker-board">
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1.25rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--ink-muted)',
            pointerEvents: 'none',
          }}
        >
          GRAB ANY BADGE TO REARRANGE THE STACK // SWEET-TAPE INSPIRED
        </div>

        {STICKERS.map((s, i) => (
          <div
            key={s.id}
            className="sticker-chip"
            data-cursor="DRAG"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              backgroundColor: s.bg,
              color: s.fg,
              transform: `rotate(${s.rotate}deg)`,
              zIndex: i + 2,
            }}
          >
            <div className="sticker-label">{s.label}</div>
            <div className="sticker-sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
