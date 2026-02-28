import React, { useState } from 'react';
import Layout from './components/Layout';
import CalendarView from './components/CalendarView';
import InstructorList from './components/InstructorList';
import MemberList from './components/MemberList';
import SettlementTable from './components/SettlementTable';

function App() {
  const [activeTab, setActiveTab] = useState('calendar');

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar': return <CalendarView />;
      case 'instructors': return <InstructorList />;
      case 'members': return <MemberList />;
      case 'settlement': return <SettlementTable />;
      default: return <CalendarView />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="min-h-full">
        {renderContent()}
      </div>
    </Layout>
  );
}

export default App;
