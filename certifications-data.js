/**
 * ====================================================================
 * GODLIN R E - CERTIFICATIONS & COURSEWORK DATA
 * ====================================================================
 * Place your verified courses, certifications, and technical credentials here.
 * As instructed, these are structured placeholders ready for your direct links.
 * Simply edit or add items to the certificationsData array.
 * ====================================================================
 */

const certificationsData = [
  {
    id: "cert-ai-foundations",
    title: "Artificial Intelligence & Deep Learning Specialization",
    issuer: "Online Certification / Platform Placeholder",
    issuerCategory: "Artificial Intelligence",
    date: "Pursuing / 2026",
    status: "In Progress / Ready to Update",
    description: "Foundational training covering neural network architectures, backpropagation, convolutional networks, and deep learning workflows.",
    skillsLearned: ["Neural Networks", "Deep Learning", "TensorFlow / PyTorch", "Model Evaluation"],
    credentialUrl: "#", // Replace with your certificate link
    credentialId: "PLACEHOLDER-AI-CERT-01"
  },
  {
    id: "cert-python-ml",
    title: "Machine Learning with Python & Data Science",
    issuer: "Course / Platform Placeholder (e.g., Coursera / Udemy)",
    issuerCategory: "Machine Learning",
    date: "Current Focus",
    status: "Completed / Editable Placeholder",
    description: "Hands-on implementation of supervised and unsupervised machine learning algorithms, data preprocessing, regression, classification, and clustering.",
    skillsLearned: ["Python", "Scikit-Learn", "NumPy & Pandas", "Supervised Learning"],
    credentialUrl: "#", // Replace with your certificate link
    credentialId: "PLACEHOLDER-ML-CERT-02"
  },
  {
    id: "cert-dsa-python-cpp",
    title: "Data Structures & Algorithmic Problem Solving",
    issuer: "Technical Platform / Academic Coursework",
    issuerCategory: "Computer Science Core",
    date: "Second Year B.Tech",
    status: "Active Academic Focus",
    description: "Rigorous practice of data structures including trees, graphs, heaps, dynamic programming, sorting algorithms, and time/space complexity analysis.",
    skillsLearned: ["DSA", "C++ / Java", "Time Complexity", "Competitive Programming"],
    credentialUrl: "#",
    credentialId: "PLACEHOLDER-DSA-CERT-03"
  },
  {
    id: "cert-git-software-dev",
    title: "Software Development Practices, Git & Version Control",
    issuer: "Developer Training / Open Source Curriculum",
    issuerCategory: "Software Engineering",
    date: "Foundation",
    status: "Completed / Editable Placeholder",
    description: "Version control workflows, collaborative Git branching models, pull requests, code reviews, and software engineering methodologies.",
    skillsLearned: ["Git", "GitHub", "Collaborative Workflows", "Clean Code"],
    credentialUrl: "#",
    credentialId: "PLACEHOLDER-GIT-CERT-04"
  }
];

function getCertifications() {
  return certificationsData;
}
