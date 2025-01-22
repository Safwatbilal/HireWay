'use client';
import React, { useState ,useEffect} from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@/store/auth-action';
import { setUser } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { usePathname } from 'next/navigation';
const Login = ({ type }) => {
  const path=usePathname()
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [feedback, setFeedback] = useState({ success: '', error: '' });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setFeedback({ success: '', error: '' });
  };

  const handleLogin = async () => {
    try {
      const usersData = await fetchLogin(type)(dispatch);
      const userFound = Object.values(usersData).find(
        (user) => user.email === credentials.email && user.password === credentials.password
      );
      if (userFound) {
        dispatch(setUser(type));
        localStorage.setItem(type,type)
        localStorage.setItem(type+'Id', userFound.Id);
        toast.success(`Hello ${userFound.name}`)
        document.cookie = `name=${type}; path=/;`; // الكوكيز ستكون صالحة لمدة يوم واحد

        router.push('/');
      } else {
        setFeedback({ success: '', error: 'Invalid email or password.' });
      }
    } catch (error) {
     // console.error('Error during login:', error);
      setFeedback({ success: '', error: 'An error occurred. Please try again later.' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="centerFrom">
      <div className="form">
        <h1 className="textForm">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email:"
              value={credentials.email}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password:"
              value={credentials.password}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <button
            type="submit"
            className="buttonForm"
          >
            Login
          </button>
    
          <div className="flex justify-center w-full">
            <Link href={`/signup/${type}`} className="link">
              Don't have an account?
            </Link>
            
          </div>
          {feedback.error && <p className="error">{feedback.error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
