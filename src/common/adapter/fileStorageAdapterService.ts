import { Injectable } from '@nestjs/common';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import AWS from 'aws-sdk';

@Injectable()
export class FileStorageAdapter {
    S3Client: S3Client;
    constructor() {
        const REGION = 'us-east-1';
        this.S3Client = new S3Client({
            region: REGION,
            endpoint: 'https://storage.yandexcloud.net/inctagram-backet',
            credentials: {
                secretAccessKey: 'YCMPYfbLH7DvwMCwDW-ws13X8ogS55ulP7p7yioN',
                accessKeyId: 'YCAJE1pa17tcniaBxGjTaj_t3',
            },
        });
    }

    async getAvatar(userId) {
        const bucketParams = { Bucket: 'inctagram-backet', Key: `${userId}/avatar/avatar_.jpg` };
        try {
            return `https://storage.yandexcloud.net/${bucketParams.Bucket}/inctagram-backet/${bucketParams.Key}`;
            // const command = new GetObjectCommand(bucketParams);
            // const response = await this.S3Client.send(command);
            // return response.Body;
        } catch (e) {
            console.log(e);
        }
    }

    async saveAvatar(userId: string, originalName: string, buffer: Buffer) {
        const bucketParams = { Bucket: 'inctagram-backet', Key: `${userId}/avatar/avatar_.jpg`, Body: buffer, ContentType: 'images/jpg' };

        const command = new PutObjectCommand(bucketParams);

        try {
            const uploadResult = await this.S3Client.send(command);
        } catch (e) {
            console.log(e);
        }
        return {
            url: '',
            fieldId: '',
        };
    }
    async deleteAvatar(userId: string) {
        const bucketParams = { Bucket: 'inctagram-backet', Key: `${userId}/avatar/avatar_.jpg` };
        try {
            const deleteAvatar = await this.S3Client.send(new DeleteObjectCommand(bucketParams));
        } catch (e) {
            console.log('Удаление не прошло');
        }
    }

    async savePostPhoto(userId: string, originalName: any, buffer: any, i: number, postId: string) {
        const bucketParams = { Bucket: 'inctagram-backet', Key: `${userId}/post/${postId}/${i}post_.jpg`, Body: buffer, ContentType: 'images/jpg' };

        const command = new PutObjectCommand(bucketParams);

        try {
            const uploadResult = await this.S3Client.send(command);
        } catch (e) {
            console.log(e);
        }
    }
    async deletePostPhoto(userId: string, postId: string, i: number) {
        console.log(userId);
        const bucketParams = { Bucket: 'inctagram-backet', Key: `${userId}/post/${postId}/${i}post_.jpg` };
        const bucketParamsDeleteFolder = { Bucket: 'inctagram-backet', Key: `${userId}/post/${postId}` };
        try {
            const deletePostPhoto = await this.S3Client.send(new DeleteObjectCommand(bucketParams));
            await this.S3Client.send(new DeleteObjectCommand(bucketParamsDeleteFolder));
        } catch (e) {
            console.log('Удаление не прошло');
        }
    }
}

//const AWS = require('aws-sdk');
//
// // Set your Yandex Cloud credentials
// const s3 = new AWS.S3({
//     accessKeyId: 'YOUR_ACCESS_KEY_ID',
//     secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
//     region: 'YOUR_REGION'
// });
//
// // Set the name of the bucket and the key of the image
// const bucketName = 'YOUR_BUCKET_NAME';
// const imageKey = 'YOUR_IMAGE_KEY';
//
// // Get the URL of the image
// const url = s3.getSignedUrl('getObject', {
//     Bucket: bucketName,
//     Key: imageKey,
//     Expires: 3600 // The URL will expire in 1 hour
// });
//
// console.log(url); // Output the URL to the console
