'use client';

import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchJobsByCompanyId } from '@/store/job-action';
import { companyId } from '@/util/auth';
import JobItem from './JobItem';
import LoadingSpinner from '../LoadingSpinner';
import { filterJobs } from '@/store/search-action';
const JobList = ({ type, nameDescription, city, fromHour, toHour }) => {
  const dispatch = useDispatch();
  const [allJobs, setAllJobs] = useState([]); 
  const [jobs, setJobs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        let jobsData;
        if (type === 'allJob') {
          jobsData = await dispatch(fetchJobsByCompanyId(0));
        } else if (type === 'myjob') {
          jobsData = await dispatch(fetchJobsByCompanyId(companyId()));
        } else {
          jobsData = await dispatch(fetchJobsByCompanyId(0));
        }

        setAllJobs(jobsData || []); 
        setJobs(jobsData || []); 
      } catch (err) {
        setError('Error fetching jobs.');
       // console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [dispatch, companyId, type]);
  useEffect(() => {
    const result = filterJobs(allJobs, nameDescription, city, fromHour, toHour);
    setJobs(result);
  }, [allJobs, nameDescription, city, fromHour, toHour]);
  return (
    <div className="container mx-auto p-8">
      {loading && <LoadingSpinner/>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && jobs.length === 0 && !error && type==='allJob'&&(
        <p className="text-gray-500 text-center">No jobs available.</p>
      )}
      {!loading && jobs.length === 0 && !error && type!=='allJob'&&(
        <p className="text-gray-500 text-center">No jobs Yet Let add job .</p>
      )}
      <div>
        {!loading && !error && jobs.map((job, index) => (
          <JobItem
            key={index}
            jobId={job.Id}
            applyLink={job.Id}
            jobTitle={job.jobTitle}
            jobDescription={job.jobDescription}
            city={job.city}
            workHours={job.workHours}
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;
