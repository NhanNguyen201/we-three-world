const express = require('express')
const router = express.Router()
const memoliaController =  require('../controllers/memolia')

router.get('/', memoliaController.getWorld)

module.exports = router