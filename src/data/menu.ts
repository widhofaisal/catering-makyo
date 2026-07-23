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
    image: '/images/menu/pramuka-perkemahan.svg',
    imageAlt: 'Ilustrasi katering untuk kegiatan pramuka dan perkemahan',
  },
  {
    id: 'nasi-box',
    title: 'Nasi Box',
    description: 'Nasi box rumahan dengan lauk pilihan, cocok untuk rapat, arisan, hingga acara kantor.',
    image: '/images/menu/nasi-kotak-gudeg.jpg',
    imageAlt: 'Nasi kotak dengan gudeg, ilustrasi hidangan nasi box',
  },
  {
    id: 'snack-box',
    title: 'Snack Box',
    description: 'Aneka kudapan dan jajanan pilihan untuk melengkapi acara dan pertemuan Anda.',
    image: '/images/menu/snack-kue-lumpur.jpg',
    imageAlt: 'Kue lumpur pandan, ilustrasi kudapan snack box',
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
    image: '/images/menu/tumpeng-nasi-kuning.jpg',
    imageAlt: 'Tumpeng nasi kuning, ilustrasi hidangan tumpeng syukuran',
  },
  {
    id: 'aqiqah',
    title: 'Aqiqah',
    description: 'Paket aqiqah lengkap, diolah dengan resep rumahan penuh berkah untuk buah hati.',
    image: '/images/menu/aqiqah-prasmanan.jpg',
    imageAlt: 'Hidangan rumahan lengkap, ilustrasi paket aqiqah',
  },
  {
    id: 'wedding-catering',
    title: 'Wedding Catering',
    description: 'Dipercaya warga sekitar untuk pernikahan, slametan, dan berbagai hajatan lainnya, penuh perhatian di setiap acara.',
    image: '/images/menu/wedding-chafing.jpg',
    imageAlt: 'Meja prasmanan chafing dish, ilustrasi katering pernikahan',
  },
  {
    id: 'corporate-catering',
    title: 'Corporate Catering',
    description: 'Kebutuhan katering harian maupun acara korporat, terkirim rapi dan tepat waktu.',
    image: '/images/menu/nasi-kotak-korporat.jpg',
    imageAlt: 'Nasi kotak kemasan rapi, ilustrasi katering korporat',
  },
  {
    id: 'custom-package',
    title: 'Custom Package',
    description: 'Paket katering yang disesuaikan dengan kebutuhan dan anggaran acara Anda.',
    image: '/images/menu/custom.svg',
    imageAlt: 'Paket katering custom Catering Mak Yo',
  },
];
