/**
 * ZAID PORTFOLIO - ASSET & PROJECT CONFIGURATION
 * 
 * Instructions for adding real client work:
 * 1. To add a video: Set `type: "video"`, provide `videoUrl` (YouTube embed, Vimeo, or local MP4 path),
 *    and provide a high-res `thumbnailUrl`.
 * 2. To add graphic design/invitations: Set `type: "image"`, provide `imageUrl` and aspect ratio.
 * 3. Categorize into: 'reels', 'youtube', 'gaming', 'graphics', or 'invitations'.
 */

export const portfolioCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'reels', label: 'Reels & Shorts (9:16)' },
  { id: 'youtube', label: 'YouTube & Longform' },
  { id: 'gaming', label: 'Gaming Edits' },
  { id: 'graphics', label: 'Graphic Design' },
  { id: 'invitations', label: 'Invitation Suite' }
];

export const portfolioProjects = [
  {
    id: 'proj-01',
    title: 'High-Pacing Fashion & Lifestyle Reel',
    category: 'reels',
    categoryLabel: 'Short-Form Video',
    format: '9:16 Vertical',
    aspectRatio: '9 / 16',
    duration: '0:35',
    isPlaceholder: true,
    placeholderLabel: 'VIDEO SLOT 01: Client 9:16 Reel Ready',
    description: 'Dynamic pacing, custom sound design, whip transitions, and kinetic typography tuned for Instagram & TikTok retention.',
    deliverables: ['Custom Speed Ramping', 'Sound FX Layering', 'Kinetic Subtitles', 'Color Pop Grade'],
    tools: ['Premiere Pro', 'After Effects'],
    // Placeholder video/thumbnail fallback (ready for actual client link):
    videoUrl: null, 
    thumbnailUrl: null
  },
  {
    id: 'proj-02',
    title: 'Cinematic YouTube Story & Documentary Cut',
    category: 'youtube',
    categoryLabel: 'Long-Form Storytelling',
    format: '16:9 Widescreen',
    aspectRatio: '16 / 9',
    duration: '8:45',
    isPlaceholder: true,
    placeholderLabel: 'VIDEO SLOT 02: Client 16:9 YouTube Cut Ready',
    description: 'Narrative structure built to hold audience retention. Multitrack audio mixing, mood-driven color correction, and smooth pacing.',
    deliverables: ['Narrative Editing', 'A-Roll / B-Roll Assembly', 'Dynamic Jump Cut Polish', 'Custom Lower Thirds'],
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    videoUrl: null,
    thumbnailUrl: null
  },
  {
    id: 'proj-03',
    title: 'Free Fire / Esports Montage: Kinetic Action Edit',
    category: 'gaming',
    categoryLabel: 'Gaming Content',
    format: '16:9 Widescreen',
    aspectRatio: '16 / 9',
    duration: '2:15',
    isPlaceholder: true,
    placeholderLabel: 'VIDEO SLOT 03: Gaming Highlight Montage Ready',
    description: 'Impact beats synchronized with music transients, camera shake, visual glow overlays, and speed ramping on eliminations.',
    deliverables: ['Beat-Synced Snaps', 'Motion Blur & Glow FX', '3D Kill Cam Accents', 'Custom Sound Impact Hits'],
    tools: ['Premiere Pro', 'After Effects'],
    videoUrl: null,
    thumbnailUrl: null
  },
  {
    id: 'proj-04',
    title: 'High-CTR YouTube Thumbnails & Brand Identity Suite',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    format: '16:9 Banner / Grid',
    aspectRatio: '16 / 9',
    duration: null,
    isPlaceholder: true,
    placeholderLabel: 'DESIGN SLOT 04: Graphic & Thumbnail Package Ready',
    description: 'High-contrast visuals, expressive facial cutouts, 3D text styling, and vibrant color balance engineered for maximum click-through rates.',
    deliverables: ['Visual Composition', 'Subject Cutout & Glow', 'Bold Typography Design', 'Color Contrast Optimization'],
    tools: ['Photoshop', 'Illustrator'],
    imageUrl: null,
    thumbnailUrl: null
  },
  {
    id: 'proj-05',
    title: 'Luxury Royal Wedding & Celebration Invitation Suite',
    category: 'invitations',
    categoryLabel: 'Invitation Cards',
    format: '4:5 Editorial Card',
    aspectRatio: '4 / 5',
    duration: null,
    isPlaceholder: true,
    placeholderLabel: 'DESIGN SLOT 05: Custom Invitation Showcase Ready',
    description: 'Bespoke animated and static digital invites tailored for weddings, engagements, milestone birthdays, and exclusive festivals.',
    deliverables: ['Custom Motifs & Flourishes', 'Bilingual Font Pairing', 'Digital Sharing Optimization', 'Print-Ready PDF & Web MP4'],
    tools: ['Illustrator', 'Photoshop', 'After Effects'],
    imageUrl: null,
    thumbnailUrl: null
  },
  {
    id: 'proj-06',
    title: 'Cinematic Mood Grade: Teal & Orange / Midnight Noir',
    category: 'youtube',
    categoryLabel: 'Color Grading',
    format: '21:9 Ultra-Widescreen',
    aspectRatio: '21 / 9',
    duration: '1:10',
    isPlaceholder: true,
    placeholderLabel: 'VIDEO SLOT 06: Before/After Color Grade Reel Ready',
    description: 'Transforming flat Log sensor profiles into rich, cinematic color spaces with preserved skin tones and deep atmospheric shadows.',
    deliverables: ['Log to Rec.709 Correction', 'Shot Matching', 'Skin Tone Isolation', 'Atmospheric Vignette & Glow'],
    tools: ['DaVinci Resolve', 'Premiere Pro'],
    videoUrl: null,
    thumbnailUrl: null
  }
];

export const servicesData = [
  {
    number: '01',
    title: 'Video Editing',
    headline: 'High-Retention Short & Long-Form Video',
    description: 'Tailored edits designed for modern algorithms and viewer engagement across YouTube, Instagram Reels, and Shorts.',
    features: [
      'Pacing & narrative architecture',
      'Dynamic speed ramping & seamless whip pans',
      'Engaging subtitles & kinetic typography',
      'Custom sound FX & multitrack music mastering',
      'Gaming montages (Free Fire, FPS, Esports)'
    ],
    accent: 'violet'
  },
  {
    number: '02',
    title: 'Graphic Design',
    headline: 'High-Impact Brand Visuals & Thumbnails',
    description: 'Eye-catching graphic assets built to stop scrolling fingers and establish an unmistakable visual identity.',
    features: [
      'High-CTR YouTube thumbnails',
      'Event & promotional posters',
      'Social media banners & channel art',
      'Brand logo marks & badges',
      'Visual storytelling layouts'
    ],
    accent: 'lavender'
  },
  {
    number: '03',
    title: 'Color Grading',
    headline: 'Atmospheric Moods & Cinematic Looks',
    description: 'Elevating raw footage into immersive cinematic experiences with bespoke color palettes and consistent tone.',
    features: [
      'Cinematic contrast & curve calibration',
      'Natural true-to-life skin tone balancing',
      'Modern stylized looks (Midnight, Neon, Teal & Orange)',
      'Lighting enhancement & vignette shaping',
      'Shot-to-shot consistency across multi-cam setups'
    ],
    accent: 'cyan'
  },
  {
    number: '04',
    title: 'Invitation Cards',
    headline: 'Bespoke Celebration & Event Invitations',
    description: 'Handcrafted digital and print-ready invitation suites for life’s most cherished celebrations.',
    features: [
      'Royal Wedding & Reception cards',
      'Engagements & Anniversary invitations',
      'Milestone Birthday & Party graphics',
      'Festival greetings & Corporate launch cards',
      'Digital animated video invitations'
    ],
    accent: 'violet'
  }
];
