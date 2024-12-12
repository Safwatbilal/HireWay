'use client';
import { AuthProvider } from "@/store/aviblity";
const AuthWrapper = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthWrapper;
