const base = import.meta.env.BASE_URL;

interface Props {
  id: string;
  title: string;
  /** גובה התצוגה בפיקסלים */
  height: number;
  eager?: boolean;
}

/**
 * מוקאפ הנייד. הקבצים שקופים מסביב למכשיר, ולכן אין כאן שום מסגרת
 * או רקע לבן - הנייד צף ישירות על הכרטיס.
 */
export default function PhoneShot({ id, title, height, eager }: Props) {
  return (
    <img
      className="phone-shot"
      src={`${base}projects/${id}.webp`}
      alt={`מסך מתוך ${title}`}
      width={560}
      height={1155}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={{ height, width: 'auto' }}
    />
  );
}
