import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { app } from "./firebase";

async function uploadFile(
  folder: string,
  fileName: string,
  file: File,
  log: true,
  callback: any
) {
  //Initialize Storage
  const storage = getStorage(app);
  // Create a reference to file
  const fileRef = ref(storage, `${folder}/${fileName}`);

  try {
    // Upload file
    const upload = await uploadBytes(fileRef, file);

    if (upload.metadata) {
      const fileURL = await getDownloadURL(upload.ref);
      if (callback) callback(fileURL);
      if (log) console.log({ message: "Upload Successful", url: fileURL });
      return { message: "Upload Successful", url: fileURL };
    }
  } catch (error) {
    if (log) console.log({ message: "Upload Failed", error: error });
    return { message: "Upload Failed", error: error };
  }
}

export { uploadFile };
