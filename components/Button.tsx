import React from 'react';

interface ButtonProps {
    className?: string;
    children: React.ReactNode;
    handleLogout?: () => void; 
}

const Button: React.FC<ButtonProps> = ({ className, handleLogout, children }) => {
    return (
        <button
            type="button"
            className={`relative flex rounded-full bg-white text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${className}`}
            onClick={handleLogout}

        >
            {children}
        </button>
    );
};

export default Button;