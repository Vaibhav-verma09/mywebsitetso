-- =================================================================
-- VAIBHAV KUMAR VERMA - INITIAL SEED DATA
-- =================================================================

-- 1. Insert Profile
INSERT INTO public.profiles (
  full_name, headline, bio, avatar_url, phone, email, location, education_degree, education_institution, github_url, linkedin_url, youtube_url, studio_name
) VALUES (
  'Vaibhav Kumar Verma',
  'Building Digital Experiences. Exploring Intelligent Technology.',
  'B.Tech Computer Science Engineering student at United University, Prayagraj. I build machine-learning models and web projects, and I run TSO Groups, a studio for graphic design, video editing and digital branding.',
  '',
  '+91 9151362992',
  'vermavaibhav710@gmail.com',
  'Prayagraj, Uttar Pradesh, India',
  'B.Tech in Computer Science and Engineering',
  'United University, Prayagraj',
  'https://github.com/thesecretone09',
  'https://www.linkedin.com/in/vaibhav-verma-953044344/',
  'https://www.youtube.com/@im_Vaibhav_Verma',
  'TSO Groups'
);

-- 2. Insert Projects
INSERT INTO public.projects (title, slug, category, status, description, next_step, tags, image_url, live_url, embed_url, github_url, is_featured, sort_order) VALUES
(
  'Smart Vehicle Price Prediction and Recommendation System',
  'smart-vehicle-price-prediction',
  'AI/ML',
  'proto',
  'Predicts used-car prices by training several models (Linear Regression, Decision Tree, Random Forest, Gradient Boosting, XGBoost) on the CarDekho dataset and picking the best automatically. A live Streamlit demo is deployed; MobileNetV2 damage detection is being added.',
  'Publish accuracy results and finish the damage-detection step.',
  ARRAY['Python', 'Scikit-learn', 'XGBoost', 'MobileNetV2', 'Streamlit'],
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
  'https://smartcar-ai-3xttyhglg8wdayok5vz2re.streamlit.app/',
  'https://smartcar-ai-3xttyhglg8wdayok5vz2re.streamlit.app/?embed=true',
  'https://github.com/thesecretone09',
  true,
  1
),
(
  'Neelkamal Marriage Lawn Website',
  'neelkamal-marriage-lawn',
  'Web',
  'wip',
  'A commercial business website for a premier marriage lawn in Prayagraj featuring venue specifications, photo gallery, event booking options, and direct customer enquiry forms.',
  'Finish venue content, optimize image assets, and complete cross-browser mobile testing.',
  ARRAY['HTML', 'CSS', 'JavaScript', 'Web Design'],
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  '',
  '',
  'https://github.com/thesecretone09',
  false,
  2
),
(
  'IMAGIX Image Studio (TSO Groups)',
  'imagix-image-studio',
  'Web',
  'proto',
  'A browser-based image tool from my studio for compressing, resizing, converting, retouching and annotating images. Everything runs locally on the device with zero cloud uploads or user account barriers.',
  'Test every image tool across mobile touchscreens and expand client preset workflows.',
  ARRAY['HTML', 'CSS', 'JavaScript', 'Canvas API'],
  'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=1200&q=80',
  'https://imagix-tso.netlify.app',
  'https://imagix-tso.netlify.app',
  'https://github.com/thesecretone09',
  true,
  3
),
(
  'Smart Village 2.0 (Smart Gaon)',
  'smart-village-2',
  'Web',
  'proto',
  'A comprehensive village services platform prototype covering digital agriculture guidance, student educational resources, government scheme access, local marketplace listings, grievances, and emergency hotlines.',
  'Connect verified regional government database APIs and real citizen complaint resolution workflows.',
  ARRAY['HTML', 'CSS', 'JavaScript', 'UI/UX'],
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  'https://smartgaon2.netlify.app/',
  'https://smartgaon2.netlify.app/',
  'https://github.com/thesecretone09',
  true,
  4
),
(
  'GrainGuard: Acoustic Grain-Loss Monitoring',
  'grainguard-acoustic-monitoring',
  'AI/ML',
  'proto',
  'An acoustic monitoring dashboard prototype designed to listen for pest activity, moisture decay, and grain movement in agricultural storage silos with predictive risk scoring and node alerts.',
  'Calibrate with acoustic audio sensor telemetry and deploy a real-time lightweight classifier.',
  ARRAY['JavaScript', 'Dashboard', 'Sensors', 'ML', 'Research'],
  'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80',
  'https://grain-guardai.netlify.app',
  'https://grain-guardai.netlify.app',
  'https://github.com/thesecretone09',
  true,
  5
);

-- 3. Insert Skills
INSERT INTO public.skills (category, name, proficiency, is_learning, sort_order) VALUES
('Programming', 'Python', 'Advanced', false, 1),
('Programming', 'C', 'Intermediate', false, 2),
('Programming', 'C++', 'Intermediate', false, 3),
('Programming', 'Data Structures & Algorithms', 'Active Practice', false, 4),
('AI and machine learning', 'NumPy & Pandas', 'Advanced', false, 5),
('AI and machine learning', 'Scikit-learn', 'Advanced', false, 6),
('AI and machine learning', 'XGBoost', 'Intermediate', false, 7),
('AI and machine learning', 'MobileNetV2 (Pre-trained)', 'Intermediate', false, 8),
('AI and machine learning', 'Generative AI & LLMs', 'Exploring', true, 9),
('AI and machine learning', 'Natural Language Processing (NLP)', 'Exploring', true, 10),
('Web development', 'Next.js & React', 'Proficient', false, 11),
('Web development', 'TypeScript', 'Proficient', false, 12),
('Web development', 'Tailwind CSS', 'Advanced', false, 13),
('Web development', 'Streamlit', 'Proficient', false, 14),
('Web development', 'HTML5 & Modern CSS3', 'Mastery', false, 15),
('Tools and technologies', 'Git & GitHub', 'Advanced', false, 16),
('Tools and technologies', 'Google Colab & Jupyter', 'Advanced', false, 17),
('Tools and technologies', 'Cybersecurity Fundamentals', 'Exploring', true, 18),
('Creative skills', 'Graphic Design & Art Direction', 'Mastery', false, 19),
('Creative skills', 'Video Editing & Post-Production', 'Advanced', false, 20),
('Creative skills', 'YouTube Thumbnail Engineering', 'Mastery', false, 21),
('Creative skills', 'Digital Branding & Typography', 'Advanced', false, 22),
('Creative skills', 'Script Writing & Storytelling', 'Proficient', false, 23);

-- 4. Insert Studio Services
INSERT INTO public.services (title, short_description, detailed_description, icon_name, features, is_active, sort_order) VALUES
(
  'Graphic Design',
  'Posters, social posts, and visual identity built around a clear, impactful idea.',
  'Crafting compelling visual communication for educational creators, tech brands, and modern businesses with deliberate typography and composition.',
  'Palette',
  ARRAY['Brand Identity Systems', 'Social Media Graphics', 'Marketing Collateral', 'High-Res Typography Layouts'],
  true,
  1
),
(
  'Thumbnail Design',
  'Click-worthy YouTube thumbnails that capture attention while staying honest to the content.',
  'Engineered for maximum click-through rates (CTR) with high-contrast character cutouts, punchy text, and clean storytelling hierarchy.',
  'Image',
  ARRAY['A/B Test Ready Variants', 'High CTR Visual Psychology', 'Custom Face Retouching & Highlights', 'Fast Turnaround'],
  true,
  2
),
(
  'Poster Design',
  'Cinematic educational, entertainment, and conceptual posters designed to inform and inspire.',
  'Comprehensive layout design combining science, history, storytelling, and striking visual depth.',
  'FileText',
  ARRAY['Educational Infographic Posters', 'Event & Cinema Posters', 'Vector & Raster Artwork', 'Print & Digital Formats'],
  true,
  3
),
(
  'Video Editing',
  'Short-form reels, YouTube long-form cuts, and technical video breakdowns with cinematic pace.',
  'Dynamic pacing, audio mastering, sound effects, motion graphics, and narrative color grading.',
  'Video',
  ARRAY['YouTube Long-Form Videos', 'Instagram Reels & Shorts', 'Motion Graphics & Subtitles', 'Audio Cleaning & Sound Design'],
  true,
  4
),
(
  'YouTube Channel Management',
  'End-to-end publishing strategy, script review, visual consistency, and audience retention tuning.',
  'Helping creators scale by treating their channel as a cohesive media product with disciplined releases.',
  'Youtube',
  ARRAY['Metadata & SEO Optimization', 'Title & Packaging Strategy', 'Release Scheduling', 'Analytics & Retention Auditing'],
  true,
  5
),
(
  'Digital Branding',
  'Distinctive names, color palettes, tone guidelines, and assets that remain cohesive across platforms.',
  'Unifying your brand touchpoints so audiences instantly recognize and respect your work.',
  'Sparkles',
  ARRAY['Palette & Type Direction', 'Social Asset Kits', 'Logo & Icon Suite', 'Brand Guidelines'],
  true,
  6
),
(
  'Web Development',
  'Full-stack digital products, business websites, and interactive tools built for speed and conversions.',
  'Transforming ideas into resilient web applications like Neelkamal Marriage Lawn and IMAGIX Studio.',
  'Globe',
  ARRAY['Next.js & React Apps', 'Responsive Mobile-First UI', 'Custom Backend & Database Integrations', 'Fast Vercel Hosting'],
  true,
  7
);

-- 5. Insert Media Gallery Items
INSERT INTO public.media_gallery (title, kind, category, url, is_featured, sort_order) VALUES
('Ionic Bond – Relation with Periodic Table (Part 2)', 'image', 'Education', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80', true, 1),
('Biotechnology – Tools and Its Processes (Part 2)', 'image', 'Education', 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80', true, 2),
('Triangles – Thales’ Theorem Explained', 'image', 'Education', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80', false, 3),
('Nucleus – Chromatin Fibres and Nucleolus', 'image', 'Education', 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80', false, 4),
('Cytoskeleton and Centrosome In-Depth', 'image', 'Education', 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80', false, 5),
('KOTA – Haunted Hostel Story Showcase', 'image', 'Entertainment', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80', true, 6),
('Billionaire Mindset – Warren Buffett vs Elon Musk', 'image', 'Creative', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', true, 7),
('AI Revolution – Will It Replace Human Jobs?', 'image', 'Technology', 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80', true, 8),
('Chemistry – Top 100 Previous Year Questions', 'image', 'Education', 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=1200&q=80', false, 9),
('IT Jobs – Honest Career Landscape & Future', 'image', 'Technology', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80', true, 10),
('Call of Duty Mobile – Before and After Thumbnail', 'image', 'Gaming', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80', false, 11);

-- 6. Insert Experience & Journey
INSERT INTO public.experience_journey (period, status_type, title, organization, description, sort_order) VALUES
('Now', 'done', 'B.Tech in Computer Science and Engineering', 'United University, Prayagraj', 'Building a strong foundational core in Python, C, C++, Data Structures, Algorithms, and Software Engineering principles.', 1),
('Built', 'done', 'Live Deployed Applications & Prototypes', 'Self-Directed / TSO Groups', 'Architected a multi-model car-price ML predictor, IMAGIX in-browser image studio, Smart Village 2.0 prototype, and GrainGuard sensor monitor.', 2),
('In Progress', 'wip', 'High-Standard GitHub Engineering Portfolio', 'Open Source', 'Consolidating production-grade repositories with robust documentation, modular architectures, and live deployments.', 3),
('Next', 'proto', 'Competitive Hackathons & Build Sprints', 'Tech Ecosystem', 'Collaborating with agile teams under pressure to ship innovative, full-stack AI and Web applications.', 4),
('Aiming', 'wip', 'Software & Machine Learning Internships', 'Tech Industry', 'Seeking opportunities to apply machine learning modeling and modern full-stack development to high-scale production systems.', 5),
('Vision', 'idea', 'TSO Groups Studio Scale & Entrepreneurship', 'TSO Groups', 'Expanding TSO Groups into a full-service digital studio uniting cutting-edge engineering, brand storytelling, and user-centric design.', 6);

-- 7. Insert Site Settings
INSERT INTO public.site_settings (key, value, description) VALUES
(
  'general',
  '{"siteTitle": "Vaibhav Kumar Verma | TSO Groups – Software, AI & Creative Studio", "metaDescription": "Vaibhav Kumar Verma, B.Tech CSE student at United University, Prayagraj. AI/ML, web development, design and video through TSO Groups.", "contactEmail": "vermavaibhav710@gmail.com", "contactPhone": "+91 9151362992"}'::jsonb,
  'General website title, meta description, and contact info'
),
(
  'socials',
  '{"github": "https://github.com/thesecretone09", "linkedin": "https://www.linkedin.com/in/vaibhav-verma-953044344/", "youtube": "https://www.youtube.com/@im_Vaibhav_Verma", "email": "mailto:vermavaibhav710@gmail.com"}'::jsonb,
  'Public social media links and URLs'
);
