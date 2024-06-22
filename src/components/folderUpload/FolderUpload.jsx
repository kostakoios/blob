import axios from 'axios';
import React, { useState } from 'react';

const FolderUpload = ({ handleClose }) => {
  const [files, setFiles] = useState([]);

  const handleFolderChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      handleUpload(selectedFiles);
    }
  };

  const handleUpload = async (files) => {
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.webkitRelativePath);
    });
    formData.append('path', 'jobe');
    
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:5000/api/files/uploadFolder', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Include the token in the request headers
        },
      });

      if (response.status === 200) {
        alert('Folder uploaded successfully');
      } else {
        alert('Folder upload failed');
      }
    } catch (error) {
      console.error('Error uploading folder:', error);
    }
  };

  return (
    <div style={{width: '100%', height: '100%'}}>
      <label htmlFor="folder-upload" className="custom-file-upload" onClick={handleClose}>
        Folder Upload
      </label>
      <input
        id="folder-upload"
        type="file"
        webkitdirectory="true"
        directory=""
        onChange={handleFolderChange}
        multiple
      />
    </div>
  );
};

export default FolderUpload;
