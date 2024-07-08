const transectionModel =require('../models/transectionModel')
const moment = require('moment');
const mongoose =require('mongoose');
const getAllTransection = async(req,res) => {
    try{
        const { frequency, selectedDate, type } = req.body;        
        const transections = await transectionModel.find({
          ...(frequency !== 'custom'
            ? {
                date: {
                  $gt: moment().subtract(Number(frequency), 'days').toDate(),
                },
              }
            : {
                date: {
                  $gte: selectedDate[0],
                  $lte: selectedDate[1],
                },
              }),
              userid: req.body.userid,
              ...(type !== 'all' && { type })
        });
        res.status(200).json(transections);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
        
      }
};

const addTransection = async(req , res) => {
    try{
        const newTransection = new transectionModel(req.body);
        await newTransection.save();
        res.status(201).send('Transection added')

    }catch(error){
        res.status(500).json(error);
    }
}

const editTransection = async(req,res)=>{
  try{
    await transectionModel.findOneAndUpdate({_id:req.body.transectionId},req.body.payload);
    res.status(200).send('Edit Successfully');

  }catch(error){
    res.status(500).json(error);

  }

}
const deleteTransection= async(req,res)=>{
  try{
    await transectionModel.findOneAndDelete({_id:req.body.transectionId});
    res.status(200).send("delete successfully")

  }catch(error){
    res.status(500).json(error);
  }

}

module.exports = {getAllTransection,addTransection , editTransection , deleteTransection};