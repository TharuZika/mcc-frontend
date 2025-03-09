"use client"
import Link from 'next/link';

interface CustomButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export default function CustomButton({ 
  href, 
  onClick, 
  variant = 'primary', 
  children, 
  className = '' 
}: CustomButtonProps) {
  const baseStyles = "px-6 py-2.5 rounded-lg font-bold transition-all duration-300";
  
  const variants = {
    primary: "bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-600 hover:to-amber-700 shadow-lg",
    secondary: "bg-black text-white hover:bg-gray-900 shadow-xl",
    outline: "bg-transparent border-2 border-white hover:border-amber-400 text-white hover:text-amber-400"
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
} 