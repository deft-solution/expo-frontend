import { AUTH_WONDERPASS } from '@/constants/Storage';
import { TokenType } from '@/enums/TokenType';
import { AuthInformation } from '@/schema/Wonderpass/Authentication';
import { getLocalStorageByKey } from '@/utils/LocalStorage';

export const isValidEmailFormat = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format regex
  return emailRegex.test(email);
};

export const getWonderPassToken = () => {
  const auth = getLocalStorageByKey<AuthInformation>(AUTH_WONDERPASS);
  if (auth) {
    const token = auth.data?.value?.token;
    return [TokenType.Bearer, token].join(' ');
  }

  return null;
};

export const getWordPressUrl = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  if (!baseUrl) {
    throw new Error('`NEXT_PUBLIC_WORDPRESS_URL` is not defined in the environment variables.');
  }
  return baseUrl.replace(/\/$/, ''); // Ensure no trailing slash
};

/**
 * Triggers a download for the provided Blob, using the specified file name.
 *
 * @param {Blob} blob - The binary data of the file to download.
 * @param {string} fileName - The name of the file to be saved.
 */
export const triggerDownload = (blob: Blob, fileName: string): void => {
  if (!(blob instanceof Blob)) {
    throw new Error('Response is not a valid Blob');
  }

  // Create a temporary object URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create an invisible <a> element to trigger the download
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName; // Set the file name

  // Trigger the click event on the link to start the download
  document.body.appendChild(link);
  link.click();

  // Clean up the DOM by removing the link
  document.body.removeChild(link);

  // Revoke the Blob URL after the download is triggered
  URL.revokeObjectURL(url);
};