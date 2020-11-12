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
  "endpoint" : "https://fcm.googleapis.com/fcm/send/cBLLbyvX1J4:APA91bE8_06ZK4uqcO2z2DEorYjnAl6IRbKFTTBHDjmdzQVZWNuuweD4-BiYicBe286_JEz-38Kn8lywhtfby9TBJ_aVZf9pqYLOB0SvpaVatwdTfWfIEDxJQXK38DDxAVN2blMv43l2",
  "keys" : {
    "p256dh" : "BAFy+k/nbk+LbTgIlZ35w7lPWXcOOpCfdbMXKtXlAQ0f/ckv4NPxINdgOVe0VpZka8lDj5/W5YovC5OlDdxcMhw=",
    "auth" : "Im/UTnD/h1HQTKY8HngEhg=="
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
