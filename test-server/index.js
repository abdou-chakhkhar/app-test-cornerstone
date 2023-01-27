const express = require("express");
const multer = require('multer')
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

app.post("/upload_file", (req, res) => {

    console.log(req.file);
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
   return res.status(200).send(req.file)

 })
})


app.listen(5000, () => {
    console.log(`Server started...`);
});