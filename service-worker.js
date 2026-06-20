// 🌐 Service Worker - Background Notification Engine (2026)
self.addEventListener('push', function(event) {
    let data = { title: 'Pine Hills School', body: 'School Re-opening Date: 3 August ko open hoga.', icon: 'real logo copy.jpg' };
    
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: data.icon || 'real logo copy.jpg',
        badge: 'real logo copy.jpg',
        vibrate: [200, 100, 200],
        data: {
            url: self.location.origin + '/index.html' // Notification click karne par portal khulega
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification par jab parent click karega to website open ho jayegi
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});