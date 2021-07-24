const router = require('express').Router()
const cookieController = require('../controllers/cookieController')
const sessionController = require('../controllers/sessionController')

router.get('/',
  cookieController.setSSIDCookie,
  // sessionController.session,
  (req, res) => {
    console.log('Response in cookie router')
    res.send('Cookie has been successfully created!')
  }
  
)

module.exports=router;