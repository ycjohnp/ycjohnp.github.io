# Yik Chun (John) Peng — Portfolio Website

> Personal engineering portfolio website of **Yik Chun (John) Peng**, Electrical & Computer Engineering student at the University of Southern California (USC).
> Built at the intersection of **Embedded Systems**, **Robotics**, and **AI**.

---

## ⚡ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [GitHub Pages](https://pages.github.com/) via GitHub Actions

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
The output will be placed in the `dist/` directory, optimized and ready for static hosting.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📦 Project Structure

```
├── .github/workflows/deploy.yml  # Automated GitHub Actions workflow for GitHub Pages
├── public/                       # Static assets & favicon
├── src/
│   ├── components/               # UI Components
│   │   ├── Navbar.jsx            # Fixed header with mobile drawer & quick links
│   │   ├── Hero.jsx              # Hero section with interactive telemetry HUD
│   │   ├── Stats.jsx             # Key impact metrics & core engineering pillars
│   │   ├── Experience.jsx        # Career & research timeline with filter pills
│   │   ├── Projects.jsx          # Project showcase with category filters
│   │   ├── ProjectModal.jsx      # Deep-dive specs & multimedia modal
│   │   ├── Skills.jsx            # Interactive categorized skills matrix + search
│   │   ├── Education.jsx         # USC degree, GPA, coursework & leadership
│   │   ├── InteractiveTerminal.jsx # Embedded RTOS CLI emulator
│   │   ├── ResumeModal.jsx       # Formatted resume view & PDF print export
│   │   ├── Contact.jsx           # Direct contact channels & email form
│   │   └── Footer.jsx            # Footer navigation & copyright
│   ├── data/
│   │   ├── portfolioData.js      # Structured portfolio data & project specs
│   │   └── resumeData.js         # Plain text & printable resume data
│   ├── App.jsx                   # Root application layout
│   ├── index.css                 # Global styling & Tailwind directives
│   └── main.jsx                  # React DOM root entry
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 📬 Contact & Links

- **Email**: [johnpeng@usc.edu](mailto:johnpeng@usc.edu)
- **LinkedIn**: [linkedin.com/in/yc-john-peng](https://linkedin.com/in/yc-john-peng)
- **GitHub**: [github.com/ycjohnp](https://github.com/ycjohnp)
- **Locations**: Los Angeles, CA | Chicago, IL
