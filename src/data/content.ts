const base = import.meta.env.BASE_URL;

export const HERO = {
  name: 'איתמר גרינברג',
  title: 'Digital & AI Implementation Lead',
  subtitle: 'AI can do it',
  tagline: 'בינה מלאכותית וחשיבה יצירתית',
  profilePhoto: `${base}lectures/lecture3.jpg`,
};

export const LINKS = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/itamar-greenberg',
    icon: 'external-link',
  },
  {
    id: 'email',
    label: 'מייל',
    href: 'mailto:aicandoit5@gmail.com',
    icon: 'mail',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/972556692412',
    icon: 'message-circle',
  },
  {
    id: 'canva',
    label: 'קהילת AI can do it',
    href: 'https://aicandoit.my.canva.site/itamar',
    icon: 'users',
  },
  {
    id: 'drive',
    label: 'תוכן כתוב',
    href: 'https://drive.google.com/drive/u/4/folders/142-EwnppoiEkbfT1k6E0i_l1ps-iqO2p',
    icon: 'file-text',
  },
];

export const PHOTOS = [
  `${base}lectures/lecture1.jpg`,
  `${base}lectures/lecture2.jpg`,
  `${base}lectures/lecture3.jpg`,
  `${base}lectures/lecture4.jpg`,
  `${base}lectures/lecture5.jpg`,
  `${base}lectures/lecture6.jpg`,
  `${base}lectures/lecture7.jpg`,
];

export const PLAYLISTS = [
  {
    id: 'pl1',
    title: 'סרטי AI',
    description: 'סרטים על בינה מלאכותית — מה שחייבים לראות',
    href: 'https://www.youtube.com/playlist?list=PLRSatIXe2cKgnWb0eUq_M9wl84BzPoo2M',
    gradient: 'from-indigo-500 via-violet-600 to-purple-700',
    accent: '#8b5cf6',
    count: 'פלייליסט',
    featured: true,
  },
  {
    id: 'pl2',
    title: 'הדרכות ושיעורים',
    description: 'מדריכים מעשיים לעבודה חכמה עם AI',
    href: 'https://www.youtube.com/playlist?list=PLRSatIXe2cKhjOwiDldYvXyWQtfv8MdSl',
    gradient: 'from-cyan-500 via-sky-500 to-blue-600',
    accent: '#06b6d4',
    count: 'פלייליסט',
    featured: false,
  },
  {
    id: 'pl3',
    title: 'תכנים מקהילת AI can do it',
    description: 'יצירתיות, חשיבה ויישום — מהקהילה שלנו',
    href: 'https://www.youtube.com/playlist?list=PLRSatIXe2cKiG1x8MvlVz-kayU-t4BlHl',
    gradient: 'from-violet-500 via-fuchsia-500 to-rose-500',
    accent: '#f43f5e',
    count: 'פלייליסט',
    featured: false,
  },
];
