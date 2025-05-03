import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedValue = window.localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage:`, error);
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const valueToStore = value === undefined ? null : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error storing ${key} to localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
