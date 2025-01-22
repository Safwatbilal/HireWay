import React from 'react';

const HomePage = () => {
  return (
    <div className='flex items-center justify-center container mx-auto'>

    <div className="bg-bgColor text-textColor ">
      <main className="container mt-8 space-y-12">
        <section className="text-center">
          <h2 className="text-2xl font-bold text-second mb-4">About JobConnect</h2>
          <p className="max-w-2xl mx-auto leading-relaxed">
            JobConnect is a platform designed to bridge the gap between companies and job seekers. Whether you're a professional looking for your next opportunity or a company searching for talented employees, JobConnect makes the process simple and efficient.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">For Job Seekers</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Browse thousands of job listings tailored to your skills and preferences.</li>
            <li>Create a professional profile to showcase your resume and experiences.</li>
            <li>Apply for jobs directly and track your applications in real time.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">For Companies</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Post job openings and attract top talent from various industries.</li>
            <li>Search and filter candidates based on specific requirements.</li>
            <li>Communicate with potential hires and manage applications seamlessly.</li>
          </ul>
        </section>
      </main>
    </div>
    </div>
  );
};

export default HomePage;
