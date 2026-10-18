import { PLAYLISTS } from '../data/content';
import LineDraw from './LineDraw';

const embedOf = (href: string) =>
  `https://www.youtube-nocookie.com/embed/videoseries?list=${href.split('list=')[1] ?? ''}&rel=0&modestbranding=1`;

/**
 * כמו באתר המקורי: לכל פלייליסט כרטיס עם תצוגה מקדימה של הווידאו, התווית, השם וקישור ל-YouTube.
 * בסגנון האתר: מסגרת מצוירת ביד וכתם תכלת מוזז מאחורי כל וידאו.
 */
export default function Playlists() {
  return (
    <section id="videos" className="sec talks">
      <style>{`
        .talks { background: var(--white); }
        .talks-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px 24px;
                      margin-bottom: clamp(28px, 3.4vw, 44px); }
        .talks-head .sec-head { flex: 1 1 320px; min-width: 0; }
        .talks-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: clamp(28px, 3vw, 40px); grid-template-columns: minmax(0, 1fr); }
        @media (min-width: 700px) { .talks-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 1100px) { .talks-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        .pl-card { display: flex; flex-direction: column; height: 100%; }
        .talks-media { position: relative; margin: 10px 14px 18px 10px; }
        .talks-media::before { content: ''; position: absolute; inset: 0; background: var(--paper-3); transform: translate(12px, 10px); }
        .talks-frame { position: relative; aspect-ratio: 16 / 9; background: var(--paper-2); }
        .talks-frame iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
        .talks-scribble { position: absolute; inset: -12px; width: calc(100% + 24px); height: calc(100% + 24px); pointer-events: none; }
        .pl-body { display: flex; flex-direction: column; gap: 10px; flex: 1; padding-inline: 4px; }
        .pl-kind { font-size: 14px; color: var(--blue-ink); }
        .pl-title { font-size: clamp(19px, 1.7vw, 22px); margin: 0; min-width: 0; }
      `}</style>

      <div className="wrap">
        <div className="talks-head">
          <div className="sec-head reveal">
            <div className="sec-head-text">
              <span className="eyebrow">וידאו</span>
              <h2 data-fit>הדרכות ותכנים</h2>
            </div>
            <LineDraw viewBox="0 0 170 120" label="מסך עם כפתור ניגון" className="sec-draw">
              <path className="lf" d="M12 16 H140 V96 H12 Z" />
              <path className="ld" d="M12 16 H140 V96 H12 Z M50 112 H102 M76 96 V112" />
              <path className="ld" d="M62 38 L96 56 L62 74 Z" stroke="#4A90D9" />
              <path className="ld" d="M150 22 L162 10 M154 40 L168 38" />
            </LineDraw>
          </div>
        </div>

        <ul className="talks-grid stagger">
          {PLAYLISTS.map(p => (
            <li key={p.id}>
              <article className="pl-card">
                <div className="talks-media">
                  <div className="talks-frame">
                    <iframe
                      src={embedOf(p.href)}
                      title={p.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <LineDraw viewBox="0 0 680 410" className="talks-scribble" stretch>
                    <path className="ld" d="M10 14 C180 6 480 10 668 12 C672 140 666 280 670 398 C480 404 200 400 12 402 C8 280 14 140 6 26" />
                  </LineDraw>
                </div>
                <div className="pl-body">
                  <span className="pl-kind">YouTube Playlist</span>
                  <h3 className="pl-title" data-fit>{p.title}</h3>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
