import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';

import dotenv from 'dotenv';
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});

const s3Service: S3 = new S3();
console.log(s3Service);

const params = {
  Bucket: 'hkn-resume',
  Body: fs.createReadStream('./README.md'),
  Key: 'README.md',
};
console.log(params);

console.log('uploading');
s3Service.upload(params, (data: any, err: any) => {
  console.log(data, err);
});
