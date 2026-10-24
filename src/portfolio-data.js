/**
 * ZAID PORTFOLIO - ASSET & PROJECT DATA ARCHITECTURE
 * 
 * Modular data store decoupling portfolio content from presentation components.
 * 
 * Schema:
 * - id: unique string identifier
 * - title: project headline
 * - category: 'reels' | 'youtube' | 'gaming' | 'grading' | 'graphics' | 'thumbnails' | 'invitations'
 * - categoryLabel: human-readable category name
 * - description: project narrative or brief scope
 * - format: aspect ratio & format descriptor (e.g. '9:16 Vertical Reel', '16:9 Widescreen')
 * - aspectRatio: CSS aspect-ratio value ('9 / 16', '16 / 9', '21 / 9', '4 / 5', '1 / 1')
 * - duration: optional time duration (e.g. '0:45', '12:30', or null for static design)
 * - date: optional release or creation date (e.g. 'Recent', '2026', or null)
 * - role: optional creative role (e.g. 'Lead Video Editor', 'Colorist', 'Graphic Designer')
 * - tools: array of software used
 * - featured: boolean indicating editorial prominence in layout
 * - videoUrl: null or string (YouTube embed URL, Vimeo URL, or direct MP4/WebM path)
 * - poster: null or string (custom high-res poster image path)
 * - thumbnail: null or string (card preview image path)
 * - isPlaceholder: boolean indicating slot is reserved for client assets
 * - placeholderLabel: clear UI label explaining the media slot
 */

export const PORTFOLIO_CATEGORIES = [
  { id: 'all', label: 'All Work' },
  { id: 'reels', label: 'Reels & Shorts' },
  { id: 'youtube', label: 'YouTube Videos' },
  { id: 'gaming', label: 'Gaming Edits' },
  { id: 'grading', label: 'Color Grading' },
  { id: 'graphics', label: 'Graphic Design' },
  { id: 'thumbnails', label: 'Thumbnails & Posters' },
  { id: 'invitations', label: 'Invitation Cards' }
];

export const PORTFOLIO_PROJECTS = [
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
    featured: true,
    videoUrl: null, // Ready for client media link
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
    featured: true,
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
    featured: true,
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
    featured: true,
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

// Aliases for seamless compatibility
export const portfolioCategories = PORTFOLIO_CATEGORIES;
export const portfolioProjects = PORTFOLIO_PROJECTS;

