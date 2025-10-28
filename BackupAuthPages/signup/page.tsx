// AUTHENTICATION PAGE - COMMENTED OUT FOR CLIENT DEMO
// This page handles user signup functionality
// Uncomment when authentication is needed

"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  CheckCircle,
  XCircle,
  X,
} from "lucide-react";

// Google OAuth function
const handleGoogleSignup = () => {
  window.location.href = '/api/auth/google?action=signup';
};

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .required("Username is required"),
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces")
    .required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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


  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    setIsLoading(true);

    try {
      const verificationResponse = await axios.post("/api/send-verification", {
        email: values.email
      });

      if (verificationResponse.status === 200) {
        alert("Please check your email and click the verification link to complete your registration.");
        resetForm();
        // Redirect to login page after successful signup
        router.push('/login');
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      alert(error.response?.data?.error || "Failed to send verification email. Please try again.");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 max-w-md">
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
            Signup
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Join us today and get started
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <Formik
            initialValues={{
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched }) => {
  return (
                <Form className="space-y-4" autoComplete="off">
                  {/* Hidden dummy fields to prevent auto-fill */}
                  <div style={{ display: "none" }}>
                    <input
                      type="text"
                      name="fake-username"
                      autoComplete="username"
                    />
                    <input
                      type="password"
                      name="fake-password"
                      autoComplete="current-password"
                    />
                  </div>

                  {/* Username */}
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        className={`w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:ring-1 focus:outline-none focus:border-blue-500 transition-colors ${
                          errors.username &&
                          touched.username &&
                          "border-red-500"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="Enter your username"
                      />
                    </div>
                    <ErrorMessage name="username">
                      {(msg) => (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          {msg}
                        </p>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Field
                        type="text"
                        id="firstName"
                        name="firstName"
                        className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-1 focus:outline-none focus:border-blue-500 transition-colors ${
                          errors.firstName &&
                          touched.firstName &&
                          "border-red-500"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="First name"
                      />
                      <ErrorMessage name="firstName">
                        {(msg) => (
                          <p className="mt-1 text-xs text-red-500 flex items-center">
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>

                    <div>
                      <Field
                        type="text"
                        id="lastName"
                        name="lastName"
                        className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-1 focus:outline-none focus:border-blue-500 transition-colors ${
                          errors.lastName &&
                          touched.lastName &&
                          "border-red-500"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="Last name"
                      />
                      <ErrorMessage name="lastName">
                        {(msg) => (
                          <p className="mt-1 text-xs text-red-500 flex items-center">
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        className={`w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:ring-1 focus:outline-none focus:border-blue-500 transition-colors ${
                          errors.email && touched.email && "border-red-500"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="Enter your email"
                      />
                    </div>
                    <ErrorMessage name="email">
                      {(msg) => (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          {msg}
                        </p>
                      )}
                    </ErrorMessage>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Field
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        autoComplete="new-password"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        className={`w-full pl-9 pr-10 py-2 text-sm border rounded-md focus:ring-1 focus:outline-none focus:border-blue-500 transition-colors ${
                          errors.password &&
                          touched.password &&
                          "border-red-500"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <ErrorMessage name="password">
                      {(msg) => (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          {msg}
                        </p>
                      )}
                    </ErrorMessage>
                  </div>

                  {/* Confirm Password */}
    <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        autoComplete="new-password"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        className={`w-full pl-9 pr-10 py-2 text-sm border rounded-md focus:ring-1 focus:outline-none focus:border-blue-500 transition-colors ${
                          errors.confirmPassword &&
                          touched.confirmPassword &&
                          "border-red-500"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Password Match Indicator */}
                    {values.confirmPassword && (
                      <div className="mt-1">
                        {values.password === values.confirmPassword && (
                          <p className="text-xs text-green-500 flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Passwords match
                          </p>
                        )}
                      </div>
                    )}

                    <ErrorMessage name="confirmPassword">
                      {(msg) => (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          {msg}
                        </p>
                      )}
                    </ErrorMessage>
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
                        Signup...
                      </>
                    ) : (
                      "Signup"
                    )}
                  </button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  {/* Google Signup Button */}
                  <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign up with Google
                  </button>

                  {/* Login Link */}
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                      >
                        Sign in
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
