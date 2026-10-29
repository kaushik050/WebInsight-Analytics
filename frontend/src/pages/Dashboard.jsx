import React, { useEffect, useState } from 'react';
import { 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Clock, 
  Award, 
  BarChart2, 
  TrendingUp, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  ShoppingBag, 
  Cpu, 
  DollarSign, 
  Percent, 
  Download, 
  UserCheck 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

import DomainSelector from '../components/DomainSelector';
import FilterBar from '../components/FilterBar';
import KpiCard from '../components/KpiCard';
import InsightsSection from '../components/InsightsSection';
import ComparisonSection from '../components/ComparisonSection';
import { fetchDomainSummary } from '../services/api';

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#ec4899'];

export default function Dashboard({ filters, setFilters, selectedDomain, setSelectedDomain }) {
  const [loading, setLoading] = useState(true);
  const [domainData, setDomainData] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      try {
        const res = await fetchDomainSummary({ ...filters, domain: selectedDomain });
        setDomainData(res);
      } catch (err) {
        console.error('Error loading domain summary:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [filters, selectedDomain]);

  const kpis = domainData?.kpis || {};
  const charts = domainData?.charts || {};
  const insights = domainData?.insights || [];
  const tableData = domainData?.table || [];

  // Helper to render KPI Cards based on Domain
  const renderKpiCards = () => {
    switch (selectedDomain) {
      case 'education':
        return (
          <>
            <KpiCard title="Total Students" value={kpis.total_students || 0} icon={Users} color="#6366f1" subtext="Enrolled Candidates" />
            <KpiCard title="Avg Attendance" value={`${kpis.avg_attendance_pct || 0}%`} icon={UserCheck} color="#10b981" subtext="Classes Attended" />
            <KpiCard title="Avg Internal Marks" value={`${kpis.avg_internal_marks || 0} / 100`} icon={Award} color="#06b6d4" subtext="Exam Average" />
            <KpiCard title="Assignment Completion" value={`${kpis.assignment_completion_pct || 0}%`} icon={BookOpen} color="#f59e0b" subtext="Submitted Tasks" />
            <KpiCard title="Avg Quiz Score" value={`${kpis.avg_quiz_score || 0} / 100`} icon={GraduationCap} color="#8b5cf6" subtext="Continuous Assessment" />
            <KpiCard title="Pass Percentage" value={`${kpis.pass_percentage || 0}%`} icon={Percent} color="#f43f5e" subtext="Overall Success Rate" />
          </>
        );
      case 'news':
        return (
          <>
            <KpiCard title="Total Articles" value={kpis.total_articles || 0} icon={BookOpen} color="#06b6d4" subtext="Published Stories" />
            <KpiCard title="Total Article Views" value={(kpis.total_views || 0).toLocaleString()} icon={Eye} color="#6366f1" subtext="Reader Impressions" />
            <KpiCard title="Avg Reading Time" value={`${kpis.avg_reading_time_sec || 0}s`} icon={Clock} color="#8b5cf6" subtext="Attention Span" />
            <KpiCard title="Total Likes" value={(kpis.total_likes || 0).toLocaleString()} icon={ThumbsUp} color="#10b981" subtext="Appreciations" />
            <KpiCard title="Engagement Rate" value={`${kpis.avg_engagement_rate || 0}%`} icon={Award} color="#f43f5e" subtext="Interaction Ratio" />
            <KpiCard title="Returning Readers" value={`${kpis.returning_readers_pct || 0}%`} icon={Users} color="#f59e0b" subtext="Loyal Audience" />
          </>
        );
      case 'sports':
        return (
          <>
            <KpiCard title="Total Matches" value={kpis.total_matches || 0} icon={Trophy} color="#f59e0b" subtext="Streamed Events" />
            <KpiCard title="Total Match Views" value={(kpis.total_match_views || 0).toLocaleString()} icon={Eye} color="#6366f1" subtext="Live Viewership" />
            <KpiCard title="Top Sport" value={kpis.top_sport || 'N/A'} icon={Award} color="#10b981" subtext="Highest Popularity" />
            <KpiCard title="Top Player" value={kpis.top_player || 'N/A'} icon={Users} color="#06b6d4" subtext="Most Liked Athlete" />
            <KpiCard title="Total Likes" value={(kpis.total_likes || 0).toLocaleString()} icon={ThumbsUp} color="#ec4899" subtext="Fan Reactions" />
            <KpiCard title="Avg Watch Time" value={`${kpis.avg_watch_time_min || 0}m`} icon={Clock} color="#8b5cf6" subtext="Broadcast Engagement" />
          </>
        );
      case 'ecommerce':
        return (
          <>
            <KpiCard title="Total Products" value={kpis.total_products || 0} icon={ShoppingBag} color="#10b981" subtext="Active SKU Catalog" />
            <KpiCard title="Product Views" value={(kpis.total_product_views || 0).toLocaleString()} icon={Eye} color="#6366f1" subtext="Storefront Visits" />
            <KpiCard title="Add to Cart" value={(kpis.total_add_to_cart || 0).toLocaleString()} icon={ShoppingBag} color="#06b6d4" subtext="Cart Additions" />
            <KpiCard title="Total Purchases" value={(kpis.total_purchases || 0).toLocaleString()} icon={UserCheck} color="#f59e0b" subtext="Completed Orders" />
            <KpiCard title="Conversion Rate" value={`${kpis.conversion_rate || 0}%`} icon={Percent} color="#f43f5e" subtext="Views to Sales" />
            <KpiCard title="Total Revenue" value={`$${(kpis.total_revenue || 0).toLocaleString()}`} icon={DollarSign} color="#10b981" subtext="Gross Merchandise Value" />
          </>
        );
      case 'technology':
        return (
          <>
            <KpiCard title="Total Tech Articles" value={kpis.total_articles || 0} icon={Cpu} color="#8b5cf6" subtext="Developer Guides" />
            <KpiCard title="Total Views" value={(kpis.total_views || 0).toLocaleString()} icon={Eye} color="#6366f1" subtext="Tech Impressions" />
            <KpiCard title="Tutorial Plays" value={(kpis.tutorial_views || 0).toLocaleString()} icon={BookOpen} color="#06b6d4" subtext="Hands-on Code Plays" />
            <KpiCard title="Code Downloads" value={(kpis.total_downloads || 0).toLocaleString()} icon={Download} color="#10b981" subtext="SDK & Sample Downloads" />
            <KpiCard title="Avg Reading Time" value={`${kpis.avg_reading_time_sec || 0}s`} icon={Clock} color="#f59e0b" subtext="Technical Reading Duration" />
            <KpiCard title="Engagement Rate" value={`${kpis.avg_engagement_rate || 0}%`} icon={Award} color="#f43f5e" subtext="Discussion Score" />
          </>
        );
      case 'social_media':
        return (
          <>
            <KpiCard title="Total Followers" value={(kpis.total_followers || 0).toLocaleString()} icon={Users} color="#ec4899" subtext="Subscribers" />
            <KpiCard title="Follower Growth" value={`+${kpis.avg_follower_growth_pct || 0}%`} icon={TrendingUp} color="#10b981" subtext="Monthly Expansion" />
            <KpiCard title="Total Likes" value={(kpis.total_likes || 0).toLocaleString()} icon={ThumbsUp} color="#06b6d4" subtext="Appreciations" />
            <KpiCard title="Total Reach" value={(kpis.total_reach || 0).toLocaleString()} icon={Eye} color="#6366f1" subtext="Unique Accounts" />
            <KpiCard title="Total Impressions" value={(kpis.total_impressions || 0).toLocaleString()} icon={Share2} color="#f59e0b" subtext="Post Displays" />
            <KpiCard title="Engagement Rate" value={`${kpis.avg_engagement_rate || 0}%`} icon={Award} color="#f43f5e" subtext="Reach to Interaction" />
          </>
        );
      default: // Entertainment
        return (
          <>
            <KpiCard title="Total Views" value={(kpis.total_views || 0).toLocaleString()} icon={Eye} color="#6366f1" subtext="Content Impressions" />
            <KpiCard title="Total Likes" value={(kpis.total_likes || 0).toLocaleString()} icon={ThumbsUp} color="#06b6d4" subtext="User Reactions" />
            <KpiCard title="Total Comments" value={(kpis.total_comments || 0).toLocaleString()} icon={MessageSquare} color="#10b981" subtext="User Discussions" />
            <KpiCard title="Total Shares" value={(kpis.total_shares || 0).toLocaleString()} icon={Share2} color="#f59e0b" subtext="Social Virality" />
            <KpiCard title="Avg Watch Duration" value={`${kpis.avg_watch_time_min || 0}m`} icon={Clock} color="#8b5cf6" subtext="Streamed Duration" />
            <KpiCard title="Avg Engagement Rate" value={`${kpis.avg_engagement_rate || 0}%`} icon={Award} color="#f43f5e" subtext="Composite Formula" />
          </>
        );
    }
  };

  // Helper to render Domain Dynamic Main Charts
  const renderCharts = () => {
    const mainChartData = charts.platform_comparison || charts.subject_performance || charts.category_performance || charts.sport_comparison || charts.topic_performance || charts.platform_performance || [];
    const trendData = charts.trend_over_time || [];

    const getXKey = () => {
      if (selectedDomain === 'education') return 'subject';
      if (selectedDomain === 'sports') return 'sport';
      if (selectedDomain === 'technology') return 'topic';
      if (selectedDomain === 'social_media') return 'platform';
      if (selectedDomain in { news: 1, ecommerce: 1 }) return 'category';
      return 'platform';
    };

    const getYKey = () => {
      if (selectedDomain === 'education') return 'avg_marks';
      if (selectedDomain === 'ecommerce') return 'revenue';
      if (selectedDomain === 'sports') return 'views';
      return 'views';
    };

    return (
      <div className="grid-2col" style={{ marginBottom: '1.5rem' }}>
        {/* CHART 1: PRIMARY DOMAIN BREAKDOWN */}
        <div className="glass-card">
          <h3 className="section-title">
            <BarChart2 size={18} color="var(--accent-primary)" />
            {selectedDomain.toUpperCase()} Performance Breakdown
          </h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={mainChartData} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey={getXKey()} stroke="var(--text-secondary)" fontSize={11} angle={-15} textAnchor="end" />
                <YAxis stroke="var(--text-secondary)" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey={getYKey()} fill="url(#colorViews)" radius={[6, 6, 0, 0]}>
                  {mainChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: DOMAIN TREND OVER TIME OR DISTRIBUTION */}
        <div className="glass-card">
          <h3 className="section-title">
            <TrendingUp size={18} color="var(--accent-emerald)" />
            {selectedDomain.toUpperCase()} Metric Trends
          </h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              {trendData.length > 0 ? (
                <LineChart data={trendData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={11} />
                  <YAxis stroke="var(--text-secondary)" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey={selectedDomain === 'education' ? 'avg_marks' : 'views'} stroke="#6366f1" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey={selectedDomain === 'education' ? 'avg_attendance' : 'likes'} stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              ) : (
                <BarChart data={mainChartData} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey={getXKey()} stroke="var(--text-secondary)" fontSize={11} angle={-15} textAnchor="end" />
                  <YAxis stroke="var(--text-secondary)" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                  <Bar dataKey={selectedDomain === 'education' ? 'avg_assignment' : 'likes'} fill="#06b6d4" radius={[6, 6, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  // Helper to render Leaderboard Table
  const renderTable = () => {
    if (!tableData || tableData.length === 0) return null;

    const keys = Object.keys(tableData[0]).slice(0, 8);

    return (
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 className="section-title" style={{ margin: 0 }}>
            <Award size={18} color="var(--accent-rose)" />
            {selectedDomain.toUpperCase()} Dataset Leaderboard
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Top {tableData.length} records dynamically queried from dataset</span>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                {keys.map((k) => (
                  <th key={k}>{k.replace(/_/g, ' ').toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>#{idx + 1}</td>
                  {keys.map((k) => (
                    <td key={k} style={{ fontFamily: typeof row[k] === 'number' ? 'var(--font-mono)' : 'inherit' }}>
                      {typeof row[k] === 'number' ? (k.includes('price') || k.includes('revenue') ? `$${row[k].toLocaleString()}` : row[k].toLocaleString()) : row[k]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Domain Selector Component */}
      <DomainSelector selectedDomain={selectedDomain} setSelectedDomain={setSelectedDomain} />

      {/* Filter Bar */}
      <FilterBar filters={filters} setFilters={setFilters} selectedDomain={selectedDomain} />

      {loading ? (
        <div className="loader-spinner">
          <div className="spinner"></div>
          <p>Processing domain analytics data from backend server...</p>
        </div>
      ) : (
        <>
          {/* KPI Summary Cards */}
          <div className="grid-kpi" style={{ marginBottom: '1.5rem' }}>
            {renderKpiCards()}
          </div>

          {/* Dynamic Main Visualizations */}
          {renderCharts()}

          {/* Rule-Based Automated Insights */}
          <InsightsSection insights={insights} domain={selectedDomain} />

          {/* Head-to-Head Comparison */}
          <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <ComparisonSection domain={selectedDomain} filters={filters} />
          </div>

          {/* Dataset Leaderboard Table */}
          {renderTable()}
        </>
      )}
    </div>
  );
}
