import webPush from 'web-push';

const vapidDetails = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  privateKey: process.env.VAPID_PRIVATE_KEY!,
  subject: process.env.VAPID_SUBJECT!
};

if (!vapidDetails.publicKey || !vapidDetails.privateKey || !vapidDetails.subject) {
  throw new Error('VAPID keys and subject must be set in environment variables');
}

webPush.setVapidDetails(
  vapidDetails.subject,
  vapidDetails.publicKey,
  vapidDetails.privateKey
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subscription, message } = body;

    const payload = JSON.stringify({
      title: 'Pure App',
      body: message || 'This is a test notification'
    });

    await webPush.sendNotification(subscription, payload);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Notification error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}