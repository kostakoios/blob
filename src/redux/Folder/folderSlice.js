import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setAuthToken } from '../../utils/constants'

const initialState = {
    foldersContent: null
}

export const folderSlice = createSlice({
    name: 'folder',
    initialState,
    reducers: {
        setFoldersContent: (state, action) => {
            state.foldersContent = action.payload;
        }
    },
});

export const getFoldersContent = (path) =>
    async (dispatch) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/files/listDirectory",
                { dirPath: path ?? "" }
            );
            if (res.status === 200) {
                dispatch(setFoldersContent(res.data));
            } else {
                throw new Error("Registration failed");
            }
        } catch (error) {
            console.log('second catch')
        }
    };

export const {
    setFoldersContent
} = folderSlice.actions;

export default folderSlice.reducer;