---
name: Modern Parchment
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#424848'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0ef'
  outline: '#727878'
  outline-variant: '#c2c8c7'
  surface-tint: '#4f6263'
  primary: '#455859'
  on-primary: '#ffffff'
  primary-container: '#5d7071'
  on-primary-container: '#dff3f4'
  inverse-primary: '#b6cacb'
  secondary: '#78583a'
  on-secondary: '#ffffff'
  secondary-container: '#fed2ac'
  on-secondary-container: '#79593a'
  tertiary: '#674f44'
  on-tertiary: '#ffffff'
  tertiary-container: '#81675b'
  on-tertiary-container: '#ffebe3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e6e7'
  primary-fixed-dim: '#b6cacb'
  on-primary-fixed: '#0c1e1f'
  on-primary-fixed-variant: '#384a4b'
  secondary-fixed: '#ffdcbf'
  secondary-fixed-dim: '#e9bf9a'
  on-secondary-fixed: '#2c1601'
  on-secondary-fixed-variant: '#5e4125'
  tertiary-fixed: '#fddccd'
  tertiary-fixed-dim: '#e0c0b2'
  on-tertiary-fixed: '#29170f'
  on-tertiary-fixed-variant: '#584237'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
This design system bridges the gap between historical texture and contemporary interface logic. It is defined by a **Rugged / Tactile** aesthetic that utilizes heavy paper textures, high-contrast ink-like outlines, and a muted, earthy palette. 

The personality is grounded, vintage, and authoritative, yet highly functional. It avoids the fluff of soft shadows and gradients in favor of a "printed" look where every element feels physically stamped onto the page. The target audience values authenticity and tactile feedback in a digital environment.

## Colors
The color strategy is inspired by weathered documents and industrial printing.
- **Primary (Slate Teal):** Used for primary headings and prominent structural elements. It mimics aged ink that has faded slightly over time.
- **Secondary (Warm Tan):** Reserved for interactive components like buttons and selection states. It provides a warm contrast against the cool primary tones.
- **Background (Parchment):** A textured base. In digital implementation, this should use a subtle grain or paper-fiber overlay pattern over the `#E6DED3` base.
- **Neutral (Carbon Black):** Used for high-contrast outlines and body text to ensure maximum legibility against the textured background.

## Typography
The typography system uses a "Grotesk" style to maintain a modern, clean edge amidst the rugged textures.
- **Headlines:** Use **Hanken Grotesk**. It should be set in bold or extra-bold weights to mimic the look of heavy block printing. Large display text should have slightly tightened letter spacing.
- **Body & Labels:** Use **Inter**. It provides a clinical, neutral contrast to the expressive headlines. It ensures that even on a textured background, long-form content remains highly readable.
- **Stylistic Rule:** All interactive labels (buttons, chips) should be set in Uppercase with a bold weight to enhance the "stamped" aesthetic.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy, creating a "contained" feel like a physical broadsheet or magazine. 
- **Desktop:** A 12-column grid centered in a max-width container of 1280px. Gutters are kept wide (24px) to emphasize the separation of elements.
- **Mobile:** A 4-column grid with reduced margins (16px).
- **Rhythm:** Spacing is strictly mathematical, built on an 8px base unit. Vertical rhythm should be generous to prevent the rugged UI elements from feeling cluttered.

## Elevation & Depth
In this design system, depth is communicated through **Bold Borders** and **Offset Shadows** rather than atmospheric blurs.
- **Outlines:** All interactive surfaces and containers must feature a solid 2px or 3px border in `#252525`.
- **Hard Shadows:** Instead of soft blurs, use hard-edged, 100% opacity shadows offset by 4px or 8px. This mimics the look of paper layers stacked on top of one another.
- **Tonal Layering:** Use the secondary tan color to highlight "raised" elements like active buttons or selected cards.

## Shapes
The shape language uses **Pill-shaped** containers for primary actions and buttons, which provides a friendly, modern counterpoint to the rugged, sharp-edged paper texture. 
- **Cards & Containers:** Use a "Soft" (radius 2) approach to maintain a structural, boxy feel.
- **Buttons & Chips:** Use a "Pill" (radius 3) approach. 
- **Outline Weight:** The 2px - 3px dark outline must follow the curve of the shape perfectly to maintain the high-contrast "inked" look.

## Components
- **Buttons:** Large, pill-shaped, with a `#D9B08C` fill and a 3px `#252525` border. On hover, the button should shift its offset shadow to create a "pressed" effect.
- **Cards:** Rectangular with a 2px border. Cards should use a slightly lighter version of the background or a flat white fill to stand out from the main parchment texture.
- **Inputs:** High-contrast borders with a subtle inner shadow to indicate an "indent" in the paper. Text should be left-aligned with a bold label above the field.
- **Lists:** Separated by horizontal 2px strokes that do not touch the container edges, mimicking manual underlines.
- **Interactive States:** Use the Primary Teal (#5D7071) for focus states and the Secondary Tan (#D9B08C) for active/pressed states.