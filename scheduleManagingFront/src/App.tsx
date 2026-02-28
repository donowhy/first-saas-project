import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import CalendarView from './components/CalendarView';
import InstructorList from './components/InstructorList';
import MemberList from './components/MemberList';
import SettlementTable from './components/SettlementTable';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

function App() {
  const [activeTab, setActiveTab] = useState('calendar');

  useEffect(() => {
    // Native (iOS/Android) Push Notification Setup
    if (Capacitor.isNativePlatform()) {
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          PushNotifications.register();
        }
      });

      PushNotifications.addListener('registration', (token) => {
        console.log('Push registration success, token: ' + token.value);
        // TODO: Send token to backend
      });

      PushNotifications.addListener('registrationError', (error) => {
        console.error('Error on registration: ' + JSON.stringify(error));
      });

      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Push received: ' + JSON.stringify(notification));
      });
    } else {
      // Web Notification Permission
      if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            console.log("Web notification permission granted.");
          }
        });
      }
    }
  }, []);

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
