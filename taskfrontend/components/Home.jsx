'use client'
import React from 'react';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className='flex items-center justify-center container mx-auto'>
      <div className="bg-bgColor text-textColor ">
        <main className="container mt-8 space-y-12">
          
      
          <motion.section
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-2xl font-bold text-second mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              About JobConnect
            </motion.h2>
            <motion.p
              className="max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              JobConnect is a platform designed to bridge the gap between companies and job seekers. Whether you're a professional looking for your next opportunity or a company searching for talented employees, JobConnect makes the process simple and efficient.
            </motion.p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h2
              className="text-xl font-semibold mb-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              For Job Seekers
            </motion.h2>
            <motion.ul
              className="list-disc list-inside space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.li>Browse thousands of job listings tailored to your skills and preferences.</motion.li>
              <motion.li>Create a professional profile to showcase your resume and experiences.</motion.li>
              <motion.li>Apply for jobs directly and track your applications in real time.</motion.li>
            </motion.ul>
          </motion.section>

   
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.h2
              className="text-xl font-semibold mb-3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              For Companies
            </motion.h2>
            <motion.ul
              className="list-disc list-inside space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.li>Post job openings and attract top talent from various industries.</motion.li>
              <motion.li>Search and filter candidates based on specific requirements.</motion.li>
              <motion.li>Communicate with potential hires and manage applications seamlessly.</motion.li>
            </motion.ul>
          </motion.section>

        </main>
      </div>
    </div>
  );
};

export default HomePage;
