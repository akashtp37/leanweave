# Leanweave Page Creation Guide

## Overview
This guide explains how to create new service pages for the Leanweave website using our established patterns and components.

## Current Architecture

### File Structure Pattern
Each service page follows this consistent structure:
```
Services/
├── [service-name].html      # Main HTML structure
├── [service-name].css       # Page-specific styles
└── [service-name].js        # Page-specific JavaScript
```

### Core Dependencies
- `../style.css` - Global styles and CSS variables
- `../js/shared-components.js` - Reusable JavaScript utilities
- `../js/mega-menu.js` - Navigation functionality
- `../js/logo-handler.js` - Logo management

## Step-by-Step Page Creation Process

### 1. HTML Structure Template

Create a new HTML file following this template:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Service Name] Services - Leanweave</title>
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="[service-name].css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;600;700&family=Inter:wght@400;500;600&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>

<body>
    <!-- Header Section (Copy from existing page) -->
    <header class="main-header">
        <!-- Navigation with mega menu -->
    </header>

    <!-- Hero Section -->
    <section class="hero-section">
        <div class="hero-container">
            <div class="hero-content">
                <h1 class="hero-title">
                    <span class="word">[Service Name]</span><br>
                    <span class="word">Services</span>
                </h1>
                <p class="hero-subtitle">
                    [Service description and value proposition]
                </p>
                <div class="hero-buttons">
                    <a href="#contact" class="btn btn--primary">Talk to an Expert</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Statistics Section -->
    <section class="statistics-section">
        <div class="statistics-grid">
            <div class="stat-card">
                <div class="stat-number">[Number]+</div>
                <div class="stat-label">[Metric description]</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">[Number]+</div>
                <div class="stat-label">[Metric description]</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">[Number]</div>
                <div class="stat-label">[Metric description]</div>
            </div>
        </div>
    </section>

    <!-- Process Section -->
    <section class="lw-process-section">
        <div class="container">
            <div class="services-header">
                <h2>[How we deliver section title]</h2>
                <p>[Process description]</p>
            </div>
            <ol class="process-grid">
                <li class="process-card">
                    <h3>1. [Step Title]</h3>
                    <p>[Step description]</p>
                </li>
                <li class="process-card">
                    <h3>2. [Step Title]</h3>
                    <p>[Step description]</p>
                </li>
                <!-- Add more steps as needed -->
            </ol>
        </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="techset" id="tech-stack">
        <div class="container">
            <div class="techset__header">
                <h2>Tech stack for [service] projects</h2>
                <p>[Tech stack description]</p>
            </div>
            <div class="techset__tabs" role="tablist" aria-label="Tech Tabs">
                <button class="techset__tab active" role="tab" aria-selected="true" aria-controls="panel-category1" id="tab-category1">[Category 1]</button>
                <button class="techset__tab" role="tab" aria-selected="false" aria-controls="panel-category2" id="tab-category2">[Category 2]</button>
            </div>
            <div class="techset__panel active" role="tabpanel" id="panel-category1" aria-labelledby="tab-category1">
                <div class="tech-grid">
                    <div class="tech-item">
                        <div class="tech-icon">[IC]</div>
                        <h3>[Technology Name]</h3>
                        <p>[Technology description]</p>
                    </div>
                    <!-- Add more technologies -->
                </div>
            </div>
            <div class="techset__panel" role="tabpanel" id="panel-category2" aria-labelledby="tab-category2">
                <div class="tech-grid">
                    <div class="tech-item">
                        <div class="tech-icon">[IC]</div>
                        <h3>[Technology Name]</h3>
                        <p>[Technology description]</p>
                    </div>
                    <!-- Add more technologies -->
                </div>
            </div>
        </div>
    </section>

    <!-- Client Logos Section -->
    <section class="clients">
        <div class="container">
            <div class="section-header">
                <h3>Trusted by leading companies</h3>
            </div>
            <div class="clients__logos">
                <img src="../logos/Trusted by leading companies logos/Ceph.svg" alt="Ceph Logo">
                <img src="../logos/Trusted by leading companies logos/Matha_Hospital.svg" alt="Matha Hospital Logo">
                <img src="../logos/Trusted by leading companies logos/Tata Steel.svg" alt="Tata Steel Logo">
                <img src="../logos/Trusted by leading companies logos/Nestle-Logo.svg" alt="Nestle Logo">
                <img src="../logos/Trusted by leading companies logos/pirelli-logo.svg" alt="Pirelli Logo">
            </div>
        </div>
    </section>

    <!-- Footer Section (Copy from existing page) -->
    <footer id="contact" class="main-footer">
        <!-- Footer content -->
    </footer>

    <!-- Scripts -->
    <script src="https://unpkg.com/lenis@1.3.11/dist/lenis.min.js"></script>
    <script src="../script.js"></script>
    <script src="../js/shared-components.js"></script>
    <script src="../js/logo-handler.js"></script>
    <script src="../js/mega-menu.js"></script>
    <script src="[service-name].js"></script>
</body>

</html>
```

### 2. CSS Structure Template

Create a CSS file with this structure:

```css
@import url('../style.css');

/* Scoped styles for [Service Name] page */

.hero-section {
    min-height: 60vh;
    background:
        radial-gradient(ellipse at top left, #ff4500 0%, transparent 60%),
        radial-gradient(ellipse at bottom right, #ff8c00 0%, transparent 60%),
        linear-gradient(135deg, #1a1a1a 0%, #2d1b0e 50%, #1a1a1a 100%);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 5% 0 5%;
    overflow: hidden;
}

.hero-title .word:nth-child(2) {
    background: linear-gradient(45deg, #ff6b35, #ff8c00, #ffa500);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.statistics-grid { 
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%), 
                radial-gradient(circle at 20% 80%, rgba(255, 107, 53, .08) 0%, transparent 50%), 
                radial-gradient(circle at 80% 20%, rgba(255, 140, 0, .08) 0%, transparent 50%); 
}

.services-header h2::after { 
    background: linear-gradient(90deg, #ff6b35, #ff8c00); 
}

/* Tech icons tint for [service] page */
.tech-icon { 
    background: var(--primary-color); 
}

@media (max-width: 968px) {
    .hero-section { 
        min-height: 70vh; 
        padding: 80px 2rem 2rem 2rem; 
    }
}

/* --- [Service Name] page: extended section styles --- */
.hero-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    gap: 4rem;
    z-index: 2;
    position: relative;
}

.hero-content {
    flex: 1;
    max-width: 600px;
}

.hero-title {
    font-family: 'Cabin', sans-serif;
    font-size: clamp(3rem, 7vw, 5rem);
    font-weight: 800;
    color: white;
    line-height: 1.05;
    margin-bottom: 1rem;
    position: relative;
}

.hero-title .word {
    display: inline-block;
    animation: titleReveal 1.2s ease-out forwards;
    opacity: 0;
    transform: translateY(100px);
}

@keyframes titleReveal {
    to { opacity: 1; transform: translateY(0); }
}

.hero-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: clamp(1rem, 1.8vw, 1.2rem);
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.6;
    margin-bottom: 2rem;
    font-weight: 500;
}

.hero-buttons { 
    display: flex; 
    gap: 1rem; 
    align-items: center; 
}

.statistics-section { 
    padding: 64px; 
}

.statistics-grid {
    color: var(--light-color);
    padding: 5rem 0;
    border-radius: 30px;
    border: 1px solid #eee;
    display: flex;
    justify-content: space-around;
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
    background:
        linear-gradient(135deg, #f8fafc 0%, #ffffff 100%),
        radial-gradient(circle at 20% 80%, rgba(0, 82, 204, .08) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(20, 184, 166, .08) 0%, transparent 50%);
}

.stat-number { 
    font-family: 'Cabin', sans-serif; 
    font-size: 3.5rem; 
    font-weight: 600; 
    color: var(--primary-color); 
    margin-bottom: .5rem; 
    line-height: 1; 
}

.stat-label { 
    font-family: 'Inter', sans-serif; 
    color: #000; 
    font-size: 1rem; 
    font-weight: 500; 
}

.lw-process-section {
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%), 
                radial-gradient(circle at 20% 80%, rgba(255, 107, 53, .05) 0%, transparent 50%), 
                radial-gradient(circle at 80% 20%, rgba(255, 140, 0, .05) 0%, transparent 50%);
    padding: 8rem 2rem;
    position: relative;
    overflow: hidden;
}

.lw-process-section::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, #ff6b35, #ff8c00, transparent);
}

.lw-process-section::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.2), transparent);
}

.process-grid {
    counter-reset: step;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.25rem;
    margin-top: 2rem;
    list-style: none;
    padding: 0;
}

.process-card {
    background: #fff;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, .06);
    transition: all .3s ease;
    position: relative;
    overflow: hidden;
}

.process-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff6b35, #ff8c00);
    opacity: 0;
    transition: opacity .3s ease;
}

.process-card:hover { 
    transform: translateY(-6px); 
    box-shadow: 0 14px 32px rgba(0, 0, 0, .12); 
    border-color: var(--primary-color); 
}

.process-card:hover::before { 
    opacity: 1; 
}

.process-card h3 {
    font-family: 'Cabin', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-color);
    margin-bottom: .5rem;
}

.process-card p { 
    font-family: 'Inter', sans-serif; 
    color: #555; 
    line-height: 1.6; 
}

.services-header { 
    text-align: center; 
    margin-bottom: 3rem; 
    position: relative; 
    padding-bottom: 1rem; 
}

.services-header h2 { 
    font-family: 'Cabin', sans-serif; 
    font-size: 2.5rem; 
    font-weight: 800; 
    color: var(--text-color); 
    margin-bottom: 1rem; 
    position: relative; 
}

.services-header h2::after { 
    content: ''; 
    position: absolute; 
    bottom: -10px; 
    left: 50%; 
    transform: translateX(-50%); 
    width: 60px; 
    height: 4px; 
    background: linear-gradient(90deg, #ff6b35, #ff8c00); 
    border-radius: 2px; 
}

.services-header p { 
    font-family: 'Inter', sans-serif; 
    max-width: 800px; 
    margin: 0 auto; 
    color: #666; 
    line-height: 1.6; 
}

@media (max-width: 968px) {
    .hero-container { 
        flex-direction: column; 
        text-align: center; 
        gap: 2rem; 
    }
    .hero-content { 
        max-width: 100%; 
    }
}
```

### 3. JavaScript Structure Template

Create a JavaScript file with this structure:

```javascript
// [Service Name] Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('[Service Name] page initialized');

    // Tech stack tabs behavior
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.techset__tab'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('.techset__panel'));

    function activateTab(tabId) {
        var targetPanelId = tabId === 'tab-category1' ? 'panel-category1' : 'panel-category2';
        tabs.forEach(function(t){ 
            t.classList.toggle('active', t.id === tabId); 
            t.setAttribute('aria-selected', t.id === tabId ? 'true' : 'false'); 
        });
        panels.forEach(function(p){ 
            p.classList.toggle('active', p.id === targetPanelId); 
        });
    }

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() { 
            activateTab(tab.id); 
        });
    });

    // Add any service-specific functionality here
});
```

## Content Guidelines

### Hero Section Content
- **Title**: Use the service name + "Services"
- **Subtitle**: 1-2 sentences describing the service value proposition
- **CTA Button**: Always "Talk to an Expert"

### Statistics Section
- Use 3 key metrics that build credibility
- Format: Number + descriptive label
- Examples: "80+ Database specialists", "120+ delivered projects", "24/7 Support"

### Process Section
- Use 4-6 steps maximum
- Each step should have a clear title and description
- Focus on your methodology and approach

### Tech Stack Section
- Organize technologies into 2-3 categories
- Use 2-letter abbreviations for tech icons
- Keep descriptions concise (1 sentence)

## File Naming Conventions

### HTML Files
- Use kebab-case: `ai-services.html`, `mobile-development.html`
- Place in `Services/` directory

### CSS Files
- Match HTML filename: `ai-services.css`
- Import global styles first: `@import url('../style.css');`

### JavaScript Files
- Match HTML filename: `ai-services.js`
- Include console log for debugging

## Required Sections Checklist

- [ ] Header with navigation
- [ ] Hero section with title, subtitle, and CTA
- [ ] Statistics section (3 metrics)
- [ ] Process section (4-6 steps)
- [ ] Tech stack section with tabs
- [ ] Client logos section
- [ ] Footer with contact CTA
- [ ] All required scripts included

## Common Patterns

### Color Scheme
- Primary: `#ff6b35` (orange)
- Secondary: `#ff8c00` (darker orange)
- Background: Dark gradients for hero, light for content

### Typography
- Headings: 'Cabin' font family
- Body text: 'Inter' font family
- Font weights: 400, 500, 600, 700

### Animations
- Hero title words animate in with `titleReveal` keyframe
- Process cards have hover effects
- Smooth transitions on interactive elements

## Testing Checklist

- [ ] Page loads without errors
- [ ] Navigation works correctly
- [ ] Tech stack tabs function properly
- [ ] Responsive design works on mobile
- [ ] All links are functional
- [ ] Images load correctly
- [ ] Console shows no JavaScript errors

## Maintenance

### Updating Content
1. Edit the HTML file for text changes
2. Update CSS for styling changes
3. Modify JavaScript for functionality changes
4. Test all changes across devices

### Adding New Technologies
1. Add to appropriate tech stack category
2. Create 2-letter icon abbreviation
3. Write concise description
4. Test tab switching functionality

## Best Practices

1. **Consistency**: Follow the established patterns exactly
2. **Performance**: Optimize images and minimize custom CSS
3. **Accessibility**: Use proper ARIA labels and semantic HTML
4. **SEO**: Include relevant keywords in titles and descriptions
5. **Mobile-first**: Ensure responsive design works on all devices

## Troubleshooting

### Common Issues
- **Navigation not working**: Check mega-menu.js is included
- **Styles not applying**: Verify CSS import path is correct
- **Tabs not switching**: Ensure JavaScript event listeners are set up
- **Mobile layout broken**: Check responsive CSS media queries

### Debug Steps
1. Open browser developer tools
2. Check console for JavaScript errors
3. Verify all file paths are correct
4. Test on different screen sizes
5. Validate HTML structure

---

This guide provides a complete framework for creating consistent, high-quality service pages that maintain the Leanweave brand and user experience standards.







