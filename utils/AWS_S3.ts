import AWS from "aws-sdk";
import { AWS_CONFIG } from "./configs";

let instance: AWS_S3 | null = null;

class AWS_S3 {
  S3: AWS.S3;

  private static CONFIG = {
    AWS_KEY: AWS_CONFIG.AWS_KEY,
    AWS_SECRET: AWS_CONFIG.AWS_SECRET,
    bucketName: AWS_CONFIG.BucketName,
    region: AWS_CONFIG.Region,
  };

  constructor() {
    if (instance) {
      throw new Error("You can only create one instance of this class!");
    }
    const { AWS_KEY, AWS_SECRET, bucketName, region } = AWS_S3.CONFIG;
    if (!AWS_KEY || !AWS_SECRET || bucketName || !region) {
      throw new Error("Required AWS config are not set!");
    }
    AWS.config.update({
      accessKeyId: AWS_KEY,
      secretAccessKey: AWS_SECRET,
    });
    this.S3 = new AWS.S3();
    instance = this;
  }

  getFileUrl(fileName: string) {
    const { bucketName, region } = AWS_S3.CONFIG;
    return `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
  }

  upload(
    file: File,
    onProgressChange: (progress: AWS.S3.ManagedUpload.Progress) => void
  ) {
    const { bucketName } = AWS_S3.CONFIG;

    if (!instance || !bucketName) {
      throw new Error(
        "You need to instantiate an AWS instance before using this method!"
      );
    }

    const params: AWS.S3.PutObjectRequest = {
      ACL: "public-read",
      Key: file.name,
      ContentType: file.type,
      Body: file,
      Bucket: bucketName,
    };

    return {
      uploadHandler: this.S3.upload(params).on(
        "httpUploadProgress",
        onProgressChange
      ),
      url: this.getFileUrl(file.name),
    };
  }
}

export default Object.freeze(new AWS_S3());
