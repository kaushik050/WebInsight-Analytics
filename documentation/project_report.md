# B.Tech Major Project Documentation
## WebInsight Analytics: Interactive Domain-Based Analytics & Visualization Platform

### Abstract
Modern web analytics applications often focus on single, monolithic metrics dashboards that fail to adapt when applied across diverse industry domains such as E-Commerce, Education, or Entertainment. **WebInsight Analytics** addresses this limitation by offering a dynamic, domain-aware business intelligence engine built using Python Flask, Pandas, PostgreSQL, React.js, and Recharts. The system seamlessly switches between 7 operational domains (Entertainment, Education, News, Sports, E-Commerce, Technology, Social Media), processing local synthetic datasets without requiring external API keys.

---

### Table of Contents
1. Introduction & Objectives
2. Existing System vs. Proposed System
3. Hardware & Software Requirements
4. System Architecture & ER Diagrams
5. Database Design & Multi-Domain Schema
6. Algorithm & Analytics Calculation Engine
7. Results & Output Visualizations
8. Conclusion & Future Enhancements

---

### 1. Introduction & Objectives
- **Title**: WebInsight Analytics: Interactive Domain-Based Analytics and Visualization System
- **Core Vision**: Transform static analytics dashboards into domain-adaptive platforms capable of dynamically displaying metrics, charts, comparisons, and rule-based insights tailored to specific business domains.

---

### 2. Existing System vs Proposed System
| Feature | Existing System | Proposed WebInsight Analytics |
|---|---|---|
| Domain Flexibility | Single static dashboard | 7 Dynamic Industry Domains |
| Data Processing | Basic SQL counts | Advanced Pandas & NumPy Aggregations |
| Comparative Analysis | Not available | Head-to-Head Side-by-Side Comparison Engine |
| Automated Insights | Hard-coded static text | Backend Rule-Based Insight Generator |
| Database Engine | Single database table | 7 PostgreSQL Tables + SQLite Fail-Safe Engine |

---

### 3. Database Design
The system organizes data into 7 domain tables:
- `entertainment_analytics`
- `education_analytics`
- `news_analytics`
- `sports_analytics`
- `ecommerce_analytics`
- `technology_analytics`
- `social_media_analytics`

---

### 4. Implementation Highlights
- **Dynamic State Switching**: Frontend updates state cleanly without full browser reloads.
- **Fail-Safe Offline Guarantee**: If PostgreSQL is unavailable on presentation laptops, the system automatically uses a seeded local SQLite database.
