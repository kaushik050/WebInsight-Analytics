import React from 'react';
import DomainSelector from '../components/DomainSelector';
import ComparisonSection from '../components/ComparisonSection';
import FilterBar from '../components/FilterBar';

export default function ComparisonsPage({ filters, setFilters, selectedDomain, setSelectedDomain }) {
  return (
    <div>
      <DomainSelector selectedDomain={selectedDomain} setSelectedDomain={setSelectedDomain} />
      <FilterBar filters={filters} setFilters={setFilters} selectedDomain={selectedDomain} />

      <div style={{ marginTop: '1.5rem' }}>
        <ComparisonSection domain={selectedDomain} filters={filters} />
      </div>

      <div className="glass-card" style={{ marginTop: '1.5rem' }}>
        <h3 className="section-title">Comparative Analysis Methodology</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
          The Comparative Analysis Engine aggregates all numerical indicators across the selected dataset in PostgreSQL. 
          When comparing <strong>{selectedDomain.toUpperCase()}</strong> entities, metrics are filtered and grouped dynamically to provide an un-biased side-by-side performance evaluation.
        </p>
      </div>
    </div>
  );
}
