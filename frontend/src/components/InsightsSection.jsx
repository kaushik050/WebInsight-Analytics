import React from 'react';
import { Sparkles, Lightbulb, Zap } from 'lucide-react';

export default function InsightsSection({ insights, domain }) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="glass-card insights-card">
      <div className="insights-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div className="insights-icon-glow">
            <Sparkles size={20} color="var(--accent-amber)" />
          </div>
          <div>
            <h3 className="section-title" style={{ margin: 0 }}>
              Automated Analytics Insights
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Real-time rule-based insights calculated from dataset statistics for {domain.toUpperCase()}
            </span>
          </div>
        </div>

        <span className="insights-badge">
          <Zap size={13} />
          Rule-Based Engine Active
        </span>
      </div>

      <div className="insights-list">
        {insights.map((insight, idx) => (
          <div key={idx} className="insight-item">
            <div className="insight-bullet">
              <Lightbulb size={15} color="var(--accent-primary)" />
            </div>
            <p className="insight-text">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
