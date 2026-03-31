import { useEffect, useState } from 'react';
import { HERO } from '../data/content';

function useTyping(text: string, speed = 42, startDelay = 500) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(''); setDone(false);
    const t = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

export default function Hero() {
  const { displayed, done } = useTyping(HERO.title, 42, 600);
  const [showSub, setShowSub] = useState(false);
  useEffect(() => { if (done) setTimeout(() => setShowSub(true), 150); }, [done]);

  return (
    <section
      style={{
        position: 'relative', zIndex: 1,
        minHeight: '100svh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '7rem 1.5rem 4rem',
        textAlign: 'center',
      }}
    >
      {/* Profile photo */}
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <div
          className="pulse-ring"
          style={{
            width: 140, height: 140,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid white',
          }}
        >
          <img
            src={HERO.profilePhoto}
            alt={HERO.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          />
        </div>
        <div
          style={{
            position: 'absolute', bottom: -4, left: -6,
            background: 'linear-gradient(135deg,#6366f1,#06b6d4)',
            borderRadius: 999, padding: '3px 10px',
            color: 'white', fontSize: '0.65rem', fontWeight: 800,
            letterSpacing: 0.3,
          }}
        >
          AI ✦
        </div>
      </div>

      {/* Name */}
      <p style={{ color: '#9ca3af', fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
        {HERO.name}
      </p>

      {/* Typed title */}
      <h1
        className="gradient-text"
        style={{
          fontSize: 'clamp(1.7rem, 5.5vw, 3rem)',
          fontWeight: 900,
          lineHeight: 1.2,
          marginBottom: '0.6rem',
          minHeight: '1.3em',
        }}
      >
        {displayed}
        {!done && <span style={{ WebkitTextFillColor: '#6366f1' }} className="cursor-blink">|</span>}
      </h1>

      {/* Subtitle */}
      <div style={{
        opacity: showSub ? 1 : 0,
        transform: showSub ? 'translateY(0)' : 'translateY(14px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}>
        <p style={{ fontSize: 'clamp(1.3rem,3.5vw,1.8rem)', fontWeight: 800, color: '#4f46e5', marginBottom: '0.3rem' }}>
          {HERO.subtitle}
        </p>
        <p style={{ color: '#6b7280', fontWeight: 500, fontSize: '1rem' }}>
          {HERO.tagline}
        </p>
      </div>

      {/* Scroll cue */}
      <div style={{
        marginTop: '3rem',
        opacity: showSub ? 1 : 0,
        transition: 'opacity 0.6s ease 0.6s',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      }}>
        <span style={{ color: '#9ca3af', fontSize: '0.75rem', fontWeight: 500 }}>גללו למטה</span>
        <div style={{
          width: 1.5, height: 36,
          background: 'linear-gradient(to bottom, #6366f1, transparent)',
          borderRadius: 999,
          animation: 'fadeUp 1.5s ease-in-out infinite alternate',
        }} />
      </div>
    </section>
  );
}
