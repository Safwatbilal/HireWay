import { use } from "react";
import Signup from "@/components/Auth/Signup";
export async function generateMetadata({ params }) {
    const { type } = params; 
    return {
      title: `SignUp ${type} | HireWay`,
        description: "SignUp to your HireWay "
    };
  }
const SignupPage = ({ params }) => {
    const { type } =use( params); 
    return (
        <Signup type={type}></Signup>
    );
};

export default SignupPage; 
