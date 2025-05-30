# STATmize - Smart Sports Wearable Platform

STATmize is a modern, animated, responsive landing website for a smart sports wearable feedback and coaching platform. The website introduces the product, explains its vision, highlights features, and provides contact information.

## Features

- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Animated Elements**: Scroll animations, parallax effects, counters
- **Testimonial Slider**: Showcase customer experiences
- **Contact Information**: Direct contact details with email (Gmail integration) and phone links
- **PWA Support**: For app-like experience on mobile devices
- **SEO Optimized**: With proper meta tags and sitemap

## Project Structure

```
statmize/
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── main.js            # JavaScript functionality
├── images/                # All image assets
├── videos/                # Video assets and placeholders
├── index.html            # Main landing page
├── 404.html              # Custom 404 error page
├── manifest.json         # PWA manifest file
├── sw.js                # Service worker for PWA
├── robots.txt           # For search engines
├── sitemap.xml          # XML sitemap for SEO
└── .htaccess            # Apache server configurations
```

## Technologies Used

- HTML5, CSS3, JavaScript (Vanilla)
- CSS Grid and Flexbox for layouts
- CSS Custom Properties for theming
- IntersectionObserver API for scroll animations
- Service Worker API for offline capabilities

## Getting Started

1. Clone the repository
   git clone https://github.com/yourusername/statmize.git
2. Navigate to project directory:
   cd statmize
4. Open index.html in your browser
6. For development, use a local server like Live Server for VS Code

## Customization

### Changing Colors

The color scheme can be modified in the `css/style.css` file in the `:root` section:

```css
:root {
    --primary-color: #3481ed;     /* Light Blue */
    --secondary-color: #00ff7b;   /* Neon Green */
    --background-color: #ffffff;  /* White (Light Mode) */
    --text-color: #121b2e;        /* Dark Blue (Text) */
    /* Additional variables... */
}
```

### Adding New Sections

To add a new section:

1. Create the HTML structure in index.html
2. Add corresponding CSS in style.css
3. Add any required JavaScript functionality in main.js

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

© 2025 STATmize. All rights reserved.

Contact
For inquiries about STATmize:

Email: info@statmize.com
Website: statmize.com
---
