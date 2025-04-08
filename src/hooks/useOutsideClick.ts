import { RefObject, useEffect } from "react";

export const useOutsideClick = (ref: RefObject<HTMLDivElement>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
