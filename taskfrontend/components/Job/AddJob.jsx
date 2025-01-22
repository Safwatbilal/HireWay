'use client';
import { useDispatch, useSelector } from 'react-redux';
import { updateJobForm, addJob, setJobError, resetJobForm } from '@/store/job';
import { jobDate } from '@/store/job-action';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import CityDropdown from '../CityDropdown';
const AddJob = () => {
    const router = useRouter();
    const { formData } = useSelector((state) => state.job);
    const [validationError, setValidationError] = useState(null);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateJobForm({ name, value }));
        setValidationError(null);
    };

    const validateJobData = () => {
        if (!formData.jobTitle || !formData.workHours || !formData.city || !formData.jobDescription) {
            return 'All fields are required!';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateJobData();
        if (error) {
            setValidationError(error);
            return;
        }
    
        try {
            dispatch(addJob()); 
            await dispatch(jobDate(formData));
            toast.success(`Added Job: ${formData.jobTitle}`);
            dispatch(resetJobForm());
            setValidationError(null);
            router.push('/Myjob');
        } catch (error) {
       
            dispatch(setJobError('Failed to add job'));
            toast.error('An error occurred while adding the job.'); 
        }
    };
    

    return (
        <div className="centerFrom">
            <div className="form">
                <h1 className="textForm">Add Job</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="jobTitle"
                            placeholder="Job Title"
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            className="input"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="number"
                            name="workHours"
                            min={0}
                            max={24}
                            placeholder="Work Hours"
                            value={formData.workHours}
                            onChange={handleInputChange}
                            className="input"
                            required
                        />
                    </div>
                    <div>
                        <CityDropdown
                            selectedCity={formData.city}  
                            background={true}
                            setSelectedCity={(city) => dispatch(updateJobForm({ name: 'city', value: city }))} 
                        />
                    </div>

                    <div>
                        <textarea
                            name="jobDescription"
                            placeholder="Job Description"
                            value={formData.jobDescription}
                            onChange={handleInputChange}
                            className="textArea input"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="buttonForm"
                    >
                        Submit
                    </button>
                    
                    {validationError && <p className="error">{validationError}</p>}
                </form>
            </div>
        </div>
    );
};

export default AddJob;
