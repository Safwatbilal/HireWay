import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// جلب companyId مباشرة من localStorage عند التهيئة
const uniqueId = uuidv4();
const initialState = {
    formData: {
        jobTitle: '',
        workHours: '',
        city: '',
        jobDescription: '',
        Id: uniqueId,
    },
    isJobAdded: false,
    error: null,
    job: null,
};

export const addJobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        updateJobForm: (state, action) => {
            const { name, value } = action.payload;
            state.formData[name] = value;
        },
        addJob: (state) => {
            state.job = { ...state.formData };
            state.isJobAdded = true;
            state.error = null;
        },
        resetJobForm: (state) => {
            state.formData = {
                jobTitle: '',
                workHours: '',
                city: '',
                jobDescription: '',
                Id: uuidv4(),
            };
        },
        setJobError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    updateJobForm,
    addJob,
    resetJobForm,
    setJobError,
} = addJobSlice.actions;

export default addJobSlice;
