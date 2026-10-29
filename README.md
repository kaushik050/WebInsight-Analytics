# WebInsight Analytics
## Website Content Engagement Analytics and Visualization System

WebInsight Analytics is an interactive, domain-based analytics and visualization platform designed to analyze website and digital content engagement data. It helps users understand content performance through interactive dashboards, charts, key performance indicators (KPIs), filtering, comparisons, and data-driven insights.

The system supports multiple domains, including Entertainment, Education, News, Sports, E-Commerce, Technology, and Social Media. It uses locally stored datasets and a full-stack architecture with a React frontend, Python Flask backend, and database support.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Problem Statement](#problem-statement)
3. [Objectives](#objectives)
4. [Key Features](#key-features)
5. [Supported Analytics Domains](#supported-analytics-domains)
6. [Technology Stack](#technology-stack)
7. [System Architecture](#system-architecture)
8. [Project Workflow](#project-workflow)
9. [Project Structure](#project-structure)
10. [System Requirements](#system-requirements)
11. [Installation and Setup](#installation-and-setup)
12. [Running with Docker](#running-with-docker)
13. [Database Design](#database-design)
14. [Analytics and Visualizations](#analytics-and-visualizations)
15. [Data Privacy](#data-privacy)
16. [Limitations](#limitations)
17. [Future Enhancements](#future-enhancements)
18. [Conclusion](#conclusion)
19. [Project Information](#project-information)

---

## Introduction

Digital platforms generate large amounts of content engagement data, such as views, likes, comments, shares, and time spent interacting with content.

WebInsight Analytics processes and visualizes this data to help users understand engagement patterns, compare content performance, and identify useful trends.

The application provides a centralized dashboard for exploring multiple analytics domains through a consistent interface.

The project combines frontend development, backend data processing, database management, and data visualization in a single application.

## Problem Statement

Digital content performance data can be difficult to interpret when it is stored in separate datasets or presented as raw tables.

Users may struggle to compare engagement metrics, identify trends, and understand which content performs better.

WebInsight Analytics addresses this problem by organizing engagement data into domain-specific dashboards and presenting meaningful information through interactive charts, KPIs, filters, and comparisons.

## Objectives

- Develop an interactive web-based analytics dashboard.
- Analyze engagement metrics across multiple domains.
- Provide visual representations of data using charts and graphs.
- Enable filtering and searching of content records.
- Compare engagement performance across platforms, categories, and other available attributes.
- Process datasets using Python and data analysis libraries.
- Support structured data storage using PostgreSQL or SQLite.
- Build a modular application with separate frontend and backend components.
- Provide a reproducible local development environment.
- Generate insights that help users interpret content engagement patterns.

## Key Features

### 1. Multi-Domain Analytics

Explore engagement information across seven domains using a common analytics interface.

### 2. Interactive Dashboard

Display important metrics and visual summaries in a dashboard-oriented layout.

### 3. Key Performance Indicators

Present metrics such as total views, likes, comments, shares, and engagement scores when those fields are available in the selected dataset.

### 4. Advanced Filtering

Filter and explore data using supported options, such as:

- Platform or sport
- Category or tournament
- Region
- Date range
- Selected performance metric
- Search terms

Available filters depend on the selected domain and its dataset.

### 5. Data Visualization

Use interactive charts and graphs to make patterns and comparisons easier to understand.

### 6. Content Performance Analysis

Examine content records and compare engagement metrics to identify higher- and lower-performing items.

### 7. Domain Comparisons

Compare available engagement measurements across categories, platforms, or other relevant attributes.

### 8. Data Explorer

Explore underlying records and apply filters to inspect relevant portions of the datasets.

### 9. Backend Data Processing

Use Python, Flask, Pandas, and NumPy for data handling, calculations, and analytics operations.

### 10. Database Support

Support PostgreSQL and SQLite according to the application's database configuration and implementation.

### 11. Modular Architecture

Keep the frontend, backend, database schema, and project documentation organized into separate directories.

### 12. Docker Support

Provide Dockerfiles and a Docker Compose configuration for running the application in containers.

---

## Supported Analytics Domains

| Domain | Example Analytics |
|---|---|
| Entertainment | Content views, likes, shares, and audience engagement |
| Education | Learning content engagement and participation metrics |
| News | Article views, comments, and sharing activity |
| Sports | Sport-related content and engagement comparisons |
| E-Commerce | Product content engagement and interaction metrics |
| Technology | Technology content performance and audience interactions |
| Social Media | Likes, comments, shares, views, and engagement scores |

The application uses local datasets. The domains describe the categories supported by the project; they do not imply live integration with external platforms.

## Technology Stack

### Frontend

- **React.js** — Builds the user interface.
- **Vite** — Provides frontend development and build tooling.
- **JavaScript and JSX** — Implement application logic and UI components.
- **HTML and CSS** — Structure and style the interface.
- **Recharts** — Creates charts and data visualizations.

### Backend

- **Python** — Implements data processing and application logic.
- **Flask** — Provides backend routes and API functionality.
- **Pandas** — Loads, organizes, and analyzes tabular data.
- **NumPy** — Supports numerical calculations.

### Database

- **PostgreSQL** — Relational database support.
- **SQLite** — Lightweight local database support, subject to application configuration.
- **SQL** — Used for relational data operations.

### Development and Deployment

- Git and GitHub — Version control and source code hosting.
- Docker — Containerization.
- Docker Compose — Multi-container application configuration.
- npm — Frontend package management.

---

## System Architecture

The application follows a modular, full-stack architecture.

```text
              USER
                |
                v
       REACT FRONTEND
       Vite + JavaScript
                |
                v
       FLASK BACKEND API
                |
                v
       PYTHON DATA PROCESSING
       Pandas + NumPy
                |
                v
        DATABASE / DATASETS
        PostgreSQL / SQLite
        Local CSV Files
                |
                v
       PROCESSED ANALYTICS
                |
                v
       API RESPONSE TO FRONTEND
                |
                v
       CHARTS AND DASHBOARDS
```

### Architecture Components

**Frontend:** Displays dashboards, navigation, filters, charts, and analytics pages.

**Backend:** Handles API requests, loads data, applies analytical logic, and returns processed results.

**Data processing:** Uses Python libraries to calculate metrics and prepare data for visualization.

**Database and datasets:** Store or supply the information required for analysis.

**Visualization layer:** Presents the returned data through KPIs, charts, and comparison views.

---

## Project Workflow

1. The user opens the WebInsight Analytics dashboard.
2. The user selects an analytics domain.
3. The user chooses available filters and search criteria.
4. The frontend requests relevant analytics data from the backend.
5. The backend retrieves data from the configured data source.
6. Python processing logic prepares the requested results.
7. The backend returns the results to the frontend.
8. The frontend updates the relevant charts, metrics, and tables.
9. The user explores the results and compares content performance.

---

## Project Structure

```text
Website Content Engagement Analytics and Visualization System/
│
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── requirements.txt
│   ├── Dockerfile
│   │
│   ├── data/
│   │   ├── content_engagement.csv
│   │   ├── ecommerce.csv
│   │   ├── education.csv
│   │   ├── entertainment.csv
│   │   ├── generate_data.py
│   │   ├── generate_domain_datasets.py
│   │   ├── news.csv
│   │   ├── social_media.csv
│   │   ├── sports.csv
│   │   └── technology.csv
│   │
│   ├── routes/
│   │   └── analytics.py
│   │
│   └── services/
│       ├── analytics_service.py
│       └── domain_analytics_service.py
│
├── database/
│   └── schema.sql
│
├── documentation/
│   └── project_report.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── README.md
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

The tree represents the current project organization. Individual files and subdirectories may change as development continues.

---

## System Requirements

Recommended software:

- Windows, Linux, or macOS
- Python 3
- Node.js and npm
- Git
- A modern web browser

Optional:

- Docker Desktop with Docker Compose
- PostgreSQL, if using the PostgreSQL configuration

Check your installations:

```bash
python --version
node --version
npm --version
git --version
docker --version
```

Docker commands are needed only if you choose the container-based setup.

---

## Installation and Setup

### Option 1: Run Locally

Clone the repository:

```bash
git clone https://github.com/kaushik050/WebInsight-Analytics.git
```

Open the project directory:

```bash
cd WebInsight-Analytics
```

### 1. Set Up the Backend

Open a terminal in the project root and run:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment on Windows Git Bash:

```bash
source venv/Scripts/activate
```

On Windows Command Prompt, use:

```cmd
venv\Scripts\activate
```

On Linux or macOS, use:

```bash
source venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Start the backend:

```bash
python app.py
```

The application configuration determines the backend host and port. If configured for the default project setup, the API is available at:

`http://localhost:5000`

### 2. Set Up the Frontend

Open a second terminal in the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local development URL printed by Vite. The expected default URL is:

`http://localhost:5173`

Keep both development servers running while using the application.

### 3. Database Configuration

Review the database configuration in:

- `backend/database.py`
- `database/schema.sql`
- `docker-compose.yml`

Configure the database according to the selected local or container-based setup. PostgreSQL requires a running database and matching connection settings. SQLite can be used only where the application's configuration supports it.

Do not commit passwords, database credentials, or private environment files to GitHub.

---

## Running with Docker

The project includes Dockerfiles and a Docker Compose configuration.

### Prerequisites

Install Docker Desktop or another compatible Docker environment.

Verify Docker:

```bash
docker --version
docker compose version
```

### Start the Application

Open a terminal in the project root:

```bash
docker compose up --build
```

This command builds and starts the services defined in `docker-compose.yml`.

If your installation uses the legacy Compose command, use:

```bash
docker-compose up --build
```

### Access the Application

For the default project configuration:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

These addresses depend on the port mappings in `docker-compose.yml`.

### Stop the Application

```bash
docker compose down
```

Use the same Compose command style that works with your Docker installation.

---

## Database Design

The project includes a database schema at `database/schema.sql` and database-related logic in `backend/database.py`.

The database layer is intended to support structured data access for analytics operations.

Typical information analyzed by the application includes:

- Content identifiers
- Domain or category
- Platform or content type
- Publication date, when available
- Views
- Likes
- Comments
- Shares
- Engagement measurements

The actual columns depend on the datasets and schema implemented in the project. Refer to the CSV files and SQL schema for the definitive field definitions.

---

## Analytics and Visualizations

WebInsight Analytics focuses on interpreting engagement data through interactive visualizations.

### Engagement Metrics

**Views:** Measures how many times content has been viewed, where this information is available.

**Likes:** Represents positive user interactions.

**Comments:** Measures discussion or feedback activity.

**Shares:** Represents how frequently content is shared.

**Engagement Score:** A derived measurement used to summarize engagement according to the implemented calculation.

### Example Analysis Tasks

- Identify content with high view counts.
- Compare likes and comments across categories.
- Explore engagement differences between domains.
- Filter records by region or date, where supported.
- Compare selected metrics across platforms.
- Examine patterns using charts and summary indicators.

The values and conclusions depend on the input data. Sample datasets should not be interpreted as verified real-world statistics.

---

## Data Privacy

The project is designed to work with locally stored datasets and does not require API keys for the local CSV-based analytics workflow.

Recommended practices:

- Use synthetic, public, or appropriately authorized datasets.
- Do not upload confidential personal information.
- Keep database passwords and other credentials out of source control.
- Review datasets before publishing the repository.
- Avoid committing local virtual environments, build artifacts, or unnecessary generated files.

The application does not claim to provide live analytics from Instagram, Snapchat, Twitter/X, or other external services unless such integration is implemented separately.

---

## Limitations

- Results depend on the quality and completeness of the available datasets.
- Synthetic data may not reflect real-world audience behavior.
- Live third-party platform integration is not included in the local CSV-based workflow.
- Available metrics and filters depend on the selected domain.
- Database availability depends on the chosen configuration.
- Analytics results should be interpreted in the context of the underlying data.

---

## Future Enhancements

Potential improvements include:

1. Add authenticated user accounts and role-based access.
2. Support uploading CSV files through the user interface.
3. Add additional chart types and downloadable reports.
4. Improve data validation and missing-value handling.
5. Add advanced statistical analysis and trend detection.
6. Implement scheduled data processing.
7. Add configurable date comparisons and more analytical filters.
8. Improve dashboard responsiveness and accessibility.
9. Add automated testing and continuous integration.
10. Deploy the application to a cloud hosting environment.
11. Introduce authorized external data integrations where appropriate.
12. Improve monitoring, error handling, and performance.

These are proposed enhancements and may not be present in the current implementation.

---

## Conclusion

WebInsight Analytics demonstrates how a full-stack web application can combine frontend development, backend programming, database concepts, and data visualization to analyze digital content engagement.

By organizing multiple analytics domains into one interactive interface, the project provides a foundation for exploring engagement metrics and identifying patterns in structured datasets.

The project also provides practical experience with React, Flask, Python data processing, relational databases, Docker, and Git-based collaboration.

---

## Project Information

**Project Title:** Website Content Engagement Analytics and Visualization System

**Application Name:** WebInsight Analytics

**Project Type:** Academic / Full-Stack Web Development and Data Analytics

**Frontend:** React.js, Vite, JavaScript, JSX, CSS, Recharts

**Backend:** Python, Flask, Pandas, NumPy

**Database:** PostgreSQL / SQLite, according to configuration

**Data Sources:** Local CSV datasets

**Repository:** https://github.com/kaushik050/WebInsight-Analytics



## License

No license has been specified for this project yet. Add a suitable license if you intend to permit others to reuse, modify, or distribute the code.

## Acknowledgements

This project was developed as an academic learning project to explore web development, data analytics, database integration, and interactive visualization.

Thanks to the developers and communities behind the open-source technologies used in this project.

