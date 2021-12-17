import { useParams } from 'react-router';

interface IURLParams<T extends string> {
  network: T;
}

export function useCurrentNetwork<T extends string>(): T {
  const { network } = useParams<IURLParams<T>>();

  return network;
}
