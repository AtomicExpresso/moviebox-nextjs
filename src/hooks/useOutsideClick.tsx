'use client'
import { useRef, useEffect } from "react";

//Custom hook for detecting if a click was made outside of an element, it takes a callback function as an argument, and then calls function
export default function useOutsideClick(callback: () => void){
  const ref = useRef<HTMLDivElement>(null);

  //Detect if a click was made outside of the div, if so we call the callback function
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    //Event listerns to detech when a click was made, touchend is for mobile clicks
    document.addEventListener('mouseup', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);


    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [callback]);

  return ref;
}