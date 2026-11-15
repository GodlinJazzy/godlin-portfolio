# Godlin R E - Personal Portfolio Website

A modern, premium, responsive personal portfolio website engineered for **Godlin R E**, 2nd-year B.Tech CSE (Artificial Intelligence & Machine Learning) student at Jain University, Bengaluru, India.

---

## 🌟 Visual & Design Highlights

- **Aesthetic**: Futuristic dark theme with deep obsidian black (`#080914`), navy blue (`#0f172a`), and cosmic purple/indigo gradients.
- **Glassmorphism**: Translucent cards with `backdrop-filter: blur(16px)` and glowing neon borders.
- **Interactive AI Neural Background**: Real-time HTML5 Canvas particle network simulating synaptic connections with cursor interactivity.
- **Micro-Interactions**: Shimmer buttons, floating ambient gradient orbs, and dynamic typing header.
- **Responsiveness**: 100% fluid layout optimized for mobile screens, tablets, laptops, and ultra-wide displays.
- **Zero Heavy Dependencies**: Zero build tools or npm installation required. Fast, clean, accessible, and runs instantly in any browser.

---

## 🗂️ Project Structure

```text
godlin-portfolio/
│
├── index.html                   # Primary HTML5 structure (SEO & semantic tags)
├── README.md                    # Project documentation & deployment guide
│
├── styles/
│   ├── style.css                # Master design system, dark gradients & glassmorphism
│   └── animations.css           # Keyframe animations, glowing orbs & modal transitions
│
├── js/
│   ├── main.js                  # Navigation, scroll-spy, modals, form & copy-email logic
│   ├── particles.js             # Canvas neural network constellation background
│   ├── projects-data.js         # Modular projects data repository (easy to add/edit)
│   └── certifications-data.js   # Modular certifications repository (editable placeholders)
│
└── assets/
    ├── favicon.svg              # Custom AI hexagonal node brand favicon
    ├── ai-avatar.svg            # Custom holographic neural sphere graphic
    └── resume.pdf               # (Drop your resume PDF here)
```

---

## 🚀 How to Run & Preview Locally

### Option 1: Direct Browser Launch (Instant)
Simply navigate to `C:\Users\godlin\.gemini\antigravity\scratch\godlin-portfolio\` and double-click `index.html` to open it in Chrome, Edge, Brave, or Firefox.

### Option 2: Local HTTP Server
If you prefer running a local server:
- **VS Code**: Install the "Live Server" extension and click "Go Live" at the bottom right.
- **Python**: Run `python -m http.server 8000` in the directory and visit `http://localhost:8000`.
- **Node/npx**: Run `npx serve .`

---

## 🛠️ How to Customize & Add Content

### 1. Adding or Editing Projects
Open `js/projects-data.js`. You will find an array of project objects:
```javascript
{
  id: "my-new-project",
  title: "My New AI Project",
  category: "ai-ml", // Options: "ai-ml", "algorithms", "software", "web"
  categoryName: "AI & Deep Learning",
  featured: true,
  description: "Brief summary for the card...",
  longDescription: "Detailed overview shown in the detail popup modal...",
  technologies: ["Python", "PyTorch", "NumPy"],
  highlights: [
    "Feature or benchmark achievement 1",
    "Feature or benchmark achievement 2"
  ],
  githubUrl: "https://github.com/your-username/repo-name",
  liveDemoUrl: "#"
}
```
Just add your new object to the list, and it will immediately appear in the portfolio with category filtering!

### 2. Updating Certifications
Open `js/certifications-data.js`. Replace the placeholder items with your verified certifications from Coursera, DeepLearning.AI, Udemy, HackerRank, etc.

### 3. Adding Your Resume PDF
1. Save your completed resume as `resume.pdf`.
2. Move it into the `assets/` folder (`assets/resume.pdf`).
3. If you want direct download, update the link in `index.html` or `js/main.js` to point to `assets/resume.pdf`.

### 4. Updating Social Media Links
In `index.html`, find the `hero-social-strip` and `contact-grid` sections to add your specific LinkedIn profile handle, GitHub username, LeetCode profile, or Kaggle URL.

---

## 🌐 Free 1-Click Deployment

You can host this website online for free with your own custom URL:

### Deploy to GitHub Pages (Recommended):
1. Create a new repository on GitHub named `portfolio` or `godlin-portfolio`.
2. Upload or push all files in this folder to the repository.
3. Go to **Settings** > **Pages** in your repository.
4. Set the branch to `main` and root `/`, then click **Save**.
5. Your portfolio will be live at `https://<your-username>.github.io/<repo-name>/`.

### Deploy to Vercel or Netlify:
- Simply drag-and-drop the `godlin-portfolio` folder into [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on [Vercel](https://vercel.com).
- Deployment completes in less than 30 seconds with automatic SSL and global CDN!

---

## 📄 License & Attribution
Designed and built for **Godlin R E**. Free to adapt, enhance, and deploy.
