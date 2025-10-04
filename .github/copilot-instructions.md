# CodeUtsava 9.0 - Code Carnival Development Guide

## Project Overview
This is a React+Vite event website for CodeUtsava 9.0, a hackathon with a carnival theme. The site features immersive animations, 3D elements, and interactive components built around a "Code Carnival" aesthetic.

## Architecture & Key Patterns

### Component Structure
- **Single Page Application**: All content loads on `/` with scroll-based reveals
- **Intro Curtain System**: Interactive intro screen with rope-drag mechanism (see `src/components/intro/Intro.jsx`)
- **Overlay Architecture**: Global effects like fireworks and sparkles at fixed z-index 15
- **Data-Driven Components**: Event data, FAQ, sponsors stored in `src/assets/data/*.js`

### Core Technologies Stack
- **React 19** + **Vite 7** (fast builds, modern JSX transform)
- **Framer Motion** for animations, **React Spring** for physics-based motion
- **Three.js** + **@react-three/fiber** for 3D carnival models
- **Lenis** for smooth scrolling (configured in App.jsx)
- **Tailwind CSS 4** with custom carnival color scheme
- **Material-UI** + **React Icons** for UI components

### Styling System
- **CSS Variables**: Carnival theme colors in `src/index.css` (`--color-primary: #802b1d`, `--color-accent-2: #f3a83a`)
- **Text Strokes**: Heavy use of `text-outline-soft`, `text-stroke-strong` for carnival poster effect
- **Responsive Design**: `sm:`, `md:`, `lg:` breakpoints with mobile-first approach
- **Font Stack**: "Rye" for carnival headers, "Bebas Neue" for accent text

## Development Workflow

### Local Development
```bash
yarn install       # Always use yarn (not npm) to avoid conflicts
yarn dev          # Runs Vite dev server with HMR
yarn build        # Production build
yarn preview      # Preview production build
```

### Key Development Commands
- **Add dependencies**: `yarn add package-name` (never use npm)
- **Dev dependencies**: `yarn add -D package-name`
- **Remove packages**: `yarn remove package-name`

## Critical Component Patterns

### Page Structure (Home.jsx)
```jsx
// Scroll-based intro reveal pattern
const [revealed, setRevealed] = useState(skipIntro);
// Touch + wheel event handling for intro progression
// Component order: Overlays → Intro OR (Cursor + sections)
```

### Animation Integration
- **Framer Motion**: Use for page transitions and component reveals
- **React Spring**: Physics-based animations (curtains, ropes)
- **CSS Transitions**: Simple hover states and button effects

### Data Management
- **Static Data Files**: All content in `src/assets/data/` as JS exports
- **Image Assets**: Centralized in `src/assets/images/` with WebP optimization
- **3D Models**: GLB files in `public/models/` loaded via Three.js

### Sound System
- **ClickSoundProvider**: Global click sounds with volume/rate control
- **Audio Assets**: MP3 files in `public/` and `src/assets/audio/`
- **Opt-out**: Add `data-no-sfx="true"` to disable click sounds on specific elements

## Component Communication

### Global State Patterns
- **Sound Provider**: Wraps entire app for universal click feedback
- **Cursor Component**: Custom cursor with carnival theming
- **Overlay System**: Fixed positioning for particles/effects across all sections

### Scroll Behavior
- **Lenis Configuration**: Smooth scroll with touch support enabled
- **Section Reveals**: Intersection Observer for component animations
- **Progress Tracking**: Scroll progress for intro curtain mechanism

## Styling Guidelines

### Carnival Theme Colors
- **Primary**: `#802b1d` (dark red)
- **Accent**: `#2c2b4c` (purple) 
- **Secondary**: `#f3a83a` (orange/gold)
- **Background**: `#0d0d0de1` (dark with transparency)
- **Text**: `#eadccb` (cream)

### Typography Patterns
```jsx
// Main headers
<h1 className="font-rye text-4xl md:text-8xl text-[#F3A83A] text-stroke-strong">

// Subheaders  
<h2 className="text-xl md:text-6xl font-rye text-outline-soft text-primary">

// Body text with outlines
<p className="text-white text-outline-strong">
```

### Responsive Conventions
- Mobile-first design with `sm:`, `md:`, `lg:` breakpoints
- Touch-friendly interactions (drag, swipe gestures)
- Reduced motion for accessibility considerations

## Performance Considerations
- **Asset Optimization**: WebP images, compressed videos, optimized GLB models
- **Lazy Loading**: Components load on scroll reveal
- **Vite Optimizations**: Pre-bundled dependencies (Lenis, Three.js)
- **Bundle Deduplication**: React dedupe config in vite.config.js

## Common Issues & Solutions
- **Smooth Scroll**: Lenis must be initialized in App.jsx useEffect
- **Three.js Models**: Load from `public/models/` not `src/assets/`
- **Click Sounds**: May fail on first interaction due to browser audio policies
- **Mobile Performance**: Test curtain drag mechanics on touch devices

## File Naming Conventions
- Components: PascalCase (`Hero.jsx`, `AboutUS.jsx`)
- Data files: camelCase with descriptive suffix (`eventsData.js`)
- Assets: kebab-case (`bg-part2.jpg`, `intro-music.mp3`)
- Utilities: camelCase (`ClickSoundProvider.jsx`)