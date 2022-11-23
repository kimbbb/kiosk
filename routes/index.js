var express = require('express');
var router = express.Router();

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

module.exports = router;
