/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const fileNameArr = file.originalname.split('.');
    cb(null, `${Date.now()}.${fileNameArr[fileNameArr.length - 1]}`);
  },
});
const upload = multer({ storage });
const app = express();
const port = process.env.PORT || 3000;

// const nm_dependencies = ['locomotive-scroll']; // keep adding required node_modules to this array.
// nm_dependencies.forEach(dep => {
//   app.use(`/${dep}`, express.static(__dirname+`node_modules/${dep}`));
// });


app.use(express.static('public/assets'));
app.use(express.static('uploads'));
// app.use('/scripts',express.static(__dirname+ '/node_modules/locomotive-scroll/dist'))
//
//
// app.get('/scripts/locomotive-scroll.min.js', function(req, res) {
//     res.sendFile(__dirname + '/node_modules/locomotive-scroll/dist/locomotive-scroll.min.js');
// });



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/about.html'));
});

app.get('/submit', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/submit.html'));
});

app.post('/record', upload.single('audio'), (req, res) => res.json({ success: true }));

app.get('/recordings', (req, res) => {
  let files = fs.readdirSync(path.join(__dirname, 'uploads'));
  files = files.filter((file) => {
    // check that the files are audio files
    const fileNameArr = file.split('.');
    return fileNameArr[fileNameArr.length - 1] === 'mp3';
  }).map((file) => `/${file}`);
  return res.json({ success: true, files });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
