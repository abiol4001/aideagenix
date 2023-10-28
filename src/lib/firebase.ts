// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "aideagenix.firebaseapp.com",
  projectId: "aideagenix",
  storageBucket: "aideagenix.appspot.com",
  messagingSenderId: "184031382727",
  appId: "1:184031382727:web:5acdaaa2c2f1ac44de82e2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)

export async function uploadFileToFirebase(image_url:string, name: string) {
   try {
     const response = await fetch(image_url);
     const buffer = await response.arrayBuffer();
     const file_name = name.replace(" ", "") + Date.now() + ".jpeg";
     const storageRef = ref(storage, file_name);
     await uploadBytes(storageRef, buffer, {
       contentType: "image/jpeg",
     });
     const firebase_url = await getDownloadURL(storageRef);
     return firebase_url;
   } catch (error) {
    console.log(error)
   }
}
