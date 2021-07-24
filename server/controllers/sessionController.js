const sessionController = {}
const Session = require('../models/sessionModel')

sessionController.session = async (req, res, next) => {
  try{
    await Session.create({cookieId: res.locals.id})
    return next()
  }catch (err){
    return next({
    log: 'sessionController.session: ERROR: Error starting session',
    message: { err: `Error occurred in sessionController.session. err log: ${err}` },
    })
  }
}

module.exports = sessionController;