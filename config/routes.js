const express=require("express")
const router=express.Router()
const { authenticateUser } = require('../app/middlewares/authentication')
const { autherizationByUser}=require('../app/middlewares/autherization')
const categoryController=require('../app/controllers/categoryController')
const cartController = require('../app/controllers/cartController')
const addressController = require('../app/controllers/addressController')
const fooditemController = require('../app/controllers/foodItemController')
const orderController = require('../app/controllers/orderController')



router.get('/category', authenticateUser, autherizationByUser, categoryController.list)
router.get('/category/:id', authenticateUser, autherizationByUser, categoryController.show)
router.post('/category', authenticateUser, autherizationByUser, categoryController.create)
router.put('/category/:id', authenticateUser, autherizationByUser, categoryController.update)
router.delete('/category/:id', authenticateUser, autherizationByUser, categoryController.destroy)

router.get('/cart', authenticateUser, cartController.list)
router.get('/cart/:id', authenticateUser, cartController.show)
router.post('/cart', authenticateUser, cartController.create)
router.put('/cart/:id', authenticateUser, cartController.update)
router.delete('/cart/:id', authenticateUser, cartController.destroy)

router.get("/fooditem", authenticationByUser, autherizationByUser, fooditemController.list)
router.get("/fooditem/:id", authenticationByUser, autherizationByUser, fooditemController.show)
router.post("/fooditem", authenticationByUser, autherizationByUser, upload.single("imageUrl"), fooditemController.create)
router.put("/fooditem/:id", authenticationByUser, autherizationByUser, upload.single("imageUrl"), fooditemController.update)
router.delete("/fooditem/:id", authenticationByUser, autherizationByUser, fooditemController.destroy)

router.get("/address", authenticationByUser, addressController.list)
router.get("/address/:id", authenticationByUser, addressController.show)
router.post("/address", authenticationByUser, addressController.create)
router.put("/address/:id", authenticationByUser, addressController.update)
router.delete("/address/:id", authenticationByUser, addressController.destroy)

router.get("/order", authenticationByUser, orderController.list)
router.get("/order/:id", authenticationByUser, orderController.show)
router.post("/order", authenticationByUser, orderController.create)
router.put("/order/:id", authenticationByUser, orderController.update)
router.delete("/order/:id", authenticationByUser, orderController.destroy)

