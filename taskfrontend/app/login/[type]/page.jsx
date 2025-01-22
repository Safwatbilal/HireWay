
import { use } from "react";
import Login from "@/components/Auth/Login";
export async function generateMetadata({ params }) {
    const { type } = params; 
    return {
      title: `Login ${type} | HireWay`,
        description: "Login to your HireWay account."
    };
  }
const LoginPage = ({ params }) => {
    const { type } =use( params); 
    return (
        <Login type={type}></Login>
    );
};

export default LoginPage; 
