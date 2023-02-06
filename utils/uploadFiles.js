import awsStorageClient from "./AWS_S3";
import azureStorageClient from "./Azure";

export const uploadToAzure = (file, onProgressChange) => {
    const fileSize = file.size;

    return azureStorageClient.upload(file, ({ loadedBytes }) => {
        onProgressChange(loadedBytes / fileSize);
    });
};

export const uploadToAWS = (file, onProgressChange) => {
    return awsStorageClient.upload(file, ({ loaded, total }) => {
        onProgressChange(loaded / total);
    });
};
