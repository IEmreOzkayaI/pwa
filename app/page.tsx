'use client';

import { LoginForm } from "@/components/login-form";
import { handleEnablePushNotifications, sendTestNotification } from "./utils/test";
import { useState, useEffect } from 'react';

export default function Page() {
  const [permissionStatus, setPermissionStatus] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const checkNotificationPermission = async () => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      if (!('Notification' in window)) {
        setPermissionStatus('Notifications not supported');
        return;
      }

      if (window.Notification.permission === 'denied') {
        setPermissionStatus('Please enable notifications in your browser settings');
        window.open('chrome://settings/content/notifications');
        return;
      }

      const permission = await window.Notification.requestPermission();
      setPermissionStatus(`Permission status: ${permission}`);
      console.log('Notification permission:', permission);
    } catch (error) {
      console.error('Permission error:', error);
      setPermissionStatus('Error requesting permission');
    }
  };

  if (!isClient) {
    return null; // or a loading state
  }

  return (
<div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="space-y-4">
        {permissionStatus && (
          <div className={`p-4 rounded shadow-sm ${
            permissionStatus.includes('denied') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
          }`}>
            {permissionStatus}
          </div>
        )}
        <button 
          onClick={checkNotificationPermission} 
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium
            transition-all duration-200 ease-in-out
            hover:bg-indigo-700 hover:shadow-lg
            active:transform active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check Permission
        </button>
        <button 
          onClick={handleEnablePushNotifications} 
          className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium
            transition-all duration-200 ease-in-out
            hover:bg-emerald-700 hover:shadow-lg
            active:transform active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Enable Push Notifications
        </button>
        <button 
          onClick={() => sendTestNotification('Test notification!')} 
          className="w-full px-6 py-3 bg-violet-600 text-white rounded-lg font-medium
            transition-all duration-200 ease-in-out
            hover:bg-violet-700 hover:shadow-lg
            active:transform active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isClient || window.Notification?.permission !== 'granted'}
        >
          Send Test Notification
        </button>
      </div>
      <div className="w-full max-w-sm mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
