import { createSlice } from '@reduxjs/toolkit';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const uniqueId = uuidv4();
const initialState = {
    formData: {
        name: '',
        email: '',
        password: '',
        Id: uniqueId
    },
    isSignedUp: false,
    error: null,
    user: null,
    company: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateForm: (state, action) => {
            const { name, value } = action.payload;
            state.formData[name] = value;
        },
        signupUser: (state) => {
            state.user = { ...state.formData };
            localStorage.setItem('user', state.user);

            localStorage.setItem('userId', state.formData.Id);

            state.isSignedUp = true;
            state.error = null;
        },
        signupCompany: (state) => {
            state.company = { ...state.formData, companyId: state.formData.Id };
            localStorage.setItem('company', state.company);
            localStorage.setItem('companyId', state.formData.Id);
            state.companyId = state.formData.Id;
            state.isSignedUp = true;
            state.error = null;
        },
        resetForm: (state) => {
            state.formData = {
                name: '',
                email: '',
                password: '',
                Id: uuidv4(),
            };
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.company = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.company = null;
            localStorage.removeItem('user');
            localStorage.removeItem('userId');
            localStorage.removeItem('company');
            localStorage.removeItem('companyId');
            document.cookie = "name=user; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
            document.cookie = "name=company; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

        },
    },
});

export const {
    updateForm,
    signupUser,
    signupCompany,
    resetForm,
    setError,
    setUser,
    getId,
    logout,

} = authSlice.actions;

export default authSlice;
