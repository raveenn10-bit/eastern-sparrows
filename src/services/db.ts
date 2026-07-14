// LocalStorage Mock Database Service

export interface Booking {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  location: string;
  propertyType: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  estimatedPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ContactRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  category: 'cleaning' | 'pest';
  sector: 'residential' | 'commercial';
  beforeUrl: string;
  afterUrl: string;
  titleEn: string;
  titleAr: string;
}

export interface Testimonial {
  id: string;
  nameEn: string;
  nameAr: string;
  rating: number;
  textEn: string;
  textAr: string;
  platform: 'google' | 'facebook' | 'video';
  videoUrl?: string;
  avatarUrl: string;
}

// Seed Data
const initialGalleryItems: GalleryItem[] = [
  {
    id: 'g1',
    category: 'cleaning',
    sector: 'residential',
    beforeUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop', // Dirty tiles
    afterUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=600&auto=format&fit=crop', // Clean polished floor
    titleEn: 'Living Room Tile Deep Clean',
    titleAr: 'تنظيف وتلميع بلاط الصالة'
  },
  {
    id: 'g2',
    category: 'cleaning',
    sector: 'commercial',
    beforeUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop', // Messy office kitchen
    afterUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=600&auto=format&fit=crop', // Clean office kitchen
    titleEn: 'Corporate Kitchen Degreasing',
    titleAr: 'إزالة دهون مطبخ الشركة'
  },
  {
    id: 'g3',
    category: 'cleaning',
    sector: 'residential',
    beforeUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop', // Dusty stained sofa
    afterUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=600&auto=format&fit=crop', // Bright clean sofa
    titleEn: 'Upholstery Stain Removal',
    titleAr: 'إزالة بقع كنب مجالس'
  },
  {
    id: 'g4',
    category: 'pest',
    sector: 'residential',
    beforeUrl: 'https://images.unsplash.com/photo-1587582423116-ec07297f029e?q=80&w=600&auto=format&fit=crop', // Cluttered storage
    afterUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop', // Clean storage room
    titleEn: 'Villa Storage Pest Treatment',
    titleAr: 'معالجة حشرات مخزن الفيلا'
  },
  {
    id: 'g5',
    category: 'pest',
    sector: 'commercial',
    beforeUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop', // Restaurant backyard entry
    afterUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=600&auto=format&fit=crop', // Clean restaurant yard
    titleEn: 'Restaurant Rodent Control',
    titleAr: 'مكافحة قوارض بمطعم'
  },
  {
    id: 'g6',
    category: 'cleaning',
    sector: 'residential',
    beforeUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=600&auto=format&fit=crop', // Dirty bathroom
    afterUrl: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=600&auto=format&fit=crop', // Sanitized white bathroom
    titleEn: 'Bathroom Scale Descaling',
    titleAr: 'إزالة ترسبات حمام وتطهيره'
  }
];

const initialTestimonials: Testimonial[] = [
  {
    id: 't1',
    nameEn: 'Mohammed Al-Thani',
    nameAr: 'محمد آل ثاني',
    rating: 5,
    textEn: 'Outstanding deep cleaning service for my villa in Al Rayyan. The team arrived on time, wore uniforms, and left the house sparkling clean. Highly recommended!',
    textAr: 'خدمة تنظيف عميق ممتازة لفلتي في الريان. وصل الفريق في الموعد المحدد، يرتدون الزي الرسمي، وتركوا المنزل يلمع. أنصح بهم بشدة!',
    platform: 'google',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 't2',
    nameEn: 'Sarah Jenkins',
    nameAr: 'سارة جينكينز',
    rating: 5,
    textEn: 'Had a terrible bed bug issue in our apartment. Eastern Sparrows did a two-phase odorless treatment. The bugs are completely gone, and their rate was very affordable compared to others.',
    textAr: 'عانينا من مشكلة بق فراش مزعجة في شقتنا. قام فريق إيستن سفاروس بعلاج من مرحلتين بدون رائحة. اختفت الحشرات تماماً، وكان سعرهم مناسباً جداً مقارنة بالآخرين.',
    platform: 'facebook',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 't3',
    nameEn: 'Ahmed Al-Kuwari',
    nameAr: 'أحمد الكواري',
    rating: 5,
    textEn: 'I use their hourly cleaning service (25 QR/hr) every week for my office in Lusail. Reliable, honest, and very thorough. Professional company.',
    textAr: 'أستخدم خدمة التنظيف بالساعة (25 ر.ق/ساعة) أسبوعياً لمكتبي في لوسيل. موثوقية وأمانة ودقة متناهية. شركة محترفة.',
    platform: 'google',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop'
  }
];

export const dbService = {
  // Initialize Database
  init() {
    if (typeof window === 'undefined') return;
    
    if (!localStorage.getItem('es_gallery')) {
      localStorage.setItem('es_gallery', JSON.stringify(initialGalleryItems));
    }
    if (!localStorage.getItem('es_testimonials')) {
      localStorage.setItem('es_testimonials', JSON.stringify(initialTestimonials));
    }
    if (!localStorage.getItem('es_bookings')) {
      localStorage.setItem('es_bookings', JSON.stringify([]));
    }
    if (!localStorage.getItem('es_contacts')) {
      localStorage.setItem('es_contacts', JSON.stringify([]));
    }
  },

  // Bookings CRUD
  getBookings(): Booking[] {
    if (typeof window === 'undefined') return [];
    this.init();
    return JSON.parse(localStorage.getItem('es_bookings') || '[]');
  },

  addBooking(booking: Omit<Booking, 'id' | 'status' | 'createdAt'>): Booking {
    this.init();
    const bookings = this.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: 'b_' + Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem('es_bookings', JSON.stringify(bookings));
    return newBooking;
  },

  // Contact requests
  addContactRequest(req: Omit<ContactRequest, 'id' | 'createdAt'>): ContactRequest {
    this.init();
    const contacts = JSON.parse(localStorage.getItem('es_contacts') || '[]');
    const newContact: ContactRequest = {
      ...req,
      id: 'c_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    contacts.push(newContact);
    localStorage.setItem('es_contacts', JSON.stringify(contacts));
    return newContact;
  },

  // Testimonials
  getTestimonials(): Testimonial[] {
    if (typeof window === 'undefined') return initialTestimonials;
    this.init();
    return JSON.parse(localStorage.getItem('es_testimonials') || '[]');
  },

  // Gallery
  getGallery(): GalleryItem[] {
    if (typeof window === 'undefined') return initialGalleryItems;
    this.init();
    return JSON.parse(localStorage.getItem('es_gallery') || '[]');
  }
};
