const router = require('express').Router();
const auth = require('./AuthControllers');

router.use('/api/v1/auth', auth);

module.exports = router;
