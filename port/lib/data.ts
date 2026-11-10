import { Profile, Project, SkillCategory, Service, MediaItem, JourneyMilestone, SiteSettings } from './types';

export const INITIAL_PROFILE: Profile = {
  id: 'profile-vaibhav',
  fullName: 'Vaibhav Kumar Verma',
  headline: 'Building Digital Experiences. Exploring Intelligent Technology.',
  bio: 'I’m Vaibhav Kumar Verma, a B.Tech Computer Science Engineering student at United University, Prayagraj. I build machine-learning models and web projects, and I run TSO Groups, a small studio for graphic design, video editing and digital branding.',
  avatarUrl: '',
  phone: '+91 9151362992',
  email: 'vermavaibhav710@gmail.com',
  location: 'Prayagraj, Uttar Pradesh, India',
  educationDegree: 'B.Tech in Computer Science and Engineering',
  educationInstitution: 'United University, Prayagraj',
  githubUrl: 'https://github.com/thesecretone09',
  linkedinUrl: 'https://www.linkedin.com/in/vaibhav-verma-953044344/',
  youtubeUrl: 'https://www.youtube.com/@im_Vaibhav_Verma',
  studioName: 'TSO Groups'
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Smart Vehicle Price Prediction and Recommendation System',
    slug: 'smart-vehicle-price-prediction',
    category: 'AI/ML',
    status: 'proto',
    description: 'Predicts used-car prices by training several models (Linear Regression, Decision Tree, Random Forest, Gradient Boosting, XGBoost) on the CarDekho dataset and picking the best automatically. A live Streamlit demo is deployed; MobileNetV2 damage detection is being added.',
    nextStep: 'Publish accuracy results and finish the damage-detection step.',
    tags: ['Python', 'Scikit-learn', 'XGBoost', 'MobileNetV2', 'Streamlit'],
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://smartcar-ai-3xttyhglg8wdayok5vz2re.streamlit.app/',
    embedUrl: 'https://smartcar-ai-3xttyhglg8wdayok5vz2re.streamlit.app/?embed=true',
    githubUrl: 'https://github.com/thesecretone09',
    isFeatured: true,
    sortOrder: 1,
    createdAt: '2026-10-15T10:00:00Z'
  },
  {
    id: 'proj-2',
    title: 'Neelkamal Marriage Lawn Website',
    slug: 'neelkamal-marriage-lawn',
    category: 'Web',
    status: 'wip',
    description: 'A commercial business website for a premier marriage lawn in Prayagraj featuring venue specifications, photo gallery, event booking options, and direct customer enquiry forms.',
    nextStep: 'Finish venue content, optimize image assets, and complete cross-browser mobile testing.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Design'],
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    liveUrl: '',
    embedUrl: '',
    githubUrl: 'https://github.com/thesecretone09',
    isFeatured: false,
    sortOrder: 2,
    createdAt: '2026-10-20T12:00:00Z'
  },
  {
    id: 'proj-3',
    title: 'IMAGIX Image Studio (TSO Groups)',
    slug: 'imagix-image-studio',
    category: 'Web',
    status: 'proto',
    description: 'A browser-based image tool from my studio for compressing, resizing, converting, retouching and annotating images. Everything runs locally on the device with zero cloud uploads or user account barriers.',
    nextStep: 'Test every image tool across mobile touchscreens and expand client preset workflows.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Canvas API'],
    imageUrl: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://imagix-tso.netlify.app',
    embedUrl: 'https://imagix-tso.netlify.app',
    githubUrl: 'https://github.com/thesecretone09',
    isFeatured: true,
    sortOrder: 3,
    createdAt: '2026-10-25T14:00:00Z'
  },
  {
    id: 'proj-4',
    title: 'Smart Village 2.0 (Smart Gaon)',
    slug: 'smart-village-2',
    category: 'Web',
    status: 'proto',
    description: 'A comprehensive village services platform prototype covering digital agriculture guidance, student educational resources, government scheme access, local marketplace listings, grievances, and emergency hotlines.',
    nextStep: 'Connect verified regional government database APIs and real citizen complaint resolution workflows.',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://smartgaon2.netlify.app/',
    embedUrl: 'https://smartgaon2.netlify.app/',
    githubUrl: 'https://github.com/thesecretone09',
    isFeatured: true,
    sortOrder: 4,
    createdAt: '2026-10-28T09:00:00Z'
  },
  {
    id: 'proj-5',
    title: 'GrainGuard: Acoustic Grain-Loss Monitoring',
    slug: 'grainguard-acoustic-monitoring',
    category: 'AI/ML',
    status: 'proto',
    description: 'An acoustic monitoring dashboard prototype designed to listen for pest activity, moisture decay, and grain movement in agricultural storage silos with predictive risk scoring and node alerts.',
    nextStep: 'Calibrate with acoustic audio sensor telemetry and deploy a real-time lightweight classifier.',
    tags: ['JavaScript', 'Dashboard', 'Sensors', 'ML', 'Research'],
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://grain-guardai.netlify.app',
    embedUrl: 'https://grain-guardai.netlify.app',
    githubUrl: 'https://github.com/thesecretone09',
    isFeatured: true,
    sortOrder: 5,
    createdAt: '2026-11-01T11:00:00Z'
  }
];

export const INITIAL_SKILLS: SkillCategory[] = [
  {
    category: 'Programming languages',
    iconPath: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
    skills: ['Python', 'C', 'C++', 'Data Structures & Algorithms']
  },
  {
    category: 'AI and machine learning',
    iconPath: 'M12 3a4 4 0 00-4 4v1a4 4 0 00-3 4 4 4 0 003 4 4 4 0 008 0 4 4 0 003-4 4 4 0 00-3-4V7a4 4 0 00-4-4zM12 3v18',
    skills: ['NumPy', 'Pandas', 'Scikit-learn', 'XGBoost', 'MobileNetV2 (Pre-trained)', 'Exploring: Generative AI, NLP']
  },
  {
    category: 'Web development',
    iconPath: 'M3 5h18v14H3zM3 9h18',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML5 & CSS3', 'Streamlit']
  },
  {
    category: 'Tools and technologies',
    iconPath: 'M14 7l3-3 3 3-3 3M3 21l9-9M12 12l-2-2 4-4 4 4-4 4z',
    skills: ['Git and GitHub', 'Google Colab', 'VS Code', 'Exploring: Cybersecurity']
  },
  {
    category: 'Creative skills (TSO Groups)',
    iconPath: 'M12 3l2.5 6 6.5.5-5 4.3 1.6 6.4L12 17l-5.6 3.2L8 13.8 3 9.5 9.5 9z',
    skills: ['Graphic design', 'Video editing', 'YouTube channel management', 'Digital branding', 'Script writing']
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'serv-1',
    title: 'Graphic design',
    shortDescription: 'Posters, social posts and visual identity built around a clear idea.',
    detailedDescription: 'Purposeful visual direction for educational creators, tech brands, and modern businesses with balanced typography and composition.',
    iconName: 'Palette',
    features: ['Brand Identity Systems', 'Social Media Graphics', 'Marketing Collateral', 'High-Res Layouts'],
    isActive: true,
    sortOrder: 1
  },
  {
    id: 'serv-2',
    title: 'Thumbnail design',
    shortDescription: 'Click-worthy YouTube thumbnails that still stay honest to the video.',
    detailedDescription: 'Engineered for high CTR with strong focal subjects, dynamic contrast, and honest storytelling.',
    iconName: 'Image',
    features: ['A/B Testing Variants', 'CTR Visual Psychology', 'Face Retouching & Highlights', 'Express Delivery'],
    isActive: true,
    sortOrder: 2
  },
  {
    id: 'serv-3',
    title: 'Poster design',
    shortDescription: 'Education and entertainment posters with depth and visual impact.',
    detailedDescription: 'Combining science, technology, history, and cinematic typography into compelling visual works.',
    iconName: 'FileText',
    features: ['Educational Infographics', 'Event & Cinema Posters', 'Vector Artwork', 'Print & Digital Formats'],
    isActive: true,
    sortOrder: 3
  },
  {
    id: 'serv-4',
    title: 'Video editing',
    shortDescription: 'Short-form and long-form edits, from rough cut to final polish.',
    detailedDescription: 'Pacing, audio mastering, sound design, motion graphics, and color grading that keep viewers engaged.',
    iconName: 'Video',
    features: ['YouTube Long-Form Videos', 'Instagram Reels & Shorts', 'Motion Graphics & Subtitles', 'Sound Design'],
    isActive: true,
    sortOrder: 4
  },
  {
    id: 'serv-5',
    title: 'YouTube channel management',
    shortDescription: 'Publishing, scripts, packaging and consistency for creator channels.',
    detailedDescription: 'Treating YouTube channels as cohesive media properties with disciplined strategy and retention tuning.',
    iconName: 'Youtube',
    features: ['SEO & Metadata Optimization', 'Packaging Strategy', 'Release Scheduling', 'Analytics Auditing'],
    isActive: true,
    sortOrder: 5
  },
  {
    id: 'serv-6',
    title: 'Digital branding',
    shortDescription: 'Names, colour and tone that hold together seamlessly across platforms.',
    detailedDescription: 'Developing recognizable visual and verbal identity for emerging brands and studios.',
    iconName: 'Sparkles',
    features: ['Palette & Typography Direction', 'Social Asset Kits', 'Logo & Icon Suite', 'Brand Guidelines'],
    isActive: true,
    sortOrder: 6
  },
  {
    id: 'serv-7',
    title: 'Web development',
    shortDescription: 'Real sites for real businesses, such as the Neelkamal Marriage Lawn website.',
    detailedDescription: 'Modern, responsive, fast-loading web applications with custom backends and clean user interfaces.',
    iconName: 'Globe',
    features: ['Next.js & React Apps', 'Responsive Mobile-First UI', 'Custom Backend & DB', 'Vercel Deployment'],
    isActive: true,
    sortOrder: 7
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'media-1',
    title: 'Ionic Bond – Relation with Periodic Table (Part 2)',
    kind: 'image',
    category: 'Education',
    url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    sortOrder: 1,
    createdAt: '2026-10-10T10:00:00Z'
  },
  {
    id: 'media-2',
    title: 'Biotechnology – Tools and Its Processes (Part 2)',
    kind: 'image',
    category: 'Education',
    url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    sortOrder: 2,
    createdAt: '2026-10-12T10:00:00Z'
  },
  {
    id: 'media-3',
    title: 'Triangles – Thales’ Theorem',
    kind: 'image',
    category: 'Education',
    url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    isFeatured: false,
    sortOrder: 3,
    createdAt: '2026-10-14T10:00:00Z'
  },
  {
    id: 'media-4',
    title: 'Nucleus – Chromatin Fibres and Nucleolus (Part 2)',
    kind: 'image',
    category: 'Education',
    url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80',
    isFeatured: false,
    sortOrder: 4,
    createdAt: '2026-10-16T10:00:00Z'
  },
  {
    id: 'media-5',
    title: 'Cytoskeleton and Centrosome Explained',
    kind: 'image',
    category: 'Education',
    url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80',
    isFeatured: false,
    sortOrder: 5,
    createdAt: '2026-10-18T10:00:00Z'
  },
  {
    id: 'media-6',
    title: 'KOTA – Haunted Hostel',
    kind: 'image',
    category: 'Entertainment',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    sortOrder: 6,
    createdAt: '2026-10-20T10:00:00Z'
  },
  {
    id: 'media-7',
    title: 'Billionaire – Warren Buffett vs Elon Musk',
    kind: 'image',
    category: 'Creative',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    sortOrder: 7,
    createdAt: '2026-10-22T10:00:00Z'
  },
  {
    id: 'media-8',
    title: 'AI – Will It Replace Human Jobs?',
    kind: 'image',
    category: 'Technology',
    url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    sortOrder: 8,
    createdAt: '2026-10-24T10:00:00Z'
  },
  {
    id: 'media-9',
    title: 'Chemistry – Top 100 PYQs',
    kind: 'image',
    category: 'Education',
    url: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=1200&q=80',
    isFeatured: false,
    sortOrder: 9,
    createdAt: '2026-10-26T10:00:00Z'
  },
  {
    id: 'media-10',
    title: 'IT Jobs – Honest Future of IT Jobs',
    kind: 'image',
    category: 'Technology',
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    sortOrder: 10,
    createdAt: '2026-10-28T10:00:00Z'
  },
  {
    id: 'media-11',
    title: 'Call of Duty Mobile – Before and After',
    kind: 'image',
    category: 'Gaming',
    url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    isFeatured: false,
    sortOrder: 11,
    createdAt: '2026-10-30T10:00:00Z'
  }
];

export const INITIAL_JOURNEY: JourneyMilestone[] = [
  {
    id: 'j-1',
    period: 'Now',
    statusType: 'done',
    title: 'B.Tech in Computer Science, United University',
    organization: 'United University, Prayagraj',
    description: 'Building a base in Python, C, C++, data structures and algorithms.',
    sortOrder: 1
  },
  {
    id: 'j-2',
    period: 'Built',
    statusType: 'done',
    title: 'Projects with live demos',
    organization: 'Self-Driven Development',
    description: 'A car-price ML app, an image studio, a village-services prototype and a grain-monitoring dashboard prototype.',
    sortOrder: 2
  },
  {
    id: 'j-3',
    period: 'In progress',
    statusType: 'wip',
    title: 'A strong GitHub portfolio',
    organization: 'Open Source',
    description: 'Clean READMEs, working demos and honest status on every repository.',
    sortOrder: 3
  },
  {
    id: 'j-4',
    period: 'Next',
    statusType: 'proto',
    title: 'Hackathons',
    organization: 'Developer Community',
    description: 'Ship a working demo under pressure and learn from other teams.',
    sortOrder: 4
  },
  {
    id: 'j-5',
    period: 'Aiming',
    statusType: 'wip',
    title: 'Internships',
    organization: 'Industry Experience',
    description: 'Apply my ML and web skills on real codebases.',
    sortOrder: 5
  },
  {
    id: 'j-6',
    period: 'Vision',
    statusType: 'idea',
    title: 'Freelance and entrepreneurship',
    organization: 'TSO Groups Studio',
    description: 'Turn design, video and development into a sustainable studio.',
    sortOrder: 6
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteTitle: 'Vaibhav Kumar Verma | TSO Groups – Software, AI & Creative Studio',
  metaDescription: 'Vaibhav Kumar Verma, B.Tech CSE student at United University, Prayagraj. AI/ML, web development, design and video through TSO Groups. Every project is labelled honestly.',
  contactEmail: 'vermavaibhav710@gmail.com',
  contactPhone: '+91 9151362992',
  githubUrl: 'https://github.com/thesecretone09',
  linkedinUrl: 'https://www.linkedin.com/in/vaibhav-verma-953044344/',
  youtubeUrl: 'https://www.youtube.com/@im_Vaibhav_Verma'
};
