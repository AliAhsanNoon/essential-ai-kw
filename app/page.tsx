"use client";

import Image from "next/image";
import WizardUi from "./components/wizardUi1";
import HelpfulResources from "./components/helpfulResources";
import ServiceDirectory from "./components/serviceDirectory";
import MiaImage from "../public/mia-l.png";
import { useGlobalContext } from "@/lib/ContextProvider";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

export default function Home() {
  const { setGlobalString } = useGlobalContext();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [chatQuestion, setChatQuestion] = useState('');
  const router = useRouter();

  useEffect(() => {
    // AUTHENTICATION LOGIC COMMENTED OUT FOR CLIENT DEMO
    // Uncomment this section when authentication is needed
    
    // // Check if user is logged in
    // const checkAuth = async () => {
    //   const userData = localStorage.getItem('user');
    //   const loginTime = localStorage.getItem('loginTime');
      
    //   console.log('Auth check - userData:', userData ? 'exists' : 'null');
    //   console.log('Auth check - loginTime:', loginTime);
      
    //   // Check for Google login/signup parameters first
    //   const urlParams = new URLSearchParams(window.location.search);
    //   const googleLogin = urlParams.get('googleLogin');
    //   const googleSignup = urlParams.get('googleSignup');
    //   const userId = urlParams.get('userId');
      
    //   if (googleLogin || googleSignup) {
    //     console.log('Google OAuth flow detected');
    //     if (userId) {
    //       try {
    //         // Fetch user data from database
    //         const response = await fetch(`/api/user/${userId}`);
    //         if (response.ok) {
    //           const userData = await response.json();
    //           localStorage.setItem('user', JSON.stringify(userData));
    //           localStorage.setItem('loginTime', Date.now().toString());
    //           setUser(userData);
    //         }
    //       } catch (error) {
    //         console.error('Error fetching user data:', error);
    //       }
    //     } else {
    //       console.log('Google OAuth flow detected but no userId - redirecting to login');
    //       router.push('/login');
    //       return;
    //     }
        
    //     // Clean up URL parameters
    //     window.history.replaceState({}, document.title, window.location.pathname);
    //     setIsLoading(false);
    //     return;
    //   }
      
    //   // Check existing session
    //   if (userData && loginTime) {
    //     const currentTime = Date.now();
    //     const sessionDuration = 60 * 60 * 1000; // 1 hour in milliseconds
    //     const timeElapsed = currentTime - parseInt(loginTime);
        
    //     console.log('Session check - timeElapsed:', timeElapsed, 'ms');
    //     console.log('Session check - sessionDuration:', sessionDuration, 'ms');
    //     console.log('Session check - isValid:', timeElapsed <= sessionDuration);
        
    //     if (timeElapsed <= sessionDuration) {
    //       // Session is still valid - refresh the login time to extend session
    //       console.log('Session is valid, setting user and refreshing login time');
    //       localStorage.setItem('loginTime', Date.now().toString());
    //       setUser(JSON.parse(userData));
    //       setIsLoading(false);
    //       return;
    //     } else {
    //       // Session expired
    //       console.log('Session expired, clearing storage');
    //       localStorage.removeItem('user');
    //       localStorage.removeItem('loginTime');
    //     }
    //   }
      
    //   // No valid session found
    //   console.log('No valid session, redirecting to login');
    //   router.push('/login');
    // };

    // checkAuth();
    
    // DEMO MODE: Skip authentication and load directly
    setIsLoading(false);
  }, [router]);

  // Load CustomGPT chat when showChat is true
  useEffect(() => {
    if (showChat) {
      // Clear any existing chat content
      const chatElement = document.getElementById('customgpt_chat');
      if (chatElement) {
        chatElement.innerHTML = '';
      }
      
      // Remove any existing scripts
      const existingScripts = document.querySelectorAll('script[src*="customgpt.ai"]');
      existingScripts.forEach(script => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      });
      
      // Add delay to ensure cleanup is complete
      const timeoutId = setTimeout(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.customgpt.ai/js/embed.js';
        script.defer = true;
        script.setAttribute('div_id', 'customgpt_chat');
        script.setAttribute('p_id', process.env.NEXT_PUBLIC_CUSTOMGPT_PROJECT_ID || '13385');
        script.setAttribute('p_key', process.env.NEXT_PUBLIC_CUSTOMGPT_PROJECT_KEY || '8f4f841aebd89fa627e9d2881569bdca');
        
        // Add prompt if question is provided
        if (chatQuestion) {
          script.setAttribute('prompt', chatQuestion);
        }
        
        script.setAttribute('reset_conversation', '1');
        script.setAttribute('width', '100%');
        script.setAttribute('height', '99vh');
        
        document.body.appendChild(script);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        const chatElement = document.getElementById('customgpt_chat');
        if (chatElement) {
          chatElement.innerHTML = '';
        }
        
        const scripts = document.querySelectorAll('script[src*="customgpt.ai"]');
        scripts.forEach(script => {
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
        });
      };
    }
  }, [showChat, chatQuestion]);

  const handleAskQuestion = (question: string) => {
    setChatQuestion(question);
    setShowChat(true);
  };

  // AUTHENTICATION LOGIC COMMENTED OUT FOR CLIENT DEMO
  // Uncomment this section when authentication is needed
  
  // const handleLogout = async () => {
  //   try {
  //     await fetch('/api/logout', {
  //       method: 'POST',
  //     });
      
  //     // Clear local storage
  //     localStorage.removeItem('user');
  //     localStorage.removeItem('loginTime');
      
  //     // Redirect to login
  //     router.push('/login');
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //     // Clear local storage anyway
  //     localStorage.removeItem('user');
  //     localStorage.removeItem('loginTime');
  //     router.push('/login');
  //   }
  // };

  function handleClick() {
    setGlobalString("initial");
    setShowChat(false);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* AUTHENTICATION HEADER COMMENTED OUT FOR CLIENT DEMO */}
      {/* Uncomment this section when authentication is needed */}
      
      {/* Header with User Info and Logout */}
      {/* <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div> */}

      <div className="flex flex-col lg:grid lg:grid-cols-12">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-7 flex justify-center items-center px-4 sm:px-6 md:px-8 lg:ml-[40px] lg:pr-[20px] min-h-screen lg:h-screen">
          <div className="flex flex-col items-center gap-3 sm:gap-4 overflow-y-auto h-full py-6 sm:py-8 lg:py-[20px] w-full max-w-2xl lg:max-w-none px-2">
            {/* Profile Image */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-[200px] lg:h-[200px] rounded-full flex justify-center items-center">
              <Image
                src={MiaImage}
                alt="Mia Mentor"
                width={150}
                height={150}
                className="profile-img w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-[150px] lg:h-[150px]"
                style={{ margin: "auto" }}
              />
            </div>

            {/* Heading */}
            <p className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] mt-4 sm:mt-6 lg:mt-[20px] text-center">
              Hi! I'm Mia Mentor
            </p>
            <div className="bg-gray-300 h-[1px] w-full"></div>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-[16px] text-center text-gray-600 px-2">
              I'm your Real Estate AI Assistant, here to help you thrive with
              smart tools and expert guidance. Here are the kinds of questions I
              can answer!
            </p>

            {/* Resources Section */}
            <div className="w-full flex flex-col gap-2 sm:gap-3 lg:gap-[10px] mt-4 sm:mt-6 lg:mt-[20px]">
              <HelpfulResources onQuestionClick={handleAskQuestion} />
              <ServiceDirectory onQuestionClick={handleAskQuestion} />
            </div>

            {/* Guide Link */}
            <p
              className="text-sm sm:text-base lg:text-[16px] text-gray-400 mt-4 sm:mt-6 lg:mt-[20px] cursor-pointer hover:text-gray-600 transition-colors text-center"
              onClick={handleClick}
            >
              Unsure what to ask? Use the guide →
            </p>

            {/* Disclaimer */}
            <p className="text-xs sm:text-sm lg:text-[12px] text-gray-400 mt-4 sm:mt-6 lg:mt-[20px] text-center px-2 pb-4 lg:pb-0">
              Mia provides information and guidance but does not offer specific
              legal, financial, or investment advice.
            </p>
          </div>
        </div>

        {/* Right Column - Chat/Wizard */}
        <div className="lg:col-span-5 bg-[#e5e5e5] flex justify-center items-start min-h-[600px] lg:min-h-screen">
          {showChat ? (
            <div id="customgpt_chat" className="w-full h-[600px] lg:h-full" style={{ display: 'block', minHeight: '600px' }}></div>
          ) : (
            <WizardUi
              onComplete={(data) => console.log("Wizard completed:", data)}
              onLoadChat={(prompt) => {
                setChatQuestion(prompt);
                setShowChat(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
