/* Library Imports */
//React
import React, { useEffect, useState } from 'react';

/* Stylesheet Imports */
import './CSVUploader.scss';

/* Image Imports */

/* Component Imports */
import InputWithLabel from '../inputs/inputWithLabel/InputWithLabel';

/* Module Imports */
import { sendCSV } from 'src/modules/api';

/* Component Interfaces */

/* Component/Functions */
const CSVUploader = () => {
  //State to hold the file
  const [file, setFile] = useState<File | null>(null);

  //State to hold the result of the upload
  const [result, setResult] = useState<any>(null);

  //Effect to log the result
  useEffect(() => {
    console.log('Result Changed');
    console.log(result);
  }, [result]);

  //Effect to log the file
  useEffect(() => {
    console.log('File Changed');
    console.log(file);
  }, [file]);

  //Function to handle upload
  const handleUpload = () => {
    //Check if file is null
    if (file === null) {
      alert('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('csv', file);

    //Send the file
    sendCSV(formData, setResult);
  };

  //Function return statement
  return (
    <div className="CSVUploader">
      <InputWithLabel label="CSV File" type="file" callback={setFile} />
      <button onClick={handleUpload}>UPLOAD</button>
    </div>
  );
};

/* Export Statement */
export default CSVUploader;
