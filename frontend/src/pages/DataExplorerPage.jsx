import React, { useState, useEffect } from 'react';
import DomainSelector from '../components/DomainSelector';
import FilterBar from '../components/FilterBar';
import { fetchExplorerData } from '../services/api';
import { Database, ChevronLeft, ChevronRight, Search } from 'lucide-react';

export default function DataExplorerPage({ filters, setFilters, selectedDomain, setSelectedDomain }) {
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [explorerState, setExplorerState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetchExplorerData(selectedDomain, page, limit, filters);
        setExplorerState(res);
      } catch (err) {
        console.error('Error fetching explorer data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedDomain, page, limit, filters]);

  const rows = explorerState?.data || [];
  const totalRecords = explorerState?.total_records || 0;
  const totalPages = explorerState?.total_pages || 1;

  const keys = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div>
      <DomainSelector selectedDomain={selectedDomain} setSelectedDomain={setSelectedDomain} />
      <FilterBar filters={filters} setFilters={setFilters} selectedDomain={selectedDomain} />

      <div className="glass-card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Database size={20} color="var(--accent-primary)" />
            <h3 className="section-title" style={{ margin: 0 }}>
              {selectedDomain.toUpperCase()} Raw Dataset Explorer
            </h3>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Showing Page {page} of {totalPages} ({totalRecords.toLocaleString()} Total Records)
          </span>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Querying database engine...</div>
        ) : rows.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No database records found for applied filters.</div>
        ) : (
          <>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    {keys.map(k => (
                      <th key={k}>{k.replace(/_/g, ' ').toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                        {(page - 1) * limit + idx + 1}
                      </td>
                      {keys.map(k => (
                        <td key={k} style={{ fontFamily: typeof row[k] === 'number' ? 'var(--font-mono)' : 'inherit' }}>
                          {typeof row[k] === 'number' ? (k.includes('price') || k.includes('revenue') ? `$${row[k].toLocaleString()}` : row[k].toLocaleString()) : row[k]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
              <button
                disabled={page <= 1}
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                className="btn btn-secondary"
                style={{ opacity: page <= 1 ? 0.5 : 1 }}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Page {page} / {totalPages}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                className="btn btn-secondary"
                style={{ opacity: page >= totalPages ? 0.5 : 1 }}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
