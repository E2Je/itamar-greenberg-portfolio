const base = import.meta.env.BASE_URL;

export const PERSONAL = {
  name: 'איתמר גרינברג',
  title: 'מוביל טרנספורמציה דיגיטלית והטמעות AI',
  subtitle: 'AI can do it',
  email: 'aicandoit5@gmail.com',
  phone: '055-6692412',
  whatsapp: 'https://wa.me/972556692412',
  linkedin: 'https://www.linkedin.com/in/itamar-greenberg',
};

export const PHOTOS = [
  `${base}lectures/lecture1.webp`,
  `${base}lectures/lecture2.webp`,
  `${base}lectures/lecture3.webp`,
  `${base}lectures/lecture4.webp`,
  `${base}lectures/lecture5.webp`,
  `${base}lectures/lecture6.webp`,
  `${base}lectures/lecture7.webp`,
];

export const PLAYLISTS = [
  {
    id: 'pl1',
    title: 'שיעורים והדרכות',
    description: '',
    href: 'https://www.youtube.com/playlist?list=PLRSatIXe2cKhjOwiDldYvXyWQtfv8MdSl',
    gradient: 'from-cyan-500 via-sky-500 to-blue-600',
    accent: '#06b6d4',
    featured: false,
  },
  {
    id: 'pl2',
    title: 'יצירת תוכן וסרטונים',
    description: '',
    href: 'https://www.youtube.com/playlist?list=PLRSatIXe2cKiG1x8MvlVz-kayU-t4BlHl',
    gradient: 'from-violet-500 via-fuchsia-500 to-rose-500',
    accent: '#a855f7',
    featured: false,
  },
  {
    id: 'pl3',
    title: 'תכנים מקהילת AI can do it',
    description: '',
    href: 'https://www.youtube.com/playlist?list=PLRSatIXe2cKgnWb0eUq_M9wl84BzPoo2M',
    gradient: 'from-indigo-500 via-violet-600 to-purple-700',
    accent: '#8b5cf6',
    featured: true,
  },
];

export const RESOURCES = [
  {
    id: 'drive',
    title: 'מאגר תכנים כתובים ומדריכים',
    href: 'https://drive.google.com/drive/u/4/folders/142-EwnppoiEkbfT1k6E0i_l1ps-iqO2p',
    icon: 'file-text',
  },
  {
    id: 'canva',
    title: 'תכנים מקהילת AI CAN DO IT',
    href: 'https://aicandoit.my.canva.site/itamar',
    icon: 'sparkles',
  },
];
