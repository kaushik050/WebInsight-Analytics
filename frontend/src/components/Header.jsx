import React from 'react';
import { Sun, Moon, Download, CheckCircle2, Layers } from 'lucide-react';
import { getExportUrl } from '../services/api';

export default function Header({ activePage, theme, setTheme, filters, selectedDomain }) {
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleExport = () => {
    const url = getExportUrl({ ...filters, domain: selectedDomain });
    window.open(url, '_blank');
  };

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard': return 'Interactive Domain Dashboard';
      case 'comparisons': return 'Side-by-Side Comparative Analytics';
      case 'explorer': return 'Database Record Explorer';
      case 'reports': return 'Documentation & Academic Specifications';
      default: return 'Domain Analytics';
    }
  };

  return (
    <header style={{
      height: '70px',
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justify: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {getPageTitle()}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>Active Domain: <strong style={{ color: 'var(--accent-primary)', textTransform: 'uppercase' }}>{selectedDomain}</strong></span>
            <span>•</span>
            <span>Pandas + Flask REST API</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Live Backend Status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.35rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: 'var(--accent-emerald)',
          fontSize: '0.75rem',
          fontWeight: 600
        }}>
          <CheckCircle2 size={14} />
          <span>Backend Active</span>
        </div>

        {/* CSV Export Button */}
        <button 
          onClick={handleExport}
          className="btn btn-secondary"
          title="Export domain dataset to CSV"
          style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
        >
          <Download size={15} />
          <span>Export {selectedDomain} CSV</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-secondary"
          style={{ width: '38px', height: '38px', padding: 0 }}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={18} color="var(--accent-amber)" /> : <Moon size={18} color="var(--accent-primary)" />}
        </button>
      </div>
    </header>
  );
}
