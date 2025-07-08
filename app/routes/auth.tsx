import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import type { Route } from "./+types/home";
import httpAIHeader from "services/httpAIHeader";
import { ToastContainer, toast } from "react-toastify";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Google Sign In" },
    { name: "description", content: "Sign into Talem AI using Google" },
  ];
}

const Auth = () => {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Welcome to Talem AI
        </h1>
        <GoogleLogin
            onSuccess={async credentialResponse => {
                const response = await httpAIHeader.post("/login/", {
                    token: credentialResponse.credential
                })

                if (response.status === 200) {
                    toast('Login Successful');
                } else {
                    toast.error('Login Failed');
                }
            }}
            onError={() => {
                toast.error('Login Failed');
            }}
            useOneTap
        />;      
    </div>
    </div>
    </GoogleOAuthProvider>
  );
}

export default Auth;