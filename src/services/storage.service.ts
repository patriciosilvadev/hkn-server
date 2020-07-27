import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});

const s3Service: S3 = new S3();

// const get(folder: string, filename: string): file???= {

// }

// const put(folder: string, filename: string, filedata: ???) {

// }

// const delete(folder: string, filename: string) {

// }
