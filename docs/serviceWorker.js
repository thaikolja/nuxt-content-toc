// Empty service worker to silence 404 warnings from browser extensions/cache
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
