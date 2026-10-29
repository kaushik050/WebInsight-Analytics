import React, { useState, useEffect } from 'react';
import { GitCompare, ArrowRight, Award, CheckCircle } from 'lucide-react';
import { fetchComparison } from '../services/api';

const DEFAULT_ITEMS = {
  entertainment: { item1: 'Instagram', item2: 'YouTube', options: ['Instagram', 'YouTube', 'Snapchat', 'X', 'Netflix', 'Spotify'] },
  education: { item1: 'Python', item2: 'Java', options: ['Python', 'Java', 'Data Structures', 'Database Management Systems', 'Web Development', 'Cloud Computing'] },
  news: { item1: 'Technology', item2: 'Business', options: ['Technology', 'Sports', 'Business', 'World', 'Entertainment', 'Education'] },
  sports: { item1: 'Cricket', item2: 'Football', options: ['Cricket', 'Football', 'Tennis', 'Basketball'] },
  ecommerce: { item1: 'Electronics', item2: 'Clothing', options: ['Electronics', 'Clothing', 'Books', 'Home', 'Beauty', 'Sports'] },
  technology: { item1: 'Python', item2: 'React', options: ['Python', 'Java', 'React', 'Artificial Intelligence', 'Cloud Computing', 'Cybersecurity'] },
  social_media: { item1: 'Instagram', item2: 'LinkedIn', options: ['Instagram', 'YouTube', 'Snapchat', 'X', 'LinkedIn'] },
};

export default function ComparisonSection({ domain, filters }) {
  const currentConfig = DEFAULT_ITEMS[domain] || DEFAULT_ITEMS.entertainment;
  const [item1, setItem1] = useState(currentConfig.item1);
  const [item2, setItem2] = useState(currentConfig.item2);
  const [compData, setCompData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItem1(currentConfig.item1);
    setItem2(currentConfig.item2);
  }, [domain]);

  useEffect(() => {
    async function loadComp() {
      if (!item1 || !item2) return;
      setLoading(true);
      try {
        const res = await fetchComparison(domain, item1, item2, filters);
        setCompData(res);
      } catch (err) {
        console.error('Error fetching comparison data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadComp();
  }, [domain, item1, item2, filters]);

  const m1 = compData?.item1_metrics || {};
  const m2 = compData?.item2_metrics || {};

  return (
    <div className="glass-card comparison-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div className="insights-icon-glow" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>
            <GitCompare size={20} color="var(--accent-cyan)" />
          </div>
          <div>
            <h3 className="section-title" style={{ margin: 0 }}>
              Interactive Comparative Analysis
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Compare performance metrics side-by-side for {domain.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Item Selectors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <select 
            className="select-input" 
            value={item1} 
            onChange={(e) => setItem1(e.target.value)}
            style={{ borderColor: 'var(--accent-primary)', fontWeight: 600 }}
          >
            {currentConfig.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>

          <span style={{ fontWeight: 800, color: 'var(--text-muted)' }}>VS</span>

          <select 
            className="select-input" 
            value={item2} 
            onChange={(e) => setItem2(e.target.value)}
            style={{ borderColor: 'var(--accent-emerald)', fontWeight: 600 }}
          >
            {currentConfig.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading comparative analytics...</div>
      ) : (
        <div className="comp-grid">
          {/* Item 1 Card */}
          <div className="comp-item-card item1">
            <div className="comp-item-header">
              <h4>{item1}</h4>
              <span className="comp-badge primary">Primary Entity</span>
            </div>
            <div className="comp-metrics-list">
              {Object.keys(m1).slice(0, 5).map(key => (
                <div key={key} className="comp-metric-row">
                  <span className="metric-label">{key.replace(/^(sum_|avg_)/, '').replace(/_/g, ' ')}</span>
                  <span className="metric-val">{typeof m1[key] === 'number' ? m1[key].toLocaleString() : m1[key]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* VS Divider */}
          <div className="comp-divider">
            <ArrowRight size={24} color="var(--accent-cyan)" />
          </div>

          {/* Item 2 Card */}
          <div className="comp-item-card item2">
            <div className="comp-item-header">
              <h4>{item2}</h4>
              <span className="comp-badge emerald">Secondary Entity</span>
            </div>
            <div className="comp-metrics-list">
              {Object.keys(m2).slice(0, 5).map(key => (
                <div key={key} className="comp-metric-row">
                  <span className="metric-label">{key.replace(/^(sum_|avg_)/, '').replace(/_/g, ' ')}</span>
                  <span className="metric-val">{typeof m2[key] === 'number' ? m2[key].toLocaleString() : m2[key]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
