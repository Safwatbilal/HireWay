import React, { useState, useEffect } from 'react';
import { fetchJobById } from '@/store/apply-action';
import ApplyJobItem from './ApplyJobItem';
import FacebookLoader from '../FacebookLoader';
const CartApplyJobs = ({ id, close }) => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getJobData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchJobById(id, 0);
        if (data) {
          setJobData(data);
        } else {
          // setError('No job found for the provided ID');
        }
      } catch (err) {
        setError('Error fetching Applaction');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getJobData();
    }
  }, [id]);

  return (
    <div className="p-6 bg-bgColor shadow-xl mx-auto grid grid-cols-1 gap-6 h-[400px] scrollbar-thin scrollbar-thumb-second scrollbar-track-bgSecond overflow-y-auto ">
      <div className="flex justify-between items-baseline">
        <h3 className="textForm">All Applications</h3>
        <button
          onClick={close}
          className="text-textColor hover:text-red-500 text-2xl font-bold"
        >
          X
        </button>
      </div>
        {error&&<div className='error'>{error}</div>}
        {jobData.length===0&&!loading&&!error&&<p className="text-gray-500 center w-[300px]">No Applaction here.</p>}
      {loading ? (
        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
          {Array.from({ length: 3 }).map((_, index) => (
            <FacebookLoader key={index} />
          ))}
        </div>
      ) : (
        <div
          className={`grid gap-3 place-items-center  ${
            jobData.length === 1
              ? 'sm:grid-cols-1'
              : jobData.length === 2
              ? 'sm:grid-cols-1 md:grid-cols-2'
              : 'lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2'
          }`}
        >
          {jobData.map((job) => (
            <ApplyJobItem
              key={job.Id}
              name={job.name}
              Id={job.Id}
              status={job.status}
            />
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <button onClick={close} className="logout">
          Close
        </button>
      </div>
    </div>
  );
};

export default CartApplyJobs;
