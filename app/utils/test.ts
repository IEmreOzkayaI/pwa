import { subscribeToPushNotifications } from "./pushNotification";

let savedSubscription: PushSubscription | null = null;

export const handleEnablePushNotifications = async () => {
  try {
    const subscription = await subscribeToPushNotifications();
    savedSubscription = subscription;
    console.log('Successfully subscribed to push notifications');
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error);
  }
};

export const sendTestNotification = async (message: string = 'Hello from Pure App!') => {
  if (!savedSubscription) {
    console.error('No subscription available. Please subscribe first.');
    return;
  }

  try {
    const response = await fetch('/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription: savedSubscription,
        message: message
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send notification');
    }

    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
