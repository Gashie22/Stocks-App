const express = require ('express')
const router = express.Router()
const {getClients,updateClients,addClients} = require('../controllers/clientsController')

//get products

router.get ('/clients',getClients)
router.post ('/addclient',addClients)
router.put('/updateclient',updateClients)
// router.post('/deleteclient',deleteProduct)

module.exports=router 