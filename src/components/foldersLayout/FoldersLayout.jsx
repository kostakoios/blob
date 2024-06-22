import { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import folder from "../../assets/images/folder.png";
import { fileTypeOptions, fileTypes } from '../../utils';
import defaultimg from "../../assets/images/defaultimg.png";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFoldersContent } from '../../redux/Folder/folderSlice'
import { substructLocation } from "../../utils/constants";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from "axios";

const FoldersLayout = () => {
  // const [foldersContent, setFoldersContent] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation()
  const foldersContent = useSelector(state => state.folder.foldersContent)
  console.log(foldersContent, 'foldersContent')
  // Utility function to get file type
  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    return extension;
  };

  const getContent = () => {
    console.log('wow')
    const path = substructLocation(location.pathname)
    dispatch(getFoldersContent(path))
  };

  const deleteFolder = async (folderName) => {
    try {
      const path = substructLocation(location.pathname)
      const res = await axios.post(
        "http://localhost:5000/api/files/deleteDirectory",
        { path: `${path}/${folderName}` }
      );
      if (res.status === 204) {
        dispatch(getFoldersContent(path))
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      //   setErrorMessage(error.response.data.error);
    }
  }

  useEffect(() => {
    getContent();
  }, [location.pathname]);

  return (
    <div>
      <Grid container spacing={3}>
        {foldersContent?.length > 0 ? foldersContent.map((item, index) => {
          console.log(item, 'item')
          return (
            <Grid item key={index}>
              {item.isDirectory ?
                <div style={{ position: 'relative' }} className="fileCard">
                  <HighlightOffIcon
                    style={{ position: 'absolute', right: 20 }}
                    className="deleteIcon"
                    onClick={() => deleteFolder(item.name)}
                  />
                  <NavLink to={`${location.pathname}/${getFileType(item.name)}`}>
                    <Box //folder
                      sx={{
                        width: 200,
                        height: 200,
                        backgroundImage: `url(${folder})`,
                        backgroundSize: "contain",
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                  </NavLink>
                </div>
                :
                <Box // file
                  sx={{
                    width: 175,
                    height: 200,
                    backgroundImage: fileTypes.includes(getFileType(item.name)) ?
                      `url(${fileTypeOptions[getFileType(item.name)]})` : `url(${defaultimg})`,
                    backgroundSize: "contain",
                    backgroundRepeat: 'no-repeat'
                  }}
                />

              }
              <Typography
                sx={{
                  textAlign: 'center',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: 210,
                  overflow: 'hidden'
                }}
              >{item.name}</Typography>
            </Grid>
          )
        }
        ) : <Typography>No folders and files found</Typography>}
      </Grid>
    </div>
  );
};

export default FoldersLayout;