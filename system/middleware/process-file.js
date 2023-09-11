const FileUploader = require('../utils/file-uploader');
const configController = require('../../api/Config/controller');

async function processFile(req, res, next) {
    try {
        const fileUploadConfig = await configController.getValueByKey('FILE_UPLOAD_CONFIG'); // get file upload config

        const fileUploader = FileUploader.initialize(fileUploadConfig);
        await fileUploader(req, res);
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = processFile;