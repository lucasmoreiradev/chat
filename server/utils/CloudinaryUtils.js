'use strict'

const cloudinary = require('cloudinary')

cloudinary.config({ 
  cloud_name: 'dvko3bggq', 
  api_key: '244237327216936', 
  api_secret: '_U65AQLxlUhnVMOY7bGQrjMMD2M' 
})

class CloudinaryUtils {

  static handleUpload (buffer) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(buffer, result => {
        resolve(result)
      }, err => reject(err))
    })
  }

}

module.exports = CloudinaryUtils

