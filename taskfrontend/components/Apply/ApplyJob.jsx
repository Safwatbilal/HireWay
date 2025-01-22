'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateApplyForm,
  setResume,
  resetResume,
  submitApplication,
  resetApplyForm,
  setApplyError,
  resterror
} from '@/store/apply';
import { handleFileUpload, postJobData } from '@/store/apply-action';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const ApplyJob = ({ id }) => {
  const dispatch = useDispatch();
  const router=useRouter()
  const { formData, isApplied, error } = useSelector((state) => state.applyJob);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    if (isApplied) {
      toast.success('Your Application is Sent.')
      dispatch(resetApplyForm())
      document.getElementById('resume').value = '';
      router.push('/')
    }
    if(error){
      dispatch(resetResume())
      document.getElementById('resume').value = '';
    }
  }, [isApplied, dispatch,error]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    dispatch(resterror());
    if (name === 'resume' && files.length > 0) {
      const file = files[0];
      dispatch(setResume({ name: file.name, size: file.size, type: file.type }));
    } else {
      dispatch(updateApplyForm({ name, value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.phone || !formData.email) {
      dispatch(setApplyError('Please fill out all fields.'));
      return;
    }
  
    const fileInput = document.getElementById('resume');
    let fileData;
  
     
      if (fileInput && fileInput.files.length > 0) {
        fileData = await handleFileUpload(fileInput.files[0], formData, dispatch, setUploading);
      }
    
  
    postJobData(formData, id, dispatch, fileData);
  };
  

  return (
    <div className='centerFrom'>
      <div className="form">
        <h2 className="textForm">Apply for Job</h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            >
          
            <div >
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="input"
                />
            </div>

            <div >
              <input
                type="phone"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="input"
                />
            </div>

            <div >
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input"
              />
            </div>

            <div >
              <label htmlFor="resume" className="block font-medium mb-2 text-textColor">
                Upload Resume
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleChange}
                className="w-full text-textColor bg-bgColor border border-textColor rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-second file:text-white hover:file:bg-opacity-80"
              />
            </div>

            <button
              type="submit"
              className="buttonForm"
              disabled={uploading}
              >
              {uploading ? 'Uploading...' : 'Submit Application'}
            </button>

            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
  );
};

export default ApplyJob;
