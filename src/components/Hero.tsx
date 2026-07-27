import { useRef } from 'react';
import { Mail, MessageCircle, Play } from 'lucide-react';
import { PERSONAL } from '../data/content';
import HeroSequence from './HeroSequence';

/** כמה פיקסלים של גלילה נוספת מתנגנים בזמן שההירו נעוץ במקום */
const SCRUB_DISTANCE = 720;

export default function Hero() {
  const trackRef = useRef<HTMLElement>(null);

  return (
    <section id="top" className="hero-track" ref={trackRef}>
      <style>{`
        /* המסלול גבוה מהמסך: ההירו נעוץ בראשו לאורך SCRUB_DISTANCE
           פיקסלים, ורק אחר כך הדף ממשיך לעלות מתחתיו */
        .hero-track { position: relative; height: calc(100svh + ${SCRUB_DISTANCE}px); }
        .hero-pin {
          position: sticky; top: 0;
          height: 100svh;
          display: flex; align-items: center;
          overflow: hidden;
          background: linear-gradient(180deg, var(--cream) 0%, var(--surface-cool) 100%);
        }
        .hero-pin::before {
          content: ""; position: absolute; inset-inline-end: -140px; top: -120px;
          width: 460px; height: 460px; border-radius: 50%;
          background: radial-gradient(circle, rgba(59,125,196,.10), transparent 68%);
          pointer-events: none;
        }
        .hero-pin::after {
          content: ""; position: absolute; inset-inline-start: -120px; bottom: -160px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(232,163,61,.10), transparent 68%);
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          display: flex; flex-direction: column; align-items: center;
          text-align: center;
          gap: clamp(14px, 2.6vw, 24px);
        }
        .hero-name { font-size: clamp(34px, 8vw, 62px); line-height: 1.08; }
        .hero-role {
          font-family: var(--ff-title);
          font-size: clamp(15px, 3.2vw, 20px);
          color: var(--accent-deep);
          margin: 0;
        }
        .hero-cta { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
        .scroll-cue {
          position: absolute; bottom: 22px; left: 50%; transform: translateX(-50%);
          width: 26px; height: 42px; border: 2px solid var(--accent);
          border-radius: 14px; opacity: .4;
        }
        .scroll-cue span {
          position: absolute; top: 8px; left: 50%; margin-inline-start: -2px;
          width: 4px; height: 8px; background: var(--accent);
          border-radius: 2px; animation: cue 1.6s infinite;
        }
        @keyframes cue { 0% { opacity: 1; top: 8px; } 100% { opacity: 0; top: 22px; } }
      `}</style>

      <div className="hero-pin">
        <div className="wrap">
          <div className="hero-inner">
            <div className="reveal">
              <h1 className="hero-name">{PERSONAL.name}</h1>
              <p className="hero-role">{PERSONAL.title}</p>
            </div>

            <HeroSequence trackRef={trackRef} scrubDistance={SCRUB_DISTANCE} />

            <div className="hero-cta reveal">
              <a href={`mailto:${PERSONAL.email}`} className="pill pill-accent">
                <Mail size={16} />
                שלח מייל
              </a>
              <a
                href={PERSONAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-green"
              >
                <MessageCircle size={16} />
                וואטסאפ
              </a>
              <a href="#videos" className="pill pill-ghost">
                <Play size={15} />
                צפייה בתכנים
              </a>
            </div>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
