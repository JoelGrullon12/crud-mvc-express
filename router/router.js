const express=require("express");
const router=express.Router();

const ctrl=require("../controllers/storeController");

router.get("/",ctrl.GetProducts);

router.get("/add",ctrl.GetAddProduct);

router.post("/add",ctrl.PostAddProduct);

router.get("/edit/:movieId",ctrl.GetEditProduct);

router.post("/edit",ctrl.PostEditProduct);

router.get("/delete/:movieId",ctrl.GetDeleteProduct);

router.post("/delete",ctrl.PostDeleteProduct);

module.exports=router;