import { ABI } from 'domains/requestComposer/types';

export const fetchABI = async (url: string): Promise<ABI> => {
  const response = await fetch(url);

  return response.json();
};
