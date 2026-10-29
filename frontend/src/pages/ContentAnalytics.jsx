import React, { useEffect, useState } from 'react';
import { FileText, Clock, Award, Search, ArrowUpDown } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

import FilterBar from '../components/FilterBar';
import { fetchContentAnalytics, fetchCategoryAnalytics } from '../services/api';

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6'];

export default function ContentAnalytics({ filters, setFilters }) {
  const [loading, setLoading] = useState(true);
  const [contentList, setContentList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [sortField, setSortField] = useState('avg_engagement_score');
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [cData, catData] = await Promise.all([
          fetchContentAnalytics(filters),
          fetchCategoryAnalytics(filters)
        ]);
        setContentList(cData);
        setCategoryList(catData);
      } catch (err) {
        console.error('Error loading content analytics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [filters]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const sortedContent = [...contentList].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (typeof valA === 'string') {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return sortAsc ? valA - valB : valB - valA;
  });

  const formatSeconds = (sec) => {
    if (!sec) return '0s';
    const mins = Math.floor(sec / 60);
    const remainingSec = Math.round(sec % 60);
    return mins > 0 ? `${mins}m ${remainingSec}s` : `${remainingSec}s`;
  };

  return (
    <div>
      <FilterBar filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="loader-spinner">
          <div className="spinner"></div>
          <p>Analyzing article performance metrics...</p>
        </div>
      ) : (
        <>
          <div className="grid-2col">
            {/* 6. Average Time Spent by Category (Bar chart) */}
            <div className="glass-card">
              <h3 className="section-title">
                <Clock size={18} color="var(--accent-purple)" />
                Average Time Spent by Category (seconds)
              </h3>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <BarChart data={categoryList} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis dataKey="category" stroke="var(--text-secondary)" fontSize={12} />
                    <YAxis stroke="var(--text-secondary)" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                    <Bar dataKey="avg_time_spent" name="Avg Time (sec)" fill="#8b5cf6" radius={[6, 6, 0, 0]}>
                      {categoryList.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 7. Engagement Score by Content (Bar chart) */}
            <div className="glass-card">
              <h3 className="section-title">
                <Award size={18} color="var(--accent-rose)" />
                Engagement Score Distribution (Top Articles)
              </h3>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <BarChart data={contentList.slice(0, 10)} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis dataKey="content_id" stroke="var(--text-secondary)" fontSize={11} angle={-25} textAnchor="end" />
                    <YAxis domain={[0, 100]} stroke="var(--text-secondary)" fontSize={11} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                      formatter={(val) => [`${val} / 100`, 'Engagement Score']}
                    />
                    <Bar dataKey="avg_engagement_score" fill="#f43f5e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* DETAILED CONTENT TABLE */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 className="section-title" style={{ margin: 0 }}>
                <FileText size={18} color="var(--accent-primary)" />
                Comprehensive Content Performance Directory
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Showing {sortedContent.length} articles</span>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('content_id')} style={{ cursor: 'pointer' }}>
                      ID <ArrowUpDown size={12} />
                    </th>
                    <th onClick={() => handleSort('content_title')} style={{ cursor: 'pointer' }}>
                      Article Title <ArrowUpDown size={12} />
                    </th>
                    <th onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
                      Category <ArrowUpDown size={12} />
                    </th>
                    <th onClick={() => handleSort('total_views')} style={{ cursor: 'pointer' }}>
                      Views <ArrowUpDown size={12} />
                    </th>
                    <th onClick={() => handleSort('total_likes')} style={{ cursor: 'pointer' }}>
                      Likes <ArrowUpDown size={12} />
                    </th>
                    <th onClick={() => handleSort('total_comments')} style={{ cursor: 'pointer' }}>
                      Comments <ArrowUpDown size={12} />
                    </th>
                    <th onClick={() => handleSort('total_shares')} style={{ cursor: 'pointer' }}>
                      Shares <ArrowUpDown size={12} />
                    </th>
                    <th onClick={() => handleSort('avg_time_spent')} style={{ cursor: 'pointer' }}>
                      Avg Time <ArrowUpDown size={12} />
                    </th>
                    <th onClick={() => handleSort('avg_engagement_score')} style={{ cursor: 'pointer' }}>
                      Engagement Score <ArrowUpDown size={12} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedContent.map((item) => {
                    const scoreClass = item.avg_engagement_score >= 60 ? 'score-high' : item.avg_engagement_score >= 35 ? 'score-medium' : 'score-low';
                    return (
                      <tr key={item.content_id}>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
                          {item.content_id}
                        </td>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          {item.content_title}
                        </td>
                        <td>
                          <span className={`category-badge cat-${item.category}`}>
                            {item.category}
                          </span>
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{item.total_views.toLocaleString()}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{item.total_likes.toLocaleString()}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{item.total_comments.toLocaleString()}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{item.total_shares.toLocaleString()}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{formatSeconds(item.avg_time_spent)}</td>
                        <td>
                          <span className={`score-pill ${scoreClass}`}>
                            {item.avg_engagement_score} / 100
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
