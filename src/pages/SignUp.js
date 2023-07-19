import React, { useState } from 'react'


import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/index";

const SignUp = () => {
  
  
  // upload image to firebase and get image url (start) ==================================================
  const [imageURL, setImageURL] = useState(null)

  const handleImage = async (e) => {
    const files = e.target.files;
    const file = files[0];
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              setImageURL(url)
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("Upload error", err);
        });
    } catch (error) {
      console.log("Error occurred", error);
    }
  };
  console.log("imageURL",imageURL);
// End of upload image url to firebase ---------------------------------------------------------
  return (
    <>
   <input type='file' onChange={handleImage} />
 
    </>
  )
}

export default SignUp