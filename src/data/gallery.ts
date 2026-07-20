export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const galleryImages: GalleryImage[] = [
  // Real photo from the Google Maps listing (bihun goreng prasmanan tray). The
  // rest are placeholders — swap them the same way as more real photos come in.
  { src: '/images/gallery/gmb-bihun-goreng.jpg', alt: 'Bihun goreng prasmanan Catering Mak Yo, dari galeri Google Maps', width: 900, height: 1600 },
  { src: '/images/gallery/gallery-01.svg', alt: 'Nasi box Catering Mak Yo siap diantar', width: 800, height: 1000 },
  { src: '/images/gallery/gallery-02.svg', alt: 'Prasmanan Catering Mak Yo di acara keluarga', width: 800, height: 600 },
  { src: '/images/gallery/gallery-03.svg', alt: 'Tumpeng syukuran Catering Mak Yo', width: 800, height: 900 },
  { src: '/images/gallery/gallery-04.svg', alt: 'Suasana dapur Catering Mak Yo', width: 800, height: 700 },
  { src: '/images/gallery/gallery-05.svg', alt: 'Paket aqiqah Catering Mak Yo', width: 800, height: 1100 },
  { src: '/images/gallery/gallery-06.svg', alt: 'Katering pernikahan Catering Mak Yo', width: 800, height: 600 },
  { src: '/images/gallery/gallery-07.svg', alt: 'Snack box Catering Mak Yo', width: 800, height: 800 },
  { src: '/images/gallery/gallery-08.svg', alt: 'Meja prasmanan Catering Mak Yo tertata rapi', width: 800, height: 1000 },
  { src: '/images/gallery/gallery-09.svg', alt: 'Detail hidangan rumahan Catering Mak Yo', width: 800, height: 650 },
  { src: '/images/gallery/gallery-10.svg', alt: 'Katering acara korporat Catering Mak Yo', width: 800, height: 950 },
  { src: '/images/gallery/gallery-11.svg', alt: 'Proses penyajian Catering Mak Yo', width: 800, height: 700 },
  { src: '/images/gallery/gallery-12.svg', alt: 'Momen kebersamaan bersama Catering Mak Yo', width: 800, height: 850 },
];
