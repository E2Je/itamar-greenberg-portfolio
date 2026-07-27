import { ExternalLink, PlayCircle, MonitorPlay } from 'lucide-react';
import { PLAYLISTS } from '../data/content';

const YOUTUBE_CHANNEL = 'https://www.youtube.com/@itamargreenberg';

export default function Playlists() {
  return (
    <section id="videos" className="sec">
      <style>{`
        .playlists-grid { display: grid; gap: clamp(16px, 2.4vw, 24px); grid-template-columns: 1fr; }
        @media (min-width: 820px) { .playlists-grid { grid-template-columns: repeat(3, 1fr); } }
        .pl-head {
          display: flex; align-items: flex-end; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
      `}</style>

      <div className="wrap">
        <div className="sec-head pl-head reveal">
          <div>
            <span className="eyebrow">
              <MonitorPlay size={13} style={{ verticalAlign: '-2px', marginInlineEnd: 5 }} />
              וידאו
            </span>
            <h2>הדרכות ותכנים</h2>
            <div className="rule" />
          </div>
          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="pill pill-sm pill-ghost"
          >
            <ExternalLink size={13} />
            ערוץ YouTube
          </a>
        </div>

        <div className="playlists-grid reveal-group">
          {PLAYLISTS.map(p => {
            const playlistId = p.href.split('list=')[1] ?? '';
            const embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1`;

            return (
              <article key={p.id} className="card card-hover" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', paddingBottom: '56.25%', background: '#000' }}>
                  <iframe
                    src={embedUrl}
                    title={p.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                  />
                </div>

                <div
                  style={{
                    padding: '16px 18px 18px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                        color: 'var(--muted)',
                        fontSize: 12,
                        marginBottom: 4,
                      }}
                    >
                      <PlayCircle size={13} />
                      YouTube Playlist
                    </span>
                    <h3 style={{ fontSize: 18.5 }}>{p.title}</h3>
                  </div>

                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill pill-sm pill-ghost"
                    style={{ alignSelf: 'flex-start' }}
                  >
                    <ExternalLink size={12} />
                    פתח בYouTube
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
