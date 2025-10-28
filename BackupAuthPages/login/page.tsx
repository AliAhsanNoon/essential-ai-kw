// AUTHENTICATION PAGE - COMMENTED OUT FOR CLIENT DEMO
// This page handles user login functionality
// Uncomment when authentication is needed

'use client';

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Eye, EyeOff, Mail, Lock, XCircle, X } from 'lucide-react';

// Google OAuth function
const handleGoogleLogin = () => {
  window.location.href = '/api/auth/google?action=login';
};

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

export default function Login() {
  const [error, setError]= useState("")
  const [isLoading, setIsLoading]= useState(false);
  const [showPassword, setShowPassword]= useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();
  // const searchParams = useSearchParams();

  // Check for redirect message
  // useEffect(() => {
  //   const message = searchParams.get('message');
  //   if (message) {
  //     setToastMessage(message);
  //     // Auto-hide toast after 5 seconds
  //     setTimeout(() => {
  //       setToastMessage(null);
  //     }, 5000);
  //   }
  // }, [searchParams]);

  useEffect(() => {
    // Check if coming from Google OAuth
    const urlParams = new URLSearchParams(window.location.search);
    const googleLogin = urlParams.get('googleLogin');
    const userId = urlParams.get('userId');

    if (googleLogin && userId) {
      // Fetch user data and store in localStorage
      // For now, we'll just redirect to home
      // You can fetch user data from an API if needed
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (
    values: any,
    { setSubmitting }: any
  ) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/login', {
        email: values.email,
        password: values.password
      });

      if (response.status === 200) {
        // Store user data in localStorage or session
        console.log('Login successful, storing user data:', response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('loginTime', Date.now().toString());
        
        console.log('Stored in localStorage - user:', localStorage.getItem('user') ? 'exists' : 'null');
        console.log('Stored in localStorage - loginTime:', localStorage.getItem('loginTime'));
        
        // Small delay to ensure localStorage is written before redirect
        setTimeout(() => {
          router.push('/');
        }, 100);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 max-w-md">
          <div className="flex-1">
            <p className="text-sm font-medium">{toastMessage}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}
      
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            Login
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Welcome back! Please login to your account
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => {
  return (
                <Form className="space-y-4" autoComplete="off">
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md flex items-center text-sm">
                      <XCircle className="w-4 h-4 mr-2" />
                      {error}
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        className={`w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:ring-1 focus:outline-none focus:border-blue-500 transition-colors ${
                          errors.email && touched.email && 'border-red-500'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="Enter your email"
                      />
                    </div>
                    <ErrorMessage name="email">
                      {(msg) => (
                        <p className="mt-1 text-xs text-red-500">{msg}</p>
                      )}
                    </ErrorMessage>
                  </div>

                  {/* Password */}
    <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Field
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        className={`w-full pl-9 pr-10 py-2 text-sm border rounded-md focus:ring-1 focus:outline-none focus:border-blue-500 transition-colors ${
                          errors.password && touched.password && 'border-red-500'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <ErrorMessage name="password">
                      {(msg) => (
                        <p className="mt-1 text-xs text-red-500">{msg}</p>
                      )}
                    </ErrorMessage>
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end">
                    <a href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center justify-center text-sm"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  {/* Google Login Button */}
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center justify-center hover:bg-gray-50 text-sm"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>

                  {/* Signup Link */}
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      Don't have an account?{' '}
                      <a href="/signup" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                        Sign up
                      </a>
                    </p>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}