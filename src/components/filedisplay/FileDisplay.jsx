// // FileDisplay.js
// import { useState } from 'react';

// const FileDisplay = () => {
//   const [filePath, setFilePath] = useState('');
//   const [fileUrl, setFileUrl] = useState('');

//   const handleFetchFile = async () => {
//     try {
//       const response = await fetch(`/api/files/getInfo?filePath=${encodeURIComponent(filePath)}`);
//       if (response.ok) {
//         const fileBlob = await response.blob();
//         const url = URL.createObjectURL(fileBlob);
//         setFileUrl(url);
//       } else {
//         console.error('File not found');
//       }
//     } catch (error) {
//       console.error('Error fetching the file:', error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={filePath}
//         onChange={(e) => setFilePath(e.target.value)}
//         placeholder="Enter relative file path"
//       />
//       <button onClick={handleFetchFile}>Fetch File</button>
//       {fileUrl && (
//         <div>
//           <a href={fileUrl} download={filePath.split('/').pop()}>
//             Download {filePath.split('/').pop()}
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileDisplay;


// FileUpload.js
import { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedFilePath, setUploadedFilePath] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please choose a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/files/write', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedFilePath(data.filePath);
        setFileUrl('');
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFetchFile = async () => {
    if (!uploadedFilePath) {
      alert('No file uploaded');
      return;
    }

    try {
      const response = await fetch(`/api/files/getInfo?filePath=${encodeURIComponent(uploadedFilePath)}`);
      if (response.ok) {
        const fileBlob = await response.blob();
        const url = URL.createObjectURL(fileBlob);
        setFileUrl(url);
      } else {
        console.error('File not found');
      }
    } catch (error) {
      console.error('Error fetching the file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      {uploadedFilePath && (
        <div>
          <button onClick={handleFetchFile}>Fetch Uploaded File</button>
          {fileUrl && (
            <div>
              <a href={fileUrl} download={uploadedFilePath.split('/').pop()}>
                Download {uploadedFilePath.split('/').pop()}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
