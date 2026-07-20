export interface MenuCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'nasi-box',
    title: 'Nasi Box',
    description: 'Nasi box rumahan dengan lauk pilihan, cocok untuk rapat, arisan, hingga acara kantor.',
    image: '/images/menu/nasi-box.svg',
    imageAlt: 'Nasi box Catering Mak Yo dengan lauk lengkap',
  },
  {
    id: 'snack-box',
    title: 'Snack Box',
    description: 'Aneka kudapan dan jajanan pilihan untuk melengkapi acara dan pertemuan Anda.',
    image: '/images/menu/snack-box.svg',
    imageAlt: 'Snack box Catering Mak Yo',
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
    description: 'Tumpeng tradisional untuk syukuran dan perayaan momen istimewa keluarga.',
    image: '/images/menu/tumpeng.svg',
    imageAlt: 'Tumpeng Catering Mak Yo untuk syukuran',
  },
  {
    id: 'aqiqah',
    title: 'Aqiqah',
    description: 'Paket aqiqah lengkap, diolah dengan resep rumahan penuh berkah untuk buah hati.',
    image: '/images/menu/aqiqah.svg',
    imageAlt: 'Paket aqiqah Catering Mak Yo',
  },
  {
    id: 'wedding-catering',
    title: 'Wedding Catering',
    description: 'Katering pernikahan dengan pelayanan penuh perhatian di hari bahagia Anda.',
    image: '/images/menu/wedding.svg',
    imageAlt: 'Katering pernikahan Catering Mak Yo',
  },
  {
    id: 'corporate-catering',
    title: 'Corporate Catering',
    description: 'Kebutuhan katering harian maupun acara korporat, terkirim rapi dan tepat waktu.',
    image: '/images/menu/corporate.svg',
    imageAlt: 'Katering korporat Catering Mak Yo',
  },
  {
    id: 'custom-package',
    title: 'Custom Package',
    description: 'Paket katering yang disesuaikan dengan kebutuhan dan anggaran acara Anda.',
    image: '/images/menu/custom.svg',
    imageAlt: 'Paket katering custom Catering Mak Yo',
  },
];
