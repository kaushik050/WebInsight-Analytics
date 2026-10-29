import React from 'react';
import { 
  BarChart3, 
  GitCompare, 
  Database, 
  BookOpen, 
  Layers 
} from 'lucide-react';

export default function Sidebar({ activePage, setActivePage }) {
  const navItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: BarChart3, badge: 'Main' },
    { id: 'comparisons', label: 'Comparative Analysis', icon: GitCompare, badge: 'Insights' },
    { id: 'explorer', label: 'Data Explorer', icon: Database },
    { id: 'reports', label: 'Reports & About', icon: BookOpen },
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '1.5rem 1rem',
      userSelect: 'none',
      flexShrink: 0
    }}>
      <div>
        {/* Brand Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', marginBottom: '1.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            color: '#fff',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <Layers size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              Web<span style={{ color: 'var(--accent-primary)' }}>Insight</span>
            </h1>
            <p style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Domain Analytics Platform
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div style={{ 
            fontSize: '0.7rem', 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            letterSpacing: '0.08em', 
            color: 'var(--text-muted)', 
            padding: '0.5rem 0.75rem 0.25rem' 
          }}>
            Analytics Portal
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: isActive ? 'var(--gradient-primary)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    padding: '0.15rem 0.45rem',
                    borderRadius: 'var(--radius-full)',
                    background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(99, 102, 241, 0.15)',
                    color: isActive ? '#ffffff' : 'var(--accent-primary)',
                    fontWeight: 700
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Info */}
      <div style={{ padding: '0.75rem 0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>WebInsight Analytics v2.0</div>
        <div>Multi-Domain B.Tech System</div>
      </div>
    </aside>
  );
}
