import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { AZURE_CONFIGS } from "./configs";
import type { TransferProgressEvent } from "@azure/core-http";

let instance: AzureStorageClient | null = null;

class AzureStorageClient {
  containerClient: ContainerClient;
  private static CONFIG = {
    storageAccountName: AZURE_CONFIGS.StorageAccountName,
    containerName: AZURE_CONFIGS.ContainerName,
    sasToken: AZURE_CONFIGS.AzureSasToken,
  };

  constructor() {
    if (instance) {
      throw new Error("You can only create one instance of this class!");
    }
    const {
      storageAccountName,
      containerName,
      sasToken,
    } = AzureStorageClient.CONFIG;
    if (!storageAccountName || !containerName || !sasToken) {
      throw new Error("Required Azure config are not set!");
    }
    const blobServiceClient = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );
    this.containerClient = blobServiceClient.getContainerClient(containerName);
    instance = this;
  }

  getFileUrl(fileName: string) {
    const { storageAccountName, containerName } = AzureStorageClient.CONFIG;
    return `https://${storageAccountName}.blob.core.windows.net/${containerName}/${fileName}`;
  }

  upload(
    file: File,
    onProgressChange: (progress: TransferProgressEvent) => void
  ) {
    const fileName = file.name;
    const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);

    return {
      uploadPromise: blockBlobClient.uploadData(file, {
        onProgress: onProgressChange,
      }),
      fileUrl: this.getFileUrl(fileName),
    };
  }
}

const azureStorageClient = Object.freeze(new AzureStorageClient());
export default azureStorageClient;
