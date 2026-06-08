# Component Structure

## Overview
The application has been refactored into clear, modular components for better organization and maintainability.

## Component Files

### Desktop Components (Web/Landscape)

#### `/src/app/components/Header.tsx`
- **Purpose**: Desktop header with logo, brand name, and Community button
- **Features**:
  - Randseed logo (40×40px)
  - Centered brand name
  - Community button with hover effects
  - Max width: 1024px

#### `/src/app/components/Banner.tsx`
- **Purpose**: Banner carousel for desktop view
- **Features**:
  - 2:1 aspect ratio (50% padding-bottom)
  - Shows 2 slides on desktop, 1 on mobile
  - Autoplay with 5-second intervals
  - 4 banner items with overlay content
  - Hover effects and smooth transitions

#### `/src/app/components/DesktopPlayPage.tsx`
- **Purpose**: Main games display page for desktop
- **Features**:
  - Includes Banner component
  - 4-column grid layout for games
  - Game categories: "Rand Ball" (1 game), "Rand Game" (14 games)
  - Game card specs:
    - Logo: 86×86px
    - Product name: 20px regular
    - Description: 14px regular
    - Category title: 24px semibold
  - Transparent background for game cards
  - Hover effects (shadow + translate)

#### `/src/app/components/TabSwitch.tsx`
- **Purpose**: Bottom navigation bar for desktop
- **Features**:
  - 4 navigation buttons: Money, Play, Inbox, History
  - Icon size: 36×36px (w-9 h-9)
  - Text size: 16px regular
  - Active state: opacity 1.0
  - Inactive state: opacity 0.65
  - Unified opacity transition for all buttons
  - White background with backdrop blur

#### `/src/app/components/DesktopHome.tsx`
- **Purpose**: Main layout container for desktop view
- **Features**:
  - Full-height flex layout
  - Page state management (money/play/inbox/history)
  - Includes Header, DesktopPlayPage, and TabSwitch
  - Scrollable main content area
  - Max width: 1024px

### Mobile Components

The mobile layout (`MobileHome`) remains in `/src/app/App.tsx` with:
- Fixed header (375px max width)
- 2:1 aspect ratio banner carousel
- Vertical list layout for games
- Fixed bottom navigation with special "Play" button design
- Different styling and spacing from desktop

### Main App

#### `/src/app/App.tsx`
- **Purpose**: Root component with responsive detection
- **Features**:
  - Breakpoint: 768px
  - < 768px: Shows MobileHome
  - ≥ 768px: Shows DesktopHome
  - Window resize listener for dynamic switching

## Responsive Breakpoints

- **Mobile**: < 768px
- **Desktop/Web**: ≥ 768px

## Design Specifications

### Desktop
- Max width: 1024px
- Game grid: 4 columns
- Game logo: 86×86px
- Bottom nav icons: 36×36px
- Font sizes: 24px (titles), 20px (names), 16px (nav), 14px (descriptions)

### Mobile
- Max width: 375px
- Game layout: Vertical list
- Game logo: 52×52px
- Bottom nav icons: 27×27px
- Special floating Play button design

## Import Relationships

```
App.tsx
├── DesktopHome.tsx
│   ├── Header.tsx
│   ├── DesktopPlayPage.tsx
│   │   └── Banner.tsx
│   └── TabSwitch.tsx
└── MobileHome (inline component)
```

## Assets Used

- Logo: `figma:asset/06f51fd4908442ab707a9531c9bd497dc34c71e2.png`
- Game images: Various figma:asset imports
- SVG paths: From `../../imports/svg-401s87trfk`
- Unsplash images: For banner backgrounds

## Styling

- Tailwind CSS v4
- Gradient backgrounds: from-[#D5D6F7] via-[#E1E2F9] to-[#D3C3FB]
- Slick carousel: react-slick package with custom CSS
