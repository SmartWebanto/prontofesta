# NOME CATERING - Website

A beautiful, modern catering events website built with **Tailwind CSS**, **Lucide Icons**, and vanilla JavaScript.

## 📁 Project Structure

```
eventi_sito/
├── index.html              # Main HTML file
├── assets/
│   ├── css/               # Custom stylesheets (if needed)
│   ├── js/                # Custom JavaScript files (if needed)
│   └── images/            # Local images (currently using Unsplash)
└── README.md
```

## 🚀 Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Animations** - Scroll reveal effects and transitions
- **Gallery Filtering** - Filter events by category (Kids, 18th, Events)
- **Testimonials Carousel** - Auto-rotating customer reviews
- **Contact Form** - Preventivo request form with validation
- **Mobile Menu** - Hamburger menu for smaller screens
- **WhatsApp Integration** - Floating WhatsApp button
- **Modern Typography** - Google Fonts (Nunito)
- **Icon System** - Lucide Icons for beautiful SVG icons

## 🎨 Color Scheme

- **Cipria** (#F8E1E7) - Soft pink
- **Polvere** (#D4E5ED) - Light blue
- **Burro** (#FFF3CD) - Soft yellow
- **Menta** (#D4EDDA) - Light green
- **Nero** (#1A1A1A) - Dark black

## 📋 Sections

1. **Navigation** - Fixed header with menu and mobile toggle
2. **Hero** - Eye-catching banner with CTAs
3. **Services** - Three main service cards (Kids, 18th, Events)
4. **Gallery** - Filterable image gallery
5. **Process** - 4-step workflow explanation
6. **Testimonials** - Customer reviews carousel
7. **Contact** - Form and contact information
8. **WhatsApp Button** - Floating action button

## 🔧 Customization

### Update Business Info
Edit these sections in `index.html`:
- Company name (top navigation)
- Contact details (footer section)
- WhatsApp link (floating button)
- Address and phone number

### Update Images
Replace Unsplash image URLs with your own:
- Hero gallery cards
- Main gallery items

### Modify Colors
Update Tailwind config in the `<script>` tag to change the color palette.

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 💻 Running Locally

1. Open `index.html` in your browser directly, or
2. Use a local server:
   ```bash
   # With Python 3
   python -m http.server 8000
   
   # With Node.js
   npx http-server
   ```

3. Visit `http://localhost:8000`

## 📦 Dependencies

- **Tailwind CSS** - CDN (no installation needed)
- **Google Fonts** - Nunito family
- **Lucide Icons** - Icon library via CDN

All dependencies are loaded via CDN, so no npm install required!

## 🔐 Form Handling

The contact form currently has a placeholder `action="#"`. To make it functional:
- Connect to a backend service (PHP, Node.js, etc.)
- Use a service like Formspree, Basin, or Netlify Forms
- Implement email notifications

## 📝 License

Created for catering and event planning businesses. Feel free to customize!

---

**Last Updated:** January 2026
