import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ComparisonsPage from './pages/ComparisonsPage';
import DataExplorerPage from './pages/DataExplorerPage';
import ReportsAbout from './pages/ReportsAbout';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [theme, setTheme] = useState('dark');
  const [selectedDomain, setSelectedDomain] = useState('entertainment');
  const [filters, setFilters] = useState({
    category: 'All',
    start_date: '',
    end_date: '',
    search: ''
  });

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header 
          activePage={activePage} 
          theme={theme} 
          setTheme={setTheme} 
          filters={filters} 
          selectedDomain={selectedDomain}
        />

        <main className="content-body">
          {activePage === 'dashboard' && (
            <Dashboard 
              filters={filters} 
              setFilters={setFilters} 
              selectedDomain={selectedDomain} 
              setSelectedDomain={setSelectedDomain} 
            />
          )}
          {activePage === 'comparisons' && (
            <ComparisonsPage 
              filters={filters} 
              setFilters={setFilters} 
              selectedDomain={selectedDomain} 
              setSelectedDomain={setSelectedDomain} 
            />
          )}
          {activePage === 'explorer' && (
            <DataExplorerPage 
              filters={filters} 
              setFilters={setFilters} 
              selectedDomain={selectedDomain} 
              setSelectedDomain={setSelectedDomain} 
            />
          )}
          {activePage === 'reports' && (
            <ReportsAbout />
          )}
        </main>
      </div>
    </div>
  );
}
