/**
 * Single source of truth for business info. Verified against the live Google
 * Maps listing on 2026-07-20 (name, rating, address, phone, hours) — see
 * scripts/scrape-gmb.mjs. Fields the listing didn't expose (review text,
 * extra photos) are intentionally absent rather than invented; testimonials
 * and gallery images are curated placeholders (see testimonials.ts / gallery.ts).
 */

export interface DayHours {
  day: string;
  hours: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: 'recipe' | 'star' | 'clock' | 'leaf' | 'award';
}

export interface WhyChooseUsItem {
  icon: 'recipe' | 'leaf' | 'shield' | 'clock' | 'tag' | 'award';
  title: string;
  description: string;
}

export const company = {
  name: 'Catering Mak Yo',
  listingName: 'Catering Mak Yo Sejak 1970an',
  tagline: 'Masakan Rumahan Sejak Tahun 1970',
  description:
    'Lebih dari lima dekade menghadirkan cita rasa rumahan yang diwariskan dari generasi ke generasi.',
  foundedYear: 1970,
  category: 'Katering',
  cuisine: 'Masakan Indonesia',
  womenOwned: true,

  address: {
    street: 'Karanggeneng RT.02/RW.01',
    village: 'Sumurrejo',
    district: 'Kec. Gunungpati',
    city: 'Kota Semarang',
    province: 'Jawa Tengah',
    postalCode: '50226',
    plusCode: 'V9RW+GC Sumurrejo',
    full: 'Karanggeneng RT.02/RW.01, Sumurrejo, Kec. Gunungpati, Kota Semarang, Jawa Tengah 50226',
  },

  geo: { lat: -7.1087371, lng: 110.3960196 },

  phoneDisplay: '0895-4035-78925',
  phoneE164: '+62895403578925',
  whatsappNumber: '62895403578925',

  hours: [
    { day: 'Senin', hours: '24 Jam' },
    { day: 'Selasa', hours: '24 Jam' },
    { day: 'Rabu', hours: '24 Jam' },
    { day: 'Kamis', hours: '24 Jam' },
    { day: 'Jumat', hours: '24 Jam' },
    { day: 'Sabtu', hours: '24 Jam' },
    { day: 'Minggu', hours: '24 Jam' },
  ] satisfies DayHours[],
  hoursNote: 'Buka 24 jam setiap hari — siap menerima pesanan kapan saja.',

  rating: { value: 5.0, source: 'Google Maps' },

  mapsShareUrl: 'https://maps.app.goo.gl/tT2QgQasdRXPtH4V6',
  mapsEmbedUrl: 'https://www.google.com/maps?q=-7.1087371,110.3960196&z=16&output=embed',

  siteUrl: 'https://cateringmakyo.site',

  // No official social presence exists yet — left empty rather than invented.
  social: {} as { instagram?: string; facebook?: string },
};

/** Builds a wa.me deep link pre-filled with a message. */
export function waLink(message: string): string {
  return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const timeline: TimelineEvent[] = [
  {
    year: '1970',
    title: 'Awal Mula',
    description: 'Mak Yo mulai memasak untuk tetangga dari dapur rumahnya sendiri di Gunungpati.',
    icon: 'recipe',
  },
  {
    year: '1980',
    title: 'Melayani Hajatan',
    description: 'Nama Mak Yo mulai dikenal luas saat dipercaya melayani pernikahan warga sekitar.',
    icon: 'star',
  },
  {
    year: '1995',
    title: 'Merambah Perkantoran',
    description: 'Cita rasa rumahan Mak Yo mulai melayani kebutuhan katering harian perkantoran.',
    icon: 'clock',
  },
  {
    year: '2010',
    title: 'Perluasan Layanan',
    description: 'Usaha terus diteruskan dan diperluas ke layanan aqiqah, tumpeng, dan acara korporat.',
    icon: 'leaf',
  },
  {
    year: 'Hari Ini',
    title: 'Warisan yang Dipercaya',
    description: 'Kini Catering Mak Yo tetap dipercaya menghadirkan masakan rumahan untuk setiap momen keluarga Anda, warisan yang terus dijaga dari generasi ke generasi.',
    icon: 'award',
  },
];

export const whyChooseUs: WhyChooseUsItem[] = [
  {
    icon: 'recipe',
    title: 'Resep Keluarga Asli',
    description: 'Resep warisan Mak Yo, dijaga turun-temurun tanpa mengurangi cita rasa aslinya.',
  },
  {
    icon: 'leaf',
    title: 'Bahan Segar Pilihan',
    description: 'Bahan baku dipilih segar setiap hari untuk menjaga kualitas dan rasa terbaik.',
  },
  {
    icon: 'shield',
    title: 'Dapur Higienis',
    description: 'Proses memasak bersih dan higienis, terjaga dari dapur hingga sampai ke meja Anda.',
  },
  {
    icon: 'clock',
    title: 'Pengiriman Tepat Waktu',
    description: 'Pesanan diantar tepat waktu sehingga acara Anda berjalan lancar tanpa khawatir.',
  },
  {
    icon: 'tag',
    title: 'Harga Terjangkau',
    description: 'Kualitas rasa rumahan premium dengan harga yang tetap bersahabat di kantong.',
  },
  {
    icon: 'award',
    title: 'Dipercaya 50+ Tahun',
    description: 'Lebih dari lima dekade menjadi bagian dari momen spesial keluarga Semarang.',
  },
];
