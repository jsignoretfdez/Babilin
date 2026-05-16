---
name: Sky Blue Serenity
colors:
  surface: '#faf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#faf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f0'
  surface-container: '#efeeea'
  surface-container-high: '#e9e8e4'
  surface-container-highest: '#e3e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#42474c'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f2f1ed'
  outline: '#73787c'
  outline-variant: '#c2c7cc'
  surface-tint: '#486173'
  primary: '#486173'
  on-primary: '#ffffff'
  primary-container: '#bed9ee'
  on-primary-container: '#465f71'
  inverse-primary: '#afcadf'
  secondary: '#7e5449'
  on-secondary: '#ffffff'
  secondary-container: '#fdc5b6'
  on-secondary-container: '#794f44'
  tertiary: '#506351'
  on-tertiary: '#ffffff'
  tertiary-container: '#c5dbc4'
  on-tertiary-container: '#4d614f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cbe6fb'
  primary-fixed-dim: '#afcadf'
  on-primary-fixed: '#011e2e'
  on-primary-fixed-variant: '#304a5b'
  secondary-fixed: '#ffdbd1'
  secondary-fixed-dim: '#f1baac'
  on-secondary-fixed: '#30130b'
  on-secondary-fixed-variant: '#633d33'
  tertiary-fixed: '#d2e8d1'
  tertiary-fixed-dim: '#b7ccb6'
  on-tertiary-fixed: '#0e1f11'
  on-tertiary-fixed-variant: '#384b3a'
  background: '#faf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e3e2df'
typography:
  headline-lg:
    fontFamily: Quicksand
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Quicksand
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
  headline-sm:
    fontFamily: Quicksand
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Quicksand
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Quicksand
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Quicksand
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  max-width: 1280px
---

## Brand & Style

This design system is built to evoke a sense of weightlessness, calm, and approachable clarity. Targeted at lifestyle, wellness, and casual social platforms, it prioritizes a "Sky Blue Serenity" aesthetic that feels as expansive and soothing as a clear morning. 

The design style is a blend of **Soft Minimalism** and **Glassmorphism**. It utilizes a palette of airy pastels to create a non-intrusive interface that recedes to let user content shine. The emotional response is one of safety, optimism, and gentle guidance, avoiding the harshness of high-contrast corporate systems in favor of a dreamy, tactile softness.

## Colors

The palette is anchored by **Sky Blue** (#BED9EE), serving as the primary brand touchpoint for actions and key highlights. This is complemented by a "Dusty Coral" (#E9B3A5) for warm accents and "Mint" (#D2E8D1) for success states or secondary decorative elements. 

The background is a warm "Cream" (#FDFCF8), providing a softer foundation than pure white. Text should primarily use a deep slate grey rather than true black to maintain the low-contrast, serene atmosphere. UI elements should utilize semi-transparent versions of these pastels to allow for layered depth.

## Typography

The design system exclusively uses **Quicksand** for its rounded, geometric letterforms that mirror the soft UI shapes. 

Headlines utilize a heavier weight (700) with slight negative letter-spacing to create a distinctive brand voice. Body text is kept airy with generous line heights to ensure readability against pastel backgrounds. Labels and small metadata should use Medium or SemiBold weights to maintain legibility despite their smaller scale.

## Layout & Spacing

The system employs a **Fluid Grid** with generous white space to prevent visual clutter. 

- **Desktop:** 12-column grid with 24px gutters and 48px outer margins. Content is capped at a max-width of 1280px.
- **Tablet:** 8-column grid with 24px gutters and 32px outer margins.
- **Mobile:** 4-column grid with 16px gutters and 16px outer margins.

Spacing follows an 8px base unit. Component internal padding should be spacious (e.g., 16px or 24px) to reinforce the relaxed, "breathable" nature of the design.

## Elevation & Depth

Depth is achieved through **Soft Ambient Shadows** and **Glassmorphism**, rather than high-contrast borders. 

Higher elevation levels (like modals or floating action buttons) use very large, diffused shadows tinted with the primary Sky Blue color (#BED9EE) at 10-15% opacity. Standard cards use a subtle "white-on-cream" elevation, where a 1px white inner border helps the element pop from the cream background. Surface-level containers should use backdrop blurs (10px-20px) when overlapping other content to maintain the ethereal, sky-like quality.

## Shapes

The shape language is consistently **Rounded**. All standard UI containers (inputs, cards, buttons) use a base radius of 0.5rem (8px). 

Larger containers like modals or hero sections use "rounded-xl" (1.5rem/24px) to emphasize the soft, approachable nature of the system. Icons should follow this logic, utilizing rounded end-caps and soft corners to ensure visual harmony with the typography and components.

## Components

- **Buttons:** Primary buttons use a solid Sky Blue fill with white text. Secondary buttons use a Sky Blue ghost style (border-only) or a subtle Mint fill for a softer alternative.
- **Cards:** Cards feature a white background with a very soft Sky Blue shadow. Avoid heavy borders; use a 1px stroke in a slightly darker cream or very pale blue only if necessary.
- **Inputs:** Text fields use a light Sky Blue tint for the background (5-10% opacity) with a 2px rounded corner. Focus states should transition to a solid 2px Sky Blue border.
- **Chips/Tags:** Use the Mint and Dusty Coral pastels for tags, keeping the text a darker version of the fill color to maintain readability while appearing "soft."
- **Lists:** List items are separated by generous vertical spacing rather than horizontal dividers. If dividers are required, use a 1px "Cream Darker" line.
- **Checkboxes/Radios:** These should be fully rounded (pill-shaped for checkboxes) and use the Sky Blue for active states.