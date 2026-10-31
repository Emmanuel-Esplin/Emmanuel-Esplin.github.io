// Single source of truth for the CV. Edit this file to update both the
// portfolio (/) and the printable CV (/cv). Leave a field empty ('' or [])
// and the site hides it rather than showing a placeholder.

export interface Experience {
  role: string;
  org: string;
  period: string;
  points: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url?: string;
}

export const profile = {
  name: 'Emmanuel Esplin',
  headline: 'Business Informatics Graduate · Data & Automation',
  // TODO: city, country (e.g. 'Johannesburg, South Africa')
  location: '',
  // TODO: professional email address
  email: '',
  // TODO: full LinkedIn URL
  linkedin: '',
  github: 'https://github.com/Emmanuel-Esplin',
  summary:
    'Business Informatics graduate who turns raw data into reliable information for business decisions. ' +
    'I build ETL pipelines in PySpark and Delta Lake, design layered SQL data models, and automate repetitive work in Python, ' +
    'grounded in the economics, finance and systems analysis I studied at Unisa.',
  openTo: 'Open to junior data engineering, data analyst and BI roles.',
};

export const pillars = [
  {
    title: 'Data',
    text: 'Ingestion, transformation and modelling: from staging tables to analytics-ready marts.',
  },
  {
    title: 'Automation',
    text: 'Pipelines, tests and CI that replace manual steps with repeatable code.',
  },
  {
    title: 'Business & Economics',
    text: 'I start from the business question and measure the result in money, risk and time.',
  },
];

export const education = {
  // TODO: confirm the exact qualification name as it appears on your certificate
  degree: 'Bachelor of Commerce in Business Informatics',
  institution: 'University of South Africa (Unisa)',
  // TODO: graduation year, e.g. '2025'
  year: '',
  // TODO: replace with your actual completed modules (names as on your academic record).
  // Grouped so recruiters see the IT + business blend at a glance.
  modules: {
    'Information Systems': [
      'Systems analysis & design',
      'Database design & SQL',
      'Programming',
      'IT project management',
    ],
    'Business & Economics': ['Economics', 'Financial accounting', 'Business management'],
    Quantitative: ['Statistics', 'Quantitative modelling'],
  } as Record<string, string[]>,
};

// TODO: add roles here (most recent first). The section stays hidden while empty.
// Write each point as action + result, e.g. 'Automated monthly sales report in Python, saving 4 hours per cycle'.
export const experience: Experience[] = [];

// Optional. The section stays hidden while empty.
export const certifications: Certification[] = [];

export const skills = {
  degree: {
    label: 'Foundation · Unisa degree',
    items: [
      'Systems analysis & design',
      'Relational databases',
      'Economics',
      'Financial accounting',
      'Statistics',
      'Project management',
    ],
  },
  selfTaught: {
    label: 'Self-driven · built in my projects',
    items: [
      'Python (pandas, scikit-learn, XGBoost)',
      'Apache Spark / PySpark',
      'Delta Lake',
      'SQL (MySQL, PostgreSQL)',
      'R',
      'Docker',
      'GitHub Actions CI',
      'Gradle / Scala',
    ],
  },
  learning: {
    label: 'Learning now',
    items: ['AWS cloud services', 'Databricks', 'Playwright test automation'],
  },
};
