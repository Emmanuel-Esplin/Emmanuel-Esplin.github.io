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
  headline: 'Business Analyst · Data Engineering & Automation',
  // TODO: city, country (e.g. 'Johannesburg, South Africa')
  location: '',
  // TODO: professional email address
  email: '',
  // TODO: full LinkedIn URL
  linkedin: '',
  github: 'https://github.com/Emmanuel-Esplin',
  summary:
    'Business Analyst Intern at Fortress Real Estate Investments who started out capturing data by hand and now focuses on feature enhancements to the company\'s internal application. ' +
    'I gather requirements and lead user acceptance testing for current and upcoming features and for automation work, including the budget process, ' +
    'and help automate key Power BI reports so teams spend their time analysing data instead of preparing it. ' +
    'In my own projects I build end-to-end data pipelines, most recently an Airflow, dbt and DuckDB pipeline that takes 11.2M NYC taxi records from raw files to a Metabase dashboard. ' +
    'I believe automation and AI should help people do better work, not replace them.',
  openTo: 'Open to junior data engineering, data analyst and BI roles.',
};

export const pillars = [
  {
    title: 'Data',
    text: 'Ingestion, transformation and modelling: from staging tables to analytics-ready marts.',
  },
  {
    title: 'Automation',
    text: 'Removing manual steps so people can focus on analysis and judgement, not data preparation.',
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
  year: '2026',
  // Grouped so recruiters see the IT + business blend at a glance.
  modules: {
    'Information Systems': [
      'Advanced Systems Development',
      'Database Design and Implementation',
      'Systems Analysis and Design',
      'Software Project Management',
    ],
    'Business & Economics': [
      'Applied Microeconomics',
      'Applied Macroeconomics',
      'Financial Accounting',
      'Strategic Implementation and Control',
    ],
    Quantitative: ['Statistics', 'Econometrics', 'Applied Quantitative Modelling'],
  } as Record<string, string[]>,
};

// Most recent first. The section stays hidden while empty.
// Write each point as action + result, e.g. 'Automated monthly sales report in Python, saving 4 hours per cycle'.
export const experience: Experience[] = [
  {
    role: 'Business Analyst Intern',
    org: 'Fortress Real Estate Investments',
    period: '2024 – Present',
    points: [
      "Focus on feature enhancements to Fortress's internal application: gather requirements from business stakeholders for current and upcoming features, and translate them into technical specifications.",
      'Lead user acceptance testing (UAT) of these enhancements, validating them against business requirements before release.',
      'Train and support end users on new features to drive adoption after go-live.',
      'Defined requirements and led UAT for the automation of the budget process, significantly shortening the budget cycle and giving the business time to analyse and validate budgets before sign-off.',
      'Help automate key business reports in Power BI and validate them through UAT, so users spend their time analysing data rather than preparing it, which has surfaced and corrected historical data errors.',
    ],
  },
  {
    role: 'Data Capture Intern',
    org: 'Fortress Real Estate Investments',
    period: '2023 – 2024',
    points: ["Captured and maintained data in Fortress's internal application, keeping records accurate and complete."],
  },
];

// Optional. The section stays hidden while empty.
export const certifications: Certification[] = [];

export const skills = {
  degree: {
    label: 'Foundation · Unisa degree & Fortress',
    items: [
      'Requirements gathering',
      'User acceptance testing (UAT)',
      'Systems analysis & design',
      'Relational databases',
      'Economics',
      'Financial accounting',
      'Project management',
    ],
  },
  work: {
    label: 'Technical · used at Fortress',
    items: ['Power BI', 'SQL', 'Azure DevOps', 'Playwright CLI'],
  },
  projects: {
    label: 'Personal projects · see Projects',
    items: [
      'Python (pandas, scikit-learn, XGBoost)',
      'SQL (MySQL, PostgreSQL, DuckDB)',
      'Airflow',
      'dbt',
      'Great Expectations',
      'Metabase',
      'FastAPI',
      'Apache Spark / PySpark',
      'Delta Lake',
      'Docker',
      'GitHub Actions CI',
      'Playwright API testing (TypeScript)',
      'R',
    ],
  },
  learning: {
    label: 'Learning now',
    items: ['AWS cloud services', 'Databricks'],
  },
};
