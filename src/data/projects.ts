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
  /** Live demo or dashboard, shown as a link on the card. */
  demo?: string;
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
    repo: 'sa-property-lakehouse',
    title: 'SA Property Lakehouse',
    category: 'Data Engineering',
    summary:
      "Benchmarks how a South African landlord's retail tenants are trading, using Stats SA retail sales and SARB inflation and interest rates.",
    highlights: [
      'Splits retail sales growth by retailer type into volume and price and tests each category against CPI, so a landlord can compare its own tenants with the market',
      "Reconciled to the source: all 101 growth rates match Stats SA's August 2026 release, and the Athena marts match the local marts on all 1,907 rows",
      'One parser and one set of dbt models run locally on DuckDB and on AWS (Lambda, Spark on Glue writing Iceberg, dbt on Athena), orchestrated by Step Functions',
      'AWS infrastructure in Terraform with budget guardrails; findings published as an interactive dashboard on GitHub Pages',
    ],
    stack: ['Python', 'dbt', 'DuckDB', 'PySpark', 'AWS Glue', 'Athena', 'Iceberg', 'Step Functions', 'Terraform'],
    onCv: true,
    demo: 'https://emmanuel-esplin.github.io/sa-property-lakehouse/',
    image: {
      src: '/projects/sa-property-dashboard.png',
      alt: 'Dashboard of South African retail tenant trading: 4.3% sales growth against 3.8% CPI, with sales growth by retailer type compared with inflation',
      width: 984,
      height: 790,
    },
  },
  {
    repo: 'f1-race-analytics',
    title: 'F1 Race Analytics',
    category: 'Data Engineering',
    summary: 'Formula 1 lakehouse from 2023 onward: race winners, lap leaders, crashes, Safety Car time lost and penalties.',
    highlights: [
      'Ingests the Jolpica and OpenF1 APIs into raw JSON with retries, then typed Parquet and dbt marts for each question',
      'Custom dbt tests reconcile results against a known race and check there is exactly one leader per lap',
      'Deployed on AWS with Terraform: Lambda container on a schedule, Step Functions, and dbt on Athena with Iceberg; least-privilege IAM and IaC scanning',
      'Streamlit dashboard of standings, crashes, minutes lost, laps led and penalties',
    ],
    stack: ['Python', 'dbt', 'DuckDB', 'Athena', 'Lambda', 'Step Functions', 'Terraform', 'Streamlit'],
    onCv: true,
  },
  {
    repo: 'ai-pulse',
    title: 'AI Pulse: AI Trends Lakehouse',
    category: 'Data Engineering',
    summary:
      'Follows AI technologies week by week across Hacker News, Hugging Face and arXiv in one bronze, silver and gold lakehouse. In progress (phase 3 of 7).',
    highlights: [
      'One data model across three sources: a taxonomy of 68 technologies and their aliases links posts, models and papers to the same technology',
      'Uses Claude as a data source: batched API calls with JSON-schema outputs extract technology mentions and sentiment, and write plain-English paper digests',
      'Keeps LLM cost under control: answers are cached in bronze so nothing is sent twice, a dry run estimates cost first, and a mart reports actual spend',
      'Scores the LLM extraction against the rule-based baseline and hand-labelled data',
    ],
    stack: ['Python', 'dbt', 'DuckDB', 'Claude API', 'Amazon Bedrock', 'Parquet'],
    onCv: true,
  },
  {
    repo: 'ipl-cricket-analytics',
    title: 'IPL Cricket Analytics',
    category: 'Data Engineering',
    summary: 'Ball-by-ball lakehouse over every IPL match since 2008: team results, strike rates, leaderboards and batter-v-bowler matchups.',
    highlights: [
      'Incremental ingestion writes only new or revised matches; silver holds five typed tables, including 295k deliveries',
      "Scoring rules are tested against published records: Kohli's 973 runs in 2016, Bravo's 32 wickets in 2013 and every final from 2008 to 2026",
      'Runs locally on DuckDB and on AWS via Terraform: Lambda, Glue, Athena capped at 1 GB per query, and a daily Step Functions run with failure alerts',
    ],
    stack: ['Python', 'dbt', 'DuckDB', 'Athena', 'Lambda', 'Terraform', 'Streamlit'],
  },
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
