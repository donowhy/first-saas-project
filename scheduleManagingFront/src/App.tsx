import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CalendarView from './components/CalendarView';
import InstructorList from './components/InstructorList';
import MemberList from './components/MemberList';
import SettlementTable from './components/SettlementTable';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';

// [Gemini Update]: React Router 도입 및 사용자 흐름(Landing -> Auth -> Dashboard) 최적화
const App: React.FC = () => {
  const isAuthenticated = () => !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth onLogin={() => {}} />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            isAuthenticated() ? (
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/calendar" element={<CalendarView />} />
                  <Route path="/instructors" element={<InstructorList />} />
                  <Route path="/members" element={<MemberList onSelectMember={() => {}} onJumpToInstructor={() => {}} />} />
                  <Route path="/settlement" element={<SettlementTable />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
