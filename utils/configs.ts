export const AZURE_CONFIGS = {
  StorageAccountName: process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME,
  ContainerName: process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER,
  AzureSasToken: process.env.NEXT_PUBLIC_AZURE_SHARED_ACCESS_TOKEN,
};

export const AWS_CONFIG = {
  AWS_KEY: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  AWS_SECRET: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  BucketName: process.env.NEXT_PUBLIC_BUCKET_NAME,
  Region: process.env.NEXT_PUBLIC_REGION,
};
