var express = require('express');
var multer = require('multer');
var router = express.Router();
const db = require('../model/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.userId != undefined)
    res.render('index', { title: 'Express', userId:req.session.userId });
  else
    res.render('index', { title: 'Express' });
});

router.get("/menu",(req,res)=>{
  res.render("menu")
})

router.get("/shop",(req,res)=>{
  res.render("shop")
})

router.get("/plus",(req,res)=>{
  res.render("plus")
})

const storage  = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });


router.post('/apiUpload', upload.single('file'), (req, res)=>{
  const {title, message} = req.body;
  let originalFileName='';
  let fileUrl='';
  if(req.file){
    originalFileName=req.file.originalname;
    fileUrl='/uploads/'+req.file.filename;
  };
  res.json({title:title, message:message, originalFileName:originalFileName, fileUrl:fileUrl});
});

router.post('/formUpload', upload.single('file'), (req, res)=>{
  const {title, message} = req.body;
  let originalFileName='';
  let fileUrl='';
  if(req.file){
    originalFileName=req.file.originalname;
    fileUrl='/uploads/'+req.file.filename;
  };

  res.render('form', {result:{title:title, message:message, originalFileName:originalFileName, fileUrl:fileUrl}});
});

module.exports = router;
