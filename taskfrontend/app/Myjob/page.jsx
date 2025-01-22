import React from 'react'
import JobList from '@/components/Job/Job'
export const metadata = {
  title: "My Job | HireWay",
  description: "Manage your posted jobs and track applications seamlessly with HireWay. Stay organized and connect with top candidates today."
};

const page = () => {
  return (
    <JobList type={'myjob'}></JobList>
  )
}

export default page