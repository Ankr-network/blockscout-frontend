import { isReactSnap } from './isReactSnap';

export interface IPreloadImageParams {
  src: string;
}

export const preloadImage = ({ src }: IPreloadImageParams) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);

    if (!isReactSnap) {
      image.onerror = () => reject(src);
      image.onabort = () => reject(src);
    }

    image.src = src;
  });
};
