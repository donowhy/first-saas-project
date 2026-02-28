import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import CalendarView from './components/CalendarView';
import InstructorList from './components/InstructorList';
import MemberList from './components/MemberList';
import SettlementTable from './components/SettlementTable';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get('token');
    if (oauthToken) {
      handleLogin(oauthToken);
      window.history.replaceState({}, document.title, "/");
    }

    if (Capacitor.isNativePlatform()) {
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') PushNotifications.register();
      });
    }
  }, []);

  const handleLogin = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!token) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'calendar': return <CalendarView />;
      case 'instructors': return <InstructorList />;
      case 'members': return <MemberList />;
      case 'settlement': return <SettlementTable />;
      case 'analytics': return <div className="p-20 text-center text-slate-400 font-bold">Analytics module coming soon...</div>;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      <div className="min-h-full">
        {renderContent()}
      </div>
    </Layout>
  );
}

export default App;
