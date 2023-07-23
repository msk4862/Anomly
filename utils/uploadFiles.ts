import awsStorageClient from "./AWS_S3";
import azureStorageClient from "./Azure";

type TOnProgressChange = (progress: number) => void;

export const uploadToAzure = (
  file: File,
  onProgressChange: TOnProgressChange
) => {
  const fileSize = file.size;

  return azureStorageClient.upload(file, ({ loadedBytes }) => {
    onProgressChange(loadedBytes / fileSize);
  });
};

export const uploadToAWS = (
  file: File,
  onProgressChange: TOnProgressChange
) => {
  return awsStorageClient.upload(file, ({ loaded, total }) => {
    onProgressChange(loaded / total);
  });
};
