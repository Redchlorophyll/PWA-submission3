const webPush = require('web-push');

const vapidKeys = {
  "publicKey" : "BCDo8-To75XoRMfixlBF87lPDlHyOGSohZnF9O4UCG5aBx0Aykh-Vdj1V3_FjebVJ8pDDUgCmPvszs3sCST6OJw",
  "privateKey" : "yeDjLOE9xS17D_AVFPb9-PiQjBtxxuIPmY2sXSwrESQ"
};

webPush.setVapidDetails(
  'mailto:hendra.dhonni.888@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const pushSubscription = {
  "endpoint" : "https://fcm.googleapis.com/fcm/send/dpjVhLyEhP4:APA91bH9iMXB6I-nERHea6dhI3JyVHKOM-nf-aJbnoUuJvw17YZiFgAa_ftKIRb-6tnutZ-xgsDoNyMOuk0JV6UdaBKlVmfr85PK7UiF86L5t1t5yZxH1MFmi4Cb2F8p15ZjwDEGplse",
  "keys" : {
    "p256dh" : "BKSo0DEE5+7IJ6SStY7lW5GQnu4jx0VavLdlCkFgr+TG72hDF/ehPVeurvmzAvMlWUpGJniS/sCUrkp9S9xH0Ag=",
    "auth" : "lsFiMdTQIswFXD3iblHXow=="
  }
};

const payload = 'selamat app anda sudah menerima push notification';

const options = {
  gcmAPIKey: '762598950282',
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
)
