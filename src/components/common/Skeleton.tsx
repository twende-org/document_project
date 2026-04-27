import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rect' }) => {
  const baseClass = "bg-gray-200 dark:bg-gray-700 animate-pulse";
  
  const variants = {
    text: "h-4 w-full rounded",
    rect: "h-32 w-full rounded-2xl",
    circle: "h-12 w-12 rounded-full"
  };

  return (
    <div className={`${baseClass} ${variants[variant]} ${className}`} />
  );
};

export default Skeleton;
