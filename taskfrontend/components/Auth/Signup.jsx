'use client';
import { useDispatch, useSelector } from "react-redux";
import { signupCompany, signupUser, resetForm, updateForm, setUser } from "@/store/auth";
import { authDate } from "@/store/auth-action";
import { useState } from "react";
import { toast } from "react-toastify";

import { validatePassword, validateConfirmPassword } from "@/util/validation";
import { login } from "@/util/auth";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
const Signup = ({ type }) => {
    const path=usePathname()
    const isUser = type === 'user';
    const [validationError, setValidationError] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const { formData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "confirmPassword") {
        setConfirmPassword(value);
        } else {
        dispatch(updateForm({ name, value }));
        }
        setValidationError(null);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const passwordError = validatePassword(formData.password);
        if (passwordError) {
            setValidationError(passwordError);
            return;
        }
    
        const confirmPasswordError = validateConfirmPassword(formData.password, confirmPassword);
        if (confirmPasswordError) {
            setValidationError(confirmPasswordError);
            return;
        }
    
       
            const validationResult = await dispatch(authDate(type, formData));
            if (validationResult) {
                setValidationError(validationResult);
                return;
            }
            isUser ? dispatch(signupUser()) : dispatch(signupCompany());
            dispatch(setUser(type));
            document.cookie = `name=${type}; path=/;`;
            toast.success(`Hello ${formData.name}`);
            dispatch(resetForm());
            setValidationError(null);
            setConfirmPassword(""); 
            login(type, type);
    
       
    };
    

    useEffect(() => {
        dispatch(resetForm());
        setValidationError(null); 
        setConfirmPassword("");   
    }, [path, dispatch]); 

    return (
        <div className="centerFrom">
        <div className="form">
            <h1 className="textForm">Signup</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                type="text"
                name="name"
                placeholder={`${isUser ? 'User' : 'Company'} name:`}
                onChange={handleChange}
                value={formData.name}
                className="input"
                required
                />
            </div>

            <div>
                <input
                type="email"
                name="email"
                placeholder="Email:"
                onChange={handleChange}
                value={formData.email}
                className="input"
                required
                />
            </div>

            <div>
                <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Password:"
                className="input"
                required
                />
            </div>

            <div>
                <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                value={confirmPassword}
                placeholder="Confirm Password:"
                className="input"
                required
                />
            </div>

            <button
                type="submit"
                className="buttonForm"
            >
                Signup
            </button>

            <button className="flex justify-center w-full">
                <Link href={`/login/${type}`} className="link">
                Already have an account?
                </Link>
            </button>

            {validationError && <p className="error">{validationError}</p>}
            </form>
        </div>
        </div>
    );
};

export default Signup;
