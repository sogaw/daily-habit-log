import { getStorage } from "firebase-admin/storage";

export const getSignedUrl = async (path: string) => {
  const file = await getStorage().bucket().file(path);

  if (process.env.NODE_ENV == "production") {
    const hour = 60 * 60 * 1_000;
    const [signedUrl] = await file.getSignedUrl({ action: "read", expires: Date.now() + hour });
    return signedUrl;
  }

  return file.publicUrl();
};

export const deleteFile = async (path: string) => {
  await getStorage().bucket().file(path).delete();
};

export const deleteFileRecursive = async (prefix: string) => {
  await getStorage().bucket().deleteFiles({ prefix });
};
