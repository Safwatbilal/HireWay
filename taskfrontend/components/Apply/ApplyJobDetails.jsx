'use client';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchJobById, updateJobStatus } from '@/store/apply-action';
import LoadingSpinner from '../LoadingSpinner';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { motion } from 'framer-motion';

const ApplyJobDetails = ({ id }) => {
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize();

    useEffect(() => {
        if (showConfetti) {
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = 'auto'; 
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showConfetti]);

    const { data: jobData, isLoading, error, refetch } = useQuery({
        queryKey: ['job', id],
        queryFn: () => fetchJobById(0, id),
        enabled: !!id,
    });

    const mutation = useMutation({
        mutationFn: (status) => updateJobStatus(status, jobData[0].Id),
        onSuccess: (response) => {
            toast.success(response);
            if (response.includes('Accepted')) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 4000); 
            }
            refetch();
        },
        onError: () => {
            toast.error('Failed to update the application status!');
        },
    });

    if (isLoading) {
        return (
            <div className="center h-[calc(100vh-124px)]">
                <LoadingSpinner />
            </div>
        );
    }

    if (error || !jobData) {
        return <div className="text-center text-red-500">Error: {error ? error.message : 'No job found'}</div>;
    }

    const jobStatus = jobData[0].status;

    return (
        <motion.div
            className="centerFrom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className="text-second p-6 rounded-lg shadow-md mb-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold mb-6 text-center">Job Application Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div className="applyBox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                        <strong className="applyText">Name:</strong>
                        <p className="text-gray-300">{jobData[0].name}</p>
                    </motion.div>
                    <motion.div className="flex items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                        <strong className="applyText">Email:</strong>
                        <p className="text-gray-300">{jobData[0].email}</p>
                    </motion.div>
                    <motion.div className="flex items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                        <strong className="applyText">Phone:</strong>
                        <p className="text-gray-300">{jobData[0].phone}</p>
                    </motion.div>
                    <motion.div className="flex items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                        <strong className="applyText">Status:</strong>
                        <p
                            className={`text-lg ${
                                jobStatus === 'Accepted'
                                    ? 'text-green-500'
                                    : jobStatus === 'Refused'
                                    ? 'text-red-500'
                                    : 'text-black'
                            }`}
                        >
                            {jobStatus}
                        </p>
                    </motion.div>
                    <motion.div className="flex items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                        <strong className="applyText">Download CV:</strong>
                        <a
                            href={jobData[0].resumeUrl}
                            className="text-blue-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>{jobData[0].resume.name}</span>
                        </a>
                    </motion.div>
                </div>

                {jobStatus === 'Panding' && (
                    <motion.div
                        className="flex justify-center space-x-4 mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <motion.button
                            onClick={() => mutation.mutate('Accepted')}
                            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                        >
                            Accept
                        </motion.button>
                        <motion.button
                            onClick={() => mutation.mutate('Refused')}
                            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                        >
                            Refuse
                        </motion.button>
                    </motion.div>
                )}
            </motion.div>

            {showConfetti && <Confetti width={width} height={height} />}
        </motion.div>
    );
};

export default ApplyJobDetails;
