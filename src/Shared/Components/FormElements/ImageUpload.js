import React, { useRef, useState, useEffect } from "react";
import "./ImageUpload.css";
import Button from "./Button";

export default function ImageUpload(props) {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [isValid, setIsValid] = useState(false);
  const [previewURL, setPreviewUrl] = useState();

  useEffect(() => {
    if (!file) {
      return;
    } else {
      //browser side api
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files.length === 1 && event.target.files) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form_control">
      <input
        type="file"
        style={{ display: "none" }}
        id={props.id}
        accept=".jpg,.jpeg,.png"
        ref={filePickerRef}
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewURL && <img src={previewURL} alt="Preview" />}
          {!previewURL && <p>Please Pick An Image</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
}
