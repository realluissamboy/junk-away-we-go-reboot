# Design System Documentation

## 1. Overview & Creative North Star: "The Refined Industrialist"

Junk removal and demolition are traditionally viewed through a lens of grit and disorder. This design system pivots that perception, framing the service as a high-end restoration of space. Our Creative North Star, **"The Refined Industrialist,"** treats deconstruction as an art form. 

To move beyond the "template" feel of local business sites, this system rejects rigid grids in favor of **intentional asymmetry** and **high-contrast typography scales**. We utilize overlapping elements—such as a high-resolution image of a cleared architectural space bleeding behind a floating content card—to create depth. By prioritizing "The Luxury of Space" in our layouts, we visually promise the customer that same clarity in their physical environment.

---

## 2. Color Architecture

The palette transitions from the "dirty" associations of the industry toward a sophisticated, tech-forward aesthetic. We use a Material Design-inspired tonal approach to ensure the UI feels layered and tactile.

### Core Palette
*   **Primary (#006493):** The "Trust" anchor. Used for high-level branding and primary actions.
*   **Secondary (#00658b):** Provides tonal support for navigation and depth.
*   **Tertiary/Accent Green (#466800):** Represents "Clearance" and "Eco-friendly Disposal."
*   **Accent Orange (#fc610f):** Reserved strictly for urgent Call-to-Actions (CTAs) and "Book Now" prompts.

### The "No-Line" Rule
To maintain a premium editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts. For instance, a section using `surface-container-low` (#f5f3f3) should sit directly against a `surface` (#fbf9f8) background to create a soft, sophisticated transition.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
*   **Base:** `surface`
*   **Secondary Sections:** `surface-container-low`
*   **Floating Content/Cards:** `surface-container-lowest` (#ffffff)
This "nesting" creates a sense of organized depth without the visual noise of dividers.

### The "Glass & Gradient" Rule
Standard flat colors feel "out-of-the-box." To elevate the experience, apply subtle gradients (e.g., transitioning from `primary` to `primary_container`) on hero backgrounds. For floating navigation or mobile headers, use **Glassmorphism**: a semi-transparent `surface` color with a `backdrop-blur` of 12px–20px to allow background colors to bleed through, creating a "frosted glass" effect.

---

## 3. Typography: Authoritative Clarity

The typography strategy pairs the structural confidence of **Plus Jakarta Sans** with the utilitarian precision of **Work Sans**.

*   **Display & Headlines (Plus Jakarta Sans):** These are the "Editorial Voice." Use `display-lg` (3.5rem) for hero statements to command attention. The generous x-height and modern geometry of Plus Jakarta Sans convey a professional, "larger-than-life" local presence.
*   **Body & Titles (Work Sans):** Chosen for its exceptional legibility in technical contexts. `body-lg` (1rem) ensures that service descriptions are readable and transparent, reinforcing trust.
*   **Hierarchy as Identity:** By using a massive scale difference between `display-lg` and `body-md`, we create a high-fashion, editorial layout that feels curated rather than cluttered.

---

## 4. Elevation & Depth

We achieve hierarchy through **Tonal Layering** rather than traditional drop shadows or structural lines.

### The Layering Principle
Depth is achieved by stacking `surface-container` tiers. Place a `surface-container-lowest` card (Pure White) on a `surface-container-high` section to create a natural, soft lift.

### Ambient Shadows
When a component must "float" (e.g., a "Get a Quote" modal), use **Ambient Shadows**. 
*   **Blur:** 40px–60px.
*   **Opacity:** 4%–8%.
*   **Color:** Use a tinted version of `on-surface` (#1b1c1c) rather than pure black to mimic natural light.

### The "Ghost Border" Fallback
If an element requires a container but a color shift is insufficient, use a **Ghost Border**: the `outline-variant` token at 15% opacity. This provides a "suggestion" of a boundary without interrupting the visual flow.

---

## 5. Components

### Buttons: The Tactile Strike
*   **Primary:** Rounded `full` (pill-shape) or `xl` (1.5rem). Use a subtle vertical gradient of `primary` to `primary_container`.
*   **Tertiary (Text-only):** Use `primary` text with a 2px underline that appears on hover, maintaining the editorial look.
*   **States:** On hover, increase the container's tonal brightness rather than changing the color entirely.

### Cards: The Floating Canvas
*   **Style:** No borders. `surface-container-lowest` background. 
*   **Spacing:** Use `xl` (1.5rem) internal padding. 
*   **Arrangement:** Forbid divider lines. Use vertical white space from the spacing scale to separate header text from body text within the card.

### Input Fields: Minimalist Utility
*   **Style:** Use the `surface-container-high` background with a `Ghost Border`. 
*   **Focus:** Transition the border to `primary` at 100% opacity with a soft glow (ambient shadow).

### Specialized Components
*   **The "Space Recovery" Slider:** A bespoke before/after image toggle using a `tertiary` (Green) handle to show the demolition results.
*   **Service Chips:** Use `secondary-container` for category tags (e.g., "Appliance Removal") with `on-secondary-container` text. Use `sm` (0.25rem) rounded corners for a precision "label" look.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical margins (e.g., 10% left, 15% right) for hero text to create a custom, high-end feel.
*   **Do** allow images of "clean spaces" to take up 60% of the viewport to emphasize the result of the service.
*   **Do** use `tertiary_fixed_dim` for subtle background highlights behind important statistics.

### Don't:
*   **Don't** use 1px solid black borders (#000000). They are too harsh and "cheapen" the industrial aesthetic.
*   **Don't** use standard "Drop Shadows." Stick to Tonal Layering or Ambient Shadows.
*   **Don't** crowd the layout. If a section feels full, increase the `surface` padding. Space is the luxury we are selling.
*   **Don't** use center-alignment for long-form body text; keep it left-aligned to maintain the editorial "grid" feel.

---

*This design system is a living document intended to evolve with the brand's growth, ensuring Junk Away We Go Demolition Inc. remains the premier, authoritative voice in local service.*