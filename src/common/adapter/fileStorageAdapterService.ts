import { Injectable } from '@nestjs/common';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

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
        const bucketParams = { Bucket: 'inctagram-backet', Key: `${userId}_.jpg` };
        try {
            const command = new GetObjectCommand(bucketParams);
            const response = await this.S3Client.send(command);
            // @ts-ignore
            return response.Body.read().toString('base64');
        } catch (e) {
            console.log(e);
        }
    }

    async saveAvatar(userId: string, originalName: string, buffer: Buffer) {
        const bucketParams = { Bucket: 'inctagram-backet', Key: `${userId}_.jpg`, Body: buffer, ContentType: 'images/jpg' };

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
        console.log('tyt');
        const bucketParams = { Bucket: 'inctagram-backet', Key: `${userId}_.jpg` };
        try {
            const deleteAvatar = await this.S3Client.send(new DeleteObjectCommand(bucketParams));
        } catch (e) {
            console.log('Удаление не прошло');
        }
    }
}
