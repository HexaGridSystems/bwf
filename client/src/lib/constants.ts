import { SpeakerType, GalleryImageType, SponsorType, FaqItemType, ScheduleItemType, AmenityType } from "./types";

export const EVENT_DATE = "May 15, 2025 09:00:00";
export const EVENT_LOCATION = "The Grand Pavilion, Bengaluru";
export const EVENT_ADDRESS = "123 Wedding Boulevard, Whitefield, Bengaluru 560066";

export const SPEAKERS: SpeakerType[] = [
  {
    name: 'Priya Sharma',
    role: 'Celebrity Wedding Planner',
    description: 'With over 15 years of experience planning luxury weddings for celebrities and high-profile clients across India.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Rajiv Menon',
    role: 'Award-Winning Photographer',
    description: 'Internationally recognized for his unique approach to capturing wedding moments with artistic flair.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Ananya Desai',
    role: 'Decor Specialist',
    description: 'Known for creating breathtaking wedding venues through innovative decor and thematic designs.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Vikram Malhotra',
    role: 'Luxury Venue Director',
    description: 'Managing partner of The Grand Pavilion, specializing in high-end wedding experiences.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Meera Kapoor',
    role: 'Bridal Fashion Expert',
    description: 'Fashion designer specializing in contemporary bridal wear that blends tradition with modernity.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Arjun Nair',
    role: 'Culinary Director',
    description: 'Master chef creating innovative wedding menus that blend international techniques with local flavors.',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  }
];

export const GALLERY_IMAGES: GalleryImageType[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Wedding professionals networking',
    thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Panel discussion from previous event',
    thumbnail: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Wedding decor showcase',
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Workshop session in progress',
    thumbnail: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Networking cocktail hour',
    thumbnail: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Wedding photography techniques demonstration',
    thumbnail: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Venue decoration showcase',
    thumbnail: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Award ceremony from previous event',
    thumbnail: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
  }
];

export const SPONSORS: SponsorType[] = [
  { name: 'Luxury Venues', logo: 'https://via.placeholder.com/180x90?text=Luxury+Venues' },
  { name: 'Elegant Decor', logo: 'https://via.placeholder.com/180x90?text=Elegant+Decor' },
  { name: 'Bridal Fashions', logo: 'https://via.placeholder.com/180x90?text=Bridal+Fashions' },
  { name: 'Camera Pro', logo: 'https://via.placeholder.com/180x90?text=Camera+Pro' },
  { name: 'Wedding Magazine', logo: 'https://via.placeholder.com/180x90?text=Wedding+Magazine' },
  { name: 'Catering Delights', logo: 'https://via.placeholder.com/180x90?text=Catering+Delights' },
  { name: 'Event Technology', logo: 'https://via.placeholder.com/180x90?text=Event+Technology' },
  { name: 'Travel Partners', logo: 'https://via.placeholder.com/180x90?text=Travel+Partners' }
];

export const FAQ_ITEMS: FaqItemType[] = [
  {
    question: 'Who can attend this event?',
    answer: 'This event is open to all wedding industry professionals including photographers, planners, decorators, caterers, venue managers, bridal fashion designers, and anyone working in the wedding ecosystem in Bengaluru.'
  },
  {
    question: 'What is included in the registration fee?',
    answer: 'The registration fee includes access to all sessions, workshops, and panel discussions. It also covers breakfast, lunch, coffee breaks, and the networking cocktail hour. Additionally, attendees will receive a welcome kit with event materials.'
  },
  {
    question: 'Is there a dress code for the event?',
    answer: 'We recommend business casual attire for the daytime sessions. For the evening networking cocktail, smart business attire is appropriate. Comfortable shoes are recommended as there will be opportunities to move around and network throughout the venue.'
  },
  {
    question: 'Can I get a refund if I can\'t attend?',
    answer: 'Refunds are available up to 14 days before the event with a 15% processing fee. Within 14 days of the event, we cannot offer refunds but you may transfer your registration to another professional. Please contact us to arrange a transfer.'
  },
  {
    question: 'Is parking available at the venue?',
    answer: 'Yes, complimentary parking is available at The Grand Pavilion. There are 200 parking spots available on a first-come, first-served basis. We also recommend carpooling or using ride-sharing services as the event is expected to reach full capacity.'
  },
  {
    question: 'Will there be opportunities to promote my business?',
    answer: 'Absolutely! There will be a dedicated networking area where you can display business cards and brochures. For more formal exhibition opportunities, please check our sponsorship packages which include booth space and presentation opportunities.'
  }
];

export const SCHEDULE_ITEMS: ScheduleItemType[] = [
  {
    time: '9:00 AM - 10:00 AM',
    title: 'Registration & Breakfast',
    description: 'Welcome coffee, tea, and light breakfast while networking with attendees',
    location: 'Main Hall',
    icon: 'fa-user-check',
    right: true
  },
  {
    time: '10:00 AM - 11:30 AM',
    title: 'Keynote: "Future of Wedding Industry"',
    description: 'Presented by Priya Sharma, Award-winning Wedding Planner',
    location: 'Auditorium',
    icon: 'fa-microphone',
    right: false
  },
  {
    time: '11:45 AM - 1:00 PM',
    title: 'Panel Discussion: "Collaboration in Wedding Industry"',
    description: 'Featuring top photographers, planners, and venue managers',
    location: 'Conference Room A',
    icon: 'fa-users',
    right: true
  },
  {
    time: '1:00 PM - 2:00 PM',
    title: 'Networking Lunch',
    description: 'Gourmet lunch with opportunity to connect with fellow professionals',
    location: 'Garden Area',
    icon: 'fa-utensils',
    right: false
  },
  {
    time: '2:15 PM - 3:45 PM',
    title: 'Workshop: "Creative Wedding Photography"',
    description: 'Hands-on session with renowned photographer Rajiv Menon',
    location: 'Studio Room',
    icon: 'fa-camera',
    right: true
  },
  {
    time: '4:00 PM - 5:30 PM',
    title: 'Closing Ceremony & Cocktail Networking',
    description: 'Awards presentation followed by cocktails and networking',
    location: 'Grand Hall',
    icon: 'fa-glass-cheers',
    right: false
  }
];

export const VENUE_AMENITIES: AmenityType[] = [
  { name: 'Free Wi-Fi' },
  { name: 'Complimentary Parking' },
  { name: 'AV Equipment' },
  { name: 'Catering Services' },
  { name: 'Outdoor Garden' },
  { name: 'Wheelchair Accessible' }
];
