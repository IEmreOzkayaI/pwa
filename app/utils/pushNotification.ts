const vapidKeys = {
    publicKey: 'BKD0XCAp4dAnz92kJzXaX2YW6VXel5DVwKFXyw6YFpuK8gH7qp-pI1Vonbg7JqhLZQck9r0X046DcwkUTOIirEc',
    subject: 'mailto:0emre.ozkaya0@gmail.com'
  };
  
  export async function subscribeToPushNotifications() {
    try {
      if (!('serviceWorker' in navigator)) {
        throw new Error('Service Worker not supported');
      }
  
      const registration = await navigator.serviceWorker.register('/sw.js');
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidKeys.publicKey
      });
  
      // Send the subscription to your backend
      await fetch('/api/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription)
      });
  
      return subscription;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      throw error;
    }
  }