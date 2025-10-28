'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export default function VerifyEmail() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'form'>('loading');
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const searchParams = useSearchParams();
  const router = useRouter();
  // const token = searchParams.get('token');

  // useEffect(() => {
  //   if (token) {
  //     verifyEmail();
  //   } else {
  //     setStatus('error');
  //     setMessage('Invalid verification link');
  //   }
  // }, [token]);

  // const verifyEmail = async () => {
  //   try {
  //     const response = await fetch('/api/verify-email', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ token }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       setStatus('success');
  //       setMessage('Email verified successfully! Redirecting to login...');
  //       setTimeout(() => {
  //         router.push('/login');
  //       }, 3000);
  //     } else {
  //       if (data.error === 'Invalid or expired verification token') {
  //         setStatus('error');
  //         setMessage('Invalid or expired verification link');
  //       } else {
  //         setStatus('form');
  //         setMessage('Please complete your registration');
  //       }
  //     }
  //   } catch (error) {
  //     setStatus('error');
  //     setMessage('An error occurred during verification');
  //   }
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!userData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (userData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!userData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!userData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!userData.password) {
      newErrors.password = 'Password is required';
    } else if (userData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // try {
    //   const response = await fetch('/api/verify-email', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ token, userData }),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     setStatus('success');
    //     setMessage('Registration completed successfully! Redirecting to login...');
    //     setTimeout(() => {
    //       router.push('/login');
    //     }, 3000);
    //   } else {
    //     setMessage(data.error || 'Registration failed');
    //   }
    // } catch (error) {
    //   setMessage('An error occurred during registration');
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <div className="min-h-screen bg-[#e5e5e5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {status === 'loading' && (
            <div className="text-center">
              <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
              <h2 className="text-xl font-semibold mb-2">Verifying Email...</h2>
              <p className="text-gray-600">Please wait while we verify your email address.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h2 className="text-xl font-semibold mb-2 text-green-600">Email Verified!</h2>
              <p className="text-gray-600">{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <XCircle className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <h2 className="text-xl font-semibold mb-2 text-red-600">Verification Failed</h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <button
                onClick={() => router.push('/signup')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Back to Signup
              </button>
            </div>
          )}

          {status === 'form' && (
            <div>
              <div className="text-center mb-6">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h2 className="text-xl font-semibold mb-2">Complete Registration</h2>
                <p className="text-gray-600">{message}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userData.username}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.username ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={userData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={userData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={userData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin mr-2" />
                      Completing Registration...
                    </>
                  ) : (
                    'Complete Registration'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
