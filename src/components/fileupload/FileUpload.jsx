import axios from 'axios';
import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', 'jobe');
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post('http://localhost:5000/api/files/writeFile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure the content type is set to multipart/form-data
            'Authorization': `Bearer ${token}` // Include the token in the request headers
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
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
};

export default FileUpload;
