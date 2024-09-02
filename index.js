const express  = require('express');
const path = require('path');
const multer = require('multer')
const port = 3000;
const app = express();
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads')
  },
  filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`);
  }
})

const upload = multer({ storage: storage })


app.get('/', (req, res) => res.render('homepage'));

app.post('/upload', upload.single("profileImage"),(req , res) => {
    console.log(req.body)
  console.log(req.file)
    return res.redirect('/');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));