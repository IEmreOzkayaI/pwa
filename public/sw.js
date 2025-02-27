self.addEventListener('push', function(event) {
  try {
    const data = JSON.parse(event.data.text());
    
    const options = {
      body: data.body,
      icon: '/vercel.svg',
      badge: '/vercel.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        url: self.location.origin,
      },
      actions: [
        {
          action: 'open',
          title: 'Open App'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  } catch (error) {
    console.error('Error showing notification:', error);
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});