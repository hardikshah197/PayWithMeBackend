const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const logger = require('../utils/logger');
const Constant = require('./Constant')
var QRCode = require('qrcode');

exports.getError = (message, statusCode) => {
    return {
      statusCode,
      message
    };
  };
  
  exports.getResponse = (msg,statusCode) => {
      return {
        msg,
        statusCode
      }
  }

/**
 * @param {*} username
 * @param {*} amount
 * @param {*} message
 * @param {*} vpa
 */
exports.createUpiLink = (payeeName,amount,reason,vpa) => {
    payeeName = encodeURI(payeeName);
    reason = encodeURI(reason);
    if(amount){
        logger.debug(`pay rs. ${amount} to ${payeeName} for ${reason}`);
        return `${config.base_url}&pn=${payeeName}&pa=${vpa}&cu=${Constant.INDIAN_CURRENCY}&am=${amount}&tn=${reason}`;
    }else{
        logger.debug(`pay to ${payeeName} for ${reason}`);
        return `${config.base_url}&pn=${payeeName}&pa=${vpa}&cu=${Constant.INDIAN_CURRENCY}&tn=${reason}`
    }
}

/**
 * @param {*} base64
 * @param {*} data
 */
exports.createQrCode = (base64, data) => {
    return new Promise((resolve,reject)=> {
        if(base64){
            logger.debug('creating base64');
            QRCode.toDataURL(data,(err,url) => {
                if(err)
                reject(err);
                else
                resolve({'base64':url})
            })
        } else {
            logger.debug('creating url with base64');
            QRCode.toString(data,function(err,url){
                resolve({'msg':'only base64 service available'});
            })
        }
    })
}
