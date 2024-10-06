import { EmptyObject } from 'react-hook-form';
import { AuthStorageKey } from '@/constants/Storage';
import { AccessToken } from '@/models/AccessToken';

// Utility function to retrieve and parse local storage data by key
const getLocalStorageItem = <T>(key: string): T | null => {
  if (typeof localStorage === 'undefined') {
    return null; // localStorage is not available
  }

  const item = localStorage.getItem(key);
  if (!item) {
    return null; // Item not found
  }

  try {
    return JSON.parse(item) as T; // Attempt to parse the item
  } catch (error) {
    console.error(`Error parsing JSON from localStorage for key "${key}":`, error);
    return null; // Return null on parse error
  }
};

// Get access token from local storage
export const getAccessToken = (): AccessToken | null => {
  return getLocalStorageItem<AccessToken>(AuthStorageKey);
};

// Get item from local storage by key (generic version)
export const getLocalStorageByKey = <T>(key: string): T | null => {
  return getLocalStorageItem<T>(key);
};
