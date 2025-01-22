'use client';
import React, { useState } from 'react';
import Modal from './ModuleJob';
import { user, company } from '@/util/auth';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
            <motion.div 
                className="bg-bgSecond p-8 w-full border-b-2" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
            >
                <motion.h2 
                    className="textForm" 
                    initial={{ y: -20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ duration: 0.5 }}
                >
                    {jobTitle}
                </motion.h2>
                <motion.p 
                    className="text-white mb-4 overflow-y-auto h-32 scrollbar-thin scrollbar-thumb-second scrollbar-track-bgSecond" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {jobDescription.split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                </motion.p>
                <div className="flex flex-col gap-3 text-sm text-textColor md:flex-row justify-between">
                    <motion.p 
                        className="font-semibold" 
                        initial={{ x: -20, opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }} 
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <span className="mr-2 text-second">City:</span>{city}
                    </motion.p>
                    <motion.p 
                        className="font-semibold" 
                        initial={{ x: 20, opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }} 
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <span className="mr-2 text-second">Hours:</span>{workHours}
                    </motion.p>
                </div>
                {actionButton && <div className="flex justify-center items-center mt-4">{actionButton}</div>}
            </motion.div>
        </>
    );
};

export default JobItem;
