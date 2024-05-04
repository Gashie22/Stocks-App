const express = require ('express')
const router = express.Router()
const {getProducts,addProducts,updateProducts,deleteProduct} = require('../controllers/productController')

//get products

router.get ('/products',getProducts)
router.post ('/addproduct',addProducts)
router.put('/update',updateProducts)
router.post('/delete',deleteProduct)

module.exports=router 