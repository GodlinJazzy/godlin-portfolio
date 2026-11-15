/**
 * ====================================================================
 * GODLIN R E - PROJECTS DATA REPOSITORY
 * ====================================================================
 * To add, edit, or remove projects, simply modify the array below.
 * Each project item can contain:
 *  - id: Unique identifier (number or string)
 *  - title: Project title
 *  - category: "ai-ml" | "algorithms" | "software" | "web" (used for category filtering)
 *  - categoryName: Human readable category name displayed on the card
 *  - description: Short summary shown on the card
 *  - longDescription: Detailed summary shown in the project detail modal
 *  - technologies: Array of technology strings
 *  - highlights: Key algorithmic or architectural achievements
 *  - githubUrl: GitHub repository link (placeholder or real)
 *  - liveDemoUrl: Live project link (or "#" if not applicable)
 *  - featured: Boolean flag (true/false) to highlight top projects
 * ====================================================================
 */

const projectsData = [
  {
    id: "genetic-algorithm",
    title: "Genetic Algorithm Implementation",
    category: "ai-ml",
    categoryName: "AI & Optimization",
    featured: true,
    description: "An evolutionary optimization simulation modeling biological natural selection, crossover, and mutation to solve complex combinatorial search problems.",
    longDescription: "Developed an object-oriented genetic algorithm framework designed to explore optimal solutions in vast combinatorial search spaces. Implements fitness evaluation functions, roulette wheel and tournament selection strategies, uniform and single-point crossovers, and adaptive mutation rates with generational convergence telemetry.",
    technologies: ["Python", "Machine Learning", "Optimization", "NumPy", "Data Structures"],
    highlights: [
      "Customizable population size, mutation probability, and fitness threshold",
      "Real-time generational fitness tracking and convergence analytics",
      "Modular fitness architecture adaptable to TSP and knapsack problems"
    ],
    githubUrl: "https://github.com/godlin-re/genetic-algorithm-simulation", // Update with your repo link
    liveDemoUrl: "#" // Replace with demo link or keep #
  },
  {
    id: "student-marks-management",
    title: "Student Marks Management System",
    category: "software",
    categoryName: "Software & Python",
    featured: true,
    description: "A robust academic record and evaluation system developed in Python to streamline student grading, performance analytics, and statistical report generation.",
    longDescription: "Engineered an end-to-end Python-based management utility for academic record-keeping. Features structured data persistence, student performance distribution calculation, automated Grade Point Average (GPA) computation, and formatted transcript generation with comprehensive input validation.",
    technologies: ["Python", "Data Structures", "File Handling / SQL", "Algorithmic Logic"],
    highlights: [
      "Modular CRUD architecture with robust input validation and error handling",
      "Automated GPA, CGPA, and grade percentile calculation logic",
      "Structured data export capabilities for academic progress audits"
    ],
    githubUrl: "https://github.com/godlin-re/student-marks-management-python", // Update with your repo link
    liveDemoUrl: "#"
  },
  {
    id: "page-replacement-simulation",
    title: "Page Replacement Algorithm Simulation",
    category: "algorithms",
    categoryName: "Systems & Algorithms",
    featured: true,
    description: "An interactive virtual memory management simulator comparing FIFO, LRU, and Optimal page replacement policies with frame fault metrics.",
    longDescription: "Designed an algorithmic simulator representing operating system virtual memory management. The system executes and visualizes classic page replacement strategies (First-In-First-Out, Least Recently Used, and Belady's Optimal Algorithm) against simulated memory access streams to benchmark hit ratios and fault frequencies.",
    technologies: ["C++", "Python", "Operating Systems", "Memory Management", "Algorithms"],
    highlights: [
      "Comparative execution of FIFO, LRU, and Optimal algorithms side-by-side",
      "Visual memory frame allocation matrix and fault frequency graphs",
      "Insightful benchmarking of Belady's anomaly in FIFO vs stack-based LRU"
    ],
    githubUrl: "https://github.com/godlin-re/page-replacement-simulator", // Update with your repo link
    liveDemoUrl: "#"
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio Website",
    category: "web",
    categoryName: "Web Development",
    featured: true,
    description: "A sleek, responsive portfolio engineered with modern CSS, glassmorphism, dynamic canvas neural particle networks, and semantic architecture.",
    longDescription: "Architected a high-performance personal portfolio tailored for an aspiring AI/ML Engineer. Features responsive dark-mode styling with deep navy/purple gradients, custom interactive HTML5 Canvas neural network particle animation, accessible WCAG-compliant markup, and modular data management.",
    technologies: ["HTML5", "CSS3 / Modern Grid", "JavaScript (ES6+)", "Canvas API", "Glassmorphism"],
    highlights: [
      "Custom interactive neural constellation particle canvas responding to cursor movements",
      "100% responsive fluid layout optimized across mobile, tablet, and ultra-wide screens",
      "Zero-dependency, lightning-fast loading score with modern CSS glassmorphism"
    ],
    githubUrl: "https://github.com/godlin-re/godlin-portfolio", // Update with your repo link
    liveDemoUrl: "#"
  }
];

// Helper to get all projects or filtered by category
function getProjects(filter = "all") {
  if (filter === "all") return projectsData;
  return projectsData.filter(project => project.category === filter);
}

// Helper to find a specific project by id
function getProjectById(id) {
  return projectsData.find(project => project.id === id);
}
