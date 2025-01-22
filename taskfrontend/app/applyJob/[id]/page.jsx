
import { use } from "react";
import ApplyJob from "@/components/Apply/ApplyJob";
export async function generateMetadata({ params }) {
   // const { type } = params; 
    return {
        title: `Apply  | HireWay`,
        description: `Submit your application  role on HireWay. Take the next step in your career and connect with top employers today.`
    };
}

const Job = ({ params }) => {
    const { id } =use( params); 
    return (
        <>
        
        <ApplyJob id={id}></ApplyJob>
        </>
    );
};

export default Job; 
