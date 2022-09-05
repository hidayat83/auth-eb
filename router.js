const router = require('express').Router()
const restrict = require('./middleware/restrict')
const restrictApi=require('./middleware/restrict-api')
const passport=require('./lib/passport')
//  controllers
const auth = require('./controllers/authController')
const bodyParser = require('body-parser')
router.use(bodyParser.json())

// homepage
 router.get('/',restrict,(reg,res)=> res.render('index'))

// register page
 router.get('/register',(req,res)=>res.render('register'))
 router.post('/register',auth.register)

// login page
router.get ('/login',(req,res) => res.render('login'))
router.post('/login',passport.authenticate('local',{
	successRedirect:'/',
	failureRedirect:'/login',
	failureFlash: true
}))

router.get('/whoami',restrict,auth.whoami)
router.post('/api/v1/auth/login',auth.login)
router.get('/api/v1/auth/whoami',restrictApi,auth.whoamiApi)

module.exports=router;
