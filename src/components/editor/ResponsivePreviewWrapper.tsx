import React, { useState, useEffect, useRef } from 'react';

interface ResponsivePreviewWrapperProps {
  children: React.ReactNode;
  targetWidth?: number;
}

export const ResponsivePreviewWrapper: React.FC<ResponsivePreviewWrapperProps> = ({ 
  children, 
  targetWidth = 800 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | string>('auto');

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current || !contentRef.current) return;
      
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const childHeight = contentRef.current.scrollHeight;
      
      if (containerWidth < targetWidth && containerWidth > 0) {
        const newScale = containerWidth / targetWidth;
        setScale(newScale);
        setHeight(childHeight * newScale);
      } else {
        setScale(1);
        setHeight('auto');
      }
    };

    // Run initially
    updateScale();

    // Set up ResizeObserver to handle width/height changes
    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [children, targetWidth]);

  return (
    <div 
      ref={containerRef} 
      className="w-full flex justify-center overflow-hidden" 
      style={{ height: height }}
    >
      <div 
        ref={contentRef}
        className="origin-top"
        style={{
          width: `${targetWidth}px`,
          transform: `scale(${scale})`,
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ResponsivePreviewWrapper;
