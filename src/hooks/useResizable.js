import { useState, useRef, useEffect } from 'react';

export function useResizable(defaultWidth = 70) {
  const [leftWidth, setLeftWidth] = useState(defaultWidth);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      
      const newLeftWidth = (e.clientX / window.innerWidth) * 100;
      if (newLeftWidth > 20 && newLeftWidth < 80) { // Limit min/max width
        setLeftWidth(newLeftWidth);
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const startResizing = () => {
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
  };

  return { leftWidth, startResizing };
}
