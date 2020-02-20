// importScripts('https://www.gstatic.com/firebasejs/7.8.2/firebase-app.js')
// importScripts('https://www.gstatic.com/firebasejs/7.8.2/firebase-messaging.js');

// firebase.initializeApp({
//     messagingSenderId: '831786464315'
// });

// const messaging = firebase.messaging();


function receivePushNotification(event) {
    console.log("[Service Worker] Push Received.");

    try {
        console.log(event)
        const { image, tag, url, title, text } = event.data.json();

        const options = {
            data: JSON.stringify(event.data),
            body: JSON.stringify(event),
            icon: image,
            vibrate: [200, 100, 200],
            tag: tag,
            image: image,
            badge: "https://spyna.it/icons/favicon.ico",
            actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
        };
        event.waitUntil(self.registration.showNotification(title, options));
    } catch (e) {
        console.log(event.data)
        const options = {
            data: "",
            body: JSON.stringify(event.data),
            badge: "https://spyna.it/icons/favicon.ico",
            actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
        };
        event.waitUntil(self.registration.showNotification("Incoming notification", options));
    }
}

function openPushNotification(event) {
    console.log("[Service Worker] Notification click Received.", event.notification.data);

    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener("push", receivePushNotification);
self.addEventListener("notificationclick", openPushNotification);
