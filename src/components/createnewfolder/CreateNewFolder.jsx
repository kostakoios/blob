import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getFoldersContent } from '../../redux/Folder/folderSlice';
import { substructLocation } from "../../utils/constants";

function CreateNewFolder({ openModal, setOpenModal }) {
  const [folderName, setFolderName] = useState("");
  const params = useParams()
  const dispatch = useDispatch()

  const handleChangeFolderName = (e) => {
    setFolderName(e.target.value);
  };

  const handleDialogClose = () => {
    setOpenModal(false);
  };

  // folderName, params.folderId
  const createNewFolder = async () => {
    try {
      const path = substructLocation(location.pathname)
      const res = await axios.post(
        "http://localhost:5000/api/files/createDirectory",
        { path: `${path}/${folderName}` }
      );
      if (res.status === 201) {
        dispatch(getFoldersContent(path))
        handleDialogClose()
        // setFoldersContent(res.data);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      //   setErrorMessage(error.response.data.error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={openModal}
        // onClose={handleDialogClose}
        PaperProps={{
          style: { padding: "20px 60px" },
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            // handleDialogClose();
          },
        }}
      >
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="name"
            name="Folder"
            type="text"
            placeholder="New folder name"
            fullWidth
            variant="outlined"
            value={folderName}
            onChange={handleChangeFolderName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={createNewFolder}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default CreateNewFolder;
