// Curated featured repositories. Descriptions are hand-written (outcome + how);
// stars, language and last-updated are fetched from the GitHub API at build time.

const GITHUB_USER = 'Emmanuel-Esplin';

export interface Project {
  repo: string;
  title: string;
  category: 'Data Engineering' | 'Test Automation' | 'Data Modelling' | 'Analytics & ML' | 'Statistics';
  summary: string;
  highlights: string[];
  stack: string[];
  /** Also list on the printable CV. Keep to the strongest few so it stays within two pages. */
  onCv?: boolean;
  /** Shows the project as a full-width flagship card with this screenshot. */
  image?: { src: string; alt: string; width: number; height: number };
}

export interface ProjectWithStats extends Project {
  url: string;
  stars?: number;
  updated?: string;
}

export const projects: Project[] = [
  {
    repo: 'nyc-taxi-pipeline',
    title: 'NYC Taxi Data Pipeline',
    category: 'Data Engineering',
    summary: 'End-to-end batch pipeline that turns raw NYC taxi files into a tested star schema and a Metabase dashboard.',
    highlights: [
      'Loads three months of TLC data (11.2M rows) with one command; rerunning a month replaces it with identical rows',
      'Quarantines every rejected row with its reason and reconciles row counts between stages, so a mismatch fails the run',
      'Airflow schedules and backfills each month; dbt builds the star schema with 22 data tests; Great Expectations enforces a blocking data contract',
      'Publishes marts to Postgres for a Metabase dashboard defined in code, all from one docker-compose file with CI on every pull request',
    ],
    stack: ['Airflow', 'dbt', 'DuckDB', 'Great Expectations', 'Postgres', 'Metabase', 'Docker', 'GitHub Actions'],
    onCv: true,
    image: {
      src: '/projects/nyc-taxi-dashboard.png',
      alt: 'Metabase dashboard showing 8.65 million clean trips, revenue, daily trips and average trips by pickup hour',
      width: 1600,
      height: 716,
    },
  },
  {
    repo: 'portfolio-api-tests',
    title: 'Playwright API Test Suite',
    category: 'Test Automation',
    summary: 'Automated API tests for this site and the GitHub REST API that feeds its project list.',
    highlights: [
      "Checks the site's routing and security headers, and validates GitHub responses against zod schemas",
      'Bounded self-heal retries transient failures, records every heal and never hides a failed assertion',
      'Runs in CI on every pull request, plus a nightly strict run that fails if any test needed to heal',
    ],
    stack: ['Playwright', 'TypeScript', 'zod', 'GitHub Actions'],
    onCv: true,
  },
  {
    repo: 'SQL-Projects',
    title: 'Diamond Tracker & Business Databases',
    category: 'Data Modelling',
    summary: 'Relational models of real business processes, including a working web app for tracking diamonds.',
    highlights: [
      'Diamond Tracker: FastAPI app with QR labels, role-based access and an insert-only custody ledger, tested with pytest',
      'Diamond database with stored procedures, triggers, reporting views and a re-runnable CSV import of about 54,000 stones',
      'General ledger with staging and core layers, using foreign keys and CHECK constraints to protect journal entries',
      'PostgreSQL exercises on data types and COPY import and export',
    ],
    stack: ['MySQL', 'FastAPI', 'PostgreSQL', 'Data modelling'],
    onCv: true,
  },
  {
    repo: 'de-cookbook-practice',
    title: 'Spark Data Engineering Practice',
    category: 'Data Engineering',
    summary: "Batch ETL recipes worked through from Packt's Data Engineering with Databricks Cookbook, rebuilt as a tested project.",
    highlights: [
      'Ingests CSV, JSON, Parquet and XML; joins, window functions and UDFs',
      'Delta Lake tables for reliable, versioned storage',
      'Gradle multi-module build with pytest checks and GitHub Actions CI',
    ],
    stack: ['PySpark', 'Delta Lake', 'Gradle', 'pytest', 'CI'],
    onCv: true,
  },
  {
    repo: 'Python_Projects',
    title: 'Python Analytics & Automation',
    category: 'Analytics & ML',
    summary: 'Analysis and prediction scripts, plus a small PDF utility.',
    highlights: [
      'Gold price prediction comparing Lasso, random forest and XGBoost against a naive baseline',
      'Housing market analysis with pandas and seaborn, plus literary text analysis',
      'PDF payment-receipt generator with ReportLab',
    ],
    stack: ['pandas', 'scikit-learn', 'XGBoost', 'Matplotlib'],
  },
  {
    repo: 'Data_Science_Fundamentals',
    title: 'Data Science Fundamentals',
    category: 'Analytics & ML',
    summary: 'Reproducible notebooks covering NumPy, pandas and introductory machine learning.',
    highlights: [
      'HR attrition analysis in pandas: filtering, recoding and groupby comparisons',
      'k-NN, logistic regression, random forest and linear regression, evaluated against baselines',
      'CI runs every notebook and audits dependencies',
    ],
    stack: ['Python', 'NumPy', 'pandas', 'scikit-learn', 'Jupyter'],
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
