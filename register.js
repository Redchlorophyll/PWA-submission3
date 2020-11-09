const public_key = "BCDo8-To75XoRMfixlBF87lPDlHyOGSohZnF9O4UCG5aBx0Aykh-Vdj1V3_FjebVJ8pDDUgCmPvszs3sCST6OJw";

if (!('serviceWorker' in navigator)) {
  console.log("Service worker tidak didukung browser ini.");
} else {
  registerServiceWorker()
    .then(requestPermission())
}

function registerServiceWorker() {
  return new Promise((resolve) => {
    navigator.serviceWorker.register("sw.js")
      .then(registration => {
        console.log("Registrasi serviceWorker Berhasil");
        console.log(registration);
        resolve(registration)
      }).catch(err => {
        console.error(`Registrasi Service Worker gagal ${err}`);
      });
  })
}

function requestPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(result => {
      if (result === 'denied') {
        console.log("fitur notifikasi tidak diijinkan");
        return;
      } else if (result === "default") {
        console.error('pengguna menutup kotak dialog permintaan ijin');
        return;
      }

      navigator.serviceWorker.getRegistration().then(function(reg) {
          reg.showNotification('Notifikasi diijinken!');
      });

      if (('PushManager' in window)) {
        navigator.serviceWorker.getRegistration().then(registration => {

          registration.pushManager.subscribe({
            userVisibleOnly : true,
            applicationServerKey: urlBase64ToUint8Array(public_key)
          }).then(subscribe => {
            console.log(`Berhasil melakukan subscribe dengan endpoint ${subscribe.endpoint}`);
            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
              null, new Uint8Array(subscribe.getKey('p256dh')))));
            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
              null, new Uint8Array(subscribe.getKey('auth')))));
          }).catch(err => {
            console.error(`tidak dapat melakukan subscribe ${err.message}`);
          });

        });
        }

    })
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
