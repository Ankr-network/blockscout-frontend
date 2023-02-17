import { safeParseJSON } from 'modules/common/utils/safeParseJSON';

export const setCookie = (name: string, data: any) => {
  document.cookie = `${name}=${JSON.stringify(
    data,
  )}; max-age=31536000; path=/rpc;`;
};

export const clearCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/rpc;`;
};

export const getCookieByName = (cookieName: string) => {
  const cookies = Object.fromEntries(
    new URLSearchParams(document.cookie.replace(/; /g, '&')),
  );

  const cookie = cookies[cookieName];

  if (cookie) {
    return safeParseJSON(cookie);
  }

  return null;
};
