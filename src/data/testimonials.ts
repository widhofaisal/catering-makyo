// Kutipan ulasan tidak disimpan di situs sampai tersedia sumber ulasan yang terverifikasi.
export interface Testimonial {
  name: string;
  rating: number;
  eventType: string;
  quote: string;
  date: string;
}

export const testimonials: Testimonial[] = [];
