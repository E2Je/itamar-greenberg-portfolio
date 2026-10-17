import { OpenIcon, YouTubeIcon } from './LineIcons';
import { PLAYLISTS } from '../data/content';
import LineDraw from './LineDraw';

const YOUTUBE_CHANNEL = 'https://www.youtube.com/@itamargreenberg';

const embedOf = (href: string) =>
  `https://www.youtube-nocookie.com/embed/videoseries?list=${href.split('list=')[1] ?? ''}&rel=0&modestbranding=1`;

/**
 * כמו "SUBSTANCE AND ENERGY AREN'T OPPOSITES" אצל J Scott: כותרת בצד אחד, וידאו גדול בצד השני.
 * כאן: רשימת שלושת הפלייליסטים, והראשון מתנגן גדול.
 */
export default function Playlists() {
  return (
    <section id="videos" className="sec talks">
      <style>{`
        .talks { background: var(--white); }
        .talks-grid { display: grid; gap: clamp(28px, 4vw, 56px); align-items: center; grid-template-columns: minmax(0, 1fr); }
        @media (min-width: 960px) { .talks-grid { grid-template-columns: minmax(0, .8fr) minmax(0, 1.4fr); } }
        .talks-list { list-style: none; margin: clamp(20px, 2.4vw, 28px) 0; padding: 0; display: grid; gap: 10px; }
        .talks-list a { display: flex; align-items: center; justify-content: space-between; gap: 12px;
                        background: var(--paper-1); padding: 16px 20px; font-family: var(--ff-title); font-size: 19px; color: var(--ink);
                        transition: background-color .2s, transform .16s var(--ease-out); }
        .talks-list a:active { transform: scale(.98); }
        .pl-text { display: grid; min-width: 0; flex: 1; }
        .pl-kind { font-family: var(--ff-body); font-size: 13px; color: var(--blue-deep); }
        .pl-title { min-width: 0; }
        .pl-open { display: inline-flex; align-items: center; gap: 6px; flex: none; font-size: 14px; color: var(--blue-deep); }
        @media (hover: hover) and (pointer: fine) { .talks-list a:hover { background: var(--paper-4); } }
        .talks-media { position: relative; margin: 14px 18px 22px 14px; }
        .talks-media::before { content: ''; position: absolute; inset: 0; background: var(--paper-3); transform: translate(16px, 14px); }
        .talks-frame { position: relative; aspect-ratio: 16 / 9; background: var(--paper-2); }
        .talks-scribble { position: absolute; inset: -16px; width: calc(100% + 32px); height: calc(100% + 32px); pointer-events: none; }
        .talks-frame iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
      `}</style>

      <div className="wrap">
        <div className="talks-grid">
          <div className="stagger">
            <div className="sec-head sec-head-stack">
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
            <ul className="talks-list">
              {PLAYLISTS.map(p => (
                <li key={p.id}>
                  <a href={p.href} target="_blank" rel="noopener noreferrer">
                    <span className="pl-text">
                      <span className="pl-kind">YouTube Playlist</span>
                      <span className="pl-title" data-fit>{p.title}</span>
                    </span>
                    <span className="pl-open"><OpenIcon size={18} />פתח בYouTube</span>
                  </a>
                </li>
              ))}
            </ul>
            <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="lbtn"><YouTubeIcon />ערוץ YouTube</a>
          </div>
          <div className="talks-media reveal">
          <div className="talks-frame">
            <iframe
              src={embedOf(PLAYLISTS[0].href)}
              title={PLAYLISTS[0].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <LineDraw viewBox="0 0 680 410" className="talks-scribble" stretch>
            <path className="ld" d="M10 14 C180 6 480 10 668 12 C672 140 666 280 670 398 C480 404 200 400 12 402 C8 280 14 140 6 26" />
          </LineDraw>
          </div>
        </div>
      </div>
    </section>
  );
}
