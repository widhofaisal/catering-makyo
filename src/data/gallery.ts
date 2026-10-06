export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

// Galeri hanya memuat dokumentasi usaha dari foto publik Google Maps.
export const galleryImages: GalleryImage[] = [
  {
    src: '/images/gallery/gmb-bihun-goreng.jpg',
    alt: 'Bihun goreng prasmanan Catering Mak Yo',
    caption: 'Bihun goreng prasmanan',
    width: 900,
    height: 1600,
  },
  {
    src: '/images/gallery/gmb-soto-daging-prasmanan.jpg',
    alt: 'Soto daging prasmanan Catering Mak Yo',
    caption: 'Soto daging prasmanan',
    width: 900,
    height: 1600,
  },
  {
    src: '/images/gallery/gmb-lokasi-mak-yo.jpg',
    alt: 'Lokasi Catering Mak Yo di Gunungpati, Semarang',
    caption: 'Dapur Mak Yo di Gunungpati',
    width: 1171,
    height: 659,
  },
  {
    src: '/images/gallery/gmb-buah-snack-prasmanan.jpg',
    alt: 'Buah dan snack prasmanan Catering Mak Yo',
    caption: 'Buah dan snack prasmanan',
    width: 720,
    height: 1280,
  },
  {
    src: '/images/gallery/gmb-ayam-kecap.jpg',
    alt: 'Ayam kecap prasmanan Catering Mak Yo',
    caption: 'Ayam kecap',
    width: 720,
    height: 1280,
  },
];
