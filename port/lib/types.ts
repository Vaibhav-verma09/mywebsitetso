export type ProjectStatus = 'done' | 'proto' | 'wip' | 'idea';
export type ProjectCategory = 'AI/ML' | 'Web' | 'Creative' | 'Research' | 'Mobile' | 'all';
export type MediaKind = 'image' | 'video';
export type EnquiryStatus = 'new' | 'read' | 'completed' | 'spam';

export interface Profile {
  id: string;
  fullName: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  phone: string;
  email: string;
  location: string;
  educationDegree: string;
  educationInstitution: string;
  githubUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  studioName: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'AI/ML' | 'Web' | 'Creative' | 'Research' | 'Mobile';
  status: ProjectStatus;
  description: string;
  nextStep: string;
  tags: string[];
  imageUrl: string;
  liveUrl: string;
  embedUrl?: string;
  githubUrl?: string;
  isFeatured: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SkillCategory {
  category: string;
  iconPath: string;
  skills: string[];
}

export interface SkillItem {
  id: string;
  category: string;
  name: string;
  proficiency?: string;
  isLearning?: boolean;
  sortOrder?: number;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  iconName: string;
  features: string[];
  isActive: boolean;
  sortOrder: number;
}

export interface MediaItem {
  id: string;
  title: string;
  kind: MediaKind;
  category: string;
  url: string;
  storagePath?: string;
  thumbnailUrl?: string;
  isFeatured?: boolean;
  sortOrder?: number;
  createdAt?: string;
}

export interface JourneyMilestone {
  id: string;
  period: string;
  statusType: ProjectStatus;
  title: string;
  organization: string;
  description: string;
  sortOrder: number;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  ipAddress?: string;
}

export interface SiteSettings {
  siteTitle: string;
  metaDescription: string;
  contactEmail: string;
  contactPhone: string;
  githubUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
}
