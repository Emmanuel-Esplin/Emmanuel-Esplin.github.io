// Curated featured repositories. Descriptions are hand-written (outcome + how);
// stars, language and last-updated are fetched from the GitHub API at build time.

const GITHUB_USER = 'Emmanuel-Esplin';

export interface Project {
  repo: string;
  title: string;
  category: 'Data Engineering' | 'Data Modelling' | 'Analytics & ML' | 'Statistics';
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface ProjectWithStats extends Project {
  url: string;
  stars?: number;
  updated?: string;
}

export const projects: Project[] = [
  {
    repo: 'de-cookbook-practice',
    title: 'Spark Data Engineering Cookbook',
    category: 'Data Engineering',
    summary: 'Batch ETL recipes for ingesting, transforming and storing data at scale.',
    highlights: [
      'Ingests CSV, JSON, Parquet and XML; joins, window functions and UDFs',
      'Delta Lake tables for reliable, versioned storage',
      'Gradle multi-module build with pytest checks and GitHub Actions CI',
    ],
    stack: ['PySpark', 'Delta Lake', 'Scala', 'Gradle', 'CI'],
  },
  {
    repo: 'SQL-Projects',
    title: 'Financial Ledger & Business Databases',
    category: 'Data Modelling',
    summary: 'Relational models that mirror real business processes.',
    highlights: [
      'General ledger modelled in staging → core → mart layers',
      'Diamond company database with stored procedures, triggers and views',
      'Bulk CSV import and PostgreSQL COPY workflows',
    ],
    stack: ['MySQL', 'PostgreSQL', 'Data modelling'],
  },
  {
    repo: 'Python_Projects',
    title: 'Python Analytics & Automation',
    category: 'Analytics & ML',
    summary: 'Market analysis and prediction scripts, plus small automation utilities.',
    highlights: [
      'Gold price prediction model with scikit-learn and XGBoost',
      'Housing market and text analysis with pandas and statistical visualisation',
      'Automated PDF payment-receipt generator with ReportLab',
    ],
    stack: ['pandas', 'scikit-learn', 'XGBoost', 'Matplotlib'],
  },
  {
    repo: 'R_Projects',
    title: 'Statistical Analysis in R',
    category: 'Statistics',
    summary: 'Statistical tests and models on sales, banking and education datasets.',
    highlights: [
      'Regression and hypothesis testing on retail sales and ATM withdrawal data',
      'Decision trees with entropy and information gain worked out by hand',
    ],
    stack: ['R', 'rpart', 'ggplot2'],
  },
  {
    repo: 'Data-engineering',
    title: 'Dockerised ETL Workspace',
    category: 'Data Engineering',
    summary: 'Reproducible, containerised environment for building ETL pipelines.',
    highlights: ['Databricks-style notebooks running locally in Docker containers'],
    stack: ['Python', 'Spark', 'Docker', 'Jupyter'],
  },
];

interface GitHubRepo {
  name: string;
  html_url: string;
  stargazers_count: number;
  pushed_at: string;
}

// Runs once at build time. If the API is unreachable or rate-limited the site
// still builds, just without the live stats.
export async function getProjects(): Promise<ProjectWithStats[]> {
  let repos: GitHubRepo[] = [];
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (res.ok) repos = await res.json();
  } catch {
    // offline build: fall through with no stats
  }

  return projects.map((p) => {
    const live = repos.find((r) => r.name === p.repo);
    return {
      ...p,
      url: live?.html_url ?? `https://github.com/${GITHUB_USER}/${p.repo}`,
      stars: live?.stargazers_count,
      updated: live?.pushed_at,
    };
  });
}
