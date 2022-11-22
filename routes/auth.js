var express = require('express');
var pbkdf2 = require('../modules/pbkdf2');

var db = require('../model/db');
var sql = require('../model/sql');

var router = express.Router();

router.get('/signin', (req, res)=>{
    res.render('signin');
});

router.get('/signup', (req, res)=>{
    res.render('signup');
});

router.post('/signin', async (req, res)=>{
    const {userId, password} = req.body;
    try{
        const rows = await db.executeSelect(sql.selectUserById(userId));
        if(rows.length > 0){
            const salt = rows[0].salt;
            const key = await pbkdf2.getKey(password, salt);
            if(key == rows[0].password){ // 로그인 성공
                console.log('Login 성공');
                req.session.userId = userId;
            }
        } 
    } catch(err){
        console.log(err);
    }
    res.redirect('/menu');
});

router.post('/signup', async (req, res)=>{
    const {userId, password} = req.body;
    const salt = await pbkdf2.getSalt();
    const key = await pbkdf2.getKey(password, salt);
    db.executeUpdate(sql.insertUser(userId, key, salt));
    res.redirect('/');
});

router.get('/signout', (req, res)=>{
    req.session.destroy((err)=>{
        res.redirect('/');
    });
});

/* GET home page. */
router.get('/key', async (req, res) => {
    if(req.query.password == undefined) res.json();
    const salt = await pbkdf2.getSalt();
    const key = await pbkdf2.getKey(req.query.password, salt);
    res.json({salt:salt, key:key});
  
});

module.exports = router;