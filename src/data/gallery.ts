export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const galleryImages: GalleryImage[] = [
  // Real photos pulled from the Google Maps listing's public photo gallery
  // (Semua / Menu / Makanan & minuman / Oleh pemilik tabs) are captioned as
  // Catering Mak Yo's own. The illustrative dish photos (credited below) are
  // openly-licensed stock stand-ins for categories without real photos yet —
  // captioned generically so they're never mistaken for the business's own
  // photography. Swap either kind out for real photos as they come in.
  { src: '/images/gallery/gmb-bihun-goreng.jpg', alt: 'Bihun goreng prasmanan Catering Mak Yo, dari galeri Google Maps', width: 900, height: 1600 },
  { src: '/images/gallery/nasi-kotak-gudeg.jpg', alt: 'Nasi kotak dengan gudeg, ilustrasi hidangan nasi box', width: 1600, height: 1200 },
  { src: '/images/gallery/gmb-soto-daging-prasmanan.jpg', alt: 'Soto daging prasmanan Catering Mak Yo dalam mangkuk saji, dari galeri Google Maps', width: 900, height: 1600 },
  { src: '/images/gallery/tumpeng-nasi-kuning.jpg', alt: 'Tumpeng nasi kuning, ilustrasi hidangan tumpeng syukuran', width: 1600, height: 1200 },
  { src: '/images/gallery/gmb-lokasi-mak-yo.jpg', alt: 'Lokasi Catering Mak Yo di Gunungpati, Semarang, dari galeri Google Maps', width: 1171, height: 659 },
  { src: '/images/gallery/aqiqah-prasmanan.jpg', alt: 'Hidangan rumahan lengkap, ilustrasi paket aqiqah', width: 1600, height: 900 },
  { src: '/images/gallery/wedding-chafing.jpg', alt: 'Meja prasmanan chafing dish, ilustrasi katering pernikahan', width: 1024, height: 668 },
  { src: '/images/gallery/snack-kue-lumpur.jpg', alt: 'Kue lumpur pandan, ilustrasi kudapan snack box', width: 1322, height: 1600 },
  { src: '/images/gallery/gmb-buah-snack-prasmanan.jpg', alt: 'Buah dan snack prasmanan Catering Mak Yo, dari galeri Google Maps', width: 720, height: 1280 },
  { src: '/images/gallery/gmb-ayam-kecap.jpg', alt: 'Ayam kecap prasmanan Catering Mak Yo, dari galeri Google Maps', width: 720, height: 1280 },
  { src: '/images/gallery/nasi-kotak-korporat.jpg', alt: 'Nasi kotak kemasan rapi, ilustrasi katering korporat', width: 1600, height: 1034 },
  { src: '/images/gallery/penyajian-soto.jpg', alt: 'Soto ayam yang ditata rapi, ilustrasi penyajian hidangan', width: 1280, height: 1600 },
  { src: '/images/gallery/gallery-12.svg', alt: 'Momen kebersamaan bersama Catering Mak Yo', width: 800, height: 850 },
];
