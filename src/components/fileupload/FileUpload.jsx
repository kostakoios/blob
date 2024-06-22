import axios from 'axios';
import { useState } from 'react';

const FileUpload = ({ handleClose }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      handleUpload(e.target.files[0])
    }
  };

  const handleUpload = async (file) => {
    console.log(file, 'file')
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', 'jobe');
      // Retrieve the token from localStorage
      try {
        const response = await axios.post('http://localhost:5000/api/files/writeFile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure the content type is set to multipart/form-data
          }
        });

        if (response.status === 200) {
          alert('File uploaded successfully');
        } else {
          alert('File upload failed');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div style={{width: '100%', height: '100%'}}>
      <label htmlFor="file-upload" className="custom-file-upload" onClick={handleClose}>
        File Upload
      </label>
      <input id="file-upload" type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
