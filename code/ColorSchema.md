# 🎨 Color System — Dark Violet

The official color palette for the project, designed around a dark violet aesthetic with vibrant purple accents and clear semantic colors.

## Core Theme — Dark Violet

### 1. Base Colors

| Color | Hex | Purpose |
|---|---|---|
| Background | `#080711` | Main application background |
| Surface | `#100E1B` | Secondary surfaces and sections |
| Card | `#171326` | Cards, panels and containers |
| Border | `#29213D` | Borders, dividers and outlines |

### 2. Brand Colors

| Color | Hex | Purpose |
|---|---|---|
| Primary | `#8B5CF6` | Primary buttons and main actions |
| Secondary | `#A78BFA` | Secondary actions and highlights |
| Accent | `#C084FC` | Special highlights and decorative elements |

### 3. Text Colors

| Color | Hex | Purpose |
|---|---|---|
| Foreground | `#F8FAFC` | Primary text and headings |
| Muted | `#9893A8` | Secondary text, descriptions and placeholders |

### 4. Semantic Colors

| Color | Hex | Purpose |
|---|---|---|
| Success | `#34D399` | Successful operations and positive states |
| Warning | `#FBBF24` | Warnings and attention indicators |
| Danger | `#FB7185` | Errors, destructive actions and critical states |

---

## CSS Variables

```css
:root {
  /* Base */
  --background: #080711;
  --surface: #100E1B;
  --card: #171326;
  --border: #29213D;

  /* Brand */
  --primary: #8B5CF6;
  --secondary: #A78BFA;
  --accent: #C084FC;

  /* Text */
  --foreground: #F8FAFC;
  --muted: #9893A8;

  /* Semantic */
  --success: #34D399;
  --warning: #FBBF24;
  --danger: #FB7185;
}
```

## Design Guidelines

- **Background:** Use the darkest shade as the foundation of the interface.
- **Surfaces:** Use subtle violet differences to establish visual hierarchy.
- **Primary:** Reserve vibrant purple for important actions and interactive elements.
- **Accent:** Use sparingly for emphasis and visual distinction.
- **Foreground:** Maintain strong contrast for readable content.
- **Semantic:** Keep success, warning and danger colors consistent throughout the application.

## Theme Identity

**Theme:** Dark Violet  
**Mode:** Dark  
**Style:** Modern · Minimal · Developer-focused  
**Primary Hue:** Violet / Purple

---

*This palette is the single source of truth for the project's visual color system. Components and pages should reference these tokens instead of introducing arbitrary colors.*