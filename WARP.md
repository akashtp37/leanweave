# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is the Leanweave company website - a static HTML/CSS/JavaScript website showcasing technology services and solutions. The project is structured as a multi-page website with service pages for different technology stacks.

## Development Commands

Since this is a static website project, there are no build tools or package managers. Development involves:

### Local Development
```powershell
# Serve the website locally using Python (if available)
python -m http.server 8000

# Or using Node.js http-server (if installed)
npx http-server . -p 8000

# Or use Live Server extension in VS Code
```

### File Operations
```powershell
# View all service pages
Get-ChildItem "*-services.html"

# Find specific technology files
Get-ChildItem "*react*" -Recurse

# Check for broken links or missing files
# Manual testing required - check browser console and network tab
```

## Architecture and Code Structure

### File Organization Pattern
The project follows a systematic naming convention:
- **Technology service pages**: `{technology}-services.html|css|js`
  - Examples: `react-services.html`, `angular-services.css`, `python-services.js`
- **Shared resources**: `style.css`, `leanweve_home_page.html`, `tech-stack.html`
- **JavaScript utilities**: `js/` directory with shared components and utilities

### Key Architectural Components

#### 1. Service Page Template System
Each technology service follows a consistent structure:
- HTML: Contains service descriptions, mega menu navigation, and technology-specific content
- CSS: Technology-specific styling that extends the base `style.css`
- JS: Page-specific interactions and animations

#### 2. Shared Component Library
Located in `js/shared-components.js`:
- **LeanWeaveUtils namespace**: Centralized utilities to reduce code duplication
- **Mega menu management**: Standardized navigation behavior across all pages
- **Reusable UI components**: Common functionality shared across service pages

#### 3. CSS Architecture
- **Root variables**: Consistent color scheme and typography defined in `:root` of `style.css`
- **Font system**: Uses Cabin (headings), Inter (paragraphs), and Poppins fonts
- **Component-based styling**: Each service page extends base styles with specific overrides

#### 4. Navigation System
- **Mega menu**: Complex dropdown navigation showcasing all technology services
- **Category-based organization**: Frontend, Backend, and Mobile service groupings
- **Dynamic content loading**: Uses `js/includes.js` for content injection

### Technology Stack Coverage
The website covers comprehensive technology services:
- **Frontend**: Angular, React, Vue, general frontend development
- **Backend**: Node.js, Python, Java, PHP, Ruby, Golang, .NET, Scala
- **Systems**: C/C++, Rust
- **Mobile**: Dedicated mobile app services

### File Relationships
- All service pages reference the shared `style.css` and their specific CSS file
- Navigation mega menu is consistent across all pages, linking to all service offerings
- JavaScript utilities in `js/` directory provide shared functionality
- Logo and asset references use relative paths to maintain portability

### Development Patterns
1. **Consistent service page structure**: Each service page follows the same HTML structure template
2. **Modular CSS**: Base styles in `style.css`, specific overrides in individual CSS files
3. **Progressive enhancement**: Core content works without JavaScript, enhanced with interactive features
4. **Responsive design**: Mobile-first approach with CSS Grid and Flexbox layouts

## Important Context for Development

### When Adding New Services
1. Follow the naming convention: `{technology}-services.html|css|js`
2. Update the mega menu navigation in all existing pages to include the new service
3. Ensure the service page follows the established HTML structure template
4. Add CSS variables and consistent styling patterns

### When Modifying Navigation
The mega menu system is replicated across all HTML files. Changes to navigation require updates to:
- `leanweve_home_page.html`
- `tech-stack.html`
- All `*-services.html` files

### Asset Management
- Logo files are in `logos/leanweave_logo/` directory
- Images are in various subdirectories
- All paths use relative references for portability

### Code Consistency
- Use the established CSS custom properties for colors and fonts
- Follow the LeanWeaveUtils namespace pattern for new JavaScript utilities
- Maintain consistent indentation and code style across files