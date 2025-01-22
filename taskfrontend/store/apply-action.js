import { createStorageClient } from '@/config/appwrite';
import { ID } from 'appwrite';
import { setApplyError, setResume, submitApplication, resetApplyForm } from '@/store/apply';

const storage = createStorageClient();
const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_Resume;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

export const handleFileUpload = async (file, formData, dispatch, setUploading) => {
    setUploading(true);
    try {
        if (!bucketId) {
            throw new Error('Bucket ID is not set in the environment.');
        }

        const uniqueId = formData.Id || ID.unique();
        const uploadedFile = await storage.createFile(bucketId, uniqueId, file);

        const resumeUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${uniqueId}/view?project=${projectId}`;
        // console.log('File URL:', resumeUrl);
        dispatch(setResume(resumeUrl));
        return resumeUrl;
    } catch (error) {
        dispatch(setApplyError(error.message || 'Error uploading file.'));
        throw error;
    } finally {
        setUploading(false);
    }
};

export const postJobData = async (formData, jobId, dispatch, resumeUrl) => {
    const userID = localStorage.getItem('userId');
    if (!userID) {
        dispatch(setApplyError('User ID not found in localStorage!'));
        return;
    }
    const updatedFormData = { ...formData, userID, jobId, resumeUrl };

    try {
        const response = await fetch(
            `https://orderhe-a9147-default-rtdb.firebaseio.com/applyJob/${formData.Id}.json`,
            {
                method: 'PUT',
                body: JSON.stringify(updatedFormData),
                headers: { 'Content-Type': 'application/json' },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to submit application!');
        }

        dispatch(submitApplication());
        // console.log('Application submitted successfully:', updatedFormData);
    } catch (error) {
        dispatch(resetApplyForm())
        dispatch(setApplyError(error.message));
        //throw new Error('Error submitting application')
        //  console.error('Error submitting application:', error);
    }
};


export const fetchJobById = async (id, ID) => {
    try {
        const response = await fetch('https://orderhe-a9147-default-rtdb.firebaseio.com/applyJob.json');
        if (!response.ok) {
            throw new Error('Failed to fetch jobs!');
        }
        //console.log(id)
        //console.log(ID)
        const data = await response.json();
        if (ID) {
            const filteredJobs = Object.keys(data)
                .filter((key) => data[key].Id === ID)
                .map((key) => data[key]);

            return filteredJobs;

        }
        if (data) {
            const filteredJobs = Object.keys(data)
                .filter((key) => data[key].jobId === id)
                .map((key) => data[key]);

            return filteredJobs.length > 0 ? filteredJobs : null;
        } else {
            return null;
        }
    } catch (err) {
        throw new Error('Failed to Get Application!');
    }
};


export const updateJobStatus = async (status, jobId) => {
    const userID = localStorage.getItem('companyId');
    if (!userID) {
        alert('User ID not found in localStorage!');
        return;
    }

    try {
        const response = await fetch(
            `https://orderhe-a9147-default-rtdb.firebaseio.com/applyJob.json`
        );
        const allJobs = await response.json();
        const job = Object.values(allJobs).find(job => job.Id === jobId);
        if (job) {
            const updatedData = {
                ...job,
                status,
            };
            const updateResponse = await fetch(
                `https://orderhe-a9147-default-rtdb.firebaseio.com/applyJob/${jobId}.json`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(updatedData),
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (!updateResponse.ok) {
                throw new Error('Failed to update application status!');
            }

            return `Application ${status}`;
        } else {
            alert('Job not found!');
        }
    } catch (error) {
        throw new Error(`Failed to ${status} Application!`);
    }
};

