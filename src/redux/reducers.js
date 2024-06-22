import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import folderReducer from './Folder/folderSlice';

const appReducer = combineReducers({
    auth: authReducer,
    folder: folderReducer
});

const RootReducer = (state, action) => {
    return appReducer(state, action);
};

export default RootReducer;