import { useEffect, useRef } from 'react';
import type { Project } from '../data/projects';
import PhoneShot from './PhoneShot';

interface Props {
  project: Project;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // נעילת גלילת הרקע + החזרת הפוקוס לכרטיס שנפתח ממנו
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    document.body.classList.add('modal-open');
    closeRef.current?.focus();

    return () => {
      document.body.classList.remove('modal-open');
      opener?.focus?.();
    };
  }, []);

  // Esc סוגר, Tab נלכד בתוך המודאל
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !boxRef.current) return;

      const items = [...boxRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        el => el.offsetParent !== null,
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="pm-title">
      <div className="modal-backdrop" onClick={onClose} />

      <div className="modal-box" ref={boxRef}>
        <style>{`
          .pm-grid {
            display: grid; grid-template-columns: 1fr;
            gap: clamp(18px, 3vw, 30px); align-items: center;
            padding: clamp(24px, 4vw, 34px);
          }
          .pm-stage {
            display: flex; justify-content: center;
            border-radius: var(--radius-sm);
            padding: 22px 0;
          }
          .pm-stage .phone-shot { filter: drop-shadow(0 18px 34px rgba(34,56,78,.24)); }
          @media (min-width: 720px) {
            .pm-grid { grid-template-columns: auto 1fr; }
          }
        `}</style>

        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="סגירה">
          ×
        </button>

        <div className="pm-grid">
          <div
            className="pm-stage"
            style={{ background: `linear-gradient(180deg, ${project.accent}1A, ${project.accent}05)` }}
          >
            <PhoneShot id={project.id} title={project.title} height={430} eager />
          </div>

          <div>
            <h3 id="pm-title" style={{ fontSize: 'clamp(20px,4.5vw,26px)', marginBottom: 12 }}>
              {project.title}
            </h3>

            <p style={{ fontSize: 16.5, lineHeight: 1.85, marginBottom: 0 }}>
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
