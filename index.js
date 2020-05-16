const admin = require("firebase-admin");

//name bucket
const config = require("./config.json");

//credencial google gloud
const credential = require("./credential.json");

admin.initializeApp({
  credential: admin.credential.cert(credential),
  storageBucket: config.storageBucket,
});

const bucket = admin.storage().bucket();

bucket.getFiles(function (err, files) {
  if (!err) {
    files.forEach((file) => {
      const fileName = file.name.replace("images/", "");
      file.download({
        destination: `temp/${fileName}`,
      });
    });
  }
});
