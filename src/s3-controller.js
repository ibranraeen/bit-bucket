const formidable = require('formidable');
const {uploadFileToS3, getBucketListFromS3, getPresignedURL} = require('./s3-service');

async function s3Upload (req, res) {
    const formData = await readFormData(req);
    try{
        await uploadFileToS3(formData.file, 'krayo-host');
        res.send('Uploaded!!');
    } catch(ex) {
        res.send('ERROR!!!!');
    }
}

async function s3Get (req, res) {
    try{
        const bucketData = await getBucketListFromS3('krayo-host');
        const {Contents = []} = bucketData; 
        res.send(Contents.map(content => {
        return {
            key: content.Key,
            size: (content.Size/1024).toFixed(1) + ' KB',
            lastModified: content.LastModified
        }
    }));
    } catch(ex) {
        res.send([]);
    }
}

async function readFormData(req) {
    return new Promise(resolve => {
        const dataObj = {};
        var form = new formidable.IncomingForm();
        form.parse(req);

        form.on('file', (name, file) => {
            dataObj.name = name;
            dataObj.file = file;
        });

        form.on('end', () => {
            resolve(dataObj);
        });
    });
}

async function getSignedUrl(req, res) {
    try {
        const {key} = req.params;
        const url = await getPresignedURL('krayo-host', key);
        res.send(url);

    } catch(ex) {
        res.send('');
    }
}

module.exports = {
    s3Upload,
    s3Get,
    getSignedUrl
}
