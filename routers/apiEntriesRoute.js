const express=require('express')

const router=express.Router()

const {createEntries,deleteEntries,getEntries,updateEntries} = require('../controllers/apiEntriesController');
const { createEntry, deleteEntry, updateEntry } = require('../models/entries');


router.get('/',getEntries);
//router.get('/',getAllEntries);
router.post('/create',createEntries);
router.delete('/delete',deleteEntries);
router.put('/update',updateEntries);









module.exports=router
