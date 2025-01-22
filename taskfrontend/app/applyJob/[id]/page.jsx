'use client';
import { use } from "react";
import ApplyJob from "@/components/Apply/ApplyJob";
const Job = ({ params }) => {
    const { id } =use( params); 
    return (
        <>
        
        <ApplyJob id={id}></ApplyJob>
        </>
    );
};

export default Job; 
