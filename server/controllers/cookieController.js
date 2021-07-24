const cookieController = {}

cookieController.setSSIDCookie = async (req,res,next)=> {
  console.log('In cookie controller')
  // await res.cookie('ssid', {httpOnly: true});
  await res.cookie('token', "admin", {httpOnly:true});
  return next()
}



module.exports = cookieController;