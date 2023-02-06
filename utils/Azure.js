import { BlobServiceClient } from "@azure/storage-blob";

let instance = null;

class AzureStorageClient {
    static #CONFIG = {
        storageAccountName: process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME,
        containerName: process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER,
        sasToken: process.env.NEXT_PUBLIC_AZURE_SHARED_ACCESS_TOKEN,
    };

    constructor() {
        if (instance) {
            throw new Error("You can only create one instance of this class!");
        }
        const blobServiceClient = new BlobServiceClient(
            `https://${
                AzureStorageClient.#CONFIG.storageAccountName
            }.blob.core.windows.net/?${AzureStorageClient.#CONFIG.sasToken}`
        );
        this.containerClient = blobServiceClient.getContainerClient(
            AzureStorageClient.#CONFIG.containerName
        );
        instance = this;
    }

    getFileUrl(fileName) {
        return `https://${
            AzureStorageClient.#CONFIG.storageAccountName
        }.blob.core.windows.net/${
            AzureStorageClient.#CONFIG.containerName
        }/${fileName}`;
    }

    upload(file, onProgressChange) {
        const fileName = file.name;
        const blockBlobClient = this.containerClient.getBlockBlobClient(
            fileName
        );

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
