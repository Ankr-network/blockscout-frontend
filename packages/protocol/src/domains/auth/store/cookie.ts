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
  const cookie: Record<string, any> = {};

  document?.cookie?.split(';').forEach(el => {
    const [key, value] = el.split('=');

    const trimmed = key.trim();

    cookie[trimmed] = value;
  });

  const cookieData = cookie[cookieName];

  if (cookieData) {
    return safeParseJSON(cookieData);
  }

  return null;
};
