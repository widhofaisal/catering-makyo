/**
 * PLACEHOLDER CONTENT — replace with real Google review quotes.
 * The live Google Maps listing (5.0 rating) doesn't expose written reviews
 * without a logged-in session, so these are illustrative quotes matching the
 * real event types Catering Mak Yo serves. Swap in genuine reviews here once
 * customers leave them, or paste them in manually.
 */

export interface Testimonial {
  name: string;
  rating: number;
  eventType: string;
  quote: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Dewi Anggraini',
    rating: 5,
    eventType: 'Pernikahan',
    quote:
      'Masakannya benar-benar terasa seperti buatan rumah sendiri. Tamu pernikahan kami banyak yang nanya siapa yang masak, enak sekali!',
    date: '2 bulan lalu',
  },
  {
    name: 'Budi Santoso',
    rating: 5,
    eventType: 'Aqiqah',
    quote:
      'Pelayanannya ramah dan tepat waktu. Paket aqiqahnya lengkap dan rasanya juara, keluarga besar puas semua.',
    date: '3 bulan lalu',
  },
  {
    name: 'Sri Rahayu',
    rating: 5,
    eventType: 'Katering Kantor',
    quote:
      'Sudah langganan nasi box untuk rapat kantor bertahun-tahun. Konsisten enak dan selalu datang tepat waktu.',
    date: '1 bulan lalu',
  },
  {
    name: 'Agus Wijaya',
    rating: 5,
    eventType: 'Syukuran Tumpeng',
    quote:
      'Tumpengnya cantik dan rasanya autentik banget. Terasa hangat, seperti masakan keluarga.',
    date: '4 bulan lalu',
  },
  {
    name: 'Nurul Hidayah',
    rating: 5,
    eventType: 'Prasmanan Keluarga',
    quote:
      'Sudah lebih dari 50 tahun berdiri dan rasanya masih setia dengan resep aslinya. Recommended untuk acara keluarga besar.',
    date: '5 bulan lalu',
  },
  {
    name: 'Hendra Kusuma',
    rating: 5,
    eventType: 'Acara Korporat',
    quote:
      'Profesional, bersih, dan harganya masuk akal. Jadi andalan kami untuk acara kantor rutin.',
    date: '6 bulan lalu',
  },
];
