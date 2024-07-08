const express = require("express");
const {getAllTransection , addTransection ,editTransection,deleteTransection}= require("../controllers/transectionController");
const router = express.Router();

router.post("/getAllTransection",getAllTransection);
router.post("/addTransection",addTransection);
router.post("/editTransection",editTransection);
router.post("/deleteTransection",deleteTransection);
module.exports=router;