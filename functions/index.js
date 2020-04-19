const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp()
const path = require('path');
const os = require('os');
// const express = require('express');
const cors = require('cors')({ origin: true });
// cors.use(cors());
const BusBoy = require('busboy')
const fs = require('fs');
const gcConfig = {
    projectId: 'meeting-scheduler-9cee1',
    keyFilename: "meeting-scheduler-9cee1-firebase-adminsdk-3unr4-09df5fe69a.json"
}
const { Storage } = require("@google-cloud/storage");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileChange = functions.storage.object().onFinalize(event => {
    console.log(event)
    // const event=event.metadata;
    const bucket = event.bucket;
    const contentType = event.contentType;
    const filePath = event.name;
    console.log('file change detected, processing')
    if (event.resourceState === 'not_exists') {
        console.log('we already deleted this file.Exit...')
        return null;
    }
    if (path.basename(filePath).startsWith('renamed-')) {
        console.log('renamed already')
        return null;
    }
    const gcs = new Storage((gcConfig));
    const destBucket = gcs.bucket(bucket);
    console.log(destBucket);
    const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
    const metadata = { contentType: contentType }
    return destBucket.file(filePath).download({
        destination: tmpFilePath
    })
        .then(() => {
            return destBucket.upload(tmpFilePath, {
                destination: 'renamed-' + path.basename(filePath),
                metadata: metadata
            })  // ;return fs.unlinkSync(tmpFilePath);
        });
});
exports.upLoadFile = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const busBoy = new BusBoy({ headers: request.headers });
        let uploadData = null;
        if (request.method !== "POST") {
            return response.status(405).set('Allow', 'POST').json({
                message: 'Not Allowed!!'
            })
        }
        busBoy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            const filepath = path.join(os.tmpdir(), filename);
            uploadData = { file: filepath, type: mimetype };
            file.pipe(fs.createWriteStream(filepath));
        });
        busBoy.on('finish', () => {
            const bucket = gcs.bucket('meeting-scheduler-9cee1.appspot.com');
            bucket
                .upload(uploadData.file, {
                    uploadType: 'media',
                    metadata: {
                        metadata: {
                            contentType: uploadData.type
                        }
                    }
                })
                .then(() => {
                    response.status(200).json({
                        message: 'It Works!'
                    });
                })
                .catch(err => {

                    response.status(500).json({
                        error: err
                    })
                })
        });
        request.pipe(busBoy)
        // busBoy.end(request.rawBody);


    });

});
