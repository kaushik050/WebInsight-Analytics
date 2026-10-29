import React, { useEffect, useState } from 'react';
import { Smartphone, Users, Clock, Award, ShieldCheck } from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';

import FilterBar from '../components/FilterBar';
import { fetchDeviceAnalytics, fetchUserTypeAnalytics } from '../services/api';

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6'];

export default function UserEngagement({ filters, setFilters }) {
  const [loading, setLoading] = useState(true);
  const [deviceData, setDeviceData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function loadUserAnalytics() {
      setLoading(true);
      try {
        const [devRes, userRes] = await Promise.all([
          fetchDeviceAnalytics(filters),
          fetchUserTypeAnalytics(filters)
        ]);
        setDeviceData(devRes);
        setUserData(userRes);
      } catch (err) {
        console.error('Error fetching user engagement data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadUserAnalytics();
  }, [filters]);

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
          <p>Analyzing user demographics and device engagement...</p>
        </div>
      ) : (
        <>
          <div className="grid-2col">
            {/* 4. Device Distribution Detailed View */}
            <div className="glass-card">
              <h3 className="section-title">
                <Smartphone size={18} color="var(--accent-cyan)" />
                Device Platform Distribution (Mobile vs Desktop vs Tablet)
              </h3>
              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      dataKey="total_views"
                      nameKey="device"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={85}
                      paddingAngle={5}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 5. New vs Returning Users Detailed View */}
            <div className="glass-card">
              <h3 className="section-title">
                <Users size={18} color="var(--accent-emerald)" />
                User Demographics: New vs Returning Visitors
              </h3>
              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={userData}
                      dataKey="total_views"
                      nameKey="user_type"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={85}
                      paddingAngle={5}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {userData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#6366f1'} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* DEVICE COMPARISON BREAKDOWN TABLE */}
          <div className="grid-2col">
            <div className="glass-card">
              <h3 className="section-title">
                <Smartphone size={18} color="var(--accent-amber)" />
                Device Metric Breakdown
              </h3>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Device</th>
                      <th>Total Views</th>
                      <th>Share (%)</th>
                      <th>Avg Time Spent</th>
                      <th>Avg Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deviceData.map((item) => (
                      <tr key={item.device}>
                        <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.device}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{item.total_views.toLocaleString()}</td>
                        <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{item.percentage}%</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{formatSeconds(item.avg_time_spent)}</td>
                        <td>
                          <span className="score-pill score-high">
                            {item.avg_engagement_score}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass-card">
              <h3 className="section-title">
                <ShieldCheck size={18} color="var(--accent-purple)" />
                User Type Metric Breakdown
              </h3>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>User Type</th>
                      <th>Total Views</th>
                      <th>Share (%)</th>
                      <th>Avg Time Spent</th>
                      <th>Avg Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((item) => (
                      <tr key={item.user_type}>
                        <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.user_type}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{item.total_views.toLocaleString()}</td>
                        <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>{item.percentage}%</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{formatSeconds(item.avg_time_spent)}</td>
                        <td>
                          <span className="score-pill score-high">
                            {item.avg_engagement_score}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
