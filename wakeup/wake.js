const https = require("https");

setInterval(() => {
  https.get("https://codelab-fulltack.onrender.com/");
  console.log("Server đang chạy");
}, 1800000); // 1800000ms = 30 minutes



