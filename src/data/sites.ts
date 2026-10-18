/**
 * אתרים שאיתמר בנה, עם קישור חי וצילום מסך.
 * צילומי המסך: public/sites/<id>.webp (960x600, דף הבית במחשב)
 */

export interface Site {
  id: string;
  title: string;
  href: string;
}

export const SITES: Site[] = [
  { id: 'numi', title: 'נומי', href: 'https://numi-box.vercel.app/' },
  { id: 'ein-tova', title: 'עין טובה', href: 'https://ain-tova-hadassah.vercel.app/' },
  { id: 'ein-yael', title: 'עין יעל', href: 'https://e2je.github.io/einyael123/' },
  { id: 'kfar-etzion', title: 'הצבעה כפר עציון', href: 'https://kefar-etzion-vote.vercel.app/' },
  { id: 'summer', title: 'עבודת קיץ', href: 'https://orya-summer.vercel.app/' },
];
