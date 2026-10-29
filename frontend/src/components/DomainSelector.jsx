import React from 'react';
import { 
  Tv, 
  GraduationCap, 
  Newspaper, 
  Trophy, 
  ShoppingBag, 
  Cpu, 
  Share2 
} from 'lucide-react';

export const DOMAINS = [
  { id: 'entertainment', label: 'Entertainment', icon: Tv, color: '#f43f5e', sub: 'YouTube & Stream Analytics' },
  { id: 'education', label: 'Education', icon: GraduationCap, color: '#6366f1', sub: 'Students, Marks & Attendance' },
  { id: 'news', label: 'News', icon: Newspaper, color: '#06b6d4', sub: 'Articles & Reader Sentiment' },
  { id: 'sports', label: 'Sports', icon: Trophy, color: '#f59e0b', sub: 'Matches & Fan Viewership' },
  { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingBag, color: '#10b981', sub: 'Sales, Cart & Conversion' },
  { id: 'technology', label: 'Technology', icon: Cpu, color: '#8b5cf6', sub: 'Tech Topics & Code Samples' },
  { id: 'social_media', label: 'Social Media', icon: Share2, color: '#ec4899', sub: 'Followers & Channel Reach' },
];

export default function DomainSelector({ selectedDomain, setSelectedDomain }) {
  return (
    <div className="domain-selector-container">
      <div className="domain-selector-header">
        <span className="domain-badge-title">ANALYTICS DOMAIN PORTAL:</span>
        <span className="domain-badge-sub">Switch domain to dynamically update metrics, charts, comparisons, and dataset records</span>
      </div>

      <div className="domain-grid">
        {DOMAINS.map((domain) => {
          const Icon = domain.icon;
          const isActive = selectedDomain === domain.id;
          return (
            <button
              key={domain.id}
              onClick={() => setSelectedDomain(domain.id)}
              className={`domain-card ${isActive ? 'active' : ''}`}
              style={{
                '--domain-color': domain.color
              }}
              title={`${domain.label}: ${domain.sub}`}
            >
              <div className="domain-card-icon">
                <Icon size={18} />
              </div>
              <div className="domain-card-info">
                <span className="domain-card-name">{domain.label}</span>
                <span className="domain-card-desc">{domain.sub}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
