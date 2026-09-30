export const achievementTypes = ['All', 'Course', 'Award', 'Profesional'];

export const achievementCategories = ['All', 'Backend', 'Frontend', 'AI', 'Cybersecurity', 'Cloud'];

export const achievements = [
  {
    id: 1,
    title: 'Backend Developer Internship - Parto.id',
    issuer: 'Affan Technology Indonesia',
    date: 'July 2025',
    credentialId: '196/EKS/HCLGA/ATI/VIII/2025',
    description: 'Completed an intensive backend developer internship program focusing on building resilient microservices, developing RESTful APIs, database schema optimization, and system integration for high-throughput enterprise logistics at Parto.id.',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'Redis', 'REST APIs'],
    credentialUrl: 'https://parto.id/verify/196-EKS-2025',
    image: '/certificates/cert-parto.svg',
    type: 'Profesional',
    category: 'Backend',
    color: '#16a34a',
  },
  {
    id: 2,
    title: 'Developing Back-End Apps with Node.js and Express',
    issuer: 'IBM',
    date: 'August 2024',
    credentialId: '38R7G2Q5RCHB',
    description: 'Mastered server-side JavaScript architecture with Node.js and Express framework. Built scalable backend endpoints, implemented authentication with JWT & session tokens, handled asynchronous event-driven I/O, and integrated NoSQL databases.',
    skills: ['Node.js', 'Express.js', 'JavaScript', 'JWT', 'REST APIs', 'Async/Await'],
    credentialUrl: 'https://coursera.org/verify/38R7G2Q5RCHB',
    image: '/certificates/cert-ibm.svg',
    type: 'Course',
    category: 'Backend',
    color: '#0062ff',
  },
  {
    id: 3,
    title: '1st Place — National Web Development Hackathon',
    issuer: 'Kementerian Kominfo RI',
    date: 'November 2023',
    credentialId: '196/HCK/KOMINFO/XI/2023',
    description: 'Awarded 1st Place National Champion among 120+ teams for architecting and deploying an AI-powered public service complaint routing platform that slashed citizen response times by 65%.',
    skills: ['Full-Stack', 'Next.js', 'System Design', 'AI Integration', 'Rapid Prototyping'],
    credentialUrl: 'https://kominfo.go.id/awards/hackathon-2023',
    image: '/certificates/cert-kominfo-hackathon.svg',
    type: 'Award',
    category: 'Frontend',
    color: '#d97706',
  },
];
