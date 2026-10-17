import type { ReactNode, SVGProps } from 'react';

/**
 * אייקונים בסגנון "קו אחד" של האתר: קו עגול כמו ביד, ומאחוריו כתם צבע מוזז קצת -
 * אותו כתם תכלת מוזז שיש מתחת לכל ציור באתר. הצבע מ-currentColor, כך שהם מתאימים לכל כפתור.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 22, patch, children, ...rest }: IconProps & { patch?: string; children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="line-icon" {...rest}>
      {patch && <path d={patch} fill="currentColor" stroke="none" opacity={0.28} transform="translate(1.8 1.6)" />}
      {children}
    </svg>
  );
}

const ENVELOPE = 'M3.2 6.4 Q3 5 4.6 5 H19.6 Q21 5.1 20.9 6.6 L20.7 17.6 Q20.6 19 19.2 19 H4.6 Q3.1 18.9 3.2 17.4 Z';
export const MailIcon = (p: IconProps) => (
  <Icon patch={ENVELOPE} {...p}>
    <path d={ENVELOPE} />
    <path d="M3.6 6.2 L11.4 12.6 Q12 13.1 12.7 12.5 L20.5 6.1" />
  </Icon>
);

const BUBBLE = 'M4.3 19.8 L5.4 15.9 Q3.9 13.4 4.4 10.4 Q5.4 5.3 10.6 4.4 Q15.9 3.8 18.6 7.6 Q20.9 11.4 18.9 15.4 Q16.4 19.7 11.4 19.6 Q9.6 19.6 8.1 18.8 Z';
export const WhatsAppIcon = (p: IconProps) => (
  <Icon patch={BUBBLE} {...p}>
    <path d={BUBBLE} />
    <path d="M9.2 8.9 Q9 10.9 10.6 12.8 Q12.4 14.8 14.6 15 L15.6 13.9 L13.9 12.9 L13 13.6 Q11.4 12.8 10.6 11.1 L11.3 10.2 L10.4 8.6 Z" />
  </Icon>
);

const RING = 'M12 3.4 Q20.4 3.2 20.6 12 Q20.5 20.7 11.8 20.6 Q3.3 20.4 3.4 11.8 Q3.7 3.8 12 3.4 Z';
export const PlayIcon = (p: IconProps) => (
  <Icon patch={RING} {...p}>
    <path d="M12 3.4 Q20.4 3.2 20.6 12 Q20.5 20.7 11.8 20.6 Q3.3 20.4 3.4 11.8 Q3.7 3.8 12.6 3.5" />
    <path d="M10 8.4 L15.6 12 L10 15.6 Z" />
  </Icon>
);

const SCREEN = 'M3.4 8.2 Q3.6 5.9 5.9 5.7 Q12 5.2 18.2 5.7 Q20.4 5.9 20.6 8.1 Q21 12 20.6 15.9 Q20.4 18.1 18.1 18.3 Q12 18.8 5.8 18.3 Q3.6 18.1 3.4 15.8 Q3 12 3.4 8.2 Z';
export const YouTubeIcon = (p: IconProps) => (
  <Icon patch={SCREEN} {...p}>
    <path d={SCREEN} />
    <path d="M10.2 9.2 L14.8 12 L10.2 14.8 Z" />
  </Icon>
);

const SQUARE = 'M4.6 3.4 H19.4 Q20.7 3.5 20.6 4.8 V19.3 Q20.5 20.6 19.2 20.6 H4.7 Q3.4 20.5 3.4 19.2 V4.7 Q3.5 3.4 4.6 3.4 Z';
export const LinkedInIcon = (p: IconProps) => (
  <Icon patch={SQUARE} {...p}>
    <path d={SQUARE} />
    <path d="M7.6 10.4 V16.8 M7.6 7.4 V7.5 M11 16.8 V10.4 M11 13.2 Q11.6 10.3 14.2 10.4 Q16.6 10.6 16.5 13.3 V16.8" />
  </Icon>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 12.2 Q12 11.6 4.6 12" />
    <path d="M10.4 6.2 L4.4 12 L10.2 17.8" />
  </Icon>
);

export const OpenIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M13.6 4 H20 V10.4 M20 4 L11 13" />
    <path d="M17.6 13.8 V18.6 Q17.5 20 16.1 20 H5.4 Q4 19.9 4 18.5 V7.9 Q4.1 6.5 5.5 6.4 H10.2" />
  </Icon>
);
