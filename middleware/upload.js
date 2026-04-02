const patch = require('path');
const multer = require('multer');
const { STATIC_PATCH } = require('./../constants');

const upload = multer({ dest: patch.join(STATIC_PATCH, 'images') });

module.exports.uploadUserImage = upload.single('userPhoto');
