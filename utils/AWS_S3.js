import AWS from "aws-sdk";

let instance = null;

class AWS_S3 {
    static #CONFIG = {
        AWS_KEY: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
        AWS_SECRET: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME,
        region: process.env.NEXT_PUBLIC_REGION,
    };

    constructor() {
        if (instance) {
            throw new Error("You can only create one instance of this class!");
        }
        AWS.config.update({
            accessKeyId: AWS_S3.#CONFIG.AWS_KEY,
            secretAccessKey: AWS_S3.#CONFIG.AWS_SECRET,
        });
        this.s3 = new AWS.S3();
        instance = this;
    }

    getFileUrl(fileName) {
        return `https://${AWS_S3.#CONFIG.bucketName}.s3.${
            AWS_S3.#CONFIG.region
        }.amazonaws.com/${fileName}`;
    }

    upload(file, onProgressChange) {
        const params = {
            ACL: "public-read",
            Key: file.name,
            ContentType: file.type,
            Body: file,
            Bucket: AWS_S3.#CONFIG.bucketName,
        };

        return {
            uploadHandler: this.s3
                .upload(params)
                .on("httpUploadProgress", onProgressChange),
            url: this.getFileUrl(file.name),
        };
    }
}

export default Object.freeze(new AWS_S3());
