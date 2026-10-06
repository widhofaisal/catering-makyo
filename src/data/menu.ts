export interface MenuCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'pramuka-perkemahan',
    title: 'Katering Pramuka & Perkemahan',
    description: 'Spesialis konsumsi kegiatan kepramukaan sejak awal berdiri — lokasi kami bersebelahan langsung dengan Bumi Perkemahan. Kami antar ke berbagai titik area perkemahan, atau nikmati prasmanan di tempat kami yang bersih dan nyaman.',
    image: '/images/menu/pramuka-perkemahan.webp',
    imageAlt: 'Nasi box dan hidangan katering untuk kegiatan pramuka dan perkemahan',
  },
  {
    id: 'nasi-box',
    title: 'Nasi Box',
    description: 'Nasi box rumahan dengan lauk pilihan, cocok untuk rapat, arisan, hingga acara kantor.',
    image: '/images/menu/nasi-box-gudeg.webp',
    imageAlt: 'Nasi kotak gudeg dengan ayam, telur, dan sambal',
  },
  {
    id: 'snack-box',
    title: 'Snack Box',
    description: 'Aneka kudapan dan jajanan pilihan untuk melengkapi acara dan pertemuan Anda.',
    image: '/images/menu/snack-box.webp',
    imageAlt: 'Kotak kudapan berisi kue lumpur, lemper, dan pastel',
  },
  {
    id: 'prasmanan',
    title: 'Prasmanan',
    description: 'Sajian prasmanan lengkap dengan cita rasa rumahan untuk acara keluarga besar.',
    image: '/images/menu/prasmanan-real.jpg',
    imageAlt: 'Sajian bihun goreng prasmanan Catering Mak Yo, dari galeri Google Maps',
  },
  {
    id: 'tumpeng',
    title: 'Tumpeng',
    description: 'Tumpeng tradisional dengan tampilan dan isi yang bisa disesuaikan permintaan Anda, cocok untuk syukuran dan momen istimewa keluarga.',
    image: '/images/menu/tumpeng.webp',
    imageAlt: 'Tumpeng nasi kuning dengan lauk dan sayuran',
  },
  {
    id: 'aqiqah',
    title: 'Aqiqah',
    description: 'Paket aqiqah lengkap, diolah dengan resep rumahan penuh berkah untuk buah hati.',
    image: '/images/menu/aqiqah-prasmanan.jpg',
    imageAlt: 'Hidangan rumahan untuk acara keluarga',
  },
  {
    id: 'wedding-catering',
    title: 'Katering Pernikahan',
    description: 'Dipercaya warga sekitar untuk pernikahan, slametan, dan berbagai hajatan lainnya, penuh perhatian di setiap acara.',
    image: '/images/menu/wedding-chafing.jpg',
    imageAlt: 'Hidangan prasmanan untuk acara pernikahan',
  },
  {
    id: 'corporate-catering',
    title: 'Katering Kantor',
    description: 'Kebutuhan katering harian maupun acara kantor, disiapkan rapi untuk tim Anda.',
    image: '/images/menu/katering-kantor.webp',
    imageAlt: 'Kotak makan berisi nasi, ayam, sayur, dan sambal untuk katering kantor',
  },
  {
    id: 'custom-package',
    title: 'Paket Sesuai Kebutuhan',
    description: 'Paket katering yang dapat disesuaikan dengan kebutuhan acara Anda.',
    image: '/images/menu/custom-package.webp',
    imageAlt: 'Pilihan hidangan katering untuk paket sesuai kebutuhan',
  },
];
