import { LogOutIcon, LucideLogIn } from "lucide-react";
import Button from "./Button";
import httpAIHeader from "services/httpAIHeader";
import { toast } from "react-toastify";
import { handleGetAuthStatus, handleSetStatus } from "helper/authStatus";

const NavBar = () => {

    const status = handleGetAuthStatus()

    const handleLogout = async () => {
        const response = await httpAIHeader.post("/logout/")

        if (response.status === 200) {
            toast('Logout Successful');
            handleSetStatus(false);
        } else {
            toast.error('Logout Failed');
        }
    }

    const handleGoToLogin = () => {
        window.location.href = "/auth";
    }


    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">

                    {/* Logo and nav links */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <img
                                className="h-20 w-auto"
                                src="public/favicon.ico"
                                alt="Talem AI"
                            />
                        </div>
                    </div>

                    {/* Right side - notification and profile dropdown */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3">
                            <div className="flex">
                                {status ? (
                                <Button 
                                    className="p-2"
                                    handleLogout={handleLogout}
                                >
                                    <LogOutIcon className="h-6 w-6 text-gray-700" />
                                </Button>
                                ) : (
                                <Button 
                                    className="p-2"
                                    handleLogout={handleGoToLogin}
                                >
                                    <LucideLogIn className="h-6 w-6 text-gray-700" />
                                </Button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </nav>
    );
}

export default NavBar;