# ManhwaQ V2 — Design System (DESIGN.md)

**Design System Name:** Modern Parchment
**Version:** 2.0
**Last Updated:** May 2025

---

## Brand Identity

ManhwaQ V2 menggunakan aesthetic **Rugged / Tactile** — seperti dokumen bersejarah bertemu dengan interface moden. Setiap elemen rasa seperti "dicetak" di atas kertas, bukan floating dalam digital space.

**Personality:** Grounded, vintage, authoritative, tactile
**Feel:** Printed broadsheet meets modern web app

---

## Color Palette

### Primary Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#455859` | Headings, nav active, primary buttons |
| Primary Container | `#5d7071` | Hover states, secondary elements |
| Secondary | `#78583a` | CTAs, accent buttons, badges |
| Secondary Container | `#fed2ac` | Warm highlights |

### Surface Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#fcf9f8` | Page background (Parchment) |
| Surface | `#ffffff` | Cards, modals, inputs |
| Surface Low | `#f6f3f2` | Subtle backgrounds |
| Surface Container | `#f0eded` | Sidebar, panels |
| Surface High | `#eae7e7` | Hover backgrounds |

### Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| On Surface | `#1b1c1c` | Body text (Carbon Black) |
| On Surface Variant | `#424848` | Secondary text |
| Outline | `#727878` | Subtle borders, placeholders |
| Outline Variant | `#c2c8c7` | Dividers |

### Semantic Colors
| Usage | Hex |
|-------|-----|
| Border (ALL elements) | `#000000` |
| Error | `#ba1a1a` |
| Success | `#2d6a4f` |

---

## Typography

### Fonts
```css
font-display: 'Hanken Grotesk'  /* Headlines */
font-sans:    'Inter'           /* Body, labels */
```

### Scale
| Style | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| Display | Hanken Grotesk | 64px | 800 | Hero headers |
| Headline LG | Hanken Grotesk | 40px | 800 | Page titles |
| Headline MD | Hanken Grotesk | 24px | 700 | Section headers |
| Headline SM | Hanken Grotesk | 20px | 700 | Card titles |
| Body LG | Inter | 18px | 400 | Long-form text |
| Body MD | Inter | 16px | 400 | Standard body |
| Label Bold | Inter | 14px | 700 | Buttons, chips |
| Label SM | Inter | 12px | 700 | Tags, badges |
| Caption | Inter | 10px | 700 | Timestamps, meta |

### Typography Rules
- Semua interactive labels (buttons, chips) → UPPERCASE + bold
- Headlines → Hanken Grotesk, tightened letter spacing
- Body → Inter, generous line height (1.5-1.6)
- Jangan mix fonts selain yang ditetapkan

---

## Spacing System

Base unit: **8px**

| Token | Size | Usage |
|-------|------|-------|
| xs | 4px | Tight gaps |
| sm | 12px | Small padding |
| md | 24px | Standard padding |
| lg | 48px | Section spacing |
| xl | 80px | Hero spacing |
| gutter | 24px | Grid gutter |
| margin-mobile | 16px | Mobile edge |
| margin-desktop | 64px | Desktop edge |

---

## Elevation & Depth

ManhwaQ TIDAK guna soft shadows atau blurs. Depth dikomunikasikan melalui:

### Hard Shadows (Offset Shadows)
```css
/* Small — inputs, chips */
shadow-[2px_2px_0px_0px_#000]

/* Default — buttons, small cards */
shadow-[4px_4px_0px_0px_#000]

/* Large — featured cards, modals */
shadow-[8px_8px_0px_0px_#000]

/* Sidebar */
shadow-[4px_0_0_0_#000]
```

### Hover Interaction (Press Effect)
```css
hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]
active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
```

---

## Border System

- **Weight:** Semua borders guna `2px solid #000000`
- **Style:** Solid untuk containers, `border-dashed` untuk dividers
- **Radius:** Max `1rem` (16px) untuk containers — jangan lebih

```css
/* Standard border */
border-2 border-black

/* Divider */
border-b-2 border-dashed border-black/20

/* Subtle */
border border-black/10
```

---

## Component Library

### Button — Primary
```jsx
<button className="px-6 py-2.5 bg-[#455859] text-white font-bold border-2 border-black 
  shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] 
  hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider">
  Button Text
</button>
```

### Button — Secondary (CTA)
```jsx
<button className="px-6 py-2.5 bg-[#8b5e3c] text-white font-bold border-2 border-black 
  shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] 
  hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all">
  Button Text
</button>
```

### Button — Ghost
```jsx
<button className="px-4 py-1.5 bg-white text-[#455859] font-bold border-2 border-black 
  shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] 
  hover:shadow-[1px_1px_0px_0px_#000] transition-all">
  Button Text
</button>
```

### Card — Standard
```jsx
<div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
  {/* Card content */}
</div>
```

### Card — Compact
```jsx
<div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000]">
  {/* Card content */}
</div>
```

### Input — Text
```jsx
<input className="bg-white border-2 border-black px-4 py-1.5 text-sm 
  focus:outline-none shadow-[2px_2px_0px_0px_#000] 
  focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_#000] 
  transition-all" />
```

### Badge — Primary
```jsx
<span className="px-2 py-1 bg-[#455859] text-white text-[10px] font-bold 
  border border-black uppercase tracking-wider">
  Badge
</span>
```

### Badge — Secondary
```jsx
<span className="px-2 py-1 bg-[#8b5e3c] text-white text-[10px] font-bold 
  border border-black uppercase tracking-wider">
  Badge
</span>
```

### Progress Bar
```jsx
<div className="h-12 border-2 border-black bg-white overflow-hidden relative">
  <div className="absolute inset-0 bg-[#455859]/10 border-r-2 border-black transition-all"
    style={{ width: `${percent}%` }} />
  <div className="absolute inset-0 flex items-center justify-between px-4">
    <span className="font-bold text-sm">{label}</span>
    <span className="font-black text-sm">{percent}%</span>
  </div>
</div>
```

---

## Layout System

### Grid
- Desktop: 12-column, max-width 1280px, gutter 24px
- Mobile: 4-column, margin 16px

### Breakpoints (Tailwind)
```
sm: 640px
md: 768px   ← Desktop layout starts here
lg: 1024px
xl: 1280px  ← Max layout width
```

### Shell Layout
```jsx
<div className="min-h-screen bg-[#fcf9f8] text-[#455859] font-sans">
  <Sidebar />  {/* 256px fixed left, desktop only */}
  <div className="md:ml-64 flex flex-col min-h-screen">
    <Header />  {/* 64px sticky top */}
    <main className="flex-grow p-6 w-full max-w-7xl mx-auto">
      {children}
    </main>
  </div>
</div>
```

---

## Page Header Pattern

Semua pages guna pattern yang sama:
```jsx
<div className="flex justify-between items-end pb-4 border-b-2 border-black/10">
  <div>
    <h2 className="text-4xl font-black tracking-tight text-[#455859]">Page Title</h2>
    <p className="text-sm text-[#455859]/60 mt-1 font-medium">Subtitle</p>
  </div>
  <div className="flex space-x-2">
    {/* Action buttons */}
  </div>
</div>
```

---

## Animation

- Guna `animate-in fade-in duration-700` untuk page entry
- Guna `transition-all` untuk hover states
- Guna `duration-500` untuk icon transitions
- Jangan guna animations yang terlalu dramatic

---

## Dark Mode

Dark mode akan ditambah dalam Phase 2 (Settings feature).
Untuk sekarang, semua UI adalah light mode sahaja.

---

## Accessibility

- Semua interactive elements mesti ada `focus:outline-none` dengan visible focus indicator
- Minimum contrast ratio: 4.5:1 untuk normal text
- Semua images mesti ada `alt` attribute
- Semua buttons mesti ada descriptive text atau `aria-label`

---

## Icon System

Guna **Material Icons** (Google Fonts):
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
```

```jsx
<span className="material-icons text-sm">{icon_name}</span>
```
