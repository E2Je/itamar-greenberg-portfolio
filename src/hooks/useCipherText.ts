import { useState, useEffect } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?';

export function useCipherText(text: string, startDelay = 0) {
  const [display, setDisplay] = useState(() =>
    text.split('').map(c => (c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)])).join('')
  );

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    let iv: ReturnType<typeof setInterval>;
    let frame = 0;
    const total = 38;

    t = setTimeout(() => {
      iv = setInterval(() => {
        frame++;
        setDisplay(
          text.split('').map((char, i) => {
            if (char === ' ') return ' ';
            if (frame > Math.floor((i / text.length) * total * 0.75)) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join('')
        );
        if (frame >= total) { setDisplay(text); clearInterval(iv); }
      }, 42);
    }, startDelay);

    return () => { clearTimeout(t); clearInterval(iv); };
  }, [text, startDelay]);

  return display;
}
