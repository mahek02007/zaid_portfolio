/**
 * ZAID PORTFOLIO - ASSET & PROJECT DATA ARCHITECTURE
 *
 * Real client projects are listed first (isPlaceholder: false).
 * File mapping (originals ? public/media/):
 *   lv_0_20261024144650.mp4  ? /media/interview-storytelling-edit.mp4
 *   lv_0_20261024163636.mp4  ? /media/color-grading-comparison.mp4
 *   invitation (1).pdf       ? /media/brand-identity-card.pdf  (private, not linked publicly)
 */

export const PORTFOLIO_CATEGORIES = [
  { id: 'all',         label: 'All Work' },
  { id: 'reels',       label: 'Reels & Shorts' },
  { id: 'youtube',     label: 'YouTube Videos' },
  { id: 'gaming',      label: 'Gaming Edits' },
  { id: 'grading',     label: 'Color Grading' },
  { id: 'graphics',    label: 'Graphic Design' },
  { id: 'thumbnails',  label: 'Thumbnails & Posters' },
  { id: 'invitations', label: 'Invitation Cards' }
];

export const PORTFOLIO_PROJECTS = [

  // -- REAL PROJECTS ----------------------------------------------------------

  {
    id: 'real-interview-01',
    title: 'Interview Storytelling Edit',
    category: 'reels',
    categoryLabel: 'Reels & Shorts',
    description: 'A short-form interview edit featuring dynamic subtitles, bold highlighted keywords, and storytelling-focused pacing — crafted to hold attention and communicate a clear narrative within a vertical format.',
    format: '9:16 Vertical Reel',
    aspectRatio: '9 / 16',
    duration: null,
    date: '2026',
    role: 'Video Editor',
    tools: ['Premiere Pro', 'CapCut Pro'],
    featured: true,
    videoUrl: '/media/interview-storytelling-edit.mp4',
    poster: '/media/poster-interview-edit.jpg',
    thumbnail: '/media/poster-interview-edit.jpg',
    isPlaceholder: false,
    placeholderLabel: ''
  },

  {
    id: 'real-grading-01',
    title: 'From Natural to Cinematic',
    category: 'grading',
    categoryLabel: 'Color Grading',
    description: 'A before-and-after landscape footage comparison showcasing the transformation achieved through color grading — from flat, natural-looking footage to a cinematic, mood-rich finish.',
    format: '16:9 Widescreen',
    aspectRatio: '16 / 9',
    duration: null,
    date: '2026',
    role: 'Colorist',
    tools: ['DaVinci Resolve', 'Premiere Pro'],
    featured: true,
    videoUrl: '/media/color-grading-comparison.mp4',
    poster: '/media/poster-color-grading.jpg',
    thumbnail: '/media/poster-color-grading.jpg',
    isPlaceholder: false,
    placeholderLabel: ''
  },

  {
    id: 'real-brand-01',
    title: 'Brand Identity & Card Design',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'A designed business/contact card demonstrating precise layout, typographic hierarchy, and professional visual branding. Preview pending approval — personal details are kept private.',
    format: '4:5 Card Format',
    aspectRatio: '4 / 5',
    duration: null,
    date: '2026',
    role: 'Graphic Designer',
    tools: ['Adobe Illustrator', 'Photoshop'],
    featured: true,
    videoUrl: null,
    imageUrl: null,
    poster: '/media/poster-brand-identity.jpg',
    thumbnail: '/media/poster-brand-identity.jpg',
    isPlaceholder: true,
    placeholderLabel: 'PREVIEW PENDING — Privacy Review in Progress'
  },

  // -- PLACEHOLDER SLOTS ------------------------------------------------------

  {
    id: 'proj-reel-01',
    title: 'High-Pacing Kinetic Lifestyle Reel',
    category: 'reels',
    categoryLabel: 'Reels & Shorts',
    description: 'Rapid-cut vertical edit featuring custom audio transients, kinetic typography overlays, beat-synced speed ramps, and high-retention hooks engineered for social algorithms.',
    format: '9:16 Vertical Reel',
    aspectRatio: '9 / 16',
    duration: '0:32',
    date: '2026',
    role: 'Video Editor & Sound Designer',
    tools: ['Premiere Pro', 'After Effects'],
    featured: false,
    videoUrl: null,
    poster: null,
    thumbnail: null,
    isPlaceholder: true,
    placeholderLabel: 'VIDEO SLOT: 9:16 Short-Form Reel'
  },
  {
    id: 'proj-yt-01',
    title: 'Documentary Storytelling & Cinematic Cut',
    category: 'youtube',
    categoryLabel: 'YouTube Videos',
    description: 'Long-form narrative construction balancing ambient A-roll storytelling with dynamic B-roll cutaways. Multi-track audio sweetening, subtle lower thirds, and seamless narrative pacing.',
    format: '16:9 Widescreen',
    aspectRatio: '16 / 9',
    duration: '10:48',
    date: '2026',
    role: 'Lead Video Editor',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    featured: false,
    videoUrl: null,
    poster: null,
    thumbnail: null,
    isPlaceholder: true,
    placeholderLabel: 'VIDEO SLOT: 16:9 YouTube Narrative'
  },
  {
    id: 'proj-game-01',
    title: 'Free Fire / Esports Kinetic Montage',
    category: 'gaming',
    categoryLabel: 'Gaming Edits',
    description: 'Synchronized rhythm montage combining hard-impact beat drops, camera shake transients, optical glow trails, and 3D kill-feed highlight effects for competitive gameplay.',
    format: '16:9 Widescreen',
    aspectRatio: '16 / 9',
    duration: '2:18',
    date: '2026',
    role: 'Motion Editor & VFX',
    tools: ['Premiere Pro', 'After Effects'],
    featured: false,
    videoUrl: null,
    poster: null,
    thumbnail: null,
    isPlaceholder: true,
    placeholderLabel: 'VIDEO SLOT: Gaming Highlight Montage'
  },
  {
    id: 'proj-grade-01',
    title: 'Cinematic Mood Grade: Teal & Orange / Midnight Noir',
    category: 'grading',
    categoryLabel: 'Color Grading',
    description: 'Transforming flat Log sensor profiles into immersive cinematic color spaces. Features accurate skin-tone qualification, atmospheric shadow roll-off, and subtle highlight halation.',
    format: '21:9 Ultra-Widescreen',
    aspectRatio: '21 / 9',
    duration: '1:15',
    date: '2026',
    role: 'Colorist',
    tools: ['DaVinci Resolve', 'Color Wheels'],
    featured: false,
    videoUrl: null,
    poster: null,
    thumbnail: null,
    isPlaceholder: true,
    placeholderLabel: 'VIDEO SLOT: 21:9 Color Grade Reel'
  },
  {
    id: 'proj-graph-01',
    title: 'Midnight Creator Brand Identity & Badge System',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    description: 'Vector-crafted brand marks, custom crown emblem geometry, typography pairing, and modern dark-mode digital asset system for creative creators.',
    format: '1:1 Square Brand Mark',
    aspectRatio: '1 / 1',
    duration: null,
    date: '2026',
    role: 'Brand & Graphic Designer',
    tools: ['Adobe Illustrator', 'Photoshop'],
    featured: false,
    videoUrl: null,
    poster: null,
    thumbnail: null,
    isPlaceholder: true,
    placeholderLabel: 'DESIGN SLOT: Brand Identity Suite'
  },
  {
    id: 'proj-thumb-01',
    title: 'High-CTR YouTube Thumbnails & Key Visuals',
    category: 'thumbnails',
    categoryLabel: 'Thumbnails & Posters',
    description: 'Psychology-driven visual packaging engineered for elevated click-through rates. Features high-contrast rim lighting, expressive subject isolation, and bold legible hierarchy.',
    format: '16:9 Banner Grid',
    aspectRatio: '16 / 9',
    duration: null,
    date: '2026',
    role: 'Thumbnail Specialist',
    tools: ['Photoshop', 'Camera Raw'],
    featured: false,
    videoUrl: null,
    poster: null,
    thumbnail: null,
    isPlaceholder: true,
    placeholderLabel: 'DESIGN SLOT: YouTube Thumbnail Set'
  },
  {
    id: 'proj-inv-01',
    title: 'Luxury Royal Wedding & Celebration Suite',
    category: 'invitations',
    categoryLabel: 'Invitation Cards',
    description: 'Handcrafted stationery design for royal weddings, engagements, milestone birthdays, and exclusive festivals. Formatted for digital sharing and fine print production.',
    format: '4:5 Editorial Card',
    aspectRatio: '4 / 5',
    duration: null,
    date: '2026',
    role: 'Stationery Designer',
    tools: ['Illustrator', 'Photoshop'],
    featured: false,
    videoUrl: null,
    poster: null,
    thumbnail: null,
    isPlaceholder: true,
    placeholderLabel: 'DESIGN SLOT: Royal Invitation Suite'
  },
  {
    id: 'proj-reel-02',
    title: 'Viral Social Short: Speed Ramps & SFX',
    category: 'reels',
    categoryLabel: 'Reels & Shorts',
    description: 'Punchy 15-second sound-driven cut optimized for Instagram Explore and YouTube Shorts feeds. Fluid speed ramping transitions and bold subtitle styling.',
    format: '9:16 Vertical Reel',
    aspectRatio: '9 / 16',
    duration: '0:18',
    date: '2026',
    role: 'Video Editor',
    tools: ['Premiere Pro', 'CapCut Pro'],
    featured: false,
    videoUrl: null,
    poster: null,
    thumbnail: null,
    isPlaceholder: true,
    placeholderLabel: 'VIDEO SLOT: 9:16 Viral Short'
  }
];

export const portfolioCategories = PORTFOLIO_CATEGORIES;
export const portfolioProjects = PORTFOLIO_PROJECTS;

export const EDITING_LAB_CONFIG = {
  sectionTitle: 'Interactive Editing Lab',
  sectionSubtitle: "Side-by-side inspection between unedited source footage and Zaid's post-production master.",
  presets: [
    {
      id: 'preset-color',
      name: 'Color Grade & Curve Calibration',
      badge: 'Color Science',
      beforeTitle: 'BEFORE: Raw Sensor Capture',
      beforeSubtitle: 'Flat Log profile, washed out dynamic range, zero LUT',
      afterTitle: "AFTER: Zaid's Midnight Grade",
      afterSubtitle: 'Rich contrast, protected skin tones, electric violet atmosphere',
      beforeVideoUrl: null,
      afterVideoUrl: null,
      isDemoPlaceholder: true
    },
    {
      id: 'preset-pacing',
      name: 'Pacing, SFX & Motion Polish',
      badge: 'Visual Storytelling',
      beforeTitle: 'BEFORE: Uncut Camera Take',
      beforeSubtitle: 'Static framing, raw camera microphone noise, unpaced flow',
      afterTitle: 'AFTER: Dynamic Narrative Cut',
      afterSubtitle: 'Speed ramping, beat-synced transients, kinetic titles & punchy audio',
      beforeVideoUrl: null,
      afterVideoUrl: null,
      isDemoPlaceholder: true
    }
  ]
};
