const express = require('express');
const logger = require('../utils/logger');
const router = express.Router();
const apiUtils = require('../utils/apiUtils');
const pay_model = require('../model/payModel');
const HttpStatus = require('http-status-codes');
const { Promise } = require('mongoose');

router.post('/generate/upiLink',(req, res) => {
    logger.debug('generating upi link');
    let { username, amount, vpa, message } = req.body;
    let link = apiUtils.createUpiLink(username, amount,message,vpa);
    res.json({link});
});

router.post('/generate/qrcode', (req,res) => {
    logger.debug('generating the qr code');
    const {data,base64} = req.body;
    apiUtils.createQrCode(base64,data)
    .then(response => {
        res.json(response);
    });
});

router.post('/generate/upiCard',(req,res)=> {
    logger.debug('generating upi card');
    let {username,amount,vpa,bg_color,logo,message}=req.body;
    let link=apiUtils.createUpiLink(username,amount,message,vpa);
    let base64=true;
    let qrcode;
    apiUtils.createQrCode(base64,link)
    .then(response=> {
        qrcode = response['base64'];
        logger.debug('qr code generated');
        return pay_model.findOne({vpa});
    })
    .then((card)=> {
        if(!card){
            return pay_model.create({username,amount,vpa,message,qrcode,bg_color,logo});
        }
        else{
            logger.debug('card already exists update card info');
            if(amount){
                return upiPayLinks.updateOne({vpa},{payeeName,amount,message,vpa,qrcode,bgColor,logo}).then(() => {
                    return upiPayLinks.findOne({vpa});
                })
            }
            else{
                return upiPayLinks.updateOne({vpa},{username,message,vpa,qrcode,bgColor,logo}).then(() => {
                    return upiPayLinks.findOne({vpa});
                })
            }
        }
    })
    .then(created=>{
        logger.debug('card created');
        res.json({created});
    })
    .catch(err =>{
        logger.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(apiUtils.getError(err.message,HttpStatus.INTERNAL_SERVER_ERROR));
    })  
});

router.get('/getUpiCard/:vpa',(req,res)=>{
    let {vpa}=req.params;
    logger.debug(`finding upi card with vpa :: ${vpa}`);
    pay_model.findOne({vpa})
    .then(cardFound => {
        if(cardFound){
            logger.debug('card found')
            res.json({cardFound})
        } else {
            return Promise.reject('card not found');
        }
    })
    .catch(err =>{
        logger.error(err);
        return res.status(HttpStatus.NOT_FOUND).json(apiUtils.getError(err,HttpStatus.NOT_FOUND));
    })
});

router.get('/totalCards',(req,res)=> {
    pay_model.count().then(count => {
        logger.debug(`total card are ${count}`);
        res.json({count});
    })
    .catch(err => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(apiUtils.getError(err,HttpStatus.INTERNAL_SERVER_ERROR))
    })
})

module.exports = router;
