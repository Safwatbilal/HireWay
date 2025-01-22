'use client';
import React, { useState } from 'react';
import Modal from './ModuleJob';
import { user, company } from '@/util/auth';
import Link from 'next/link';

const JobItem = ({ jobTitle, jobDescription, city, workHours, applyLink, jobId }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    
    const authUser = user();
    const authCompany = company();
    const handleModalToggle = (jobId) => {
        setModalOpen(prev => !prev);
        setSelectedJobId(prev => prev ? null : jobId);
    };

    const actionButtonLabel = authUser === 'user' ? 'Apply Now' : authCompany === 'company' ? 'View Applicants' : null;

    const actionButton = authUser === 'user' ? (
        <Link href={`/applyJob/${applyLink}`} className='buttonBox'>
            {actionButtonLabel}
        </Link>
    ) : authCompany === 'company' ? (
        <button className='buttonBox' onClick={() => handleModalToggle(jobId)}>
            {actionButtonLabel}
        </button>
    ) : null;

    return (
        <>
            <Modal open={modalOpen} close={() => setModalOpen(false)} id={selectedJobId} />
            <div className="bg-bgSecond p-8  w-full border-b-2">
                <h2 className="textForm">{jobTitle}</h2>
                <p className="text-white mb-4 overflow-y-auto h-32 scrollbar-thin scrollbar-thumb-second scrollbar-track-bgSecond">
                    {jobDescription.split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                    </span>
                    ))}
                </p>
                <div className="flex flex-col gap-3 text-sm text-textColor md:flex-row justify-between">
                    <p className="font-semibold "><span className="mr-2 text-second">City:</span>{city}</p>
                    <p className="font-semibold "><span className="mr-2 text-second">Hours:</span>{workHours}</p>
                </div>
                {actionButton && <div className="flex justify-center items-center mt-4">{actionButton}</div>}
            </div>
        </>
    );
};

export default JobItem;
