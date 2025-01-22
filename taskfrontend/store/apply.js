import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const uniqueId = uuidv4();

const initialState = {
    formData: {
        name: '',
        phone: '',
        email: '',
        resume: '',
        status: 'Panding',
        Id: uniqueId,
    },
    isApplied: false,
    error: null,
    apply: null,
};

export const applyJobSlice = createSlice({
    name: 'applyJob',
    initialState,
    reducers: {
        updateApplyForm: (state, action) => {
            const { name, value } = action.payload;
            state.formData[name] = value;
        },
        setResume: (state, action) => {
            state.formData.resume = action.payload;
        },
        resetResume: (state) => {
            state.formData = {
                name: '',
                phone: '',
                email: '',
                resume: '',
                status: 'Panding',
                Id: uuidv4(),

            };
        },
        submitApplication: (state) => {
            state.apply = { ...state.formData };
            state.isApplied = true;
            state.error = null;
        },
        resetApplyForm: (state) => {
            state.formData = {
                name: '',
                phone: '',
                email: '',
                resume: '',
                status: 'Panding',
                Id: uuidv4(),

            };
            state.error = null
            state.isApplied = false
        },
        setApplyError: (state, action) => {
            state.error = action.payload;
        },
        resterror: (state) => {
            state.error = null
            state.isApplied = false
        }

    },
});

export const {
    updateApplyForm,
    setResume,
    submitApplication,
    resetApplyForm,
    resetResume,
    setApplyError,
    resterror

} = applyJobSlice.actions;

export default applyJobSlice;
