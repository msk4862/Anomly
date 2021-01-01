import AWS from "aws-sdk";

class AWS_Ops {
    static #CONFIG = {
        AWS_KEY: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
        AWS_SECRET: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME,
        region: process.env.NEXT_PUBLIC_REGION,
    };

    constructor() {
        AWS.config.update({
            accessKeyId: AWS_Ops.#CONFIG.AWS_KEY,
            secretAccessKey: AWS_Ops.#CONFIG.AWS_SECRET,
        });

        this.fileName = "";
    }

    getUrl(fileName) {
        return `https://${AWS_Ops.#CONFIG.bucketName}.s3.${
            AWS_Ops.#CONFIG.region
        }.amazonaws.com/${fileName}`;
    }

    uploadToS3(file) {
        const params = {
            ACL: "public-read",
            Key: file.name,
            ContentType: file.type,
            Body: file,
            Bucket: AWS_Ops.#CONFIG.bucketName,
        };

        const s3 = new AWS.S3();
        return {
            uploadHandler: s3.upload(params),
            url: this.getUrl(file.name),
        };
    }
}

export default AWS_Ops;
