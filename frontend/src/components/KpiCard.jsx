import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function KpiCard({ title, value, icon: Icon, color, unit = '', subtext = 'Total Metric' }) {
  return (
    <div className="glass-card kpi-card">
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        <div className="kpi-icon" style={{ background: `${color}15`, color: color }}>
          <Icon size={22} />
        </div>
      </div>
      <div className="kpi-value">
        {typeof value === 'number' ? value.toLocaleString() : value}
        {unit && <span style={{ fontSize: '1rem', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>{unit}</span>}
      </div>
      <div className="kpi-footer">
        <span className="badge-positive">
          <TrendingUp size={12} /> Live Real-time
        </span>
        <span>{subtext}</span>
      </div>
    </div>
  );
}
