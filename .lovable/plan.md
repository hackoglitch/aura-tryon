# Virtual Try-On — Premium Fashion-Tech Landing Page

## Overview

A futuristic, luxury-grade landing page for an AI-powered Virtual Try-On platform. The design follows an "Engineered Elegance" philosophy — precision of a CAD model, polish of a luxury watch.

## Design System

- **Typography**: Satoshi font (Google Fonts fallback to a geometric sans-serif) with tight letter-spacing on headlines, uppercase labels
- **Color**: Cool monochromatic grays with electric blue accent (`hsl(210 100% 65%)`) for glows and highlights. Primary buttons are solid black.
- **Effects**: Glassmorphism on feature cards only, 3D tilt via mouse tracking, smooth entrance animations

## Sections (Top to Bottom)

### 1. Navigation Bar

- Minimal top bar with brand name, navigation links, and "Start Try-On" CTA button (rounded pill, black)
- Sticky with glass blur on scroll

### 2. Hero Section

- **Headline**: "Try on the Future" — large, bold, staggered word entrance animation
- **Tagline**: "Real-time generative clothing, fitted to you."

### 3. Live Try-On Preview

- Large AR mirror frame with rounded corners (`border-radius: 48px`)
- Animated conic-gradient border sweep on load, settling into subtle glow
- Floating control buttons (camera, rotate, zoom) around the frame
- Placeholder preview area styled as a futuristic dressing room interface
- 128px vertical spacing from hero

### 4. Feature Showcase — "Intelligent by Design"

- Offset grid of glassmorphism cards (backdrop-blur, glass background, no border — shadow only)
- Each card has: icon, title, technical description
- Features: "Sub-millimeter Body Tracking", "Physics-based Fabric Simulation", "99.2% Size Accuracy", "Natural Rotation Tracking", "Smart Motion Stability"
- **Interactions**: 3D tilt effect on mouse move (±5deg), radial glow highlight following cursor, smooth `whileInView` entrance

### 5. Fashion Gallery

- Grid of clothing items with 3:4 aspect ratio, rounded corners
- Hover: image scales 1.05, dark gradient overlay slides up from bottom with product name and category
- Clean, luxury fashion brand aesthetic with placeholder images

### 6. Footer

- Clean, low-profile footer with brand name, nav links, social icons
- Social icons with blue glow on hover
- Subtle top border separator

## Animation & Motion

- All sections animate in with `whileInView` (opacity + translateY)
- Custom easing: `cubic-bezier(0.6, 0, 0.4, 1)`
- No scroll hijacking, no parallax backgrounds
- Micro-interactions: button scale on hover/press, card tilt + glow

## Technical Notes

- Uses `@react-three/fiber@^8.18` and `@react-three/drei@^9.122.0` for the hero 3D element
- Framer Motion for all animations and interactions
- Fully responsive with mobile-first considerations
- Light mode only, aligned with luxury fashion aesthetic