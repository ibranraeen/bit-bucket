const express = require('express');
const app = express();
const s3Controller = require('./src/s3-controller');

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'App is running on localhost:3000',
    })
});

app.post('/upload-to-s3', s3Controller.s3Upload);

app.get('/all-files', s3Controller.s3Get);

app.get('/get-object-url/:key', s3Controller.getSignedUrl);


const port = process.env.port || '4500';
app.listen(port, () => {
    console.log('App Listening on : ' + port);
});
