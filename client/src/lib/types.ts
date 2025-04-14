export interface SpeakerType {
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface GalleryImageType {
  id: number;
  src: string;
  alt: string;
  thumbnail: string;
}

export interface SponsorType {
  name: string;
  logo: string;
}

export interface FaqItemType {
  question: string;
  answer: string;
}

export interface ScheduleItemType {
  time: string;
  title: string;
  description: string;
  location: string;
  icon: string;
  right: boolean;
}

export interface AmenityType {
  name: string;
}
