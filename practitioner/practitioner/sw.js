self.addEventListener('push', (event) => {
  let data = { title: 'Atlas', body: 'You have a new update.' };
  try { data = event.data.json(); } catch (e) { /* use default */ }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Atlas', {
      body: data.body || '',
      icon: data.icon || undefined
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) return clientList[0].focus();
      return clients.openWindow('/');
    })
  );
});
