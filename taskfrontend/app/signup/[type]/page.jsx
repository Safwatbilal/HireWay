'use client';
import { use } from "react";
import Signup from "@/components/Auth/Signup";
const SignupPage = ({ params }) => {
    const { type } =use( params); 
    return (
        <Signup type={type}></Signup>
    );
};

export default SignupPage; 
