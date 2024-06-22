import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileUpload from '../fileupload/FileUpload';
import FolderUpload from '../folderUpload/FolderUpload';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import CreateNewFolder from '../createnewfolder/CreateNewFolder';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useParams } from "react-router-dom";

export default function FileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(null);
  const params = useParams()

  console.log(params, 'params now I am herereee')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleClickOpen = () => {
    setOpenModal(true);
    handleClose();
  };


  return (
    <div>
      <Button sx={{ m: 3 }} id="basic-button" variant="outlined" size="large" onClick={handleClick}>
        + New
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Paper sx={{ width: 320, maxWidth: '100%' }} elevation={0}>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <CreateNewFolderOutlinedIcon fontSize="small" />
              </ListItemIcon>
              {/* <CreateNewFolder handleClose={handleClose}/> */}
              <Button
                variant="text"
                onClick={handleClickOpen}
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  textTransform: "capitalize",
                  color: "black",
                }}
              >
                Create Folder
              </Button>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <UploadFileIcon fontSize="small" />
              </ListItemIcon>
              <FileUpload handleClose={handleClose} />
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <DriveFolderUploadOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <FolderUpload />
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
      <CreateNewFolder openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}