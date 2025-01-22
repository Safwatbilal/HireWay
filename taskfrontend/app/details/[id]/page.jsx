
import ApplyJobDetails from "@/components/Apply/ApplyJobDetails"
import { use } from "react"

export async function generateMetadata({ params }) {
  
  return {
    title: "Application Details | HireWay",
    description: "View detailed information about your job application. Track progress, status, and other essential details seamlessly.",
  };
}
const page = ({params}) => {
    const {id}=use( params)
  return (
    <ApplyJobDetails id={id}></ApplyJobDetails>
  )
}

export default page