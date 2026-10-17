import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode, type CSSProperties } from 'react';

type Props = { viewBox: string; label?: string; className?: string; stroke?: string; stretch?: boolean; children: ReactNode };
type Drawable = ReactElement<{ className?: string; style?: CSSProperties; pathLength?: number }>;

/**
 * איור קטן בסגנון "קו אחד" שמצטייר כשהוא נכנס למסך.
 * בלי JS משלו: useReveal מוסיף .in, וה-CSS ב-index.css מצייר (stroke-dashoffset על pathLength=1).
 * בתוך children: className="ld" לקו שמצטייר (לפי הסדר), className="lf" לכתם תכלת שנכנס מוזז אחריו.
 */
export default function LineDraw({ viewBox, label, className, stroke = '#2F6FB5', stretch = false, children }: Props) {
  let order = 0;
  const kids = Children.map(children, child => {
    if (!isValidElement(child)) return child;
    const el = child as Drawable;
    const cls = el.props.className ?? '';
    if (!/\b(ld|lf)\b/.test(cls)) return el;
    const i = /\bld\b/.test(cls) ? order++ : Math.max(order - 1, 0);
    return cloneElement(el, {
      style: { ...el.props.style, ['--i' as string]: i },
      ...(/\bld\b/.test(cls) ? { pathLength: 1 } : {}),
    });
  });

  return (
    <svg viewBox={viewBox} preserveAspectRatio={stretch ? 'none' : undefined} className={`ldraw${className ? ` ${className}` : ''}`} role={label ? 'img' : undefined}
         aria-label={label} aria-hidden={label ? undefined : true}
         fill="none" stroke={stroke} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round">
      {kids}
    </svg>
  );
}
