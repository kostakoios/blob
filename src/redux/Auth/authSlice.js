import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setAuthToken } from '../../utils/constants'

const initialState = {
	token: '',
	isAuthenticated: false,
	registerError: '',
	loginError: '',
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLogin: (state, action) => {
			state.isAuthenticated = true;
			state.token = action.payload;
		},
		setLogout: (state) => {
			state.token = '',
			state.isAuthenticated = false;
		},
		catchRegisterError: (state, action) => {
			state.registerError = action.payload;
		},
		catchLoginError: (state, action) => {
			console.log('action payload: ', action.payload)
			state.loginError = action.payload;
		},
	},
});

export const login =
	(email, password, rememberMe) =>
		async (dispatch) => {
			try {
				const res = await axios({
					method: 'POST',
					url: 'http://localhost:5000/api/users/login',
					data: { email, password }
				});
				if (res.status === 200) {
					dispatch(setLogin(res.data.token));
					setAuthToken(res.data.token);
					if (rememberMe) {
						localStorage.setItem('token', JSON.stringify(res.data.token));
					}
					dispatch(catchLoginError(''));
				} else {
					console.log('first catch')
					dispatch(catchLoginError('Login failed try again'));
				}
			} catch (error) {
				console.log('second catch')
				dispatch(catchLoginError('Login failed try again'));
			}
		};
export const register =
	(firstName, lastName, email, password) =>
		async (dispatch) => {
			try {
				const res = await axios.post(
					'http://localhost:5000/api/users/register',
					{ firstName, lastName, email, password }
				);
				if (res.status === 201) {
					dispatch(setLogin(res.data.token));
					setAuthToken(res.data.token);
					localStorage.setItem('token', JSON.stringify(res.data.token));
					dispatch(catchRegisterError(''));
				} else {
					dispatch(catchRegisterError('Registration failed'));
				}
			} catch (error) {
				dispatch(catchRegisterError('Registration failed try again'));
			}
		};

export const logout = () => (dispatch, getState) => {
	localStorage.clear();
	dispatch(setLogout());
};



export const {
	setLogin,
	setLogout,
	catchRegisterError,
	catchLoginError
} = authSlice.actions;

export default authSlice.reducer;