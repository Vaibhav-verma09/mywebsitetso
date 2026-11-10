import fs from 'fs';
import path from 'path';
import { getServerSupabase } from './supabaseServer';
import {
  Profile,
  Project,
  SkillCategory,
  Service,
  MediaItem,
  JourneyMilestone,
  ContactEnquiry,
  SiteSettings,
  EnquiryStatus
} from './types';
import {
  INITIAL_PROFILE,
  INITIAL_PROJECTS,
  INITIAL_SKILLS,
  INITIAL_SERVICES,
  INITIAL_MEDIA,
  INITIAL_JOURNEY,
  INITIAL_SETTINGS
} from './data';

interface DatabaseStore {
  profile: Profile;
  projects: Project[];
  skills: SkillCategory[];
  services: Service[];
  media: MediaItem[];
  journey: JourneyMilestone[];
  enquiries: ContactEnquiry[];
  settings: SiteSettings;
  adminPasswordHash?: string;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

function ensureLocalStore(): DatabaseStore {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch {
      // ignore
    }
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    } catch {
      // fallback to initial
    }
  }

  const initialStore: DatabaseStore = {
    profile: INITIAL_PROFILE,
    projects: INITIAL_PROJECTS,
    skills: INITIAL_SKILLS,
    services: INITIAL_SERVICES,
    media: INITIAL_MEDIA,
    journey: INITIAL_JOURNEY,
    enquiries: [
      {
        id: 'enq-sample-1',
        name: 'Tech Recruiter',
        email: 'recruiting@innovatetech.io',
        subject: 'Machine Learning & Full-Stack Engineering Role',
        message: 'Hi Vaibhav, reviewed your Smart Vehicle ML app and IMAGIX Studio. We would love to interview you for our upcoming engineering internship.',
        status: 'read',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      }
    ],
    settings: INITIAL_SETTINGS,
    adminPasswordHash: process.env.ADMIN_PASSWORD || 'admin12345!'
  };

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialStore, null, 2), 'utf-8');
  } catch {
    // fallback
  }

  return initialStore;
}

function saveLocalStore(store: DatabaseStore) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write to local DB file:', err);
  }
}

// -------------------------------------------------------------
// PROFILE
// -------------------------------------------------------------
export async function getProfile(): Promise<Profile> {
  const sb = getServerSupabase();
  if (sb) {
    const { data, error } = await sb.from('profiles').select('*').limit(1).single();
    if (!error && data) {
      return {
        id: data.id,
        fullName: data.full_name,
        headline: data.headline,
        bio: data.bio,
        avatarUrl: data.avatar_url || '',
        phone: data.phone || '',
        email: data.email,
        location: data.location || '',
        educationDegree: data.education_degree || '',
        educationInstitution: data.education_institution || '',
        githubUrl: data.github_url || '',
        linkedinUrl: data.linkedin_url || '',
        youtubeUrl: data.youtube_url || '',
        studioName: data.studio_name || 'TSO Groups'
      };
    }
  }
  const store = ensureLocalStore();
  return store.profile;
}

export async function updateProfile(updates: Partial<Profile>): Promise<Profile> {
  const sb = getServerSupabase();
  if (sb) {
    const mapped: Record<string, unknown> = {};
    if (updates.fullName !== undefined) mapped.full_name = updates.fullName;
    if (updates.headline !== undefined) mapped.headline = updates.headline;
    if (updates.bio !== undefined) mapped.bio = updates.bio;
    if (updates.avatarUrl !== undefined) mapped.avatar_url = updates.avatarUrl;
    if (updates.phone !== undefined) mapped.phone = updates.phone;
    if (updates.email !== undefined) mapped.email = updates.email;
    if (updates.location !== undefined) mapped.location = updates.location;
    if (updates.educationDegree !== undefined) mapped.education_degree = updates.educationDegree;
    if (updates.educationInstitution !== undefined) mapped.education_institution = updates.educationInstitution;
    if (updates.githubUrl !== undefined) mapped.github_url = updates.githubUrl;
    if (updates.linkedinUrl !== undefined) mapped.linkedin_url = updates.linkedinUrl;
    if (updates.youtubeUrl !== undefined) mapped.youtube_url = updates.youtubeUrl;
    if (updates.studioName !== undefined) mapped.studio_name = updates.studioName;
    mapped.updated_at = new Date().toISOString();

    const { data } = await sb.from('profiles').update(mapped).select().single();
    if (data) {
      return {
        id: data.id,
        fullName: data.full_name,
        headline: data.headline,
        bio: data.bio,
        avatarUrl: data.avatar_url,
        phone: data.phone,
        email: data.email,
        location: data.location,
        educationDegree: data.education_degree,
        educationInstitution: data.education_institution,
        githubUrl: data.github_url,
        linkedinUrl: data.linkedin_url,
        youtubeUrl: data.youtube_url,
        studioName: data.studio_name
      };
    }
  }

  const store = ensureLocalStore();
  store.profile = { ...store.profile, ...updates };
  saveLocalStore(store);
  return store.profile;
}

// -------------------------------------------------------------
// PROJECTS
// -------------------------------------------------------------
export async function getProjects(): Promise<Project[]> {
  const sb = getServerSupabase();
  if (sb) {
    const { data, error } = await sb.from('projects').select('*').order('sort_order', { ascending: true });
    if (!error && data && data.length > 0) {
      return data.map((d) => ({
        id: d.id,
        title: d.title,
        slug: d.slug || d.id,
        category: d.category,
        status: d.status,
        description: d.description,
        nextStep: d.next_step || '',
        tags: d.tags || [],
        imageUrl: d.image_url || '',
        liveUrl: d.live_url || '',
        embedUrl: d.embed_url || d.live_url || '',
        githubUrl: d.github_url || '',
        isFeatured: d.is_featured || false,
        sortOrder: d.sort_order || 0,
        createdAt: d.created_at,
        updatedAt: d.updated_at
      }));
    }
  }

  const store = ensureLocalStore();
  return store.projects;
}

export async function createProject(project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
  const sb = getServerSupabase();
  const newId = 'proj-' + Date.now();
  const createdAt = new Date().toISOString();

  if (sb) {
    const { data, error } = await sb.from('projects').insert({
      title: project.title,
      slug: project.slug || project.title.toLowerCase().replace(/[^\w-]+/g, '-'),
      category: project.category,
      status: project.status,
      description: project.description,
      next_step: project.nextStep,
      tags: project.tags,
      image_url: project.imageUrl,
      live_url: project.liveUrl,
      embed_url: project.embedUrl || project.liveUrl,
      github_url: project.githubUrl,
      is_featured: project.isFeatured,
      sort_order: project.sortOrder
    }).select().single();

    if (!error && data) {
      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        category: data.category,
        status: data.status,
        description: data.description,
        nextStep: data.next_step,
        tags: data.tags,
        imageUrl: data.image_url,
        liveUrl: data.live_url,
        embedUrl: data.embed_url,
        githubUrl: data.github_url,
        isFeatured: data.is_featured,
        sortOrder: data.sort_order,
        createdAt: data.created_at
      };
    }
  }

  const store = ensureLocalStore();
  const created: Project = {
    ...project,
    id: newId,
    createdAt
  };
  store.projects.push(created);
  saveLocalStore(store);
  return created;
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  const sb = getServerSupabase();
  if (sb) {
    const mapped: Record<string, unknown> = {};
    if (updates.title !== undefined) mapped.title = updates.title;
    if (updates.category !== undefined) mapped.category = updates.category;
    if (updates.status !== undefined) mapped.status = updates.status;
    if (updates.description !== undefined) mapped.description = updates.description;
    if (updates.nextStep !== undefined) mapped.next_step = updates.nextStep;
    if (updates.tags !== undefined) mapped.tags = updates.tags;
    if (updates.imageUrl !== undefined) mapped.image_url = updates.imageUrl;
    if (updates.liveUrl !== undefined) mapped.live_url = updates.liveUrl;
    if (updates.embedUrl !== undefined) mapped.embed_url = updates.embedUrl;
    if (updates.githubUrl !== undefined) mapped.github_url = updates.githubUrl;
    if (updates.isFeatured !== undefined) mapped.is_featured = updates.isFeatured;
    if (updates.sortOrder !== undefined) mapped.sort_order = updates.sortOrder;
    mapped.updated_at = new Date().toISOString();

    const { data } = await sb.from('projects').update(mapped).eq('id', id).select().single();
    if (data) {
      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        category: data.category,
        status: data.status,
        description: data.description,
        nextStep: data.next_step,
        tags: data.tags,
        imageUrl: data.image_url,
        liveUrl: data.live_url,
        embedUrl: data.embed_url,
        githubUrl: data.github_url,
        isFeatured: data.is_featured,
        sortOrder: data.sort_order
      };
    }
  }

  const store = ensureLocalStore();
  const idx = store.projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  store.projects[idx] = { ...store.projects[idx], ...updates };
  saveLocalStore(store);
  return store.projects[idx];
}

export async function deleteProject(id: string): Promise<boolean> {
  const sb = getServerSupabase();
  if (sb) {
    const { error } = await sb.from('projects').delete().eq('id', id);
    if (!error) return true;
  }

  const store = ensureLocalStore();
  const before = store.projects.length;
  store.projects = store.projects.filter((p) => p.id !== id);
  saveLocalStore(store);
  return store.projects.length < before;
}

// -------------------------------------------------------------
// MEDIA
// -------------------------------------------------------------
export async function getMedia(): Promise<MediaItem[]> {
  const sb = getServerSupabase();
  if (sb) {
    const { data, error } = await sb.from('media_gallery').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      return data.map((m) => ({
        id: m.id,
        title: m.title,
        kind: m.kind,
        category: m.category,
        url: m.url,
        storagePath: m.storage_path,
        thumbnailUrl: m.thumbnail_url,
        isFeatured: m.is_featured,
        sortOrder: m.sort_order,
        createdAt: m.created_at
      }));
    }
  }

  const store = ensureLocalStore();
  return store.media;
}

export async function createMedia(item: Omit<MediaItem, 'id' | 'createdAt'>): Promise<MediaItem> {
  const sb = getServerSupabase();
  const newId = 'media-' + Date.now();
  const createdAt = new Date().toISOString();

  if (sb) {
    const { data, error } = await sb.from('media_gallery').insert({
      title: item.title,
      kind: item.kind,
      category: item.category,
      url: item.url,
      storage_path: item.storagePath,
      thumbnail_url: item.thumbnailUrl,
      is_featured: item.isFeatured || false
    }).select().single();

    if (!error && data) {
      return {
        id: data.id,
        title: data.title,
        kind: data.kind,
        category: data.category,
        url: data.url,
        storagePath: data.storage_path,
        thumbnailUrl: data.thumbnail_url,
        isFeatured: data.is_featured,
        createdAt: data.created_at
      };
    }
  }

  const store = ensureLocalStore();
  const created: MediaItem = {
    ...item,
    id: newId,
    createdAt
  };
  store.media.unshift(created);
  saveLocalStore(store);
  return created;
}

export async function deleteMedia(id: string): Promise<boolean> {
  const sb = getServerSupabase();
  if (sb) {
    const { error } = await sb.from('media_gallery').delete().eq('id', id);
    if (!error) return true;
  }

  const store = ensureLocalStore();
  const before = store.media.length;
  store.media = store.media.filter((m) => m.id !== id);
  saveLocalStore(store);
  return store.media.length < before;
}

// -------------------------------------------------------------
// SERVICES
// -------------------------------------------------------------
export async function getServices(): Promise<Service[]> {
  const sb = getServerSupabase();
  if (sb) {
    const { data, error } = await sb.from('services').select('*').order('sort_order', { ascending: true });
    if (!error && data && data.length > 0) {
      return data.map((s) => ({
        id: s.id,
        title: s.title,
        shortDescription: s.short_description,
        detailedDescription: s.detailed_description || '',
        iconName: s.icon_name || 'Palette',
        features: s.features || [],
        isActive: s.is_active !== false,
        sortOrder: s.sort_order || 0
      }));
    }
  }

  const store = ensureLocalStore();
  return store.services;
}

export async function createService(service: Omit<Service, 'id'>): Promise<Service> {
  const newId = 'serv-' + Date.now();
  const store = ensureLocalStore();
  const created: Service = { ...service, id: newId };
  store.services.push(created);
  saveLocalStore(store);
  return created;
}

export async function updateService(id: string, updates: Partial<Service>): Promise<Service | null> {
  const store = ensureLocalStore();
  const idx = store.services.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  store.services[idx] = { ...store.services[idx], ...updates };
  saveLocalStore(store);
  return store.services[idx];
}

export async function deleteService(id: string): Promise<boolean> {
  const store = ensureLocalStore();
  const before = store.services.length;
  store.services = store.services.filter((s) => s.id !== id);
  saveLocalStore(store);
  return store.services.length < before;
}

// -------------------------------------------------------------
// SKILLS & JOURNEY
// -------------------------------------------------------------
export async function getSkills(): Promise<SkillCategory[]> {
  const store = ensureLocalStore();
  return store.skills;
}

export async function getJourney(): Promise<JourneyMilestone[]> {
  const store = ensureLocalStore();
  return store.journey;
}

// -------------------------------------------------------------
// CONTACT ENQUIRIES
// -------------------------------------------------------------
export async function getEnquiries(): Promise<ContactEnquiry[]> {
  const sb = getServerSupabase();
  if (sb) {
    const { data, error } = await sb.from('contact_enquiries').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      return data.map((e) => ({
        id: e.id,
        name: e.name,
        email: e.email,
        subject: e.subject || '',
        message: e.message,
        status: e.status,
        createdAt: e.created_at,
        ipAddress: e.ip_address
      }));
    }
  }

  const store = ensureLocalStore();
  return store.enquiries;
}

export async function createEnquiry(enquiry: { name: string; email: string; subject?: string; message: string; ipAddress?: string }): Promise<ContactEnquiry> {
  const newId = 'enq-' + Date.now();
  const createdAt = new Date().toISOString();
  const item: ContactEnquiry = {
    id: newId,
    name: enquiry.name.trim(),
    email: enquiry.email.trim(),
    subject: enquiry.subject?.trim() || 'Portfolio Website Enquiry',
    message: enquiry.message.trim(),
    status: 'new',
    createdAt,
    ipAddress: enquiry.ipAddress || ''
  };

  const sb = getServerSupabase();
  if (sb) {
    try {
      await sb.from('contact_enquiries').insert({
        name: item.name,
        email: item.email,
        subject: item.subject,
        message: item.message,
        status: 'new',
        ip_address: item.ipAddress
      });
    } catch (e) {
      console.warn('Failed to insert enquiry in Supabase:', e);
    }
  }

  const store = ensureLocalStore();
  store.enquiries.unshift(item);
  saveLocalStore(store);
  return item;
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<boolean> {
  const sb = getServerSupabase();
  if (sb) {
    await sb.from('contact_enquiries').update({ status }).eq('id', id);
  }

  const store = ensureLocalStore();
  const target = store.enquiries.find((e) => e.id === id);
  if (!target) return false;
  target.status = status;
  saveLocalStore(store);
  return true;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const sb = getServerSupabase();
  if (sb) {
    await sb.from('contact_enquiries').delete().eq('id', id);
  }

  const store = ensureLocalStore();
  const before = store.enquiries.length;
  store.enquiries = store.enquiries.filter((e) => e.id !== id);
  saveLocalStore(store);
  return store.enquiries.length < before;
}

// -------------------------------------------------------------
// SITE SETTINGS
// -------------------------------------------------------------
export async function getSettings(): Promise<SiteSettings> {
  const store = ensureLocalStore();
  return store.settings;
}

export async function updateSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  const store = ensureLocalStore();
  store.settings = { ...store.settings, ...updates };
  saveLocalStore(store);
  return store.settings;
}

// -------------------------------------------------------------
// ADMIN AUTHENTICATION
// -------------------------------------------------------------
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const store = ensureLocalStore();
  const expectedPassword = store.adminPasswordHash || process.env.ADMIN_PASSWORD || 'admin12345!';
  return password === expectedPassword;
}

export async function updateAdminPassword(oldPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
  const valid = await verifyAdminPassword(oldPassword);
  if (!valid) {
    return { success: false, message: 'Current password is incorrect.' };
  }
  if (!newPassword || newPassword.length < 6) {
    return { success: false, message: 'New password must be at least 6 characters.' };
  }

  const store = ensureLocalStore();
  store.adminPasswordHash = newPassword;
  saveLocalStore(store);
  return { success: true, message: 'Admin password updated successfully.' };
}
