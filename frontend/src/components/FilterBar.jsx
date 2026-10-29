import React from 'react';
import { Filter, Search, RotateCcw, Calendar, SlidersHorizontal, MapPin, ArrowUpDown, X } from 'lucide-react';

const FILTER_CONFIG = {
  entertainment: {
    catLabel: 'Platform:',
    catOptions: ['All', 'Instagram', 'YouTube', 'Snapchat', 'X', 'Netflix', 'Spotify'],
    subLabel: 'Genre:',
    subOptions: ['All', 'Action', 'Comedy', 'Drama', 'Music', 'Tech Review', 'Vlog']
  },
  education: {
    catLabel: 'Subject:',
    catOptions: ['All', 'Python', 'Java', 'Data Structures', 'Database Management Systems', 'Web Development', 'Cloud Computing', 'Cybersecurity', 'Artificial Intelligence'],
    subLabel: 'Department:',
    subOptions: ['All', 'Computer Science', 'Information Technology', 'Electronics & Comm', 'Data Science', 'AI & ML']
  },
  news: {
    catLabel: 'Category:',
    catOptions: ['All', 'Technology', 'Sports', 'Business', 'World', 'Entertainment', 'Education', 'Politics', 'Science'],
    subLabel: 'Author:',
    subOptions: ['All', 'Sarah Jenkins', 'Alex Rivera', 'David Chen', 'Emily Watson', 'Michael Brown', 'Priya Sharma']
  },
  sports: {
    catLabel: 'Sport:',
    catOptions: ['All', 'Cricket', 'Football', 'Tennis', 'Basketball', 'Formula 1', 'Badminton'],
    subLabel: 'Tournament:',
    subOptions: ['All', 'IPL 2026', 'Premier League', 'Wimbledon', 'NBA Finals', 'Grand Prix', 'World Cup']
  },
  ecommerce: {
    catLabel: 'Category:',
    catOptions: ['All', 'Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Beauty & Care', 'Sports Gear'],
    subLabel: 'Brand:',
    subOptions: ['All', 'Apple', 'Nike', 'Sony', 'Adidas', 'Samsung', 'Puma', 'Logitech', "L'Oreal"]
  },
  technology: {
    catLabel: 'Topic:',
    catOptions: ['All', 'Python', 'Java', 'React', 'Artificial Intelligence', 'Cloud Computing', 'Cybersecurity', 'Data Analytics', 'DevOps'],
    subLabel: 'Level:',
    subOptions: ['All', 'Beginner', 'Intermediate', 'Advanced']
  },
  social_media: {
    catLabel: 'Platform:',
    catOptions: ['All', 'Instagram', 'YouTube', 'Snapchat', 'X', 'LinkedIn', 'TikTok'],
    subLabel: 'Post Format:',
    subOptions: ['All', 'Reel', 'Carousel', 'Story', 'Text Post', 'Infographic', 'Short Video']
  }
};

const REGION_OPTIONS = ['All', 'North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'];

export default function FilterBar({ filters, setFilters, selectedDomain }) {
  const domainCfg = FILTER_CONFIG[selectedDomain] || FILTER_CONFIG.entertainment;

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      category: 'All',
      sub_filter: 'All',
      region: 'All',
      sort_by: 'date_desc',
      start_date: '',
      end_date: '',
      search: '',
    });
  };

  const handlePresetDate = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);

    const format = (d) => d.toISOString().split('T')[0];
    setFilters((prev) => ({
      ...prev,
      start_date: format(start),
      end_date: format(end)
    }));
  };

  return (
    <div className="filter-bar-container">
      <div className="filter-bar-row">
        {/* Filter Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontWeight: 800, fontSize: '0.85rem' }}>
          <SlidersHorizontal size={17} />
          <span>ADVANCED FILTERS:</span>
        </div>

        {/* Primary Category Filter */}
        <div className="filter-group">
          <label className="filter-label">{domainCfg.catLabel}</label>
          <select
            className="select-input"
            value={filters.category || 'All'}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            {domainCfg.catOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Secondary Sub-Filter */}
        <div className="filter-group">
          <label className="filter-label">{domainCfg.subLabel}</label>
          <select
            className="select-input"
            value={filters.sub_filter || 'All'}
            onChange={(e) => handleChange('sub_filter', e.target.value)}
          >
            {domainCfg.subOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Region Filter */}
        <div className="filter-group">
          <label className="filter-label"><MapPin size={13} /> Region:</label>
          <select
            className="select-input"
            value={filters.region || 'All'}
            onChange={(e) => handleChange('region', e.target.value)}
          >
            {REGION_OPTIONS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="filter-group">
          <label className="filter-label"><ArrowUpDown size={13} /> Sort By:</label>
          <select
            className="select-input"
            value={filters.sort_by || 'date_desc'}
            onChange={(e) => handleChange('sort_by', e.target.value)}
          >
            <option value="date_desc">Date: Newest First</option>
            <option value="metric_high">Highest Metric First</option>
            <option value="metric_low">Lowest Metric First</option>
          </select>
        </div>
      </div>

      <div className="filter-bar-row" style={{ marginTop: '0.75rem' }}>
        {/* Date Filters & Presets */}
        <div className="filter-group">
          <label className="filter-label"><Calendar size={13} /> Date Range:</label>
          <input
            type="date"
            className="select-input"
            style={{ padding: '0.4rem 0.5rem', fontSize: '0.8rem' }}
            value={filters.start_date || ''}
            onChange={(e) => handleChange('start_date', e.target.value)}
          />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>to</span>
          <input
            type="date"
            className="select-input"
            style={{ padding: '0.4rem 0.5rem', fontSize: '0.8rem' }}
            value={filters.end_date || ''}
            onChange={(e) => handleChange('end_date', e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button onClick={() => handlePresetDate(30)} className="btn btn-preset">Last 30D</button>
          <button onClick={() => handlePresetDate(90)} className="btn btn-preset">Last 90D</button>
        </div>

        {/* Quick Search */}
        <div className="filter-group" style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="text-input"
              style={{ width: '100%', paddingLeft: '2rem', paddingRight: filters.search ? '2rem' : '0.9rem' }}
              placeholder={`Search ${selectedDomain} records...`}
              value={filters.search || ''}
              onChange={(e) => handleChange('search', e.target.value)}
            />
            {filters.search && (
              <button 
                onClick={() => handleChange('search', '')}
                style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="btn btn-secondary"
          style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
          title="Reset all filters to default"
        >
          <RotateCcw size={14} />
          <span>Reset All</span>
        </button>
      </div>
    </div>
  );
}
