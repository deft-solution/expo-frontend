export const detectDevice = (userAgent: string): string => {
  if (/mobile/i.test(userAgent)) {
    if (/iPad|Tablet/i.test(userAgent)) {
      return 'Tablet';
    }
    return 'Mobile Device';
  } else if (/iPad/i.test(userAgent)) {
    return 'iPad';
  } else if (/iPhone/i.test(userAgent)) {
    return 'iPhone';
  } else if (/Android/i.test(userAgent)) {
    return 'Android Device';
  } else if (/Windows/i.test(userAgent)) {
    return 'Windows Device';
  } else if (/Macintosh/i.test(userAgent)) {
    return 'Mac Device';
  }
  return 'Unknown Device';
};

export const detectBrowser = (userAgent: string): string => {
  if (/chrome|chromium|crios/i.test(userAgent)) {
    return 'Chrome';
  } else if (/firefox|fxios/i.test(userAgent)) {
    return 'Firefox';
  } else if (/safari/i.test(userAgent)) {
    return 'Safari';
  } else if (/opera|opr/i.test(userAgent)) {
    return 'Opera';
  } else if (/edg/i.test(userAgent)) {
    return 'Edge';
  } else if (/trident/i.test(userAgent)) {
    return 'Internet Explorer';
  }
  return 'Unknown Browser';
};

export const detectOS = (userAgent: string): { name: string; version: string } => {
  let name = 'Unknown OS';
  let version = '';

  if (/windows/i.test(userAgent)) {
    name = 'Windows';
    version = /windows nt (\d+\.\d+)/i.exec(userAgent)?.[1] || '';
  } else if (/macintosh|mac os x/i.test(userAgent)) {
    name = 'macOS';
    version = /mac os x (\d+[_]\d+)/i.exec(userAgent)?.[1].replace(/_/g, '.') || '';
  } else if (/linux/i.test(userAgent)) {
    name = 'Linux';
    version = ''; // Generally no specific version for Linux
  } else if (/android/i.test(userAgent)) {
    name = 'Android';
    version = /android (\d+\.\d+)/i.exec(userAgent)?.[1] || '';
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    name = 'iOS';
    version = /os (\d+[_]\d+)/i.exec(userAgent)?.[1].replace(/_/g, '.') || '';
  }

  return { name, version };
};
