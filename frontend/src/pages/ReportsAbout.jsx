import React from 'react';
import { BookOpen, Layers, Printer, Award, Code2, Database } from 'lucide-react';

export default function ReportsAbout() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="glass-card" style={{ background: 'var(--gradient-primary)', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
              WebInsight Analytics & Visualization System
            </h2>
            <p style={{ margin: '0.4rem 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
              Academic Documentation & Platform System Architecture Specifications
            </p>
          </div>
          <button 
            onClick={handlePrint}
            className="btn"
            style={{ backgroundColor: '#ffffff', color: 'var(--accent-primary)', fontWeight: 700 }}
          >
            <Printer size={16} />
            <span>Print Report / Save PDF</span>
          </button>
        </div>
      </div>

      {/* 1. PROJECT ABSTRACT & OBJECTIVES */}
      <div className="glass-card">
        <h3 className="section-title">
          <BookOpen size={18} color="var(--accent-primary)" />
          1. Project Abstract & Objectives
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.7 }}>
          <strong>WebInsight Analytics</strong> is an interactive, domain-driven business intelligence and visualization platform designed to evaluate web content engagement across 7 distinct operational domains: <em>Entertainment, Education, News, Sports, E-Commerce, Technology, and Social Media</em>. 
          The platform dynamically re-renders KPIs, custom Recharts graphs, comparative analyses, and rule-based insights without requiring browser page reloads.
        </p>
      </div>

      {/* 2. MATHEMATICAL FORMULAS */}
      <div className="glass-card">
        <h3 className="section-title">
          <Award size={18} color="var(--accent-emerald)" />
          2. Transparent Engagement & Performance Formulas
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ color: 'var(--accent-emerald)', marginTop: 0 }}>Engagement Rate Formula</h4>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', background: 'var(--bg-primary)', padding: '0.75rem', borderRadius: '6px', margin: '0.5rem 0' }}>
              Engagement Rate (%) = [ (Likes + Comments + Shares) / Total Views ] × 100
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Calculated dynamically in Python Pandas, handling zero view division safely. Bounded between 0.00% and 100.00%.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ color: 'var(--accent-cyan)', marginTop: 0 }}>E-Commerce Conversion Rate</h4>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', background: 'var(--bg-primary)', padding: '0.75rem', borderRadius: '6px', margin: '0.5rem 0' }}>
              Conversion Rate (%) = [ Total Purchases / Total Product Views ] × 100
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Measures storefront efficiency in converting traffic into paid customer orders.
            </p>
          </div>
        </div>
      </div>

      {/* 3. SYSTEM ARCHITECTURE & TECH STACK */}
      <div className="glass-card">
        <h3 className="section-title">
          <Layers size={18} color="var(--accent-purple)" />
          3. Multi-Domain Architecture & Tech Stack
        </h3>
        <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.6 }}>
          Synthetic Datasets (1,000 records / domain) → Pandas & NumPy Data Processing → PostgreSQL Database (or SQLite Fallback) → Python Flask REST API → React.js + Vite + Recharts UI
        </div>
      </div>

      {/* 4. KEY TECHNICAL CONCEPTS Q&A */}
      <div className="glass-card">
        <h3 className="section-title">
          <Code2 size={18} color="var(--accent-amber)" />
          4. Platform Reference Guide & Key Concepts
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Q: How does domain switching work without page reload?</strong>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.4rem 0 0 0' }}>
              A: React state maintains the active domain. Changing domain triggers an asynchronous REST API call (`/api/analytics/domain-summary?domain=...`), which fetches PostgreSQL metrics and dynamically updates Recharts state.
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Q: How are insights generated without external AI APIs?</strong>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.4rem 0 0 0' }}>
              A: Rule-based Python logic in `DomainAnalyticsService` evaluates statistical boundaries (highest engagement, attendance vs mark correlations, top revenue categories) and builds clear analytical insight statements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
