const { S3 } = require('aws-sdk');
const configController = require('../../../api/Config/controller');
const utilsChecks = require('../../utils/checks');

module.exports = class AwsS3 {
    constructor(s3ClientConfig, s3Config) {
        if (process.env.USE_LOCAL_AWS_CREDS === 'true') {
            s3ClientConfig.accessKeyId = process.env.accessKeyId;
            s3ClientConfig.secretAccessKey = process.env.secretAccessKey;
        }
        this.config = s3Config;
        this.client = new S3(s3ClientConfig);
    }

    static async initialize(configName = 'AWS_S3_PRIVATE_CONFIG') {
        const config = await configController.getValueByKey(configName);
        const s3Config = {
            apiVersion: config.apiVersion,
            region: config.region,
            signatureVersion: config.signatureVersion,
            endpoint: config.endpoint,
        };
        return new AwsS3(s3Config, config);
    }

    async upload(keyName, body, aclPermission) {
        try {
            const params = {
                Bucket: this.config.bucket,
                Key: keyName,
                Body: body,
            };
            if (aclPermission && aclPermission !== '' && aclPermission !== null) {
                params.ACL = 'public-read';
            }
            return new Promise((resolve, reject) => {
                this.client.upload(params, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(data);
                });
            });
        } catch (err) {
            return err;
        }
    }

    async getFileURL(keyName, actualName) {
        const params = {
            Bucket: this.config.bucket,
            Key: keyName,
            Expires: this.config.fileURLExpires,
        };
        if (actualName && !utilsChecks.isEmptyString(actualName) && !utilsChecks.isNull(actualName)) {
            params.ResponseContentDisposition = `attachment; filename ="${actualName}"`;
        }
        const promise = this.client.getSignedUrlPromise('getObject', params);
        const response = promise.then((url) => url, (err) => err);
        return response;
    }

    async delete(keyName) {
        const params = {
            Bucket: this.config.bucket,
            Key: keyName,
        };
        const response = await this.client.deleteObject(params).promise();
        return response;
    }

    async cloneObject(file, aclPermission) {
        // return this.config.bucket;
        const params = {
            Bucket: this.config.bucket,
            Key: file.newFileName,
            CopySource: `${this.config.bucket}/${file.fileKeyToClone}`,
        };
        if (aclPermission && aclPermission !== '' && aclPermission !== null) {
            params.ACL = aclPermission;
        }
        const url = this.client.copyObject(params).promise();
        if (url) {
            return { key: file.newFileName };
        }
        return 'error in copying object';
    }
};