import { useGoogleLogin } from '@react-oauth/google';

const GoogleSignInButton = () => {
  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    flow: 'auth-code',
  });

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-3 hover:shadow-md transition dark:bg-gray-100 cursor-pointer"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="h-5 w-5"
      />
      <span className="font-medium">Sign in with Google</span>
    </button>
  );
};


export default GoogleSignInButton